# Fitur Upload Bukti Pembayaran dengan Kamera

## Deskripsi

Fitur baru yang memungkinkan anggota mengambil foto bukti pembayaran langsung menggunakan kamera ponsel di portal member, tanpa perlu mengambil foto terlebih dahulu lalu upload.

## Lokasi Fitur

**Portal Member** → **Simpanan** → **Bayar Simpanan** → **Bukti Pembayaran**

## Fitur yang Ditambahkan

### 1. Dua Tombol Upload
- **Pilih File**: Upload file dari galeri/storage (seperti sebelumnya)
- **Ambil Foto**: Langsung buka kamera untuk mengambil foto

### 2. Capture Kamera
- Menggunakan atribut HTML5 `capture="environment"` untuk membuka kamera belakang
- Otomatis membuka aplikasi kamera native di ponsel
- Foto langsung ter-upload setelah diambil

### 3. Preview Otomatis
- Setelah foto diambil, langsung muncul preview
- Menampilkan ukuran file
- Validasi ukuran maksimal 5MB

## Implementasi Teknis

### HTML Input
```html
<!-- Input file biasa (hidden) -->
<input type="file" 
       name="bukti_pembayaran" 
       id="buktiBayarMember"
       accept="image/*,.pdf" 
       style="display: none;">

<!-- Input camera (hidden) -->
<input type="file" 
       id="buktiBayarCamera"
       accept="image/*" 
       capture="environment"
       style="display: none;">
```

### JavaScript Functions

#### 1. Trigger File Upload
```javascript
window.triggerFileUpload = function() {
  document.getElementById('buktiBayarMember').click();
};
```

#### 2. Trigger Camera Capture
```javascript
window.triggerCameraCapture = function() {
  document.getElementById('buktiBayarCamera').click();
};
```

#### 3. Handle Camera Capture
```javascript
window.handleCameraCapture = function(input) {
  const file = input.files[0];
  
  // Validasi ukuran
  if (file.size > 5 * 1024 * 1024) {
    alert('File terlalu besar! Maksimal 5MB');
    return;
  }
  
  // Transfer file ke input utama
  const mainInput = document.getElementById('buktiBayarMember');
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  mainInput.files = dataTransfer.files;
  
  // Trigger preview
  previewBuktiBayarMember(mainInput);
};
```

### CSS Styling

```css
.upload-buttons-container {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.upload-buttons-container .btn {
  flex: 1;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .upload-buttons-container {
    flex-direction: column;
  }
}
```

## Keunggulan Fitur

### 1. ✅ User Experience Lebih Baik
- Tidak perlu keluar dari aplikasi untuk mengambil foto
- Proses lebih cepat dan efisien
- Cocok untuk pengguna mobile

### 2. ✅ Mobile-First Design
- Tombol besar dan mudah ditekan di ponsel
- Responsive untuk berbagai ukuran layar
- Icon yang jelas (upload vs camera)

### 3. ✅ Validasi Otomatis
- Validasi ukuran file (max 5MB)
- Preview langsung setelah foto diambil
- Error handling yang jelas

### 4. ✅ Backward Compatible
- Tetap bisa upload file dari galeri
- Tidak mengubah flow yang sudah ada
- Hanya menambah opsi baru

## Browser Support

### Desktop
- ✅ Chrome/Edge: Bisa pilih file atau kamera (jika ada webcam)
- ✅ Firefox: Bisa pilih file atau kamera (jika ada webcam)
- ✅ Safari: Bisa pilih file atau kamera (jika ada webcam)

### Mobile
- ✅ Chrome Android: Langsung buka kamera belakang
- ✅ Safari iOS: Langsung buka kamera belakang
- ✅ Firefox Android: Langsung buka kamera belakang
- ✅ Samsung Internet: Langsung buka kamera belakang

## Atribut HTML5 `capture`

### `capture="environment"`
- Membuka kamera **belakang** (rear camera)
- Cocok untuk foto dokumen/bukti pembayaran
- Kualitas foto lebih baik

### Alternatif: `capture="user"`
- Membuka kamera **depan** (front camera)
- Cocok untuk selfie
- Tidak digunakan di fitur ini

## Flow Penggunaan

### Opsi 1: Upload dari File
1. User klik tombol "Pilih File"
2. Buka file picker (galeri/storage)
3. Pilih foto yang sudah ada
4. Preview muncul
5. Submit form

### Opsi 2: Ambil Foto Langsung
1. User klik tombol "Ambil Foto"
2. Kamera langsung terbuka
3. User ambil foto
4. Foto otomatis ter-upload
5. Preview muncul
6. Submit form

## Testing

### Test Case 1: Upload File Biasa
- ✅ Klik "Pilih File"
- ✅ Pilih gambar dari galeri
- ✅ Preview muncul
- ✅ File ter-upload dengan benar

### Test Case 2: Ambil Foto dengan Kamera
- ✅ Klik "Ambil Foto"
- ✅ Kamera terbuka
- ✅ Ambil foto
- ✅ Preview muncul
- ✅ File ter-upload dengan benar

### Test Case 3: Validasi Ukuran File
- ✅ Upload file > 5MB
- ✅ Muncul error message
- ✅ File tidak ter-upload

### Test Case 4: Responsive Mobile
- ✅ Tombol tampil dengan baik di mobile
- ✅ Tombol mudah ditekan
- ✅ Preview sesuai ukuran layar

## Catatan Penting

### 1. Permissions
- Browser akan meminta izin akses kamera saat pertama kali
- User harus mengizinkan akses kamera
- Jika ditolak, fitur kamera tidak akan berfungsi

### 2. HTTPS Required
- Fitur kamera hanya bekerja di HTTPS (secure connection)
- Di localhost tetap bisa bekerja
- Di production harus menggunakan HTTPS

### 3. File Size Limit
- Maksimal 5MB per file
- Validasi di frontend dan backend
- Foto dari kamera biasanya 1-3MB (aman)

### 4. Format Support
- Image: JPG, PNG, GIF
- Document: PDF (hanya untuk upload file, tidak untuk kamera)

## Rekomendasi untuk User

### Tips Mengambil Foto Bukti Pembayaran:
1. ✅ Pastikan pencahayaan cukup
2. ✅ Foto harus jelas dan tidak blur
3. ✅ Semua informasi penting terlihat (nominal, tanggal, nama)
4. ✅ Hindari pantulan cahaya pada layar/kertas
5. ✅ Ambil foto dari jarak yang cukup dekat

## Future Enhancement

### Potensi Peningkatan:
1. 📸 Crop/rotate foto sebelum upload
2. 📸 Compress foto otomatis jika terlalu besar
3. 📸 Multiple photos upload
4. 📸 OCR untuk auto-fill nominal dari foto
5. 📸 Filter/enhance foto untuk kejelasan lebih baik

## Kesimpulan

Fitur ini meningkatkan user experience untuk anggota yang menggunakan ponsel, membuat proses pembayaran simpanan lebih cepat dan mudah. Implementasi menggunakan HTML5 native API tanpa library tambahan, sehingga ringan dan compatible dengan semua browser modern.
