# 🧪 TESTING GUIDE - FITUR PENDAPATAN LAIN

## 📋 Panduan Testing Lengkap

---

## 🚀 Persiapan Testing

### 1. Start Server
```bash
npm start
```

### 2. Buka Browser
```
http://localhost:3000
```

### 3. Login Admin
```
Username: admin
Password: admin123
```

---

## ✅ Test Case 1: Akses Menu

### Steps:
1. Login sebagai admin
2. Lihat sidebar menu
3. Klik "Transaksi Keuangan"
4. Cari sub menu "Pendapatan Lain"

### Expected Result:
- ✅ Sub menu "Pendapatan Lain" muncul
- ✅ Posisi setelah "Pengeluaran"
- ✅ Icon dan styling sesuai

### Status: [ ]

---

## ✅ Test Case 2: Halaman Utama

### Steps:
1. Klik menu "Pendapatan Lain"
2. Tunggu halaman load

### Expected Result:
- ✅ Halaman muncul tanpa error
- ✅ Judul "Pendapatan Lain" tampil
- ✅ Tombol "Tambah Pendapatan Lain" ada
- ✅ Stat card "Total Pendapatan Lain" tampil
- ✅ Tabel data tampil (kosong jika belum ada data)
- ✅ Kolom tabel: No, Tanggal, Unit Usaha, Kategori, Jumlah, Keterangan, Aksi

### Status: [ ]

---

## ✅ Test Case 3: Tambah Data - Validasi

### Steps:
1. Klik tombol "Tambah Pendapatan Lain"
2. Modal form muncul
3. Langsung klik "Simpan" tanpa isi form

### Expected Result:
- ✅ Modal muncul dengan judul "Tambah Pendapatan Lain"
- ✅ Form validation error muncul
- ✅ Field required ditandai:
  - Kategori (required)
  - Jumlah (required)
  - Tanggal (required)
- ✅ Data tidak tersimpan

### Status: [ ]

---

## ✅ Test Case 4: Tambah Data - Success

### Steps:
1. Klik tombol "Tambah Pendapatan Lain"
2. Isi form:
   - Unit Usaha: (kosongkan atau pilih)
   - Kategori: Bunga Bank
   - Jumlah: 500000
   - Tanggal: (hari ini)
   - Keterangan: Bunga deposito BCA
3. Klik "Simpan"

### Expected Result:
- ✅ Alert "Pendapatan lain berhasil ditambahkan"
- ✅ Modal tertutup
- ✅ Data muncul di tabel
- ✅ Total pendapatan ter-update
- ✅ Jumlah transaksi ter-update

### Status: [ ]

---

## ✅ Test Case 5: Tambah Data - Semua Kategori

### Steps:
Ulangi Test Case 4 untuk setiap kategori:
1. Bunga Bank - Rp 500.000
2. Sewa Aset - Rp 2.000.000
3. Jasa Konsultasi - Rp 1.500.000
4. Komisi - Rp 750.000
5. Hibah - Rp 10.000.000
6. Donasi - Rp 3.000.000
7. Lainnya - Rp 1.000.000

### Expected Result:
- ✅ Semua kategori bisa dipilih
- ✅ Data tersimpan untuk semua kategori
- ✅ Total = Rp 18.750.000
- ✅ Jumlah transaksi = 7

### Status: [ ]

---

## ✅ Test Case 6: Edit Data

### Steps:
1. Di tabel, pilih salah satu baris
2. Klik tombol "Edit" (kuning)
3. Modal edit muncul dengan data ter-isi
4. Ubah jumlah dari 500.000 ke 750.000
5. Klik "Update"

### Expected Result:
- ✅ Modal edit muncul
- ✅ Data ter-isi sesuai yang dipilih
- ✅ Alert "Pendapatan lain berhasil diupdate"
- ✅ Modal tertutup
- ✅ Data ter-update di tabel
- ✅ Total pendapatan ter-update

### Status: [ ]

---

## ✅ Test Case 7: Hapus Data - Cancel

### Steps:
1. Di tabel, pilih salah satu baris
2. Klik tombol "Hapus" (merah)
3. Dialog konfirmasi muncul
4. Klik "Cancel"

### Expected Result:
- ✅ Dialog konfirmasi muncul
- ✅ Pesan: "Apakah Anda yakin ingin menghapus..."
- ✅ Data TIDAK terhapus
- ✅ Tabel tetap sama

### Status: [ ]

---

## ✅ Test Case 8: Hapus Data - Confirm

### Steps:
1. Di tabel, pilih salah satu baris
2. Klik tombol "Hapus" (merah)
3. Dialog konfirmasi muncul
4. Klik "OK"

### Expected Result:
- ✅ Alert "Pendapatan lain berhasil dihapus"
- ✅ Data terhapus dari tabel
- ✅ Total pendapatan ter-update
- ✅ Jumlah transaksi ter-update

### Status: [ ]

---

## ✅ Test Case 9: Cetak Struk

### Steps:
1. Di tabel, pilih salah satu baris
2. Klik tombol "Cetak" (biru)
3. Tab baru muncul dengan struk

### Expected Result:
- ✅ Tab baru terbuka
- ✅ Struk format kwitansi tampil
- ✅ Header koperasi ada
- ✅ Jenis: "PENDAPATAN LAIN"
- ✅ No transaksi benar
- ✅ Tanggal benar
- ✅ Unit usaha benar
- ✅ Kategori benar
- ✅ Jumlah benar (hijau, bold)
- ✅ Keterangan tampil (jika ada)
- ✅ Nama petugas tampil
- ✅ Tanggal cetak tampil
- ✅ Auto print dialog muncul

### Status: [ ]

---

## ✅ Test Case 10: Cetak Struk - Print

### Steps:
1. Lanjut dari Test Case 9
2. Di print dialog, pilih printer atau "Save as PDF"
3. Print/Save

### Expected Result:
- ✅ Print dialog muncul
- ✅ Preview struk benar
- ✅ Bisa print ke printer
- ✅ Bisa save as PDF
- ✅ Format tetap rapi

### Status: [ ]

---

## ✅ Test Case 11: Member Portal - Stat Card

### Steps:
1. Logout dari admin
2. Login sebagai member (jika ada)
3. Atau buka: http://localhost:3000/member.html
4. Login dengan akun anggota
5. Lihat halaman Laporan Keuangan

### Expected Result:
- ✅ Card "Pendapatan Lain" muncul
- ✅ Icon: plus-circle (kuning/gold)
- ✅ Total pendapatan lain benar
- ✅ Label: "Non-Operasional"
- ✅ Styling sesuai (gradient kuning)

### Status: [ ]

---

## ✅ Test Case 12: Member Portal - Laporan Laba Rugi

### Steps:
1. Lanjut dari Test Case 11
2. Scroll ke tabel "Laporan Laba Rugi"
3. Cek baris-baris laporan

### Expected Result:
- ✅ Baris "Pendapatan Lain" muncul
- ✅ Posisi setelah "Laba Kotor"
- ✅ Nilai pendapatan lain benar
- ✅ Baris "Total Pendapatan" muncul
- ✅ Formula: Laba Kotor + Pendapatan Lain
- ✅ Laba Bersih dihitung dari Total Pendapatan - Pengeluaran

### Status: [ ]

---

## ✅ Test Case 13: Formula Perhitungan

### Setup Data:
```
Penjualan: Rp 50.000.000
HPP: Rp 30.000.000
Pendapatan Lain: Rp 3.000.000
Pengeluaran: Rp 15.000.000
```

### Expected Calculation:
```
Laba Kotor = 50.000.000 - 30.000.000 = 20.000.000 ✅
Total Pendapatan = 20.000.000 + 3.000.000 = 23.000.000 ✅
Laba Bersih = 23.000.000 - 15.000.000 = 8.000.000 ✅
```

### Steps:
1. Input data penjualan, pengeluaran, pendapatan lain sesuai setup
2. Buka member portal
3. Lihat laporan laba rugi
4. Verifikasi perhitungan

### Expected Result:
- ✅ Laba Kotor = Rp 20.000.000
- ✅ Pendapatan Lain = Rp 3.000.000
- ✅ Total Pendapatan = Rp 23.000.000
- ✅ Laba Bersih = Rp 8.000.000
- ✅ Semua perhitungan benar

### Status: [ ]

---

## ✅ Test Case 14: Empty State

### Steps:
1. Hapus semua data pendapatan lain
2. Refresh halaman

### Expected Result:
- ✅ Empty state muncul
- ✅ Icon inbox tampil
- ✅ Pesan: "Belum Ada Data"
- ✅ Instruksi: "Klik tombol Tambah..."
- ✅ Total = Rp 0
- ✅ Jumlah transaksi = 0

### Status: [ ]

---

## ✅ Test Case 15: Error Handling

### Steps:
1. Stop server (Ctrl+C)
2. Di browser, coba tambah data
3. Atau refresh halaman

### Expected Result:
- ✅ Error message muncul
- ✅ Tidak crash
- ✅ User-friendly error
- ✅ Bisa retry setelah server up

### Status: [ ]

---

## ✅ Test Case 16: Responsive Design

### Steps:
1. Buka halaman Pendapatan Lain
2. Resize browser window:
   - Desktop (1200px+)
   - Tablet (768px - 1199px)
   - Mobile (< 768px)

### Expected Result:
- ✅ Desktop: Full layout, sidebar visible
- ✅ Tablet: Responsive layout, scrollable table
- ✅ Mobile: Single column, hamburger menu
- ✅ Semua ukuran: Tombol tetap accessible
- ✅ Semua ukuran: Form tetap usable

### Status: [ ]

---

## ✅ Test Case 17: Browser Compatibility

### Browsers to Test:
- [ ] Chrome
- [ ] Firefox
- [ ] Edge
- [ ] Safari (if available)

### Expected Result:
- ✅ Semua fitur bekerja di semua browser
- ✅ Styling konsisten
- ✅ No console errors
- ✅ Print function works

### Status: [ ]

---

## ✅ Test Case 18: Performance

### Steps:
1. Tambah 50+ data pendapatan lain
2. Buka halaman
3. Cek loading time
4. Scroll tabel
5. Edit/delete data

### Expected Result:
- ✅ Page load < 2 detik
- ✅ Smooth scrolling
- ✅ No lag saat edit/delete
- ✅ No memory leak
- ✅ Responsive UI

### Status: [ ]

---

## ✅ Test Case 19: Data Persistence

### Steps:
1. Tambah beberapa data
2. Restart server
3. Refresh browser
4. Cek data

### Expected Result:
- ✅ Data tetap ada setelah restart
- ✅ Tidak ada data loss
- ✅ Database integrity maintained

### Status: [ ]

---

## ✅ Test Case 20: Security

### Steps:
1. Logout
2. Coba akses langsung: http://localhost:3000/api/transaksi/pendapatan-lain
3. Coba akses tanpa token

### Expected Result:
- ✅ Redirect ke login jika belum login
- ✅ API protected dengan JWT
- ✅ Unauthorized access ditolak
- ✅ Error 401/403 jika no token

### Status: [ ]

---

## 📊 Testing Summary

### Total Test Cases: 20

### Passed: [ ] / 20
### Failed: [ ] / 20
### Skipped: [ ] / 20

---

## 🐛 Bug Report Template

Jika menemukan bug, catat dengan format:

```
Bug ID: #001
Test Case: Test Case X
Severity: High/Medium/Low
Description: [Deskripsi bug]
Steps to Reproduce:
1. ...
2. ...
3. ...
Expected: [Yang diharapkan]
Actual: [Yang terjadi]
Screenshot: [Jika ada]
Browser: [Chrome/Firefox/etc]
Date: [Tanggal]
```

---

## ✅ Sign Off

### Tested By:
- Name: _______________
- Date: _______________
- Signature: _______________

### Approved By:
- Name: _______________
- Date: _______________
- Signature: _______________

---

## 📝 Notes

Catatan tambahan selama testing:

```
[Tulis catatan di sini]
```

---

**Happy Testing! 🧪**

Jika semua test case passed, fitur siap untuk production! ✅
