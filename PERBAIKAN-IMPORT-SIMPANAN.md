# Perbaikan Fitur Import Simpanan

## Masalah yang Ditemukan

Setelah analisis kesesuaian antara struktur tabel database dengan template import Excel, ditemukan masalah:

### ❌ Simpanan Sukarela - Kolom Jenis Tidak Ada

**Masalah:**
- Template import simpanan sukarela **tidak memiliki kolom "Jenis"**
- Semua transaksi yang diimport otomatis menjadi "Setoran"
- Tidak ada cara untuk import transaksi "Penarikan"
- Padahal tabel `simpanan_sukarela` memiliki kolom `jenis` (Setoran/Penarikan)

**Dampak:**
- User tidak bisa import data penarikan simpanan sukarela
- Harus input manual satu per satu untuk penarikan

## Perbaikan yang Dilakukan

### 1. ✅ Update Template Download

**File:** `public/js/import-excel-functions.js`

**Perubahan:**
```javascript
// SEBELUM: Template sama untuk semua jenis
const columns = ['Nomor Anggota', 'Jumlah', 'Tanggal', 'Metode Pembayaran', 'Keterangan'];

// SESUDAH: Template berbeda untuk simpanan sukarela
if (jenis === 'sukarela') {
  columns = ['Nomor Anggota', 'Jumlah', 'Jenis', 'Tanggal', 'Metode Pembayaran', 'Keterangan'];
  sampleData = [
    ['A001', '100000', 'Setoran', '2024-01-15', 'Transfer', 'Setoran awal'],
    ['A002', '50000', 'Penarikan', '2024-01-20', 'Tunai', 'Penarikan darurat']
  ];
}
```

### 2. ✅ Update Proses Import

**Perubahan:**
```javascript
// SEBELUM: Hardcode jenis = 'Setoran'
if (jenis === 'sukarela') {
  postData.jenis = 'Setoran';
}

// SESUDAH: Ambil dari Excel dengan validasi
if (jenis === 'sukarela') {
  postData.jenis = row['Jenis'] || 'Setoran';
  // Validasi jenis transaksi
  if (!['Setoran', 'Penarikan'].includes(postData.jenis)) {
    errorCount++;
    errors.push(`Baris ${i + 2}: Jenis harus 'Setoran' atau 'Penarikan'`);
    continue;
  }
}
```

### 3. ✅ Update Dokumentasi Modal

**Perubahan:**
- Modal import sekarang menampilkan dokumentasi yang berbeda untuk simpanan sukarela
- Menambahkan baris "Jenis: Setoran/Penarikan (wajib)" di tabel format

## Template Import Baru

### Simpanan Pokok/Wajib/Khusus (5 Kolom)
```
Nomor Anggota | Jumlah  | Tanggal    | Metode Pembayaran | Keterangan
A001          | 100000  | 2024-01-15 | Transfer          | Pembayaran bulan Januari
A002          | 100000  | 2024-01-15 | Tunai             |
```

### Simpanan Sukarela (6 Kolom) - BARU!
```
Nomor Anggota | Jumlah | Jenis     | Tanggal    | Metode Pembayaran | Keterangan
A001          | 100000 | Setoran   | 2024-01-15 | Transfer          | Setoran awal
A002          | 50000  | Penarikan | 2024-01-20 | Tunai             | Penarikan darurat
```

## Validasi yang Ditambahkan

1. ✅ **Validasi Jenis Transaksi**
   - Hanya menerima "Setoran" atau "Penarikan"
   - Jika kosong, default ke "Setoran"
   - Jika nilai lain, akan error dengan pesan jelas

2. ✅ **Error Reporting**
   - Error message mencantumkan nomor baris dan masalahnya
   - Contoh: "Baris 5: Jenis harus 'Setoran' atau 'Penarikan', bukan 'Ambil'"

## Hasil Setelah Perbaikan

| Fitur | Sebelum | Sesudah |
|-------|---------|---------|
| Template Simpanan Pokok/Wajib/Khusus | ✅ 5 kolom | ✅ 5 kolom (tidak berubah) |
| Template Simpanan Sukarela | ❌ 5 kolom (tanpa Jenis) | ✅ 6 kolom (dengan Jenis) |
| Import Setoran Sukarela | ✅ Bisa | ✅ Bisa |
| Import Penarikan Sukarela | ❌ Tidak bisa | ✅ Bisa |
| Validasi Jenis | ❌ Tidak ada | ✅ Ada |
| Error Message | ✅ Ada | ✅ Lebih detail |

## Testing

Untuk memastikan perbaikan berhasil:

1. **Download Template Simpanan Sukarela**
   - Klik "Import Excel" → Pilih "Simpanan Sukarela"
   - Klik "Download Template"
   - Verifikasi ada 6 kolom dengan kolom "Jenis"

2. **Import Data Setoran**
   - Isi Excel dengan Jenis = "Setoran"
   - Import dan verifikasi data masuk dengan benar

3. **Import Data Penarikan**
   - Isi Excel dengan Jenis = "Penarikan"
   - Import dan verifikasi data masuk dengan benar

4. **Test Validasi**
   - Isi Excel dengan Jenis = "Ambil" (salah)
   - Verifikasi muncul error message yang jelas

## Catatan Tambahan

- Template untuk Simpanan Pokok, Wajib, dan Khusus **tidak berubah** (tetap 5 kolom)
- Hanya template Simpanan Sukarela yang ditambah kolom "Jenis"
- Backward compatibility terjaga: jika kolom "Jenis" kosong, default ke "Setoran"
