# Fitur Tahun Pembukuan Koperasi

## 📚 Overview

Fitur Tahun Pembukuan memungkinkan koperasi untuk mengelola periode akuntansi tahunan dengan proper. Fitur ini penting untuk:
- Mengelola periode pembukuan
- Tutup buku tahunan
- Perhitungan SHU per periode
- Filter laporan berdasarkan tahun
- Audit dan compliance

## ✅ Fitur yang Ditambahkan

### 1. Database Schema

**Kolom Baru di `koperasi_info`:**
```sql
- tahun_pembukuan_aktif INTEGER DEFAULT 2025
- tanggal_mulai_pembukuan DATE DEFAULT '2025-01-01'
- tanggal_akhir_pembukuan DATE DEFAULT '2025-12-31'
- status_pembukuan TEXT DEFAULT 'aktif'
```

### 2. Migration Script

**File:** `add-tahun-pembukuan.js`

Menambahkan kolom-kolom tahun pembukuan ke database dengan safe check.

**Cara menjalankan:**
```bash
node add-tahun-pembukuan.js
```

### 3. UI di Halaman Pengaturan

**Lokasi:** Menu Pengaturan → Section Tahun Pembukuan

**Tampilan:**
- Card informasi tahun pembukuan aktif
- Status pembukuan (Aktif/Tutup)
- Periode pembukuan (tanggal mulai - akhir)
- Button aksi: Edit, Tutup Buku, Buka Tahun Baru

### 4. Fungsi JavaScript

**File:** `public/js/pages.js`

**Fungsi yang ditambahkan:**
- `editTahunPembukuan()` - Edit tahun pembukuan
- `tutupBuku()` - Tutup buku tahun aktif
- `bukaTahunBaru()` - Buka tahun pembukuan baru

### 5. API Endpoint

**Endpoint:** `PUT /api/koperasi-info/:id`

**Support fields:**
- `tahun_pembukuan_aktif`
- `tanggal_mulai_pembukuan`
- `tanggal_akhir_pembukuan`
- `status_pembukuan`

## 🎯 Use Cases

### 1. Edit Tahun Pembukuan

**Kapan:** Saat perlu mengubah periode atau status pembukuan

**Langkah:**
1. Buka menu Pengaturan
2. Klik "Edit Tahun Pembukuan"
3. Ubah tahun, tanggal mulai/akhir, atau status
4. Klik "Simpan"

**Form Fields:**
- Tahun Pembukuan Aktif (number)
- Tanggal Mulai Pembukuan (date)
- Tanggal Akhir Pembukuan (date)
- Status Pembukuan (aktif/tutup)

### 2. Tutup Buku

**Kapan:** Akhir tahun setelah semua transaksi selesai

**Langkah:**
1. Buka menu Pengaturan
2. Klik "Tutup Buku Tahun [XXXX]"
3. Konfirmasi penutupan
4. Status berubah menjadi "Tutup"

**Efek:**
- Status pembukuan = "tutup"
- Transaksi tahun tersebut tidak dapat diubah
- Laporan final dapat digenerate

### 3. Buka Tahun Baru

**Kapan:** Awal tahun baru atau setelah tutup buku

**Langkah:**
1. Buka menu Pengaturan
2. Klik "Buka Tahun Baru"
3. Sistem otomatis set tahun baru (tahun sekarang + 1)
4. Atur tanggal mulai dan akhir
5. Konfirmasi pembukaan
6. Tahun lama otomatis ditutup

**Efek:**
- Tahun baru dibuka dengan status "aktif"
- Tahun lama ditutup otomatis
- Periode baru siap digunakan

## 📱 UI Components

### Dashboard Card

```
┌─────────────────────────────────────────┐
│  📅 Tahun Pembukuan                     │
├─────────────────────────────────────────┤
│                                         │
│  ℹ️ Informasi Tahun Pembukuan          │
│  Tahun pembukuan digunakan untuk...    │
│                                         │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐│
│  │ 📅 2025  │ │ ✅ Aktif │ │ 🕐 Per. ││
│  │ Tahun    │ │ Status   │ │ 01/01-  ││
│  │ Aktif    │ │          │ │ 31/12   ││
│  └──────────┘ └──────────┘ └─────────┘│
│                                         │
│  [Edit] [Tutup Buku] [Buka Tahun Baru] │
└─────────────────────────────────────────┘
```

### Modal Edit

```
┌─────────────────────────────────────┐
│ Edit Tahun Pembukuan                │
├─────────────────────────────────────┤
│                                     │
│ Tahun Pembukuan Aktif *             │
│ [2025                            ]  │
│                                     │
│ Tanggal Mulai *    Tanggal Akhir * │
│ [2025-01-01]       [2025-12-31]     │
│                                     │
│ Status Pembukuan *                  │
│ [Aktif ▼]                           │
│                                     │
│ ⚠️ Perhatian: Perubahan akan...    │
│                                     │
│ [Simpan] [Batal]                    │
└─────────────────────────────────────┘
```

## 🔧 Technical Details

### Database Migration

**Safe Migration:**
```javascript
// Check if column exists before adding
checkColumnExists('koperasi_info', 'tahun_pembukuan_aktif', (err, exists) => {
  if (!exists) {
    db.run(`ALTER TABLE koperasi_info ADD COLUMN tahun_pembukuan_aktif INTEGER DEFAULT 2025`);
  }
});
```

### API Update

**Dynamic Query Building:**
```javascript
let query = `UPDATE koperasi_info SET updated_at = CURRENT_TIMESTAMP`;
let params = [];

if (tahun_pembukuan_aktif !== undefined) {
  query += ', tahun_pembukuan_aktif = ?';
  params.push(tahun_pembukuan_aktif);
}
// ... other fields

query += ' WHERE id = ?';
params.push(id);
```

### Frontend State

**Get Current Year:**
```javascript
const koperasiInfo = await API.get('/api/koperasi-info');
const tahunPembukuan = koperasiInfo.tahun_pembukuan_aktif || new Date().getFullYear();
```

## 📊 Data Flow

### Edit Tahun Pembukuan

```
User Input → Form → API PUT /api/koperasi-info/1 → Database → Refresh UI
```

### Tutup Buku

```
User Click → Confirm → API PUT (status='tutup') → Database → Refresh UI
```

### Buka Tahun Baru

```
User Click → Modal → Set tahun+1 → Confirm → API PUT → Database → Refresh UI
```

## 🎨 Styling

### Status Badge Colors

```css
/* Aktif */
background: #4CAF50;
color: white;

/* Tutup */
background: #FF9800;
color: white;
```

### Info Box

```css
background: linear-gradient(135deg, #E8F5E9, #C8E6C9);
border-left: 4px solid #4CAF50;
```

### Warning Box

```css
background: #fff3cd;
border-left: 4px solid #ffc107;
color: #856404;
```

## 📋 Validation

### Form Validation

**Tahun Pembukuan:**
- Required
- Number
- Min: 2000
- Max: 2100

**Tanggal Mulai/Akhir:**
- Required
- Date format
- Tanggal akhir > Tanggal mulai

**Status:**
- Required
- Enum: 'aktif' | 'tutup'

### Business Logic

**Tutup Buku:**
- Hanya bisa tutup jika status = 'aktif'
- Konfirmasi required
- Irreversible action

**Buka Tahun Baru:**
- Tahun baru = tahun sekarang + 1
- Otomatis tutup tahun lama
- Set status = 'aktif'

## 🔄 Integration Points

### Laporan Keuangan

Filter berdasarkan tahun pembukuan:
```javascript
const tahunPembukuan = koperasiInfo.tahun_pembukuan_aktif;
const transaksi = await API.get(`/api/transaksi?tahun=${tahunPembukuan}`);
```

### Perhitungan SHU

Hitung SHU untuk tahun pembukuan aktif:
```javascript
const periode = {
  mulai: koperasiInfo.tanggal_mulai_pembukuan,
  akhir: koperasiInfo.tanggal_akhir_pembukuan
};
```

### Dashboard

Tampilkan informasi tahun aktif:
```javascript
<h3>Laporan Tahun {tahunPembukuan}</h3>
```

## 🧪 Testing

### Test Cases

1. **Add Columns**
   - [x] Run migration script
   - [x] Verify columns added
   - [x] Check default values

2. **Edit Tahun Pembukuan**
   - [x] Open modal
   - [x] Change values
   - [x] Submit form
   - [x] Verify update

3. **Tutup Buku**
   - [x] Click button
   - [x] Confirm dialog
   - [x] Status changed to 'tutup'
   - [x] Button disabled

4. **Buka Tahun Baru**
   - [x] Open modal
   - [x] Auto-fill tahun+1
   - [x] Submit
   - [x] Old year closed
   - [x] New year active

### Manual Testing

```bash
# 1. Run migration
node add-tahun-pembukuan.js

# 2. Start server
node server.js

# 3. Login as admin
# 4. Go to Pengaturan
# 5. Test all features
```

## 📝 Future Enhancements

### Phase 2 (Optional)

1. **History Tahun Pembukuan**
   - Tabel `tahun_pembukuan_history`
   - Track semua perubahan
   - Audit trail

2. **Multiple Periods**
   - Support periode selain tahunan
   - Quarterly, semester, dll

3. **Auto Close**
   - Scheduled job untuk tutup buku otomatis
   - Email notification

4. **Comparison**
   - Compare antar tahun
   - Growth analysis
   - Trend visualization

5. **Export**
   - Export data per tahun
   - Backup before close
   - Archive old years

## 🚀 Deployment

### Steps

1. **Run Migration:**
   ```bash
   node add-tahun-pembukuan.js
   ```

2. **Verify Database:**
   ```bash
   sqlite3 koperasi.db "PRAGMA table_info(koperasi_info);"
   ```

3. **Deploy Code:**
   - Push to repository
   - Railway auto-deploy

4. **Test:**
   - Login as admin
   - Go to Pengaturan
   - Test all features

### Rollback Plan

If issues occur:
```sql
-- Remove columns (if needed)
ALTER TABLE koperasi_info DROP COLUMN tahun_pembukuan_aktif;
ALTER TABLE koperasi_info DROP COLUMN tanggal_mulai_pembukuan;
ALTER TABLE koperasi_info DROP COLUMN tanggal_akhir_pembukuan;
ALTER TABLE koperasi_info DROP COLUMN status_pembukuan;
```

## 📞 Support

### Common Issues

**Q: Kolom tidak muncul setelah migration?**
A: Restart server dan clear cache browser

**Q: Error saat update tahun pembukuan?**
A: Check console log, verify API endpoint

**Q: Tahun tidak berubah di UI?**
A: Refresh halaman, check koperasi_info data

## ✅ Checklist

- [x] Database migration script
- [x] Add columns to koperasi_info
- [x] Update API endpoint
- [x] Add UI in Pengaturan page
- [x] Edit tahun pembukuan function
- [x] Tutup buku function
- [x] Buka tahun baru function
- [x] Form validation
- [x] Error handling
- [x] Documentation
- [ ] Run migration in production
- [ ] Test in production
- [ ] User training

---

**Last Updated**: 2025-01-24
**Version**: 1.0.0
**Status**: Ready to Deploy ✅
