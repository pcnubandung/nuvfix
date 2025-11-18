# 📖 Panduan Cepat - Transaksi Simpanan Terpadu

## 🎯 Apa yang Berubah?

### Sebelumnya (4 Menu Terpisah)
```
📁 Transaksi Simpanan
  ├─ 📄 Simpanan Pokok
  ├─ 📄 Simpanan Wajib
  ├─ 📄 Simpanan Khusus
  ├─ 📄 Simpanan Sukarela
  └─ 📄 Partisipasi Anggota
```

### Sekarang (1 Menu Terpadu) ⭐
```
📁 Transaksi Simpanan
  ├─ 📄 Transaksi Simpanan (SEMUA JENIS)
  └─ 📄 Partisipasi Anggota
```

---

## 🚀 Cara Menggunakan

### 1️⃣ Membuka Halaman Transaksi Simpanan

1. Login ke dashboard
2. Klik menu **"Transaksi Simpanan"** di sidebar
3. Klik **"Transaksi Simpanan"**
4. Anda akan melihat SEMUA transaksi simpanan dalam 1 tabel

### 2️⃣ Menambah Transaksi Baru

**Langkah-langkah:**

1. Klik tombol **"+ Tambah Transaksi"**
2. **Pilih Jenis Simpanan** dari dropdown:
   - Simpanan Pokok
   - Simpanan Wajib
   - Simpanan Khusus
   - Simpanan Sukarela
3. **Pilih Anggota** dari dropdown
4. **Isi Jumlah** (dalam Rupiah)
5. **Pilih Tanggal Transaksi**
6. **Pilih Metode Pembayaran**:
   - Tunai
   - Transfer
   - E-Wallet
7. **[Khusus Simpanan Sukarela]** Pilih Jenis Transaksi:
   - Setoran (menambah saldo)
   - Penarikan (mengurangi saldo)
8. Isi **Keterangan** (opsional)
9. Klik **"Simpan"**

### 3️⃣ Melihat Daftar Transaksi

**Tabel menampilkan:**
- Nomor urut
- Tanggal transaksi
- **Jenis Simpanan** (dengan badge warna)
- Nomor anggota
- Nama anggota
- Jumlah (dalam Rupiah)
- Metode pembayaran
- Keterangan
- Tombol aksi (Edit, Hapus, Cetak)

**Badge Warna:**
- 🔵 Simpanan Pokok
- 🔵 Simpanan Wajib
- 🔵 Simpanan Khusus
- 🔵 Simpanan Sukarela

### 4️⃣ Mengedit Transaksi

1. Klik tombol **"Edit"** pada baris transaksi
2. Form akan muncul dengan data yang sudah terisi
3. Ubah data yang diperlukan
4. Klik **"Update"**

### 5️⃣ Menghapus Transaksi

1. Klik tombol **"Hapus"** pada baris transaksi
2. Konfirmasi penghapusan
3. Data akan dihapus dari sistem

### 6️⃣ Mencetak Struk

1. Klik tombol **"Cetak"** pada baris transaksi
2. Struk akan muncul di jendela baru
3. Gunakan Ctrl+P atau tombol print browser untuk mencetak

---

## 💡 Tips & Trik

### ✅ DO (Lakukan)
- Pilih jenis simpanan dengan benar sebelum input
- Pastikan anggota sudah terdaftar sebelum input transaksi
- Isi tanggal transaksi sesuai tanggal sebenarnya
- Gunakan metode pembayaran yang sesuai
- Isi keterangan untuk transaksi yang perlu penjelasan

### ❌ DON'T (Jangan)
- Jangan lupa pilih jenis simpanan
- Jangan input jumlah negatif
- Jangan hapus transaksi tanpa konfirmasi
- Jangan lupa cetak struk untuk arsip

---

## 🎨 Contoh Tampilan

### Form Input Transaksi
```
┌─────────────────────────────────────────────┐
│ Tambah Transaksi Simpanan                   │
├─────────────────────────────────────────────┤
│                                             │
│ Jenis Simpanan *                            │
│ ┌─────────────────────────────────────┐    │
│ │ Simpanan Pokok                    ▼ │    │
│ └─────────────────────────────────────┘    │
│                                             │
│ Anggota *                                   │
│ ┌─────────────────────────────────────┐    │
│ │ A001 - Ahmad Fauzi              ▼ │    │
│ └─────────────────────────────────────┘    │
│                                             │
│ Jumlah *          Tanggal Transaksi *       │
│ ┌──────────────┐  ┌──────────────────┐     │
│ │ 100000       │  │ 10/11/2024       │     │
│ └──────────────┘  └──────────────────┘     │
│                                             │
│ Metode Pembayaran                           │
│ ┌─────────────────────────────────────┐    │
│ │ Tunai                           ▼ │    │
│ └─────────────────────────────────────┘    │
│                                             │
│ Keterangan                                  │
│ ┌─────────────────────────────────────┐    │
│ │ Pembayaran simpanan pokok bulan Nov │    │
│ └─────────────────────────────────────┘    │
│                                             │
│  [Simpan]  [Batal]                          │
└─────────────────────────────────────────────┘
```

### Tabel Transaksi
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Transaksi Simpanan                              [+ Tambah Transaksi]         │
├────┬────────────┬──────────────────┬──────────┬────────────┬─────────┬──────┤
│ No │ Tanggal    │ Jenis Simpanan   │ Anggota  │ Jumlah     │ Metode  │ Aksi │
├────┼────────────┼──────────────────┼──────────┼────────────┼─────────┼──────┤
│ 1  │ 10/11/2024 │ [Simpanan Pokok] │ A001     │ Rp 100.000 │ Tunai   │ [⚙] │
│    │            │                  │ Ahmad F. │            │         │      │
├────┼────────────┼──────────────────┼──────────┼────────────┼─────────┼──────┤
│ 2  │ 09/11/2024 │ [Simpanan Wajib] │ A002     │ Rp 50.000  │Transfer │ [⚙] │
│    │            │                  │ Budi S.  │            │         │      │
├────┼────────────┼──────────────────┼──────────┼────────────┼─────────┼──────┤
│ 3  │ 08/11/2024 │ [Simpanan Khusus]│ A001     │ Rp 200.000 │E-Wallet │ [⚙] │
│    │            │                  │ Ahmad F. │            │         │      │
└────┴────────────┴──────────────────┴──────────┴────────────┴─────────┴──────┘
```

---

## ❓ FAQ (Pertanyaan Umum)

### Q: Apakah data transaksi lama masih ada?
**A:** Ya! Semua data transaksi lama tetap tersimpan dan akan muncul di tabel baru.

### Q: Bagaimana cara membedakan jenis simpanan?
**A:** Lihat kolom "Jenis Simpanan" yang menampilkan badge dengan label jenis.

### Q: Apakah bisa filter berdasarkan jenis simpanan?
**A:** Saat ini belum ada filter, tapi semua data ditampilkan dalam 1 tabel yang mudah dibaca.

### Q: Bagaimana dengan Partisipasi Anggota?
**A:** Partisipasi Anggota tetap terpisah karena memiliki struktur data yang berbeda.

### Q: Apakah cetak struk masih berfungsi?
**A:** Ya! Cetak struk tetap berfungsi untuk setiap transaksi.

### Q: Bagaimana cara input Simpanan Sukarela?
**A:** Pilih "Simpanan Sukarela" di dropdown, maka field "Jenis Transaksi" akan muncul otomatis.

---

## 🆘 Troubleshooting

### Masalah: Form tidak muncul saat klik "Tambah Transaksi"
**Solusi:** 
- Refresh halaman (F5)
- Clear cache browser
- Logout dan login kembali

### Masalah: Data tidak muncul di tabel
**Solusi:**
- Pastikan ada data transaksi di database
- Refresh halaman
- Check koneksi internet

### Masalah: Field "Jenis Transaksi" tidak muncul untuk Simpanan Sukarela
**Solusi:**
- Pastikan sudah memilih "Simpanan Sukarela" di dropdown
- Refresh halaman jika masih tidak muncul

---

## 📞 Bantuan

Jika mengalami masalah atau butuh bantuan:
1. Hubungi administrator sistem
2. Baca dokumentasi lengkap di `UPDATE-SIMPANAN-UNIFIED.md`
3. Check `CHANGELOG.md` untuk update terbaru

---

**Versi:** 2.1.0  
**Tanggal Update:** 10 November 2024  
**Status:** ✅ Aktif dan Siap Digunakan
