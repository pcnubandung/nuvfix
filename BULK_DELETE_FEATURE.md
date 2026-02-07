# 🗑️ Fitur Bulk Delete - Hapus Semua Data

## 🎯 **Fitur Baru**

Sistem sekarang memiliki fitur untuk **menghapus seluruh data** pada:

### **1. Manajemen Anggota**
- Hapus semua data anggota (kecuali yang terkait dengan akun admin)
- Button: "Hapus Semua Data" di halaman Data Anggota

### **2. Data Pengurus**
- Hapus semua data pengurus
- Button: "Hapus Semua Data" di halaman Data Pengurus

### **3. Transaksi Simpanan**
- Hapus semua Simpanan Pokok
- Hapus semua Simpanan Wajib
- Hapus semua Simpanan Khusus
- Hapus semua Simpanan Sukarela
- Button: "Hapus Semua Data" di halaman Transaksi Simpanan (dengan menu pilihan)

### **4. Partisipasi Anggota**
- Hapus semua data partisipasi anggota
- Button: "Hapus Semua Data" di halaman Partisipasi Anggota

### **5. Transaksi Keuangan**
- Hapus semua Transaksi Penjualan
- Hapus semua Pendapatan Lain
- Hapus semua Pengeluaran
- Button: "Hapus Semua Data" di masing-masing halaman transaksi

---

## ⚠️ **Peringatan Keamanan**

### **Double Confirmation**
Setiap bulk delete memerlukan **2 konfirmasi**:
1. **Konfirmasi Pertama**: Peringatan tentang tindakan yang akan dilakukan
2. **Konfirmasi Kedua**: Konfirmasi terakhir sebelum eksekusi

### **Tidak Dapat Dibatalkan**
- Data yang dihapus **TIDAK DAPAT DIKEMBALIKAN**
- Tidak ada fitur undo atau restore
- Pastikan backup data sebelum menggunakan fitur ini

### **Proteksi Admin**
- Anggota yang terkait dengan akun admin **TIDAK AKAN DIHAPUS**
- Ini mencegah kehilangan akses ke sistem

---

## 🔧 **Cara Menggunakan**

### **1. Hapus Semua Anggota**

**Langkah:**
```
1. Login sebagai admin
2. Buka menu "Manajemen Anggota" → "Data Anggota"
3. Klik button "Hapus Semua Data" (merah) di header
4. Baca peringatan dengan seksama
5. Klik OK untuk konfirmasi pertama
6. Klik OK lagi untuk konfirmasi kedua
7. Data akan terhapus dan halaman refresh otomatis
```

**Dialog Konfirmasi:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ PERINGATAN KERAS!                                    │
│                                                         │
│ Anda akan menghapus SEMUA DATA ANGGOTA!                │
│                                                         │
│ Tindakan ini akan:                                      │
│ • Menghapus semua anggota (kecuali yang terkait dengan  │
│   akun admin)                                           │
│ • TIDAK DAPAT DIBATALKAN                                │
│ • Data yang terhapus TIDAK DAPAT DIKEMBALIKAN           │
│                                                         │
│ Apakah Anda BENAR-BENAR yakin ingin melanjutkan?       │
│                                                         │
│                    [OK]    [Cancel]                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ⚠️ KONFIRMASI TERAKHIR!                                 │
│                                                         │
│ Ini adalah kesempatan terakhir untuk membatalkan.       │
│                                                         │
│ Klik OK untuk MENGHAPUS SEMUA DATA ANGGOTA              │
│ Klik Cancel untuk membatalkan                           │
│                                                         │
│                    [OK]    [Cancel]                     │
└─────────────────────────────────────────────────────────┘
```

**Hasil:**
```
┌─────────────────────────────────────────────────────────┐
│ ✅ Berhasil menghapus 150 anggota                       │
│                                                         │
│ 150 anggota berhasil dihapus.                           │
│                                                         │
│                         [OK]                            │
└─────────────────────────────────────────────────────────┘
```

---

### **2. Hapus Semua Data Pengurus**

**Langkah:**
```
1. Login sebagai admin
2. Buka menu "Manajemen Anggota" → "Data Pengurus"
3. Klik button "Hapus Semua Data" (merah) di header
4. Baca peringatan dengan seksama
5. Klik OK untuk konfirmasi pertama
6. Klik OK lagi untuk konfirmasi kedua
7. Data akan terhapus dan halaman refresh otomatis
```

**Dialog Konfirmasi:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ PERINGATAN KERAS!                                    │
│                                                         │
│ Anda akan menghapus SEMUA DATA PENGURUS!                │
│                                                         │
│ Tindakan ini akan:                                      │
│ • Menghapus semua data pengurus                         │
│ • TIDAK DAPAT DIBATALKAN                                │
│ • Data yang terhapus TIDAK DAPAT DIKEMBALIKAN           │
│                                                         │
│ Apakah Anda BENAR-BENAR yakin ingin melanjutkan?       │
│                                                         │
│                    [OK]    [Cancel]                     │
└─────────────────────────────────────────────────────────┘
```

**Hasil:**
```
┌─────────────────────────────────────────────────────────┐
│ ✅ Berhasil menghapus 10 data pengurus                  │
│                                                         │
│ 10 data pengurus berhasil dihapus.                      │
│                                                         │
│                         [OK]                            │
└─────────────────────────────────────────────────────────┘
```

---

### **3. Hapus Semua Simpanan**

**Langkah:**
```
1. Login sebagai admin
2. Buka menu "Transaksi Simpanan" → pilih jenis simpanan
3. Klik button "Hapus Semua Data" (merah) di header
4. Pilih jenis simpanan yang ingin dihapus dari menu
5. Baca peringatan dengan seksama
6. Klik OK untuk konfirmasi pertama
7. Klik OK lagi untuk konfirmasi kedua
8. Data akan terhapus dan halaman refresh otomatis
```

**Menu Pilihan:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ Hapus Semua Data Simpanan                            │
│                                                         │
│ PERINGATAN KERAS!                                       │
│ Tindakan ini akan menghapus SEMUA data simpanan yang    │
│ dipilih dan TIDAK DAPAT DIBATALKAN!                     │
│                                                         │
│ Pilih jenis simpanan yang ingin dihapus:                │
│                                                         │
│ [🗑️ Hapus Semua Simpanan Pokok]                        │
│                                                         │
│ [🗑️ Hapus Semua Simpanan Wajib]                        │
│                                                         │
│ [🗑️ Hapus Semua Simpanan Khusus]                       │
│                                                         │
│ [🗑️ Hapus Semua Simpanan Sukarela]                     │
│                                                         │
│                      [Batal]                            │
└─────────────────────────────────────────────────────────┘
```

**Dialog Konfirmasi (contoh Simpanan Pokok):**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ PERINGATAN KERAS!                                    │
│                                                         │
│ Anda akan menghapus SEMUA DATA SIMPANAN POKOK!          │
│                                                         │
│ Tindakan ini:                                           │
│ • Menghapus semua transaksi Simpanan Pokok              │
│ • TIDAK DAPAT DIBATALKAN                                │
│ • Data yang terhapus TIDAK DAPAT DIKEMBALIKAN           │
│                                                         │
│ Apakah Anda BENAR-BENAR yakin?                          │
│                                                         │
│                    [OK]    [Cancel]                     │
└─────────────────────────────────────────────────────────┘
```

---

### **3. Hapus Semua Partisipasi Anggota**

**Langkah:**
```
1. Login sebagai admin
2. Buka menu "Transaksi Simpanan" → "Partisipasi Anggota"
3. Klik button "Hapus Semua Data" (merah) di header
4. Baca peringatan dengan seksama
5. Klik OK untuk konfirmasi pertama
6. Klik OK lagi untuk konfirmasi kedua
7. Data akan terhapus dan halaman refresh otomatis
```

**Dialog Konfirmasi:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ PERINGATAN KERAS!                                    │
│                                                         │
│ Anda akan menghapus SEMUA DATA PARTISIPASI ANGGOTA!     │
│                                                         │
│ Tindakan ini akan:                                      │
│ • Menghapus semua transaksi partisipasi anggota         │
│ • TIDAK DAPAT DIBATALKAN                                │
│ • Data yang terhapus TIDAK DAPAT DIKEMBALIKAN           │
│                                                         │
│ Apakah Anda BENAR-BENAR yakin ingin melanjutkan?       │
│                                                         │
│                    [OK]    [Cancel]                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ⚠️ KONFIRMASI TERAKHIR!                                 │
│                                                         │
│ Ini adalah kesempatan terakhir untuk membatalkan.       │
│                                                         │
│ Klik OK untuk MENGHAPUS SEMUA DATA PARTISIPASI ANGGOTA  │
│ Klik Cancel untuk membatalkan                           │
│                                                         │
│                    [OK]    [Cancel]                     │
└─────────────────────────────────────────────────────────┘
```

**Hasil:**
```
┌─────────────────────────────────────────────────────────┐
│ ✅ Berhasil menghapus 250 transaksi partisipasi anggota │
│                                                         │
│ 250 transaksi partisipasi anggota berhasil dihapus.    │
│                                                         │
│                         [OK]                            │
└─────────────────────────────────────────────────────────┘
```

---

### **4. Hapus Semua Transaksi Keuangan**

**Langkah untuk Penjualan:**
```
1. Login sebagai admin
2. Buka menu "Transaksi Keuangan" → "Hasil Penjualan"
3. Klik button "Hapus Semua Data" (merah) di header
4. Baca peringatan dengan seksama
5. Klik OK untuk konfirmasi pertama
6. Klik OK lagi untuk konfirmasi kedua
7. Data akan terhapus dan halaman refresh otomatis
```

**Langkah untuk Pendapatan Lain:**
```
1. Login sebagai admin
2. Buka menu "Transaksi Keuangan" → "Pendapatan Lain"
3. Klik button "Hapus Semua Data" (merah) di header
4. Ikuti konfirmasi yang sama
```

**Langkah untuk Pengeluaran:**
```
1. Login sebagai admin
2. Buka menu "Transaksi Keuangan" → "Pengeluaran"
3. Klik button "Hapus Semua Data" (merah) di header
4. Ikuti konfirmasi yang sama
```

---

## 🔧 **Implementasi Teknis**

### **Backend (server.js)**

#### **Endpoint Bulk Delete Anggota:**
```javascript
DELETE /api/anggota/bulk/all

// Menghapus semua anggota kecuali yang terkait dengan admin
db.run('DELETE FROM anggota WHERE id NOT IN (SELECT anggota_id FROM users WHERE role = "Admin")')

Response:
{
  "message": "Berhasil menghapus 150 anggota",
  "deleted": 150
}
```

#### **Endpoint Bulk Delete Simpanan:**
```javascript
DELETE /api/simpanan/pokok/bulk/all
DELETE /api/simpanan/wajib/bulk/all
DELETE /api/simpanan/khusus/bulk/all
DELETE /api/simpanan/sukarela/bulk/all

// Menghapus semua data simpanan sesuai jenis
db.run('DELETE FROM simpanan_pokok')

Response:
{
  "message": "Berhasil menghapus 500 transaksi simpanan pokok",
  "deleted": 500
}
```

#### **Endpoint Bulk Delete Transaksi Keuangan:**
```javascript
DELETE /api/transaksi/penjualan/bulk/all
DELETE /api/transaksi/pendapatan-lain/bulk/all
DELETE /api/transaksi/pengeluaran/bulk/all

// Menghapus semua data transaksi sesuai jenis
db.run('DELETE FROM transaksi_penjualan')

Response:
{
  "message": "Berhasil menghapus 300 transaksi penjualan",
  "deleted": 300
}
```

#### **Endpoint Bulk Delete Partisipasi Anggota:**
```javascript
DELETE /api/partisipasi/bulk/all

// Menghapus semua data partisipasi anggota
db.run('DELETE FROM partisipasi_anggota')

Response:
{
  "message": "Berhasil menghapus 250 transaksi partisipasi anggota",
  "deleted": 250
}
```

#### **Endpoint Bulk Delete Pengurus:**
```javascript
DELETE /api/pengurus/bulk/all

// Menghapus semua data pengurus
db.run('DELETE FROM pengurus')

Response:
{
  "message": "Berhasil menghapus 10 data pengurus",
  "deleted": 10
}
```

### **Frontend**

#### **Button di Header (pages.js):**
```html
<button class="btn btn-danger" onclick="bulkDeleteAnggota()" title="Hapus semua data anggota">
  <i data-feather="trash-2"></i> Hapus Semua Data
</button>
```

#### **Function Bulk Delete Anggota (pages.js):**
```javascript
window.bulkDeleteAnggota = async function() {
  // First confirmation
  const confirmation = confirm('⚠️ PERINGATAN KERAS!...');
  if (!confirmation) return;
  
  // Double confirmation
  const doubleConfirm = confirm('⚠️ KONFIRMASI TERAKHIR!...');
  if (!doubleConfirm) return;
  
  try {
    const result = await API.delete('/api/anggota/bulk/all');
    alert(`✅ ${result.message}\n\n${result.deleted} anggota berhasil dihapus.`);
    window.renderDataAnggota();
  } catch (error) {
    alert(`❌ Gagal menghapus data: ${error.message}`);
  }
};
```

#### **Function Bulk Delete Simpanan (pages.js):**
```javascript
window.showBulkDeleteSimpananMenu = function() {
  // Show modal with options
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content">
      <h3>⚠️ Hapus Semua Data Simpanan</h3>
      <button onclick="bulkDeleteSimpanan('pokok')">Hapus Semua Simpanan Pokok</button>
      <button onclick="bulkDeleteSimpanan('wajib')">Hapus Semua Simpanan Wajib</button>
      <button onclick="bulkDeleteSimpanan('khusus')">Hapus Semua Simpanan Khusus</button>
      <button onclick="bulkDeleteSimpanan('sukarela')">Hapus Semua Simpanan Sukarela</button>
    </div>
  `;
  document.body.appendChild(modal);
};

window.bulkDeleteSimpanan = async function(jenis) {
  // Double confirmation
  const confirmation = confirm('⚠️ PERINGATAN KERAS!...');
  if (!confirmation) return;
  
  const doubleConfirm = confirm('⚠️ KONFIRMASI TERAKHIR!...');
  if (!doubleConfirm) return;
  
  try {
    const result = await API.delete(`/api/simpanan/${jenis}/bulk/all`);
    alert(`✅ ${result.message}`);
    document.querySelector('.modal')?.remove();
    renderSimpanan();
  } catch (error) {
    alert(`❌ Gagal menghapus data: ${error.message}`);
  }
};
```

#### **Function Bulk Delete Transaksi (pages-transaksi.js):**
```javascript
window.bulkDeletePenjualan = async function() {
  // Double confirmation
  const confirmation = confirm('⚠️ PERINGATAN KERAS!...');
  if (!confirmation) return;
  
  const doubleConfirm = confirm('⚠️ KONFIRMASI TERAKHIR!...');
  if (!doubleConfirm) return;
  
  try {
    const result = await API.delete('/api/transaksi/penjualan/bulk/all');
    alert(`✅ ${result.message}\n\n${result.deleted} transaksi penjualan berhasil dihapus.`);
    window.renderPenjualan();
  } catch (error) {
    alert(`❌ Gagal menghapus data: ${error.message}`);
  }
};

// Similar functions for bulkDeletePendapatanLain and bulkDeletePengeluaran
```

#### **Function Bulk Delete Partisipasi (pages.js):**
```javascript
window.bulkDeletePartisipasi = async function() {
  // Double confirmation
  const confirmation = confirm('⚠️ PERINGATAN KERAS!...');
  if (!confirmation) return;
  
  const doubleConfirm = confirm('⚠️ KONFIRMASI TERAKHIR!...');
  if (!doubleConfirm) return;
  
  try {
    const result = await API.delete('/api/partisipasi/bulk/all');
    alert(`✅ ${result.message}\n\n${result.deleted} transaksi partisipasi anggota berhasil dihapus.`);
    window.renderPartisipasiAnggota();
  } catch (error) {
    alert(`❌ Gagal menghapus data: ${error.message}`);
  }
};
```

#### **Function Bulk Delete Pengurus (pages.js):**
```javascript
window.bulkDeletePengurus = async function() {
  // Double confirmation
  const confirmation = confirm('⚠️ PERINGATAN KERAS!...');
  if (!confirmation) return;
  
  const doubleConfirm = confirm('⚠️ KONFIRMASI TERAKHIR!...');
  if (!doubleConfirm) return;
  
  try {
    const result = await API.delete('/api/pengurus/bulk/all');
    alert(`✅ ${result.message}\n\n${result.deleted} data pengurus berhasil dihapus.`);
    window.renderDataPengurus();
  } catch (error) {
    alert(`❌ Gagal menghapus data: ${error.message}`);
  }
};
```

---

## 🧪 **Testing**

### **Test 1: Bulk Delete Anggota**
```
1. Tambah beberapa anggota dummy
2. Klik "Hapus Semua Data" di Data Anggota
3. Konfirmasi 2x
4. Verifikasi semua anggota terhapus (kecuali admin)
5. Verifikasi admin masih bisa login
```

### **Test 2: Bulk Delete Simpanan**
```
1. Tambah beberapa transaksi simpanan pokok
2. Klik "Hapus Semua Data" di Transaksi Simpanan
3. Pilih "Hapus Semua Simpanan Pokok"
4. Konfirmasi 2x
5. Verifikasi semua simpanan pokok terhapus
6. Verifikasi simpanan lain (wajib, khusus, sukarela) masih ada
```

### **Test 3: Bulk Delete Penjualan**
```
1. Tambah beberapa transaksi penjualan
2. Klik "Hapus Semua Data" di Hasil Penjualan
3. Konfirmasi 2x
4. Verifikasi semua penjualan terhapus
5. Verifikasi pendapatan lain dan pengeluaran masih ada
```

### **Test 4: Bulk Delete Partisipasi**
```
1. Tambah beberapa transaksi partisipasi anggota
2. Klik "Hapus Semua Data" di Partisipasi Anggota
3. Konfirmasi 2x
4. Verifikasi semua partisipasi terhapus
5. Verifikasi data anggota masih ada
```

### **Test 5: Bulk Delete Pengurus**
```
1. Tambah beberapa data pengurus
2. Klik "Hapus Semua Data" di Data Pengurus
3. Konfirmasi 2x
4. Verifikasi semua pengurus terhapus
5. Verifikasi data anggota masih ada
```

### **Test 6: Cancel Confirmation**
```
1. Klik "Hapus Semua Data"
2. Klik "Cancel" di konfirmasi pertama
3. Verifikasi data tidak terhapus
4. Klik "Hapus Semua Data" lagi
5. Klik "OK" di konfirmasi pertama
6. Klik "Cancel" di konfirmasi kedua
7. Verifikasi data tidak terhapus
```

### **Test 5: Error Handling**
```
1. Matikan server
2. Klik "Hapus Semua Data"
3. Konfirmasi 2x
4. Verifikasi muncul error message
5. Verifikasi data tidak terhapus
```

---

## 💼 **Use Cases**

### **Use Case 1: Reset Data Testing**
```
Skenario: Developer ingin reset data testing

Langkah:
1. Hapus semua transaksi keuangan
2. Hapus semua transaksi simpanan
3. Hapus semua anggota
4. Mulai testing dengan data bersih
```

### **Use Case 2: Migrasi Data**
```
Skenario: Koperasi ingin migrasi ke sistem baru

Langkah:
1. Export semua data ke Excel
2. Hapus semua data lama
3. Import data baru dari sistem lain
4. Verifikasi data baru
```

### **Use Case 3: Cleanup Data Lama**
```
Skenario: Hapus data tahun lalu untuk mulai tahun baru

Langkah:
1. Export data tahun lalu untuk arsip
2. Hapus transaksi keuangan tahun lalu
3. Hapus transaksi simpanan tahun lalu
4. Mulai dengan data bersih tahun baru
```

---

## 🔒 **Security Considerations**

### **1. Authentication Required**
- Semua endpoint bulk delete memerlukan authentication
- Hanya admin yang bisa mengakses

### **2. Double Confirmation**
- Mencegah penghapusan tidak sengaja
- User harus konfirmasi 2x

### **3. Admin Protection**
- Anggota yang terkait dengan admin tidak akan terhapus
- Mencegah kehilangan akses sistem

### **4. Logging**
- Setiap bulk delete dicatat di console
- Format: `🗑️ Bulk delete all [jenis] requested`
- Format: `✅ Bulk deleted [count] [jenis]`

### **5. No Undo**
- Tidak ada fitur undo atau restore
- User harus sangat hati-hati
- Rekomendasi: Backup sebelum bulk delete

---

## 📋 **Summary**

### **Fitur yang Ditambahkan:**
✅ Bulk delete untuk Data Anggota
✅ Bulk delete untuk Data Pengurus
✅ Bulk delete untuk Simpanan (Pokok, Wajib, Khusus, Sukarela)
✅ Bulk delete untuk Partisipasi Anggota
✅ Bulk delete untuk Transaksi Penjualan
✅ Bulk delete untuk Pendapatan Lain
✅ Bulk delete untuk Pengeluaran
✅ Double confirmation untuk semua bulk delete
✅ Proteksi untuk admin users
✅ Error handling yang baik

### **Files Modified:**
✅ `server.js` - 10 bulk delete endpoints
✅ `public/js/pages.js` - Bulk delete anggota, pengurus, simpanan, dan partisipasi
✅ `public/js/pages-transaksi.js` - Bulk delete transaksi keuangan

### **Security Features:**
✅ Authentication required
✅ Double confirmation
✅ Admin protection
✅ Logging
✅ Error handling

---

## ⚠️ **Important Notes**

### **Backup Data**
Selalu backup data sebelum menggunakan bulk delete:
```bash
# Backup database
cp koperasi.db koperasi_backup_$(date +%Y%m%d).db

# Atau export ke Excel dari setiap halaman
```

### **Testing Environment**
Gunakan bulk delete di testing environment terlebih dahulu:
```
1. Test di development environment
2. Verifikasi semua berfungsi dengan baik
3. Baru gunakan di production dengan hati-hati
```

### **User Training**
Pastikan admin memahami:
- Bulk delete tidak dapat dibatalkan
- Data yang terhapus tidak dapat dikembalikan
- Pentingnya backup sebelum bulk delete
- Double confirmation harus dibaca dengan seksama

---

**Status:** ✅ COMPLETED
**Impact:** Manajemen Data Lebih Efisien
**Feature:** Bulk Delete untuk Anggota, Simpanan, dan Transaksi
**Security:** Double Confirmation + Admin Protection 🔒
