# Implementasi Filter Tahun Pembukuan

## 🎯 Konsep

Ketika tahun pembukuan baru dibuka, semua transaksi dimulai dari NOL. Data tahun lama tetap tersimpan tapi tidak ditampilkan.

## 📊 Cara Kerja

### 1. Setiap Transaksi Punya Tahun

Semua tabel transaksi ditambahkan kolom `tahun_pembukuan`:
- `simpanan` → tahun_pembukuan
- `transaksi_simpanan` → tahun_pembukuan
- `partisipasi` → tahun_pembukuan
- `shu` → tahun_pembukuan
- `pengeluaran` → tahun_pembukuan
- `pemasukan` → tahun_pembukuan

### 2. Filter Berdasarkan Tahun Aktif

**Backend (server.js):**
```javascript
// Get tahun aktif dari koperasi_info
const koperasiInfo = await getTahunAktif();
const tahunAktif = koperasiInfo.tahun_pembukuan_aktif;

// Filter query
db.all(`
  SELECT * FROM simpanan 
  WHERE tahun_pembukuan = ?
`, [tahunAktif], (err, rows) => {
  // Only returns current year data
});
```

**Frontend (pages.js):**
```javascript
// Get tahun aktif
const koperasiInfo = await API.get('/api/koperasi-info');
const tahunAktif = koperasiInfo.tahun_pembukuan_aktif;

// Display only current year
const simpanan = await API.get(`/api/simpanan?tahun=${tahunAktif}`);
```

### 3. Insert dengan Tahun Aktif

**Saat tambah transaksi baru:**
```javascript
// Get tahun aktif
const koperasiInfo = await getTahunAktif();
const tahunAktif = koperasiInfo.tahun_pembukuan_aktif;

// Insert with tahun
db.run(`
  INSERT INTO simpanan (anggota_id, jumlah, tahun_pembukuan, ...)
  VALUES (?, ?, ?, ...)
`, [anggotaId, jumlah, tahunAktif, ...]);
```

## 🔧 Implementation Steps

### Step 1: Add Column to Tables

```bash
node add-tahun-pembukuan-to-tables.js
```

This will:
- Add `tahun_pembukuan` column to all transaction tables
- Set default value = current year
- Update existing records with current year

### Step 2: Update Backend Queries

**Example for Simpanan:**

```javascript
// Before
app.get('/api/simpanan', (req, res) => {
  db.all('SELECT * FROM simpanan', [], (err, rows) => {
    res.json(rows);
  });
});

// After
app.get('/api/simpanan', async (req, res) => {
  // Get tahun aktif
  const koperasi = await new Promise((resolve, reject) => {
    db.get('SELECT tahun_pembukuan_aktif FROM koperasi_info WHERE id = 1', [], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
  
  const tahunAktif = koperasi?.tahun_pembukuan_aktif || new Date().getFullYear();
  
  // Filter by tahun
  db.all('SELECT * FROM simpanan WHERE tahun_pembukuan = ?', [tahunAktif], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
```

### Step 3: Update Insert Queries

**Example for Simpanan:**

```javascript
// Before
app.post('/api/simpanan', (req, res) => {
  const { anggota_id, jumlah } = req.body;
  db.run('INSERT INTO simpanan (anggota_id, jumlah) VALUES (?, ?)', 
    [anggota_id, jumlah], ...);
});

// After
app.post('/api/simpanan', async (req, res) => {
  const { anggota_id, jumlah } = req.body;
  
  // Get tahun aktif
  const koperasi = await new Promise((resolve, reject) => {
    db.get('SELECT tahun_pembukuan_aktif FROM koperasi_info WHERE id = 1', [], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
  
  const tahunAktif = koperasi?.tahun_pembukuan_aktif || new Date().getFullYear();
  
  db.run('INSERT INTO simpanan (anggota_id, jumlah, tahun_pembukuan) VALUES (?, ?, ?)', 
    [anggota_id, jumlah, tahunAktif], ...);
});
```

### Step 4: Update Frontend

**Dashboard:**
```javascript
// Get tahun aktif
const koperasiInfo = await API.get('/api/koperasi-info');
const tahunAktif = koperasiInfo.tahun_pembukuan_aktif;

// Display tahun aktif
<h2>Dashboard Tahun ${tahunAktif}</h2>

// All data automatically filtered by backend
```

## 📋 Tables to Update

### Backend Endpoints to Modify:

1. **Simpanan**
   - GET /api/simpanan → filter by tahun
   - POST /api/simpanan → add tahun
   - PUT /api/simpanan/:id → keep tahun

2. **Transaksi Simpanan**
   - GET /api/transaksi-simpanan → filter by tahun
   - POST /api/transaksi-simpanan → add tahun

3. **Partisipasi**
   - GET /api/partisipasi → filter by tahun
   - POST /api/partisipasi → add tahun

4. **SHU**
   - GET /api/shu → filter by tahun
   - POST /api/shu → add tahun

5. **Pengeluaran**
   - GET /api/pengeluaran → filter by tahun
   - POST /api/pengeluaran → add tahun

6. **Pemasukan**
   - GET /api/pemasukan → filter by tahun
   - POST /api/pemasukan → add tahun

## 🎨 User Experience

### Tahun Aktif: 2025

**Dashboard shows:**
- Simpanan tahun 2025: Rp 0 (fresh start)
- Transaksi tahun 2025: 0 records
- Partisipasi tahun 2025: Rp 0

### Switch to History: 2024

**Click "Lihat History 2024":**
- Simpanan tahun 2024: Rp 50.000.000
- Transaksi tahun 2024: 150 records
- Partisipasi tahun 2024: Rp 25.000.000

## 🔄 Workflow

### Buka Tahun Baru

```
1. User: Click "Buka Tahun Baru"
2. System: 
   - Save current year to history
   - Update tahun_pembukuan_aktif = 2026
   - Set status = 'aktif'
3. Result:
   - Dashboard shows 2026 data (empty/zero)
   - All queries filtered by tahun = 2026
   - New transactions use tahun = 2026
```

### Lihat Data Tahun Lama

```
1. User: Click "Lihat History"
2. User: Select tahun 2024
3. System:
   - Query with WHERE tahun_pembukuan = 2024
   - Show data tahun 2024
4. Result:
   - User can see old data
   - Cannot edit (read-only)
```

## 🚀 Quick Implementation

### For Immediate Fix:

Create a helper function in server.js:

```javascript
// Helper to get tahun aktif
async function getTahunAktif() {
  return new Promise((resolve, reject) => {
    db.get('SELECT tahun_pembukuan_aktif FROM koperasi_info WHERE id = 1', [], (err, row) => {
      if (err) reject(err);
      else resolve(row?.tahun_pembukuan_aktif || new Date().getFullYear());
    });
  });
}

// Use in endpoints
app.get('/api/simpanan', async (req, res) => {
  try {
    const tahunAktif = await getTahunAktif();
    db.all('SELECT * FROM simpanan WHERE tahun_pembukuan = ?', [tahunAktif], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## ⚠️ Important Notes

1. **Existing Data**: All existing data will be tagged with current year
2. **Migration**: Run migration script before deploying
3. **Backup**: Backup database before migration
4. **Testing**: Test thoroughly before production

## ✅ Benefits

- ✅ Clean separation per tahun
- ✅ Fresh start setiap tahun baru
- ✅ Data lama tetap tersimpan
- ✅ Easy to generate reports per tahun
- ✅ Audit trail lengkap

## 📞 Next Steps

1. Run migration: `node add-tahun-pembukuan-to-tables.js`
2. Update all GET endpoints with filter
3. Update all POST endpoints with tahun
4. Test with sample data
5. Deploy to production

---

**Status**: Implementation Guide
**Priority**: High
**Impact**: All transaction queries
