# 🚨 SERVER ERROR (Status 500) - TROUBLESHOOTING GUIDE

## 📊 **ERROR YANG TERDETEKSI**

Dari network tab, terlihat beberapa endpoint mengalami **Status 500 (Internal Server Error)**:
- `stats` - Status 500
- `penjualan` - Status 500 (multiple times)
- `pendapatan-lain` - Status 500

## 🔍 **ANALISIS MASALAH**

### **Status 500 = Server Internal Error**
- ✅ **Frontend OK** - JavaScript code sudah diperbaiki dengan error handling
- ❌ **Backend Issue** - Server mengalami masalah internal
- ❌ **Database Issue** - Kemungkinan ada masalah dengan query atau data

## 🎯 **KEMUNGKINAN PENYEBAB**

### **1. Database Connection Issues**
- Database server tidak berjalan
- Connection timeout
- Database credentials salah

### **2. Data Integrity Issues**
- Data transaksi yang corrupt
- Foreign key constraints violation
- Missing required fields

### **3. Server Configuration Issues**
- Node.js server error
- Missing environment variables
- Port conflicts

### **4. Tahun Pembukuan Issues**
- Tahun pembukuan aktif tidak valid
- Data transaksi tidak sesuai dengan tahun aktif
- Periode pembukuan yang overlap

## 🛠️ **LANGKAH TROUBLESHOOTING**

### **STEP 1: Check Server Status**
```bash
# Check if server is running
ps aux | grep node

# Check server logs
tail -f server.log
# or
npm run dev (check console output)
```

### **STEP 2: Check Database**
```bash
# Check database connection
mysql -u username -p database_name
# or
sqlite3 database.db

# Check if tables exist
SHOW TABLES;
```

### **STEP 3: Check Specific Endpoints**
Test endpoints directly:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/transaksi/penjualan
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/transaksi/pendapatan-lain
```

### **STEP 4: Check Tahun Pembukuan**
1. Navigate to **Pengaturan** menu
2. Check **Tahun Pembukuan Aktif**
3. Verify dates are valid
4. Try changing to current year if needed

### **STEP 5: Check Server Logs**
Look for error messages like:
- Database connection errors
- SQL syntax errors
- Missing table errors
- Foreign key constraint errors

## 🔧 **FRONTEND IMPROVEMENTS APPLIED**

### **✅ Enhanced Error Handling**
```javascript
// Added better error handling in API class
if (response.status === 500) {
  console.error(`Server Error (500) for ${url}:`, response);
  throw new Error(`Server mengalami masalah internal. Silakan coba lagi atau hubungi administrator.`);
}
```

### **✅ User-Friendly Error Messages**
- Clear error messages for users
- Console logging for developers
- Graceful fallback when API fails

## 📋 **IMMEDIATE ACTIONS NEEDED**

### **FOR DEVELOPER:**
1. **Check server console** for error messages
2. **Check database** connection and data integrity
3. **Verify API endpoints** are working correctly
4. **Check tahun pembukuan** configuration

### **FOR USER:**
1. **Refresh browser** - `Ctrl + Shift + R`
2. **Try different menu** - Check if other menus work
3. **Check tahun pembukuan** - Go to Pengaturan
4. **Contact administrator** if problem persists

## 🎯 **SPECIFIC ENDPOINTS TO CHECK**

Based on network errors, check these backend endpoints:
- `/api/transaksi/penjualan` - Status 500
- `/api/transaksi/pendapatan-lain` - Status 500
- `/api/stats` - Status 500

## 💡 **QUICK FIXES TO TRY**

### **1. Restart Server**
```bash
# Stop server
Ctrl + C

# Start server again
npm run dev
# or
node server.js
```

### **2. Check Database**
- Ensure database server is running
- Check if all required tables exist
- Verify data integrity

### **3. Reset Tahun Pembukuan**
- Go to Pengaturan
- Set tahun pembukuan to current year
- Verify date ranges are valid

## 🚨 **STATUS: SERVER-SIDE ISSUE**

**Frontend sudah diperbaiki dengan error handling yang lebih baik.**
**Masalah utama ada di server/backend yang perlu diperbaiki oleh developer.**

**Next Steps:**
1. ✅ Frontend error handling - DONE
2. ❌ Server debugging - NEEDED
3. ❌ Database verification - NEEDED
4. ❌ API endpoint fixes - NEEDED