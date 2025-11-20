# Fitur Buku Kas - Laporan Keuangan

## Deskripsi
Fitur Buku Kas adalah bagian dari Laporan Keuangan yang menampilkan semua transaksi keuangan koperasi dalam format buku kas standar dengan kolom-kolom:
- **No.** - Nomor urut transaksi
- **Tanggal** - Tanggal transaksi
- **Uraian** - Deskripsi/keterangan transaksi
- **Penerimaan (Rp)** - Uang masuk
- **Pengeluaran (Rp)** - Uang keluar
- **Saldo (Rp)** - Saldo berjalan (running balance)

## Sumber Data

### Penerimaan (Uang Masuk)
1. **Transaksi Simpanan** - Dari halaman Transaksi Simpanan
   - Simpanan Pokok
   - Simpanan Wajib
   - Simpanan Khusus
   - Simpanan Sukarela

2. **Hasil Penjualan** - Dari halaman Hasil Penjualan
   - Semua transaksi penjualan dari unit usaha

3. **Pendapatan Lain** - Dari halaman Pendapatan Lain
   - Pendapatan di luar penjualan dan simpanan

### Pengeluaran (Uang Keluar)
1. **Pengeluaran** - Dari halaman Pengeluaran
   - Semua kategori pengeluaran koperasi

## Fitur Utama

### 1. Tampilan Buku Kas
- Tabel lengkap dengan semua transaksi terurut berdasarkan tanggal
- Saldo berjalan yang dihitung otomatis per baris
- Warna hijau untuk saldo positif, merah untuk saldo negatif
- Total penerimaan, pengeluaran, dan saldo akhir

### 2. Filter Periode
- Filter berdasarkan tanggal mulai
- Filter berdasarkan tanggal akhir
- Tombol reset untuk menampilkan semua data

### 3. Export Excel
- Export data ke format CSV
- Dapat difilter berdasarkan periode
- Nama file: `buku-kas-YYYY-MM-DD.csv`

### 4. Cetak Laporan
- Cetak buku kas dalam format profesional
- Header dengan informasi koperasi
- Ringkasan total penerimaan, pengeluaran, dan saldo
- Informasi periode yang dipilih

### 5. Ringkasan
- Total Penerimaan (warna hijau)
- Total Pengeluaran (warna merah)
- Saldo Akhir (hijau jika positif, merah jika negatif)

## Cara Menggunakan

1. **Akses Menu**
   - Klik menu "Laporan Keuangan" di sidebar

2. **Lihat Semua Transaksi**
   - Secara default menampilkan semua transaksi

3. **Filter Berdasarkan Periode**
   - Pilih tanggal mulai di field "Dari Tanggal"
   - Pilih tanggal akhir di field "Sampai Tanggal"
   - Klik tombol "Filter"
   - Klik "Reset" untuk menampilkan semua data

4. **Export ke Excel**
   - Klik tombol "Export Excel"
   - File CSV akan otomatis terdownload

5. **Cetak Laporan**
   - Klik tombol "Cetak"
   - Jendela preview akan terbuka
   - Klik "Cetak Dokumen" untuk mencetak

## Format Uraian

### Simpanan
```
Simpanan [Jenis] - [Nama Anggota] ([Nomor Anggota])
Contoh: Simpanan Pokok - Ahmad Dahlan (A001)
```

### Penjualan
```
Penjualan - [Keterangan] ([Unit Usaha])
Contoh: Penjualan - Penjualan Harian (Toko Sembako)
```

### Pendapatan Lain
```
Pendapatan Lain - [Keterangan]
Contoh: Pendapatan Lain - Sewa Gedung
```

### Pengeluaran
```
[Kategori] - [Keterangan]
Contoh: Biaya Operasional - Listrik Bulan Januari
```

## File Terkait
- **public/js/laporan-keuangan.js** - File utama untuk fitur Buku Kas
- **public/index.html** - Sudah ditambahkan script laporan-keuangan.js

## API Endpoint yang Digunakan
- `GET /api/simpanan/all` - Mengambil semua transaksi simpanan
- `GET /api/transaksi/penjualan` - Mengambil data penjualan
- `GET /api/transaksi/pengeluaran` - Mengambil data pengeluaran
- `GET /api/transaksi/pendapatan-lain` - Mengambil data pendapatan lain
- `GET /api/koperasi-info` - Mengambil informasi koperasi untuk cetak

## Catatan Teknis
- Saldo dihitung secara kumulatif (running balance)
- Transaksi diurutkan berdasarkan tanggal (ascending)
- Format tanggal: DD/MM/YYYY
- Format mata uang: Rp X.XXX.XXX
- Data disimpan di `window.bukuKasData` untuk keperluan filter
