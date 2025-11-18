# Perbaikan Error 403 di Portal Member

## Masalah
Portal member mengalami error 403 (Forbidden) saat mengakses halaman:
- Simpanan
- Riwayat
- Laporan Keuangan
- SHU

## Penyebab
Middleware `authenticateToken` di `server.js` hanya memverifikasi token admin, tidak mendukung token member yang dibuat oleh `routes-member.js`.

## Solusi
Mengupdate middleware `authenticateToken` di `server.js` untuk mendukung verifikasi token dari:
1. Admin (menggunakan SECRET_KEY)
2. Member (menggunakan JWT_SECRET yang sama)

## Perubahan File

### 1. server.js
- Update middleware `authenticateToken` untuk mencoba verifikasi dengan SECRET_KEY terlebih dahulu
- Jika gagal, coba verifikasi dengan MEMBER_SECRET sebagai fallback
- Karena kedua secret sama, token member sekarang bisa diverifikasi

### 2. routes-member.js
- Update JWT_SECRET untuk menggunakan environment variable jika tersedia
- Memastikan konsistensi dengan SECRET_KEY di server.js

## Testing
Setelah deploy ke Railway:
1. Login ke portal member di `/member-login.html`
2. Coba akses halaman Simpanan - seharusnya tidak ada error 403
3. Coba akses halaman Riwayat - seharusnya tidak ada error 403
4. Coba akses halaman Laporan Keuangan - seharusnya tidak ada error 403
5. Coba akses halaman SHU - seharusnya tidak ada error 403

## Catatan
- Tidak perlu mengubah kode frontend (member.js)
- Tidak perlu mengubah database
- Perubahan hanya di backend untuk autentikasi
- Token yang sudah ada tetap valid
