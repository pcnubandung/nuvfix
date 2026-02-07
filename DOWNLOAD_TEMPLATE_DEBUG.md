# 🔍 Download Template Excel - Debug Guide

## 🐛 Debugging Steps

### 1. Deploy Update

Code sudah ditambahkan logging detail:

```bash
git add .
git commit -m "Add logging for template download"
git push origin main
```

### 2. Test Download

Klik "Download Template Excel" di aplikasi.

### 3. Check Railway Logs

Logs akan menampilkan:

**Success:**
```
📥 Template download requested
📄 Template workbook created
✅ Template downloaded successfully
```

**Error:**
```
❌ Template error: [error message]
   Stack: [stack trace]
```

## 🔍 Common Issues

### Issue 1: 401 Unauthorized

**Symptom:** Download gagal, no logs

**Cause:** Token expired atau tidak ada

**Solution:**
- Logout dan login lagi
- Check browser console for 401 error

### Issue 2: ExcelJS Error

**Symptom:** Logs show "Template error"

**Cause:** ExcelJS library issue

**Solution:**
- Check if ExcelJS installed: `npm list exceljs`
- Reinstall if needed: `npm install exceljs`

### Issue 3: Memory Error

**Symptom:** "Out of memory" error

**Cause:** Railway memory limit

**Solution:**
- Template is small, shouldn't happen
- Check Railway memory usage

### Issue 4: CORS Error

**Symptom:** Browser console shows CORS error

**Cause:** CORS not configured for blob download

**Solution:**
- Already configured in server.js
- Check if `app.use(cors())` exists

## 🧪 Test Locally

```bash
# Start server
npm start

# Open browser
http://localhost:3000

# Login and try download
```

## 📝 Expected Behavior

1. Click "Download Template Excel"
2. Browser downloads file: `Template_Import_Anggota.xlsx`
3. File contains:
   - Sheet 1: Template Anggota (with sample data)
   - Sheet 2: Catatan (instructions)

## 🔧 Manual Test

If download fails, test endpoint directly:

```bash
# Get token first (login)
TOKEN="your-jwt-token"

# Download template
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/anggota/template \
  -o template.xlsx
```

## 📊 File Structure

Template should have:
- 12 columns (Nomor Anggota to Status)
- 2 sample rows
- Styled header (green background)
- Notes sheet with instructions

## ✅ Checklist

- [ ] ExcelJS installed
- [ ] Server running
- [ ] Logged in as admin
- [ ] Token valid
- [ ] Railway logs show request
- [ ] File downloads successfully
- [ ] File opens in Excel/LibreOffice

---

**Share Railway logs** if download still fails after deploy!
