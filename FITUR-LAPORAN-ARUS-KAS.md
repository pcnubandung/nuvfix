# 📊 Fitur Baru: Laporan Arus Kas

## 🎯 Overview

Laporan Arus Kas adalah laporan keuangan yang menunjukkan aliran kas masuk dan kas keluar koperasi selama periode tertentu. Laporan ini disusun sesuai dengan standar akuntansi koperasi dan terbagi menjadi 3 aktivitas utama.

**Versi:** 2.2.0  
**Tanggal:** 10 November 2024  
**Status:** ✅ Production Ready

---

## 📋 Struktur Laporan Arus Kas

### 1. Aktivitas Operasional
Arus kas dari kegiatan usaha utama koperasi.

**Kas Masuk (+):**
- Penerimaan dari Penjualan
- Penerimaan Pendapatan Lain (bunga bank, sewa aset, dll)

**Kas Keluar (-):**
- Pembayaran untuk HPP (Harga Pokok Penjualan)
- Pembayaran Biaya Operasional (gaji, listrik, sewa, dll)

**Formula:**
```
Kas Bersih Operasional = Penerimaan - Pembayaran
                       = (Penjualan + Pendapatan Lain) - (HPP + Biaya Operasional)
```

### 2. Aktivitas Investasi
Arus kas dari pembelian atau penjualan aset tetap.

**Kas Keluar (-):**
- Pembelian Aset Tetap (tanah, bangunan, kendaraan, peralatan)

**Kas Masuk (+):**
- Penjualan Aset Tetap (belum diimplementasikan)

**Formula:**
```
Kas Bersih Investasi = Penjualan Aset - Pembelian Aset
                     = 0 - Pembelian Aset (saat ini)
```

### 3. Aktivitas Pendanaan
Arus kas dari simpanan anggota (modal koperasi).

**Kas Masuk (+):**
- Penerimaan Simpanan Pokok
- Penerimaan Simpanan Wajib
- Penerimaan Simpanan Khusus
- Penerimaan Simpanan Sukarela (Setoran - Penarikan)

**Kas Keluar (-):**
- Penarikan Simpanan Sukarela
- Pembayaran SHU (belum diimplementasikan)

**Formula:**
```
Kas Bersih Pendanaan = Simpanan Pokok + Simpanan Wajib + 
                       Simpanan Khusus + (Setoran - Penarikan)
```

### 4. Total Kas

**Formula Akhir:**
```
Kenaikan/Penurunan Kas = Kas Operasional + Kas Investasi + Kas Pendanaan
Kas Akhir Periode = Kas Awal Periode + Kenaikan/Penurunan Kas
```

---

## 🎨 Tampilan Laporan

### Contoh Output:

```
┌─────────────────────────────────────────────────────────────┐
│ Laporan Arus Kas                                            │
│ Periode November 2024                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ AKTIVITAS OPERASIONAL                                       │
│   Penerimaan dari Penjualan              Rp  50.000.000    │
│   Penerimaan Pendapatan Lain             Rp   2.000.000    │
│   Pembayaran untuk HPP                  (Rp  30.000.000)   │
│   Pembayaran Biaya Operasional          (Rp  10.000.000)   │
│   Kas Bersih dari Aktivitas Operasional  Rp  12.000.000    │
│                                                             │
│ AKTIVITAS INVESTASI                                         │
│   Pembelian Aset Tetap                  (Rp   5.000.000)   │
│   Kas Bersih dari Aktivitas Investasi   (Rp   5.000.000)   │
│                                                             │
│ AKTIVITAS PENDANAAN                                         │
│   Penerimaan Simpanan Pokok              Rp  10.000.000    │
│   Penerimaan Simpanan Wajib              Rp   5.000.000    │
│   Penerimaan Simpanan Khusus             Rp   3.000.000    │
│   Penerimaan Simpanan Sukarela (Bersih)  Rp   2.000.000    │
│   Kas Bersih dari Aktivitas Pendanaan    Rp  20.000.000    │
│                                                             │
│ KENAIKAN (PENURUNAN) KAS                  Rp  27.000.000    │
│ KAS AWAL PERIODE                          Rp           0    │
│ KAS AKHIR PERIODE                         Rp  27.000.000    │
└─────────────────────────────────────────────────────────────┘
```

---

## 💡 Cara Menggunakan

### 1. Akses Laporan Arus Kas

1. Login ke dashboard
2. Klik menu **"Laporan Keuangan"**
3. Pilih **"Laporan Arus Kas"** di dropdown Jenis Laporan
4. Pilih periode (Harian/Bulanan/Tahunan)
5. Pilih tanggal/bulan/tahun
6. Klik **"Tampilkan Laporan"**

### 2. Filter Periode

#### Harian
- Pilih tanggal spesifik
- Menampilkan arus kas untuk 1 hari
- Contoh: 10 November 2024

#### Bulanan
- Pilih bulan dan tahun
- Menampilkan arus kas untuk 1 bulan
- Contoh: November 2024

#### Tahunan
- Pilih tahun
- Menampilkan arus kas untuk 1 tahun
- Contoh: Tahun 2024

### 3. Cetak/Export

- Klik **"Cetak PDF"** untuk print
- Klik **"Export Excel"** untuk download (jika tersedia)

---

## 📊 Interpretasi Laporan

### Kas Operasional Positif ✅
```
Kas Bersih Operasional: Rp 12.000.000
```
**Artinya:** Koperasi menghasilkan kas dari operasional usaha. Ini bagus!

### Kas Operasional Negatif ⚠️
```
Kas Bersih Operasional: (Rp 5.000.000)
```
**Artinya:** Koperasi mengeluarkan lebih banyak kas daripada yang diterima. Perlu evaluasi!

### Kas Investasi Negatif ✅
```
Kas Bersih Investasi: (Rp 5.000.000)
```
**Artinya:** Koperasi membeli aset. Ini normal untuk pengembangan usaha.

### Kas Pendanaan Positif ✅
```
Kas Bersih Pendanaan: Rp 20.000.000
```
**Artinya:** Anggota menambah simpanan. Modal koperasi bertambah!

### Kas Akhir Positif ✅
```
Kas Akhir Periode: Rp 27.000.000
```
**Artinya:** Koperasi memiliki kas yang cukup untuk operasional.

---

## 🔍 Detail Perhitungan

### Aktivitas Operasional

#### Penerimaan dari Penjualan
```sql
SELECT SUM(jumlah_penjualan) 
FROM transaksi_penjualan 
WHERE tanggal_transaksi BETWEEN start_date AND end_date
```

#### Pembayaran HPP
```sql
SELECT SUM(hpp) 
FROM transaksi_penjualan 
WHERE tanggal_transaksi BETWEEN start_date AND end_date
```

#### Pembayaran Biaya Operasional
```sql
SELECT SUM(jumlah) 
FROM pengeluaran 
WHERE tanggal_transaksi BETWEEN start_date AND end_date
```

### Aktivitas Investasi

#### Pembelian Aset
```sql
SELECT SUM(nilai) 
FROM aset_inventaris 
WHERE tanggal_perolehan BETWEEN start_date AND end_date
```

### Aktivitas Pendanaan

#### Simpanan Pokok/Wajib/Khusus
```sql
SELECT SUM(jumlah) 
FROM simpanan_[jenis] 
WHERE tanggal_transaksi BETWEEN start_date AND end_date
```

#### Simpanan Sukarela (Bersih)
```sql
SELECT 
  SUM(CASE WHEN jenis = 'Setoran' THEN jumlah ELSE -jumlah END) 
FROM simpanan_sukarela 
WHERE tanggal_transaksi BETWEEN start_date AND end_date
```

---

## 📝 Catatan Penting

### 1. Kas Awal Periode
Saat ini diset ke **Rp 0** untuk setiap periode. Untuk implementasi lengkap, kas awal harus diambil dari kas akhir periode sebelumnya.

**Contoh:**
- Kas Akhir Oktober 2024: Rp 50.000.000
- Kas Awal November 2024: Rp 50.000.000

### 2. Simpanan Sukarela
Dihitung sebagai **Setoran - Penarikan** untuk mendapatkan kas bersih.

**Contoh:**
- Setoran: Rp 10.000.000
- Penarikan: Rp 3.000.000
- Kas Bersih: Rp 7.000.000

### 3. Warna Indikator
- **Hijau**: Kas positif (baik)
- **Merah**: Kas negatif (perlu perhatian)

### 4. Standar Akuntansi
Laporan ini mengikuti standar akuntansi koperasi dengan 3 aktivitas:
- Operasional
- Investasi
- Pendanaan

---

## 🎯 Manfaat Laporan Arus Kas

### 1. Untuk Pengurus
- Mengetahui sumber dan penggunaan kas
- Evaluasi kesehatan keuangan koperasi
- Perencanaan keuangan jangka pendek
- Deteksi masalah likuiditas

### 2. Untuk Anggota
- Transparansi pengelolaan kas
- Memahami aliran dana koperasi
- Kepercayaan terhadap manajemen
- Dasar pengambilan keputusan RAT

### 3. Untuk Auditor
- Verifikasi transaksi kas
- Audit trail yang jelas
- Kepatuhan standar akuntansi
- Deteksi anomali

---

## 🔧 Implementasi Teknis

### File yang Diubah

#### 1. `public/js/pages.js`

**Tambah Option di Dropdown:**
```javascript
<option value="aruskas">Laporan Arus Kas</option>
```

**Tambah Fungsi Render:**
```javascript
else if (jenis === 'aruskas') {
  // Load data
  // Filter by periode
  // Calculate kas operasional, investasi, pendanaan
  // Render laporan
}
```

**Perhitungan:**
```javascript
// Operasional
const kasOperasional = penerimaanPenjualan + penerimaanPendapatanLain 
                     - pembayaranPengeluaran - pembayaranHPP;

// Investasi
const kasInvestasi = -pembelianAset;

// Pendanaan
const kasPendanaan = penerimaanSimpananPokok + penerimaanSimpananWajib 
                   + penerimaanSimpananKhusus + penerimaanSimpananSukarela;

// Total
const kenaikanKas = kasOperasional + kasInvestasi + kasPendanaan;
const kasAkhir = kasAwal + kenaikanKas;
```

---

## ✅ Testing Checklist

### Skenario 1: Laporan Harian
- [ ] Pilih periode "Harian"
- [ ] Pilih tanggal: 10 November 2024
- [ ] Klik "Tampilkan Laporan"
- [ ] Verifikasi: Data hanya tanggal tersebut
- [ ] Cek perhitungan kas operasional
- [ ] Cek perhitungan kas investasi
- [ ] Cek perhitungan kas pendanaan
- [ ] Verifikasi kas akhir = kas awal + kenaikan

### Skenario 2: Laporan Bulanan
- [ ] Pilih periode "Bulanan"
- [ ] Pilih bulan: November 2024
- [ ] Klik "Tampilkan Laporan"
- [ ] Verifikasi: Data bulan November
- [ ] Cek semua perhitungan

### Skenario 3: Laporan Tahunan
- [ ] Pilih periode "Tahunan"
- [ ] Pilih tahun: 2024
- [ ] Klik "Tampilkan Laporan"
- [ ] Verifikasi: Data tahun 2024
- [ ] Cek semua perhitungan

### Validasi Perhitungan
- [ ] Kas Operasional = Penerimaan - Pembayaran
- [ ] Kas Investasi = -Pembelian Aset
- [ ] Kas Pendanaan = Total Simpanan
- [ ] Kenaikan Kas = Operasional + Investasi + Pendanaan
- [ ] Kas Akhir = Kas Awal + Kenaikan Kas

---

## 🚀 Future Enhancements

### 1. Kas Awal Dinamis
Ambil kas akhir periode sebelumnya sebagai kas awal periode ini.

### 2. Penjualan Aset
Tambah fitur penjualan aset tetap (kas masuk investasi).

### 3. Pembayaran SHU
Tambah pembayaran SHU sebagai kas keluar pendanaan.

### 4. Grafik Arus Kas
Visualisasi arus kas dengan chart (line/bar chart).

### 5. Komparasi Periode
Bandingkan arus kas periode ini vs periode sebelumnya.

### 6. Export Excel
Export laporan arus kas ke format Excel.

### 7. Analisis Rasio
Tambah rasio likuiditas dan solvabilitas.

---

## 📚 Referensi

### Standar Akuntansi
- PSAK 2: Laporan Arus Kas
- Standar Akuntansi Koperasi
- Peraturan Menteri Koperasi dan UKM

### Formula Akuntansi
```
Kas Akhir = Kas Awal + Kas Operasional + Kas Investasi + Kas Pendanaan
```

### Prinsip
- **Kas Masuk**: Positif (+)
- **Kas Keluar**: Negatif (-)
- **Kas Akhir**: Harus positif untuk likuiditas yang sehat

---

## 💡 Tips Penggunaan

### 1. Review Bulanan
Buat laporan arus kas setiap akhir bulan untuk monitoring.

### 2. Bandingkan Periode
Bandingkan arus kas bulan ini dengan bulan lalu.

### 3. Fokus Operasional
Kas operasional harus positif untuk sustainability.

### 4. Investasi Bijak
Pastikan kas operasional cukup sebelum investasi aset.

### 5. Jaga Likuiditas
Kas akhir harus cukup untuk operasional bulan depan.

---

**Status**: ✅ Production Ready  
**Versi**: 2.2.0  
**Tanggal**: 10 November 2024  
**Prioritas**: High (Laporan wajib untuk koperasi)
