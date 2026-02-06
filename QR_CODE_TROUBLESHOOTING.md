# QR Code Troubleshooting - "Loading..." Issue

## Masalah
QR Code stuck di "Loading..." setelah perubahan format data.

## Penyebab Kemungkinan
1. **Data terlalu panjang**: Format baru dengan newlines mungkin terlalu panjang
2. **Template literal error**: Escape characters yang salah di dalam HTML string
3. **Library loading issue**: QR libraries tidak ter-load dengan benar
4. **Timeout terlalu pendek**: Generation butuh waktu lebih lama

## Perbaikan yang Dilakukan

### 1. **Optimasi Format QR Data**
```javascript
// Sebelumnya (terlalu panjang)
const qrData = `KOPERASI: ${koperasiInfo.nama_koperasi || 'Koperasi NU Vibes'}
TRX: #${String(transaksi.id).padStart(6, '0')}
ANGGOTA: ${memberData.nomor_anggota}
NAMA: ${memberData.nama_lengkap}
JENIS: ${transaksi.jenis}
JUMLAH: ${formatCurrency(transaksi.jumlah)}
TANGGAL: ${formatDate(transaksi.tanggal)}
WAKTU: ${currentDate}`;

// Sesudah (lebih pendek tapi tetap rapi)
const qrData = `KOPERASI: ${koperasiInfo.nama_koperasi || 'NU Vibes'}
TRX: #${String(transaksi.id).padStart(6, '0')}
ANGGOTA: ${memberData.nomor_anggota}
JENIS: ${transaksi.jenis}
JUMLAH: ${transaksi.jumlah}
TGL: ${transaksi.tanggal}`;
```

### 2. **Perbaikan Template Literal**
```javascript
// Sebelumnya (error)
img.src = \`https://chart.googleapis.com/chart?chs=90x90&cht=qr&chl=\${encodedData}\`;

// Sesudah (benar)
img.src = `https://chart.googleapis.com/chart?chs=90x90&cht=qr&chl=${encodedData}`;
```

### 3. **Enhanced Debug Logging**
```javascript
async function generateQRCode() {
  console.log('Starting QR Code generation...');
  console.log('QR Data:', qrData);
  console.log('QR Data length:', qrData.length);
  
  try {
    console.log('Trying QRCode library...');
    // ... generation code
  } catch (error) {
    console.log('QRCode library failed:', error.message);
  }
}
```

### 4. **Increased Timeout**
```javascript
// Sebelumnya
setTimeout(generateQRCode, 100);

// Sesudah
setTimeout(generateQRCode, 500);
```

## Format QR Code Baru (Optimized)

### **Hasil Scan:**
```
KOPERASI: NU Vibes
TRX: #000066
ANGGOTA: NUV20250030
JENIS: Simpanan Pokok
JUMLAH: 100000
TGL: 2025-11-05
```

### **Keuntungan:**
- ✅ Lebih pendek (< 150 karakter)
- ✅ Tetap readable dengan baris terpisah
- ✅ Informasi essential semua ada
- ✅ Compatible dengan semua QR scanners

## Debugging Steps

### 1. **Check Console Logs**
Buka Developer Tools → Console untuk melihat:
- "Starting QR Code generation..."
- "QR Data: [data content]"
- "QR Data length: [number]"
- Library success/failure messages

### 2. **Check Network Tab**
Pastikan libraries ter-load:
- `qrcode@1.5.3/build/qrcode.min.js`
- `qrious/4.0.2/qrious.min.js`

### 3. **Manual Test**
Test dengan data sederhana:
```javascript
const testData = "TEST QR CODE";
QRCode.toCanvas(canvas, testData, callback);
```

## Expected Behavior

1. **Page Load**: "Page loaded, starting QR generation in 500ms..."
2. **Generation Start**: "Starting QR Code generation..."
3. **Try Libraries**: "Trying QRCode library..." → Success/Fail
4. **Result**: QR Code muncul atau fallback text

## Fallback Scenarios

1. **QRCode.js Success**: Canvas QR code
2. **QRious.js Success**: Canvas QR code  
3. **Google API Success**: Image QR code
4. **All Fail**: Text fallback dengan transaction info

Perbaikan ini seharusnya mengatasi masalah "Loading..." dan membuat QR Code ter-generate dengan benar.