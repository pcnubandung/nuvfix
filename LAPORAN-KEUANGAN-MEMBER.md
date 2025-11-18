# Laporan Keuangan Koperasi - Member Portal

## 🎯 Tujuan

Meningkatkan transparansi manajemen koperasi dengan memberikan akses laporan keuangan real-time kepada seluruh anggota.

## ✨ Fitur Baru: Menu Laporan Keuangan

### Lokasi
**Member Portal** → Menu "Laporan Keuangan" (icon: bar-chart-2)

### Informasi yang Ditampilkan

#### 1. 📊 Ringkasan Utama (4 Cards)

**Total Anggota Aktif**
- Jumlah anggota dengan status aktif
- Icon: users (purple gradient)

**Total Simpanan**
- Akumulasi semua jenis simpanan
- Simpanan Pokok + Wajib + Khusus + Sukarela
- Icon: dollar-sign (green)

**Total Penjualan**
- Akumulasi penjualan dari semua unit usaha
- Icon: shopping-cart (teal)

**Total Pengeluaran**
- Akumulasi biaya operasional koperasi
- Icon: trending-down (red)

#### 2. 💰 Highlight Laba/Rugi

**Card Besar dengan Gradient:**
- **Hijau** jika Laba (profit)
- **Merah** jika Rugi (loss)

**Menampilkan:**
- Laba/Rugi Bersih (angka besar)
- Breakdown: Laba Kotor - Pengeluaran
- Icon emoji: 📈 (laba) atau 📉 (rugi)

**Formula:**
```
Laba Kotor = Total Penjualan - HPP
Laba Bersih = Laba Kotor - Total Pengeluaran
```

#### 3. 📋 Tabel Rincian Simpanan

Menampilkan breakdown per jenis simpanan:
- Simpanan Pokok
- Simpanan Wajib
- Simpanan Khusus
- Simpanan Sukarela

**Kolom:**
- Jenis Simpanan
- Jumlah Transaksi
- Total Nominal
- Persentase dari Total

#### 4. 📈 Laporan Laba Rugi

Tabel format standar akuntansi:

**PENDAPATAN**
- Penjualan
- (HPP) - Harga Pokok Penjualan
- = Laba Kotor

**PENGELUARAN**
- Biaya Operasional

**LABA/RUGI BERSIH**
- Warna hijau jika laba
- Warna merah jika rugi

#### 5. 📅 Laporan Bulan Berjalan

Menampilkan data bulan ini:
- Penjualan bulan ini
- Pengeluaran bulan ini
- Selisih (profit/loss bulan ini)

**Format:**
- Nama bulan dan tahun otomatis
- Jumlah transaksi
- Total nominal
- Warna indikator (hijau/merah)

---

## 🔐 Keamanan & Akses

### Siapa yang Bisa Akses?
✅ **Semua Member** yang sudah login

### Data yang Ditampilkan
✅ Data **global koperasi** (bukan data pribadi)
✅ Real-time (update otomatis)
✅ Read-only (member tidak bisa edit)

### Privasi
- Member tidak bisa melihat detail transaksi anggota lain
- Hanya menampilkan agregat/total
- Tidak menampilkan nama anggota dalam laporan

---

## 📊 Sumber Data

Data diambil dari endpoint API berikut:

| Endpoint | Data |
|----------|------|
| `/api/anggota` | Total anggota aktif |
| `/api/simpanan/pokok` | Simpanan pokok |
| `/api/simpanan/wajib` | Simpanan wajib |
| `/api/simpanan/khusus` | Simpanan khusus |
| `/api/simpanan/sukarela` | Simpanan sukarela |
| `/api/transaksi-penjualan` | Data penjualan |
| `/api/pengeluaran` | Data pengeluaran |

Semua endpoint sudah dilindungi dengan JWT authentication.

---

## 💡 Manfaat untuk Anggota

### 1. Transparansi
- Anggota bisa melihat kondisi keuangan koperasi
- Meningkatkan kepercayaan anggota
- Mendorong partisipasi aktif

### 2. Edukasi
- Anggota memahami cara kerja koperasi
- Belajar tentang laporan keuangan
- Mengerti perhitungan laba/rugi

### 3. Monitoring
- Pantau perkembangan koperasi
- Lihat tren penjualan dan pengeluaran
- Evaluasi kinerja bulan berjalan

### 4. Motivasi
- Melihat kontribusi simpanan terhadap total
- Termotivasi untuk meningkatkan partisipasi
- Bangga dengan pertumbuhan koperasi

---

## 🎨 Design Features

### Color Coding
- **Hijau**: Positif (laba, pendapatan)
- **Merah**: Negatif (rugi, pengeluaran)
- **Teal**: Netral (informasi umum)
- **Purple**: Anggota

### Visual Hierarchy
1. Info banner (transparansi)
2. 4 Cards ringkasan
3. Highlight laba/rugi (paling menonjol)
4. Tabel detail
5. Catatan penting

### Responsive
- Grid layout untuk cards
- Tabel scrollable di mobile
- Font size adaptif

---

## 📱 Cara Menggunakan

### Akses Laporan
1. Login ke member portal
2. Klik menu "Laporan Keuangan"
3. Lihat data real-time

### Membaca Laporan

**Cek Kesehatan Koperasi:**
- Lihat card Laba/Rugi Bersih
- Hijau = Sehat, Merah = Perlu perhatian

**Analisis Simpanan:**
- Lihat tabel rincian simpanan
- Bandingkan persentase tiap jenis

**Monitor Bulanan:**
- Lihat laporan bulan berjalan
- Bandingkan penjualan vs pengeluaran

**Pahami Detail:**
- Baca tabel laba rugi
- Lihat breakdown pendapatan dan biaya

---

## 📈 Interpretasi Data

### Laba Bersih Positif (Hijau)
✅ Koperasi menghasilkan keuntungan
✅ Penjualan > Pengeluaran
✅ Potensi SHU lebih besar

**Artinya:**
- Koperasi sehat
- Manajemen efektif
- Anggota bisa optimis

### Rugi Bersih (Merah)
⚠️ Pengeluaran > Penjualan
⚠️ Perlu evaluasi

**Bukan berarti buruk jika:**
- Investasi awal (beli aset)
- Ekspansi usaha
- Musim sepi (normal)

**Yang perlu diperhatikan:**
- Tren jangka panjang
- Penjelasan dari pengurus
- Rencana perbaikan

### Total Simpanan Tinggi
✅ Modal koperasi kuat
✅ Kepercayaan anggota tinggi
✅ Likuiditas baik

### Penjualan Meningkat
✅ Unit usaha produktif
✅ Partisipasi anggota baik
✅ Potensi laba meningkat

---

## ⚠️ Catatan Penting

### Bukan Audit Resmi
- Ini laporan manajemen internal
- Untuk audit resmi, lihat laporan RAT
- Data bisa berubah sewaktu-waktu

### Simpanan ≠ Laba
- Simpanan adalah modal, bukan pendapatan
- Simpanan tidak masuk perhitungan laba/rugi
- Simpanan akan dikembalikan ke anggota

### Real-time = Sementara
- Data bisa berubah sampai tutup buku
- Angka final diumumkan di RAT
- Bisa ada penyesuaian akhir tahun

### Konteks Penting
- Lihat tren, bukan angka sesaat
- Bandingkan dengan periode sebelumnya
- Tanyakan ke pengurus jika ada yang tidak jelas

---

## 🔄 Update Data

### Kapan Data Diperbarui?
- **Real-time**: Setiap ada transaksi baru
- **Otomatis**: Tidak perlu refresh manual
- **Instant**: Langsung terlihat setelah input

### Cara Refresh Manual
1. Klik menu "Laporan Keuangan" lagi
2. Atau refresh browser (F5)
3. Data akan di-fetch ulang dari server

---

## 🎓 Edukasi Keuangan

### Istilah yang Perlu Dipahami

**HPP (Harga Pokok Penjualan)**
- Biaya untuk menghasilkan barang yang dijual
- Contoh: Harga beli barang dagangan

**Laba Kotor**
- Penjualan dikurangi HPP
- Keuntungan sebelum biaya operasional

**Laba Bersih**
- Laba kotor dikurangi semua biaya
- Keuntungan akhir (net profit)

**Biaya Operasional**
- Gaji, listrik, sewa, dll
- Biaya untuk menjalankan koperasi

---

## 📞 Pertanyaan?

Jika ada yang ingin ditanyakan tentang laporan:
1. Hubungi pengurus koperasi
2. Hadiri Rapat Anggota Tahunan (RAT)
3. Konsultasi dengan bendahara

---

## ✅ Checklist Penggunaan

- [ ] Akses menu Laporan Keuangan
- [ ] Lihat total anggota aktif
- [ ] Cek total simpanan koperasi
- [ ] Lihat laba/rugi bersih
- [ ] Pahami breakdown simpanan
- [ ] Baca laporan laba rugi
- [ ] Monitor laporan bulan ini
- [ ] Baca catatan penting
- [ ] Diskusikan dengan anggota lain (jika perlu)

---

## 🎯 Kesimpulan

Fitur Laporan Keuangan ini memberikan:
- ✅ Transparansi penuh
- ✅ Akses real-time
- ✅ Informasi komprehensif
- ✅ Edukasi keuangan
- ✅ Meningkatkan kepercayaan

**Transparansi adalah kunci kesuksesan koperasi!** 🚀

---

*Fitur ini menunjukkan komitmen koperasi terhadap transparansi dan akuntabilitas kepada seluruh anggota.*
