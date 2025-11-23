# Fix Activity Log Time - Troubleshooting

## Masalah
Waktu di activity log tidak akurat atau menampilkan waktu yang salah.

## Penyebab Umum
1. **Timezone mismatch** - Database menyimpan dalam UTC tapi browser membaca sebagai local time
2. **Format datetime** - SQLite format berbeda dengan JavaScript Date
3. **Clock skew** - Waktu server dan client tidak sinkron

## Solusi yang Diterapkan

### 1. **Update formatTimeAgo Function** ✅
File: `public/js/pages.js`

**Perbaikan:**
- Handle berbagai format datetime (ISO dan SQLite format)
- Validasi date sebelum diproses
- Handle future dates (clock skew)
- Error handling yang lebih baik
- Debug logging untuk troubleshooting

**Fitur Baru:**
```javascript
// Treat SQLite format as local time
if (dateStr.includes('T')) {
  date = new Date(dateStr); // ISO format
} else {
  date = new Date(dateStr.replace(' ', 'T')); // SQLite format
}

// Handle future dates
if (diff < 0) {
  return 'Baru saja';
}
```

### 2. **Tambah Debug Logging** ✅
Console log untuk melihat:
- Sample activity data
- Format created_at dari database
- Parsed date
- Current time
- Time difference

### 3. **Tambah Tooltip** ✅
Hover pada waktu untuk melihat timestamp lengkap:
```html
<div class="activity-time" title="2024-11-22 10:30:45">
  5 menit yang lalu
</div>
```

## Cara Testing

### 1. **Restart Server**
```bash
# Stop server (Ctrl+C)
node server.js
```

### 2. **Clear Browser Cache**
```bash
# Hard refresh
Ctrl + F5
```

### 3. **Login & Check Console**
1. Login ke dashboard
2. Buka Developer Tools (F12)
3. Lihat tab Console
4. Harus ada log seperti ini:
```
Sample activity: {id: 1, username: "admin", action: "LOGIN", ...}
Created at: 2024-11-22 10:30:45
Parsed date: Fri Nov 22 2024 10:30:45 GMT+0700
Current time: Fri Nov 22 2024 10:35:20 GMT+0700
```

### 4. **Check Time Display**
1. Buka halaman Beranda
2. Scroll ke "Aktivitas Terkini"
3. Hover pada waktu untuk lihat tooltip
4. Verifikasi waktu sudah benar

### 5. **Test Time Ago**
Lakukan beberapa aktivitas dan cek:
- Login baru → "Baru saja"
- 5 menit lalu → "5 menit yang lalu"
- 2 jam lalu → "2 jam yang lalu"
- Kemarin → "1 hari yang lalu"

## Troubleshooting

### Waktu Masih Salah

#### 1. Cek Format Datetime di Database
```sql
-- Di SQLite
SELECT created_at, datetime('now', 'localtime') as now 
FROM activity_log 
ORDER BY created_at DESC 
LIMIT 1;
```

#### 2. Cek Timezone Server
```javascript
// Di Node.js console
console.log(new Date().toString());
console.log(new Date().toISOString());
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
```

#### 3. Cek Timezone Browser
```javascript
// Di browser console
console.log(new Date().toString());
console.log(new Date().toISOString());
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
```

### Waktu Selalu "Baru saja"

**Penyebab:** Date parsing gagal atau diff negatif

**Solusi:**
1. Cek console log untuk error
2. Cek format created_at dari API
3. Pastikan format datetime konsisten

### Waktu Terlalu Jauh (Misal: 7 jam lebih cepat/lambat)

**Penyebab:** Timezone offset

**Solusi:**
1. **Opsi 1:** Update SQLite untuk menyimpan dalam local time
   ```sql
   -- Gunakan datetime('now', 'localtime')
   INSERT INTO activity_log (..., created_at) 
   VALUES (..., datetime('now', 'localtime'))
   ```

2. **Opsi 2:** Adjust di JavaScript
   ```javascript
   // Tambah offset manual (contoh: +7 jam untuk WIB)
   const date = new Date(dateStr);
   date.setHours(date.getHours() + 7);
   ```

3. **Opsi 3:** Set timezone di server
   ```javascript
   // Di server.js
   process.env.TZ = 'Asia/Jakarta';
   ```

## Format Datetime yang Didukung

### SQLite Format
```
2024-11-22 10:30:45
2024-11-22 10:30:45.123
```

### ISO Format
```
2024-11-22T10:30:45Z
2024-11-22T10:30:45.123Z
2024-11-22T10:30:45+07:00
```

## Debug Commands

### Check Activity Log Data
```javascript
// Di browser console
fetch('/api/activity-log/recent?limit=1', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
.then(r => r.json())
.then(data => {
  console.log('Activity:', data[0]);
  console.log('Created at:', data[0].created_at);
  console.log('Type:', typeof data[0].created_at);
  console.log('Parsed:', new Date(data[0].created_at));
});
```

### Test formatTimeAgo
```javascript
// Di browser console
// Test dengan berbagai waktu
console.log(formatTimeAgo('2024-11-22 10:30:45')); // Sesuaikan dengan waktu sekarang
console.log(formatTimeAgo(new Date().toISOString()));
console.log(formatTimeAgo(new Date(Date.now() - 5*60*1000).toISOString())); // 5 menit lalu
```

## Rekomendasi

### Untuk Akurasi Terbaik:

1. **Gunakan UTC di database**
   ```sql
   created_at DATETIME DEFAULT (datetime('now'))
   ```

2. **Convert ke local time di frontend**
   ```javascript
   const date = new Date(dateStr + 'Z'); // Treat as UTC
   ```

3. **Atau gunakan library**
   ```javascript
   // Moment.js
   moment(dateStr).fromNow();
   
   // Day.js (lebih ringan)
   dayjs(dateStr).fromNow();
   ```

## File yang Diupdate
- ✅ `public/js/pages.js` - formatTimeAgo function
- ✅ `FIX_ACTIVITY_LOG_TIME.md` - Dokumentasi

## Testing Checklist

- [ ] Restart server
- [ ] Clear browser cache (Ctrl+F5)
- [ ] Login dan cek console log
- [ ] Verifikasi format datetime di console
- [ ] Cek tampilan "time ago" di UI
- [ ] Hover untuk lihat tooltip timestamp
- [ ] Test dengan berbagai waktu (baru, 5 menit, 1 jam, 1 hari)
- [ ] Verifikasi tidak ada error di console

## Status
✅ **Function sudah diperbaiki dengan:**
- Better date parsing
- Timezone handling
- Error handling
- Debug logging
- Tooltip untuk timestamp lengkap

**Next:** Restart server dan test!
