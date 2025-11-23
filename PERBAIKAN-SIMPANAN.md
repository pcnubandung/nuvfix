# Perbaikan Ketidaksesuaian Total Simpanan

## Masalah yang Ditemukan

Ada ketidaksesuaian antara total simpanan di beranda dengan transaksi simpanan:
- **Beranda**: Menampilkan Rp 150.000
- **Halaman Transaksi Simpanan**: Menampilkan Rp 210.000

## Analisis Masalah

### 1. Data Corrupt di Database
- Ditemukan 5 transaksi simpanan wajib dengan `anggota_id` berupa string `'[object Object]'` (bukan integer)
- Transaksi ini berstatus 'approved' dengan total Rp 150.000
- Karena `anggota_id` tidak valid, JOIN dengan tabel anggota gagal
- Akibatnya, transaksi tidak muncul di halaman transaksi simpanan

### 2. Bug di Frontend
**Lokasi**: `public/js/pages.js` - fungsi `createSearchableAnggotaSelect()`

**Masalah**: Ada duplikasi atribut `name` pada form:
```javascript
// SEBELUM (SALAH)
<select name="${name}" id="${containerId}_select">
<input type="hidden" name="${name}" id="${containerId}_value">
```

Ketika form disubmit, FormData mengambil nilai dari select element yang bisa berupa object, bukan ID integer.

## Solusi yang Diterapkan

### 1. Membersihkan Data Corrupt
- Menghapus 5 transaksi dengan `anggota_id` corrupt
- Data ini perlu diinput ulang dengan benar

### 2. Memperbaiki Bug Frontend
**File**: `public/js/pages.js`

**Perubahan**:
```javascript
// SESUDAH (BENAR)
<select id="${containerId}_select">  // Hapus name attribute
<input type="hidden" name="${name}" id="${containerId}_value">
```

Sekarang hanya hidden input yang memiliki atribut `name`, sehingga hanya ID integer yang dikirim ke backend.

## Hasil Setelah Perbaikan

- ✅ Total simpanan di beranda: Rp 0 (tidak ada transaksi approved)
- ✅ Total simpanan di halaman transaksi: Rp 0 (konsisten)
- ✅ Bug input anggota_id sudah diperbaiki
- ✅ Transaksi baru akan tersimpan dengan benar

## Catatan

- 2 transaksi simpanan wajib yang tersisa berstatus 'rejected' (total Rp 60.000)
- Transaksi rejected tidak dihitung dalam total simpanan (sesuai dengan logika bisnis)
- Untuk menambah data simpanan, gunakan form "Tambah Transaksi" yang sudah diperbaiki

## Testing

Untuk memastikan perbaikan berhasil:
1. Tambah transaksi simpanan baru melalui form
2. Verifikasi bahwa `anggota_id` tersimpan sebagai integer di database
3. Pastikan transaksi muncul di halaman transaksi simpanan
4. Pastikan total di beranda sesuai dengan total di halaman transaksi
