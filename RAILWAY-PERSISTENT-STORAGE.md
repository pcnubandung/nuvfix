# 💾 Railway Persistent Storage - Agar Data Tidak Hilang

## ❌ Masalah: Data Hilang Setiap Deploy

### Penyebab:
Railway menggunakan **ephemeral storage** (storage sementara). Setiap kali deploy:
1. Container lama dihapus
2. Container baru dibuat
3. Semua data di container lama **HILANG**

### Yang Hilang:
- ❌ Database (koperasi.db)
- ❌ File upload (foto anggota, logo, dll)
- ❌ Semua data transaksi

## ✅ Solusi: Railway Volume (Persistent Storage)

Railway menyediakan **Volume** untuk menyimpan data secara permanen.

### Cara Kerja:
```
Container Lama (Deploy 1)     Container Baru (Deploy 2)
├── /app/code (hilang)        ├── /app/code (baru)
└── /app/data (TETAP) ────────┴── /app/data (SAMA!)
```

Data di `/app/data` **TIDAK HILANG** saat deploy!

## 🚀 Setup Railway Volume

### Step 1: Buat Volume di Railway Dashboard

1. **Login ke Railway** → https://railway.app/

2. **Pilih Project** Koperasi NU Vibes

3. **Klik Service** Anda (biasanya nama repo)

4. **Klik tab "Settings"** atau "Variables"

5. **Scroll ke bawah** sampai ketemu **"Volumes"**

6. **Klik "New Volume"** atau "+ Add Volume"

7. **Isi Form:**
   ```
   Mount Path: /app/data
   Name: koperasi-data (atau nama lain)
   ```

8. **Klik "Add"** atau "Create"

9. **Tunggu** volume dibuat (beberapa detik)

### Step 2: Set Environment Variables

Masih di Railway Dashboard:

1. **Klik tab "Variables"**

2. **Klik "New Variable"** atau "+ Add Variable"

3. **Tambahkan 2 variables:**

   **Variable 1:**
   ```
   Name: DATABASE_PATH
   Value: /app/data/koperasi.db
   ```

   **Variable 2:**
   ```
   Name: UPLOAD_PATH
   Value: /app/data/uploads
   ```

4. **Klik "Add"** untuk setiap variable

### Step 3: Redeploy

Railway akan otomatis redeploy setelah menambah volume dan variables.

Atau manual redeploy:
1. Klik tab "Deployments"
2. Klik "Deploy" atau "Redeploy"

### Step 4: Verifikasi

Setelah deploy selesai:

1. **Buka aplikasi** dan login
2. **Tambah data test** (anggota, transaksi, dll)
3. **Trigger deploy baru:**
   ```bash
   git commit --allow-empty -m "Test persistent storage"
   git push origin main
   ```
4. **Tunggu deploy selesai**
5. **Buka aplikasi** dan cek data
6. **Data masih ada?** ✅ SUCCESS!

## 📊 Struktur Storage

### Sebelum (Ephemeral):
```
/app/
  ├── server.js
  ├── database.js
  ├── koperasi.db ❌ HILANG saat deploy
  └── uploads/ ❌ HILANG saat deploy
```

### Sesudah (Persistent):
```
/app/
  ├── server.js
  ├── database.js
  └── data/ ✅ PERSISTENT (Volume)
      ├── koperasi.db ✅ TETAP ada
      └── uploads/ ✅ TETAP ada
```

## 🔧 Kode Sudah Support!

File `database.js` sudah support environment variables:

```javascript
// Support Railway deployment with persistent volume
const dbPath = process.env.DATABASE_PATH || './koperasi.db';
const uploadPath = process.env.UPLOAD_PATH || './uploads';
```

**Artinya:**
- Jika `DATABASE_PATH` di-set → gunakan path itu (volume)
- Jika tidak di-set → gunakan path default (ephemeral)

## 💰 Biaya Railway Volume

### Free Plan:
- ❌ **Tidak ada volume** di free plan
- Harus upgrade ke **Hobby Plan**

### Hobby Plan ($5/month):
- ✅ Volume included
- ✅ 100GB storage
- ✅ Unlimited deploys
- ✅ Custom domains
- ✅ Priority support

### Pro Plan ($20/month):
- ✅ Semua fitur Hobby
- ✅ 200GB storage
- ✅ Team collaboration

## 🆓 Alternatif Gratis (Jika Tidak Mau Bayar)

### Opsi 1: External Database (Recommended)

Gunakan database external yang gratis:

#### A. Turso (SQLite Cloud) - RECOMMENDED
- ✅ **Gratis** 500MB
- ✅ SQLite compatible
- ✅ Global edge network
- ✅ Easy migration

**Setup:**
1. Daftar di https://turso.tech/
2. Create database
3. Get connection URL
4. Update `database.js` untuk connect ke Turso

#### B. PlanetScale (MySQL)
- ✅ **Gratis** 5GB
- ✅ MySQL compatible
- ✅ Serverless

**Cons:** Perlu migrate dari SQLite ke MySQL

#### C. Supabase (PostgreSQL)
- ✅ **Gratis** 500MB
- ✅ PostgreSQL compatible
- ✅ Built-in auth & storage

**Cons:** Perlu migrate dari SQLite ke PostgreSQL

### Opsi 2: Backup & Restore Manual

Jika jarang deploy, bisa backup manual:

**Sebelum Deploy:**
```bash
# Download database dari Railway
railway run cat /app/koperasi.db > backup.db

# Atau via Railway CLI
railway connect
# Lalu copy file manual
```

**Setelah Deploy:**
```bash
# Upload database kembali
railway run "cat > /app/koperasi.db" < backup.db
```

**Cons:** Ribet dan error-prone

### Opsi 3: Git-based Storage (NOT RECOMMENDED)

Commit database ke Git:

**Pros:**
- Gratis
- Otomatis backup

**Cons:**
- ❌ Git tidak untuk binary files
- ❌ Repo jadi besar
- ❌ Conflict saat multiple users
- ❌ Security risk (data exposed)

## 🎯 Rekomendasi

### Untuk Production (Ada Budget):
✅ **Railway Volume** ($5/month)
- Paling mudah
- Paling reliable
- Worth the money

### Untuk Development/Testing (Gratis):
✅ **Turso** (SQLite Cloud)
- Gratis 500MB
- SQLite compatible (minimal code change)
- Reliable

### Untuk Personal/Small Scale:
✅ **Railway Volume** atau **Turso**
- Tergantung budget

## 📝 Migration ke Turso (Jika Pilih Gratis)

Jika mau pakai Turso (gratis):

### Step 1: Daftar Turso
1. Buka https://turso.tech/
2. Sign up (gratis)
3. Create database
4. Get connection URL

### Step 2: Install Turso Client
```bash
npm install @libsql/client
```

### Step 3: Update database.js
Saya bisa bantu update kode untuk connect ke Turso.

### Step 4: Migrate Data
Export data dari SQLite lokal → Import ke Turso

## ✅ Checklist Setup Railway Volume

- [ ] Login ke Railway Dashboard
- [ ] Pilih project
- [ ] Buka Settings/Variables
- [ ] Scroll ke "Volumes"
- [ ] Klik "New Volume"
- [ ] Set Mount Path: `/app/data`
- [ ] Set Name: `koperasi-data`
- [ ] Klik "Add"
- [ ] Tambah variable `DATABASE_PATH=/app/data/koperasi.db`
- [ ] Tambah variable `UPLOAD_PATH=/app/data/uploads`
- [ ] Tunggu redeploy
- [ ] Test dengan tambah data
- [ ] Deploy lagi untuk test persistence
- [ ] Verify data masih ada

## 🐛 Troubleshooting

### Volume tidak muncul di menu?
- Pastikan sudah upgrade ke Hobby Plan ($5/month)
- Free plan tidak support volume

### Data masih hilang setelah setup volume?
- Check environment variables sudah benar
- Check mount path: `/app/data` (bukan `/data`)
- Check Railway logs untuk error

### Error "ENOENT: no such file or directory"?
- Volume belum mounted
- Tunggu beberapa menit setelah create volume
- Redeploy manual

### Upload file error?
- Check `UPLOAD_PATH` variable
- Check folder permissions
- Check Railway logs

## 📞 Support

Jika masih ada masalah:
1. Check Railway logs
2. Check Railway status page
3. Contact Railway support
4. Atau tanya saya untuk alternatif solution

## 🎉 Setelah Setup

Setelah setup volume berhasil:
- ✅ Data tidak hilang saat deploy
- ✅ Upload file tetap ada
- ✅ Database persistent
- ✅ Bisa deploy kapan saja tanpa khawatir

---

**Rekomendasi:** Upgrade ke Railway Hobby Plan ($5/month) untuk volume. Worth it untuk production app!

Atau gunakan **Turso** (gratis) jika budget terbatas.
