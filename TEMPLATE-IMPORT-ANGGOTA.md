# Template Import Data Anggota

## ✅ Status: READY

### 🎯 Fitur Baru

**Download Template Excel/CSV** untuk import data anggota secara massal.

---

## 📋 Cara Menggunakan

### 1. Download Template

**Langkah:**
1. Login sebagai **Admin**
2. Buka menu **Data Anggota**
3. Klik tombol **Import Excel**
4. Klik tombol **Download Template**
5. File `template-import-anggota-YYYY-MM-DD.csv` akan terdownload

---

### 2. Isi Template

**Buka file dengan Excel/LibreOffice/Google Sheets:**

**Kolom yang tersedia:**
1. **Nomor Anggota** (wajib) - Contoh: NUV2025001
2. **Nama Lengkap** (wajib) - Contoh: Ahmad Fauzi
3. **NIK** (opsional) - Contoh: 3201012345678901
4. **Tempat Lahir** (opsional) - Contoh: Jakarta
5. **Tanggal Lahir** (opsional) - Format: YYYY-MM-DD (2025-01-15)
6. **Jenis Kelamin** (opsional) - Laki-laki atau Perempuan
7. **Alamat** (opsional) - Contoh: Jl. Merdeka No. 123
8. **Nomor Telepon** (opsional) - Contoh: 081234567890
9. **Email** (opsional) - Contoh: email@example.com
10. **Pekerjaan** (opsional) - Contoh: Wiraswasta
11. **Tanggal Bergabung** (opsional) - Format: YYYY-MM-DD
12. **Username** (opsional) - Untuk login member portal
13. **Password** (opsional) - Untuk login member portal

**Contoh Data:**
```csv
Nomor Anggota,Nama Lengkap,NIK,Tempat Lahir,Tanggal Lahir,Jenis Kelamin,Alamat,Nomor Telepon,Email,Pekerjaan,Tanggal Bergabung,Username,Password
NUV2025001,Ahmad Fauzi,3201012345678901,Jakarta,1990-01-15,Laki-laki,"Jl. Merdeka No. 123, Jakarta",081234567890,ahmad.fauzi@email.com,Wiraswasta,2025-01-01,ahmad.fauzi,password123
NUV2025002,Siti Nurhaliza,3201012345678902,Bandung,1992-05-20,Perempuan,"Jl. Sudirman No. 456, Bandung",081234567891,siti.nurhaliza@email.com,Pegawai Swasta,2025-01-01,siti.nurhaliza,password123
```

**Tips Pengisian:**
- ✅ Hapus baris contoh (baris 2-4) sebelum isi data asli
- ✅ Mulai isi data dari baris 2
- ✅ Jangan ubah header (baris 1)
- ✅ Gunakan format tanggal: YYYY-MM-DD
- ✅ Jenis Kelamin: "Laki-laki" atau "Perempuan" (persis seperti ini)
- ✅ Jika ada koma di alamat, gunakan tanda kutip: "Jl. Merdeka No. 1, Jakarta"
- ✅ Username dan Password opsional (bisa dikosongkan)

---

### 3. Upload File

**Langkah:**
1. Simpan file Excel/CSV yang sudah diisi
2. Kembali ke menu **Data Anggota**
3. Klik tombol **Import Excel**
4. Klik **Pilih File**
5. Pilih file yang sudah diisi
6. Klik **Import**
7. Tunggu proses selesai
8. Akan muncul notifikasi: "Import selesai! Berhasil: X, Gagal: Y"

---

## 📊 Format Template

### Header (Baris 1)
```
Nomor Anggota,Nama Lengkap,NIK,Tempat Lahir,Tanggal Lahir,Jenis Kelamin,Alamat,Nomor Telepon,Email,Pekerjaan,Tanggal Bergabung,Username,Password
```

### Data Contoh (Baris 2-4)
Template sudah berisi 3 baris contoh data yang bisa dijadikan referensi.

### Instruksi (Baris 6-11)
Template berisi instruksi penggunaan di bagian bawah (dimulai dengan #).

---

## ⚠️ Aturan Penting

### Field Wajib
- ✅ **Nomor Anggota** - Harus unik, tidak boleh duplikat
- ✅ **Nama Lengkap** - Tidak boleh kosong

### Field Opsional
- Semua field lain boleh dikosongkan
- Jika dikosongkan, akan diisi dengan nilai default atau NULL

### Format Tanggal
- **Format:** YYYY-MM-DD
- **Contoh Benar:** 2025-01-15, 1990-12-31
- **Contoh Salah:** 15/01/2025, 15-01-2025, 2025/01/15

### Jenis Kelamin
- **Pilihan:** "Laki-laki" atau "Perempuan"
- **Case sensitive:** Harus persis seperti di atas
- **Contoh Salah:** laki-laki, LAKI-LAKI, Pria, Wanita

### Username & Password
- **Opsional:** Boleh dikosongkan
- **Jika diisi:** Member bisa login ke member portal
- **Jika kosong:** Admin bisa set manual nanti
- **Password:** Akan di-hash otomatis saat import

---

## 🔍 Validasi

### Saat Import, Sistem Akan:

**1. Validasi Format**
- Cek jumlah kolom minimal 2 (Nomor Anggota + Nama)
- Skip baris kosong
- Skip baris komentar (dimulai dengan #)

**2. Validasi Data**
- Nomor Anggota tidak boleh duplikat
- Nama Lengkap tidak boleh kosong
- Format tanggal harus valid

**3. Error Handling**
- Jika ada error, baris tersebut di-skip
- Baris lain tetap diproses
- Laporan akhir: Berhasil X, Gagal Y

---

## 💡 Tips & Trik

### Untuk Import Banyak Data

**1. Persiapan Data:**
```
- Kumpulkan data anggota di Excel
- Pastikan format sesuai
- Cek duplikat nomor anggota
- Validasi format tanggal
```

**2. Test Import:**
```
- Import 5-10 data dulu (test)
- Cek hasilnya di Data Anggota
- Jika OK, import sisanya
```

**3. Backup:**
```
- Export data existing dulu
- Baru import data baru
- Jika ada masalah, bisa restore
```

### Untuk Data dengan Koma

**Jika alamat/keterangan ada koma, gunakan tanda kutip:**
```csv
"Jl. Merdeka No. 123, RT 01/02, Jakarta"
```

### Untuk Data dengan Enter/Newline

**Jika ada enter di alamat, gunakan tanda kutip:**
```csv
"Jl. Merdeka No. 123
RT 01/02
Jakarta Pusat"
```

---

## 🐛 Troubleshooting

### Import Gagal Semua

**Penyebab:**
- Format file salah
- Header tidak sesuai
- File corrupt

**Solusi:**
1. Download template baru
2. Copy-paste data ke template baru
3. Coba import lagi

---

### Beberapa Data Gagal

**Penyebab:**
- Nomor anggota duplikat
- Format tanggal salah
- Jenis kelamin salah

**Solusi:**
1. Cek data yang gagal
2. Perbaiki format
3. Import ulang data yang gagal

---

### Tanggal Tidak Sesuai

**Penyebab:**
- Format tanggal salah
- Excel auto-format tanggal

**Solusi:**
1. Set kolom tanggal sebagai "Text" di Excel
2. Ketik manual: 2025-01-15
3. Atau gunakan formula: =TEXT(A1,"YYYY-MM-DD")

---

### Username/Password Tidak Tersimpan

**Penyebab:**
- Kolom username/password kosong
- Atau tidak ada di template lama

**Solusi:**
1. Download template terbaru
2. Pastikan ada kolom username & password
3. Isi username & password
4. Import ulang

---

## 📝 Contoh Lengkap

### File CSV:
```csv
Nomor Anggota,Nama Lengkap,NIK,Tempat Lahir,Tanggal Lahir,Jenis Kelamin,Alamat,Nomor Telepon,Email,Pekerjaan,Tanggal Bergabung,Username,Password
NUV2025001,Ahmad Fauzi,3201012345678901,Jakarta,1990-01-15,Laki-laki,"Jl. Merdeka No. 123, Jakarta",081234567890,ahmad.fauzi@email.com,Wiraswasta,2025-01-01,ahmad.fauzi,password123
NUV2025002,Siti Nurhaliza,3201012345678902,Bandung,1992-05-20,Perempuan,"Jl. Sudirman No. 456, Bandung",081234567891,siti.nurhaliza@email.com,Pegawai Swasta,2025-01-01,siti.nurhaliza,password123
NUV2025003,Budi Santoso,3201012345678903,Surabaya,1988-12-10,Laki-laki,"Jl. Pahlawan No. 789, Surabaya",081234567892,budi.santoso@email.com,Guru,2025-01-01,budi.santoso,password123
```

### Hasil Import:
```
Import selesai!
Berhasil: 3
Gagal: 0
```

---

## 🎯 Best Practices

### Sebelum Import

**1. Validasi Data:**
- [ ] Cek nomor anggota unik
- [ ] Cek nama lengkap terisi
- [ ] Cek format tanggal (YYYY-MM-DD)
- [ ] Cek jenis kelamin (Laki-laki/Perempuan)
- [ ] Cek email valid (jika ada)

**2. Backup:**
- [ ] Export data existing
- [ ] Simpan backup di tempat aman

**3. Test:**
- [ ] Import 5-10 data dulu
- [ ] Verifikasi hasilnya
- [ ] Baru import semua

---

### Saat Import

**1. Monitor:**
- Lihat notifikasi berhasil/gagal
- Catat data yang gagal

**2. Verifikasi:**
- Cek data di tabel
- Pastikan semua data masuk
- Cek format tanggal/jenis kelamin

---

### Setelah Import

**1. Validasi:**
- [ ] Cek jumlah data sesuai
- [ ] Cek data lengkap
- [ ] Test login member (jika ada username/password)

**2. Cleanup:**
- [ ] Hapus file import (jika perlu)
- [ ] Update data yang salah
- [ ] Dokumentasi

---

## 📊 Statistik

### Kapasitas Import
- **Recommended:** 100-500 data per import
- **Maximum:** 1000 data per import
- **Jika lebih:** Split menjadi beberapa file

### Waktu Proses
- **100 data:** ~10-20 detik
- **500 data:** ~1-2 menit
- **1000 data:** ~3-5 menit

---

## 🔐 Keamanan

### Password
- Password akan di-hash dengan bcrypt
- Tidak disimpan plain text
- Aman dari pencurian data

### Data Pribadi
- NIK dan data sensitif di-encrypt
- Hanya admin yang bisa akses
- Backup terenkripsi

---

## 📞 Support

Jika mengalami masalah:
1. Cek dokumentasi ini
2. Download template terbaru
3. Hubungi admin IT
4. Email: admin@nuvibes.com

---

## 🎉 Kesimpulan

Fitur import data anggota memudahkan:
- ✅ Input data massal
- ✅ Migrasi dari sistem lama
- ✅ Update data bulk
- ✅ Hemat waktu

**Template sudah siap digunakan!**

Download template, isi data, dan upload untuk import data anggota secara massal! 🚀
