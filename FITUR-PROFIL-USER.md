# Fitur Profil User & Upload Logo Koperasi

## Deskripsi
Fitur baru untuk manajemen profil user dan logo koperasi di sidebar.

## Fitur yang Ditambahkan

### 1. Logo Koperasi di Sidebar ⭐

**Sebelum:**
- Logo NU statis (lingkaran dengan teks "NU")
- Tidak bisa diganti

**Sesudah:**
- Logo bisa diupload oleh admin
- Tampil di sidebar atas
- Teks "NU Vibes" + subtitle "Sistem Informasi Koperasi"
- Logo berbentuk lingkaran dengan border emas

**Cara Upload Logo:**
1. Login sebagai Admin
2. Buka menu **Info Koperasi**
3. Klik tombol **Upload Logo Baru**
4. Pilih file gambar (max 2MB)
5. Logo otomatis update di sidebar

### 2. Halaman Profil User ⭐

Menu baru: **Profil Saya** (di sidebar sebelum Pengaturan)

**Fitur:**

#### A. Upload Foto Profil
- Foto tampil di header profil
- Placeholder dengan inisial nama jika belum ada foto
- Tombol kamera untuk upload
- Validasi: gambar only, max 2MB
- Foto berbentuk lingkaran

#### B. Informasi Akun
Menampilkan:
- Username
- Nama Lengkap
- Role (Admin/Kasir/Member)
- Status (Aktif)

#### C. Ganti Password
Form untuk mengubah password:
- Password Lama (required)
- Password Baru (min 6 karakter)
- Konfirmasi Password Baru
- Validasi password match
- Persyaratan password ditampilkan

## Struktur UI

### Sidebar Logo
```
┌─────────────────────┐
│  [Logo Koperasi]    │  ← Upload via Info Koperasi
│   NU Vibes          │  ← Teks utama (bold, gold)
│   Sistem Informasi  │  ← Subtitle (small, white)
│   Koperasi          │
└─────────────────────┘
```

### Halaman Profil
```
┌──────────────────────────────────────┐
│         [Foto Profil]                │
│         Nama User                    │
│         Role • Username              │
└──────────────────────────────────────┘

┌─────────────────┐  ┌─────────────────┐
│ Informasi Akun  │  │ Ganti Password  │
│                 │  │                 │
│ Username: xxx   │  │ [Form]          │
│ Nama: xxx       │  │                 │
│ Role: xxx       │  │ [Submit]        │
│ Status: Aktif   │  │                 │
└─────────────────┘  └─────────────────┘
```

## API Endpoints

### 1. Upload Foto Profil
```
POST /api/users/upload-photo
Headers: Authorization: Bearer {token}
Body: FormData { foto: File }

Response:
{
  "success": true,
  "message": "Foto profil berhasil diupdate",
  "foto": "/uploads/1234567890-photo.jpg"
}
```

### 2. Ganti Password
```
POST /api/users/change-password
Headers: Authorization: Bearer {token}
Body: {
  "oldPassword": "string",
  "newPassword": "string"
}

Response:
{
  "success": true,
  "message": "Password berhasil diubah"
}
```

### 3. Upload Logo Koperasi
```
POST /api/koperasi/upload-logo
Headers: Authorization: Bearer {token}
Body: FormData { logo: File }

Response:
{
  "success": true,
  "message": "Logo koperasi berhasil diupdate",
  "logo": "/uploads/1234567890-logo.jpg"
}
```

### 4. Get Logo Koperasi
```
GET /api/koperasi/logo

Response:
{
  "logo": "/uploads/1234567890-logo.jpg"
}
```

## Database Schema

### Tabel: users
```sql
ALTER TABLE users ADD COLUMN foto TEXT;
```

Kolom `foto` menyimpan path foto profil user.

### Tabel: koperasi_info
Kolom `logo` sudah ada, menyimpan path logo koperasi.

## File yang Dimodifikasi

### 1. public/index.html
- Update struktur logo sidebar
- Tambah menu "Profil Saya"

### 2. public/css/style.css
- CSS untuk logo sidebar baru
- CSS untuk halaman profil
- CSS untuk upload foto
- Responsive design

### 3. public/js/app.js
- Fungsi `loadSidebarLogo()` untuk load logo saat page load
- Update logo dari API

### 4. public/js/pages.js
- Fungsi `renderProfil()` untuk halaman profil
- Fungsi `uploadLogoKoperasi()` untuk upload logo
- Handler upload foto profil
- Handler ganti password
- Fungsi `updateSidebarLogo()` untuk update logo real-time

### 5. server.js
- Endpoint `POST /api/users/upload-photo`
- Endpoint `POST /api/users/change-password`
- Endpoint `POST /api/koperasi/upload-logo`
- Endpoint `GET /api/koperasi/logo`

## Validasi

### Upload Foto/Logo
- ✅ File type: image/* only
- ✅ File size: max 2MB
- ✅ Format: JPG, PNG, GIF, WebP
- ✅ Auto resize jadi lingkaran

### Ganti Password
- ✅ Password lama harus benar
- ✅ Password baru min 6 karakter
- ✅ Konfirmasi password harus match
- ✅ Password di-hash dengan bcrypt

## Keamanan

### Authentication
- ✅ Semua endpoint protected dengan JWT
- ✅ Hanya user yang login bisa akses
- ✅ User hanya bisa edit profil sendiri

### File Upload
- ✅ Validasi file type
- ✅ Validasi file size
- ✅ File disimpan dengan nama random (timestamp)
- ✅ Folder uploads/ di-serve sebagai static

### Password
- ✅ Password lama diverifikasi sebelum update
- ✅ Password baru di-hash dengan bcrypt (10 rounds)
- ✅ Tidak ada password yang tersimpan plain text

## User Experience

### Upload Foto
1. Klik icon kamera di foto profil
2. Pilih file dari komputer
3. Validasi otomatis
4. Upload & update real-time
5. Foto langsung tampil

### Ganti Password
1. Isi password lama
2. Isi password baru (min 6 karakter)
3. Konfirmasi password baru
4. Submit
5. Notifikasi sukses/gagal

### Upload Logo Koperasi
1. Buka Info Koperasi
2. Klik "Upload Logo Baru"
3. Pilih file
4. Logo update di sidebar real-time
5. Semua user melihat logo baru

## Responsive Design

### Desktop
- Grid 2 kolom untuk profil
- Foto profil 150x150px
- Layout lebar penuh

### Mobile
- Grid 1 kolom (stack)
- Foto profil 120x120px
- Padding disesuaikan

## Testing Checklist

### Logo Sidebar
- [ ] Logo default (NU) tampil jika belum upload
- [ ] Upload logo via Info Koperasi berhasil
- [ ] Logo update di sidebar real-time
- [ ] Logo tampil setelah refresh
- [ ] Logo berbentuk lingkaran dengan border
- [ ] Subtitle "Sistem Informasi Koperasi" tampil

### Halaman Profil
- [ ] Menu "Profil Saya" tampil di sidebar
- [ ] Halaman profil load dengan benar
- [ ] Foto profil tampil (atau placeholder)
- [ ] Informasi akun tampil lengkap
- [ ] Form ganti password berfungsi

### Upload Foto Profil
- [ ] Klik icon kamera buka file picker
- [ ] Validasi file type (reject non-image)
- [ ] Validasi file size (reject > 2MB)
- [ ] Upload berhasil
- [ ] Foto update real-time
- [ ] Foto persist setelah refresh

### Ganti Password
- [ ] Validasi password lama
- [ ] Validasi password baru (min 6 char)
- [ ] Validasi konfirmasi password match
- [ ] Update password berhasil
- [ ] Bisa login dengan password baru
- [ ] Password lama tidak bisa digunakan

### Security
- [ ] Endpoint protected (401 jika no token)
- [ ] User tidak bisa edit profil user lain
- [ ] Password di-hash di database
- [ ] File upload aman (no script injection)

## Troubleshooting

### Logo tidak tampil
- Cek folder `uploads/` ada dan writable
- Cek path logo di database
- Cek console browser untuk error

### Upload gagal
- Cek file size < 2MB
- Cek file type adalah image
- Cek permission folder uploads/
- Cek server logs

### Password tidak bisa diganti
- Cek password lama benar
- Cek password baru min 6 karakter
- Cek konfirmasi password match
- Cek console untuk error

## Future Improvements

### Foto Profil
- [ ] Crop foto sebelum upload
- [ ] Preview sebelum upload
- [ ] Hapus foto (reset ke placeholder)
- [ ] Compress foto otomatis

### Password
- [ ] Password strength indicator
- [ ] Password requirements real-time validation
- [ ] Email notification saat password berubah
- [ ] Forgot password feature

### Logo
- [ ] Multiple logo (light/dark mode)
- [ ] Logo untuk print/PDF
- [ ] Logo history/versioning

---

**Tanggal:** 9 November 2025
**Status:** ✅ Selesai
**Fitur:** Logo Sidebar + Profil User + Upload Foto + Ganti Password
