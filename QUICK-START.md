# Quick Start Guide - Koperasi NU Vibes

## 🚀 Cara Cepat Memulai

### Langkah 1: Persiapan

Pastikan **Node.js** sudah terinstall di komputer Anda.

**Cek instalasi Node.js:**
```bash
node --version
npm --version
```

**Jika belum terinstall:**
- Download dari: https://nodejs.org/
- Pilih versi LTS
- Install dengan default settings

### Langkah 2: Install Dependencies

**Cara Otomatis (Windows):**
```bash
# Double-click file start.bat
# atau jalankan di Command Prompt:
start.bat
```

**Cara Manual:**
```bash
# Buka Command Prompt atau PowerShell di folder aplikasi
npm install
```

### Langkah 3: Jalankan Aplikasi

**Cara Otomatis (Windows):**
```bash
# Double-click file start.bat
```

**Cara Manual:**
```bash
npm start
```

### Langkah 4: Akses Aplikasi

Buka browser dan akses:
```
http://localhost:3000/login.html
```

### Langkah 5: Login

Gunakan kredensial default:
- **Username:** `admin`
- **Password:** `admin123`

## 📱 Fitur Utama yang Bisa Langsung Dicoba

### 1. Dashboard
- Lihat statistik koperasi
- Grafik simpanan dan laba/rugi

### 2. Tambah Anggota
- Klik menu "Manajemen Anggota" > "Data Anggota"
- Klik tombol "+ Tambah Anggota"
- Isi form dan simpan

### 3. Input Simpanan
- Klik menu "Transaksi Simpanan" > pilih jenis simpanan
- Klik tombol "+ Tambah Transaksi"
- Pilih anggota, masukkan jumlah, simpan
- Cetak struk jika diperlukan

### 4. Input Penjualan
- Klik menu "Transaksi Keuangan" > "Hasil Penjualan"
- Klik tombol "+ Tambah Penjualan"
- Pilih unit usaha, masukkan data, simpan

### 5. Hitung SHU
- Klik menu "Sisa Hasil Usaha"
- Klik "Atur Komponen SHU"
- Atur persentase (total harus 100%)
- Klik "Hitung SHU"
- Lihat hasil SHU per anggota

## 🎯 Tips Penggunaan

### Urutan Penggunaan yang Disarankan:

1. **Setup Awal**
   - Edit Info Koperasi
   - Tambah Unit Usaha
   - Tambah User (jika perlu)

2. **Data Master**
   - Tambah Anggota
   - Upload foto anggota

3. **Transaksi Harian**
   - Input Simpanan
   - Input Partisipasi Anggota
   - Input Penjualan
   - Input Pengeluaran

4. **Akhir Periode**
   - Lihat Laporan
   - Hitung SHU
   - Cetak Laporan

## 🔐 Keamanan

### Ganti Password Default
1. Login sebagai admin
2. Klik menu "Pengaturan"
3. Klik "Edit" pada user admin
4. Masukkan password baru
5. Simpan

### Tambah User Baru
1. Klik menu "Pengaturan"
2. Klik "+ Tambah User"
3. Isi data user
4. Pilih role (Admin/Pengurus/Kasir)
5. Atur hak akses
6. Simpan

## 📊 Contoh Data untuk Testing

### Contoh Anggota:
- **Nomor Anggota:** A001
- **Nama:** Ahmad Fauzi
- **NIK:** 3201234567890123
- **Telepon:** 081234567890

### Contoh Unit Usaha:
- **Nama Usaha:** Toko Sembako
- **Deskripsi:** Penjualan kebutuhan pokok

### Contoh Simpanan Pokok:
- **Anggota:** A001 - Ahmad Fauzi
- **Jumlah:** Rp 100.000
- **Metode:** Tunai

### Contoh Penjualan:
- **Unit Usaha:** Toko Sembako
- **Penjualan:** Rp 5.000.000
- **HPP:** Rp 4.000.000
- **Keuntungan:** Rp 1.000.000 (otomatis)

## 🛠️ Troubleshooting Cepat

### Server tidak bisa dijalankan
```bash
# Cek apakah port 3000 sudah digunakan
# Solusi: Ubah port di server.js atau stop aplikasi yang menggunakan port 3000
```

### Tidak bisa login
```bash
# Pastikan menggunakan kredensial yang benar
# Username: admin
# Password: admin123
```

### Upload file gagal
```bash
# Pastikan folder 'uploads' ada
# Jika tidak ada, buat folder 'uploads' di root project
```

### Database error
```bash
# Hapus file koperasi.db
# Restart server (database akan dibuat otomatis)
```

## 📞 Bantuan

Jika mengalami masalah:
1. Baca file `INSTALASI.md` untuk panduan lengkap
2. Baca file `FITUR.md` untuk daftar fitur lengkap
3. Baca file `README.md` untuk dokumentasi teknis

## 🎨 Kustomisasi

### Mengubah Warna Tema
Edit file `public/css/style.css`, bagian `:root`:
```css
:root {
  --primary-green: #2d5016;  /* Warna hijau utama */
  --accent-gold: #d4af37;    /* Warna emas aksen */
  /* ... */
}
```

### Mengubah Logo
1. Login sebagai admin
2. Klik menu "Info Koperasi"
3. Klik "Edit Informasi"
4. Upload logo baru
5. Simpan

## 📈 Monitoring

### Cek Status Server
Server akan menampilkan log di console:
```
Server berjalan di http://localhost:3000
Database connected successfully
Default admin user created
```

### Cek Database
File database: `koperasi.db`
- Bisa dibuka dengan SQLite Browser
- Backup secara berkala

## 🔄 Update & Maintenance

### Backup Data
```bash
# Copy file koperasi.db ke lokasi aman
# Backup folder uploads jika ada file penting
```

### Restore Data
```bash
# Copy kembali file koperasi.db yang sudah dibackup
# Copy kembali folder uploads
```

## ✅ Checklist Setelah Instalasi

- [ ] Node.js terinstall
- [ ] Dependencies terinstall (`npm install`)
- [ ] Server berjalan (`npm start`)
- [ ] Bisa akses http://localhost:3000
- [ ] Bisa login dengan admin/admin123
- [ ] Dashboard tampil dengan benar
- [ ] Ganti password default
- [ ] Edit info koperasi
- [ ] Upload logo koperasi
- [ ] Tambah minimal 1 anggota
- [ ] Tambah minimal 1 unit usaha
- [ ] Test input simpanan
- [ ] Test cetak struk

## 🎉 Selamat!

Aplikasi Koperasi NU Vibes siap digunakan!

Mulai kelola koperasi Anda dengan lebih efisien dan modern.

---

**Koperasi NU Vibes** - Sistem Manajemen Koperasi Terpadu
© 2024 All Rights Reserved
