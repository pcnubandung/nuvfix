# 🌐 Deploy Sistem Koperasi Online - Panduan Lengkap

## 🎯 **Platform Hosting Terbaik**

### **🏆 REKOMENDASI UTAMA: Railway**
- ✅ **Mudah deploy** (connect GitHub)
- ✅ **Database persistent** (PostgreSQL/Volume)
- ✅ **SSL otomatis** (HTTPS)
- ✅ **Custom domain** support
- ✅ **Auto deploy** dari GitHub
- 💰 **Harga:** $5-20/bulan

### **🥈 ALTERNATIF LAIN:**
- **Heroku** - $7-25/bulan
- **DigitalOcean App Platform** - $5-12/bulan
- **Render** - $0-7/bulan (free tier available)
- **VPS (DigitalOcean/Linode)** - $5-10/bulan

---

## 🚂 **METODE 1: Railway (RECOMMENDED)**

### **Step 1: Persiapan Repository**
```bash
# 1. Upload project ke GitHub
git init
git add .
git commit -m "Initial commit - Sistem Koperasi"
git branch -M main
git remote add origin https://github.com/username/sistem-koperasi.git
git push -u origin main
```

### **Step 2: Setup Railway**
```
1. Buka railway.app
2. Sign up dengan GitHub
3. Klik "New Project"
4. Pilih "Deploy from GitHub repo"
5. Pilih repository sistem-koperasi
6. Railway akan auto-detect Node.js dan deploy
```

### **Step 3: Environment Variables**
```bash
# Di Railway Dashboard → Variables:
NODE_ENV=production
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-chars
```

### **Step 4: Setup Database Volume**
```bash
# Di Railway Dashboard:
1. Settings → Volumes
2. Add Volume:
   - Mount Path: /app/data
   - Size: 1GB (cukup untuk database SQLite)
```

### **Step 5: Custom Domain (Optional)**
```bash
# Di Railway Dashboard:
1. Settings → Domains
2. Generate Domain (gratis): your-app.up.railway.app
3. Atau Add Custom Domain: koperasi.yourdomain.com
4. Update DNS di domain provider:
   - Type: CNAME
   - Name: koperasi
   - Value: your-app.up.railway.app
```

### **Step 6: Deploy & Access**
```bash
# Railway akan auto-deploy setelah setup
# URL: https://your-app.up.railway.app
# Custom: https://koperasi.yourdomain.com

# Login default:
# Username: admin
# Password: admin123
```

---

## ☁️ **METODE 2: Heroku**

### **Step 1: Install Heroku CLI**
```bash
# Download dari heroku.com/cli
# Login
heroku login
```

### **Step 2: Create Heroku App**
```bash
# Di folder project
heroku create sistem-koperasi-anda
```

### **Step 3: Add Buildpack**
```bash
heroku buildpacks:set heroku/nodejs
```

### **Step 4: Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key-here
```

### **Step 5: Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### **Step 6: Open App**
```bash
heroku open
```

---

## 🌊 **METODE 3: DigitalOcean App Platform**

### **Step 1: Create App**
```
1. Buka cloud.digitalocean.com
2. Apps → Create App
3. Connect GitHub repository
4. Select branch: main
```

### **Step 2: Configure App**
```
Build Command: npm install
Run Command: node server.js
HTTP Port: 3000
Instance Size: Basic ($5/month)
```

### **Step 3: Environment Variables**
```bash
NODE_ENV=production
JWT_SECRET=your-secret-key-here
PORT=3000
```

### **Step 4: Deploy**
```
1. Review settings
2. Click "Create Resources"
3. Wait for deployment (2-5 minutes)
4. Access via provided URL
```

---

## 🖥️ **METODE 4: VPS (Advanced)**

### **Step 1: Create VPS**
```bash
# DigitalOcean Droplet atau Linode VPS
# Ubuntu 22.04 LTS
# $5-10/month
```

### **Step 2: Server Setup**
```bash
# SSH ke server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
apt install nginx -y

# Install Git
apt install git -y
```

### **Step 3: Deploy Application**
```bash
# Clone repository
cd /var/www
git clone https://github.com/username/sistem-koperasi.git
cd sistem-koperasi

# Install dependencies
npm install --production

# Create data directory
mkdir -p data/uploads

# Create environment file
cat > .env << EOF
NODE_ENV=production
PORT=3000
JWT_SECRET=your-secret-key-here
DATABASE_PATH=/var/www/sistem-koperasi/data/koperasi.db
UPLOAD_PATH=/var/www/sistem-koperasi/data/uploads
EOF

# Start with PM2
pm2 start server.js --name "koperasi"
pm2 startup
pm2 save
```

### **Step 4: Nginx Configuration**
```bash
# Create Nginx config
cat > /etc/nginx/sites-available/koperasi << 'EOF'
server {
    listen 80;
    server_name koperasi.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/koperasi /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### **Step 5: SSL Certificate (HTTPS)**
```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d koperasi.yourdomain.com

# Auto-renewal
certbot renew --dry-run
```

---

## 📁 **File yang Perlu Disiapkan**

### **1. Pastikan package.json sudah benar**
```json
{
  "name": "sistem-koperasi",
  "version": "1.0.0",
  "description": "Sistem Manajemen Koperasi",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  }
}
```

### **2. Update .gitignore**
```gitignore
# Dependencies
node_modules/
npm-debug.log*

# Database (local only)
koperasi.db
koperasi.db-journal

# Uploads (local only)
uploads/

# Environment
.env
.env.local

# Logs
*.log
logs/

# OS files
.DS_Store
Thumbs.db
```

### **3. Buat Procfile (untuk Heroku)**
```
web: node server.js
```

### **4. Buat railway.toml (untuk Railway)**
```toml
[build]
  builder = "nixpacks"

[deploy]
  healthcheckPath = "/"
  healthcheckTimeout = 300
  restartPolicyType = "on_failure"
```

---

## 🔧 **Update server.js untuk Production**

Pastikan server.js sudah support production:

```javascript
// Di bagian atas server.js, pastikan ada:
const PORT = process.env.PORT || 3000;

// Database path untuk production
const dbPath = process.env.DATABASE_PATH || './koperasi.db';

// Upload path untuk production
const uploadPath = process.env.UPLOAD_PATH || './uploads';

// CORS untuk production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com', 'https://koperasi.yourdomain.com']
    : '*',
  credentials: true
};
app.use(cors(corsOptions));

// Listen on 0.0.0.0 untuk cloud hosting
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
```

---

## 🔒 **Security Checklist**

### **Sebelum Deploy:**
- ✅ Ganti JWT_SECRET dengan string random yang kuat
- ✅ Ganti password admin default
- ✅ Enable HTTPS/SSL
- ✅ Set CORS dengan domain spesifik
- ✅ Backup database secara berkala
- ✅ Update dependencies ke versi terbaru

### **Generate JWT Secret:**
```bash
# Generate random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🧪 **Testing Deployment**

### **1. Test Basic Access**
```bash
# Test homepage
curl https://your-app.railway.app/

# Test API
curl https://your-app.railway.app/api/test/db
```

### **2. Test Login**
```bash
# Test login endpoint
curl -X POST https://your-app.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### **3. Test dari Browser**
```
1. Buka https://your-app.railway.app
2. Login dengan admin/admin123
3. Test semua fitur utama
4. Cek console browser untuk errors
```

---

## 📊 **Monitoring & Maintenance**

### **Railway Dashboard:**
```
- Metrics: CPU, Memory, Network usage
- Logs: Real-time application logs
- Deployments: History & rollback
- Variables: Environment management
```

### **PM2 (untuk VPS):**
```bash
# Monitor aplikasi
pm2 monit

# View logs
pm2 logs koperasi

# Restart aplikasi
pm2 restart koperasi

# Status
pm2 status
```

### **Database Backup (VPS):**
```bash
# Backup script
cat > /root/backup-koperasi.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups"
mkdir -p $BACKUP_DIR
cp /var/www/sistem-koperasi/data/koperasi.db $BACKUP_DIR/koperasi_$DATE.db
find $BACKUP_DIR -name "koperasi_*.db" -mtime +7 -delete
EOF

chmod +x /root/backup-koperasi.sh

# Cron job (backup harian jam 2 pagi)
crontab -e
# Add: 0 2 * * * /root/backup-koperasi.sh
```

---

## 💰 **Estimasi Biaya**

### **Railway:**
```
Free Tier: $0 (500 jam/bulan)
Hobby: $5/bulan (unlimited)
Pro: $20/bulan (lebih resources)
```

### **Heroku:**
```
Eco: $5/bulan (1 dyno)
Basic: $7/bulan (1 dyno)
Standard: $25/bulan (2x performance)
```

### **DigitalOcean:**
```
App Platform: $5/bulan
VPS Droplet: $6/bulan (1GB RAM)
VPS Droplet: $12/bulan (2GB RAM)
```

### **Domain:**
```
.com domain: $10-15/tahun
.id domain: $15-20/tahun
```

---

## 🚀 **Quick Start - Railway (Tercepat)**

```bash
# 1. Push ke GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# 2. Deploy ke Railway
# - Buka railway.app
# - Connect GitHub
# - Deploy repository
# - Add volume: /app/data (1GB)
# - Set JWT_SECRET di variables

# 3. Akses aplikasi
# URL: https://your-app.up.railway.app
# Login: admin / admin123

# SELESAI! 🎉
```

---

## 📞 **Troubleshooting**

### **Error: Cannot find module**
```bash
# Pastikan dependencies terinstall
npm install
```

### **Error: EADDRINUSE (Port sudah dipakai)**
```bash
# Ganti PORT di environment variables
PORT=3001
```

### **Error: Database locked**
```bash
# Restart aplikasi
pm2 restart koperasi
# atau di Railway: Settings → Restart
```

### **Error: 502 Bad Gateway**
```bash
# Check aplikasi running
pm2 status
# Check logs
pm2 logs koperasi
```

---

## 📚 **Resources**

- **Railway Docs:** https://docs.railway.app
- **Heroku Docs:** https://devcenter.heroku.com
- **DigitalOcean Docs:** https://docs.digitalocean.com
- **Nginx Docs:** https://nginx.org/en/docs
- **PM2 Docs:** https://pm2.keymetrics.io

---

## ✅ **Checklist Deploy**

### **Pre-Deploy:**
- [ ] Code di GitHub
- [ ] package.json sudah benar
- [ ] .gitignore sudah benar
- [ ] Environment variables siap
- [ ] JWT_SECRET generated

### **Deploy:**
- [ ] Platform hosting dipilih
- [ ] Repository connected
- [ ] Environment variables set
- [ ] Database/volume configured
- [ ] Deploy berhasil

### **Post-Deploy:**
- [ ] Aplikasi bisa diakses
- [ ] Login berhasil
- [ ] Semua fitur berfungsi
- [ ] HTTPS aktif
- [ ] Custom domain (optional)
- [ ] Monitoring setup
- [ ] Backup configured

---

**Status:** READY TO DEPLOY ✅  
**Recommended:** Railway (paling mudah)  
**Budget:** $5-10/bulan  
**Time:** 15-30 menit setup 🚀
