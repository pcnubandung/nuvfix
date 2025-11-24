# Fitur Upload KTP di Portal Member

## Deskripsi
Fitur ini memungkinkan member untuk mengupload foto KTP mereka melalui form edit profil di portal member.

## Fitur yang Ditambahkan

### 1. Frontend (public/js/member.js)

#### Form Edit Profil
- Input upload foto profil dan KTP dengan 2 metode:
  - **Upload dari file** - Pilih file dari galeri/storage
  - **Ambil dari kamera** - Langsung foto menggunakan kamera device
- Validasi:
  - Format: JPG, PNG, PDF (untuk KTP)
  - Ukuran maksimal: 5MB
  - Preview sebelum upload
- Button "Lihat KTP Saat Ini" jika sudah ada foto KTP
- Preview real-time untuk image dan PDF

#### Halaman Profil
- Menampilkan button "Lihat KTP" jika member sudah upload
- Menampilkan "Belum upload" jika belum ada foto KTP

#### Fungsi Helper
- `previewImageMember(input, previewId)` - Preview file sebelum upload dengan validasi
- `viewFotoKTPMember(filename)` - Modal untuk melihat foto KTP (support image & PDF)

#### Fungsi Kamera
- `openCameraMember(inputId, previewId)` - Membuka modal kamera
- `startCameraMember()` - Mengaktifkan kamera device
- `switchCameraMember()` - Ganti antara kamera depan/belakang
- `capturePhotoMember()` - Ambil foto dari kamera
- `closeCameraMember()` - Tutup kamera dan bersihkan stream

### 2. Backend (routes-member.js)

#### Endpoint GET /api/member/profile
- Menambahkan field `foto_ktp` di response

#### Endpoint PUT /api/member/profile
- Support multiple file upload menggunakan `upload.fields()`:
  - `foto` - Foto profil
  - `foto_ktp` - Foto KTP
- Update kolom `foto_ktp` di database jika ada file baru
- Return filename foto_ktp yang berhasil diupload

## Cara Menggunakan

### Untuk Member:

#### Upload dari File:
1. Login ke portal member
2. Klik menu "Profil Saya"
3. Klik tombol "Edit Profil"
4. Scroll ke bagian "Foto Profil" atau "Foto KTP"
5. Klik "Choose File" dan pilih foto dari galeri/storage
6. Preview akan muncul otomatis
7. Klik "Simpan"

#### Upload dari Kamera:
1. Login ke portal member
2. Klik menu "Profil Saya"
3. Klik tombol "Edit Profil"
4. Scroll ke bagian "Foto Profil" atau "Foto KTP"
5. Klik tombol "Kamera" (icon kamera)
6. Izinkan akses kamera jika diminta browser
7. Arahkan kamera ke objek (wajah untuk foto profil, KTP untuk foto KTP)
8. Klik "Ambil Foto" untuk capture
9. Preview akan muncul otomatis
10. Klik "Simpan" untuk menyimpan perubahan

#### Fitur Tambahan Kamera:
- **Ganti Kamera** - Switch antara kamera depan dan belakang (untuk mobile)
- **Batal** - Tutup kamera tanpa mengambil foto
- Foto otomatis tersimpan dalam format JPG dengan kualitas tinggi

### Untuk Admin:
- Admin bisa melihat foto KTP member di halaman detail anggota
- Foto KTP tersimpan di folder `public/uploads/`

## Validasi

### Client-side (JavaScript):
- Ukuran file maksimal 5MB
- Format file: JPG, PNG, GIF, PDF
- Alert otomatis jika validasi gagal

### Server-side (Multer):
- File disimpan dengan timestamp untuk menghindari duplikasi
- Lokasi: `public/uploads/`

## Database
Kolom `foto_ktp` sudah ada di tabel `anggota` (VARCHAR).

## Testing

### Upload dari File:
1. Test upload foto KTP format JPG ✓
2. Test upload foto KTP format PNG ✓
3. Test upload foto KTP format PDF ✓
4. Test validasi ukuran file > 5MB ✓
5. Test preview image ✓
6. Test preview PDF ✓
7. Test view foto KTP yang sudah diupload ✓
8. Test update profil tanpa mengubah foto KTP ✓

### Upload dari Kamera:
1. Test akses kamera di desktop ✓
2. Test akses kamera di mobile ✓
3. Test switch kamera depan/belakang ✓
4. Test capture foto dari kamera ✓
5. Test preview foto hasil capture ✓
6. Test close kamera tanpa capture ✓
7. Test error handling (kamera tidak ada/ditolak) ✓
8. Test kualitas foto hasil capture ✓

## Catatan
- Foto profil dan KTP bersifat opsional, member bisa skip saat edit profil
- Jika tidak upload file baru, foto lama tetap tersimpan
- Support untuk view PDF langsung di browser
- Support download untuk image
- Fitur kamera memerlukan HTTPS atau localhost untuk keamanan
- Browser akan meminta izin akses kamera saat pertama kali digunakan
- Foto dari kamera otomatis dalam format JPG dengan kompresi 90%
- Resolusi kamera ideal: 1280x720 (HD)
- Kamera stream otomatis berhenti saat modal ditutup untuk menghemat resource

## Browser Support
- Chrome/Edge: ✓ Full support
- Firefox: ✓ Full support  
- Safari: ✓ Full support (iOS 11+)
- Opera: ✓ Full support

## Keamanan
- Akses kamera memerlukan izin user
- Stream kamera otomatis dihentikan setelah selesai
- Foto tidak disimpan di cache browser
- File upload melalui HTTPS (production)
