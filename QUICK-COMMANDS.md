# ⚡ QUICK COMMANDS - KOPERASI NU VIBES

## 🚀 Server Commands

### Start Server
```bash
npm start
```

### Start with Auto-Reload (Development)
```bash
npm run dev
```

### Stop Server
```
Ctrl + C
```

---

## 🌐 Access URLs

### Admin Dashboard
```
http://localhost:3000
http://localhost:3000/index.html
```

### Member Portal
```
http://localhost:3000/member.html
```

### Login Page
```
http://localhost:3000/login.html
```

---

## 🔑 Default Login

### Admin
```
Username: admin
Password: admin123
```

### Member (Setelah dibuat)
```
Username: [nomor_anggota]
Password: [password yang diset]
```

---

## 📁 Important Files

### Backend
```
database.js          - Database schema
server.js            - Main server & API
routes-anggota.js    - Anggota routes
routes-simpanan.js   - Simpanan routes
```

### Frontend
```
public/index.html    - Admin dashboard
public/member.html   - Member portal
public/login.html    - Login page
public/css/style.css - Stylesheet
public/js/app.js     - Main app logic
public/js/pages.js   - Page renderers
public/js/member.js  - Member portal logic
public/js/utils.js   - Utility functions
```

### Database
```
koperasi.db          - SQLite database
```

---

## 🗄️ Database Commands

### View Database (SQLite CLI)
```bash
sqlite3 koperasi.db
```

### Common SQL Queries
```sql
-- List all tables
.tables

-- View pendapatan_lain data
SELECT * FROM pendapatan_lain;

-- Count pendapatan_lain
SELECT COUNT(*) FROM pendapatan_lain;

-- Total pendapatan lain
SELECT SUM(jumlah) FROM pendapatan_lain;

-- Exit SQLite
.exit
```

---

## 📊 API Endpoints

### Pendapatan Lain
```
GET    /api/transaksi/pendapatan-lain
POST   /api/transaksi/pendapatan-lain
PUT    /api/transaksi/pendapatan-lain/:id
DELETE /api/transaksi/pendapatan-lain/:id
```

### Test API (curl)
```bash
# Get all
curl http://localhost:3000/api/transaksi/pendapatan-lain

# Create (need token)
curl -X POST http://localhost:3000/api/transaksi/pendapatan-lain \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"kategori":"Bunga Bank","jumlah":500000,"tanggal_transaksi":"2024-11-08"}'
```

---

## 🔧 Troubleshooting Commands

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
rm -rf node_modules
npm install
```

### Check Port Usage (Windows)
```bash
netstat -ano | findstr :3000
```

### Kill Process on Port 3000 (Windows)
```bash
taskkill /PID [PID_NUMBER] /F
```

---

## 📦 Package Management

### Install Dependencies
```bash
npm install
```

### Install Specific Package
```bash
npm install [package-name]
```

### Update Dependencies
```bash
npm update
```

### Check Outdated Packages
```bash
npm outdated
```

---

## 🧪 Testing Commands

### Run Tests (if configured)
```bash
npm test
```

### Check for Errors
```bash
npm run lint
```

---

## 📝 Git Commands (if using Git)

### Initialize Git
```bash
git init
```

### Add All Files
```bash
git add .
```

### Commit
```bash
git commit -m "Add Pendapatan Lain feature"
```

### Push to Remote
```bash
git push origin main
```

### Check Status
```bash
git status
```

### View Log
```bash
git log --oneline
```

---

## 🗂️ File Operations

### List Files
```bash
# Windows CMD
dir

# Windows PowerShell
Get-ChildItem

# Linux/Mac
ls -la
```

### View File Content
```bash
# Windows
type filename.txt

# Linux/Mac
cat filename.txt
```

### Find Files
```bash
# Windows
dir /s filename.txt

# Linux/Mac
find . -name "filename.txt"
```

---

## 🔍 Search in Files

### Search Text (Windows PowerShell)
```powershell
Select-String -Path "*.js" -Pattern "pendapatan"
```

### Search Text (Linux/Mac)
```bash
grep -r "pendapatan" .
```

---

## 📊 Database Backup

### Backup Database
```bash
# Windows
copy koperasi.db koperasi_backup_2024-11-08.db

# Linux/Mac
cp koperasi.db koperasi_backup_2024-11-08.db
```

### Restore Database
```bash
# Windows
copy koperasi_backup_2024-11-08.db koperasi.db

# Linux/Mac
cp koperasi_backup_2024-11-08.db koperasi.db
```

---

## 🧹 Cleanup Commands

### Remove node_modules
```bash
# Windows
rmdir /s /q node_modules

# Linux/Mac
rm -rf node_modules
```

### Remove Database (CAUTION!)
```bash
# Windows
del koperasi.db

# Linux/Mac
rm koperasi.db
```

### Clear Uploads
```bash
# Windows
rmdir /s /q public\uploads

# Linux/Mac
rm -rf public/uploads
```

---

## 📱 Browser Commands

### Open in Browser
```bash
# Windows
start http://localhost:3000

# Mac
open http://localhost:3000

# Linux
xdg-open http://localhost:3000
```

### Clear Browser Cache
```
Ctrl + Shift + Delete (Chrome/Firefox/Edge)
Cmd + Shift + Delete (Mac)
```

### Hard Refresh
```
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

---

## 🔐 Security Commands

### Generate New JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Hash Password (bcrypt)
```bash
node -e "console.log(require('bcryptjs').hashSync('password123', 10))"
```

---

## 📈 Performance Monitoring

### Check Memory Usage
```bash
node --max-old-space-size=4096 server.js
```

### Monitor Server Logs
```bash
# Windows
type server.log

# Linux/Mac
tail -f server.log
```

---

## 🎨 Development Tools

### Format Code (if Prettier installed)
```bash
npx prettier --write "**/*.js"
```

### Lint Code (if ESLint installed)
```bash
npx eslint "**/*.js"
```

---

## 📚 Documentation Commands

### View Documentation
```bash
# Windows
start DOKUMENTASI-FINAL.md

# Mac
open DOKUMENTASI-FINAL.md

# Linux
xdg-open DOKUMENTASI-FINAL.md
```

### List All Markdown Files
```bash
# Windows PowerShell
Get-ChildItem -Filter "*.md"

# Linux/Mac
ls *.md
```

---

## 🚨 Emergency Commands

### Force Stop Server
```
Ctrl + C (twice)
```

### Reset Database (CAUTION!)
```bash
# Backup first!
copy koperasi.db koperasi_backup.db

# Delete and restart server (will recreate)
del koperasi.db
npm start
```

### Reset Admin Password
```sql
-- In SQLite CLI
UPDATE users 
SET password = '$2a$10$...' 
WHERE username = 'admin';
```

---

## 📞 Quick Help

### Get Help
```bash
npm help
node --help
```

### Check Package Info
```bash
npm info [package-name]
```

### View Package.json
```bash
# Windows
type package.json

# Linux/Mac
cat package.json
```

---

## 🎯 Quick Navigation

### Menu Locations

**Admin Dashboard:**
```
Beranda
├─ Informasi Data Koperasi
│  ├─ Informasi Koperasi
│  ├─ Data Unit Usaha
│  └─ Aset dan Inventaris
├─ Manajemen Anggota
│  ├─ Data Anggota
│  ├─ Data Pengurus
│  └─ Data Karyawan
├─ Transaksi Simpanan
│  ├─ Simpanan Pokok
│  ├─ Simpanan Wajib
│  ├─ Simpanan Khusus
│  ├─ Simpanan Sukarela
│  └─ Partisipasi Anggota
├─ Transaksi Keuangan
│  ├─ Hasil Penjualan
│  ├─ Pengeluaran
│  └─ Pendapatan Lain ⭐
├─ Laporan Keuangan
├─ SHU
└─ Pengaturan
```

**Member Portal:**
```
Profil Saya
Simpanan Saya
Laporan Keuangan
Dokumen RAT
```

---

## 💡 Pro Tips

### Quick Restart
```bash
# Stop (Ctrl+C) then immediately:
npm start
```

### View Logs in Real-time
```bash
npm start | tee server.log
```

### Check if Server is Running
```bash
curl http://localhost:3000
```

### Quick Database Query
```bash
sqlite3 koperasi.db "SELECT COUNT(*) FROM pendapatan_lain;"
```

---

## 🔖 Bookmarks

### Important URLs
```
Admin: http://localhost:3000
Member: http://localhost:3000/member.html
API: http://localhost:3000/api/
```

### Documentation Files
```
README.md
DOKUMENTASI-FINAL.md
RINGKASAN-FITUR-PENDAPATAN-LAIN.md
TESTING-GUIDE-PENDAPATAN-LAIN.md
QUICK-COMMANDS.md (this file)
```

---

**Keep this file handy for quick reference! 📌**

**Last Updated:** November 8, 2024
