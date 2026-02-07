# 🗄️ Setup Railway Volume untuk Upload Files

## 🎯 **Masalah**

Railway menggunakan **ephemeral filesystem**, artinya:
- ❌ File yang diupload akan **hilang saat container restart**
- ❌ Setiap deploy baru akan **reset semua file**
- ❌ Foto profil dan KTP yang diupload akan **hilang**

## ✅ **Solusi: Railway Volume**

Railway Volume adalah persistent storage yang:
- ✅ File **tidak akan hilang** saat restart
- ✅ File **tetap ada** setelah deploy baru
- ✅ Shared storage untuk semua instances

---

## 📋 **Langkah Setup Railway Volume**

### **Step 1: Buka Railway Dashboard**
```
1. Login ke railway.app
2. Pilih project "sistem-koperasi"
3. Klik service yang running
```

### **Step 2: Add Volume**
```
1. Klik tab "Settings"
2. Scroll ke bagian "Volumes"
3. Klik "New Volume"
```

### **Step 3: Configure Volume**
```
Mount Path: /app/data
Size: 1GB (atau sesuai kebutuhan)
```

**Penjelasan:**
- **Mount Path**: Lokasi di container tempat volume di-mount
- **Size**: Ukuran storage (1GB cukup untuk ribuan foto)

### **Step 4: Update Environment Variable**
```
Di Railway Dashboard → Variables:

UPLOAD_PATH=/app/data/uploads
```

**Atau bisa juga:**
```
UPLOAD_PATH=/app/public/uploads
```
(Tapi pastikan mount path volume sesuai)

### **Step 5: Deploy Ulang**
```
Railway akan auto-deploy setelah add volume
Atau manual trigger deploy dari dashboard
```

---

## 🔧 **Update Code untuk Railway Volume**

### **Option A: Gunakan /app/data (Recommended)**

**Update server.js:**
```javascript
const UPLOAD_PATH = process.env.UPLOAD_PATH || path.join(__dirname, 'data', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
  console.log(`✅ Created upload directory: ${UPLOAD_PATH}`);
}

// Serve uploads
app.use('/uploads', express.static(UPLOAD_PATH));
```

**Railway Volume Setup:**
```
Mount Path: /app/data
Environment Variable: UPLOAD_PATH=/app/data/uploads
```

**Struktur:**
```
/app/
├── data/                    ← Railway Volume (persistent)
│   └── uploads/
│       ├── 1234567890.jpg
│       └── 0987654321.jpg
├── public/
├── server.js
└── package.json
```

### **Option B: Gunakan /app/public/uploads**

**Keep server.js as is:**
```javascript
const UPLOAD_PATH = process.env.UPLOAD_PATH || path.join(__dirname, 'public', 'uploads');
```

**Railway Volume Setup:**
```
Mount Path: /app/public/uploads
Environment Variable: (tidak perlu, sudah default)
```

**Struktur:**
```
/app/
├── public/
│   └── uploads/             ← Railway Volume (persistent)
│       ├── 1234567890.jpg
│       └── 0987654321.jpg
├── server.js
└── package.json
```

---

## 🧪 **Testing**

### **Test 1: Upload File**
```
1. Upload foto profil atau KTP
2. Verifikasi foto muncul
3. Check Railway logs untuk path
```

### **Test 2: Restart Container**
```
1. Di Railway Dashboard → Settings
2. Klik "Restart"
3. Tunggu container restart
4. Verifikasi foto masih ada ✅
```

### **Test 3: Deploy Baru**
```
1. Push code baru ke GitHub
2. Railway auto-deploy
3. Verifikasi foto masih ada ✅
```

---

## 📊 **Railway Volume Pricing**

```
Free Plan:
- ❌ Tidak ada volume
- Hanya ephemeral storage

Hobby Plan ($5/month):
- ✅ 1GB volume included
- ✅ Additional storage: $0.25/GB/month

Pro Plan ($20/month):
- ✅ 10GB volume included
- ✅ Additional storage: $0.25/GB/month
```

---

## 🔍 **Debugging**

### **Check Volume Status:**
```
Di Railway Dashboard → Service → Volumes
- Status: Active
- Mount Path: /app/data
- Size: 1GB
- Usage: 45MB / 1GB
```

### **Check Logs:**
```
✅ Upload directory exists: /app/data/uploads
📝 Register anggota request received
Files: { foto_ktp: [...], pas_foto: [...] }
Foto KTP: 1234567890.jpg
💾 File saved to: /app/data/uploads/1234567890.jpg
✅ Registration successful
```

### **Check File Exists:**
```bash
# SSH ke Railway container (jika ada akses)
ls -la /app/data/uploads/
```

---

## 🚨 **Important Notes**

### **1. Volume Persistence**
- ✅ File di volume **TIDAK AKAN HILANG** saat restart
- ✅ File di volume **TETAP ADA** setelah deploy
- ❌ File di ephemeral storage **AKAN HILANG**

### **2. Backup**
Meskipun menggunakan volume, tetap lakukan backup:
```
1. Export database secara berkala
2. Download semua file dari volume
3. Simpan di cloud storage (S3, Google Cloud, dll)
```

### **3. Migration**
Jika sudah ada file di ephemeral storage:
- ❌ File lama akan hilang saat add volume
- ✅ User harus upload ulang foto
- ✅ Atau migrate manual via Railway CLI

---

## 📋 **Checklist Setup**

- [ ] Login ke Railway Dashboard
- [ ] Buka project sistem-koperasi
- [ ] Add Volume dengan mount path `/app/data`
- [ ] Set environment variable `UPLOAD_PATH=/app/data/uploads`
- [ ] Deploy ulang
- [ ] Test upload file
- [ ] Test restart container
- [ ] Verifikasi file tidak hilang

---

## 💡 **Alternative: Cloud Storage**

Jika tidak ingin menggunakan Railway Volume, bisa gunakan:

### **Option 1: Cloudinary (Recommended)**
```javascript
// Free tier: 25GB storage, 25GB bandwidth/month
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload
const result = await cloudinary.uploader.upload(file.path);
const imageUrl = result.secure_url;
```

### **Option 2: AWS S3**
```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Upload
const params = {
  Bucket: 'koperasi-uploads',
  Key: filename,
  Body: file.buffer
};
await s3.upload(params).promise();
```

### **Option 3: Google Cloud Storage**
```javascript
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  keyFilename: 'service-account-key.json'
});

const bucket = storage.bucket('koperasi-uploads');
await bucket.upload(file.path);
```

---

## 🎯 **Recommendation**

**Untuk Production:**
1. **Railway Volume** - Mudah setup, terintegrasi dengan Railway
2. **Cloudinary** - Jika butuh image optimization & CDN
3. **AWS S3** - Jika sudah familiar dengan AWS

**Untuk Testing:**
- Railway Volume sudah cukup

---

**Status:** READY TO IMPLEMENT ✅  
**Estimated Time:** 10-15 menit  
**Cost:** $5/month (Railway Hobby Plan)  
**Result:** File upload persistent & tidak hilang saat restart 🎯
