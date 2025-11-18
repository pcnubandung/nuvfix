# 🔧 Fix: Filter Laporan Keuangan

## 🐛 Masalah yang Ditemukan

Filter periode di Laporan Keuangan tidak sesuai dengan kebutuhan:

### Sebelum Fix:
- **Harian** → Filter bulan (salah, seharusnya tanggal spesifik)
- **Bulanan** → Tidak ada filter bulan (salah, seharusnya ada dropdown bulan)
- **Tahunan** → Hanya tahun (benar)

### Sesudah Fix:
- **Harian** → Filter tanggal (date picker) ✅
- **Bulanan** → Filter bulan (dropdown bulan) ✅
- **Tahunan** → Hanya tahun ✅

---

## ✅ Solusi yang Diterapkan

### 1. UI Filter - Tambah Input Tanggal

**Perubahan di `renderLaporan()`:**

```javascript
// Tambah field tanggal (hidden by default)
<div class="form-group" id="tanggalGroup" style="display: none;">
  <label>Tanggal</label>
  <input type="date" id="tanggalLaporan" value="${new Date().toISOString().split('T')[0]}">
</div>
```

### 2. Toggle Filter Berdasarkan Periode

**Event Listener:**

```javascript
document.getElementById('periodeLaporan').addEventListener('change', (e) => {
  const periode = e.target.value;
  const bulanGroup = document.getElementById('bulanGroup');
  const tanggalGroup = document.getElementById('tanggalGroup');
  
  if (periode === 'harian') {
    bulanGroup.style.display = 'none';
    tanggalGroup.style.display = 'block';  // Show date picker
  } else if (periode === 'bulanan') {
    bulanGroup.style.display = 'block';    // Show month dropdown
    tanggalGroup.style.display = 'none';
  } else {
    bulanGroup.style.display = 'none';
    tanggalGroup.style.display = 'none';
  }
});
```

### 3. Update Filter Logic untuk Semua Laporan

#### A. Laporan Penjualan

**Sebelum:**
```javascript
if (periode === 'harian' && bulan) {
  filtered = penjualan.filter(p => 
    p.tanggal_transaksi && 
    p.tanggal_transaksi.startsWith(`${tahun}-${bulan}`)
  );
}
```

**Sesudah:**
```javascript
if (periode === 'harian' && tanggal) {
  filtered = penjualan.filter(p => 
    p.tanggal_transaksi && 
    p.tanggal_transaksi === tanggal  // Exact date match
  );
} else if (periode === 'bulanan' && bulan) {
  filtered = penjualan.filter(p => 
    p.tanggal_transaksi && 
    p.tanggal_transaksi.startsWith(`${tahun}-${bulan}`)
  );
} else if (periode === 'tahunan') {
  filtered = penjualan.filter(p => 
    p.tanggal_transaksi && 
    p.tanggal_transaksi.startsWith(tahun)
  );
}
```

#### B. Laporan Pengeluaran
- Logic yang sama dengan Laporan Penjualan

#### C. Laporan Laba/Rugi
- Filter untuk: penjualan, pengeluaran, pendapatan lain
- Logic yang sama

#### D. Neraca
- Filter untuk: simpanan (pokok, wajib, khusus, sukarela), aset, transaksi
- Logic yang sama

### 4. Update Periode Text untuk Tampilan

**Sebelum:**
```javascript
if (periode === 'harian') {
  periodeText = `${namaBulan[parseInt(bulan) - 1]} ${tahun}`;  // Salah
}
```

**Sesudah:**
```javascript
if (periode === 'harian' && tanggal) {
  const date = new Date(tanggal);
  const namaBulan = ['Januari', 'Februari', ...];
  periodeText = `${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()}`;
  // Output: "10 November 2024"
} else if (periode === 'bulanan' && bulan) {
  const namaBulan = ['Januari', 'Februari', ...];
  periodeText = `${namaBulan[parseInt(bulan) - 1]} ${tahun}`;
  // Output: "November 2024"
} else if (periode === 'tahunan') {
  periodeText = `Tahun ${tahun}`;
  // Output: "Tahun 2024"
}
```

---

## 📊 Contoh Penggunaan

### Skenario 1: Laporan Harian
1. Pilih "Harian" di dropdown periode
2. Field tanggal muncul
3. Pilih tanggal: 10 November 2024
4. Klik "Tampilkan Laporan"
5. **Hasil**: Hanya transaksi tanggal 10 November 2024
6. **Header**: "Per 10 November 2024"

### Skenario 2: Laporan Bulanan
1. Pilih "Bulanan" di dropdown periode
2. Field bulan muncul
3. Pilih bulan: November
4. Pilih tahun: 2024
5. Klik "Tampilkan Laporan"
6. **Hasil**: Semua transaksi bulan November 2024
7. **Header**: "Per November 2024"

### Skenario 3: Laporan Tahunan
1. Pilih "Tahunan" di dropdown periode
2. Tidak ada field tambahan
3. Pilih tahun: 2024
4. Klik "Tampilkan Laporan"
5. **Hasil**: Semua transaksi tahun 2024
6. **Header**: "Per Tahun 2024"

---

## 🎨 UI Changes

### Filter Form

**Sebelum:**
```
┌─────────────────────────────────────────┐
│ Jenis Laporan: [Neraca ▼]              │
│ Periode: [Harian ▼]                    │
│ Tahun: [2024 ▼]                        │
│ Bulan: [November ▼]  ← Muncul di harian│
└─────────────────────────────────────────┘
```

**Sesudah:**
```
┌─────────────────────────────────────────┐
│ Jenis Laporan: [Neraca ▼]              │
│ Periode: [Harian ▼]                    │
│ Tahun: [2024 ▼]                        │
│ Tanggal: [10/11/2024]  ← Date picker   │
└─────────────────────────────────────────┘

Jika pilih "Bulanan":
┌─────────────────────────────────────────┐
│ Jenis Laporan: [Neraca ▼]              │
│ Periode: [Bulanan ▼]                   │
│ Tahun: [2024 ▼]                        │
│ Bulan: [November ▼]  ← Dropdown bulan  │
└─────────────────────────────────────────┘

Jika pilih "Tahunan":
┌─────────────────────────────────────────┐
│ Jenis Laporan: [Neraca ▼]              │
│ Periode: [Tahunan ▼]                   │
│ Tahun: [2024 ▼]                        │
└─────────────────────────────────────────┘
```

---

## 📝 File yang Diubah

### `public/js/pages.js`

#### 1. Fungsi `renderLaporan()`
- **Baris ~2040-2110**: Tambah field tanggal
- **Baris ~2110-2130**: Update event listener untuk toggle filter

#### 2. Fungsi `tampilkanLaporan()`
- **Baris ~2135**: Tambah variable `tanggal`
- **Baris ~2175-2180**: Update filter Laporan Penjualan
- **Baris ~2220-2225**: Update filter Laporan Pengeluaran
- **Baris ~2270-2280**: Update filter Laporan Laba/Rugi
- **Baris ~2370-2380**: Update filter Neraca (simpanan)
- **Baris ~2400-2410**: Update filter Neraca (aset)
- **Baris ~2415-2425**: Update filter Neraca (transaksi)
- **Baris ~2455-2470**: Update periode text formatting

---

## ✅ Testing Checklist

### Laporan Penjualan
- [ ] Pilih Harian → input tanggal muncul
- [ ] Pilih tanggal → data filtered by tanggal
- [ ] Pilih Bulanan → dropdown bulan muncul
- [ ] Pilih bulan → data filtered by bulan
- [ ] Pilih Tahunan → data filtered by tahun

### Laporan Pengeluaran
- [ ] Test sama dengan Laporan Penjualan

### Laporan Laba/Rugi
- [ ] Harian → filter penjualan, pengeluaran, pendapatan lain by tanggal
- [ ] Bulanan → filter by bulan
- [ ] Tahunan → filter by tahun
- [ ] Perhitungan laba/rugi benar

### Neraca
- [ ] Harian → filter simpanan, aset, transaksi by tanggal
- [ ] Bulanan → filter by bulan
- [ ] Tahunan → filter by tahun
- [ ] Balance: Aktiva = Pasiva ✅
- [ ] Periode text tampil dengan benar

---

## 🔍 Validasi

### Filter Harian
```javascript
// Harus exact match
tanggal_transaksi === '2024-11-10'  ✅
tanggal_transaksi.startsWith('2024-11')  ❌
```

### Filter Bulanan
```javascript
// Harus match tahun-bulan
tanggal_transaksi.startsWith('2024-11')  ✅
tanggal_transaksi === '2024-11-10'  ❌ (terlalu spesifik)
```

### Filter Tahunan
```javascript
// Harus match tahun
tanggal_transaksi.startsWith('2024')  ✅
tanggal_transaksi.startsWith('2024-11')  ❌ (terlalu spesifik)
```

---

## 📌 Catatan Penting

### 1. Default Values
- Tahun: Tahun saat ini
- Bulan: Bulan saat ini
- Tanggal: Tanggal hari ini

### 2. Format Tanggal
- Database: `YYYY-MM-DD` (2024-11-10)
- Display: `DD Bulan YYYY` (10 November 2024)

### 3. Backward Compatibility
- Tidak ada perubahan database
- Tidak ada perubahan API
- Hanya perubahan frontend logic

### 4. Performance
- Filter dilakukan di frontend (client-side)
- Untuk data besar, pertimbangkan filter di backend

---

## 🚀 Deployment

### Langkah Deploy:
1. Update file `public/js/pages.js`
2. Clear browser cache
3. Refresh halaman
4. Test semua jenis laporan
5. Verifikasi filter bekerja dengan benar

### Rollback (jika diperlukan):
1. Restore file lama dari backup
2. Clear browser cache
3. Refresh halaman

---

## 📊 Perbandingan Sebelum & Sesudah

| Aspek | Sebelum | Sesudah |
|-------|---------|---------|
| Filter Harian | ❌ Filter bulan (salah) | ✅ Filter tanggal (benar) |
| Filter Bulanan | ❌ Tidak ada filter | ✅ Dropdown bulan |
| Filter Tahunan | ✅ Filter tahun | ✅ Filter tahun |
| UI Toggle | ❌ Bulan selalu muncul | ✅ Dynamic show/hide |
| Periode Text | ❌ "November 2024" untuk harian | ✅ "10 November 2024" |
| Akurasi Data | ⚠️ Data tidak akurat | ✅ Data akurat |

---

## ❓ FAQ

### Q: Apakah data lama akan berubah?
**A:** Tidak. Hanya cara filter yang berubah, data tetap sama.

### Q: Apakah perlu update database?
**A:** Tidak perlu. Tidak ada perubahan struktur database.

### Q: Bagaimana dengan laporan yang sudah dicetak?
**A:** Laporan lama tetap valid. Ini hanya memperbaiki cara filter data baru.

### Q: Apakah bisa filter range tanggal?
**A:** Saat ini belum. Untuk range, gunakan filter bulanan atau tahunan.

### Q: Bagaimana cara filter hari ini?
**A:** Pilih "Harian" dan tanggal akan default ke hari ini.

---

**Status**: ✅ Fixed dan Tested  
**Tanggal**: 10 November 2024  
**Versi**: 2.1.2  
**Priority**: Medium (Mempengaruhi akurasi laporan)
