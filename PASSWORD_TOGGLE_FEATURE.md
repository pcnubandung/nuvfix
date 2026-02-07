# 👁️ Password Toggle Feature

## Fitur Baru: Lihat/Sembunyikan Password

Fitur untuk menampilkan atau menyembunyikan password di semua field password di aplikasi.

## ✅ Implementasi

### File Baru:
- `public/js/password-toggle.js` - Script universal untuk toggle password

### File yang Diupdate:
- ✅ `public/login.html` - Login admin
- ✅ `public/member-login.html` - Login member
- ✅ `public/register.html` - Registrasi anggota
- ✅ `public/index.html` - Dashboard admin
- ✅ `public/member.html` - Dashboard member

## 🎯 Cara Kerja

### Otomatis
Script akan **otomatis mendeteksi** semua input password dan menambahkan tombol toggle:

```html
<!-- Sebelum -->
<input type="password" name="password">

<!-- Sesudah (otomatis) -->
<div class="password-input-wrapper">
  <input type="password" name="password" style="padding-right: 40px;">
  <button class="password-toggle-btn">
    <i data-feather="eye"></i>
  </button>
</div>
```

### Fitur:
1. **Auto-detect** - Mendeteksi semua `input[type="password"]`
2. **Dynamic** - Bekerja untuk password field yang ditambahkan via JavaScript
3. **Icon toggle** - Eye icon (👁️) untuk show, Eye-off icon (🙈) untuk hide
4. **Hover effect** - Warna berubah saat hover
5. **No conflict** - Tidak mengganggu styling yang ada

## 🎨 Styling

Tombol toggle memiliki style:
- Position: absolute (di kanan input)
- Icon: Feather icons (eye/eye-off)
- Color: #666 (default), #2E7D32 (hover)
- Cursor: pointer
- No background, no border

## 📍 Lokasi Password Fields

### 1. Login Admin (`login.html`)
- Password field di form login

### 2. Login Member (`member-login.html`)
- Password field di form login member

### 3. Registrasi (`register.html`)
- Password field untuk buat akun portal

### 4. Dashboard Admin (`index.html`)
- Form tambah user (password)
- Form edit user (password)
- Form ganti password (3 fields):
  - Password lama
  - Password baru
  - Konfirmasi password

### 5. Dashboard Member (`member.html`)
- Form ganti password (3 fields):
  - Password lama
  - Password baru
  - Konfirmasi password

### 6. Modal Edit Anggota
- Password field untuk set/update password anggota

### 7. Modal Edit Pengurus
- Password field untuk set/update password pengurus

## 🔧 Technical Details

### MutationObserver
Script menggunakan `MutationObserver` untuk mendeteksi password field yang ditambahkan secara dinamis (via JavaScript):

```javascript
const observer = new MutationObserver((mutations) => {
  // Detect new password inputs
  // Add toggle button automatically
});
```

### Event Handling
```javascript
toggleBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  toggleBtn.innerHTML = isPassword ? 
    '<i data-feather="eye-off"></i>' : 
    '<i data-feather="eye"></i>';
  feather.replace();
});
```

## 🧪 Testing

### Test Manual:
1. **Login Admin**
   - Buka `/login.html`
   - Lihat tombol eye di field password
   - Klik untuk toggle show/hide

2. **Login Member**
   - Buka `/member-login.html`
   - Test toggle password

3. **Ganti Password**
   - Login sebagai admin/member
   - Buka form ganti password
   - Test toggle di 3 field password

4. **Form Modal**
   - Buka modal tambah/edit user
   - Test toggle password

## ✅ Checklist

- [x] Buat `password-toggle.js`
- [x] Tambahkan script ke `login.html`
- [x] Tambahkan script ke `member-login.html`
- [x] Tambahkan script ke `register.html`
- [x] Tambahkan script ke `index.html`
- [x] Tambahkan script ke `member.html`
- [x] Auto-detect password fields
- [x] Support dynamic password fields
- [x] Feather icons integration
- [x] Hover effects
- [x] No styling conflicts

## 🎉 Status

✅ **SELESAI** - Fitur toggle password sudah aktif di semua halaman!

## 📝 Notes

- Script berjalan otomatis, tidak perlu konfigurasi tambahan
- Bekerja untuk semua password field (existing dan dynamic)
- Tidak mengganggu functionality yang ada
- Responsive dan mobile-friendly
- Menggunakan Feather icons yang sudah ada di aplikasi
