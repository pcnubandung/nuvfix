# 🚂 Railway Persistent Database Setup

## 🎯 **Masalah**
Database SQLite terhapus setiap kali deploy ulang di Railway karena filesystem bersifat ephemeral.

## ✅ **Solusi Lengkap**

### **OPSI 1: Railway PostgreSQL Database (RECOMMENDED)**

#### **1.1 Setup PostgreSQL di Railway**
```bash
# Di Railway Dashboard:
1. Klik "New" → "Database" → "Add PostgreSQL"
2. Database akan otomatis dibuat dengan persistent storage
3. Copy connection string dari Variables tab
```

#### **1.2 Install PostgreSQL Driver**
```bash
npm install pg
```

#### **1.3 Update Database Configuration**

**File: `database-postgres.js` (NEW)**
```javascript
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Railway PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('PostgreSQL connected successfully');
    release();
    initializeDatabase();
  }
});

async function initializeDatabase() {
  const client = await pool.connect();
  
  try {
    // Create tables with PostgreSQL syntax
    await client.query(`
      CREATE TABLE IF NOT EXISTS koperasi_info (
        id SERIAL PRIMARY KEY,
        nama_koperasi VARCHAR(255) NOT NULL,
        alamat TEXT,
        telepon VARCHAR(20),
        email VARCHAR(100),
        logo TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS anggota (
        id SERIAL PRIMARY KEY,
        nomor_anggota VARCHAR(20) UNIQUE NOT NULL,
        nama VARCHAR(100) NOT NULL,
        alamat TEXT,
        telepon VARCHAR(20),
        email VARCHAR(100),
        tanggal_bergabung DATE,
        status VARCHAR(20) DEFAULT 'aktif',
        username VARCHAR(50),
        password VARCHAR(255),
        foto_ktp TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add other tables...
    // (Convert all SQLite tables to PostgreSQL syntax)

    console.log('PostgreSQL database initialized');
  } catch (error) {
    console.error('Error initializing PostgreSQL database:', error);
  } finally {
    client.release();
  }
}

module.exports = pool;
```

#### **1.4 Update server.js**
```javascript
// SEBELUM (SQLite)
const db = require('./database');

// SESUDAH (PostgreSQL)
const db = require('./database-postgres');

// Update all queries from SQLite to PostgreSQL syntax
// Example:
// SQLite: db.all("SELECT * FROM anggota", [], callback)
// PostgreSQL: db.query("SELECT * FROM anggota", callback)
```

---

### **OPSI 2: Railway Volume Mount (SQLite Persistent)**

#### **2.1 Setup Railway Volume**
```bash
# Di Railway Dashboard:
1. Go to your service
2. Click "Settings" → "Volumes"
3. Add new volume:
   - Mount Path: /app/data
   - Size: 1GB (atau sesuai kebutuhan)
```

#### **2.2 Update Environment Variables**
```bash
# Di Railway Variables:
DATABASE_PATH=/app/data/koperasi.db
UPLOAD_PATH=/app/data/uploads
```

#### **2.3 Update database.js (Already Done)**
```javascript
// File database.js sudah support ini:
const dbPath = process.env.DATABASE_PATH || './koperasi.db';
const uploadPath = process.env.UPLOAD_PATH || './uploads';
```

#### **2.4 Update Railway Service Settings**
```yaml
# railway.toml (create this file)
[build]
  builder = "nixpacks"

[deploy]
  healthcheckPath = "/"
  healthcheckTimeout = 300
  restartPolicyType = "on_failure"

[volumes]
  data = "/app/data"
```

---

### **OPSI 3: External Database Service**

#### **3.1 PlanetScale (MySQL)**
```bash
# Setup:
1. Create account at planetscale.com
2. Create database
3. Get connection string
4. Install mysql2: npm install mysql2
```

#### **3.2 Supabase (PostgreSQL)**
```bash
# Setup:
1. Create account at supabase.com
2. Create project
3. Get connection string from Settings → Database
4. Install pg: npm install pg
```

#### **3.3 MongoDB Atlas**
```bash
# Setup:
1. Create account at mongodb.com
2. Create cluster
3. Get connection string
4. Install mongoose: npm install mongoose
```

---

## 🔧 **Implementation Steps**

### **Step 1: Choose Database Solution**

**Recommended: Railway PostgreSQL**
- ✅ Fully managed
- ✅ Automatic backups
- ✅ Scalable
- ✅ Integrated with Railway

### **Step 2: Migration Script**

**File: `migrate-to-postgres.js`**
```javascript
const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');

// SQLite source
const sqliteDb = new sqlite3.Database('./koperasi.db');

// PostgreSQL target
const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function migrateData() {
  console.log('Starting migration from SQLite to PostgreSQL...');
  
  try {
    // Migrate koperasi_info
    sqliteDb.all("SELECT * FROM koperasi_info", [], async (err, rows) => {
      if (err) throw err;
      
      for (const row of rows) {
        await pgPool.query(
          `INSERT INTO koperasi_info (nama_koperasi, alamat, telepon, email, logo) 
           VALUES ($1, $2, $3, $4, $5)`,
          [row.nama_koperasi, row.alamat, row.telepon, row.email, row.logo]
        );
      }
      console.log(`Migrated ${rows.length} koperasi_info records`);
    });

    // Migrate users
    sqliteDb.all("SELECT * FROM users", [], async (err, rows) => {
      if (err) throw err;
      
      for (const row of rows) {
        await pgPool.query(
          `INSERT INTO users (username, password, role) 
           VALUES ($1, $2, $3)`,
          [row.username, row.password, row.role]
        );
      }
      console.log(`Migrated ${rows.length} users records`);
    });

    // Migrate anggota
    sqliteDb.all("SELECT * FROM anggota", [], async (err, rows) => {
      if (err) throw err;
      
      for (const row of rows) {
        await pgPool.query(
          `INSERT INTO anggota (nomor_anggota, nama, alamat, telepon, email, tanggal_bergabung, status, username, password, foto_ktp) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [row.nomor_anggota, row.nama, row.alamat, row.telepon, row.email, row.tanggal_bergabung, row.status, row.username, row.password, row.foto_ktp]
        );
      }
      console.log(`Migrated ${rows.length} anggota records`);
    });

    // Add migration for other tables...
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration error:', error);
  }
}

// Run migration
migrateData();
```

### **Step 3: Update Package.json**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "migrate": "node migrate-to-postgres.js",
    "reset-db": "node reset-database.js"
  },
  "dependencies": {
    "pg": "^8.11.3",
    "sqlite3": "^5.1.6"
  }
}
```

### **Step 4: Environment Variables**
```bash
# Railway Environment Variables:
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
PORT=3000
JWT_SECRET=your-jwt-secret
UPLOAD_PATH=/app/data/uploads
```

---

## 🧪 **Testing**

### **Test 1: Database Persistence**
```bash
1. Deploy aplikasi ke Railway
2. Tambah data (anggota, transaksi, dll)
3. Deploy ulang aplikasi
4. Verifikasi data masih ada
```

### **Test 2: Backup & Restore**
```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup.sql

# PostgreSQL restore
psql $DATABASE_URL < backup.sql
```

### **Test 3: Performance**
```bash
1. Test dengan data besar
2. Monitor query performance
3. Check connection pooling
```

---

## 📊 **Comparison**

| Solution | Pros | Cons | Cost |
|----------|------|------|------|
| **Railway PostgreSQL** | ✅ Managed<br>✅ Backups<br>✅ Scalable | ❌ Migration needed | $5-20/month |
| **Railway Volume** | ✅ No migration<br>✅ Simple | ❌ No backups<br>❌ Limited scale | Free |
| **External DB** | ✅ Many options<br>✅ Advanced features | ❌ Complex setup<br>❌ Extra cost | $0-50/month |

---

## 🎯 **Recommended Implementation**

### **Phase 1: Quick Fix (Volume Mount)**
```bash
1. Add Railway volume: /app/data
2. Set DATABASE_PATH=/app/data/koperasi.db
3. Deploy → Database persistent ✅
```

### **Phase 2: Long-term (PostgreSQL)**
```bash
1. Setup Railway PostgreSQL
2. Create migration script
3. Test in staging
4. Migrate production data
5. Switch to PostgreSQL ✅
```

---

## 🚨 **Important Notes**

### **Backup Strategy**
```bash
# Before migration:
1. Export SQLite data: sqlite3 koperasi.db .dump > backup.sql
2. Download uploads folder
3. Save environment variables
```

### **Rollback Plan**
```bash
# If PostgreSQL fails:
1. Switch back to SQLite
2. Restore from backup
3. Redeploy with volume mount
```

### **Monitoring**
```bash
# Check database health:
1. Railway dashboard → Database metrics
2. Application logs
3. Connection pool status
```

---

## ✅ **Final Checklist**

- [ ] Choose database solution (PostgreSQL recommended)
- [ ] Setup Railway database service
- [ ] Update environment variables
- [ ] Create migration script
- [ ] Test in development
- [ ] Backup existing data
- [ ] Deploy to production
- [ ] Verify data persistence
- [ ] Setup monitoring
- [ ] Document new setup

---

**Status:** Implementation Guide Ready ✅  
**Recommended:** Railway PostgreSQL + Migration  
**Timeline:** 2-4 hours implementation  
**Result:** Persistent Database Forever 🚂💾