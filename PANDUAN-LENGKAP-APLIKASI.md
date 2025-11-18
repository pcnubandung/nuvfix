# 📚 PANDUAN LENGKAP APLIKASI KOPERASI NU VIBES

## Daftar Isi
1. [Pengenalan Aplikasi](#pengenalan-aplikasi)
2. [Instalasi & Setup](#instalasi--setup)
3. [Login & Akses](#login--akses)
4. [Dashboard & Beranda](#dashboard--beranda)
5. [Manajemen Data Master](#manajemen-data-master)
6. [Transaksi Simpanan](#transaksi-simpanan)
7. [Transaksi Keuangan](#transaksi-keuangan)
8. [Laporan Keuangan](#laporan-keuangan)
9. [Sistem SHU](#sistem-shu)
10. [Member Portal](#member-portal)
11. [Tips & Troubleshooting](#tips--troubleshooting)

---

## 1. Pengenalan Aplikasi

### Apa itu Koperasi NU Vibes?
Aplikasi Koperasi NU Vibes adalah sistem manajemen koperasi berbasis web yang dirancang untuk:
- Mengelola data anggota, pengurus, dan karyawan
- Mencatat transaksi simpanan dan keuangan
- Menghasilkan laporan keuangan otomatis
- Menghitung dan mendistribusikan SHU (Sisa Hasil Usaha)
- Memberikan akses mandiri kepada anggota melalui Member Portal

### Fitur Utama
✅ Manajemen Data Master (Anggota, Pengurus, Karyawan, Unit Usaha)
✅ Transaksi Simpanan (Pokok, Wajib, Khusus, Sukarela)
✅ Transaksi Keuangan (Penjualan, Pengeluaran, Pendapatan Lain, Partisipasi)
✅ Laporan Keuangan (Laba/Rugi, Neraca, Arus Kas)
✅ Sistem SHU Otomatis dengan Distribusi Per Anggota
✅ Member Portal untuk Akses Mandiri Anggota
✅ Export/Import Data (Excel/CSV)
✅ Cetak Dokumen Profesional
✅ Dashboard Real-time dengan Grafik

### Teknologi
- **Backend:** Node.js + Express + SQLite
- **Frontend:** Vanilla JavaScript + Modern CSS
- **Database:** SQLite (file-based, mudah backup)
- **Charts:** Chart.js untuk visualisasi data

---

## 2. Instalasi & Setup

### Persyaratan Sistem

- Node.js versi 14 atau lebih baru
- Browser modern (Chrome, Firefox, Edge)
- Minimal 100MB ruang disk
- RAM minimal 512MB

### Langkah Instalasi

#### 1. Install Node.js
Download dari https://nodejs.org dan install

#### 2. Extract Aplikasi
Extract file aplikasi ke folder pilihan Anda

#### 3. Install Dependencies
```bash
cd koperasi-nu-vibes
npm install
```

#### 4. Jalankan Aplikasi
```bash
node server.js
```

#### 5. Akses Aplikasi
Buka browser dan akses: `http://localhost:3000`

### Login Default
- **Username:** admin
- **Password:** admin123

⚠️ **PENTING:** Segera ganti password setelah login pertama!

---

## 3. Login & Akses

### Jenis Akses

#### 1. Admin
- Akses penuh ke semua fitur
- Dapat mengelola user dan pengaturan
- Dapat melihat semua laporan

#### 2. Kasir
- Akses transaksi simpanan dan keuangan
- Tidak dapat mengelola data master
- Tidak dapat mengakses pengaturan

#### 3. Pengawas
- Akses read-only untuk laporan
- Tidak dapat melakukan transaksi
- Fokus pada monitoring dan audit

#### 4. Member (Anggota)
- Akses melalui Member Portal
- Dapat melihat data pribadi dan transaksi
- Dapat melihat SHU yang diterima

### Cara Login

1. Buka `http://localhost:3000`
2. Masukkan username dan password
3. Klik "Login"
4. Anda akan diarahkan ke Dashboard

### Ganti Password

1. Klik foto profil di pojok kanan atas
2. Pilih "Profil"
3. Scroll ke bagian "Ganti Password"
4. Masukkan password lama dan password baru
5. Klik "Ganti Password"

---

## 4. Dashboard & Beranda

### Statistik Utama
Dashboard menampilkan 4 kartu statistik:


1. **Total Anggota** - Jumlah anggota aktif
2. **Total Simpanan** - Total semua jenis simpanan
3. **Total Pendapatan** - Penjualan + Pendapatan Lain
4. **SHU Tahun Berjalan** - Laba bersih tahun ini

### Grafik

#### Grafik 1: Komposisi Simpanan
- Menampilkan proporsi setiap jenis simpanan
- Format: Doughnut Chart
- Data: Simpanan Pokok, Wajib, Khusus, Sukarela

#### Grafik 2: Pendapatan Bulanan
- Menampilkan tren pendapatan per bulan
- Format: Line Chart
- Data: Penjualan + Pendapatan Lain per bulan

---

## 5. Manajemen Data Master

### 5.1 Data Anggota

#### Menambah Anggota Baru

1. Klik menu **"Data Anggota"**
2. Klik tombol **"+ Tambah Anggota"**
3. Isi form:
   - Nomor Anggota (wajib, unik)
   - Nama Lengkap (wajib)
   - NIK
   - Tempat & Tanggal Lahir
   - Jenis Kelamin
   - Alamat
   - Nomor Telepon
   - Email
   - Pekerjaan
   - Tanggal Bergabung
   - Username & Password (untuk Member Portal)
4. Upload foto (opsional)
5. Klik **"Simpan"**

#### Mencari Anggota

1. Gunakan search box di atas tabel
2. Ketik nama, nomor anggota, NIK, atau telepon
3. Hasil akan muncul secara real-time

#### Mengurutkan Data

1. Pilih kolom pengurutan dari dropdown
2. Klik tombol panah untuk mengubah urutan (A-Z atau Z-A)

#### Edit Anggota

1. Klik tombol **"Edit"** pada baris anggota
2. Ubah data yang diperlukan
3. Klik **"Simpan"**

#### Hapus Anggota

1. Klik tombol **"Hapus"** pada baris anggota
2. Konfirmasi penghapusan
3. Data akan dihapus permanen

⚠️ **Perhatian:** Hapus anggota akan menghapus semua data terkait (simpanan, transaksi, dll)

#### Export Data Anggota

1. Klik tombol **"Export Excel"**
2. File CSV akan terdownload
3. Buka dengan Excel atau Google Sheets


#### Import Data Anggota

1. Klik tombol **"Import Excel"**
2. Download template jika belum punya
3. Isi data anggota di template
4. Upload file
5. Klik **"Import"**

#### Cetak Data Anggota

1. Klik tombol **"Cetak"**
2. Preview akan muncul di window baru
3. Klik **"Cetak Dokumen"** atau tekan Ctrl+P

### 5.2 Data Pengurus

#### Menambah Pengurus

1. Klik menu **"Data Pengurus"**
2. Klik **"+ Tambah Pengurus"**
3. Pilih anggota dari dropdown (dengan fitur pencarian)
4. Pilih jabatan:
   - Ketua
   - Wakil Ketua
   - Sekretaris
   - Bendahara
   - Pengawas
   - Anggota Pengurus
5. Tentukan periode mulai dan selesai
6. Klik **"Simpan"**

💡 **Tips:** Gunakan search box untuk mencari anggota dengan cepat

### 5.3 Data Karyawan

#### Menambah Karyawan

1. Klik menu **"Data Karyawan"**
2. Klik **"+ Tambah Karyawan"**
3. Isi data lengkap karyawan
4. Pilih unit usaha (jika ada)
5. Tentukan gaji
6. Klik **"Simpan"**

### 5.4 Unit Usaha

#### Menambah Unit Usaha

1. Klik menu **"Unit Usaha"**
2. Klik **"+ Tambah Unit Usaha"**
3. Isi:
   - Nama Usaha
   - Jenis Usaha
   - Deskripsi
   - Modal Awal
   - Tanggal Mulai
4. Upload logo (opsional)
5. Klik **"Simpan"**

### 5.5 Info Koperasi

#### Mengatur Info Koperasi

1. Klik menu **"Info Koperasi"**
2. Isi/edit:
   - Nama Koperasi
   - Alamat
   - Nomor Telepon
   - Email
   - Nomor Induk Koperasi
   - Nomor Induk Berusaha
   - Nomor Badan Hukum
   - Tanggal Berdiri
3. Upload logo koperasi
4. Klik **"Simpan"**

💡 Logo akan muncul di sidebar dan dokumen cetak

---

## 6. Transaksi Simpanan

### Jenis Simpanan


#### 1. Simpanan Pokok
- Dibayar sekali saat menjadi anggota
- Tidak dapat ditarik selama masih menjadi anggota
- Jumlah sama untuk semua anggota

#### 2. Simpanan Wajib
- Dibayar rutin setiap bulan
- Jumlah sama untuk semua anggota
- Dapat ditarik saat keluar dari keanggotaan

#### 3. Simpanan Khusus
- Simpanan dengan tujuan tertentu
- Jumlah dan waktu fleksibel
- Dapat ditarik sesuai ketentuan

#### 4. Simpanan Sukarela
- Simpanan bebas, bisa setor dan tarik kapan saja
- Jumlah tidak ditentukan
- Seperti tabungan biasa

### Cara Mencatat Transaksi Simpanan

#### Metode 1: Tambah Per Jenis

1. Klik menu simpanan yang sesuai (Pokok/Wajib/Khusus/Sukarela)
2. Klik **"+ Tambah Transaksi"**
3. Pilih anggota (gunakan search untuk mencari)
4. Masukkan jumlah
5. Pilih tanggal transaksi
6. Pilih metode pembayaran (Tunai/Transfer/E-Wallet)
7. Tambahkan keterangan (opsional)
8. Klik **"Simpan"**

#### Metode 2: Tambah Unified (Semua Jenis)

1. Klik menu **"Simpanan Pokok"** (atau jenis lainnya)
2. Klik **"+ Tambah Transaksi"**
3. Pilih jenis simpanan dari dropdown
4. Untuk Simpanan Sukarela, pilih jenis transaksi (Setoran/Penarikan)
5. Lengkapi data lainnya
6. Klik **"Simpan"**

### Filter & Pencarian Simpanan

#### Filter Berdasarkan:
- Jenis Simpanan
- Anggota
- Rentang Tanggal
- Metode Pembayaran

#### Cara Filter:
1. Pilih filter yang diinginkan
2. Data akan otomatis ter-filter
3. Klik "Reset Filter" untuk menghapus filter

### Cetak Struk Simpanan

1. Klik tombol **"Cetak"** pada baris transaksi
2. Struk akan muncul di window baru
3. Otomatis print atau tekan Ctrl+P

Format struk:
- Kop surat koperasi
- Jenis simpanan
- Nomor transaksi
- Data anggota
- Jumlah
- Nama kasir
- Tanggal cetak

---

## 7. Transaksi Keuangan

### 7.1 Hasil Penjualan

#### Mencatat Penjualan

1. Klik menu **"Hasil Penjualan"**
2. Klik **"+ Tambah Penjualan"**
3. Pilih unit usaha
4. Masukkan:
   - Jumlah penjualan (bruto)
   - HPP (Harga Pokok Penjualan)
   - Tanggal transaksi
   - Keterangan
5. Keuntungan akan dihitung otomatis
6. Klik **"Simpan"**

💡 **Formula:** Keuntungan = Jumlah Penjualan - HPP


### 7.2 Pengeluaran

#### Kategori Pengeluaran

1. **Pembelian Barang** - Masuk ke Persediaan (Neraca)
2. **Pembelian Aset & Inventaris** - Masuk ke Aktiva Tetap (Neraca)
3. **Gaji Karyawan** - Biaya Operasional
4. **Biaya Listrik & Air** - Biaya Operasional
5. **Biaya Transportasi** - Biaya Operasional
6. **Biaya Administrasi** - Biaya Operasional
7. **Biaya Lain-lain** - Biaya Operasional

#### Mencatat Pengeluaran

1. Klik menu **"Pengeluaran"**
2. Klik **"+ Tambah Pengeluaran"**
3. Pilih unit usaha
4. Pilih kategori pengeluaran
5. Masukkan jumlah
6. Pilih tanggal transaksi
7. Tambahkan keterangan
8. Klik **"Simpan"**

⚠️ **Penting:** Pilih kategori dengan benar karena mempengaruhi laporan keuangan

### 7.3 Pendapatan Lain

#### Jenis Pendapatan Lain
- Bunga Bank
- Sewa Aset
- Donasi
- Hibah
- Pendapatan Non-Operasional lainnya

#### Mencatat Pendapatan Lain

1. Klik menu **"Pendapatan Lain"**
2. Klik **"+ Tambah Pendapatan Lain"**
3. Pilih unit usaha
4. Pilih sumber pendapatan
5. Masukkan jumlah
6. Pilih tanggal transaksi
7. Tambahkan keterangan
8. Klik **"Simpan"**

### 7.4 Partisipasi Anggota

#### Apa itu Partisipasi Anggota?
Transaksi pembelian/penggunaan jasa oleh anggota yang akan diperhitungkan dalam pembagian SHU.

#### Mencatat Partisipasi

1. Klik menu **"Partisipasi Anggota"**
2. Klik **"+ Tambah Partisipasi"**
3. Pilih anggota (gunakan search)
4. Pilih unit usaha
5. Masukkan jumlah transaksi
6. Pilih tanggal
7. Klik **"Simpan"**

💡 Data ini digunakan untuk menghitung SHU Jasa Transaksi

---

## 8. Laporan Keuangan

### 8.1 Laporan Laba/Rugi

#### Struktur Laporan

**PENDAPATAN**
- Penjualan
- Pendapatan Lain
- **Total Pendapatan**

**HARGA POKOK PENJUALAN (HPP)**
- HPP

**LABA KOTOR** = Total Pendapatan - HPP

**PENGELUARAN**
- Biaya Operasional (tanpa Pembelian Barang & Aset)

**LABA BERSIH** = Laba Kotor - Biaya Operasional


#### Cara Melihat Laporan

1. Klik menu **"Laporan Keuangan"**
2. Pilih jenis laporan: **"Laba/Rugi"**
3. Pilih periode:
   - Harian (pilih tanggal)
   - Bulanan (pilih bulan & tahun)
   - Tahunan (pilih tahun)
   - Semua Periode
4. Klik **"Tampilkan"**
5. Laporan akan muncul di bawah

#### Cetak Laporan

1. Klik tombol **"Cetak"**
2. Preview akan muncul dengan format profesional
3. Klik **"Cetak Dokumen"**

### 8.2 Neraca

#### Struktur Neraca

**AKTIVA**
- Kas & Bank
- Persediaan (dari Pembelian Barang - HPP)
- Aktiva Tetap (dari Pembelian Aset)
- **Total Aktiva**

**PASIVA**
- Simpanan (Pokok + Wajib + Khusus + Sukarela)
- Cadangan (dari SHU tahun sebelumnya)
- SHU Tahun Berjalan (= Laba Bersih)
- **Total Pasiva**

✅ **Total Aktiva = Total Pasiva** (Balanced)

#### Formula Kas & Bank
```
Kas & Bank = Total Simpanan + Laba Bersih - Persediaan - Aktiva Tetap
```

### 8.3 Laporan Arus Kas

#### Struktur Arus Kas

**AKTIVITAS OPERASIONAL**
- Penerimaan: Penjualan + Pendapatan Lain
- Pengeluaran: HPP + Biaya Operasional
- **Kas Operasional**

**AKTIVITAS INVESTASI**
- Persediaan (Pembelian Barang)
- Aset Tetap (Pembelian Aset)
- **Kas Investasi** (negatif)

**AKTIVITAS PENDANAAN**
- Simpanan (semua jenis)
- **Kas Pendanaan**

**KENAIKAN KAS** = Kas Operasional + Kas Investasi + Kas Pendanaan
**KAS AKHIR** = Kas Awal + Kenaikan Kas

---

## 9. Sistem SHU

### Apa itu SHU?
SHU (Sisa Hasil Usaha) adalah keuntungan koperasi yang dibagikan kepada anggota berdasarkan:
1. Jasa Simpanan (kontribusi modal)
2. Jasa Transaksi (partisipasi usaha)

### 9.1 Mengatur Komponen SHU

#### Langkah-langkah:

1. Klik menu **"SHU"**
2. Pilih tahun
3. Klik **"Atur Komponen SHU"**
4. Atur persentase:
   - **Cadangan** (misal: 40%)
   - **Jasa Simpanan** (misal: 25%)
   - **Jasa Transaksi** (misal: 25%)
   - **Pengurus & Pengawas** (misal: 5%)
   - **Pegawai** (misal: 3%)
   - **Dana Pendidikan** (misal: 1%)
   - **Dana Sosial** (misal: 1%)
5. Total harus = 100%
6. Klik **"Simpan"**


### 9.2 Menghitung SHU

#### Langkah-langkah:

1. Pastikan komponen SHU sudah diatur
2. Klik tombol **"Hitung SHU"**
3. Sistem akan menghitung otomatis:
   - Keuntungan bersih tahun ini
   - SHU yang dibagikan ke anggota
   - SHU per anggota berdasarkan simpanan dan transaksi
4. Hasil akan muncul di tabel

#### Formula Perhitungan:

```
Keuntungan Bersih = Laba Bersih (dari Laporan Laba/Rugi)

SHU Jasa Simpanan = Keuntungan Bersih × % Jasa Simpanan
SHU Jasa Transaksi = Keuntungan Bersih × % Jasa Transaksi

SHU Anggota = SHU Simpanan + SHU Transaksi

Dimana:
- SHU Simpanan = (Total Simpanan Anggota / Total Simpanan Semua) × SHU Jasa Simpanan
- SHU Transaksi = (Total Transaksi Anggota / Total Transaksi Semua) × SHU Jasa Transaksi
```

### 9.3 Melihat SHU Per Anggota

1. Setelah SHU dihitung, tabel akan menampilkan:
   - Nomor Anggota
   - Nama Anggota
   - Total Simpanan
   - Total Transaksi
   - SHU Simpanan
   - SHU Transaksi
   - **Total SHU**
2. Data diurutkan berdasarkan nomor anggota

### 9.4 Cetak SHU Per Anggota

1. Klik tombol **"Cetak"**
2. Dokumen akan muncul dengan format profesional:
   - Kop surat koperasi
   - Tabel lengkap SHU per anggota
   - Total di baris terakhir
3. Klik **"Cetak Dokumen"**

### 9.5 Export SHU

1. Klik tombol **"Export Excel"**
2. File CSV akan terdownload
3. Buka dengan Excel untuk analisis lebih lanjut

### 9.6 Reset SHU

⚠️ **Hati-hati!** Reset akan menghapus semua data SHU tahun tersebut.

1. Klik tombol **"Reset SHU"**
2. Konfirmasi penghapusan
3. Data SHU akan dihapus
4. Anda bisa menghitung ulang jika diperlukan

---

## 10. Member Portal

### Apa itu Member Portal?
Portal khusus untuk anggota mengakses data pribadi dan transaksi mereka secara mandiri.

### 10.1 Akses Member Portal

#### URL:
```
http://localhost:3000/member.html
```

#### Login:
- Username: Sesuai yang diatur saat mendaftar anggota
- Password: Sesuai yang diatur saat mendaftar anggota

### 10.2 Fitur Member Portal

#### Dashboard Member
- Total Simpanan (semua jenis)
- Total Partisipasi Transaksi
- SHU Tahun Ini
- Grafik Simpanan Bulanan


#### Riwayat Simpanan
- Melihat semua transaksi simpanan
- Filter berdasarkan jenis dan tanggal
- Cetak struk transaksi

#### Riwayat Partisipasi
- Melihat transaksi partisipasi
- Total transaksi per periode

#### Laporan Keuangan
- Laba/Rugi
- Neraca
- Arus Kas
- Sama seperti di admin, tapi read-only

#### SHU Saya
- Melihat SHU yang diterima
- Detail perhitungan SHU
- Riwayat SHU tahun-tahun sebelumnya

#### Profil
- Melihat data pribadi
- Update foto profil
- Ganti password

---

## 11. Tips & Troubleshooting

### Tips Penggunaan

#### 1. Backup Data Rutin
```bash
# Backup database
copy koperasi.db koperasi-backup-YYYYMMDD.db
```

#### 2. Gunakan Fitur Pencarian
- Semua halaman data memiliki fitur pencarian
- Ketik langsung untuk mencari
- Lebih cepat daripada scroll

#### 3. Filter Data
- Gunakan filter untuk mempersempit data
- Kombinasikan beberapa filter
- Reset filter jika sudah tidak diperlukan

#### 4. Export Data Berkala
- Export data penting ke Excel
- Simpan sebagai backup tambahan
- Mudah untuk analisis eksternal

#### 5. Cetak Dokumen
- Semua laporan bisa dicetak
- Format profesional dengan kop surat
- Gunakan untuk dokumentasi fisik

### Troubleshooting

#### Masalah: Aplikasi tidak bisa diakses

**Solusi:**
1. Pastikan server berjalan (`node server.js`)
2. Cek port 3000 tidak digunakan aplikasi lain
3. Coba akses `http://127.0.0.1:3000`

#### Masalah: Login gagal

**Solusi:**
1. Pastikan username dan password benar
2. Cek caps lock tidak aktif
3. Reset password melalui admin jika lupa

#### Masalah: Data tidak muncul

**Solusi:**
1. Refresh browser (Ctrl + R)
2. Clear cache browser (Ctrl + Shift + Delete)
3. Cek koneksi ke server
4. Cek console browser untuk error (F12)

#### Masalah: Laporan tidak sesuai

**Solusi:**
1. Pastikan semua transaksi sudah dicatat
2. Cek kategori pengeluaran sudah benar
3. Pastikan tanggal transaksi akurat
4. Recalculate jika perlu

#### Masalah: SHU tidak bisa dihitung

**Solusi:**
1. Pastikan komponen SHU sudah diatur
2. Total persentase harus = 100%
3. Pastikan ada transaksi di tahun tersebut
4. Cek data simpanan dan partisipasi anggota


#### Masalah: Grafik tidak muncul

**Solusi:**
1. Refresh halaman
2. Pastikan ada data untuk ditampilkan
3. Cek console browser untuk error
4. Pastikan Chart.js ter-load

#### Masalah: File tidak bisa diupload

**Solusi:**
1. Cek ukuran file (max 2MB untuk foto)
2. Pastikan format file benar (JPG, PNG untuk foto)
3. Cek folder `uploads/` ada dan writable
4. Cek permission folder

#### Masalah: Export/Import gagal

**Solusi:**
1. Pastikan format file benar (CSV)
2. Cek encoding file (UTF-8)
3. Pastikan kolom sesuai template
4. Hapus baris kosong di file

### Best Practices

#### 1. Pencatatan Transaksi
- Catat transaksi setiap hari
- Jangan menunda pencatatan
- Simpan bukti transaksi fisik
- Cross-check dengan buku kas manual

#### 2. Pengelolaan User
- Buat user sesuai kebutuhan
- Gunakan role yang tepat
- Ganti password secara berkala
- Nonaktifkan user yang tidak aktif

#### 3. Laporan Keuangan
- Generate laporan setiap akhir bulan
- Cetak dan arsipkan
- Review bersama pengurus
- Bandingkan dengan periode sebelumnya

#### 4. SHU
- Hitung SHU setiap akhir tahun
- Sosialisasikan ke anggota
- Dokumentasikan perhitungan
- Distribusikan sesuai ketentuan

#### 5. Backup & Security
- Backup database setiap minggu
- Simpan backup di tempat aman
- Jangan share password
- Logout setelah selesai

---

## Lampiran

### A. Shortcut Keyboard

| Shortcut | Fungsi |
|----------|--------|
| Ctrl + R | Refresh halaman |
| Ctrl + P | Print dokumen |
| Ctrl + F | Cari di halaman |
| Ctrl + Shift + R | Hard refresh (clear cache) |
| F12 | Buka Developer Tools |
| Esc | Tutup modal/dialog |

### B. Format Data Import

#### Template Anggota (CSV)
```
Nomor Anggota,Nama Lengkap,NIK,Tempat Lahir,Tanggal Lahir,Jenis Kelamin,Alamat,Nomor Telepon,Email,Pekerjaan,Tanggal Bergabung,Username,Password
NUV001,Ahmad Fauzi,3201012345678901,Jakarta,1990-01-15,Laki-laki,Jl. Merdeka No. 123,081234567890,ahmad@email.com,Wiraswasta,2025-01-01,ahmad,password123
```

### C. Struktur Database

#### Tabel Utama:
- `anggota` - Data anggota
- `pengurus` - Data pengurus
- `karyawan` - Data karyawan
- `unit_usaha` - Data unit usaha
- `simpanan_pokok` - Transaksi simpanan pokok
- `simpanan_wajib` - Transaksi simpanan wajib
- `simpanan_khusus` - Transaksi simpanan khusus
- `simpanan_sukarela` - Transaksi simpanan sukarela
- `transaksi_penjualan` - Transaksi penjualan
- `pengeluaran` - Transaksi pengeluaran
- `pendapatan_lain` - Transaksi pendapatan lain
- `partisipasi_anggota` - Transaksi partisipasi
- `komponen_shu` - Komponen pembagian SHU
- `shu_anggota` - Hasil perhitungan SHU
- `users` - Data user sistem


### D. Kontak & Support

#### Dokumentasi Lengkap
- `DOKUMENTASI-LENGKAP.md` - Dokumentasi teknis
- `API-REFERENCE.md` - Dokumentasi API
- `INSTALASI.md` - Panduan instalasi detail
- `PANDUAN-HOSTING.md` - Panduan deploy ke hosting

#### File Penting
- `README.md` - Informasi umum aplikasi
- `FITUR.md` - Daftar fitur lengkap
- `QUICK-START.md` - Panduan cepat memulai

---

## Kesimpulan

Aplikasi Koperasi NU Vibes dirancang untuk memudahkan pengelolaan koperasi secara digital. Dengan mengikuti panduan ini, Anda dapat:

✅ Mengelola data anggota dan transaksi dengan mudah
✅ Menghasilkan laporan keuangan yang akurat
✅ Menghitung dan mendistribusikan SHU secara otomatis
✅ Memberikan akses mandiri kepada anggota
✅ Mencetak dokumen profesional
✅ Menganalisis performa koperasi dengan grafik

### Langkah Selanjutnya

1. **Mulai dengan Data Master**
   - Input data koperasi
   - Tambahkan anggota
   - Atur pengurus dan karyawan

2. **Catat Transaksi Rutin**
   - Simpanan bulanan
   - Penjualan harian
   - Pengeluaran operasional

3. **Generate Laporan Berkala**
   - Laporan bulanan
   - Review keuangan
   - Analisis performa

4. **Hitung SHU Tahunan**
   - Atur komponen
   - Hitung distribusi
   - Sosialisasikan ke anggota

### Dukungan

Jika mengalami kesulitan atau memiliki pertanyaan:
1. Baca dokumentasi lengkap
2. Cek bagian troubleshooting
3. Lihat file README.md
4. Hubungi administrator sistem

---

**Selamat menggunakan Aplikasi Koperasi NU Vibes!**

*Semoga aplikasi ini membantu koperasi Anda berkembang dan memberikan manfaat maksimal kepada anggota.*

---

**Versi Panduan:** 1.0  
**Tanggal:** November 2025  
**Aplikasi:** Koperasi NU Vibes v1.0

---

© 2025 Koperasi NU Vibes. All rights reserved.
