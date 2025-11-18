# 📤 Tambah Upload Dokumen di Form Register

## 📅 Tanggal
**17 November 2024**

---

## 🎯 Fitur Baru
Menambahkan field upload **Foto KTP** dan **Pas Foto** di form pendaftaran anggota.

---

## ✅ Implementasi

### 1. **HTML - Form Fields** (`public/register.html`)

```html
<!-- Upload Dokumen -->
<div class="form-section-title">
  <i data-feather="upload"></i>
  <span>Upload Dokumen</span>
</div>

<div class="info-note">
  <i data-feather="info"></i>
  <p>Upload foto KTP dan pas foto untuk verifikasi identitas. Format: JPG, PNG (Max 2MB)</p>
</div>

<div class="form-row">
  <div class="form-group">
    <label for="foto_ktp">Foto KTP *</label>
    <input type="file" id="foto_ktp" name="foto_ktp" accept="image/*" required>
    <small>Upload foto/scan KTP yang jelas</small>
  </div>
  <div class="form-group">
    <label for="pas_foto">Pas Foto *</label>
    <input type="file" id="pas_foto" name="pas_foto" accept="image/*" required>
    <small>Upload pas foto ukuran 3x4 atau 4x6</small>
  </div>
</div>

<!-- Preview Images -->
<div class="form-row">
  <div class="form-group">
    <div id="preview_ktp" class="image-preview"></div>
  </div>
  <div class="form-group">
    <div id="preview_foto" class="image-preview"></div>
  </div>
</div>
```

### 2. **CSS - Styling** (`public/css/register.css`)

```css
/* File Upload Styling */
input[type="file"] {
  padding: 10px;
  border: 2px dashed var(--primary-color);
  border-radius: 8px;
  background: var(--light-bg);
  cursor: pointer;
  transition: all 0.3s;
}

input[type="file"]:hover {
  border-color: var(--primary-dark);
  background: #E8F5E9;
}

input[type="file"]:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
}

/* Image Preview */
.image-preview {
  margin-top: 10px;
  min-height: 150px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  overflow: hidden;
  position: relative;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 4px;
}

.image-preview.has-image {
  border-color: var(--success);
  background: #E8F5E9;
}

.image-preview:empty::before {
  content: 'Preview akan muncul di sini';
  color: #999;
  font-size: 14px;
}
```

### 3. **JavaScript - Preview Function** (`public/js/register.js`)

```javascript
// Image Preview Function
function setupImagePreview(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  
  if (input && preview) {
    input.addEventListener('change', function(e) {
      const file = e.target.files[0];
      
      if (file) {
        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          alert('Ukuran file terlalu besar! Maksimal 2MB');
          input.value = '';
          preview.innerHTML = '';
          preview.classList.remove('has-image');
          return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('File harus berupa gambar!');
          input.value = '';
          preview.innerHTML = '';
          preview.classList.remove('has-image');
          return;
        }
        
        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
          preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
          preview.classList.add('has-image');
        };
        reader.readAsDataURL(file);
      } else {
        preview.innerHTML = '';
        preview.classList.remove('has-image');
      }
    });
  }
}

// Setup on page load
document.addEventListener('DOMContentLoaded', () => {
  setupImagePreview('foto_ktp', 'preview_ktp');
  setupImagePreview('pas_foto', 'preview_foto');
});
```

---

## 🎨 Fitur Upload

### 1. **File Input dengan Dashed Border**
- ✅ Border dashed hijau
- ✅ Background light green
- ✅ Hover effect
- ✅ Focus state

### 2. **Image Preview**
- ✅ Preview real-time setelah pilih file
- ✅ Max height 200px
- ✅ Object-fit contain
- ✅ Border hijau saat ada gambar

### 3. **Validasi**
- ✅ **File Size**: Max 2MB
- ✅ **File Type**: Hanya image (JPG, PNG, etc)
- ✅ **Required**: Wajib diisi
- ✅ **Alert**: Pesan error jika tidak valid

### 4. **User Experience**
- ✅ **Placeholder**: "Preview akan muncul di sini"
- ✅ **Helper Text**: Instruksi upload
- ✅ **Visual Feedback**: Border berubah saat ada gambar
- ✅ **Responsive**: Layout 2 kolom di desktop, 1 kolom di mobile

---

## 📋 Form Structure (Updated)

```
┌─────────────────────────────────────┐
│  📝 Data Pribadi                    │
│  - Nama Lengkap                     │
│  - NIK                              │
│  - Jenis Kelamin                    │
│  - Tempat/Tanggal Lahir             │
├─────────────────────────────────────┤
│  📞 Informasi Kontak                │
│  - Alamat                           │
│  - Nomor Telepon                    │
│  - Email                            │
│  - Pekerjaan                        │
├─────────────────────────────────────┤
│  📤 Upload Dokumen (NEW!)           │
│  - Foto KTP * [Choose File]        │
│    [Preview KTP]                    │
│  - Pas Foto * [Choose File]        │
│    [Preview Foto]                   │
├─────────────────────────────────────┤
│  🔒 Akun Portal (Opsional)          │
│  - Username                         │
│  - Password                         │
├─────────────────────────────────────┤
│  ☑️ Agreement                       │
│  [✓] Saya menyetujui...            │
├─────────────────────────────────────┤
│  [Daftar Sekarang]                  │
└─────────────────────────────────────┘
```

---

## 🎯 Validasi

### Client-Side (JavaScript)
```javascript
// 1. File Size Validation
if (file.size > 2 * 1024 * 1024) {
  alert('Ukuran file terlalu besar! Maksimal 2MB');
  return;
}

// 2. File Type Validation
if (!file.type.startsWith('image/')) {
  alert('File harus berupa gambar!');
  return;
}

// 3. Required Field (HTML)
<input type="file" required>
```

### Server-Side (Perlu Implementasi)
```javascript
// Di server.js - endpoint /api/register/anggota
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads/anggota/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('File harus berupa gambar!'));
    }
  }
});

app.post('/api/register/anggota', 
  upload.fields([
    { name: 'foto_ktp', maxCount: 1 },
    { name: 'pas_foto', maxCount: 1 }
  ]), 
  (req, res) => {
    // Handle registration with files
    const fotoKTP = req.files['foto_ktp'][0].filename;
    const pasFoto = req.files['pas_foto'][0].filename;
    
    // Save to database
    // ...
  }
);
```

---

## 📝 File yang Diubah

1. ✅ `public/register.html`
   - Tambah section Upload Dokumen
   - Tambah 2 input file
   - Tambah 2 preview container

2. ✅ `public/css/register.css`
   - Style input[type="file"]
   - Style .image-preview
   - Hover & focus states

3. ✅ `public/js/register.js`
   - Function setupImagePreview()
   - File validation
   - Preview display

---

## 🧪 Testing

### Manual Testing
- [ ] Upload KTP - File valid (JPG/PNG < 2MB)
- [ ] Upload KTP - File terlalu besar (> 2MB)
- [ ] Upload KTP - File bukan gambar (PDF, DOC)
- [ ] Upload Pas Foto - File valid
- [ ] Upload Pas Foto - File invalid
- [ ] Preview muncul setelah pilih file
- [ ] Preview hilang setelah clear file
- [ ] Form validation - Required fields
- [ ] Submit form dengan files

### Browser Testing
- [ ] Chrome/Edge - Upload & preview bekerja
- [ ] Firefox - Upload & preview bekerja
- [ ] Safari - Upload & preview bekerja
- [ ] Mobile browsers - Upload dari camera/gallery

### Responsive Testing
- [ ] Desktop - 2 kolom side by side
- [ ] Tablet - 2 kolom atau 1 kolom
- [ ] Mobile - 1 kolom stacked

---

## 📱 Mobile Experience

### Upload dari Camera
```html
<!-- Accept image/* allows camera on mobile -->
<input type="file" accept="image/*" capture="environment">
```

### Upload dari Gallery
```html
<!-- Default behavior - opens gallery -->
<input type="file" accept="image/*">
```

---

## 🔄 Cara Verifikasi

### 1. Buka Form Register
```
http://localhost:3000/register.html
```

### 2. Scroll ke Section Upload Dokumen
```
Harus ada:
✅ Icon upload
✅ Info note (format & size)
✅ 2 input file (KTP & Pas Foto)
✅ 2 preview container
```

### 3. Test Upload
```
1. Click "Choose File" untuk KTP
2. Pilih gambar (< 2MB)
3. Preview harus muncul
4. Border berubah hijau
5. Repeat untuk Pas Foto
```

### 4. Test Validation
```
1. Upload file > 2MB → Alert error
2. Upload file non-image → Alert error
3. Submit tanpa upload → HTML5 validation
```

---

## ✨ Hasil Akhir

### Sebelum
```
Form Register:
- Data Pribadi
- Kontak
- Akun Portal
- Submit
```

### Sesudah
```
Form Register:
- Data Pribadi
- Kontak
- Upload Dokumen (NEW!)
  • Foto KTP * [Preview]
  • Pas Foto * [Preview]
- Akun Portal
- Submit
```

### Visual
```
┌─────────────────────────────────────┐
│  📤 Upload Dokumen                  │
│  ℹ️ Upload foto KTP dan pas foto... │
│                                     │
│  Foto KTP *        Pas Foto *       │
│  [Choose File]     [Choose File]    │
│  ┌─────────────┐  ┌─────────────┐  │
│  │   Preview   │  │   Preview   │  │
│  │   [Image]   │  │   [Image]   │  │
│  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────┘
```

---

## 🚀 Next Steps

### Backend Implementation
1. 🔄 Update server.js endpoint
2. 🔄 Add multer middleware
3. 🔄 Save files to uploads/anggota/
4. 🔄 Save filenames to database
5. 🔄 Add file validation server-side

### Future Enhancements
1. 🔄 Drag & drop upload
2. 🔄 Image cropping tool
3. 🔄 Compress image before upload
4. 🔄 Multiple file formats support
5. 🔄 Progress bar for upload

---

## ✅ Kesimpulan

Field upload **Foto KTP** dan **Pas Foto** telah ditambahkan di form register dengan fitur:
- ✅ Preview real-time
- ✅ Validasi file size & type
- ✅ Styling yang menarik
- ✅ User-friendly interface
- ✅ Responsive design

**Status:** ✅ **COMPLETE - Frontend Ready**  
**Next:** Backend implementation untuk handle file upload

---

**Dibuat oleh:** Kiro AI Assistant  
**Tanggal:** 17 November 2024  
**Kategori:** Feature Enhancement - File Upload
