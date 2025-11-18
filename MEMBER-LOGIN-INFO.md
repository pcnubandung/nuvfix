# Informasi Login Member

## Perubahan yang Dilakukan

### 1. Database Schema
- Menambahkan kolom `username` dan `password` ke tabel `anggota`
- Kolom ini memungkinkan anggota untuk login ke portal member

### 2. Routes & API
- **POST /api/member/login** - Login untuk member
  - Bisa login dengan username atau email
  - Password default: `member123`
  
- **GET /api/member/profile** - Mendapatkan profil member (authenticated)
- **PUT /api/member/profile** - Update profil member (authenticated)
- **POST /api/member/change-password** - Ganti password (authenticated)

### 3. Form Anggota
- Form tambah anggota sekarang memiliki field:
  - Username (opsional)
  - Password (opsional)
  
- Form edit anggota:
  - Username (opsional)
  - Password (opsional - kosongkan jika tidak ingin mengubah)

### 4. Login Member
- URL: `/member-login.html`
- Member bisa login dengan:
  - **Username** (jika sudah diset)
  - **Email** (jika sudah diisi)
  - **Password default**: `member123`

## Cara Login untuk Anggota yang Sudah Ada

Untuk anggota yang sudah terdaftar sebelumnya:

1. **Rizal Muttaqin (NUV2025001)**
   - Username: `zoelonline@gmail.com`
   - Password: `member123`

2. **Fajar Noor Fathanah (NUV2025002)**
   - Username: `memberNUV2025002`
   - Password: `member123`

3. **Umar Rosadi (NUV2025003)**
   - Username: `memberNUV2025003`
   - Password: `member123`

## Cara Menambah Anggota Baru dengan Login

Saat menambah anggota baru dari admin panel:

1. Isi data anggota seperti biasa
2. Isi field **Username** (atau biarkan kosong, nanti bisa diset dari edit)
3. Isi field **Password** (atau biarkan kosong untuk set manual nanti)
4. Jika username/password tidak diisi, anggota tidak bisa login sampai admin mengaturnya

## Keamanan

- Password di-hash menggunakan bcrypt sebelum disimpan
- Token JWT digunakan untuk autentikasi
- Token berlaku selama 24 jam
- Member hanya bisa mengakses data mereka sendiri

## Catatan Penting

1. **Ganti Password Default**: Sangat disarankan agar member mengganti password default setelah login pertama kali
2. **Username Unik**: Pastikan username tidak duplikat antar anggota
3. **Email untuk Login**: Jika anggota punya email, mereka bisa login dengan email mereka

## Testing

Untuk test login member:
1. Buka browser ke `http://localhost:3000/member-login.html`
2. Login dengan salah satu kredensial di atas
3. Setelah login, akan diarahkan ke `/member.html` (portal member)

## Script Maintenance

- `update-anggota-schema.js` - Menambahkan kolom username/password ke database
- `set-default-member-password.js` - Set password default untuk anggota yang belum punya password
