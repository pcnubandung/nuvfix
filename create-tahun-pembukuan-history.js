// Create tahun_pembukuan_history table
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'koperasi.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Creating tahun_pembukuan_history table...');
console.log('Database path:', dbPath);

// Create tahun_pembukuan_history table
db.run(`
  CREATE TABLE IF NOT EXISTS tahun_pembukuan_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tahun INTEGER NOT NULL,
    tanggal_mulai DATE NOT NULL,
    tanggal_akhir DATE NOT NULL,
    status TEXT DEFAULT 'tutup',
    total_simpanan_pokok REAL DEFAULT 0,
    total_simpanan_wajib REAL DEFAULT 0,
    total_simpanan_khusus REAL DEFAULT 0,
    total_simpanan_sukarela REAL DEFAULT 0,
    total_partisipasi REAL DEFAULT 0,
    total_shu REAL DEFAULT 0,
    catatan TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('❌ Error creating table:', err.message);
  } else {
    console.log('✅ Table tahun_pembukuan_history created successfully');
  }
  
  // Show table structure
  db.all('PRAGMA table_info(tahun_pembukuan_history)', (err, rows) => {
    if (err) {
      console.error('❌ Error getting table info:', err.message);
    } else {
      console.log('\n📋 tahun_pembukuan_history table structure:');
      rows.forEach(row => {
        console.log(`  - ${row.name} (${row.type})`);
      });
    }
    
    // Migrate current year to history if exists
    db.get('SELECT * FROM koperasi_info WHERE id = 1', [], (err, koperasi) => {
      if (err || !koperasi) {
        console.log('\n✅ Migration completed!');
        db.close();
        return;
      }
      
      const tahun = koperasi.tahun_pembukuan_aktif || new Date().getFullYear();
      const tanggalMulai = koperasi.tanggal_mulai_pembukuan || `${tahun}-01-01`;
      const tanggalAkhir = koperasi.tanggal_akhir_pembukuan || `${tahun}-12-31`;
      const status = koperasi.status_pembukuan || 'aktif';
      
      // Check if this year already exists in history
      db.get('SELECT * FROM tahun_pembukuan_history WHERE tahun = ?', [tahun], (err, existing) => {
        if (err) {
          console.error('❌ Error checking existing:', err.message);
          db.close();
          return;
        }
        
        if (!existing) {
          // Insert current year to history
          db.run(`
            INSERT INTO tahun_pembukuan_history (tahun, tanggal_mulai, tanggal_akhir, status)
            VALUES (?, ?, ?, ?)
          `, [tahun, tanggalMulai, tanggalAkhir, status], (err) => {
            if (err) {
              console.error('❌ Error inserting current year:', err.message);
            } else {
              console.log(`\n✅ Current year ${tahun} added to history`);
            }
            
            console.log('\n✅ Migration completed!');
            db.close();
          });
        } else {
          console.log(`\n✅ Year ${tahun} already exists in history`);
          console.log('\n✅ Migration completed!');
          db.close();
        }
      });
    });
  });
});
