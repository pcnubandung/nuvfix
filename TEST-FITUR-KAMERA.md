# Testing Guide - Fitur Upload Kamera

## Cara Testing di Development

### 1. Jalankan Server
```bash
node server.js
```

### 2. Akses Portal Member
- Buka browser: `http://localhost:3000/member-login.html`
- Login dengan akun member
- Navigasi ke menu "Simpanan"
- Klik "Bayar Simpanan"

### 3. Test Upload dengan Kamera

#### Di Desktop (dengan Webcam):
1. Scroll ke bagian "Bukti Pembayaran"
2. Klik tombol "Ambil Foto" (hijau dengan icon kamera)
3. Browser akan meminta izin akses kamera
4. Klik "Allow/Izinkan"
5. Webcam akan aktif
6. Ambil foto
7. Preview akan muncul otomatis

#### Di Mobile (Android/iOS):
1. Scroll ke bagian "Bukti Pembayaran"
2. Klik tombol "Ambil Foto" (hijau dengan icon kamera)
3. Aplikasi kamera native akan terbuka
4. Ambil foto bukti pembayaran
5. Klik "Use Photo" atau "OK"
6. Preview akan muncul otomatis

### 4. Test Upload dari File
1. Klik tombol "Pilih File" (abu-abu dengan icon upload)
2. Pilih file dari galeri/storage
3. Preview akan muncul

### 5. Test Validasi
1. Coba upload file > 5MB → Harus muncul error
2. Coba upload format selain JPG/PNG/PDF → Harus muncul error
3. Coba submit tanpa upload → Harus muncul error "wajib"

## Expected Results

### ✅ Tombol Tampil dengan Benar
```
┌─────────────────────────────────────────┐
│  Bukti Pembayaran * (Wajib)             │
├─────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐    │
│  │ 📤 Pilih File│  │ 📷 Ambil Foto│    │
│  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────┘
```

### ✅ Preview Muncul Setelah Upload
```
┌─────────────────────────────────────────┐
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │        [Preview Image]            │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│  ✓ bukti_transfer.jpg (245.67 KB)      │
└─────────────────────────────────────────┘
```

### ✅ Mobile Responsive
```
Mobile View (< 480px):
┌─────────────────────┐
│  Bukti Pembayaran * │
├─────────────────────┤
│  ┌─────────────────┐│
│  │ 📤 Pilih File   ││
│  └─────────────────┘│
│  ┌─────────────────┐│
│  │ 📷 Ambil Foto   ││
│  └─────────────────┘│
└─────────────────────┘
```

## Troubleshooting

### Masalah 1: Kamera Tidak Terbuka
**Penyebab:**
- Browser tidak memiliki izin akses kamera
- Tidak ada kamera di device
- Menggunakan HTTP (bukan HTTPS)

**Solusi:**
- Pastikan browser memiliki izin kamera
- Test di device yang memiliki kamera
- Gunakan HTTPS atau localhost

### Masalah 2: Preview Tidak Muncul
**Penyebab:**
- File terlalu besar (> 5MB)
- Format file tidak didukung
- JavaScript error

**Solusi:**
- Cek console browser untuk error
- Pastikan file < 5MB
- Pastikan format JPG/PNG/PDF

### Masalah 3: Tombol Tidak Responsive di Mobile
**Penyebab:**
- CSS tidak ter-load
- Cache browser

**Solusi:**
- Hard refresh (Ctrl+Shift+R)
- Clear cache browser
- Cek file member.css ter-load

## Browser Compatibility Check

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari (latest)

### Mobile
- [ ] Chrome Android
- [ ] Safari iOS
- [ ] Firefox Android
- [ ] Samsung Internet

## Performance Check

### Metrics to Monitor:
1. **Upload Speed**: Foto 2MB harus upload < 3 detik
2. **Preview Load**: Preview harus muncul < 1 detik
3. **Camera Open**: Kamera harus terbuka < 2 detik
4. **Memory Usage**: Tidak ada memory leak setelah multiple upload

## Security Check

### Validations:
- [x] File size validation (max 5MB)
- [x] File type validation (image/pdf only)
- [x] Required field validation
- [x] Server-side validation (backend)

## User Acceptance Testing

### Scenario 1: First Time User
1. User belum pernah upload bukti pembayaran
2. User klik "Ambil Foto"
3. Browser minta izin kamera
4. User izinkan
5. Kamera terbuka
6. User ambil foto
7. Preview muncul
8. User submit form
9. ✅ Success

### Scenario 2: Experienced User
1. User sudah pernah upload sebelumnya
2. User langsung klik "Ambil Foto"
3. Kamera langsung terbuka (no permission prompt)
4. User ambil foto
5. Preview muncul
6. User submit form
7. ✅ Success

### Scenario 3: User Prefer File Upload
1. User lebih suka upload dari galeri
2. User klik "Pilih File"
3. File picker terbuka
4. User pilih foto
5. Preview muncul
6. User submit form
7. ✅ Success

## Checklist Testing

### Functional Testing
- [ ] Tombol "Pilih File" berfungsi
- [ ] Tombol "Ambil Foto" berfungsi
- [ ] Kamera terbuka dengan benar
- [ ] Preview muncul setelah foto diambil
- [ ] Preview muncul setelah file dipilih
- [ ] Validasi ukuran file bekerja
- [ ] Validasi format file bekerja
- [ ] Form submit dengan file berhasil
- [ ] File ter-upload ke server

### UI/UX Testing
- [ ] Tombol mudah ditekan di mobile
- [ ] Icon jelas dan sesuai
- [ ] Warna tombol kontras
- [ ] Preview image tidak terlalu besar
- [ ] Error message jelas
- [ ] Loading indicator muncul saat upload

### Responsive Testing
- [ ] Desktop (> 1024px)
- [ ] Tablet (768px - 1024px)
- [ ] Mobile Large (480px - 768px)
- [ ] Mobile Small (< 480px)

### Cross-Browser Testing
- [ ] Chrome Desktop
- [ ] Firefox Desktop
- [ ] Safari Desktop
- [ ] Edge Desktop
- [ ] Chrome Mobile
- [ ] Safari Mobile
- [ ] Firefox Mobile

## Sign-off

### Developer
- [ ] Code implemented
- [ ] Self-testing completed
- [ ] Documentation created
- [ ] No console errors

### QA
- [ ] Functional testing passed
- [ ] UI/UX testing passed
- [ ] Responsive testing passed
- [ ] Cross-browser testing passed

### Product Owner
- [ ] Feature meets requirements
- [ ] User experience acceptable
- [ ] Ready for production

## Notes
- Fitur ini menggunakan HTML5 native API
- Tidak ada library tambahan yang dibutuhkan
- Compatible dengan semua browser modern
- Memerlukan HTTPS untuk production
