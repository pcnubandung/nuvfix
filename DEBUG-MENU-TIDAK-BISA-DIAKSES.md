# 🔧 DEBUG: Menu Tidak Bisa Diakses

## ✅ PERBAIKAN TERBARU:

### 🔧 Yang Sudah Diperbaiki:

1. **Indentasi di `renderDataPengurus`** - Fixed
2. **Indentasi di `renderDataKaryawan`** - Fixed  
3. **Try-catch di `renderAsetInventaris`** - Added
4. **Urutan loading script** - Fixed

---

## 🧪 CARA TEST FUNGSI:

### 1. **Test Page (Otomatis)**

Buka halaman test untuk cek apakah semua fungsi terdefinisi:

```
http://localhost:3000/test-functions.html
```

Harus tampil:
- ✅ loadPage: DEFINED
- ✅ renderAsetInventaris: DEFINED
- ✅ renderDataPengurus: DEFINED
- ✅ renderDataKaryawan: DEFINED
- ✅ Semua fungsi lain: DEFINED

### 2. **Test Manual di Console Browser**

Buka aplikasi utama:
```
http://localhost:3000/index.html
```

Buka Console Browser (F12) dan ketik:

```javascript
// Test apakah fungsi terdefinisi
console.log('loadPage:', typeof window.loadPage);
console.log('renderAsetInventaris:', typeof window.renderAsetInventaris);
console.log('renderDataPengurus:', typeof window.renderDataPengurus);
console.log('renderDataKaryawan:', typeof window.renderDataKaryawan);
```

**Expected Output:**
```
loadPage: function
renderAsetInventaris: function
renderDataPengurus: function
renderDataKaryawan: function
```

### 3. **Test Panggil Fungsi Manual**

Di Console Browser, coba panggil fungsi secara manual:

```javascript
// Test loadPage
window.loadPage('aset-inventaris');
```

Lihat apakah halaman load atau ada error.

---

## 🔍 DEBUGGING STEP-BY-STEP:

### Step 1: Hard Refresh Browser

**PENTING:** Harus hard refresh untuk clear cache!

```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

### Step 2: Clear Browser Cache

**Chrome:**
1. Tekan `Ctrl + Shift + Delete`
2. Pilih "Cached images and files"
3. Time range: "All time"
4. Klik "Clear data"

**Firefox:**
1. Tekan `Ctrl + Shift + Delete`
2. Pilih "Cache"
3. Time range: "Everything"
4. Klik "Clear Now"

### Step 3: Restart Server

```bash
# Stop server (Ctrl+C di terminal)
npm start
```

### Step 4: Buka Console Browser (F12)

Lihat apakah ada error saat halaman load:
- ❌ Syntax error → Ada masalah di file JavaScript
- ❌ 404 Not Found → File tidak ditemukan
- ❌ Failed to load → Network error

### Step 5: Test Fungsi di Console

```javascript
// Cek apakah fungsi terdefinisi
typeof window.renderAsetInventaris
typeof window.renderDataPengurus
typeof window.renderDataKaryawan
```

Harus return: `"function"`

Jika return `"undefined"`:
- File belum dimuat
- Fungsi belum di-export
- Ada syntax error di file

### Step 6: Cek Network Tab

Di Console Browser, buka tab "Network":
1. Refresh halaman
2. Lihat apakah semua file JavaScript dimuat:
   - ✅ app.js - Status 200
   - ✅ utils.js - Status 200
   - ✅ pages-extended.js - Status 200
   - ✅ pages-management.js - Status 200
   - ✅ pages-transaksi.js - Status 200
   - ✅ pages.js - Status 200

Jika ada yang 404:
- File tidak ada di folder public/js/
- Path salah di index.html

### Step 7: Test Klik Menu

Klik menu yang bermasalah:
- Unit Usaha → Aset & Inventaris
- Manajemen Anggota → Data Pengurus
- Manajemen Anggota → Data Karyawan

Lihat Console Browser:
- Apakah ada error?
- Apakah ada request API?
- Apakah response API berhasil?

---

## 🐛 TROUBLESHOOTING:

### Problem: Fungsi masih undefined

**Solusi:**
1. Hard refresh (Ctrl + Shift + R)
2. Clear cache browser
3. Restart server
4. Cek urutan script di index.html
5. Cek syntax error di file JavaScript

### Problem: Error "Cannot read property 'map' of undefined"

**Penyebab:** API return null/undefined

**Solusi:**
1. Cek response API di tab Network
2. Cek apakah tabel database ada
3. Reset database:
   ```bash
   npm run reset-db
   ```

### Problem: Error "SQLITE_ERROR: no such table"

**Penyebab:** Tabel database belum dibuat

**Solusi:**
```bash
# Stop server (Ctrl+C)
npm run reset-db
npm start
```

### Problem: Halaman stuck "Memuat data..."

**Penyebab:** Request API tidak selesai atau error

**Solusi:**
1. Buka Console Browser (F12)
2. Lihat tab Console untuk error
3. Lihat tab Network untuk request yang gagal
4. Cek server console untuk error backend

### Problem: Halaman blank/kosong

**Penyebab:** JavaScript error atau fungsi tidak terdefinisi

**Solusi:**
1. Buka Console Browser (F12)
2. Lihat error yang muncul
3. Screenshot error
4. Hard refresh browser

---

## 📋 CHECKLIST DEBUGGING:

### File JavaScript:
- [ ] `public/js/app.js` - Dimuat dengan benar
- [ ] `public/js/utils.js` - Dimuat dengan benar
- [ ] `public/js/pages-extended.js` - Dimuat dengan benar
- [ ] `public/js/pages-management.js` - Dimuat dengan benar
- [ ] `public/js/pages-transaksi.js` - Dimuat dengan benar
- [ ] `public/js/pages.js` - Dimuat dengan benar

### Fungsi Window:
- [ ] `window.loadPage` - Terdefinisi
- [ ] `window.renderAsetInventaris` - Terdefinisi
- [ ] `window.renderDataPengurus` - Terdefinisi
- [ ] `window.renderDataKaryawan` - Terdefinisi

### Browser:
- [ ] Hard refresh dilakukan
- [ ] Cache cleared
- [ ] Console tidak ada error
- [ ] Network tab semua file status 200

### Server:
- [ ] Server running di port 3000
- [ ] Database terhubung
- [ ] Tidak ada error di console server

### Menu:
- [ ] Aset & Inventaris bisa diklik
- [ ] Data Pengurus bisa diklik
- [ ] Data Karyawan bisa diklik
- [ ] Data tampil dengan benar

---

## 💡 TIPS DEBUGGING:

### 1. Gunakan Test Page

Buka `http://localhost:3000/test-functions.html` untuk cek semua fungsi sekaligus.

### 2. Console.log di Fungsi

Tambahkan di awal fungsi yang bermasalah:

```javascript
window.renderAsetInventaris = async function() {
  console.log('renderAsetInventaris called');
  try {
    // ...
  }
}
```

### 3. Breakpoint di DevTools

1. Buka Console Browser (F12)
2. Tab "Sources"
3. Buka file `pages-management.js`
4. Klik nomor baris untuk set breakpoint
5. Klik menu yang bermasalah
6. Debugger akan pause di breakpoint

### 4. Test API Manual

Test API di browser atau Postman:

```
GET http://localhost:3000/api/aset
GET http://localhost:3000/api/pengurus
GET http://localhost:3000/api/karyawan
```

Harus return array (bisa kosong).

### 5. Cek Database

```bash
# Masuk ke SQLite
sqlite3 koperasi.db

# Cek tabel
.tables

# Cek data
SELECT * FROM aset_inventaris;
SELECT * FROM pengurus;
SELECT * FROM karyawan;

# Keluar
.quit
```

---

## 🎯 EXPECTED BEHAVIOR:

### Jika Berhasil:

✅ Test page tampil semua fungsi DEFINED
✅ Console tidak ada error
✅ Menu Aset & Inventaris tampil tabel
✅ Menu Data Pengurus tampil tabel
✅ Menu Data Karyawan tampil tabel
✅ Tombol "Tambah" berfungsi
✅ Form modal muncul

### Jika Masih Error:

❌ Test page tampil fungsi UNDEFINED
❌ Console ada error
❌ Menu tampil "Halaman tidak ditemukan"
❌ Menu stuck "Memuat data..."
❌ Halaman blank/kosong

---

## 📞 LANGKAH SELANJUTNYA:

1. **Hard Refresh Browser** (Ctrl + Shift + R)
2. **Buka Test Page** (http://localhost:3000/test-functions.html)
3. **Screenshot Hasil Test**
4. **Buka Console Browser** (F12)
5. **Test Fungsi Manual** (ketik di console)
6. **Screenshot Error** jika ada
7. **Share Screenshot** untuk debugging lebih lanjut

---

## 🔧 PERBAIKAN YANG SUDAH DILAKUKAN:

### File: `public/js/pages-management.js`

1. **renderDataPengurus:**
   - ✅ Fixed indentasi contentArea.innerHTML
   - ✅ Try-catch sudah ada

2. **renderDataKaryawan:**
   - ✅ Fixed indentasi contentArea.innerHTML
   - ✅ Try-catch sudah ada

3. **renderAsetInventaris:**
   - ✅ Added try-catch
   - ✅ Added error handling
   - ✅ Fixed indentasi

### File: `public/index.html`

- ✅ Urutan script sudah benar
- ✅ pages.js dimuat terakhir

---

**Silakan hard refresh browser dan test dengan test page!**

Jika masih bermasalah, buka test page dan screenshot hasilnya.

© 2024 Koperasi NU Vibes - Sistem Manajemen Koperasi Terpadu
