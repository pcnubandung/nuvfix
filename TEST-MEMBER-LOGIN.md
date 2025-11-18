# Testing Member Login

## Langkah-langkah Testing

### 1. Pastikan Server Berjalan
```bash
node server.js
```
Server akan berjalan di `http://localhost:3000`

### 2. Buka Halaman Login Member
Buka browser dan akses:
```
http://localhost:3000/member-login.html
```

### 3. Test Login dengan Kredensial Berikut

#### Test 1: Login dengan Email
- **Username/Email**: `zoelonline@gmail.com`
- **Password**: `member123`

#### Test 2: Login dengan Username
- **Username/Email**: `memberNUV2025002`
- **Password**: `member123`

#### Test 3: Login dengan Username Lain
- **Username/Email**: `memberNUV2025003`
- **Password**: `member123`

### 4. Setelah Login Berhasil
- Akan diarahkan ke `/member.html` (Portal Member)
- Bisa melihat dashboard dengan data simpanan
- Bisa melihat profil
- Bisa edit profil
- Bisa ganti password

### 5. Test Ganti Password
1. Login sebagai member
2. Klik menu "Profil"
3. Klik tombol "Ganti Password"
4. Isi:
   - Password Lama: `member123`
   - Password Baru: (password baru Anda)
   - Konfirmasi Password Baru: (password baru Anda)
5. Klik "Ganti Password"
6. Akan logout otomatis
7. Login kembali dengan password baru

### 6. Test Tambah Anggota Baru dengan Login
1. Login sebagai admin di `/login.html`
2. Buka menu "Data Anggota"
3. Klik "Tambah Anggota"
4. Isi data anggota termasuk:
   - Username (contoh: `member004`)
   - Password (contoh: `password123`)
5. Simpan
6. Logout dari admin
7. Login sebagai member baru di `/member-login.html`

### 7. Test Edit Anggota (Update Username/Password)
1. Login sebagai admin
2. Buka menu "Data Anggota"
3. Klik "Edit" pada salah satu anggota
4. Update username atau password
5. Simpan
6. Test login dengan kredensial baru

## Expected Results

✓ Member bisa login dengan username atau email
✓ Member bisa melihat dashboard dengan data mereka
✓ Member bisa edit profil mereka
✓ Member bisa ganti password
✓ Password di-hash dengan aman
✓ Token JWT berfungsi untuk autentikasi
✓ Member hanya bisa akses data mereka sendiri

## Troubleshooting

### Error: "Username/email atau password salah"
- Pastikan username/email benar
- Pastikan password benar (default: `member123`)
- Cek apakah anggota statusnya "aktif"

### Error: "Akun belum diaktifkan"
- Anggota belum punya password
- Admin perlu set password dari form edit anggota
- Atau jalankan script: `node set-default-member-password.js`

### Error: "Token tidak valid"
- Token expired (24 jam)
- Logout dan login kembali
- Clear localStorage browser

### Tidak bisa akses member.html
- Pastikan sudah login
- Cek localStorage ada token
- Cek role user adalah "Member"
