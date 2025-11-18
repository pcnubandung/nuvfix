# Changelog - Koperasi NU Vibes

## [2.2.2] - 2024-11-10

### ✨ Added
- **Role Pengawas**: Role baru untuk pengawas koperasi dengan akses read-only
  - Dapat melihat semua laporan keuangan
  - Dapat melihat data anggota, unit usaha, dan aset
  - Tidak dapat input transaksi
  - Tidak dapat manage user

### 🔄 Changed
- Dropdown role di manajemen user: Tambah opsi "Pengawas"
- Access control: Pengawas tidak bisa akses menu transaksi dan pengaturan

---

## [2.2.1] - 2024-11-10

### 🐛 Fixed
- **Laporan Laba/Rugi - Kategori Pengeluaran**: Perlakuan yang benar untuk kategori pengeluaran
  - Pembelian Barang masuk ke Persediaan di Neraca (bukan HPP atau biaya operasional)
  - Pembelian Aset & Inventaris masuk ke Aset Tetap di Neraca (bukan biaya operasional)
  - Biaya Operasional hanya mencakup biaya murni operasional
- **Neraca - Persediaan**: Pembelian Barang sekarang ditampilkan sebagai Persediaan di Aktiva
- **Dashboard Stats**: Perhitungan laba/rugi sekarang lebih akurat

### 🔄 Changed
- Formula Laba Kotor: `Laba Kotor = Total Pendapatan - HPP` (HPP dari transaksi penjualan)
- Formula Laba Bersih: `Laba Bersih = Laba Kotor - Biaya Operasional`
- Formula Neraca Aktiva: `Total Aktiva = Kas & Bank + Persediaan + Aset Tetap`
- Formula Neraca Modal: `Total Modal = Modal Simpanan + Modal Persediaan + Modal Aset + Laba Ditahan`

### ✨ Added
- **Persediaan** di Neraca (dari Pembelian Barang)
- Catatan penjelasan di Laporan Laba/Rugi tentang perlakuan kategori pengeluaran

### 📝 Documentation
- Ditambahkan `FIX-LAPORAN-LABA-RUGI-KATEGORI.md` untuk dokumentasi lengkap

---

## [2.2.0] - 2024-11-10

### ✨ Added
- **Laporan Arus Kas**: Laporan keuangan baru sesuai standar akuntansi koperasi
  - Aktivitas Operasional (penerimaan & pembayaran operasional)
  - Aktivitas Investasi (pembelian aset tetap)
  - Aktivitas Pendanaan (simpanan anggota)
  - Perhitungan Kas Akhir Periode
  - Filter periode: Harian, Bulanan, Tahunan
  - Indikator warna (hijau/merah) untuk kas positif/negatif
  - Catatan penjelasan untuk setiap aktivitas

### 📝 Documentation
- Ditambahkan `FITUR-LAPORAN-ARUS-KAS.md` untuk dokumentasi lengkap

---

## [2.1.2] - 2024-11-10

### 🐛 Fixed
- **Filter Laporan Harian**: Sekarang menggunakan date picker untuk pilih tanggal spesifik (bukan bulan)
- **Filter Laporan Bulanan**: Dropdown bulan sekarang muncul dengan benar
- **Filter Laporan Tahunan**: Tetap menggunakan filter tahun saja
- **Periode Text**: Tampilan periode di laporan sekarang akurat (contoh: "10 November 2024" untuk harian)
- **Laporan Simpanan API**: Filter harian dan bulanan sekarang bekerja dengan benar
- **Simpanan Sukarela di Laporan**: Perhitungan setoran - penarikan sudah benar

### 🔄 Changed
- UI filter laporan keuangan: Dynamic show/hide berdasarkan periode yang dipilih
- Logic filter untuk semua jenis laporan (Simpanan, Penjualan, Pengeluaran, Laba/Rugi, Neraca)
- Filter harian: exact date match (=== tanggal)
- Filter bulanan: startsWith tahun-bulan
- Filter tahunan: startsWith tahun
- API endpoint `/api/laporan/simpanan`: Sekarang menerima parameter `tanggal` untuk filter harian
- Query SQL laporan simpanan: Filter berdasarkan tanggal untuk harian, tahun-bulan untuk bulanan

### ✨ Added
- Input tanggal (date picker) untuk filter harian
- Default value: tanggal hari ini, bulan ini, tahun ini

### 📝 Documentation
- Ditambahkan `FIX-FILTER-LAPORAN-KEUANGAN.md` untuk dokumentasi fix

---

## [2.1.1] - 2024-11-10

### 🐛 Fixed
- **Simpanan Sukarela di Neraca**: Simpanan sukarela sekarang termasuk dalam perhitungan neraca
- **Dashboard Total Simpanan**: Perhitungan total simpanan sekarang memperhitungkan setoran dan penarikan simpanan sukarela
- **Formula Simpanan Sukarela**: Setoran (+) dan Penarikan (-) dihitung dengan benar
- **Balance Neraca**: Neraca sekarang selalu balance dengan memasukkan simpanan sukarela

### 🔄 Changed
- Query SQL dashboard stats untuk menghitung simpanan sukarela dengan CASE statement
- Fungsi renderLaporan() untuk load dan hitung simpanan sukarela di neraca
- Formula: Total Simpanan = Pokok + Wajib + Khusus + (Setoran Sukarela - Penarikan Sukarela)

### 📝 Documentation
- Ditambahkan `FIX-SIMPANAN-SUKARELA-NERACA.md` untuk dokumentasi fix

---

## [2.1.0] - 2024-11-10

### ✨ Added
- **Unified Simpanan Interface**: Semua transaksi simpanan (Pokok, Wajib, Khusus, Sukarela) kini dalam 1 halaman
- Dropdown pilihan jenis simpanan di form input
- Badge warna untuk membedakan jenis simpanan di tabel
- Form dinamis yang menyesuaikan field berdasarkan jenis simpanan

### 🔄 Changed
- Menu sidebar "Transaksi Simpanan" disederhanakan dari 4 menu menjadi 1 menu
- Fungsi `renderSimpanan()` tidak lagi menerima parameter jenis
- Fungsi `tambahSimpanan()` diganti dengan `tambahSimpananUnified()`
- Page loader disederhanakan untuk semua route simpanan

### 📝 Documentation
- Ditambahkan `UPDATE-SIMPANAN-UNIFIED.md` untuk dokumentasi perubahan
- Update `README.md` dengan fitur terbaru
- Ditambahkan `CHANGELOG.md` untuk tracking perubahan

### 🎯 Benefits
- Interface lebih simpel dan user-friendly
- Tidak perlu pindah-pindah halaman untuk input berbagai jenis simpanan
- Overview lengkap semua transaksi dalam 1 tabel
- Lebih efisien dengan Promise.all() untuk load data

---

## [2.0.0] - 2024-11

### ✨ Added
- **Pendapatan Lain**: Fitur untuk mencatat pendapatan non-operasional
- Kategori pendapatan: Bunga Bank, Sewa Aset, Jasa Konsultasi, Komisi, Hibah, Donasi, Lainnya
- Integrasi pendapatan lain ke laporan keuangan
- Cetak struk pendapatan lain
- Member portal dapat melihat pendapatan lain

### 🔄 Changed
- Formula laba/rugi: Total Pendapatan = Laba Kotor + Pendapatan Lain
- Laporan keuangan menampilkan pendapatan lain
- Dashboard menghitung pendapatan lain dalam statistik

---

## [1.5.0] - 2024-10

### ✨ Added
- Complete SHU (Sisa Hasil Usaha) system
- Member portal untuk anggota
- Upload dokumen RAT
- Enhanced reporting system

### 🔄 Changed
- Improved dashboard analytics
- Better chart visualizations
- Enhanced user interface

---

## [1.0.0] - 2024-09

### ✨ Initial Release
- Authentication system (JWT + bcrypt)
- Dashboard dengan statistik real-time
- Manajemen Anggota (CRUD lengkap)
- Manajemen Unit Usaha
- Transaksi Simpanan (4 jenis)
- Partisipasi Anggota
- Transaksi Keuangan (Penjualan & Pengeluaran)
- Perhitungan SHU otomatis
- Laporan Keuangan
- Multi-level User (Admin, Pengurus, Kasir)
- Responsive Design
- Upload foto/logo
- Cetak struk

---

## Legend
- ✨ Added: Fitur baru
- 🔄 Changed: Perubahan pada fitur existing
- 🐛 Fixed: Bug fixes
- 🗑️ Removed: Fitur yang dihapus
- 📝 Documentation: Update dokumentasi
- 🎯 Benefits: Keuntungan dari perubahan
