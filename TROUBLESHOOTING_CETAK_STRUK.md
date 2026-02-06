# Troubleshooting: Tombol Cetak Struk Tidak Bisa Diklik

## Masalah
Tombol cetak struk tidak responsif atau tidak bisa diklik setelah implementasi QR Code.

## Kemungkinan Penyebab

### 1. **JavaScript Syntax Error**
- Template literal yang kompleks menyebabkan parsing error
- Nested template literals dalam HTML string
- Karakter khusus yang tidak di-escape dengan benar

### 2. **Function Loading Issue**
- File utils.js tidak ter-load dengan benar
- Fungsi window.cetakStruk tidak terdefinisi
- Conflict dengan fungsi lain

### 3. **Pop-up Blocker**
- Browser memblokir window.open()
- Pop-up blocker mencegah pembukaan tab baru

### 4. **API/Network Error**
- Error saat fetch data dari API
- Network timeout atau connection issue

## Solusi yang Diterapkan

### **1. Simplified Template Generation**
```javascript
// Sebelumnya: Complex template literal
const html = `<div>${complex_template}</div>`;

// Sesudah: String concatenation
const html = '<div>' + simple_string + '</div>';
```

### **2. Enhanced Error Handling**
```javascript
window.cetakStruk = async function(id, jenis) {
  console.log('cetakStruk called with:', id, jenis);
  
  try {
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert('Pop-up diblokir! Silakan izinkan pop-up untuk mencetak struk.');
      return;
    }
    
    // Rest of the function...
  } catch (error) {
    console.error('Error cetakStruk:', error);
    alert('Gagal mencetak struk: ' + error.message);
  }
};
```

### **3. Simplified QR Code Generator**
```javascript
function generateQRCodeHTML(qrData, transactionId, additionalInfo) {
  // Simplified version with basic fallback
  return `
    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
    <script>
      // Simple QR generation without complex async/await
    </script>
  `;
}
```

### **4. Debug Test File**
Created `test-cetak-struk.html` untuk testing:
```javascript
function testCetakStruk() {
  if (typeof window.cetakStruk === 'function') {
    console.log('✅ cetakStruk function exists');
    alert('cetakStruk function exists and is callable');
  } else {
    console.log('❌ cetakStruk function NOT found');
    alert('ERROR: cetakStruk function not found!');
  }
}
```

## Debugging Steps

### **1. Check Browser Console**
```javascript
// Open Developer Tools (F12) → Console
console.log('cetakStruk exists:', typeof window.cetakStruk);
console.log('cetakStrukPengeluaran exists:', typeof window.cetakStrukPengeluaran);
```

### **2. Test Function Availability**
```javascript
// In browser console, test if function exists
window.cetakStruk(1, 'pokok');
```

### **3. Check Network Tab**
- Verify utils.js is loading successfully
- Check for 404 or network errors
- Ensure no CORS issues

### **4. Test Pop-up Blocker**
```javascript
// Test if pop-up is blocked
const testWindow = window.open('', '_blank');
if (!testWindow) {
  console.log('Pop-up blocked!');
} else {
  console.log('Pop-up allowed');
  testWindow.close();
}
```

## Quick Fixes

### **Fix 1: Reload Utils.js**
```html
<!-- Ensure utils.js is loaded -->
<script src="js/utils.js"></script>
```

### **Fix 2: Manual Function Test**
```javascript
// Test in browser console
if (typeof window.cetakStruk === 'undefined') {
  console.error('cetakStruk function not loaded!');
  // Reload the page or check file path
}
```

### **Fix 3: Check Pop-up Settings**
1. Click on address bar lock icon
2. Allow pop-ups for this site
3. Refresh page and try again

### **Fix 4: Alternative Implementation**
```javascript
// Fallback if main function fails
window.cetakStrukBackup = function(id, jenis) {
  alert('Cetak struk untuk ID: ' + id + ', Jenis: ' + jenis);
  // Simple implementation without complex features
};
```

## Testing Checklist

- [ ] Open browser console (F12)
- [ ] Check for JavaScript errors
- [ ] Verify utils.js is loaded
- [ ] Test function existence: `typeof window.cetakStruk`
- [ ] Check pop-up blocker settings
- [ ] Test with simple data
- [ ] Verify API endpoints are working
- [ ] Check network connectivity

## Expected Behavior

### **Working State:**
1. Click tombol cetak → Console log appears
2. Pop-up window opens
3. Struk content loads with QR code
4. Print dialog appears (optional)

### **Error States:**
1. **Function not found**: Check utils.js loading
2. **Pop-up blocked**: Enable pop-ups in browser
3. **API error**: Check network and server status
4. **Syntax error**: Check browser console for details

## Recovery Steps

1. **Hard refresh**: Ctrl+F5 to reload all resources
2. **Clear cache**: Clear browser cache and cookies
3. **Check file paths**: Verify utils.js path is correct
4. **Test in incognito**: Rule out extension conflicts
5. **Try different browser**: Test cross-browser compatibility

Implementasi baru menggunakan string concatenation yang lebih aman dan error handling yang lebih robust untuk memastikan tombol cetak berfungsi dengan baik.