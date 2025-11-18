# 📝 FITUR CETAK SHU PER ANGGOTA
## Aplikasi Koperasi NU Vibes

---

## ✅ FITUR YANG DITAMBAHKAN

### Tujuan
Menambahkan fitur cetak SHU Per Anggota pada halaman Sisa Hasil Usaha untuk mempermudah distribusi dan dokumentasi SHU.

---

## 📊 DETAIL IMPLEMENTASI

### 1. **Tombol Cetak di Halaman SHU**

#### File: `public/js/pages.js`

#### Lokasi:
Bagian "SHU Per Anggota" - di sebelah tombol Export Excel dan Reset SHU

#### Kode:
```html
<button class="btn btn-info" onclick="cetakSHUPerAnggota(${tahun})" style="margin-right: 10px;">
  <i data-feather="printer"></i> Cetak
</button>
```

**Fitur:**
- ✅ Tombol dengan icon printer
- ✅ Warna biru (btn-info)
- ✅ Memanggil fungsi `cetakSHUPerAnggota(tahun)`

---

### 2. **Fungsi Cetak SHU Per Anggota**

#### File: `public/js/utils.js`

#### Fungsi: `window.cetakSHUPerAnggota(tahun)`

#### Fitur Cetak:

##### A. Header Dokumen
- ✅ Kop surat koperasi (nama, alamat, telp, email)
- ✅ Judul: "SISA HASIL USAHA (SHU) PER ANGGOTA"
- ✅ Tahun SHU yang dicetak

##### B. Info Box Komponen SHU
- ✅ Jasa Partisipasi Simpanan (%)
- ✅ Jasa Partisipasi Transaksi (%)
- ✅ Cadangan (%)
- ✅ Pengurus & Pengawas (%)
- ✅ Pegawai (%)

##### C. Tabel SHU Per Anggota
Kolom:
1. No
2. No. Anggota
3. Nama Anggota
4. Total Simpanan
5. Total Transaksi
6. SHU Simpanan
7. SHU Transaksi
8. Total SHU

##### D. Total Row
- ✅ Total SHU Simpanan
- ✅ Total SHU Transaksi
- ✅ Total SHU Dibagikan

##### E. Footer
- ✅ Tanggal cetak
- ✅ Tanda tangan Ketua Koperasi

##### F. Tombol Aksi
- ✅ Tombol "Cetak Dokumen"
- ✅ Tombol "Tutup"

---

## 🎨 STYLING

### Warna & Design:
```css
- Header: Border bottom 2px solid #333
- Info Box: Background #f8f9fa, border-radius 8px
- Tabel Header: Background #667eea (ungu), color white
- Tabel Row: Alternating background (#f9f9f9)
- Total Row: Background #f8f9fa, font-weight bold
- Font Size: 11px untuk tabel, 14px untuk header
```

### Layout:
- ✅ Responsive untuk ukuran kertas A4
- ✅ Padding 20px di semua sisi
- ✅ Margin yang proporsional
- ✅ Print-friendly (tombol hidden saat print)

---

## 📋 CONTOH OUTPUT CETAK

```
┌─────────────────────────────────────────────────────────────┐
│                    KOPERASI NU VIBES                        │
│              Jl. Contoh No. 123, Jakarta                    │
│         Telp: 021-1234567 | Email: info@koperasi.com       │
│                                                             │
│         SISA HASIL USAHA (SHU) PER ANGGOTA                 │
│                     Tahun 2024                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Komponen Pembagian SHU                                      │
├─────────────────────────────────────────────────────────────┤
│ Jasa Partisipasi Simpanan:              40%                │
│ Jasa Partisipasi Transaksi:             30%                │
│ Cadangan:                                20%                │
│ Pengurus & Pengawas:                      5%                │
│ Pegawai:                                  5%                │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│ No │ No.Anggota │ Nama        │ Total Simpanan │ SHU Simpanan │ Total SHU   │
├────┼────────────┼─────────────┼────────────────┼──────────────┼─────────────┤
│ 1  │ 001        │ John Doe    │ Rp  5.000.000  │ Rp   200.000 │ Rp  350.000 │
│ 2  │ 002        │ Jane Smith  │ Rp  3.000.000  │ Rp   120.000 │ Rp  210.000 │
├────┴────────────┴─────────────┴────────────────┴──────────────┴─────────────┤
│ TOTAL                                           │ Rp   320.000 │ Rp  560.000 │
└──────────────────────────────────────────────────────────────────────────────┘

Dicetak pada: 14 November 2025, 10:30:00

Mengetahui,




_______________________
Ketua Koperasi
```

---

## 🧪 TESTING

### Cara Testing

1. **Login sebagai Admin**
   ```
   URL: http://localhost:3000
   Username: admin
   Password: admin123
   ```

2. **Buka Halaman SHU**
   - Menu → Sisa Hasil Usaha (SHU)

3. **Pastikan Ada Data SHU**
   - Pilih tahun yang sudah ada data SHU
   - Jika belum ada, klik "Hitung SHU" terlebih dahulu

4. **Test Tombol Cetak**
   - Klik tombol "Cetak" (icon printer, warna biru)
   - Verifikasi:
     - ✅ Window baru terbuka
     - ✅ Kop surat muncul dengan benar
     - ✅ Info komponen SHU ditampilkan
     - ✅ Tabel SHU per anggota lengkap
     - ✅ Total row dihitung dengan benar
     - ✅ Footer dengan tanggal cetak

5. **Test Fungsi Cetak**
   - Klik tombol "Cetak Dokumen"
   - Verifikasi:
     - ✅ Dialog print browser muncul
     - ✅ Preview cetak terlihat rapi
     - ✅ Tombol tidak muncul di preview
     - ✅ Layout sesuai ukuran kertas

6. **Test Tombol Tutup**
   - Klik tombol "Tutup"
   - Verifikasi:
     - ✅ Window cetak tertutup
     - ✅ Kembali ke halaman SHU

---

## 📁 FILE YANG DIMODIFIKASI

### 1. `public/js/pages.js`
- ✅ Menambahkan tombol "Cetak" di bagian SHU Per Anggota
- ✅ Posisi: Sebelum tombol "Export Excel"
- ✅ Style: btn-info dengan icon printer

### 2. `public/js/utils.js`
- ✅ Menambahkan fungsi `window.cetakSHUPerAnggota(tahun)`
- ✅ Fetch data: info koperasi, komponen SHU, data SHU per anggota
- ✅ Generate HTML cetak dengan format profesional
- ✅ Styling print-friendly
- ✅ Tombol cetak dan tutup

---

## 📊 DATA YANG DITAMPILKAN

### Data Anggota:
- No. Anggota
- Nama Lengkap
- Total Simpanan (Pokok + Wajib + Khusus + Sukarela)
- Total Transaksi (Partisipasi di unit usaha)
- SHU Simpanan (Jasa partisipasi simpanan)
- SHU Transaksi (Jasa partisipasi transaksi)
- Total SHU (SHU Simpanan + SHU Transaksi)

### Data Komponen:
- Jasa Partisipasi Simpanan (%)
- Jasa Partisipasi Transaksi (%)
- Cadangan (%)
- Pengurus & Pengawas (%)
- Pegawai (%)

### Data Total:
- Total SHU Simpanan (semua anggota)
- Total SHU Transaksi (semua anggota)
- Total SHU Dibagikan (semua anggota)

---

## ✅ CHECKLIST FITUR

- ✅ Tombol cetak ditambahkan di halaman SHU
- ✅ Fungsi `cetakSHUPerAnggota()` dibuat
- ✅ Kop surat koperasi ditampilkan
- ✅ Info komponen SHU ditampilkan
- ✅ Tabel SHU per anggota lengkap
- ✅ Total row dihitung dengan benar
- ✅ Footer dengan tanggal cetak
- ✅ Tanda tangan Ketua Koperasi
- ✅ Tombol cetak dan tutup berfungsi
- ✅ Print-friendly styling
- ✅ Tidak ada error diagnostik

---

## 📝 CATATAN

### Kegunaan Fitur:
1. ✅ **Dokumentasi Resmi**
   - Dokumen cetak untuk arsip koperasi

2. ✅ **Transparansi**
   - Anggota dapat melihat perhitungan SHU secara detail

3. ✅ **Distribusi**
   - Dokumen untuk pembagian SHU ke anggota

4. ✅ **Audit**
   - Bukti pembagian SHU untuk audit internal/eksternal

### Format Cetak:
- ✅ Ukuran kertas: A4
- ✅ Orientasi: Portrait
- ✅ Font: Arial, sans-serif
- ✅ Ukuran font: 11px (tabel), 14px (header)
- ✅ Margin: 20px semua sisi

---

## 🎯 KESIMPULAN

### Status: ✅ FITUR SELESAI

### Fitur yang Ditambahkan:
- ✅ Tombol "Cetak" di halaman SHU
- ✅ Fungsi cetak SHU per anggota
- ✅ Format cetak profesional dengan kop surat
- ✅ Tabel lengkap dengan total
- ✅ Footer dengan tanda tangan

### Keuntungan:
1. ✅ **Mudah Digunakan**
   - Satu klik untuk cetak

2. ✅ **Profesional**
   - Format dokumen resmi koperasi

3. ✅ **Lengkap**
   - Semua data SHU ditampilkan

4. ✅ **Print-Friendly**
   - Optimized untuk cetak

---

**Fitur selesai pada:** 14 November 2025  
**Status:** ✅ COMPLETED  
**Files Modified:** 2 files
