# Panduan Instalasi Koperasi NU Vibes

## Prasyarat

Sebelum menjalankan aplikasi, pastikan Anda sudah menginstall:

1. **Node.js** (versi 14 atau lebih baru)
   - Download dari: https://nodejs.org/
   - Pilih versi LTS (Long Term Support)
   - Install dengan mengikuti wizard instalasi

2. **npm** (biasanya sudah termasuk dengan Node.js)

## Cara Mengecek Instalasi

Buka Command Prompt atau PowerShell, lalu jalankan:

```bash
node --version
npm --version
```

Jika muncul nomor versi, berarti sudah terinstall dengan benar.

## Langkah Instalasi

### 1. Install Dependencies

Buka Command Prompt atau PowerShell di folder aplikasi ini, lalu jalankan:

```bash
npm install
```

Perintah ini akan menginstall semua package yang dibutuhkan:
- express (web framework)
- sqlite3 (database)
- bcryptjs (enkripsi password)
- jsonwebtoken (autentikasi)
- multer (upload file)
- cors (cross-origin)
- express-session (session management)
- pdfkit (generate PDF)
- exceljs (generate Excel)
- chart.js (grafik)

### 2. Jalankan Server

Setelah instalasi selesai, jalankan:

```bash
npm start
```

Atau untuk development mode dengan auto-reload:

```bash
npm run dev
```

### 3. Akses Aplikasi

Buka browser dan akses:

```
http://localhost:3000/login.html
```

### 4. Login

Gunakan kredensial default:
- **Username**: admin
- **Password**: admin123

## Troubleshooting

### Error: npm tidak dikenali

Jika muncul error "npm is not recognized", berarti Node.js belum terinstall atau belum masuk ke PATH.

**Solusi**:
1. Install Node.js dari https://nodejs.org/
2. Restart Command Prompt/PowerShell
3. Coba lagi

### Error: Port 3000 sudah digunakan

Jika port 3000 sudah digunakan aplikasi lain:

**Solusi**:
1. Ubah PORT di file `server.js` (baris: `const PORT = process.env.PORT || 3000;`)
2. Ganti 3000 dengan port lain, misalnya 3001
3. Restart server

### Database Error

Jika ada error database:

**Solusi**:
1. Hapus file `koperasi.db` jika ada
2. Restart server (database akan dibuat otomatis)

### Upload Error

Jika error saat upload file:

**Solusi**:
1. Pastikan folder `uploads` ada
2. Jika tidak ada, buat folder `uploads` di root project
3. Restart server

## Konfigurasi

### Mengubah Secret Key

Edit file `server.js`, cari baris:

```javascript
const SECRET_KEY = 'koperasi-nu-vibes-secret-key-2024';
```

Ganti dengan secret key Anda sendiri untuk keamanan lebih baik.

### Mengubah Port

Edit file `server.js`, cari baris:

```javascript
const PORT = process.env.PORT || 3000;
```

Ganti 3000 dengan port yang Anda inginkan.

## Backup Database

Database disimpan di file `koperasi.db`. Untuk backup:

1. Copy file `koperasi.db` ke lokasi aman
2. Untuk restore, copy kembali file tersebut ke folder aplikasi

## Update Aplikasi

Jika ada update:

1. Backup database (`koperasi.db`)
2. Download versi terbaru
3. Jalankan `npm install` lagi
4. Restore database
5. Restart server

## Kontak Support

Jika ada masalah atau pertanyaan, silakan hubungi tim support.

---

© 2024 Koperasi NU Vibes
