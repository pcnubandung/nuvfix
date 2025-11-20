# Fix API Endpoint - /api/simpanan/all

## Masalah
Error: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

Ini terjadi karena endpoint `/api/simpanan/all` tidak ada di server, sehingga server mengembalikan halaman 404 HTML instead of JSON.

## Solusi
Menambahkan endpoint `/api/simpanan/all` di file `routes-simpanan.js`

## Perubahan yang Dilakukan

### File: `routes-simpanan.js`

Menambahkan endpoint baru di awal file:

```javascript
// Get All Simpanan (untuk Buku Kas)
router.get('/all', (req, res) => {
  // Get all simpanan from all tables
  const queries = [
    `SELECT id, anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, 'Pokok' as jenis_simpanan 
     FROM simpanan_pokok`,
    `SELECT id, anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, 'Wajib' as jenis_simpanan 
     FROM simpanan_wajib`,
    `SELECT id, anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, 'Khusus' as jenis_simpanan 
     FROM simpanan_khusus`,
    `SELECT id, anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, 'Sukarela' as jenis_simpanan 
     FROM simpanan_sukarela`
  ];
  
  const unionQuery = queries.join(' UNION ALL ');
  const finalQuery = `
    SELECT s.*, a.nama_lengkap, a.nomor_anggota 
    FROM (${unionQuery}) s
    JOIN anggota a ON s.anggota_id = a.id
    ORDER BY s.tanggal_transaksi DESC
  `;
  
  db.all(finalQuery, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
```

## Cara Endpoint Bekerja

1. **UNION ALL Query**: Menggabungkan data dari 4 tabel simpanan:
   - `simpanan_pokok`
   - `simpanan_wajib`
   - `simpanan_khusus`
   - `simpanan_sukarela`

2. **JOIN dengan Anggota**: Menambahkan informasi anggota (nama_lengkap, nomor_anggota)

3. **ORDER BY**: Mengurutkan berdasarkan tanggal_transaksi (terbaru dulu)

## Response Format

```json
[
  {
    "id": 1,
    "anggota_id": 1,
    "jumlah": 20000000,
    "tanggal_transaksi": "2025-10-15",
    "metode_pembayaran": "Transfer Bank",
    "keterangan": "Simpanan Pokok Awal",
    "jenis_simpanan": "Pokok",
    "nama_lengkap": "Ahmad Dahlan",
    "nomor_anggota": "NUV20250001"
  },
  ...
]
```

## Langkah Setelah Update

### 1. Restart Server
Server perlu di-restart agar endpoint baru ter-load:

**Windows (CMD):**
```cmd
# Stop server (Ctrl+C di terminal yang menjalankan server)
# Kemudian jalankan lagi:
node server.js
```

**Atau jika menggunakan nodemon:**
```cmd
# Nodemon akan auto-restart
# Jika tidak, restart manual dengan Ctrl+C lalu:
nodemon server.js
```

### 2. Test Endpoint
Buka browser dan test endpoint:
```
http://localhost:3000/api/simpanan/all
```

Atau gunakan curl:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/simpanan/all
```

### 3. Refresh Aplikasi
Setelah server restart:
1. Refresh halaman aplikasi (F5 atau Ctrl+F5)
2. Login kembali jika perlu
3. Buka menu "Laporan Keuangan"
4. Pilih "Buku Kas"
5. Klik "Tampilkan Laporan"

## Troubleshooting

### Error Masih Muncul
1. **Pastikan server sudah restart**
   - Cek terminal, harus ada log "Server running on port 3000"
   
2. **Clear browser cache**
   - Tekan Ctrl+Shift+Delete
   - Pilih "Cached images and files"
   - Clear data
   
3. **Hard refresh**
   - Tekan Ctrl+F5 untuk hard refresh
   
4. **Cek console browser**
   - Buka Developer Tools (F12)
   - Lihat tab Console untuk error
   - Lihat tab Network untuk melihat request/response

### Endpoint Tidak Ditemukan
Jika masih 404:
1. Cek file `routes-simpanan.js` sudah tersimpan
2. Cek file `server.js` ada baris:
   ```javascript
   app.use('/api/simpanan', authenticateToken, simpananRoutes);
   ```
3. Restart server dengan benar

### Database Error
Jika ada error database:
1. Pastikan tabel simpanan ada di database
2. Cek struktur tabel sesuai dengan query
3. Cek koneksi database

## Testing

### Test Manual di Browser Console
```javascript
// Test endpoint
fetch('/api/simpanan/all', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
.then(r => r.json())
.then(data => console.log('Simpanan All:', data))
.catch(err => console.error('Error:', err));
```

### Expected Result
Harus mengembalikan array of objects dengan data simpanan dari semua jenis.

## File yang Diupdate
- ✅ `routes-simpanan.js` - Menambahkan endpoint `/all`

## Status
✅ **Selesai** - Endpoint sudah ditambahkan, tinggal restart server
