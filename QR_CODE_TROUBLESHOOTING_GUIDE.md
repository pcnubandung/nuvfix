# QR Code Troubleshooting Guide

## Current Issue Analysis

Berdasarkan console log yang diberikan:

```
✅ QR Code script loaded
✅ QR generation attempt: 1-5
✅ QR Data: KOPERASI: Koperasi NU Vibes TRX: #000042...
❌ QRCode library available: false
❌ QRCode library not loaded, trying fallback...
❌ Google Charts QR Code failed
```

## Root Cause

### **Primary Issue: Network/CORS Restrictions**
- Google Charts API mungkin diblokir oleh network/firewall
- CORS policy mungkin mencegah akses ke external services
- Internet connection issues

### **Secondary Issue: Data Format**
- QR data mungkin terlalu panjang atau mengandung karakter bermasalah
- URL encoding issues

## Diagnostic Steps

### **Step 1: Test Network Access**
Buka `debug-qr-simple.html` untuk test:
1. Simple text QR generation
2. Transaction data QR generation  
3. Google Charts API accessibility
4. QRServer API accessibility

### **Step 2: Manual URL Test**
Test URL ini di browser:
```
https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=Hello%20World
```

Jika tidak bisa akses = Network/firewall issue

### **Step 3: Check Console Errors**
Look for:
- CORS errors
- Network errors
- 403/404 errors
- Timeout errors

## Solutions by Issue Type

### **🌐 Network/Firewall Issues**

#### **Solution A: Use Different QR Service**
```javascript
// Try different QR generation services
const services = [
  'https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=',
  'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=',
  'https://qr-generator.qrcode.studio/qr/create?size=100x100&data='
];
```

#### **Solution B: Local QR Generation**
```javascript
// Use client-side QR generation library
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"></script>
```

#### **Solution C: Server-Side QR Generation**
```javascript
// Generate QR on server and serve as image
fetch('/api/generate-qr', {
  method: 'POST',
  body: JSON.stringify({data: qrData})
})
```

### **📝 Data Format Issues**

#### **Solution A: Simplify Data**
```javascript
// Shorter, cleaner format
const qrData = `TRX:${transactionId}|AMT:${amount}|DATE:${date}`;
```

#### **Solution B: Better Encoding**
```javascript
// Clean data before encoding
const cleanData = qrData
  .replace(/[^\w\s\-\.\|]/g, '') // Remove special chars
  .substring(0, 200); // Limit length
```

### **🔧 Implementation Fixes**

#### **Fix 1: Enhanced Error Handling**
```javascript
function generateQRWithTimeout(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const timer = setTimeout(() => {
      reject(new Error('Timeout'));
    }, timeout);
    
    img.onload = () => {
      clearTimeout(timer);
      resolve(img);
    };
    
    img.onerror = () => {
      clearTimeout(timer);
      reject(new Error('Load failed'));
    };
    
    img.src = url;
  });
}
```

#### **Fix 2: Multiple Service Fallback**
```javascript
const qrServices = [
  {
    name: 'Google Charts',
    url: (data) => `https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=${encodeURIComponent(data)}`
  },
  {
    name: 'QRServer',
    url: (data) => `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(data)}`
  },
  {
    name: 'QRCode Studio',
    url: (data) => `https://qr-generator.qrcode.studio/qr/create?size=100x100&data=${encodeURIComponent(data)}`
  }
];
```

#### **Fix 3: Offline Fallback**
```javascript
function showOfflineFallback(transactionId, amount) {
  return `
    <div style="text-align: center; padding: 10px; border: 2px dashed #ccc;">
      <div style="font-size: 10px; margin-bottom: 5px;">QR Code Offline</div>
      <div style="font-size: 12px; font-weight: bold;">TRX: #${transactionId}</div>
      <div style="font-size: 10px;">Amount: ${amount}</div>
      <div style="font-size: 8px; color: #666; margin-top: 5px;">Manual verification required</div>
    </div>
  `;
}
```

## Testing Protocol

### **Phase 1: Basic Connectivity**
1. Open `debug-qr-simple.html`
2. Check if any QR service works
3. Identify working services

### **Phase 2: Data Testing**
1. Test with simple data (Hello World)
2. Test with transaction data
3. Identify data length/format limits

### **Phase 3: Integration Testing**
1. Test in actual struk generation
2. Verify QR code scannability
3. Test across different browsers

## Quick Fixes to Try

### **Immediate Fix 1: Shorter Data Format**
```javascript
// Instead of full text, use compact format
const qrData = `${transactionId}|${amount}|${date}`;
```

### **Immediate Fix 2: Different Service**
```javascript
// Try QRServer instead of Google Charts
img.src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(qrData)}`;
```

### **Immediate Fix 3: Fallback Display**
```javascript
// Better fallback with useful info
qrContainer.innerHTML = `
  <div style="text-align: center; padding: 15px; border: 1px dashed #999; font-size: 10px;">
    <div>QR Code Service</div>
    <div>Temporarily Unavailable</div>
    <div style="margin-top: 8px; font-weight: bold;">TRX: #${transactionId}</div>
    <div style="font-size: 8px; color: #666; margin-top: 5px;">
      Please verify manually or<br>
      contact customer service
    </div>
  </div>
`;
```

## Expected Results

### **Success Indicators:**
- Console: "Google Charts QR Code loaded successfully" OR "QRServer API loaded successfully"
- Visual: QR code image appears in struk
- Functional: QR code can be scanned successfully

### **Partial Success:**
- Fallback text appears with transaction info
- Manual verification possible

### **Complete Failure:**
- No QR code or fallback appears
- Console shows multiple service failures
- Network connectivity issues

## Next Steps

1. **Test dengan `debug-qr-simple.html`** untuk identify working services
2. **Check network connectivity** dan firewall settings
3. **Try alternative QR services** jika Google Charts blocked
4. **Implement server-side QR generation** jika semua external services blocked

Prioritas: Pastikan minimal ada fallback text yang informatif untuk manual verification.