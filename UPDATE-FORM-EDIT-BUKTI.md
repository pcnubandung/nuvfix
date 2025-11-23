# Update: Fitur Upload Bukti di Form Edit

## Deskripsi

Menambahkan fitur upload bukti (file atau kamera) di form **Edit Pengeluaran** dan **Edit Partisipasi Anggota**. Sebelumnya fitur upload bukti hanya tersedia di form tambah, sekarang juga tersedia di form edit.

## Fitur yang Ditambahkan

### 1. Form Edit Pengeluaran
**Lokasi:** Panel Admin → Transaksi Keuangan → Pengeluaran → Edit

**Fitur:**
- ✅ Tampilkan bukti yang sudah ada (jika ada)
- ✅ Tombol "Lihat" untuk melihat bukti saat ini
- ✅ Dua tombol upload: "Pilih File" dan "Ambil Foto"
- ✅ Preview otomatis setelah upload
- ✅ Validasi ukuran dan format
- ✅ Opsional: kosongkan jika tidak ingin mengubah bukti

### 2. Form Edit Partisipasi Anggota
**Lokasi:** Panel Admin → Transaksi Keuangan → Partisipasi Anggota → Edit

**Fitur:**
- ✅ Tampilkan bukti yang sudah ada (jika ada)
- ✅ Tombol "Lihat" untuk melihat bukti saat ini
- ✅ Dua tombol upload: "Pilih File" dan "Ambil Foto"
- ✅ Preview otomatis setelah upload
- ✅ Validasi ukuran dan format
- ✅ Opsional: kosongkan jika tidak ingin mengubah bukti

## Implementasi Teknis

### Frontend (public/js/pages.js)

#### Fungsi Baru untuk Edit Pengeluaran:
```javascript
window.triggerFileUploadPengeluaranEdit()
window.triggerCameraCapturePengeluaranEdit()
window.handleCameraCapturePengeluaranEdit()
window.previewBuktiPengeluaranEdit()
```

#### Fungsi Baru untuk Edit Partisipasi:
```javascript
window.triggerFileUploadPartisipasiEdit()
window.triggerCameraCapturePartisipasiEdit()
window.handleCameraCapturePartisipasiEdit()
window.previewBuktiPartisipasiEdit()
```

#### Form Submit Update:
```javascript
// Edit Pengeluaran
const result = await API.putFormData(`/api/transaksi/pengeluaran/${id}`, formData);

// Edit Partisipasi
const result = await API.putFormData(`/api/partisipasi/${id}`, formData);
```

### Backend (server.js)

#### Endpoint Update - Edit Pengeluaran:
```javascript
app.put('/api/transaksi/pengeluaran/:id', authenticateToken, buktiUpload.single('bukti_pengeluaran'), (req, res) => {
  const bukti_pengeluaran = req.file ? req.file.filename : null;
  
  // Check if column exists
  // Update with or without bukti_pengeluaran
});
```

#### Endpoint Update - Edit Partisipasi:
```javascript
app.put('/api/partisipasi/:id', authenticateToken, buktiUpload.single('bukti_partisipasi'), (req, res) => {
  const bukti_partisipasi = req.file ? req.file.filename : null;
  
  // Check if column exists
  // Update with or without bukti_partisipasi
});
```

## Tampilan Form Edit

### Jika Sudah Ada Bukti:
```
┌─────────────────────────────────────────┐
│  Bukti Pengeluaran (Opsional)           │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐  │
│  │ Bukti saat ini: nota_123.jpg      │  │
│  │ [👁️ Lihat]                        │  │
│  └───────────────────────────────────┘  │
│                                          │
│  ┌──────────────┐  ┌──────────────┐    │
│  │ 📤 Pilih File│  │ 📷 Ambil Foto│    │
│  └──────────────┘  └──────────────┘    │
│                                          │
│  Kosongkan jika tidak ingin mengubah    │
└─────────────────────────────────────────┘
```

### Jika Belum Ada Bukti:
```
┌─────────────────────────────────────────┐
│  Bukti Pengeluaran (Opsional)           │
├─────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐    │
│  │ 📤 Pilih File│  │ 📷 Ambil Foto│    │
│  └──────────────┘  └──────────────┘    │
│                                          │
│  Format: JPG, PNG, PDF. Max 5MB         │
└─────────────────────────────────────────┘
```

## Use Cases

### 1. Update Bukti yang Salah
- User upload bukti yang salah saat tambah data
- Buka form edit
- Upload bukti yang benar
- Bukti lama akan diganti dengan yang baru

### 2. Tambah Bukti yang Terlupa
- User lupa upload bukti saat tambah data
- Buka form edit
- Upload bukti yang sesuai
- Data sekarang memiliki bukti

### 3. Tidak Mengubah Bukti
- User hanya ingin edit data lain (jumlah, tanggal, dll)
- Buka form edit
- Edit data yang diperlukan
- Jangan upload file baru
- Bukti lama tetap tersimpan

### 4. Hapus Bukti (Manual)
- Jika ingin hapus bukti, upload file kosong atau hapus manual di server
- Atau bisa tambah fitur "Hapus Bukti" di form edit (future enhancement)

## Testing

### Test Case 1: Edit dengan Upload Bukti Baru
- ✅ Buka form edit
- ✅ Upload file baru
- ✅ Preview muncul
- ✅ Submit form
- ✅ Bukti baru tersimpan, bukti lama terganti

### Test Case 2: Edit Tanpa Mengubah Bukti
- ✅ Buka form edit (sudah ada bukti)
- ✅ Edit data lain (jumlah, tanggal)
- ✅ Jangan upload file baru
- ✅ Submit form
- ✅ Data terupdate, bukti lama tetap ada

### Test Case 3: Tambah Bukti di Data yang Belum Punya
- ✅ Buka form edit (belum ada bukti)
- ✅ Upload file
- ✅ Preview muncul
- ✅ Submit form
- ✅ Bukti tersimpan

### Test Case 4: Lihat Bukti Saat Ini
- ✅ Buka form edit (sudah ada bukti)
- ✅ Klik tombol "Lihat"
- ✅ Bukti terbuka di tab baru
- ✅ Bisa verifikasi bukti sebelum edit

### Test Case 5: Validasi File
- ✅ Upload file > 5MB → Error
- ✅ Upload format tidak didukung → Error
- ✅ Upload file valid → Success

## File yang Dimodifikasi

### Frontend:
- `public/js/pages.js`
  - Update form `editPengeluaran()`
  - Update form `editPartisipasi()`
  - Tambah 8 fungsi helper baru

### Backend:
- `server.js`
  - Update endpoint `PUT /api/transaksi/pengeluaran/:id`
  - Update endpoint `PUT /api/partisipasi/:id`
  - Tambah multer middleware
  - Backward compatible check

## Keunggulan

### 1. ✅ Konsistensi UX
- Form tambah dan edit memiliki fitur yang sama
- User tidak bingung karena konsisten

### 2. ✅ Fleksibilitas
- Bisa update bukti kapan saja
- Bisa tambah bukti yang terlupa
- Bisa ganti bukti yang salah

### 3. ✅ Backward Compatible
- Endpoint cek kolom sebelum update
- Tidak break existing data
- Smooth migration

### 4. ✅ Mobile-Friendly
- Tombol kamera tetap tersedia di form edit
- Responsive design
- Touch-friendly

## Catatan Penting

### 1. File Lama
- Jika upload file baru, file lama **tidak otomatis terhapus** dari server
- File lama masih ada di folder `/uploads`
- Bisa dibersihkan manual atau dengan script cleanup (future enhancement)

### 2. Validasi
- Validasi sama dengan form tambah
- Size limit: 5MB
- Format: JPG, PNG, GIF, PDF

### 3. Optional Upload
- Upload bersifat opsional di form edit
- Jika tidak upload file baru, bukti lama tetap tersimpan
- Jika upload file baru, bukti lama akan terganti di database

## Future Enhancement

### Potensi Peningkatan:
1. 🗑️ Tombol "Hapus Bukti" untuk menghapus bukti tanpa upload baru
2. 🔄 Auto-delete file lama saat upload file baru
3. 📊 History bukti (simpan semua versi bukti)
4. 🔍 Preview bukti lama di form edit (tidak perlu klik "Lihat")
5. 📁 File manager untuk manage semua bukti upload

## Status

**READY FOR TESTING** ✅

Fitur sudah selesai diimplementasi dan siap untuk ditest.

## Summary

Dengan update ini, user sekarang bisa:
- ✅ Upload bukti di form tambah
- ✅ Upload bukti di form edit
- ✅ Lihat bukti yang sudah ada
- ✅ Update bukti yang salah
- ✅ Tambah bukti yang terlupa

Fitur upload bukti sekarang **lengkap** untuk semua form transaksi keuangan!
