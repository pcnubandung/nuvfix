# 🚀 Quick Setup: Railway Volume untuk Database Persistent

## 🎯 **Solusi Tercepat (5 Menit)**

### **Step 1: Setup Railway Volume**
```bash
1. Buka Railway Dashboard
2. Pilih service aplikasi Anda
3. Klik "Settings" → "Volumes"
4. Klik "New Volume"
5. Isi:
   - Mount Path: /app/data
   - Size: 1GB
6. Klik "Add Volume"
```

### **Step 2: Set Environment Variables**
```bash
# Di Railway Dashboard → Variables:
DATABASE_PATH=/app/data/koperasi.db
UPLOAD_PATH=/app/data/uploads
```

### **Step 3: Deploy**
```bash
# Aplikasi akan otomatis redeploy
# Database sekarang persistent di /app/data/koperasi.db
```

## ✅ **Verifikasi**

### **Test Persistence:**
1. **Tambah data** (anggota, transaksi, dll)
2. **Redeploy** aplikasi (push code baru)
3. **Cek data** masih ada ✅

### **File Structure di Railway:**
```
/app/
├── server.js
├── database.js
├── public/
└── data/              ← Volume mount
    ├── koperasi.db    ← Database persistent
    └── uploads/       ← Files persistent
```

## 🎉 **Hasil**

- ✅ **Database tidak terhapus** saat deploy
- ✅ **Upload files persistent**
- ✅ **Zero downtime**
- ✅ **No code changes needed**
- ✅ **Free solution**

**Total waktu setup: 5 menit** ⚡