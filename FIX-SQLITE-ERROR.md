# 🔧 CARA MEMPERBAIKI SQLITE ERROR

## Masalah
Error: `SQLITE_ERROR` pada tabel `unit_usaha`

## Penyebab
Tabel `unit_usaha` yang lama tidak memiliki field baru (jenis_usaha, tanggal_mulai, modal_awal)

## ✅ SOLUSI 1: Reset Database (RECOMMENDED)

### Langkah-langkah:

**1. Stop Server**
```bash
# Tekan Ctrl+C di terminal untuk stop server
```

**2. Reset Database**
```bash
npm run reset-db
```

**3. Start Server Lagi**
```bash
npm start
```

**4. Refresh Browser**
```bash
Ctrl + Shift + R
```

**5. Login**
```
Username: admin
Password: admin123
```

### ⚠️ CATATAN:
- Semua data akan hilang (anggota, simpanan, transaksi, dll)
- Database akan dibuat ulang dengan struktur yang benar
- User admin default akan dibuat otomatis

---

## ✅ SOLUSI 2: Hapus Database Manual

### Langkah-langkah:

**1. Stop Server**
```bash
Ctrl+C
```

**2. Hapus File Database**
- Cari file `koperasi.db` di folder project
- Hapus file tersebut

**3. Start Server Lagi**
```bash
npm start
```

**4. Refresh Browser**
```bash
Ctrl + Shift + R
```

---

## ✅ SOLUSI 3: Backup Data Dulu (Jika Ada Data Penting)

### Langkah-langkah:

**1. Backup Database**
```bash
# Copy file koperasi.db ke folder lain
# Misalnya: koperasi.db.backup
```

**2. Export Data Penting**
- Login ke aplikasi
- Export data anggota (jika ada)
- Export data transaksi (jika ada)
- Simpan file CSV

**3. Reset Database**
```bash
npm run reset-db
```

**4. Start Server**
```bash
npm start
```

**5. Import Data Kembali**
- Login ke aplikasi
- Import data anggota dari CSV
- Input ulang data lain yang penting

---

## 🔍 Verifikasi Setelah Fix

### Cek Database Berhasil Dibuat:

**1. Cek Console Server**
Harus muncul:
```
Database connected successfully
Table unit_usaha created successfully
Default admin user created
Default koperasi info created
```

**2. Cek Aplikasi**
- Buka http://localhost:3000/login.html
- Login dengan admin/admin123
- Buka menu "Unit Usaha"
- Klik "Tambah Unit Usaha"
- Verifikasi field baru muncul:
  - Jenis Usaha (dropdown)
  - Status (dropdown)
  - Tanggal Mulai (date)
  - Modal Awal (number)

**3. Test Tambah Unit Usaha**
- Isi semua field
- Klik Simpan
- Verifikasi data tersimpan
- Verifikasi tile tampil dengan benar

---

## 🐛 Jika Masih Error

### Error: "Cannot read property..."
**Solusi:**
```bash
# Clear browser cache
Ctrl + Shift + Delete
# Pilih "Cached images and files"
# Clear data
# Refresh browser
```

### Error: "Database is locked"
**Solusi:**
```bash
# Stop semua instance server
# Cari process node yang masih jalan
# Kill process tersebut
# Start server lagi
```

### Error: "ENOENT: no such file or directory"
**Solusi:**
```bash
# Pastikan folder 'uploads' ada
mkdir uploads
# Start server lagi
npm start
```

---

## 📝 Struktur Database Baru

### Tabel unit_usaha:
```sql
CREATE TABLE unit_usaha (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_usaha TEXT NOT NULL,
  jenis_usaha TEXT,              -- BARU
  deskripsi TEXT,
  logo TEXT,
  status TEXT DEFAULT 'Aktif',   -- UPDATED
  tanggal_mulai DATE,            -- BARU
  modal_awal REAL DEFAULT 0,     -- BARU
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Field Baru:
1. **jenis_usaha** - Jenis usaha (Ritel/Kuliner/Jasa)
2. **tanggal_mulai** - Tanggal mulai operasional
3. **modal_awal** - Modal awal usaha dalam Rupiah
4. **status** - Status usaha (Aktif/Tidak Aktif)

---

## ✅ Checklist Setelah Fix

- [ ] Server berjalan tanpa error
- [ ] Database terbuat dengan benar
- [ ] Login berhasil (admin/admin123)
- [ ] Menu Unit Usaha bisa dibuka
- [ ] Form tambah unit usaha tampil lengkap
- [ ] Field baru muncul (jenis_usaha, status, tanggal_mulai, modal_awal)
- [ ] Bisa tambah unit usaha baru
- [ ] Data tersimpan dengan benar
- [ ] Tile unit usaha tampil dengan benar
- [ ] Bisa edit unit usaha
- [ ] Bisa hapus unit usaha

---

## 🎯 Tips Mencegah Error di Masa Depan

### 1. Backup Berkala
```bash
# Backup database setiap hari/minggu
cp koperasi.db backup/koperasi-$(date +%Y%m%d).db
```

### 2. Export Data Penting
- Export data anggota secara berkala
- Export data transaksi bulanan
- Simpan di cloud storage

### 3. Test di Development
- Test perubahan database di development dulu
- Jangan langsung di production
- Gunakan database terpisah untuk testing

### 4. Version Control
- Commit perubahan database schema
- Dokumentasikan migration
- Simpan di Git

---

## 📞 Bantuan Lebih Lanjut

Jika masih ada masalah:

1. **Cek Console Browser** (F12)
   - Lihat error di tab Console
   - Screenshot error
   
2. **Cek Console Server**
   - Lihat error di terminal
   - Screenshot error

3. **Cek File Database**
   - Pastikan file koperasi.db ada
   - Cek ukuran file (tidak 0 KB)

4. **Restart Komputer**
   - Kadang membantu clear semua cache
   - Start fresh

---

## 🎉 Setelah Fix Berhasil

Aplikasi siap digunakan dengan:
- ✅ Database baru dengan struktur lengkap
- ✅ Tabel unit_usaha dengan 8 field
- ✅ Semua menu berfungsi normal
- ✅ Fitur export/import/edit/hapus aktif
- ✅ Tile rekap di setiap transaksi
- ✅ Laporan keuangan lengkap
- ✅ Pembatasan hak akses kasir

**Selamat menggunakan!** 🎊

---

© 2024 Koperasi NU Vibes - Sistem Manajemen Koperasi Terpadu
