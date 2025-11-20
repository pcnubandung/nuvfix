# Perbaikan Fungsi Export dan Cetak Buku Kas

## Masalah yang Diperbaiki
Fungsi export Excel dan cetak laporan buku kas tidak berfungsi karena:
1. Fungsi `formatDate()` dan `formatCurrency()` tidak tersedia di scope fungsi export dan cetak
2. Tidak ada error handling yang memadai
3. Format CSV tidak optimal untuk Excel

## Solusi yang Diterapkan

### 1. Export Excel (CSV)
**Perbaikan:**
- Menambahkan helper function `formatTanggal()` lokal di dalam fungsi export
- Menambahkan BOM (Byte Order Mark) `\uFEFF` untuk encoding UTF-8 yang benar
- Escape karakter quotes di uraian untuk mencegah error CSV
- Menambahkan baris total di akhir CSV
- Menggunakan spread operator `[...window.bukuKasData]` untuk menghindari mutasi data

**Format CSV:**
```csv
No.,Tanggal,Uraian,Penerimaan (Rp),Pengeluaran (Rp),Saldo (Rp)
1,"01/01/2024","Simpanan Pokok - Ahmad (A001)",100000,0,100000
2,"02/01/2024","Biaya Operasional - Listrik",0,50000,50000

TOTAL,,,150000,50000,100000
```

### 2. Cetak Laporan
**Perbaikan:**
- Menambahkan helper functions lokal: `formatTanggal()` dan `formatRupiah()`
- Menambahkan try-catch untuk error handling
- Menambahkan meta charset UTF-8 di HTML cetak
- Menggunakan spread operator untuk data
- Menambahkan alert error jika terjadi kesalahan

**Fitur Cetak:**
- Header dengan informasi koperasi lengkap
- Periode yang dipilih (atau "Semua Periode")
- Tabel dengan border dan styling profesional
- Ringkasan total penerimaan, pengeluaran, dan saldo
- Footer dengan timestamp cetak
- Tombol cetak dan tutup

### 3. Helper Functions Lokal

#### formatTanggal()
```javascript
const formatTanggal = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
```

#### formatRupiah()
```javascript
const formatRupiah = (amount) => {
  if (!amount && amount !== 0) return 'Rp 0';
  return 'Rp ' + Math.abs(amount).toLocaleString('id-ID');
};
```

## Cara Menggunakan

### Export Excel
1. Buka menu "Laporan Keuangan"
2. (Opsional) Filter berdasarkan periode
3. Klik tombol "Export Excel"
4. File CSV akan otomatis terdownload dengan nama `buku-kas-YYYY-MM-DD.csv`
5. Buka file dengan Excel atau Google Sheets

### Cetak Laporan
1. Buka menu "Laporan Keuangan"
2. (Opsional) Filter berdasarkan periode
3. Klik tombol "Cetak"
4. Jendela preview akan terbuka
5. Klik "Cetak Dokumen" untuk mencetak atau save as PDF
6. Klik "Tutup" untuk menutup preview

## Testing

### Test Export Excel
```javascript
// Di browser console
window.exportBukuKas();
// Harus download file CSV
```

### Test Cetak
```javascript
// Di browser console
window.cetakBukuKas();
// Harus membuka window baru dengan preview cetak
```

## File yang Dimodifikasi
- `public/js/laporan-keuangan.js` - Perbaikan fungsi export dan cetak
- `public/index.html` - Sudah include script laporan-keuangan.js

## Catatan Teknis
1. **CSV Encoding**: Menggunakan UTF-8 dengan BOM untuk kompatibilitas Excel
2. **Data Immutability**: Menggunakan spread operator untuk menghindari mutasi data asli
3. **Error Handling**: Try-catch di fungsi cetak untuk menangani error API
4. **Locale**: Format tanggal dan mata uang menggunakan locale Indonesia (id-ID)
5. **Print Styling**: CSS khusus untuk print dengan `@media print`

## Troubleshooting

### Export tidak download file
- Pastikan browser tidak memblokir download
- Cek console untuk error
- Pastikan ada data di `window.bukuKasData`

### Cetak tidak membuka window baru
- Pastikan browser tidak memblokir popup
- Cek console untuk error API
- Pastikan endpoint `/api/koperasi-info` berfungsi

### Format tanggal/mata uang salah
- Pastikan browser mendukung `toLocaleString('id-ID')`
- Cek data tanggal dalam format yang benar (YYYY-MM-DD)

## Versi
- **Tanggal**: 2024
- **Status**: ✅ Selesai dan Berfungsi
- **Tested**: Export CSV dan Cetak PDF
