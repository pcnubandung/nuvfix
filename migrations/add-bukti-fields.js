// Migration: Add bukti (proof) fields to tables
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DATABASE_PATH || './koperasi.db';
const db = new sqlite3.Database(dbPath);

console.log('Running migration: Add bukti fields...');

db.serialize(() => {
  // Add bukti_pembayaran to simpanan tables
  const simpananTables = ['simpanan_pokok', 'simpanan_wajib', 'simpanan_khusus', 'simpanan_sukarela'];
  
  simpananTables.forEach(table => {
    db.run(`ALTER TABLE ${table} ADD COLUMN bukti_pembayaran TEXT`, (err) => {
      if (err && !err.message.includes('duplicate column')) {
        console.error(`Error adding bukti_pembayaran to ${table}:`, err);
      } else if (!err) {
        console.log(`✓ Added bukti_pembayaran to ${table}`);
      }
    });
  });
  
  // Add bukti_partisipasi to partisipasi_anggota
  db.run(`ALTER TABLE partisipasi_anggota ADD COLUMN bukti_partisipasi TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.error('Error adding bukti_partisipasi:', err);
    } else if (!err) {
      console.log('✓ Added bukti_partisipasi to partisipasi_anggota');
    }
  });
  
  // Add bukti_pengeluaran to pengeluaran
  db.run(`ALTER TABLE pengeluaran ADD COLUMN bukti_pengeluaran TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.error('Error adding bukti_pengeluaran:', err);
    } else if (!err) {
      console.log('✓ Added bukti_pengeluaran to pengeluaran');
    }
  });
  
  // Create activity_log table
  db.run(`CREATE TABLE IF NOT EXISTS activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    username TEXT NOT NULL,
    action TEXT NOT NULL,
    module TEXT NOT NULL,
    description TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`, (err) => {
    if (err) {
      console.error('Error creating activity_log table:', err);
    } else {
      console.log('✓ Created activity_log table');
    }
  });
  
  console.log('\nMigration completed!');
  console.log('Please restart the server to apply changes.');
  
  db.close();
});
