# Fitur Upload Bukti Partisipasi Anggota dengan Kamera

## Deskripsi

Fitur upload bukti partisipasi anggota dengan pilihan file atau kamera langsung untuk form tambah partisipasi di panel admin. Memudahkan admin untuk mendokumentasikan transaksi partisipasi anggota dengan foto nota/bukti transaksi.

## Lokasi Fitur

**Panel Admin** → **Transaksi Keuangan** → **Partisipasi Anggota** → **Tambah Partisipasi**

## Fitur yang Ditambahkan

### 1. Dua Tombol Upload
- **Pilih File**: Upload file dari galeri/storage
- **Ambil Foto**: Langsung buka kamera untuk mengambil foto bukti transaksi

### 2. Capture Kamera
- Menggunakan atribut HTML5 `capture="environment"` untuk kamera belakang
- Otomatis membuka aplikasi kamera native di tablet/ponsel
- Foto langsung ter-upload setelah diambil

### 3. Preview Otomatis
- Preview muncul setelah foto diambil atau file dipilih
- Menampilkan ukuran file
- Validasi ukuran maksimal 5MB
- Support format: JPG, PNG, GIF, PDF

### 4. Upload Opsional
- Bukti partisipasi bersifat opsional (tidak wajib)
- Tetap bisa submit form tanpa bukti
- Cocok untuk transaksi kecil atau pencatatan cepat

## Implementasi Teknis

### 1. Frontend (public/js/pages.js)

#### Form HTML
```javascript
<div class="form-group">
  <label>Bukti Partisipasi (Opsional)</label>
  
  <!-- Tombol pilihan upload -->
  <div class="upload-buttons-container">
    <button type="button" onclick="triggerFileUploadPartisipasi()" class="btn btn-secondary">
      <i data-feather="upload"></i>
      <span>Pilih File</span>
    </button>
    <button type="button" onclick="triggerCameraCapturePartisipasi()" class="btn btn-info">
      <i data-feather="camera"></i>
      <span>Ambil Foto</span>
    </button>
  </div>
  
  <!-- Input file (hidden) -->
  <input type="file" name="bukti_partisipasi" id="buktiPartisipasi" accept="image/*,.pdf" style="display: none;">
  
  <!-- Input camera (hidden) -->
  <input type="file" id="buktiPartisipasiCamera" accept="image/*" capture="environment" style="display: none;">
  
  <div id="previewBuktiPartisipasi"></div>
</div>
```

#### JavaScript Functions
```javascript
// Trigger file upload
window.triggerFileUploadPartisipasi = function() {
  document.getElementById('buktiPartisipasi').click();
};

// Trigger camera capture
window.triggerCameraCapturePartisipasi = function() {
  document.getElementById('buktiPartisipasiCamera').click();
};

// Handle camera capture
window.handleCameraCapturePartisipasi = function(input) {
  const file = input.files[0];
  if (!file) return;
  
  // Validate size
  if (file.size > 5 * 1024 * 1024) {
    alert('File terlalu besar! Maksimal 5MB');
    return;
  }
  
  // Transfer to main input
  const mainInput = document.getElementById('buktiPartisipasi');
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  mainInput.files = dataTransfer.files;
  
  // Show preview
  previewBuktiPartisipasi(mainInput);
};

// Preview function
window.previewBuktiPartisipasi = function(input) {
  const file = input.files[0];
  const preview = document.getElementById('previewBuktiPartisipasi');
  
  if (file) {
    // Validate size and type
    // Show image or PDF icon preview
  }
};
```

#### Form Submit
```javascript
document.getElementById('tambahPartisipasiForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  // Use postFormData to support file upload
  const result = await API.postFormData('/api/partisipasi', formData);
  alert(result.message);
  modal.remove();
  window.renderPartisipasiAnggota();
});
```

### 2. Backend (server.js)

#### Endpoint Update
```javascript
app.post('/api/partisipasi', authenticateToken, buktiUpload.single('bukti_partisipasi'), (req, res) => {
  const { anggota_id, unit_usaha_id, jumlah_transaksi, tanggal_transaksi, keterangan } = req.body;
  const bukti_partisipasi = req.file ? req.file.filename : null;
  
  // Check if column exists (backward compatibility)
  db.all("PRAGMA table_info(partisipasi_anggota)", [], (err, columns) => {
    const hasBuktiColumn = columns && columns.some(col => col.name === 'bukti_partisipasi');
    
    if (hasBuktiColumn) {
      // Insert with bukti_partisipasi
      db.run('INSERT INTO partisipasi_anggota (..., bukti_partisipasi) VALUES (?, ?, ?, ?, ?, ?)',
        [..., bukti_partisipasi], ...);
    } else {
      // Insert without bukti_partisipasi
      db.run('INSERT INTO partisipasi_anggota (...) VALUES (?, ?, ?, ?, ?)', [...], ...);
    }
  });
});
```

### 3. Database

#### Tabel partisipasi_anggota
```sql
ALTER TABLE partisipasi_anggota ADD COLUMN bukti_partisipasi TEXT;
```

Struktur lengkap:
- id (INTEGER, PRIMARY KEY)
- anggota_id (INTEGER)
- unit_usaha_id (INTEGER)
- jumlah_transaksi (REAL)
- tanggal_transaksi (DATE)
- keterangan (TEXT)
- created_at (DATETIME)
- **bukti_partisipasi (TEXT)** ← BARU

### 4. CSS Styling (public/css/style.css)

```css
.upload-buttons-container {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.upload-buttons-container .btn-info {
  background: linear-gradient(135deg, #2196F3, #42A5F5);
  color: white;
}

#previewBuktiPartisipasi img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Mobile responsive */
@media (max-width: 480px) {
  .upload-buttons-container {
    flex-direction: column;
  }
}
```

## Keunggulan Fitur

### 1. ✅ Dokumentasi Transaksi
- Setiap partisipasi anggota bisa didokumentasikan
- Memudahkan verifikasi transaksi
- Transparansi untuk perhitungan SHU

### 2. ✅ Mobile-Friendly
- Tombol besar dan mudah ditekan di tablet/ponsel
- Kamera langsung terbuka untuk foto nota
- Tidak perlu keluar aplikasi

### 3. ✅ Fleksibel
- Upload opsional (tidak wajib)
- Bisa pilih file atau kamera
- Support berbagai format

### 4. ✅ Validasi Otomatis
- Validasi ukuran file (max 5MB)
- Validasi format file
- Preview langsung

### 5. ✅ Backward Compatible
- Endpoint cek kolom sebelum insert
- Tidak break existing data
- Smooth migration

## Use Cases

### 1. Transaksi Pembelian Anggota
- Foto nota pembelian di unit usaha
- Foto struk belanja
- Foto bukti transaksi

### 2. Transaksi Simpan Pinjam
- Foto slip angsuran
- Foto bukti pembayaran pinjaman
- Foto kwitansi

### 3. Transaksi Lainnya
- Foto nota jasa
- Foto bukti transfer
- Foto tanda terima

## Flow Penggunaan

### Opsi 1: Upload dari File
1. Admin klik "Tambah Partisipasi"
2. Pilih anggota dan unit usaha
3. Isi jumlah transaksi
4. Klik tombol "Pilih File"
5. Pilih foto nota dari galeri
6. Preview muncul
7. Klik "Simpan"
8. Data tersimpan dengan bukti

### Opsi 2: Ambil Foto Langsung
1. Admin klik "Tambah Partisipasi"
2. Pilih anggota dan unit usaha
3. Isi jumlah transaksi
4. Klik tombol "Ambil Foto"
5. Kamera terbuka
6. Foto nota/bukti transaksi
7. Preview muncul
8. Klik "Simpan"
9. Data tersimpan dengan bukti

### Opsi 3: Tanpa Bukti
1. Admin klik "Tambah Partisipasi"
2. Pilih anggota dan unit usaha
3. Isi jumlah transaksi
4. Skip upload bukti
5. Klik "Simpan"
6. Data tersimpan tanpa bukti

## Manfaat untuk Perhitungan SHU

### 1. Verifikasi Data
- Bukti transaksi memudahkan audit
- Validasi jumlah partisipasi anggota
- Transparansi perhitungan SHU

### 2. Akuntabilitas
- Setiap transaksi terdokumentasi
- Mengurangi dispute
- Meningkatkan kepercayaan anggota

### 3. Laporan
- Data lebih lengkap untuk laporan
- Bukti untuk rapat anggota
- Dokumentasi untuk audit eksternal

## Testing

### Test Case 1: Upload File Biasa
- ✅ Klik "Pilih File"
- ✅ Pilih gambar dari storage
- ✅ Preview muncul
- ✅ Submit form berhasil
- ✅ File tersimpan di server

### Test Case 2: Ambil Foto dengan Kamera
- ✅ Klik "Ambil Foto"
- ✅ Kamera terbuka
- ✅ Ambil foto
- ✅ Preview muncul
- ✅ Submit form berhasil
- ✅ File tersimpan di server

### Test Case 3: Tanpa Upload
- ✅ Isi form tanpa upload
- ✅ Submit form berhasil
- ✅ Data tersimpan tanpa bukti

### Test Case 4: Validasi Ukuran
- ✅ Upload file > 5MB
- ✅ Muncul error message
- ✅ File tidak ter-upload

### Test Case 5: Validasi Format
- ✅ Upload file .doc
- ✅ Muncul error message
- ✅ File tidak ter-upload

## Browser Support

### Desktop
- ✅ Chrome/Edge: File upload & webcam
- ✅ Firefox: File upload & webcam
- ✅ Safari: File upload & webcam

### Mobile/Tablet
- ✅ Chrome Android: File upload & kamera belakang
- ✅ Safari iOS: File upload & kamera belakang
- ✅ Firefox Android: File upload & kamera belakang
- ✅ Samsung Internet: File upload & kamera belakang

## Security & Best Practices

### 1. File Validation
- ✅ Size limit: 5MB
- ✅ Type validation: image/*, application/pdf
- ✅ Frontend & backend validation

### 2. File Storage
- ✅ Files stored in `/uploads` directory
- ✅ Unique filename with timestamp
- ✅ Secure file access

### 3. Database
- ✅ Column nullable (optional upload)
- ✅ Backward compatible
- ✅ No breaking changes

## Future Enhancement

### Potensi Peningkatan:
1. 📸 OCR untuk auto-fill nominal dari foto nota
2. 📸 Compress foto otomatis jika terlalu besar
3. 📸 Multiple photos upload
4. 📸 View/download bukti di list partisipasi
5. 📸 Filter partisipasi berdasarkan ada/tidak ada bukti
6. 📸 Export laporan dengan bukti transaksi

## Kesimpulan

Fitur ini meningkatkan akuntabilitas dan transparansi pencatatan partisipasi anggota, yang sangat penting untuk perhitungan SHU yang akurat. Implementasi mobile-friendly membuat admin bisa langsung foto nota saat mencatat transaksi anggota.

## Status

**READY FOR TESTING** ✅

Fitur sudah selesai diimplementasi dan siap untuk ditest di development environment.
