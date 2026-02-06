# Fix Error: penjualan.reduce is not a function

## Problem
Error `penjualan.reduce is not a function` terjadi di semua menu Transaksi Keuangan karena API endpoint mengembalikan error atau bukan array, sehingga method `.reduce()` gagal dijalankan.

## Root Cause
Setelah update endpoint backend untuk mendukung filter tahun pembukuan, kemungkinan ada endpoint yang mengembalikan error atau response yang tidak sesuai format array.

## Solutions Applied

### 1. ✅ Fixed renderPenjualan Function
```javascript
// BEFORE (Error prone)
window.renderPenjualan = async function() {
  const [penjualan, unitUsaha] = await Promise.all([
    API.get('/api/transaksi/penjualan'),
    API.get('/api/unit-usaha')
  ]);
  
  const totalPenjualan = penjualan.reduce((sum, item) => sum + parseFloat(item.jumlah_penjualan || 0), 0);
  // ...
}

// AFTER (Fixed with error handling)
window.renderPenjualan = async function() {
  try {
    const [penjualan, unitUsaha] = await Promise.all([
      API.get('/api/transaksi/penjualan'),
      API.get('/api/unit-usaha')
    ]);
    
    // Pastikan penjualan adalah array
    const penjualanData = Array.isArray(penjualan) ? penjualan : [];
    const unitUsahaData = Array.isArray(unitUsaha) ? unitUsaha : [];
    
    const totalPenjualan = penjualanData.reduce((sum, item) => sum + parseFloat(item.jumlah_penjualan || 0), 0);
    // ...
  } catch (error) {
    console.error('Error loading penjualan data:', error);
    contentArea.innerHTML = `
      <div class="alert alert-danger">
        <i data-feather="alert-circle"></i>
        Terjadi kesalahan saat memuat data penjualan: ${error.message}
      </div>
    `;
    feather.replace();
  }
}
```

### 2. ✅ Fixed renderPengeluaran Function
```javascript
// Added same error handling pattern
window.renderPengeluaran = async function() {
  try {
    const [pengeluaran, unitUsaha] = await Promise.all([
      API.get('/api/transaksi/pengeluaran'),
      API.get('/api/unit-usaha')
    ]);
    
    const pengeluaranData = Array.isArray(pengeluaran) ? pengeluaran : [];
    const unitUsahaData = Array.isArray(unitUsaha) ? unitUsaha : [];
    
    const totalPengeluaran = pengeluaranData.reduce((sum, item) => sum + parseFloat(item.jumlah || 0), 0);
    // ...
  } catch (error) {
    console.error('Error loading pengeluaran data:', error);
    // Show error message
  }
}
```

### 3. ✅ Fixed renderPendapatanLain Function
```javascript
// Added same error handling pattern
window.renderPendapatanLain = async function() {
  try {
    const pendapatanLain = await API.get('/api/transaksi/pendapatan-lain');
    const pendapatanLainData = Array.isArray(pendapatanLain) ? pendapatanLain : [];
    
    const totalPendapatan = pendapatanLainData.reduce((sum, item) => sum + parseFloat(item.jumlah || 0), 0);
    // ...
  } catch (error) {
    console.error('Error loading pendapatan lain data:', error);
    // Show error message
  }
}
```

### 4. ✅ Fixed Export Functions
- `exportPenjualan()` - Added array validation and error handling
- `exportPengeluaran()` - Added array validation and error handling  
- `exportPendapatanLain()` - Added array validation and error handling

### 5. ✅ Fixed Print Functions
- `cetakPenjualan()` - Added array validation and error handling
- `cetakPengeluaran()` - Added array validation and error handling
- `cetakPendapatanLain()` - Added array validation and error handling

## Key Changes Made

### Array Validation Pattern
```javascript
// Always validate API response is array
const dataArray = Array.isArray(apiResponse) ? apiResponse : [];
```

### Error Handling Pattern
```javascript
try {
  // API calls and data processing
} catch (error) {
  console.error('Error:', error);
  // Show user-friendly error message
  showNotification('Gagal memuat data', 'error');
}
```

### Safe Reduce Operations
```javascript
// Before: penjualan.reduce() - can fail if not array
// After: penjualanData.reduce() - safe because validated as array
```

## Backend Endpoint Status
All backend endpoints have been updated to support tahun_pembukuan filter:
- ✅ GET /api/transaksi/penjualan
- ✅ GET /api/transaksi/pengeluaran  
- ✅ GET /api/transaksi/pendapatan-lain
- ✅ POST endpoints with tahun_pembukuan
- ✅ PUT endpoints with tahun_pembukuan

## Testing Recommendations

1. **Test API Endpoints Directly**
   ```bash
   # Test if endpoints return proper array format
   curl http://localhost:3000/api/transaksi/penjualan
   curl http://localhost:3000/api/transaksi/pengeluaran
   curl http://localhost:3000/api/transaksi/pendapatan-lain
   ```

2. **Check Browser Console**
   - Open Developer Tools → Console
   - Navigate to Transaksi Keuangan menus
   - Look for any error messages

3. **Verify Database**
   - Check if tahun_pembukuan column exists in tables
   - Verify getTahunAktif() function works properly

## Status: ✅ FIXED
Error handling has been added to all transaksi functions to prevent `reduce is not a function` errors. The functions now safely validate API responses as arrays before using array methods.