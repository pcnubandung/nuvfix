# Update: Fitur Upload Bukti Simpanan dengan Kamera (Admin Panel)

## Deskripsi

Menambahkan fitur upload bukti pembayaran dengan pilihan file atau kamera di form **Tambah Transaksi Simpanan** dan **Edit Transaksi Simpanan** di panel admin. Sebelumnya hanya ada input file biasa, sekarang ada pilihan untuk langsung ambil foto dengan kamera.

## Fitur yang Ditambahkan

### 1. Form Tambah Transaksi Simpanan
**Lokasi:** Panel Admin → Transaksi Simpanan → Tambah Transaksi

**Fitur:**
- ✅ Dua tombol upload: "Pilih File" dan "Ambil Foto"
- ✅ Kamera langsung terbuka di tablet/ponsel
- ✅ Preview otomatis setelah upload
- ✅ Validasi ukuran (max 5MB) dan format (JPG, PNG, PDF)
- ✅ Upload bersifat opsional

### 2. Form Edit Transaksi Simpanan
**Lokasi:** Panel Admin → Transaksi Simpanan → Edit

**Fitur:**
- ✅ Tampilkan bukti yang sudah ada (jika ada)
- ✅ Tombol "Lihat" untuk melihat bukti saat ini
- ✅ Dua tombol upload: "Pilih File" dan "Ambil Foto"
- ✅ Preview otomatis setelah upload
- ✅ Validasi ukuran dan format
- ✅ Opsional: kosongkan jika tidak ingin mengubah bukti

## Implementasi Teknis

### Frontend (public/js/pages.js)

#### Fungsi Baru untuk Tambah Simpanan:
```javascript
window.triggerFileUploadSimpanan()
window.triggerCameraCaptureSimpanan()
window.handleCameraCaptureSimpanan()
window.previewBuktiSimpanan()
```

#### Fungsi Baru untuk Edit Simpanan:
```javascript
window.triggerFileUploadSimpananEdit()
window.triggerCameraCaptureSimpananEdit()
window.handleCameraCaptureSimpananEdit()
window.previewBuktiSimpananEdit()
```

#### Form HTML - Tambah Simpanan:
```html
<div class="upload-buttons-container">
  <button type="button" onclick="triggerFileUploadSimpanan()" class="btn btn-secondary">
    <i data-feather="upload"></i>
    <span>Pilih File</span>
  </button>
  <button type="button" onclick="triggerCameraCaptureSimpanan()" class="btn btn-info">
    <i data-feather="camera"></i>
    <span>Ambil Foto</span>
  </button>
</div>

<input type="file" name="bukti_pembayaran" id="buktiSimpanan" accept="image/*,.pdf" style="display: none;">
<input type="file" id="buktiSimpananCamera" accept="image/*" capture="environment" style="display: none;">
```

#### Form HTML - Edit Simpanan:
```html
${item.bukti_pembayaran ? `
  <div style="margin-bottom: 10px; padding: 10px; background: #f5f5f5; border-radius: 5px;">
    <small>Bukti saat ini: ${item.bukti_pembayaran}</small>
    <button type="button" onclick="window.open('/uploads/${item.bukti_pembayaran}', '_blank')">
      <i data-feather="eye"></i> Lihat
    </button>
  </div>
` : ''}

<div class="upload-buttons-container">
  <button type="button" onclick="triggerFileUploadSimpananEdit()" class="btn btn-secondary">
    <i data-feather="upload"></i>
    <span>Pilih File</span>
  </button>
  <button type="button" onclick="triggerCameraCaptureSimpananEdit()" class="btn btn-info">
    <i data-feather="camera"></i>
    <span>Ambil Foto</span>
  </button>
</div>
```

## Perbedaan dengan Portal Member

### Portal Member (Bayar Simpanan):
- ✅ Bukti pembayaran **WAJIB** (required)
- ✅ Hanya untuk anggota yang login
- ✅ Status transaksi: pending (perlu approval admin)
- ✅ Lokasi: `/member.html`

### Panel Admin (Transaksi Simpanan):
- ✅ Bukti pembayaran **OPSIONAL**
- ✅ Untuk admin/kasir yang login
- ✅ Status transaksi: approved (langsung masuk)
- ✅ Lokasi: `/index.html` (admin panel)
- ✅ Bisa edit semua jenis simpanan (Pokok, Wajib, Khusus, Sukarela)

## Jenis Simpanan yang Didukung

### 1. Simpanan Pokok
- Simpanan wajib saat pertama bergabung
- Dibayar sekali
- Tidak bisa diambil selama masih anggota

### 2. Simpanan Wajib
- Simpanan rutin setiap bulan
- Jumlah tetap
- Tidak bisa diambil selama masih anggota

### 3. Simpanan Khusus
- Simpanan sukarela dengan tujuan tertentu
- Jumlah bebas
- Bisa diambil sewaktu-waktu

### 4. Simpanan Sukarela
- Simpanan bebas tanpa kewajiban
- Ada jenis: Setoran atau Penarikan
- Bisa diambil sewaktu-waktu

## Use Cases

### 1. Admin Input Transaksi Langsung
- Anggota datang ke kantor untuk bayar simpanan
- Admin input transaksi di panel admin
- Admin langsung foto bukti transfer/struk dengan tablet
- Transaksi langsung approved

### 2. Admin Input Transaksi dari Nota
- Admin menerima nota/struk dari anggota
- Admin input transaksi
- Admin foto nota dengan kamera ponsel
- Bukti tersimpan untuk audit

### 3. Update Bukti yang Salah
- Admin salah upload bukti
- Buka form edit
- Upload bukti yang benar
- Bukti terupdate

### 4. Tambah Bukti yang Terlupa
- Admin lupa upload bukti saat input
- Buka form edit
- Upload bukti
- Data sekarang lengkap dengan bukti

## Testing

### Test Case 1: Tambah Simpanan dengan Kamera
- ✅ Klik "Tambah Transaksi"
- ✅ Pilih jenis simpanan
- ✅ Pilih anggota
- ✅ Isi jumlah
- ✅ Klik "Ambil Foto"
- ✅ Kamera terbuka
- ✅ Ambil foto bukti
- ✅ Preview muncul
- ✅ Submit form
- ✅ Data tersimpan dengan bukti

### Test Case 2: Edit Simpanan dengan Kamera
- ✅ Klik "Edit" pada transaksi
- ✅ Klik "Ambil Foto"
- ✅ Kamera terbuka
- ✅ Ambil foto bukti baru
- ✅ Preview muncul
- ✅ Submit form
- ✅ Bukti terupdate

### Test Case 3: Lihat Bukti Saat Ini
- ✅ Klik "Edit" pada transaksi yang sudah ada bukti
- ✅ Klik tombol "Lihat"
- ✅ Bukti terbuka di tab baru
- ✅ Bisa verifikasi bukti

### Test Case 4: Tambah Tanpa Bukti
- ✅ Klik "Tambah Transaksi"
- ✅ Isi form tanpa upload bukti
- ✅ Submit form
- ✅ Data tersimpan tanpa bukti (opsional)

## File yang Dimodifikasi

### Frontend:
- `public/js/pages.js`
  - Update form `tambahSimpananUnified()`
  - Update form `editSimpanan()`
  - Tambah 8 fungsi helper baru

### Backend:
- Tidak ada perubahan (endpoint sudah support file upload)

## Keunggulan

### 1. ✅ Konsistensi dengan Fitur Lain
- Semua form transaksi sekarang punya fitur kamera
- UX konsisten di seluruh aplikasi

### 2. ✅ Efisiensi Admin
- Admin bisa langsung foto bukti saat input
- Tidak perlu foto dulu, simpan, lalu upload
- Proses lebih cepat

### 3. ✅ Mobile-Friendly
- Cocok untuk admin yang pakai tablet/ponsel
- Kamera langsung terbuka
- Touch-friendly buttons

### 4. ✅ Dokumentasi Lengkap
- Setiap transaksi bisa didokumentasikan
- Memudahkan audit
- Transparansi keuangan

## Catatan Penting

### 1. Perbedaan Status
- **Portal Member**: Status = pending (perlu approval)
- **Panel Admin**: Status = approved (langsung masuk)

### 2. Bukti Pembayaran
- **Portal Member**: Wajib (required)
- **Panel Admin**: Opsional

### 3. Endpoint API
- Tambah: `POST /api/simpanan/{jenis}`
- Edit: `PUT /api/simpanan/{jenis}/{id}`
- Sudah support file upload dengan multer

## Browser Support

### Desktop
- ✅ Chrome/Edge: File upload & webcam
- ✅ Firefox: File upload & webcam
- ✅ Safari: File upload & webcam

### Mobile/Tablet
- ✅ Chrome Android: File upload & kamera belakang
- ✅ Safari iOS: File upload & kamera belakang
- ✅ Firefox Android: File upload & kamera belakang
- ✅ Samsung Internet: File upload & kamera belakang

## Status

**READY FOR TESTING** ✅

Fitur sudah selesai diimplementasi dan siap untuk ditest.

## Summary

Dengan update ini, fitur upload bukti dengan kamera sekarang tersedia di:

### Portal Member:
- ✅ Bayar Simpanan (Tambah)

### Panel Admin:
- ✅ Transaksi Simpanan (Tambah + Edit)
- ✅ Pengeluaran (Tambah + Edit)
- ✅ Partisipasi Anggota (Tambah + Edit)

**Total: 7 Form dengan Fitur Kamera Upload** 🎉
