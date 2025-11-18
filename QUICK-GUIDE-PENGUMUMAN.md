# 🚀 Quick Guide - Fitur Pengumuman

## Cara Cepat Menggunakan Fitur Pengumuman

### 1️⃣ Untuk Admin

**Tambah Pengumuman:**
```
1. Login ke admin dashboard (http://localhost:3000)
2. Klik menu "Pengumuman" di sidebar
3. Klik "Tambah Pengumuman"
4. Isi form dan upload gambar
5. Klik "Simpan"
```

**Tips Upload Gambar:**
- Ukuran ideal: 1200x400px (rasio 3:1)
- Format: JPG, PNG, GIF
- Maksimal: 5MB
- Pastikan teks di gambar terbaca jelas

### 2️⃣ Untuk Member

**Lihat Banner:**
```
1. Login ke member portal (http://localhost:3000/member-login.html)
2. Banner otomatis muncul di dashboard
3. Banner berganti otomatis setiap 5 detik
4. Gunakan tombol ❮ ❯ untuk navigasi manual
```

### 3️⃣ Testing

**Jalankan Server:**
```bash
node server.js
```

**Buat Tabel (jika belum):**
```bash
node create-pengumuman-table.js
```

**Tambah Sample Data (opsional):**
```bash
node seed-pengumuman.js
```

### 4️⃣ API Endpoints

```
GET    /api/pengumuman          # List semua
GET    /api/pengumuman/aktif    # Hanya aktif
GET    /api/pengumuman/:id      # Detail
POST   /api/pengumuman          # Tambah
PUT    /api/pengumuman/:id      # Update
DELETE /api/pengumuman/:id      # Hapus
```

### 5️⃣ Troubleshooting

**Banner tidak muncul?**
- Pastikan ada pengumuman dengan status "aktif"
- Cek tanggal mulai & selesai
- Refresh halaman

**Gambar tidak muncul?**
- Pastikan folder `public/uploads` ada
- Cek ukuran file < 5MB
- Format harus JPG/PNG/GIF

---

📖 **Dokumentasi Lengkap**: Lihat `FITUR-PENGUMUMAN.md`
