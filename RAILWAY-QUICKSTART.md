# 🚀 Railway Quick Start Guide

## Langkah Cepat Deploy (5 Menit)

### 1. Persiapan Git

```bash
# Pastikan semua file sudah di-commit
git add .
git commit -m "Ready for Railway deployment"

# Push ke GitHub (jika belum)
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

### 2. Deploy ke Railway

1. **Buka Railway:** https://railway.app
2. **Login dengan GitHub**
3. **Klik "New Project"**
4. **Pilih "Deploy from GitHub repo"**
5. **Pilih repository Anda**
6. **Tunggu deployment selesai** (2-3 menit)

### 3. Setup Volume (PENTING!)

SQLite butuh persistent storage:

1. Klik project Anda di Railway dashboard
2. Klik tab **"Settings"**
3. Scroll ke **"Volumes"**
4. Klik **"New Volume"**
5. Isi:
   - **Mount Path:** `/app/data`
   - Klik **"Add"**

### 4. Setup Environment Variables

1. Klik tab **"Variables"**
2. Klik **"New Variable"**
3. Tambahkan satu per satu:

```bash
NODE_ENV=production
PORT=3000
DATABASE_PATH=/app/data/koperasi.db
UPLOAD_PATH=/app/data/uploads
MAX_FILE_SIZE=5242880
```

4. **Generate JWT_SECRET:**
   - Buka terminal lokal
   - Jalankan: `node generate-secret.js`
   - Copy hasilnya
   - Tambahkan variable: `JWT_SECRET=<hasil-generate>`

5. Klik **"Deploy"** untuk restart dengan config baru

### 5. Akses Aplikasi

1. Tunggu deployment selesai (cek di tab "Deployments")
2. Klik URL yang muncul (format: `https://xxx.up.railway.app`)
3. Login dengan:
   - **Username:** `admin`
   - **Password:** `admin123`

### 6. Ganti Password Admin

Setelah login pertama kali:
1. Masuk ke menu **Pengaturan > Manajemen User**
2. Edit user admin
3. Ganti password

---

## Troubleshooting Cepat

### ❌ Error: Database locked
**Solusi:** Volume belum di-mount. Ulangi langkah 3.

### ❌ Error: Cannot write to database
**Solusi:** Cek `DATABASE_PATH` harus `/app/data/koperasi.db`

### ❌ Error: File upload gagal
**Solusi:** Cek `UPLOAD_PATH` harus `/app/data/uploads`

### ❌ Aplikasi tidak bisa diakses
**Solusi:** 
1. Cek logs: Klik "View Logs" di Railway
2. Pastikan PORT menggunakan `process.env.PORT`

---

## Update Aplikasi

Setelah deploy, update sangat mudah:

```bash
# Edit code
git add .
git commit -m "Update feature"
git push

# Railway akan auto-deploy! 🎉
```

---

## Custom Domain (Opsional)

1. Di Railway dashboard, klik **"Settings"**
2. Scroll ke **"Domains"**
3. Klik **"Custom Domain"**
4. Masukkan domain Anda
5. Update DNS:
   ```
   Type: CNAME
   Name: @ atau subdomain
   Value: xxx.up.railway.app
   ```

---

## Backup Database

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link ke project
railway link

# Download database
railway run cat /app/data/koperasi.db > backup.db
```

---

## Biaya

- **Free Tier:** $5 credit/bulan (cukup untuk testing)
- **Pro:** $20/bulan (unlimited, no sleep)

---

**Selesai! Aplikasi Anda sudah live! 🎉**

URL: https://your-app.up.railway.app
