# 🚂 Panduan Deploy ke Railway.app

## Persiapan Sebelum Deploy

### 1. Pastikan Project Sudah di Git

```bash
# Jika belum init git
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit - ready for Railway deployment"
```

### 2. Push ke GitHub (atau GitLab/Bitbucket)

```bash
# Buat repository baru di GitHub
# Kemudian:
git remote add origin https://github.com/username/nama-repo.git
git branch -M main
git push -u origin main
```

## Langkah Deploy ke Railway

### Opsi A: Deploy via Web Dashboard (MUDAH)

#### 1. Buat Akun Railway
- Buka https://railway.app
- Klik "Login" atau "Start a New Project"
- Login dengan GitHub (recommended)

#### 2. Deploy Project
1. Klik "New Project"
2. Pilih "Deploy from GitHub repo"
3. Pilih repository Anda
4. Railway akan otomatis detect Node.js app

#### 3. Tambahkan Volume untuk SQLite
**PENTING:** SQLite butuh persistent storage!

1. Di Railway dashboard, klik project Anda
2. Klik tab "Settings"
3. Scroll ke "Volumes"
4. Klik "Add Volume"
5. Isi:
   - **Mount Path:** `/app/data`
   - Klik "Add"

#### 4. Setup Environment Variables
1. Klik tab "Variables"
2. Tambahkan variable berikut:

```
NODE_ENV=production
PORT=3000
JWT_SECRET=<generate-random-string-32-chars>
DATABASE_PATH=/app/data/koperasi.db
UPLOAD_PATH=/app/data/uploads
```

**Generate JWT_SECRET:**
```bash
# Di terminal lokal, jalankan:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 5. Update Konfigurasi Database
Railway akan mount volume di `/app/data`, jadi kita perlu update path database.

Klik "Deploy" dan tunggu proses selesai.

#### 6. Akses Aplikasi
- Railway akan generate URL otomatis: `https://your-app.up.railway.app`
- Klik "View Logs" untuk monitor deployment
- Setelah selesai, klik URL untuk akses aplikasi

### Opsi B: Deploy via Railway CLI

#### 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

#### 2. Login
```bash
railway login
```

#### 3. Init Project
```bash
# Di folder project
railway init
```

#### 4. Link ke Project
```bash
railway link
```

#### 5. Deploy
```bash
railway up
```

#### 6. Setup Volume & Variables
```bash
# Buka dashboard untuk setup volume
railway open
```

## Konfigurasi Tambahan

### Update server.js untuk Railway

File `server.js` sudah OK, tapi pastikan menggunakan environment variables:

```javascript
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'fallback-secret-key';
```

### Update database.js untuk Railway

Pastikan database path menggunakan environment variable:

```javascript
const dbPath = process.env.DATABASE_PATH || './koperasi.db';
```

## Custom Domain (Opsional)

### 1. Tambah Custom Domain
1. Di Railway dashboard, klik "Settings"
2. Scroll ke "Domains"
3. Klik "Add Domain"
4. Masukkan domain Anda (contoh: koperasi.example.com)

### 2. Setup DNS
Tambahkan CNAME record di DNS provider Anda:
```
Type: CNAME
Name: koperasi (atau subdomain lain)
Value: your-app.up.railway.app
```

## Monitoring & Maintenance

### Lihat Logs
```bash
# Via CLI
railway logs

# Atau via dashboard
# Klik tab "Deployments" > "View Logs"
```

### Restart Service
```bash
# Via CLI
railway restart

# Atau via dashboard
# Klik "..." > "Restart"
```

### Update Aplikasi
```bash
# Push ke GitHub
git add .
git commit -m "Update feature"
git push

# Railway akan auto-deploy!
```

## Troubleshooting

### Error: Database locked
**Solusi:** Pastikan volume sudah di-mount dengan benar di `/app/data`

### Error: Cannot write to database
**Solusi:** 
1. Cek permission volume
2. Pastikan DATABASE_PATH mengarah ke volume: `/app/data/koperasi.db`

### Error: File upload tidak tersimpan
**Solusi:**
1. Update UPLOAD_PATH ke volume: `/app/data/uploads`
2. Pastikan folder dibuat otomatis di startup

### Error: Port already in use
**Solusi:** Railway akan set PORT otomatis, pastikan server.js menggunakan `process.env.PORT`

## Biaya Railway

### Free Tier
- $5 credit per bulan (gratis)
- Cukup untuk aplikasi kecil-menengah
- Auto-sleep jika tidak ada traffic (bisa dinonaktifkan)

### Upgrade ke Pro
- $20/bulan
- Unlimited projects
- No auto-sleep
- Priority support

## Backup Database

### Manual Backup
```bash
# Download database via Railway CLI
railway run cat /app/data/koperasi.db > backup-$(date +%Y%m%d).db
```

### Automated Backup (Advanced)
Buat cron job di server lain untuk backup berkala via Railway API.

## Keamanan Production

### 1. Update JWT_SECRET
Pastikan menggunakan secret yang kuat (min 32 karakter random)

### 2. Enable HTTPS
Railway otomatis provide SSL certificate (gratis)

### 3. Setup CORS
Tambahkan di environment variables:
```
ALLOWED_ORIGINS=https://yourdomain.com
```

### 4. Rate Limiting
Pertimbangkan tambah rate limiting untuk API endpoints

## Checklist Deployment

- [ ] Project sudah di Git & GitHub
- [ ] Railway account sudah dibuat
- [ ] Project sudah di-deploy
- [ ] Volume untuk SQLite sudah ditambahkan
- [ ] Environment variables sudah diset
- [ ] JWT_SECRET sudah di-generate (random 32+ chars)
- [ ] Database path mengarah ke volume: `/app/data/koperasi.db`
- [ ] Upload path mengarah ke volume: `/app/data/uploads`
- [ ] Aplikasi bisa diakses via Railway URL
- [ ] Login admin berhasil
- [ ] Upload file berhasil
- [ ] Database persisten setelah restart

## Support

Jika ada masalah:
1. Cek logs di Railway dashboard
2. Cek dokumentasi: https://docs.railway.app
3. Railway Discord: https://discord.gg/railway

---

**Selamat! Aplikasi Anda sudah live di Railway! 🎉**
