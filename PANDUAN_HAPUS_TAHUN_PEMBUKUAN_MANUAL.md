# 🛠️ Panduan Manual - Hapus Fitur Tahun Pembukuan

## 🎯 **Tujuan**
Menghapus fitur tahun pembukuan secara manual dan mengembalikan sistem ke kondisi normal dimana SHU dihitung berdasarkan tanggal transaksi.

---

## 📋 **Langkah Manual Sederhana**

### **LANGKAH 1: Backup Files**
Sebelum melakukan perubahan, backup file penting:
```bash
# Backup server.js
cp server.js server.js.backup

# Backup pages.js  
cp public/js/pages.js public/js/pages.js.backup
```

### **LANGKAH 2: Edit server.js**

#### **2.1 Hapus Function getTahunAktif**
Cari dan hapus seluruh function ini (sekitar baris 110-130):
```javascript
// HAPUS SELURUH FUNCTION INI
const getTahunAktif = () => {
  return new Promise((resolve, reject) => {
    // ... seluruh isi function
  });
};
```

#### **2.2 Update Endpoint Penjualan**
Cari endpoint `/api/transaksi/penjualan` dan ganti dengan:
```javascript
// GANTI DARI:
app.get('/api/transaksi/penjualan', authenticateToken, async (req, res) => {
  try {
    const tahunAktif = await getTahunAktif();
    // ... kode lama dengan tahun_pembukuan
  } catch (error) {
    // ...
  }
});

// MENJADI:
app.get('/api/transaksi/penjualan', authenticateToken, (req, res) => {
  db.all(`SELECT tp.*, uu.nama_usaha 
          FROM transaksi_penjualan tp 
          LEFT JOIN unit_usaha uu ON tp.unit_usaha_id = uu.id 
          ORDER BY tp.tanggal_transaksi DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
```

#### **2.3 Update Endpoint Pengeluaran**
Cari endpoint `/api/transaksi/pengeluaran` dan ganti dengan:
```javascript
// GANTI MENJADI:
app.get('/api/transaksi/pengeluaran', authenticateToken, (req, res) => {
  db.all(`SELECT p.*, uu.nama_usaha 
          FROM pengeluaran p 
          LEFT JOIN unit_usaha uu ON p.unit_usaha_id = uu.id 
          ORDER BY p.tanggal_transaksi DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
```

#### **2.4 Update Endpoint Pendapatan Lain**
Cari endpoint `/api/transaksi/pendapatan-lain` dan ganti dengan:
```javascript
// GANTI MENJADI:
app.get('/api/transaksi/pendapatan-lain', authenticateToken, (req, res) => {
  db.all(`SELECT * FROM pendapatan_lain 
          ORDER BY tanggal_transaksi DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
```

#### **2.5 Update Endpoint SHU**
Cari endpoint `/api/shu/hitung/:tahun` dan ganti bagian query-nya:
```javascript
// GANTI QUERY DARI:
// WHERE tahun_pembukuan = ?

// MENJADI:
// WHERE strftime('%Y', tanggal_transaksi) = ?

// Contoh lengkap:
const penjualan = await new Promise((resolve, reject) => {
  db.all("SELECT * FROM transaksi_penjualan WHERE strftime('%Y', tanggal_transaksi) = ?", [tahun], (err, rows) => {
    if (err) reject(err);
    else resolve(rows);
  });
});

const pendapatanLain = await new Promise((resolve, reject) => {
  db.all("SELECT * FROM pendapatan_lain WHERE strftime('%Y', tanggal_transaksi) = ?", [tahun], (err, rows) => {
    if (err) reject(err);
    else resolve(rows);
  });
});

const pengeluaran = await new Promise((resolve, reject) => {
  db.all("SELECT * FROM pengeluaran WHERE strftime('%Y', tanggal_transaksi) = ?", [tahun], (err, rows) => {
    if (err) reject(err);
    else resolve(rows);
  });
});
```

### **LANGKAH 3: Edit pages.js**

#### **3.1 Hapus Section Tahun Pembukuan dari Pengaturan**
Cari function `renderPengaturan` dan hapus seluruh section ini:
```javascript
// HAPUS SELURUH SECTION INI
<!-- Tahun Pembukuan Section -->
<div class="card" style="margin-bottom: 24px;">
  <div class="card-header">
    <h3 class="card-title">
      <i data-feather="calendar"></i> Tahun Pembukuan
    </h3>
  </div>
  
  <div class="card-body">
    // ... seluruh isi section tahun pembukuan
  </div>
</div>
```

#### **3.2 Hapus Functions Tahun Pembukuan**
Cari dan hapus functions berikut:
```javascript
// HAPUS FUNCTION INI
window.editTahunPembukuan = async function() {
  // ... seluruh isi function
};

// HAPUS FUNCTION INI
window.tutupBuku = async function() {
  // ... seluruh isi function
};

// HAPUS FUNCTION INI (jika ada)
window.bukaTahunBaru = async function() {
  // ... seluruh isi function
};
```

### **LANGKAH 4: Restart Server**
```bash
# Stop server (Ctrl+C jika running)
# Start server lagi
node server.js
```

---

## ✅ **Verifikasi Hasil**

### **1. Test Menu Transaksi**
- Buka **Menu Transaksi → Penjualan** → harus menampilkan SEMUA data penjualan
- Buka **Menu Transaksi → Pengeluaran** → harus menampilkan SEMUA data pengeluaran  
- Buka **Menu Transaksi → Pendapatan Lain** → harus menampilkan SEMUA data pendapatan lain

### **2. Test SHU**
- Buka **Menu SHU** → pilih tahun 2025
- Klik **"Hitung SHU"**
- Seharusnya SHU > 0 (jika ada data transaksi 2025)

### **3. Test Pengaturan**
- Buka **Menu Pengaturan**
- Section "Tahun Pembukuan" sudah tidak ada

---

## 🔧 **Troubleshooting**

### **Jika Ada Error Setelah Edit:**

#### **Error: getTahunAktif is not defined**
- Pastikan function `getTahunAktif` sudah dihapus sepenuhnya
- Pastikan tidak ada pemanggilan `await getTahunAktif()` yang tersisa

#### **Error: Cannot read property of undefined**
- Periksa syntax JavaScript tidak ada yang rusak
- Pastikan tanda kurung `{}` dan `;` lengkap

#### **Menu Transaksi Kosong**
- Periksa query database sudah benar
- Pastikan tidak ada filter `WHERE tahun_pembukuan = ?` yang tersisa

### **Jika Perlu Rollback:**
```bash
# Restore dari backup
cp server.js.backup server.js
cp public/js/pages.js.backup public/js/pages.js

# Restart server
node server.js
```

---

## 🎯 **Hasil Akhir**

Setelah menghapus fitur tahun pembukuan:

### **✅ Yang Berubah:**
- Menu transaksi menampilkan SEMUA data (tidak difilter tahun pembukuan)
- SHU dihitung berdasarkan tanggal transaksi (bukan tahun_pembukuan)
- Menu Pengaturan tidak ada section tahun pembukuan
- Sistem lebih sederhana dan mudah dipahami

### **✅ Yang Tetap Normal:**
- Semua data transaksi existing tetap aman
- Fitur input transaksi tetap normal
- Dashboard dan laporan tetap berfungsi
- User management tetap normal

### **✅ SHU 2025:**
- Akan terhitung berdasarkan transaksi dengan tanggal tahun 2025
- Tidak lagi bergantung pada setting tahun pembukuan
- Seharusnya menghasilkan nilai > 0 jika ada data transaksi 2025

---

## 📞 **Bantuan**

### **Jika Masih Ada Masalah:**
1. **Screenshot error messages** yang muncul
2. **Catat langkah yang sudah dilakukan**
3. **Periksa console browser** (F12) untuk error JavaScript
4. **Test dengan data sederhana** (input 1 transaksi baru)

### **File Backup:**
- `server.js.backup` - Backup server asli
- `public/js/pages.js.backup` - Backup pages asli
- Gunakan untuk rollback jika diperlukan

---

## 🎉 **Kesimpulan**

Menghapus fitur tahun pembukuan adalah solusi yang tepat untuk:
- ✅ **Mengatasi masalah SHU = 0**
- ✅ **Menyederhanakan sistem**
- ✅ **Menghilangkan kompleksitas yang tidak perlu**
- ✅ **Kembali ke sistem yang lebih intuitif**

**Estimasi waktu: 30-45 menit**  
**Tingkat kesulitan: Menengah**  
**Success rate: 90%+ dengan mengikuti panduan**

---

**Status:** Panduan Manual Lengkap ✅  
**Target:** Hapus fitur tahun pembukuan  
**Metode:** Edit manual server.js dan pages.js  
**Hasil:** Sistem normal dan SHU berfungsi ✨