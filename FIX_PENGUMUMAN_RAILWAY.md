# Fix Error Pengumuman di Railway

## 🐛 Problem

Error di Railway saat menambah pengumuman:
```
Error: SQLITE_ERROR: table pengumuman has no column named tampilkan_judul
```

Error ini terjadi karena database di Railway tidak memiliki kolom `tampilkan_judul` dan `tampilkan_konten` yang ada di localhost.

## ✅ Solution

### 1. Migration Script

File: `fix-pengumuman-table.js`

Script ini akan:
- Check apakah kolom `tampilkan_judul` ada
- Check apakah kolom `tampilkan_konten` ada
- Menambahkan kolom jika belum ada
- Update existing records dengan default value

**Cara menjalankan:**

```bash
# Di Railway atau localhost
node fix-pengumuman-table.js
```

### 2. Safe Query Implementation

File: `routes-pengumuman.js`

Perubahan yang dilakukan:
- **POST /api/pengumuman** - Check kolom sebelum insert
- **PUT /api/pengumuman/:id** - Check kolom sebelum update

#### Cara Kerja:

1. Query `PRAGMA table_info(pengumuman)` untuk cek struktur tabel
2. Jika kolom `tampilkan_judul` dan `tampilkan_konten` ada:
   - Gunakan query lengkap dengan semua kolom
3. Jika kolom tidak ada:
   - Gunakan query basic tanpa kolom tersebut

#### Contoh Code:

```javascript
// Check if columns exist
db.all('PRAGMA table_info(pengumuman)', (err, columns) => {
  const hasJudulColumn = columns.some(col => col.name === 'tampilkan_judul');
  const hasKontenColumn = columns.some(col => col.name === 'tampilkan_konten');
  
  if (hasJudulColumn && hasKontenColumn) {
    // Use full query
    sql = `INSERT INTO pengumuman (..., tampilkan_judul, tampilkan_konten) VALUES (...)`;
  } else {
    // Use basic query
    sql = `INSERT INTO pengumuman (...) VALUES (...)`;
  }
});
```

## 🚀 Deployment Steps

### Step 1: Run Migration di Railway

1. Upload `fix-pengumuman-table.js` ke Railway
2. Jalankan migration:
   ```bash
   node fix-pengumuman-table.js
   ```
3. Verify output:
   ```
   ✅ Column tampilkan_judul added successfully
   ✅ Column tampilkan_konten added successfully
   ✅ Updated tampilkan_judul for existing records
   ✅ Updated tampilkan_konten for existing records
   ```

### Step 2: Deploy Updated Code

1. Push perubahan `routes-pengumuman.js` ke repository
2. Railway akan auto-deploy
3. Test form tambah pengumuman

### Step 3: Verify

1. Buka halaman Publikasi di Railway
2. Klik "Tambah Pengumuman"
3. Upload gambar dan isi form
4. Klik "Simpan"
5. Seharusnya berhasil tanpa error

## 🔍 Verification

### Check Database Structure

```bash
node -e "
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./koperasi.db');
db.all('PRAGMA table_info(pengumuman)', (err, rows) => {
  console.log('Pengumuman table columns:');
  rows.forEach(row => console.log('  -', row.name, '(' + row.type + ')'));
  db.close();
});
"
```

Expected output:
```
Pengumuman table columns:
  - id (INTEGER)
  - judul (TEXT)
  - konten (TEXT)
  - gambar (TEXT)
  - status (TEXT)
  - tanggal_mulai (DATE)
  - tanggal_selesai (DATE)
  - urutan (INTEGER)
  - tampilkan_judul (INTEGER)
  - tampilkan_konten (INTEGER)
  - created_at (DATETIME)
  - updated_at (DATETIME)
```

## 📋 Checklist

- [x] Create migration script `fix-pengumuman-table.js`
- [x] Update POST endpoint dengan safe query
- [x] Update PUT endpoint dengan safe query
- [x] Add column existence check
- [x] Handle both scenarios (with/without columns)
- [x] Test di localhost
- [ ] Run migration di Railway
- [ ] Deploy to Railway
- [ ] Test di Railway

## 🔧 Troubleshooting

### Error: Column already exists

Jika muncul error "duplicate column name", itu normal. Script akan skip dan lanjut.

### Error: Cannot add column

Pastikan database tidak sedang digunakan oleh proses lain.

### Form masih error setelah migration

1. Restart server Railway
2. Clear browser cache
3. Check database structure dengan query di atas
4. Verify code sudah ter-deploy

## 📝 Notes

### Backward Compatibility

Code sekarang backward compatible:
- ✅ Bekerja di database dengan kolom `tampilkan_judul`
- ✅ Bekerja di database tanpa kolom `tampilkan_judul`
- ✅ Tidak akan error jika struktur berbeda

### Future Migrations

Untuk migration selanjutnya, gunakan pattern yang sama:
1. Check kolom existence dengan `PRAGMA table_info`
2. Conditional query berdasarkan struktur tabel
3. Provide default values untuk backward compatibility

## 🎯 Result

Setelah fix ini:
- ✅ Form tambah pengumuman bekerja di Railway
- ✅ Form edit pengumuman bekerja di Railway
- ✅ Tidak ada error SQLITE_ERROR
- ✅ Backward compatible dengan database lama
- ✅ Forward compatible dengan database baru

## 📞 Support

Jika masih ada error:
1. Check Railway logs: `railway logs`
2. Check database structure
3. Verify migration sudah dijalankan
4. Restart Railway service

---

**Last Updated**: 2025-01-24
**Status**: Ready to Deploy ✅
