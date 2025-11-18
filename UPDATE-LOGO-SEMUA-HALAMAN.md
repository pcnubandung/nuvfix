# Update Logo di Semua Halaman

## Deskripsi
Logo koperasi yang diupload sekarang tampil di semua halaman aplikasi untuk konsistensi branding.

## Halaman yang Diupdate

### 1. ✅ Sidebar Admin (index.html)
**Lokasi:** Sidebar kiri atas

**Fitur:**
- Logo koperasi tampil di sidebar
- Teks "NU Vibes" (bold, gold)
- Subtitle "Sistem Manajemen Koperasi" (kecil, putih)
- Logo berbentuk lingkaran dengan border emas
- Fallback ke logo NU jika belum upload

**Upload:** Via menu **Info Koperasi** → **Upload Logo Baru**

---

### 2. ✅ Halaman Login Manajemen (login.html)
**Lokasi:** Header login box

**Fitur:**
- Logo koperasi tampil di atas form login
- Ukuran: 80x80px, lingkaran
- Border putih dengan shadow
- Fallback ke logo NU jika belum upload
- Auto-load saat halaman dibuka

**Kode:**
```javascript
// Load logo koperasi
async function loadLoginLogo() {
  const response = await fetch('/api/koperasi/logo');
  const data = await response.json();
  
  if (data.logo) {
    loginLogo.src = data.logo;
    loginLogo.style.display = 'block';
    loginLogoPlaceholder.style.display = 'none';
  }
}
```

---

### 3. ✅ Halaman Login Member (member-login.html)
**Lokasi:** Header login box

**Fitur:**
- Logo koperasi tampil di atas form login
- Ukuran: 80x80px, lingkaran
- Border putih (3px)
- Background gradient teal
- Fallback ke logo NU jika belum upload
- Auto-load saat halaman dibuka

**Styling:**
```css
#memberLoginLogo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid white;
}
```

---

### 4. ✅ Portal Member (member.html)
**Lokasi:** Header atas (logo section)

**Fitur:**
- Logo koperasi tampil di header
- Ukuran: 60x60px, lingkaran
- Border putih (3px)
- Di samping teks "NU Vibes" dan "Member Portal"
- Fallback ke logo NU jika belum upload
- Auto-load saat halaman dibuka

**CSS:**
```css
.logo-image-container img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid white;
}
```

---

## Cara Kerja

### Upload Logo (Admin)
1. Login sebagai Admin
2. Buka menu **Info Koperasi**
3. Klik tombol **Upload Logo Baru**
4. Pilih file gambar (JPG, PNG, max 2MB)
5. Logo otomatis tersimpan di database
6. Logo langsung tampil di semua halaman

### Load Logo (Semua Halaman)
```javascript
async function loadLogo() {
  try {
    const response = await fetch('/api/koperasi/logo');
    const data = await response.json();
    
    if (data.logo) {
      // Update logo image
      logoElement.src = data.logo;
      logoElement.style.display = 'block';
      
      // Hide placeholder
      placeholderElement.style.display = 'none';
    }
  } catch (error) {
    console.error('Error loading logo:', error);
    // Fallback ke logo default (NU)
  }
}
```

## API Endpoint

### GET /api/koperasi/logo
Mengambil URL logo koperasi dari database.

**Response:**
```json
{
  "logo": "/uploads/1234567890-logo.jpg"
}
```

Jika belum ada logo:
```json
{
  "logo": null
}
```

## Database

### Tabel: koperasi_info
```sql
CREATE TABLE koperasi_info (
  id INTEGER PRIMARY KEY,
  nama_koperasi TEXT,
  logo TEXT,  -- Path logo: /uploads/filename.jpg
  ...
);
```

## File yang Dimodifikasi

### 1. public/login.html
- Tambah container untuk logo
- Tambah script load logo
- Fallback ke logo NU

### 2. public/member-login.html
- Tambah container untuk logo
- Tambah script load logo
- Fallback ke logo NU

### 3. public/member.html
- Update struktur logo section
- Tambah container untuk logo

### 4. public/css/member.css
- Tambah styling untuk logo-image-container
- Styling untuk logo berbentuk lingkaran

### 5. public/js/member.js
- Tambah fungsi loadMemberPortalLogo()
- Auto-load saat page load

## Konsistensi Branding

### Logo Specifications
- **Format:** JPG, PNG, GIF, WebP
- **Size:** Max 2MB
- **Shape:** Lingkaran (border-radius: 50%)
- **Border:** Putih (2-3px)
- **Object-fit:** Cover (auto crop)

### Ukuran Logo per Halaman
| Halaman | Ukuran | Border |
|---------|--------|--------|
| Sidebar Admin | 50x50px | 2px gold |
| Login Manajemen | 80x80px | 3px white |
| Login Member | 80x80px | 3px white |
| Portal Member | 60x60px | 3px white |

### Fallback
Jika logo belum diupload, tampilkan:
- Lingkaran dengan background gradient/solid
- Teks "NU" di tengah
- Warna: Gold (#FFD700)

## Testing Checklist

### Upload Logo
- [ ] Login sebagai Admin
- [ ] Buka Info Koperasi
- [ ] Upload logo baru (JPG/PNG, < 2MB)
- [ ] Logo tersimpan di database
- [ ] Logo tersimpan di folder uploads/

### Tampilan Logo
- [ ] Logo tampil di sidebar admin
- [ ] Logo tampil di login manajemen
- [ ] Logo tampil di login member
- [ ] Logo tampil di portal member
- [ ] Logo berbentuk lingkaran
- [ ] Logo tidak pecah/blur

### Fallback
- [ ] Sebelum upload, logo NU tampil
- [ ] Setelah upload, logo koperasi tampil
- [ ] Jika API error, logo NU tetap tampil
- [ ] Tidak ada broken image

### Responsive
- [ ] Logo tampil baik di desktop
- [ ] Logo tampil baik di tablet
- [ ] Logo tampil baik di mobile
- [ ] Ukuran logo proporsional

### Performance
- [ ] Logo load cepat (< 1 detik)
- [ ] Tidak ada flickering saat load
- [ ] Cache logo di browser
- [ ] Tidak ada multiple request

## Troubleshooting

### Logo tidak tampil
**Penyebab:**
- Logo belum diupload
- Path logo salah di database
- File tidak ada di folder uploads/
- API error

**Solusi:**
1. Cek database: `SELECT logo FROM koperasi_info WHERE id = 1`
2. Cek file exists: `ls uploads/`
3. Cek console browser untuk error
4. Re-upload logo

### Logo pecah/blur
**Penyebab:**
- Resolusi logo terlalu kecil
- Kompresi berlebihan

**Solusi:**
- Upload logo dengan resolusi minimal 200x200px
- Gunakan format PNG untuk kualitas terbaik

### Logo tidak update
**Penyebab:**
- Browser cache
- Logo lama masih di-cache

**Solusi:**
- Hard refresh (Ctrl+F5)
- Clear browser cache
- Gunakan versioning: `/uploads/logo.jpg?v=timestamp`

## Future Improvements

### Logo Management
- [ ] Preview sebelum upload
- [ ] Crop/resize logo di browser
- [ ] Multiple logo (light/dark theme)
- [ ] Logo history/versioning
- [ ] Hapus logo (reset ke default)

### Performance
- [ ] Lazy load logo
- [ ] Progressive image loading
- [ ] WebP format support
- [ ] CDN integration

### Branding
- [ ] Favicon dari logo
- [ ] Logo untuk print/PDF
- [ ] Logo untuk email
- [ ] Logo untuk social media

---

**Tanggal:** 9 November 2025
**Status:** ✅ Selesai
**Halaman:** Login Manajemen, Login Member, Portal Member, Sidebar Admin
**Fitur:** Logo koperasi tampil di semua halaman dengan konsistensi branding
