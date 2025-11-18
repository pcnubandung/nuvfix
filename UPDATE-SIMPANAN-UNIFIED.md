# Update: Transaksi Simpanan - Unified Interface

## 📋 Perubahan yang Dilakukan

### ✅ Sebelum (4 Halaman Terpisah)
- Simpanan Pokok (halaman terpisah)
- Simpanan Wajib (halaman terpisah)
- Simpanan Khusus (halaman terpisah)
- Simpanan Sukarela (halaman terpisah)
- Partisipasi Anggota (tetap terpisah)

### ✅ Sesudah (1 Halaman Terpadu)
- **Transaksi Simpanan** (semua jenis dalam 1 halaman)
  - Dropdown pilihan jenis: Pokok, Wajib, Khusus, Sukarela
  - Tabel menampilkan semua transaksi dengan badge jenis
  - Form input dengan dropdown jenis simpanan
- Partisipasi Anggota (tetap terpisah)

---

## 🎯 Keuntungan

1. **Lebih Simpel** - Hanya 1 menu untuk semua transaksi simpanan
2. **Lebih Efisien** - Tidak perlu pindah-pindah halaman
3. **Overview Lengkap** - Lihat semua transaksi simpanan dalam 1 tabel
4. **Mudah Filter** - Badge warna untuk membedakan jenis simpanan
5. **Form Dinamis** - Field "Jenis Transaksi" muncul otomatis untuk Simpanan Sukarela

---

## 📝 File yang Diubah

### 1. `public/index.html`
**Perubahan Sidebar Menu:**
```html
<!-- SEBELUM -->
<div class="nav-group">
  <div class="nav-group-title">Transaksi Simpanan</div>
  <a href="#" data-page="simpanan-pokok">Simpanan Pokok</a>
  <a href="#" data-page="simpanan-wajib">Simpanan Wajib</a>
  <a href="#" data-page="simpanan-khusus">Simpanan Khusus</a>
  <a href="#" data-page="simpanan-sukarela">Simpanan Sukarela</a>
  <a href="#" data-page="partisipasi-anggota">Partisipasi Anggota</a>
</div>

<!-- SESUDAH -->
<div class="nav-group">
  <div class="nav-group-title">Transaksi Simpanan</div>
  <a href="#" data-page="simpanan-pokok">Transaksi Simpanan</a>
  <a href="#" data-page="partisipasi-anggota">Partisipasi Anggota</a>
</div>
```

### 2. `public/js/pages.js`

#### A. Fungsi `renderSimpanan()` - Unified View
**Perubahan:**
- Tidak lagi menerima parameter `jenis`
- Load semua data simpanan (pokok, wajib, khusus, sukarela) sekaligus
- Gabungkan semua data dengan label jenis
- Tampilkan dalam 1 tabel dengan kolom "Jenis Simpanan"
- Badge warna untuk membedakan jenis

**Fitur Baru:**
```javascript
// Load all simpanan types
const [pokok, wajib, khusus, sukarela] = await Promise.all([...]);

// Combine with labels
const allSimpanan = [
  ...pokok.map(s => ({ ...s, jenis_simpanan: 'pokok', jenis_label: 'Simpanan Pokok' })),
  ...wajib.map(s => ({ ...s, jenis_simpanan: 'wajib', jenis_label: 'Simpanan Wajib' })),
  ...khusus.map(s => ({ ...s, jenis_simpanan: 'khusus', jenis_label: 'Simpanan Khusus' })),
  ...sukarela.map(s => ({ ...s, jenis_simpanan: 'sukarela', jenis_label: 'Simpanan Sukarela' }))
];

// Sort by date
allSimpanan.sort((a, b) => new Date(b.tanggal_transaksi) - new Date(a.tanggal_transaksi));
```

#### B. Fungsi `tambahSimpananUnified()` - Form dengan Dropdown
**Fitur:**
- Dropdown "Jenis Simpanan" di bagian atas form
- Field "Jenis Transaksi" (Setoran/Penarikan) muncul otomatis jika pilih Simpanan Sukarela
- Submit ke endpoint yang sesuai berdasarkan jenis yang dipilih

**Kode:**
```javascript
window.tambahSimpananUnified = function() {
  // Form dengan dropdown jenis simpanan
  <select name="jenis_simpanan" id="jenisSimpananSelect" required>
    <option value="">Pilih Jenis Simpanan</option>
    <option value="pokok">Simpanan Pokok</option>
    <option value="wajib">Simpanan Wajib</option>
    <option value="khusus">Simpanan Khusus</option>
    <option value="sukarela">Simpanan Sukarela</option>
  </select>
  
  // Field jenis transaksi (show/hide based on selection)
  <div id="jenisSukarelaGroup" style="display: none;">
    <select name="jenis">
      <option value="Setoran">Setoran</option>
      <option value="Penarikan">Penarikan</option>
    </select>
  </div>
}
```

#### C. Fungsi `loadPage()` - Simplified
**Perubahan:**
- Hapus logic parameter untuk simpanan
- Semua menu simpanan-* sekarang memanggil `renderSimpanan()` tanpa parameter

**Sebelum:**
```javascript
if (page.startsWith('simpanan-')) {
  const jenis = page.replace('simpanan-', '');
  await window[functionName](jenis);
}
```

**Sesudah:**
```javascript
// All simpanan pages now use unified view
await window[functionName]();
```

#### D. Fungsi Edit & Delete
**Perubahan:**
- Tetap menggunakan jenis untuk API endpoint
- Setelah edit/delete, reload dengan `renderSimpanan()` (tanpa parameter)

---

## 🎨 Tampilan UI

### Tabel Transaksi Simpanan
```
┌─────────────────────────────────────────────────────────────────────────┐
│ Transaksi Simpanan                          [+ Tambah Transaksi]        │
├────┬──────────┬────────────────┬──────────┬──────────┬──────────┬───────┤
│ No │ Tanggal  │ Jenis Simpanan │ Anggota  │ Jumlah   │ Metode   │ Aksi  │
├────┼──────────┼────────────────┼──────────┼──────────┼──────────┼───────┤
│ 1  │ 10/11/24 │ [Simpanan Pokok]│ A001    │ Rp 100K  │ Tunai    │ [...]  │
│ 2  │ 09/11/24 │ [Simpanan Wajib]│ A002    │ Rp 50K   │ Transfer │ [...]  │
│ 3  │ 08/11/24 │ [Simpanan Khusus]│ A001   │ Rp 200K  │ E-Wallet │ [...]  │
│ 4  │ 07/11/24 │ [Simpanan Sukarela]│ A003 │ Rp 150K  │ Tunai    │ [...]  │
└────┴──────────┴────────────────┴──────────┴──────────┴──────────┴───────┘
```

### Form Tambah Transaksi
```
┌─────────────────────────────────────────┐
│ Tambah Transaksi Simpanan               │
├─────────────────────────────────────────┤
│ Jenis Simpanan: [Dropdown ▼]            │
│   - Simpanan Pokok                      │
│   - Simpanan Wajib                      │
│   - Simpanan Khusus                     │
│   - Simpanan Sukarela                   │
│                                         │
│ Anggota: [Dropdown ▼]                   │
│ Jumlah: [_______]                       │
│ Tanggal: [10/11/2024]                   │
│ Metode: [Tunai ▼]                       │
│                                         │
│ [Jika Sukarela]                         │
│ Jenis Transaksi: [Setoran ▼]            │
│                                         │
│ Keterangan: [____________]              │
│                                         │
│ [Simpan] [Batal]                        │
└─────────────────────────────────────────┘
```

---

## 🔧 Backend (Tidak Berubah)

Backend API tetap sama, tidak ada perubahan di:
- `routes-simpanan.js`
- `server.js`
- Database schema

Endpoint yang digunakan:
- `GET /api/simpanan/pokok`
- `GET /api/simpanan/wajib`
- `GET /api/simpanan/khusus`
- `GET /api/simpanan/sukarela`
- `POST /api/simpanan/{jenis}`
- `PUT /api/simpanan/{jenis}/:id`
- `DELETE /api/simpanan/{jenis}/:id`

---

## ✅ Testing Checklist

- [ ] Buka halaman "Transaksi Simpanan"
- [ ] Verifikasi semua transaksi muncul dalam 1 tabel
- [ ] Klik "Tambah Transaksi"
- [ ] Pilih "Simpanan Pokok" - field jenis transaksi tidak muncul
- [ ] Pilih "Simpanan Sukarela" - field jenis transaksi muncul
- [ ] Submit form - data tersimpan
- [ ] Verifikasi data muncul di tabel dengan badge yang benar
- [ ] Test Edit transaksi
- [ ] Test Delete transaksi
- [ ] Test Cetak struk

---

## 📌 Catatan

1. **Backward Compatibility**: Fungsi `tambahSimpanan(jenis)` masih ada untuk kompatibilitas, tapi sekarang memanggil `tambahSimpananUnified()`

2. **Partisipasi Anggota**: Tetap terpisah karena memiliki struktur data yang berbeda (per unit usaha, bukan per jenis simpanan)

3. **Menu Sidebar**: Meskipun menu hanya 1, semua route `simpanan-*` masih berfungsi untuk backward compatibility

4. **Performance**: Lebih efisien karena load semua data sekaligus dengan `Promise.all()`

---

## 🚀 Cara Menggunakan

1. **Akses Menu**: Klik "Transaksi Simpanan" di sidebar
2. **Lihat Semua**: Semua transaksi simpanan ditampilkan dalam 1 tabel
3. **Tambah Baru**: 
   - Klik tombol "Tambah Transaksi"
   - Pilih jenis simpanan dari dropdown
   - Isi form
   - Simpan
4. **Edit/Hapus**: Gunakan tombol aksi di setiap baris
5. **Cetak Struk**: Klik tombol "Cetak" untuk print struk

---

**Status**: ✅ Selesai dan Siap Digunakan

**Tanggal Update**: 10 November 2024

**Versi**: 2.1.0
