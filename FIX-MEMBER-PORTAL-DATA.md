# Fix Member Portal - Data Kosong

## Masalah yang Ditemukan

1. **API Helper tidak ada** - `member.js` menggunakan `API.get()` tapi helper tidak didefinisikan
2. **JWT Secret berbeda** - `routes-member.js` menggunakan secret key berbeda dengan `server.js`
3. **Helper functions tidak ada** - `formatCurrency()` dan `formatDate()` tidak didefinisikan

## Solusi yang Diterapkan

### 1. Menambahkan API Helper di member.js
```javascript
const API = {
  async get(url) {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },
  // ... post, put methods
};
```

### 2. Menyamakan JWT Secret Key
**Sebelum:**
- `routes-member.js`: `'your-secret-key-change-in-production'`
- `server.js`: `'koperasi-nu-vibes-secret-key-2024'`

**Sesudah:**
- Keduanya menggunakan: `'koperasi-nu-vibes-secret-key-2024'`

### 3. Menambahkan Helper Functions
```javascript
function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount || 0);
}

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}
```

## Testing

### 1. Restart Server
Karena ada perubahan di `routes-member.js`, server perlu direstart:
```bash
# Stop server yang sedang berjalan (Ctrl+C)
# Start ulang
node server.js
```

### 2. Clear Browser Cache & LocalStorage
Di browser console:
```javascript
localStorage.clear();
location.reload();
```

### 3. Login Ulang
1. Buka `http://localhost:3000/member-login.html`
2. Login dengan kredensial member:
   - Email: `zoelonline@gmail.com`
   - Password: `member123`

### 4. Verifikasi Dashboard
Setelah login, dashboard member seharusnya menampilkan:
- ✓ Total Simpanan (dari semua jenis simpanan)
- ✓ Total Partisipasi (transaksi dengan koperasi)
- ✓ Estimasi SHU
- ✓ Masa Keanggotaan
- ✓ Chart komposisi simpanan
- ✓ Tabel ringkasan simpanan

## Endpoint API yang Digunakan Member Portal

Member portal mengakses endpoint berikut (semua memerlukan token):

1. **GET /api/member/profile** - Profil member
2. **GET /api/simpanan/pokok** - Data simpanan pokok
3. **GET /api/simpanan/wajib** - Data simpanan wajib
4. **GET /api/simpanan/khusus** - Data simpanan khusus
5. **GET /api/simpanan/sukarela** - Data simpanan sukarela
6. **GET /api/partisipasi** - Data partisipasi anggota

Semua endpoint ini sudah dilindungi dengan `authenticateToken` middleware yang sekarang bisa memverifikasi token dari member login.

## Catatan Penting

- Token JWT dari member login sekarang bisa diverifikasi oleh semua endpoint yang menggunakan `authenticateToken`
- Member hanya bisa melihat data mereka sendiri (filtering dilakukan di frontend berdasarkan `anggota_id`)
- Token berlaku selama 24 jam
- Jika ada error "Invalid token", logout dan login ulang

## Troubleshooting

### Dashboard masih kosong setelah fix
1. Pastikan server sudah direstart
2. Clear localStorage browser
3. Login ulang
4. Cek browser console untuk error

### Error "Invalid token"
1. Logout dari member portal
2. Clear localStorage
3. Login ulang

### Data tidak sesuai
1. Pastikan ada data simpanan untuk member tersebut di database
2. Cek `anggota_id` di tabel simpanan sesuai dengan id member
3. Verifikasi data dari admin dashboard dulu
