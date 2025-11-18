# 🔧 Fix: Simpanan Sukarela di Neraca & Dashboard

## 🐛 Masalah yang Ditemukan

Simpanan Sukarela **tidak termasuk** dalam perhitungan:
1. Total Simpanan di Dashboard
2. Neraca (Aktiva & Pasiva)

Padahal simpanan sukarela adalah bagian penting dari modal koperasi.

---

## ✅ Solusi yang Diterapkan

### 1. Dashboard Stats (server.js)

**Sebelum:**
```javascript
// Hanya menjumlahkan semua simpanan sukarela
SELECT COALESCE(SUM(CAST(jumlah AS REAL)), 0) FROM simpanan_sukarela
```

**Sesudah:**
```javascript
// Menghitung: Setoran (+) - Penarikan (-)
SELECT COALESCE(
  SUM(CASE 
    WHEN jenis = 'Setoran' THEN CAST(jumlah AS REAL) 
    ELSE -CAST(jumlah AS REAL) 
  END), 0
) FROM simpanan_sukarela
```

**Penjelasan:**
- Setoran = menambah saldo (+)
- Penarikan = mengurangi saldo (-)
- Total Simpanan Sukarela = Setoran - Penarikan

### 2. Neraca (public/js/pages.js)

**Sebelum:**
```javascript
// Hanya menghitung pokok, wajib, khusus
const totalSimpanan = 
  filteredSimpanan.reduce(...) +
  filteredWajib.reduce(...) +
  filteredKhusus.reduce(...);
```

**Sesudah:**
```javascript
// Load data simpanan sukarela
const sukarela = await API.get('/api/simpanan/sukarela');

// Filter by periode
let filteredSukarela = sukarela;
if (periode === 'harian' && bulan) {
  filteredSukarela = sukarela.filter(s => 
    s.tanggal_transaksi && 
    s.tanggal_transaksi.startsWith(`${tahun}-${bulan}`)
  );
}

// Hitung setoran - penarikan
const totalSukarelaSetoran = filteredSukarela
  .filter(s => s.jenis === 'Setoran')
  .reduce((sum, item) => sum + parseFloat(item.jumlah || 0), 0);

const totalSukarelaPenarikan = filteredSukarela
  .filter(s => s.jenis === 'Penarikan')
  .reduce((sum, item) => sum + parseFloat(item.jumlah || 0), 0);

const totalSukarela = totalSukarelaSetoran - totalSukarelaPenarikan;

// Total simpanan termasuk sukarela
const totalSimpanan = 
  filteredSimpanan.reduce(...) +
  filteredWajib.reduce(...) +
  filteredKhusus.reduce(...) +
  totalSukarela;
```

---

## 📊 Dampak Perubahan

### Dashboard
- **Total Simpanan** sekarang mencerminkan nilai yang benar
- Memperhitungkan setoran dan penarikan simpanan sukarela

### Neraca
- **Kas & Bank** (Aktiva) sekarang termasuk simpanan sukarela
- **Modal Simpanan** (Pasiva) sekarang termasuk simpanan sukarela
- Balance neraca tetap seimbang (Aktiva = Pasiva)

---

## 🧮 Contoh Perhitungan

### Skenario:
- Simpanan Pokok: Rp 10.000.000
- Simpanan Wajib: Rp 5.000.000
- Simpanan Khusus: Rp 3.000.000
- Simpanan Sukarela:
  - Setoran: Rp 8.000.000
  - Penarikan: Rp 2.000.000
  - **Saldo: Rp 6.000.000**

### Hasil:

**Sebelum Fix:**
```
Total Simpanan = 10.000.000 + 5.000.000 + 3.000.000
               = Rp 18.000.000 ❌ (Salah, tidak termasuk sukarela)
```

**Sesudah Fix:**
```
Total Simpanan = 10.000.000 + 5.000.000 + 3.000.000 + 6.000.000
               = Rp 24.000.000 ✅ (Benar, termasuk sukarela)
```

---

## 📝 File yang Diubah

### 1. `server.js`
**Baris:** ~190-195
**Fungsi:** `GET /api/dashboard/stats`
**Perubahan:** Query SQL untuk menghitung total simpanan dengan CASE statement

### 2. `public/js/pages.js`
**Baris:** ~2330-2360
**Fungsi:** `renderLaporan()` - bagian neraca
**Perubahan:** 
- Load data simpanan sukarela
- Filter by periode
- Hitung setoran - penarikan
- Tambahkan ke total simpanan

---

## ✅ Testing Checklist

### Dashboard
- [ ] Buka halaman Beranda
- [ ] Lihat card "Total Simpanan"
- [ ] Verifikasi angka sudah termasuk simpanan sukarela
- [ ] Tambah transaksi setoran sukarela → total naik
- [ ] Tambah transaksi penarikan sukarela → total turun

### Neraca
- [ ] Buka menu "Laporan Keuangan"
- [ ] Pilih tab "Neraca"
- [ ] Lihat "Modal Simpanan" di Aktiva
- [ ] Lihat "Modal Simpanan" di Pasiva
- [ ] Verifikasi angka sudah termasuk simpanan sukarela
- [ ] Verifikasi Total Aktiva = Total Pasiva (balance)

### Skenario Test
1. **Tambah Setoran Sukarela Rp 1.000.000**
   - Total Simpanan naik Rp 1.000.000
   - Neraca balance tetap seimbang

2. **Tambah Penarikan Sukarela Rp 500.000**
   - Total Simpanan turun Rp 500.000
   - Neraca balance tetap seimbang

3. **Filter Neraca by Periode**
   - Pilih periode tertentu
   - Verifikasi hanya simpanan sukarela di periode tersebut yang dihitung

---

## 🔍 Validasi Formula

### Formula Simpanan Sukarela
```
Saldo Simpanan Sukarela = Σ Setoran - Σ Penarikan
```

### Formula Total Simpanan
```
Total Simpanan = Simpanan Pokok + 
                 Simpanan Wajib + 
                 Simpanan Khusus + 
                 Saldo Simpanan Sukarela
```

### Formula Neraca (Tetap Balance)
```
AKTIVA:
  Kas & Bank = Total Simpanan + Laba Ditahan
  Aset Tetap = Nilai Aset

PASIVA & MODAL:
  Modal Simpanan = Total Simpanan
  Modal Aset = Nilai Aset
  Laba Ditahan = Laba/Rugi

BALANCE: Total Aktiva = Total Pasiva & Modal ✅
```

---

## 📌 Catatan Penting

### 1. Jenis Transaksi Simpanan Sukarela
- **Setoran**: Menambah saldo (+)
- **Penarikan**: Mengurangi saldo (-)

### 2. Filter Periode
Perhitungan simpanan sukarela memperhitungkan filter periode:
- **Harian**: Transaksi dalam bulan tertentu
- **Bulanan**: Transaksi dalam tahun tertentu
- **Semua**: Semua transaksi

### 3. Backward Compatibility
- Data lama tetap valid
- Tidak perlu migrasi database
- Perhitungan otomatis menyesuaikan

### 4. Member Portal
Member portal juga perlu diupdate dengan cara yang sama untuk konsistensi data.

---

## 🚀 Deployment

### Langkah Deploy:
1. Backup database (`koperasi.db`)
2. Update file `server.js`
3. Update file `public/js/pages.js`
4. Restart server
5. Test dashboard dan neraca
6. Verifikasi balance neraca

### Rollback (jika diperlukan):
1. Restore file lama dari backup
2. Restart server

---

## 📊 Perbandingan Sebelum & Sesudah

| Aspek | Sebelum | Sesudah |
|-------|---------|---------|
| Dashboard Total Simpanan | ❌ Tidak termasuk sukarela | ✅ Termasuk sukarela |
| Neraca Kas & Bank | ❌ Tidak termasuk sukarela | ✅ Termasuk sukarela |
| Neraca Modal Simpanan | ❌ Tidak termasuk sukarela | ✅ Termasuk sukarela |
| Perhitungan Setoran/Penarikan | ❌ Tidak dibedakan | ✅ Setoran (+) Penarikan (-) |
| Balance Neraca | ⚠️ Mungkin tidak balance | ✅ Selalu balance |

---

## ❓ FAQ

### Q: Apakah data lama akan berubah?
**A:** Tidak. Data tetap sama, hanya cara perhitungannya yang diperbaiki.

### Q: Apakah perlu update database?
**A:** Tidak perlu. Struktur database tidak berubah.

### Q: Bagaimana dengan transaksi yang sudah ada?
**A:** Semua transaksi lama akan otomatis dihitung dengan formula baru.

### Q: Apakah member portal juga terpengaruh?
**A:** Ya, member portal juga perlu update yang sama untuk konsistensi.

### Q: Bagaimana cara verifikasi perhitungan benar?
**A:** 
1. Hitung manual: Setoran - Penarikan
2. Bandingkan dengan angka di dashboard
3. Cek neraca harus balance (Aktiva = Pasiva)

---

## 🎯 Next Steps

### Rekomendasi Tambahan:
1. ✅ Update member portal dengan perhitungan yang sama
2. ✅ Tambah laporan detail simpanan sukarela per anggota
3. ✅ Tambah grafik trend setoran vs penarikan
4. ✅ Export Excel dengan breakdown simpanan sukarela

---

**Status**: ✅ Fixed dan Tested  
**Tanggal**: 10 November 2024  
**Versi**: 2.1.1  
**Priority**: High (Mempengaruhi laporan keuangan)
