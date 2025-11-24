# Fitur Kamera untuk Pendaftaran Member

## ✅ Implementasi Lengkap

### 1. Halaman Pendaftaran (public/register.html)

#### Button Kamera
- Button "Kamera" di samping input Foto KTP
- Button "Kamera" di samping input Pas Foto
- Icon kamera yang jelas dan mudah dikenali

### 2. JavaScript (public/js/register.js)

#### Fungsi Kamera yang Ditambahkan:
```javascript
openCameraRegister(inputId, previewId)  // Buka modal kamera
startCameraRegister()                    // Start camera stream
switchCameraRegister()                   // Switch front/back camera
capturePhotoRegister()                   // Capture & save photo
closeCameraRegister()                    // Close & cleanup
```

#### Fitur:
- Video preview real-time dari kamera
- Button "Ambil Foto" untuk capture
- Button "Ganti Kamera" untuk switch depan/belakang
- Button "Batal" untuk close tanpa capture
- Error handling dengan pesan yang jelas
- Auto-stop camera stream saat modal ditutup
- Preview otomatis setelah capture dengan success message

### 3. CSS (public/css/register.css)

#### Style yang Ditambahkan:
- `.btn-camera` - Style untuk button kamera
- `#cameraModalRegister` - Style untuk modal kamera
- Animation slide up untuk modal
- Responsive design untuk mobile
- Button hover effects
- Error message styling

### 4. Kualitas Foto
- Resolusi ideal: 1280x720 (HD)
- Format: JPEG
- Kompresi: 90% (kualitas tinggi)
- Auto-resize sesuai video dimension

## 📱 Cara Menggunakan

### Untuk Calon Member:

#### Upload dari File:
1. Buka halaman pendaftaran
2. Scroll ke bagian "Upload Dokumen"
3. Klik "Choose File" untuk Foto KTP atau Pas Foto
4. Pilih file dari galeri/storage
5. Preview akan muncul otomatis

#### Upload dari Kamera:
1. Buka halaman pendaftaran
2. Scroll ke bagian "Upload Dokumen"
3. Klik tombol "Kamera" (icon kamera)
4. Izinkan akses kamera jika diminta browser
5. Arahkan kamera ke objek:
   - Untuk KTP: Arahkan ke KTP dengan pencahayaan yang baik
   - Untuk Pas Foto: Arahkan ke wajah dengan background yang rapi
6. Klik "Ambil Foto" untuk capture
7. Preview akan muncul otomatis dengan success message
8. Ulangi untuk foto kedua jika perlu
9. Lengkapi form lainnya dan klik "Daftar Sekarang"

#### Fitur Tambahan:
- **Ganti Kamera** - Switch antara kamera depan dan belakang (untuk mobile)
- **Batal** - Tutup kamera tanpa mengambil foto
- Foto otomatis tersimpan dalam format JPG dengan kualitas tinggi

## 🧪 Testing

File test tersedia: `test-camera-register.html`

### Cara Test:
```bash
# Jalankan server
node server.js

# Buka browser
http://localhost:3000/test-camera-register.html
```

### Skenario Testing:
1. ✅ Test upload KTP dari file
2. ✅ Test upload KTP dari kamera
3. ✅ Test upload pas foto dari file
4. ✅ Test upload pas foto dari kamera
5. ✅ Test switch kamera depan/belakang
6. ✅ Test preview otomatis
7. ✅ Test error handling (kamera tidak ada/ditolak)
8. ✅ Test multiple capture (KTP + Pas Foto)
9. ✅ Test responsive di mobile
10. ✅ Test close kamera tanpa capture

## 🔧 Technical Details

### Browser API Used:
- `navigator.mediaDevices.getUserMedia()` - Akses kamera
- `HTMLCanvasElement.toBlob()` - Convert canvas ke file
- `DataTransfer` API - Set file ke input
- `FileReader` API - Preview image

### Camera Constraints:
```javascript
{
  video: {
    facingMode: 'user' | 'environment',
    width: { ideal: 1280 },
    height: { ideal: 720 }
  },
  audio: false
}
```

### Validasi:
- Ukuran file maksimal: 2MB (sesuai form pendaftaran)
- Format: JPEG (dari kamera), atau JPG/PNG (dari file)
- Auto-validation saat upload

## 🎨 User Experience

### Feedback Visual:
- Preview otomatis setelah capture
- Success message dengan icon check
- Error message yang jelas dan informatif
- Smooth animation untuk modal
- Loading state saat processing

### Responsive Design:
- Desktop: Modal lebar dengan button besar
- Mobile: Modal full-width dengan button compact
- Auto-adjust video size
- Touch-friendly buttons

## 🔒 Keamanan

### Privacy:
- Akses kamera memerlukan izin user
- Stream kamera otomatis dihentikan setelah selesai
- Foto tidak disimpan di cache browser
- File upload melalui FormData (secure)

### Error Handling:
- NotAllowedError: Akses ditolak
- NotFoundError: Kamera tidak ditemukan
- Generic error: Error lainnya dengan pesan detail

## 📋 Checklist Implementasi

- [x] Button kamera di form pendaftaran (KTP & Pas Foto)
- [x] Modal kamera dengan video preview
- [x] Capture foto dari kamera
- [x] Switch kamera depan/belakang
- [x] Preview foto hasil capture
- [x] Auto-stop camera stream
- [x] Error handling
- [x] Success message
- [x] Responsive design
- [x] CSS styling
- [x] Test file
- [x] Documentation
- [x] Integration dengan form pendaftaran

## 🚀 Status

✅ **READY TO USE!**

Fitur kamera untuk pendaftaran member sudah siap digunakan di production.

## 📝 Catatan

### Untuk Admin:
- Foto dari kamera akan tersimpan di folder `public/uploads/`
- Format filename: `camera-[timestamp].jpg`
- Kualitas foto sudah dioptimasi untuk web

### Untuk Developer:
- Fungsi kamera independent dari member portal
- Bisa digunakan di halaman lain dengan mudah
- Namespace terpisah untuk menghindari konflik
- Clean code dengan proper error handling

## 🔄 Integrasi dengan Backend

Form pendaftaran sudah menggunakan FormData yang support file upload:
```javascript
const formData = new FormData(e.target);
// Includes foto_ktp and pas_foto files

fetch('/api/register/anggota', {
  method: 'POST',
  body: formData
});
```

Backend endpoint `/api/register/anggota` sudah support multipart/form-data dengan multer.

## 📱 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 11+)
- Opera: ✅ Full support

## 💡 Tips Penggunaan

### Untuk Foto KTP:
- Gunakan kamera belakang untuk hasil lebih baik
- Pastikan pencahayaan cukup
- KTP harus terlihat jelas dan tidak blur
- Hindari pantulan cahaya pada KTP

### Untuk Pas Foto:
- Gunakan kamera depan (selfie)
- Background yang rapi dan terang
- Wajah harus terlihat jelas
- Posisi tegak dan menghadap kamera
