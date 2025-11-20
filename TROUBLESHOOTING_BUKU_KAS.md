# Troubleshooting - Buku Kas Export & Cetak

## Masalah yang Dilaporkan
1. Fungsi cetak di buku kas menampilkan pesan "Silakan pilih jenis laporan terlebih dahulu"
2. Export Excel di semua jenis laporan belum berfungsi

## Langkah Debugging

### 1. Cek Console Browser
Buka Developer Tools (F12) dan lihat tab Console untuk melihat:
- Apakah ada error JavaScript?
- Apakah fungsi `renderLaporan` dipanggil?
- Apakah `bukuKasData` ter-load dengan benar?

### 2. Verifikasi Fungsi Ter-load
Di Console browser, ketik:
```javascript
console.log(typeof window.renderLaporan);
console.log(typeof window.exportBukuKas);
console.log(typeof window.cetakBukuKas);
```

Hasilnya harus `"function"` untuk semua.

### 3. Cek Data Buku Kas
Di Console browser, ketik:
```javascript
console.log(window.bukuKasData);
```

Harus menampilkan array dengan data transaksi.

### 4. Test Manual Fungsi
Di Console browser, coba panggil fungsi secara manual:
```javascript
// Test export
window.exportBukuKas();

// Test cetak
window.cetakBukuKas();
```

## Solusi yang Diterapkan

### A. Menambahkan Console.log untuk Debugging
File `laporan-keuangan.js` sudah ditambahkan console.log di:
- `renderLaporan()` - untuk memastikan fungsi dipanggil
- `exportBukuKas()` - untuk debug export
- `cetakBukuKas()` - untuk debug cetak

### B. Memastikan Fungsi Tidak Ter-override
Fungsi `window.renderLaporan` di `laporan-keuangan.js` akan mengoverride fungsi lain yang mungkin ada.

### C. Urutan Loading Script
Pastikan urutan di `index.html` adalah:
```html
<script src="js/cetak-laporan.js"></script>
<script src="js/cetak-aruskas.js"></script>
<script src="js/laporan-keuangan.js"></script>  <!-- Harus setelah cetak-laporan -->
<script src="js/pages.js"></script>
```

## Kemungkinan Penyebab Masalah

### 1. Pesan "Silakan pilih jenis laporan"
Kemungkinan ada halaman laporan lain yang memiliki dropdown untuk memilih jenis laporan (Neraca, Arus Kas, Buku Kas). Pesan ini mungkin berasal dari:
- Validasi form di halaman laporan yang berbeda
- Fungsi cetak yang salah dipanggil
- Event handler yang salah

**Solusi:**
- Pastikan Anda berada di halaman "Laporan Keuangan" yang benar
- Refresh halaman (Ctrl+F5) untuk clear cache
- Cek apakah ada dropdown "Jenis Laporan" di halaman

### 2. Export Excel Tidak Berfungsi
Kemungkinan penyebab:
- Browser memblokir download
- Data `bukuKasData` belum ter-load
- Fungsi `formatDate` tidak tersedia

**Solusi:**
- Cek browser settings untuk allow downloads
- Tunggu hingga data selesai loading
- Cek console untuk error

### 3. Fungsi Tidak Ditemukan
Jika console menampilkan "undefined":
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Restart browser
- Cek apakah file `laporan-keuangan.js` ter-load di Network tab

## Testing Step-by-Step

### Test 1: Akses Halaman
1. Login ke aplikasi
2. Klik menu "Laporan Keuangan" di sidebar
3. Halaman harus menampilkan "Laporan Keuangan - Buku Kas"
4. Harus ada tabel dengan kolom: No., Tanggal, Uraian, Penerimaan, Pengeluaran, Saldo

### Test 2: Export Excel
1. Pastikan ada data di tabel
2. Klik tombol "Export Excel"
3. File CSV harus terdownload dengan nama `buku-kas-YYYY-MM-DD.csv`
4. Buka file dengan Excel/Google Sheets untuk verifikasi

### Test 3: Cetak
1. Pastikan ada data di tabel
2. Klik tombol "Cetak"
3. Window baru harus terbuka dengan preview cetak
4. Klik "Cetak Dokumen" untuk print atau save as PDF

### Test 4: Filter Periode
1. Pilih tanggal mulai
2. Pilih tanggal akhir
3. Klik "Filter"
4. Tabel harus update sesuai periode
5. Test export dan cetak dengan data yang sudah difilter

## File yang Terlibat
- `public/js/laporan-keuangan.js` - Fungsi utama Buku Kas
- `public/index.html` - Include script
- `public/js/utils.js` - Helper functions (formatDate, formatCurrency)
- `public/js/app.js` - API helper

## Jika Masalah Masih Terjadi

### Opsi 1: Cek Network Tab
1. Buka Developer Tools (F12)
2. Klik tab "Network"
3. Refresh halaman
4. Cari file `laporan-keuangan.js`
5. Pastikan status 200 (OK)
6. Klik file tersebut dan lihat Response untuk memastikan isinya benar

### Opsi 2: Manual Load Script
Di Console browser, coba load ulang script:
```javascript
const script = document.createElement('script');
script.src = '/js/laporan-keuangan.js';
document.body.appendChild(script);
```

### Opsi 3: Cek API Endpoint
Pastikan API endpoint berfungsi:
```javascript
// Test API
API.get('/api/simpanan/all').then(data => console.log('Simpanan:', data));
API.get('/api/transaksi/penjualan').then(data => console.log('Penjualan:', data));
API.get('/api/transaksi/pengeluaran').then(data => console.log('Pengeluaran:', data));
API.get('/api/transaksi/pendapatan-lain').then(data => console.log('Pendapatan Lain:', data));
```

## Kontak Support
Jika masalah masih berlanjut setelah mengikuti semua langkah di atas:
1. Screenshot error di Console
2. Screenshot halaman yang bermasalah
3. Jelaskan langkah-langkah yang sudah dicoba
4. Sertakan informasi browser (Chrome/Firefox/Edge) dan versinya

## Changelog
- **2024-11-20**: Menambahkan console.log untuk debugging
- **2024-11-20**: Memperbaiki fungsi export dan cetak
- **2024-11-20**: Menambahkan dokumentasi troubleshooting
