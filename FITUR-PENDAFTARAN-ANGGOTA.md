# 📝 FITUR PENDAFTARAN ANGGOTA ONLINE

## Overview

Fitur pendaftaran anggota online memungkinkan calon anggota mendaftar langsung melalui website tanpa harus datang ke kantor koperasi. Data pendaftaran akan langsung masuk ke database dan dapat dikelola oleh admin.

## 📁 Files Created

1. **public/register.html** - Halaman pendaftaran
2. **public/css/register.css** - Styling halaman pendaftaran
3. **public/js/register.js** - JavaScript untuk form handling
4. **server.js** - Updated dengan endpoint `/api/register/anggota`
5. **public/landing.html** - Updated dengan tombol "Daftar Sekarang"

## 🎨 Features

### 1. **Form Pendaftaran Lengkap**
- Data Pribadi (Nama, NIK, Tempat/Tanggal Lahir, Jenis Kelamin)
- Informasi Kontak (Alamat, Telepon, Email, Pekerjaan)
- Akun Portal (Username & Password - Opsional)

### 2. **Validasi Form**
- ✅ Required fields validation
- ✅ NIK validation (16 digit)
- ✅ Phone number validation (format Indonesia)
- ✅ Email validation
- ✅ Username validation (min 4 karakter)
- ✅ Password validation (min 6 karakter)

### 3. **Auto-Generate Nomor Anggota**
Format: `NUV{TAHUN}{4DIGIT}`
Contoh: `NUV20250001`

### 4. **Success Modal**
- Menampilkan nomor anggota yang baru dibuat
- Tombol untuk kembali ke beranda atau login portal
- Informasi untuk menyimpan nomor anggota

### 5. **Syarat & Ketentuan**
- Modal dengan syarat keanggotaan
- Hak dan kewajiban anggota
- Checkbox agreement

### 6. **Responsive Design**
- Desktop, Tablet, Mobile friendly
- Sticky info section di desktop
- Form yang mudah diisi

## 🚀 Cara Mengakses

### URL Pendaftaran:
```
http://localhost:3000/register.html
```

### Dari Landing Page:
- Klik tombol "Daftar Sekarang" di Hero Section
- Klik tombol "Daftar Sebagai Anggota" di CTA Section

## 📋 Flow Pendaftaran

```
1. User mengisi form pendaftaran
   ↓
2. Validasi form di frontend
   ↓
3. Generate nomor anggota otomatis
   ↓
4. Submit ke API /api/register/anggota
   ↓
5. Backend validasi & cek duplikasi
   ↓
6. Insert ke database (tabel anggota)
   ↓
7. Return success dengan nomor anggota
   ↓
8. Tampilkan success modal
   ↓
9. User dapat login ke portal (jika buat akun)
```

## 🔧 API Endpoint

### POST /api/register/anggota

**Request Body:**
```json
{
  "nomor_anggota": "NUV20250001",
  "nama_lengkap": "Ahmad Fauzi",
  "nik": "3201012345678901",
  "tempat_lahir": "Jakarta",
  "tanggal_lahir": "1990-01-15",
  "jenis_kelamin": "Laki-laki",
  "alamat": "Jl. Merdeka No. 123",
  "nomor_telpon": "081234567890",
  "email": "ahmad@email.com",
  "pekerjaan": "Wiraswasta",
  "tanggal_bergabung": "2025-01-01",
  "username": "ahmad.fauzi",
  "password": "password123",
  "status": "aktif"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Pendaftaran berhasil",
  "data": {
    "id": 1,
    "nomor_anggota": "NUV20250001",
    "nama_lengkap": "Ahmad Fauzi"
  }
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Username sudah digunakan"
}
```

## ✅ Validasi Backend

### 1. **Required Fields**
- nomor_anggota
- nama_lengkap
- alamat
- nomor_telpon

### 2. **Unique Checks**
- Nomor anggota (auto-generated, tapi tetap dicek)
- Username (jika diisi)

### 3. **Password Hashing**
- Password di-hash dengan bcrypt sebelum disimpan
- Salt rounds: 10

## 🎯 Integration dengan Admin

### Data Masuk ke Dashboard Admin
Setelah pendaftaran berhasil, data akan langsung muncul di:
- Menu "Data Anggota" di admin dashboard
- Status: Aktif
- Dapat langsung dikelola oleh admin

### Admin Dapat:
- ✅ Melihat data anggota baru
- ✅ Edit data jika ada yang perlu diperbaiki
- ✅ Upload foto anggota
- ✅ Mengelola simpanan anggota
- ✅ Melihat riwayat transaksi

## 🔒 Security

### 1. **Password Security**
- Password di-hash dengan bcrypt
- Tidak pernah disimpan dalam plain text
- Salt rounds: 10

### 2. **Input Validation**
- Frontend validation untuk UX
- Backend validation untuk security
- SQL injection prevention (parameterized queries)

### 3. **Duplicate Prevention**
- Check nomor anggota sebelum insert
- Check username sebelum insert
- Unique constraints di database

## 📱 User Experience

### 1. **Info Section**
- Keuntungan menjadi anggota
- Kontak bantuan
- Sticky di desktop untuk referensi

### 2. **Form Sections**
- Dibagi per kategori (Data Pribadi, Kontak, Akun)
- Icons untuk visual guidance
- Helper text untuk field yang perlu penjelasan

### 3. **Success Feedback**
- Modal dengan animasi
- Nomor anggota ditampilkan jelas
- Call-to-action untuk langkah selanjutnya

### 4. **Error Handling**
- Validasi real-time
- Error messages yang jelas
- Tidak kehilangan data saat error

## 🎨 Customization

### Update Keuntungan Anggota
Edit file `public/register.html` di section benefits:
```html
<div class="benefit-item">
  <i data-feather="check-circle"></i>
  <div>
    <h4>Judul Keuntungan</h4>
    <p>Deskripsi keuntungan</p>
  </div>
</div>
```

### Update Syarat & Ketentuan
Edit file `public/register.html` di modal terms:
```html
<div class="modal-body">
  <h3>Syarat Keanggotaan</h3>
  <ol>
    <li>Syarat 1</li>
    <li>Syarat 2</li>
  </ol>
</div>
```

### Update Warna
Edit file `public/css/register.css`:
```css
:root {
  --primary-color: #008B8B;
  --secondary-color: #20B2AA;
  --accent-color: #FFD700;
}
```

## 📊 Analytics (Optional)

### Track Pendaftaran
Tambahkan Google Analytics event:
```javascript
// Di register.js setelah success
gtag('event', 'registration', {
  'event_category': 'engagement',
  'event_label': 'member_registration'
});
```

## 🔄 Workflow Admin

### Setelah Anggota Mendaftar:

1. **Admin menerima notifikasi** (optional - bisa ditambahkan)
2. **Admin verifikasi data** di menu Data Anggota
3. **Admin upload foto** anggota (jika ada)
4. **Admin catat simpanan pokok** (transaksi pertama)
5. **Anggota dapat mulai bertransaksi**

## 📝 TODO / Enhancement Ideas

### Future Improvements:
- [ ] Email notification ke admin saat ada pendaftaran baru
- [ ] Email confirmation ke anggota dengan nomor anggota
- [ ] Upload foto saat pendaftaran
- [ ] Captcha untuk prevent spam
- [ ] Admin approval workflow (status: pending → approved)
- [ ] SMS notification dengan nomor anggota
- [ ] Payment gateway untuk simpanan pokok
- [ ] Multi-step form dengan progress indicator

## 🐛 Troubleshooting

### Masalah: Nomor anggota sudah terdaftar
**Solusi:** Refresh halaman untuk generate nomor baru

### Masalah: Username sudah digunakan
**Solusi:** Pilih username lain atau kosongkan untuk tidak membuat akun portal

### Masalah: Form tidak tersubmit
**Solusi:** 
- Cek semua required fields sudah diisi
- Cek checkbox agreement sudah dicentang
- Cek console browser untuk error

### Masalah: Data tidak muncul di admin
**Solusi:**
- Refresh halaman admin
- Cek filter status (harus "aktif")
- Cek database langsung

## 📞 Support

Jika ada pertanyaan atau butuh customization, silakan hubungi developer.

---

**Happy Registering! 🎉**
