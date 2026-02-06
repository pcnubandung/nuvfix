# Update: Tahun Pembukuan dengan History

## 🎯 Problem yang Diperbaiki

Ketika tahun pembukuan baru dibuat, semua transaksi keuangan dimulai dari nol dan data tahun sebelumnya hilang. Ini tidak sesuai dengan praktik akuntansi yang benar.

## ✅ Solution

Implementasi sistem history tahun pembukuan yang menyimpan data setiap tahun secara permanen.

## 📊 Database Schema Baru

### Tabel: `tahun_pembukuan_history`

```sql
CREATE TABLE tahun_pembukuan_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tahun INTEGER NOT NULL,
  tanggal_mulai DATE NOT NULL,
  tanggal_akhir DATE NOT NULL,
  status TEXT DEFAULT 'tutup',
  total_simpanan_pokok REAL DEFAULT 0,
  total_simpanan_wajib REAL DEFAULT 0,
  total_simpanan_khusus REAL DEFAULT 0,
  total_simpanan_sukarela REAL DEFAULT 0,
  total_partisipasi REAL DEFAULT 0,
  total_shu REAL DEFAULT 0,
  catatan TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## 🔧 Fitur yang Ditambahkan

### 1. Migration Script

**File:** `create-tahun-pembukuan-history.js`

**Fungsi:**
- Create tabel `tahun_pembukuan_history`
- Migrate tahun aktif saat ini ke history
- Safe check untuk avoid duplicate

**Cara menjalankan:**
```bash
node create-tahun-pembukuan-history.js
```

### 2. API Endpoints

**GET `/api/tahun-pembukuan/history`**
- Get semua history tahun pembukuan
- Sorted by tahun DESC

**GET `/api/tahun-pembukuan/:tahun`**
- Get detail tahun pembukuan tertentu
- Return totals dan informasi lengkap

**POST `/api/tahun-pembukuan/close`**
- Save tahun pembukuan ke history saat tutup buku
- Calculate dan simpan totals
- Update atau insert jika sudah ada

### 3. Updated Functions

**`tutupBuku()`**
- Calculate totals dari semua transaksi
- Save ke history sebelum tutup
- Update status di koperasi_info

**`bukaTahunBaru()`**
- Buka tahun baru
- Tahun lama otomatis disimpan ke history
- Data tahun lama tetap tersimpan

### 4. UI Components

**Button "Lihat History Tahun Pembukuan"**
- Tampilkan tabel history semua tahun
- Show tahun, periode, status, totals
- Button detail untuk setiap tahun

**Modal History**
- Tabel dengan semua tahun pembukuan
- Filter dan sort
- Quick view totals

**Modal Detail Tahun**
- Informasi periode lengkap
- Ringkasan keuangan:
  - Simpanan Pokok
  - Simpanan Wajib
  - Simpanan Khusus
  - Simpanan Sukarela
  - Total Partisipasi
  - Total SHU
- Catatan tambahan

## 📱 User Flow

### Tutup Buku

```
1. User klik "Tutup Buku Tahun XXXX"
2. Sistem calculate totals:
   - Total simpanan pokok
   - Total simpanan wajib
   - Total simpanan khusus
   - Total simpanan sukarela
   - Total partisipasi
   - Total SHU
3. Save ke tahun_pembukuan_history
4. Update status = 'tutup' di koperasi_info
5. Konfirmasi berhasil
```

### Buka Tahun Baru

```
1. User klik "Buka Tahun Baru"
2. Modal dengan tahun+1 otomatis
3. User konfirmasi
4. Sistem:
   - Save tahun lama ke history (jika belum)
   - Update koperasi_info dengan tahun baru
   - Set status = 'aktif'
5. Tahun baru siap digunakan
```

### Lihat History

```
1. User klik "Lihat History Tahun Pembukuan"
2. Modal tampilkan tabel semua tahun
3. User klik "Detail" pada tahun tertentu
4. Modal detail tampilkan:
   - Periode
   - Ringkasan keuangan
   - Catatan
5. User bisa lihat data tahun lama kapan saja
```

## 🎨 UI Screenshots

### History Table

```
┌─────────────────────────────────────────────────────┐
│ History Tahun Pembukuan                         [×] │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Tahun │ Periode      │ Status │ Total    │ Aksi   │
│ 2024  │ 01/01-31/12  │ Tutup  │ 50.5M    │ Detail │
│ 2023  │ 01/01-31/12  │ Tutup  │ 45.2M    │ Detail │
│ 2022  │ 01/01-31/12  │ Tutup  │ 40.1M    │ Detail │
│                                                     │
│                                    [Tutup]          │
└─────────────────────────────────────────────────────┘
```

### Detail Modal

```
┌─────────────────────────────────────────────────────┐
│ Detail Tahun Pembukuan 2024                     [×] │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 📅 Informasi Periode                               │
│ Tanggal Mulai: 01 Januari 2024                    │
│ Tanggal Akhir: 31 Desember 2024                   │
│                                                     │
│ 💰 Ringkasan Keuangan                              │
│ ┌──────────────┐ ┌──────────────┐                 │
│ │ Simp. Pokok  │ │ Simp. Wajib  │                 │
│ │ Rp 10.000.000│ │ Rp 15.000.000│                 │
│ └──────────────┘ └──────────────┘                 │
│                                                     │
│ Total Partisipasi: Rp 25.500.000                  │
│ Total SHU: Rp 5.000.000                           │
│                                                     │
│                                    [Tutup]          │
└─────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Tutup Buku Flow

```
User Action
    ↓
Calculate Totals (Frontend)
    ↓
POST /api/tahun-pembukuan/close
    ↓
Save to tahun_pembukuan_history (Database)
    ↓
PUT /api/koperasi-info/1 (status='tutup')
    ↓
Refresh UI
```

### View History Flow

```
User Click "Lihat History"
    ↓
GET /api/tahun-pembukuan/history
    ↓
Display Table
    ↓
User Click "Detail"
    ↓
GET /api/tahun-pembukuan/:tahun
    ↓
Display Detail Modal
```

## 📊 Data Preservation

### What is Saved:

✅ **Tahun pembukuan**
✅ **Periode (tanggal mulai - akhir)**
✅ **Status (aktif/tutup)**
✅ **Total simpanan pokok**
✅ **Total simpanan wajib**
✅ **Total simpanan khusus**
✅ **Total simpanan sukarela**
✅ **Total partisipasi**
✅ **Total SHU**
✅ **Catatan**
✅ **Timestamp (created_at, updated_at)**

### What is NOT Deleted:

✅ **Transaksi detail** - Tetap di tabel masing-masing
✅ **Data anggota** - Tidak berubah
✅ **Simpanan individual** - Tetap tersimpan
✅ **Partisipasi detail** - Tetap ada
✅ **SHU per anggota** - Tetap tersimpan

## 🔍 Query Examples

### Get All History

```javascript
const history = await API.get('/api/tahun-pembukuan/history');
// Returns: Array of all years with totals
```

### Get Specific Year

```javascript
const detail = await API.get('/api/tahun-pembukuan/2024');
// Returns: Complete data for year 2024
```

### Close Year

```javascript
await API.post('/api/tahun-pembukuan/close', {
  tahun: 2024,
  tanggal_mulai: '2024-01-01',
  tanggal_akhir: '2024-12-31',
  totals: {
    simpanan_pokok: 10000000,
    simpanan_wajib: 15000000,
    // ... other totals
  },
  catatan: 'Tutup buku tahun 2024'
});
```

## 🧪 Testing

### Test Scenarios

1. **Create History Table**
   ```bash
   node create-tahun-pembukuan-history.js
   ```
   - [x] Table created
   - [x] Current year migrated
   - [x] No duplicates

2. **Tutup Buku**
   - [x] Calculate totals correctly
   - [x] Save to history
   - [x] Update status
   - [x] Data preserved

3. **Buka Tahun Baru**
   - [x] Old year saved to history
   - [x] New year created
   - [x] Status updated
   - [x] Old data accessible

4. **View History**
   - [x] List all years
   - [x] Show correct totals
   - [x] Detail modal works
   - [x] Data accurate

## 📝 Migration Steps

### For Existing Installation:

1. **Run Migration:**
   ```bash
   node create-tahun-pembukuan-history.js
   ```

2. **Verify Table:**
   ```bash
   sqlite3 koperasi.db "SELECT * FROM tahun_pembukuan_history;"
   ```

3. **Test Functions:**
   - Login as admin
   - Go to Pengaturan
   - Click "Lihat History Tahun Pembukuan"
   - Verify current year is there

4. **Test Tutup Buku:**
   - Click "Tutup Buku"
   - Verify data saved to history
   - Check totals are correct

5. **Test Buka Tahun Baru:**
   - Click "Buka Tahun Baru"
   - Verify old year in history
   - Verify new year active

## 🚀 Benefits

### For Koperasi:

✅ **Data Preservation** - Semua data tahun lama tersimpan
✅ **Audit Trail** - History lengkap untuk audit
✅ **Compliance** - Sesuai standar akuntansi
✅ **Reporting** - Bisa compare antar tahun
✅ **Transparency** - Data accessible kapan saja

### For Users:

✅ **Easy Access** - Lihat data tahun lalu dengan mudah
✅ **Clear UI** - Interface yang jelas dan informatif
✅ **Fast** - Query optimized untuk performance
✅ **Reliable** - Data tidak akan hilang

## 🔒 Data Integrity

### Safeguards:

1. **No Delete** - Data tidak pernah dihapus
2. **Immutable** - Tahun tutup tidak bisa diubah
3. **Backup** - History sebagai backup otomatis
4. **Validation** - Check before save
5. **Transaction** - Atomic operations

## 📞 Support

### Common Questions:

**Q: Apakah data tahun lama akan hilang?**
A: Tidak! Semua data disimpan ke history dan bisa diakses kapan saja.

**Q: Bagaimana cara melihat data tahun lalu?**
A: Klik "Lihat History Tahun Pembukuan" di halaman Pengaturan.

**Q: Apakah bisa edit data tahun yang sudah ditutup?**
A: Tidak, untuk menjaga integritas data. Tapi bisa dilihat kapan saja.

**Q: Berapa lama data disimpan?**
A: Permanent, tidak ada auto-delete.

## ✅ Checklist

- [x] Create tahun_pembukuan_history table
- [x] Migration script
- [x] API endpoints (GET history, GET detail, POST close)
- [x] Update tutupBuku() function
- [x] Update bukaTahunBaru() function
- [x] Add "Lihat History" button
- [x] Create history modal
- [x] Create detail modal
- [x] Calculate totals on close
- [x] Save to history
- [x] Documentation
- [ ] Run migration in production
- [ ] Test in production
- [ ] User training

---

**Last Updated**: 2025-01-24
**Version**: 2.0.0
**Status**: Ready to Deploy ✅
