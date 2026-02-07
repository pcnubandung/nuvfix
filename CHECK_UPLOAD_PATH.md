# 🔍 Investigasi Upload Path Issue

## Hipotesis

File member bisa diakses, file admin tidak bisa. Kemungkinan:

### Teori 1: Timing Issue
- Member upload **SEBELUM** update `routes-member.js` → file di `public/uploads/` (relatif)
- Admin upload **SETELAH** update → file di `UPLOAD_PATH` (absolut)
- Tapi keduanya seharusnya bisa diakses karena ada 2 static routes

### Teori 2: UPLOAD_PATH Tidak Konsisten
Di Railway, jika `UPLOAD_PATH` environment variable **TIDAK di-set**:
- Default: `path.join(__dirname, 'public', 'uploads')` = `/app/public/uploads`
- File tersimpan di `/app/public/uploads`
- Static route melayani dari `/app/public/uploads`
- **Seharusnya bisa diakses**

### Teori 3: File Permissions
- File yang diupload mungkin tidak punya permission yang benar
- Tapi ini tidak masuk akal karena member bisa

### Teori 4: Container Restart
- Admin upload file
- Container restart (auto-deploy)
- File hilang karena ephemeral storage
- Member file masih ada karena diupload sebelum restart terakhir

## 🧪 Test untuk Membuktikan

### Test 1: Cek UPLOAD_PATH di Railway
```bash
# Di Railway logs, cari output:
✅ Upload directory exists: /app/public/uploads
```

Jika muncul path lain, berarti `UPLOAD_PATH` env var sudah di-set.

### Test 2: Upload dari Member Lagi (Sekarang)
1. Login sebagai member
2. Upload foto KTP baru
3. Cek apakah muncul

**Jika muncul:** Berarti member route masih pakai path lama (sebelum update)
**Jika tidak muncul:** Berarti semua upload sekarang ke path baru dan hilang karena restart

### Test 3: Cek Railway Logs Saat Upload Admin
Cari log:
```
📁 Files uploaded:
  - Foto KTP: 1770442349637-KH.Aly.png
    Path: /app/public/uploads/1770442349637-KH.Aly.png
    Size: 123456 bytes
```

Path-nya apa? Jika `/app/public/uploads` → seharusnya bisa diakses.

### Test 4: Gunakan Debug Endpoint
```
GET /api/debug/file/1770442349637-KH.Aly.png
```

Response akan menunjukkan:
- File exists: true/false
- Path: dimana file dicari
- Alternative path: path alternatif

## 🎯 Kesimpulan Sementara

**Kemungkinan besar:** File admin **berhasil diupload** tapi **hilang karena container restart**.

**Bukti:**
1. Log Railway menunjukkan 404 berkali-kali untuk file yang sama
2. Berarti file pernah ada (tersimpan di database) tapi sekarang hilang
3. Railway restart container setiap deploy
4. File di ephemeral storage hilang saat restart

**Solusi:**
1. Setup Railway Volume (persistent storage)
2. Atau gunakan Cloudinary/external storage

## 📝 Action Items

1. **Cek Railway environment variables:**
   - Apakah `UPLOAD_PATH` sudah di-set?
   - Jika belum, file disimpan di `/app/public/uploads` (default)

2. **Test upload member lagi (sekarang):**
   - Untuk membuktikan apakah member route sudah update

3. **Cek Railway logs:**
   - Lihat path file yang diupload dari admin
   - Lihat apakah ada error saat save file

4. **Setup Railway Volume:**
   - Ini solusi paling pasti
   - File tidak akan hilang lagi

## 🔧 Quick Fix untuk Test

Tambahkan logging di server.js untuk melihat UPLOAD_PATH:

```javascript
console.log('📂 UPLOAD_PATH:', UPLOAD_PATH);
console.log('📂 __dirname:', __dirname);
console.log('📂 Resolved path:', path.resolve(UPLOAD_PATH));
```

Ini akan menunjukkan path yang sebenarnya digunakan.
