# 🔧 FIX: Database Reset Issue

## ✅ MASALAH DIPERBAIKI!

### 🎯 Masalah:

Data **Unit Usaha** dan **Aset Inventaris** selalu terhapus setiap kali server di-restart.

### 🔍 Penyebab:

Di file `database.js`, tabel `unit_usaha` dan `aset_inventaris` menggunakan `DROP TABLE IF EXISTS` yang menghapus tabel setiap kali server start!

**Kode Bermasalah:**
```javascript
// ❌ SALAH: Menghapus tabel setiap server start
db.run(`DROP TABLE IF EXISTS unit_usaha`, (err) => {
  db.run(`CREATE TABLE unit_usaha (...)`);
});

db.run(`DROP TABLE IF EXISTS aset_inventaris`, (err) => {
  db.run(`CREATE TABLE aset_inventaris (...)`);
});
```

Ini menyebabkan:
1. Server start
2. Tabel `unit_usaha` dihapus (DROP TABLE)
3. Tabel dibuat ulang (CREATE TABLE)
4. **Semua data hilang!**

### 🔧 Solusi:

Ubah `DROP TABLE IF EXISTS` menjadi `CREATE TABLE IF NOT EXISTS` seperti tabel lainnya.

**Kode yang Benar:**
```javascript
// ✅ BENAR: Hanya buat tabel jika belum ada
db.run(`CREATE TABLE IF NOT EXISTS unit_usaha (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_usaha TEXT NOT NULL,
  jenis_usaha TEXT,
  deskripsi TEXT,
  logo TEXT,
  status TEXT DEFAULT 'Aktif',
  tanggal_mulai DATE,
  modal_awal REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

db.run(`CREATE TABLE IF NOT EXISTS aset_inventaris (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  unit_usaha_id INTEGER,
  nama_aset TEXT NOT NULL,
  kategori TEXT,
  nilai REAL DEFAULT 0,
  nilai_sekarang REAL DEFAULT 0,
  tanggal_perolehan DATE,
  kondisi TEXT,
  FOREIGN KEY (unit_usaha_id) REFERENCES unit_usaha(id)
)`);
```

Sekarang:
1. Server start
2. Cek apakah tabel sudah ada
3. Jika sudah ada → **Skip** (data tetap aman)
4. Jika belum ada → Buat tabel baru

---

## 🚀 CARA TEST:

### 1. **Restart Server**

```bash
# Stop server (Ctrl+C di terminal)
npm start
```

### 2. **Tambah Data Unit Usaha**

1. Login ke aplikasi
2. Buka menu "Unit Usaha" → "Data Usaha"
3. Klik "Tambah Unit Usaha"
4. Isi data:
   - Nama Usaha: Toko Sembako
   - Jenis Usaha: Ritel
   - Status: Aktif
   - Modal Awal: 10000000
5. Klik "Simpan"

### 3. **Restart Server Lagi**

```bash
# Stop server (Ctrl+C)
npm start
```

### 4. **Cek Data**

1. Login ke aplikasi
2. Buka menu "Unit Usaha" → "Data Usaha"
3. **Data harus masih ada!** ✅

### 5. **Test Aset Inventaris**

1. Buka menu "Unit Usaha" → "Aset & Inventaris"
2. Klik "Tambah Aset"
3. Isi data aset
4. Klik "Simpan"
5. Restart server
6. **Data harus masih ada!** ✅

---

## ✅ Expected Behavior:

### Sebelum Fix:
❌ Restart server → Data Unit Usaha hilang
❌ Restart server → Data Aset Inventaris hilang
❌ Harus input ulang setiap restart

### Setelah Fix:
✅ Restart server → Data Unit Usaha tetap ada
✅ Restart server → Data Aset Inventaris tetap ada
✅ Data persisten (tidak hilang)

---

## 📋 Tabel yang Diperbaiki:

### File: `database.js`

**Tabel yang Diperbaiki:**
- [x] `unit_usaha` - Dari DROP TABLE ke CREATE IF NOT EXISTS
- [x] `aset_inventaris` - Dari DROP TABLE ke CREATE IF NOT EXISTS

**Tabel Lain (Sudah Benar):**
- [x] `koperasi_info` - CREATE IF NOT EXISTS ✅
- [x] `users` - CREATE IF NOT EXISTS ✅
- [x] `anggota` - CREATE IF NOT EXISTS ✅
- [x] `pengurus` - CREATE IF NOT EXISTS ✅
- [x] `karyawan` - CREATE IF NOT EXISTS ✅
- [x] `simpanan_*` - CREATE IF NOT EXISTS ✅
- [x] `transaksi_*` - CREATE IF NOT EXISTS ✅
- [x] `shu_*` - CREATE IF NOT EXISTS ✅

---

## 💡 Penjelasan Teknis:

### DROP TABLE vs CREATE IF NOT EXISTS

**DROP TABLE IF EXISTS:**
```sql
DROP TABLE IF EXISTS unit_usaha;  -- Hapus tabel jika ada
CREATE TABLE unit_usaha (...);    -- Buat tabel baru
```
- ❌ Menghapus tabel dan semua datanya
- ❌ Membuat tabel baru (kosong)
- ❌ Data hilang setiap restart

**CREATE TABLE IF NOT EXISTS:**
```sql
CREATE TABLE IF NOT EXISTS unit_usaha (...);  -- Buat hanya jika belum ada
```
- ✅ Jika tabel sudah ada → Skip (data aman)
- ✅ Jika tabel belum ada → Buat tabel baru
- ✅ Data persisten

### Kapan Menggunakan DROP TABLE?

`DROP TABLE` hanya digunakan untuk:
- Reset database (development)
- Migration (perubahan struktur tabel)
- Testing

**TIDAK untuk production/normal operation!**

---

## 🐛 Troubleshooting:

### Problem: Data masih hilang setelah restart

**Kemungkinan Penyebab:**
1. File `database.js` belum di-save
2. Server belum di-restart dengan kode baru
3. Ada script lain yang menghapus data

**Solusi:**
1. Pastikan file `database.js` sudah di-save
2. Stop server (Ctrl+C) dan start lagi
3. Cek apakah ada script `npm run reset-db` yang jalan otomatis

### Problem: Error "table already exists"

**Penyebab:** Tabel sudah ada tapi struktur berbeda

**Solusi:**
1. Backup data dulu (export ke Excel)
2. Reset database: `npm run reset-db`
3. Import data kembali

### Problem: Foreign key constraint error

**Penyebab:** Data referensi tidak ada (unit_usaha_id tidak valid)

**Solusi:**
1. Pastikan unit usaha sudah dibuat sebelum tambah aset
2. Cek apakah unit_usaha_id valid
3. Reset database jika perlu

---

## 🎯 Best Practices:

### Database Schema Changes:

**DO:**
- ✅ Gunakan `CREATE TABLE IF NOT EXISTS` untuk tabel normal
- ✅ Backup database sebelum perubahan struktur
- ✅ Test di development sebelum production
- ✅ Dokumentasikan perubahan schema

**DON'T:**
- ❌ Jangan gunakan `DROP TABLE` di production
- ❌ Jangan ubah struktur tabel tanpa migration
- ❌ Jangan hapus data tanpa backup
- ❌ Jangan test langsung di production

### Data Persistence:

**DO:**
- ✅ Backup database secara rutin
- ✅ Gunakan `CREATE IF NOT EXISTS`
- ✅ Test restart server untuk verifikasi
- ✅ Monitor data integrity

**DON'T:**
- ❌ Jangan andalkan data di memory
- ❌ Jangan skip backup
- ❌ Jangan abaikan error database
- ❌ Jangan hapus file .db

---

## 📊 Verification Checklist:

### Setelah Perbaikan:
- [ ] File `database.js` sudah di-save
- [ ] Server di-restart
- [ ] Tambah data unit usaha
- [ ] Restart server
- [ ] Data unit usaha masih ada ✅
- [ ] Tambah data aset inventaris
- [ ] Restart server
- [ ] Data aset masih ada ✅

### Long-term Monitoring:
- [ ] Data persisten setelah multiple restart
- [ ] Tidak ada data loss
- [ ] Foreign key relationships intact
- [ ] Backup database berfungsi

---

## 🎉 KESIMPULAN:

**Masalah database reset sudah diperbaiki!**

✅ Tabel `unit_usaha` tidak lagi di-drop setiap restart
✅ Tabel `aset_inventaris` tidak lagi di-drop setiap restart
✅ Data persisten dan aman
✅ Konsisten dengan tabel lainnya

**Sekarang data Unit Usaha dan Aset Inventaris akan tetap ada meskipun server di-restart berkali-kali!**

---

© 2024 Koperasi NU Vibes - Sistem Manajemen Koperasi Terpadu
