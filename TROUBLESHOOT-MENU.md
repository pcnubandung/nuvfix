# 🔧 TROUBLESHOOTING: Menu Tidak Bisa Dibuka

## ✅ PERBAIKAN SUDAH DILAKUKAN!

Saya sudah menambahkan export untuk semua fungsi render ke `window` object.

---

## 🔍 Cara Cek Error:

### 1. **Buka Console Browser (F12)**

**Windows/Linux:** Tekan `F12` atau `Ctrl + Shift + I`
**Mac:** Tekan `Cmd + Option + I`

### 2. **Lihat Tab Console**

Cari error merah yang muncul. Biasanya error seperti:
- ❌ `renderBeranda is not defined`
- ❌ `renderDataAnggota is not defined`
- ❌ `Cannot read property 'map' of undefined`

### 3. **Lihat Tab Network**

- Klik tab "Network"
- Refresh halaman (Ctrl + Shift + R)
- Klik menu yang bermasalah
- Lihat request API yang muncul
- Cek status code (harus 200 OK)
- Jika 500 atau 404, ada error di backend

---

## 🚀 Solusi yang Sudah Diterapkan:

### ✅ Export Fungsi Render

**File:** `public/js/pages.js`

Sudah ditambahkan di akhir file:
```javascript
// Export all render functions to window object
window.renderBeranda = renderBeranda;
window.renderInfoKoperasi = renderInfoKoperasi;
window.renderUnitUsaha = renderUnitUsaha;
window.renderDataAnggota = renderDataAnggota;
window.renderSimpanan = renderSimpanan;
window.renderPartisipasiAnggota = renderPartisipasiAnggota;
window.renderPenjualan = renderPenjualan;
window.renderPengeluaran = renderPengeluaran;
window.renderSHU = renderSHU;
window.renderLaporan = renderLaporan;
window.renderPengaturan = renderPengaturan;
```

### ✅ Error Handling Backend

**Files:**
- `routes-pengurus.js` - Error handling dengan try-catch
- `routes-karyawan.js` - Error handling dengan try-catch
- `routes-aset.js` - Error handling dengan try-catch

### ✅ Error Handling Frontend

**Files:**
- `public/js/pages-management.js` - Try-catch di semua fungsi render
- `public/js/pages-transaksi.js` - Export ke window object
- `public/js/pages-extended.js` - Export ke window object

---

## 🔄 Cara Test Setelah Perbaikan:

### 1. **Hard Refresh Browser**

```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

Ini akan clear cache dan reload semua file JavaScript.

### 2. **Clear Browser Cache**

**Chrome:**
1. Tekan `Ctrl + Shift + Delete`
2. Pilih "Cached images and files"
3. Klik "Clear data"

**Firefox:**
1. Tekan `Ctrl + Shift + Delete`
2. Pilih "Cache"
3. Klik "Clear Now"

### 3. **Restart Server**

```bash
# Stop server (Ctrl+C di terminal)
# Lalu jalankan lagi:
npm start
```

### 4. **Test Setiap Menu**

Coba klik menu satu per satu:
- [ ] Beranda
- [ ] Info Koperasi
- [ ] Unit Usaha → Data Usaha
- [ ] Unit Usaha → Aset & Inventaris
- [ ] Manajemen Anggota → Data Anggota
- [ ] Manajemen Anggota → Data Pengurus
- [ ] Manajemen Anggota → Data Karyawan
- [ ] Transaksi Simpanan → Simpanan Pokok
- [ ] Transaksi Simpanan → Simpanan Wajib
- [ ] Transaksi Simpanan → Simpanan Khusus
- [ ] Transaksi Simpanan → Simpanan Sukarela
- [ ] Transaksi Simpanan → Partisipasi Anggota
- [ ] Transaksi Keuangan → Penjualan
- [ ] Transaksi Keuangan → Pengeluaran
- [ ] Laporan Keuangan
- [ ] Sisa Hasil Usaha
- [ ] Pengaturan

---

## 🐛 Jika Masih Error:

### Error: "renderXXX is not defined"

**Penyebab:** Fungsi belum di-export ke window object

**Solusi:**
1. Buka Console Browser (F12)
2. Lihat nama fungsi yang error
3. Cari fungsi tersebut di file JavaScript
4. Tambahkan `window.namaFungsi = namaFungsi;` di akhir file

### Error: "Cannot read property 'map' of undefined"

**Penyebab:** API return undefined atau null

**Solusi:**
1. Cek tab Network di Console Browser
2. Lihat response dari API
3. Jika error 500, cek console server
4. Jika tabel tidak ada, reset database:
   ```bash
   npm run reset-db
   ```

### Error: "SQLITE_ERROR: no such table"

**Penyebab:** Tabel database belum dibuat

**Solusi:**
```bash
# Stop server (Ctrl+C)
npm run reset-db
npm start
```

### Error: "Authentication failed"

**Penyebab:** Token expired atau tidak valid

**Solusi:**
1. Logout dari aplikasi
2. Login kembali dengan username: admin, password: admin123

### Menu Stuck "Memuat data..."

**Penyebab:** Request API tidak selesai atau error

**Solusi:**
1. Buka Console Browser (F12)
2. Lihat tab Console untuk error
3. Lihat tab Network untuk request yang gagal
4. Hard refresh (Ctrl + Shift + R)
5. Restart server jika perlu

---

## 📋 Checklist Debugging:

### Browser Console (F12):
- [ ] Tidak ada error merah di tab Console
- [ ] Semua request API di tab Network status 200 OK
- [ ] Tidak ada warning kuning yang kritis

### Server Console:
- [ ] Server running di port 3000
- [ ] Tidak ada error saat request API
- [ ] Database terhubung dengan baik

### Aplikasi:
- [ ] Login berhasil
- [ ] Dashboard beranda tampil dengan statistik
- [ ] Semua menu bisa diklik dan load
- [ ] Tidak stuck di "Memuat data..."

---

## 💡 Tips Debugging:

### 1. **Gunakan Console.log**

Tambahkan di fungsi yang bermasalah:
```javascript
console.log('Data:', data);
console.log('Error:', error);
```

### 2. **Cek Response API**

Di tab Network, klik request API dan lihat:
- **Headers** - Status code dan headers
- **Preview** - Preview data response
- **Response** - Raw response data

### 3. **Test API Manual**

Gunakan browser atau Postman untuk test API:
```
GET http://localhost:3000/api/anggota
GET http://localhost:3000/api/pengurus
GET http://localhost:3000/api/karyawan
```

### 4. **Screenshot Error**

Jika masih bermasalah:
1. Screenshot Console Browser (F12)
2. Screenshot tab Network
3. Copy error message
4. Share untuk debugging lebih lanjut

---

## 🎯 Expected Behavior:

### Jika Berhasil:
✅ Semua menu bisa diklik
✅ Data load dengan cepat
✅ Tidak ada error di Console
✅ Tombol "Tambah" berfungsi
✅ Form modal muncul
✅ Data bisa disimpan

### Jika Masih Error:
❌ Menu stuck "Memuat data..."
❌ Error di Console Browser
❌ Request API gagal (status 500/404)
❌ Tombol tidak berfungsi

---

## 📞 Langkah Selanjutnya:

1. **Hard Refresh Browser** (Ctrl + Shift + R)
2. **Buka Console Browser** (F12)
3. **Test Setiap Menu**
4. **Screenshot Error** jika ada
5. **Share Error Message** untuk debugging

---

**Perbaikan sudah dilakukan! Silakan test aplikasi dengan hard refresh browser.** ✅

© 2024 Koperasi NU Vibes - Sistem Manajemen Koperasi Terpadu
