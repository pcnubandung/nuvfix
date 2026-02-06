# Perbaikan Syntax Error - "Invalid or unexpected token"

## Masalah
Console menampilkan error: `SyntaxError: Invalid or unexpected token` di member.html:3

## Penyebab
Template literal di dalam template literal menyebabkan konflik parsing JavaScript:

### **Masalah 1: Nested Template Literals**
```javascript
// SALAH - Template literal di dalam template literal
const html = `
  <script>
    const qrData = '${qrData}'; // Ini menyebabkan error jika qrData mengandung quotes
  </script>
`;
```

### **Masalah 2: Unescaped Quotes**
```javascript
// SALAH - Single quotes tidak di-escape
const qrData = `KOPERASI: NU Vibes
TRX: #000066`; // Newlines menyebabkan masalah dalam string injection
```

### **Masalah 3: Complex Template Expressions**
```javascript
// SALAH - Template literal kompleks di dalam HTML string
qrContainer.innerHTML = `<div>TRX: #${String(transaksi.id).padStart(6, '0')}</div>`;
```

## Solusi Perbaikan

### **1. Safe String Injection**
```javascript
// Escape single quotes untuk safe injection
const safeQrData = qrData.replace(/'/g, "\\'");
const transactionId = String(transaksi.id).padStart(6, '0');
const memberNumber = memberData.nomor_anggota;

// Inject sebagai variabel terpisah
const html = `
  <script>
    const qrData = '${safeQrData}';
    const transactionId = '${transactionId}';
    const memberNumber = '${memberNumber}';
  </script>
`;
```

### **2. Proper Newline Handling**
```javascript
// Sebelumnya (bermasalah)
const qrData = `KOPERASI: NU Vibes
TRX: #000066`;

// Sesudah (aman)
const qrData = `KOPERASI: NU Vibes\\nTRX: #000066`;
```

### **3. String Concatenation untuk Fallback**
```javascript
// Sebelumnya (template literal di dalam string)
qrContainer.innerHTML = `<div>TRX: #${transactionId}</div>`;

// Sesudah (string concatenation)
qrContainer.innerHTML = '<div>TRX: #' + transactionId + '</div>';
```

### **4. Arrow Function to Regular Function**
```javascript
// Sebelumnya (arrow function dalam template)
img.onload = () => resolve(img);

// Sesudah (regular function)
img.onload = function() { resolve(img); };
```

## Hasil Perbaikan

### ✅ **Syntax Error Resolved**
- Tidak ada lagi "Invalid or unexpected token"
- JavaScript parsing berjalan normal
- Template injection aman dari quote conflicts

### ✅ **QR Code Generation Fixed**
- Data injection aman dengan proper escaping
- Multiple fallback methods tetap berfungsi
- Console logging untuk debugging

### ✅ **Improved Error Handling**
- Safe string operations
- Proper variable separation
- Clean template structure

## Format QR Code Final

### **Data Structure:**
```
KOPERASI: NU Vibes
TRX: #000066
ANGGOTA: NUV20250030
JENIS: Simpanan Pokok
JUMLAH: 100000
TGL: 2025-11-05
```

### **Safe Injection:**
```javascript
const safeQrData = "KOPERASI: NU Vibes\\nTRX: #000066\\nANGGOTA: NUV20250030\\nJENIS: Simpanan Pokok\\nJUMLAH: 100000\\nTGL: 2025-11-05";
```

## Testing Checklist

- [x] No syntax errors in console
- [x] QR Code generates successfully
- [x] Fallback methods work
- [x] Print functionality intact
- [x] Responsive design maintained

Perbaikan ini mengatasi semua masalah syntax error dan memastikan QR Code generation berjalan dengan lancar.