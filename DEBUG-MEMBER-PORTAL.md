# Debug Member Portal - Loading Issue

## Masalah
Portal member stuck di "Loading..." dan menu tidak bisa diklik.

## Langkah Debugging

### 1. Restart Server (WAJIB!)
```bash
# Stop server yang sedang berjalan (Ctrl+C)
node server.js
```

### 2. Clear Browser Cache & Storage
Buka browser console (F12) dan jalankan:
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### 3. Test API Endpoints
Buka: `http://localhost:3000/test-member-api.html`

Klik tombol test secara berurutan:
1. **Test Login** - Harus berhasil dan dapat token
2. **Test Get Profile** - Harus dapat data member
3. **Test Get Simpanan** - Harus dapat data simpanan
4. **Test Get Partisipasi** - Harus dapat data partisipasi

Jika ada yang gagal, catat error messagenya.

### 4. Check Browser Console
Buka member portal: `http://localhost:3000/member-login.html`

Login dengan:
- Username: `memberNUV2025003`
- Password: `member123`

Setelah login, buka Console (F12) dan lihat:
- Apakah ada error merah?
- Apakah ada log "Loading dashboard for member: X"?
- Apakah ada log "Dashboard rendered successfully"?

### 5. Check Network Tab
Di browser DevTools, buka tab Network:
- Refresh halaman member portal
- Lihat request ke `/api/member/profile` - Status harus 200
- Lihat request ke `/api/simpanan/*` - Status harus 200
- Lihat request ke `/api/partisipasi` - Status harus 200

Jika ada yang 401/403:
- Token tidak valid
- Server belum direstart
- JWT secret masih berbeda

### 6. Manual Test di Console
Buka Console di member portal dan jalankan:

```javascript
// Test 1: Check token
console.log('Token:', localStorage.getItem('token'));

// Test 2: Check user
console.log('User:', JSON.parse(localStorage.getItem('user')));

// Test 3: Check memberData
console.log('Member Data:', memberData);

// Test 4: Manual API call
fetch('/api/member/profile', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
.then(r => r.json())
.then(d => console.log('Profile:', d))
.catch(e => console.error('Error:', e));

// Test 5: Manual simpanan call
fetch('/api/simpanan/pokok', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
.then(r => r.json())
.then(d => console.log('Simpanan Pokok:', d))
.catch(e => console.error('Error:', e));
```

## Common Issues & Solutions

### Issue 1: "Invalid token" atau 403 Forbidden
**Penyebab:** JWT secret berbeda atau server belum direstart
**Solusi:**
1. Pastikan `routes-member.js` menggunakan: `'koperasi-nu-vibes-secret-key-2024'`
2. Restart server
3. Clear localStorage dan login ulang

### Issue 2: Dashboard stuck di "Loading..."
**Penyebab:** Error saat fetch data atau render
**Solusi:**
1. Buka Console dan lihat error
2. Jalankan test-member-api.html untuk isolasi masalah
3. Pastikan ada data simpanan untuk member tersebut

### Issue 3: Menu tidak bisa diklik
**Penyebab:** JavaScript error atau event listener tidak terpasang
**Solusi:**
1. Cek Console untuk error
2. Pastikan `feather.replace()` dipanggil
3. Cek apakah `DOMContentLoaded` event fired

### Issue 4: Chart tidak muncul
**Penyebab:** Chart.js tidak loaded atau canvas tidak ada
**Solusi:**
1. Pastikan Chart.js CDN loaded
2. Cek apakah element `simpananChart` ada
3. Lihat Console untuk Chart.js errors

### Issue 5: Data kosong padahal ada di database
**Penyebab:** Filter `anggota_id` tidak match
**Solusi:**
1. Jalankan: `node check-member-data.js`
2. Pastikan `anggota_id` di simpanan sesuai dengan id member
3. Cek Console log untuk melihat data yang di-filter

## Verification Checklist

Setelah debugging, verifikasi:

- [ ] Server sudah direstart
- [ ] Browser cache & localStorage sudah di-clear
- [ ] Bisa login tanpa error
- [ ] Console tidak ada error merah
- [ ] Network tab semua request 200 OK
- [ ] Dashboard menampilkan data (atau "Tidak ada data" jika memang kosong)
- [ ] Menu bisa diklik dan berpindah halaman
- [ ] Feather icons muncul
- [ ] Chart muncul (jika ada data)

## Quick Fix Commands

```bash
# 1. Update schema (jika belum)
node update-anggota-schema.js

# 2. Set default password (jika belum)
node set-default-member-password.js

# 3. Check member data
node check-member-data.js

# 4. Restart server
# Ctrl+C untuk stop, lalu:
node server.js
```

## Expected Console Output

Jika berhasil, Console harus menampilkan:
```
Loading dashboard for member: 3
Simpanan Pokok loaded: X
Simpanan Wajib loaded: X
Simpanan Khusus loaded: X
Simpanan Sukarela loaded: X
Partisipasi loaded: X
Totals calculated: { totalSimpanan: XXX, totalPartisipasi: XXX, estimasiSHU: XXX }
Dashboard rendered successfully
```

## Contact Points

Jika masih bermasalah setelah semua langkah:
1. Screenshot Console errors
2. Screenshot Network tab
3. Copy output dari `node check-member-data.js`
4. Berikan informasi tersebut untuk analisis lebih lanjut
