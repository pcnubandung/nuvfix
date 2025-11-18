# 🔄 Instruksi Restart Server

## 📅 Tanggal
**17 November 2024**

---

## ⚠️ Error 404 pada `/api/public/stats`

### Penyebab
Server belum di-restart setelah perubahan kode, sehingga endpoint baru belum terdaftar.

---

## ✅ Cara Restart Server

### Opsi 1: Stop & Start Manual

#### Windows (CMD/PowerShell)
```bash
# 1. Stop server yang sedang berjalan
# Tekan Ctrl + C di terminal yang menjalankan server

# 2. Start server lagi
node server.js

# Expected output:
# Server running on http://localhost:3000
```

#### Jika Server Stuck
```bash
# 1. Cari process Node.js
tasklist | findstr node

# 2. Kill process
taskkill /F /IM node.exe

# 3. Start server lagi
node server.js
```

### Opsi 2: Gunakan Nodemon (Recommended)

#### Install Nodemon
```bash
npm install -g nodemon
```

#### Start dengan Nodemon
```bash
# Nodemon akan auto-restart saat ada perubahan file
nodemon server.js
```

---

## 🧪 Verifikasi Server Berjalan

### 1. Check Server Console
```
Harus muncul:
✅ Server running on http://localhost:3000
✅ Database initialized
```

### 2. Test Database Connection
```bash
# Buka browser atau curl
curl http://localhost:3000/api/test/db

# Expected response:
{
  "status": "success",
  "message": "Database connected",
  "connected": true,
  "totalAnggota": 5
}
```

### 3. Test Public Stats Endpoint
```bash
curl http://localhost:3000/api/public/stats

# Expected response:
{
  "totalAnggota": 5,
  "totalSimpanan": 15000000,
  "labaBersih": 5000000
}
```

### 4. Test Landing Page
```
1. Buka http://localhost:3000/landing.html
2. Buka Console (F12)
3. Harus muncul:
   ✅ "Loading statistics from /api/public/stats..."
   ✅ "Statistics loaded: {totalAnggota: 5, ...}"
   ✅ "Total Aset calculated: 20000000"
4. Statistik harus animated dari 0 ke nilai real
```

---

## 🔍 Troubleshooting

### Error: Port 3000 Already in Use

#### Windows
```bash
# 1. Cari process yang menggunakan port 3000
netstat -ano | findstr :3000

# 2. Kill process (ganti PID dengan nomor dari step 1)
taskkill /F /PID <PID>

# 3. Start server lagi
node server.js
```

#### Atau Ganti Port
```javascript
// Di server.js, ganti:
const PORT = process.env.PORT || 3000;

// Menjadi:
const PORT = process.env.PORT || 3001;
```

### Error: Cannot Find Module

```bash
# Install dependencies lagi
npm install

# Atau install specific module
npm install express sqlite3 bcryptjs jsonwebtoken multer
```

### Error: Database Locked

```bash
# 1. Stop semua instance server
taskkill /F /IM node.exe

# 2. Hapus file lock (jika ada)
del koperasi.db-journal

# 3. Start server lagi
node server.js
```

### Error: EADDRINUSE

```bash
# Port sudah digunakan, kill process:
npx kill-port 3000

# Atau manual:
netstat -ano | findstr :3000
taskkill /F /PID <PID>
```

---

## 📝 Checklist Setelah Restart

### Server Side
- [ ] Server running tanpa error
- [ ] Console log "Server running on http://localhost:3000"
- [ ] Database initialized
- [ ] No error messages

### API Endpoints
- [ ] `/api/test/db` returns success
- [ ] `/api/public/stats` returns data
- [ ] `/api/koperasi-info` returns data
- [ ] No 404 errors

### Landing Page
- [ ] Page loads tanpa error
- [ ] Logo loads (atau fallback ke default)
- [ ] Statistics animated dari 0
- [ ] Console logs muncul
- [ ] No 404 errors di Network tab

### Browser
- [ ] Hard refresh (`Ctrl + Shift + R`)
- [ ] Clear cache
- [ ] Check Network tab (F12)
- [ ] Check Console tab (F12)

---

## 🚀 Best Practices

### Development
```bash
# Gunakan nodemon untuk auto-restart
nodemon server.js

# Atau dengan npm script
# Tambahkan di package.json:
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}

# Jalankan:
npm run dev
```

### Production
```bash
# Gunakan PM2 untuk process management
npm install -g pm2

# Start dengan PM2
pm2 start server.js --name "koperasi-nu-vibes"

# Monitor
pm2 monit

# Restart
pm2 restart koperasi-nu-vibes

# Stop
pm2 stop koperasi-nu-vibes

# Logs
pm2 logs koperasi-nu-vibes
```

---

## 🔄 Auto-Restart Setup

### Install Nodemon
```bash
npm install --save-dev nodemon
```

### Update package.json
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "node test.js"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

### Create nodemon.json
```json
{
  "watch": [
    "server.js",
    "database.js",
    "routes-*.js",
    "*.js"
  ],
  "ignore": [
    "node_modules",
    "public",
    "uploads"
  ],
  "ext": "js,json",
  "delay": "1000"
}
```

### Run Development Server
```bash
npm run dev
```

---

## ✨ Expected Output

### Server Console
```
Server running on http://localhost:3000
Database initialized
```

### Browser Console (Landing Page)
```
Loading statistics from /api/public/stats...
Statistics loaded: {totalAnggota: 5, totalSimpanan: 15000000, labaBersih: 5000000}
Total Aset calculated: 20000000
Register buttons found: 2
Button 1: btn btn-primary Daftar Sekarang
Button 2: btn btn-cta Daftar Sebagai Anggota
CTA button found: <a>
```

### Network Tab (F12)
```
✅ GET /landing.html - 200 OK
✅ GET /css/landing.css - 200 OK
✅ GET /js/landing.js - 200 OK
✅ GET /api/public/stats - 200 OK
✅ GET /api/koperasi-info - 200 OK
⚠️ GET /uploads/logo.png - 404 (OK jika belum upload logo)
```

---

## 📞 Jika Masih Error

### 1. Check Server Logs
```bash
# Lihat console server
# Harus ada log: "Public stats: { totalAnggota: 5, ... }"
```

### 2. Check Database
```bash
# Buka SQLite
sqlite3 koperasi.db

# Test query
SELECT COUNT(*) FROM anggota WHERE status = 'aktif';
SELECT SUM(jumlah) FROM simpanan_pokok;
```

### 3. Check File Permissions
```bash
# Pastikan file bisa diakses
dir koperasi.db
dir server.js
```

### 4. Reinstall Dependencies
```bash
# Hapus node_modules
rmdir /s /q node_modules

# Install lagi
npm install
```

### 5. Check Node Version
```bash
node --version
# Harus >= 14.x

npm --version
# Harus >= 6.x
```

---

## ✅ Kesimpulan

Setelah restart server:
1. ✅ Endpoint `/api/public/stats` harus accessible
2. ✅ Landing page harus load tanpa error
3. ✅ Statistik harus animated dengan data real
4. ✅ Console logs harus muncul

**Langkah Penting:**
1. **Stop server** (Ctrl + C)
2. **Start server** (`node server.js`)
3. **Hard refresh browser** (Ctrl + Shift + R)
4. **Check console** untuk verify

---

**Dibuat oleh:** Kiro AI Assistant  
**Tanggal:** 17 November 2024  
**Kategori:** Server Management
