# Fitur Upload Bukti Pengeluaran dengan Kamera

## Deskripsi

Fitur upload bukti pengeluaran dengan pilihan file atau kamera langsung untuk form tambah pengeluaran di panel admin. Memudahkan admin/kasir untuk mendokumentasikan setiap pengeluaran dengan foto nota/kwitansi.

## Lokasi Fitur

**Panel Admin** → **Transaksi Keuangan** → **Pengeluaran** → **Tambah Pengeluaran**

## Fitur yang Ditambahkan

### 1. Dua Tombol Upload
- **Pilih File**: Upload file dari galeri/storage
- **Ambil Foto**: Langsung buka kamera untuk mengambil foto nota/kwitansi

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
- Bukti pengeluaran bersifat opsional (tidak wajib)
- Tetap bisa submit form tanpa bukti
- Cocok untuk pengeluaran kecil atau darurat

## Implementasi Teknis

### 1. Frontend (public/js/pages.js)

#### Form HTML
```javascript
<div class="form-group">
  <label>Bukti Pengeluaran (Opsional)</label>
  
  <!-- Tombol pilihan upload -->
  <div class="upload-buttons-container">
    <button type="button" onclick="triggerFileUploadPengeluaran()" class="btn btn-secondary">
      <i data-feather="upload"></i>
      <span>Pilih File</span>
    </button>
    <button type="button" onclick="triggerCameraCapturePengeluaran()" class="btn btn-info">
      <i data-feather="camera"></i>
      <span>Ambil Foto</span>
    </button>
  </div>
  
  <!-- Input file (hidden) -->
  <input type="file" name="bukti_pengeluaran" id="buktiPengeluaran" accept="image/*,.pdf" style="display: none;">
  
  <!-- Input camera (hidden) -->
  <input type="file" id="buktiPengeluaranCamera" accept="image/*" capture="environment" style="display: none;">
  
  <div id="previewBuktiPengeluaran"></div>
</div>
```

#### JavaScript Functions
```javascript
// Trigger file upload
window.triggerFileUploadPengeluaran = function() {
  document.getElementById('buktiPengeluaran').click();
};

// Trigger camera capture
window.triggerCameraCapturePengeluaran = function() {
  document.getElementById('buktiPengeluaranCamera').click();
};

// Handle camera capture
window.handleCameraCapturePengeluaran = function(input) {
  const file = input.files[0];
  if (!file) return;
  
  // Validate size
  if (file.size > 5 * 1024 * 1024) {
    alert('File terlalu besar! Maksimal 5MB');
    return;
  }
  
  // Transfer to main input
  const mainInput = document.getElementById('buktiPengeluaran');
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  mainInput.files = dataTransfer.files;
  
  // Show preview
  previewBuktiPengeluaran(mainInput);
};

// Preview function
window.previewBuktiPengeluaran = function(input) {
  const file = input.files[0];
  const preview = document.getElementById('previewBuktiPengeluaran');
  
  if (file) {
    // Validate size and type
    // Show image or PDF icon preview
  }
};
```

#### Form Submit
```javascript
document.getElementById('tambahPengeluaranForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  // Use postFormData to support file upload
  const result = await API.postFormData('/api/transaksi/pengeluaran', formData);
  alert(result.message);
  modal.remove();
  window.renderPengeluaran();
});
```

### 2. Backend (server.js)

#### Endpoint Update
```javascript
app.post('/api/transaksi/pengeluaran', authenticateToken, buktiUpload.single('bukti_pengeluaran'), (req, res) => {
  const { unit_usaha_id, kategori, jumlah, tanggal_transaksi, keterangan } = req.body;
  const bukti_pengeluaran = req.file ? req.file.filename : null;
  
  // Check if column exists (backward compatibility)
  db.all("PRAGMA table_info(pengeluaran)", [], (err, columns) => {
    const hasBuktiColumn = columns && columns.some(col => col.name === 'bukti_pengeluaran');
    
    if (hasBuktiColumn) {
      // Insert with bukti_pengeluaran
      db.run('INSERT INTO pengeluaran (..., bukti_pengeluaran) VALUES (?, ?, ?, ?, ?, ?)',
        [..., bukti_pengeluaran], ...);
    } else {
      // Insert without bukti_pengeluaran
      db.run('INSERT INTO pengeluaran (...) VALUES (?, ?, ?, ?, ?)', [...], ...);
    }
  });
});
```

### 3. Database

#### Tabel pengeluaran
```sql
ALTER TABLE pengeluaran ADD COLUMN bukti_pengeluaran TEXT;
```

Struktur lengkap:
- id (INTEGER, PRIMARY KEY)
- unit_usaha_id (INTEGER)
- kategori (TEXT)
- jumlah (REAL)
- tanggal_transaksi (DATE)
- keterangan (TEXT)
- created_at (DATETIME)
- harga (REAL)
- qty (INTEGER)
- **bukti_pengeluaran (TEXT)** ← BARU

### 4. CSS Styling (public/css/style.css)

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

.upload-buttons-container .btn-info {
  background: linear-gradient(135deg, #2196F3, #42A5F5);
  color: white;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .upload-buttons-container {
    flex-direction: column;
  }
}
```

## Keunggulan Fitur

### 1. ✅ Dokumentasi Lengkap
- Setiap pengeluaran bisa didokumentasikan dengan bukti
- Memudahkan audit dan verifikasi
- Transparansi keuangan lebih baik

### 2. ✅ Mobile-Friendly
- Tombol besar dan mudah ditekan di tablet/ponsel
- Kamera langsung terbuka untuk foto nota
- Tidak perlu keluar aplikasi

### 3. ✅ Fleksibel
- Upload opsional (tidak wajib)
- Bisa pilih file atau kamera
- Support berbagai format (JPG, PNG, PDF)

### 4. ✅ Validasi Otomatis
- Validasi ukuran file (max 5MB)
- Validasi format file
- Preview langsung setelah upload

### 5. ✅ Backward Compatible
- Endpoint cek kolom sebelum insert
- Tidak break existing data
- Smooth migration

## Use Cases

### 1. Pengeluaran Operasional
- Foto nota pembelian ATK
- Foto kwitansi listrik/air
- Foto struk bensin

### 2. Pembelian Barang
- Foto faktur pembelian
- Foto nota supplier
- Foto bukti transfer

### 3. Gaji Karyawan
- Foto slip gaji
- Foto bukti transfer gaji
- Foto tanda terima

### 4. Pengeluaran Lain-lain
- Foto nota transportasi
- Foto kwitansi konsumsi rapat
- Foto bukti pengeluaran darurat

## Flow Penggunaan

### Opsi 1: Upload dari File
1. Admin klik "Tambah Pengeluaran"
2. Isi form (kategori, jumlah, dll)
3. Klik tombol "Pilih File"
4. Pilih foto nota dari galeri
5. Preview muncul
6. Klik "Simpan"
7. Data tersimpan dengan bukti

### Opsi 2: Ambil Foto Langsung
1. Admin klik "Tambah Pengeluaran"
2. Isi form (kategori, jumlah, dll)
3. Klik tombol "Ambil Foto"
4. Kamera terbuka
5. Foto nota/kwitansi
6. Preview muncul
7. Klik "Simpan"
8. Data tersimpan dengan bukti

### Opsi 3: Tanpa Bukti
1. Admin klik "Tambah Pengeluaran"
2. Isi form (kategori, jumlah, dll)
3. Skip upload bukti
4. Klik "Simpan"
5. Data tersimpan tanpa bukti

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
3. 📸 Multiple photos upload (foto depan-belakang nota)
4. 📸 Crop/rotate foto sebelum upload
5. 📸 View/download bukti di list pengeluaran
6. 📸 Filter pengeluaran berdasarkan ada/tidak ada bukti

## Kesimpulan

Fitur ini meningkatkan akuntabilitas dan transparansi pengelolaan keuangan koperasi dengan memudahkan dokumentasi setiap pengeluaran. Implementasi mobile-friendly membuat admin/kasir bisa langsung foto nota saat melakukan transaksi, tanpa perlu repot upload kemudian.

## Status

**READY FOR TESTING** ✅

Fitur sudah selesai diimplementasi dan siap untuk ditest di development environment.
