# QR Code "Loading..." Issue Fixed

## Masalah
QR Code stuck di "Loading..." dan tidak ter-generate dengan benar di struk admin portal.

## Root Cause Analysis

### **Penyebab Utama:**
1. **Library Loading Issue**: QRCode.js library tidak ter-load sebelum script execution
2. **String Concatenation Complexity**: Template terlalu kompleks dengan string concatenation
3. **Timing Issue**: Script dijalankan sebelum library siap
4. **No Fallback Mechanism**: Tidak ada fallback jika library gagal load

### **Debugging Findings:**
```javascript
// QRCode library check
console.log('QRCode available:', typeof QRCode !== 'undefined');
// Result: false (library not loaded yet)
```

## Solusi yang Diterapkan

### **1. Enhanced Library Loading**
```javascript
// Multiple CDN sources untuk reliability
<script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
```

### **2. Retry Mechanism**
```javascript
let attempts = 0;
function tryGenerateQR() {
  attempts++;
  console.log('QR generation attempt:', attempts);
  
  if (typeof QRCode !== 'undefined' || attempts >= 5) {
    generateQRCode();
  } else {
    setTimeout(tryGenerateQR, 300); // Retry every 300ms
  }
}
```

### **3. Multiple Fallback Options**
```javascript
// Primary: QRCode.js library
if (typeof QRCode !== 'undefined') {
  // Generate with QRCode.js
}
// Fallback: Google Charts API
else {
  const img = document.createElement('img');
  img.src = 'https://chart.googleapis.com/chart?chs=90x90&cht=qr&chl=' + encodedData;
}
```

### **4. Enhanced Error Handling & Logging**
```javascript
console.log('QR Code script loaded');
console.log('QR Data:', qrData);
console.log('QRCode library available:', typeof QRCode !== 'undefined');
console.log('QR generation attempt:', attempts);
```

### **5. Proper Event Handling**
```javascript
// Handle both loading states
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(tryGenerateQR, 100);
  });
} else {
  setTimeout(tryGenerateQR, 100);
}
```

## Technical Improvements

### **Before (Problematic):**
```javascript
// String c