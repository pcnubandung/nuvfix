const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Support Railway deployment with persistent volume
const dbPath = process.env.DATABASE_PATH || './koperasi.db';

console.log(`Using database path: ${dbPath}`);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  } else {
    console.log('Database connected successfully');
    fixTahunPembukuanColumns();
  }
});

function fixTahunPembukuanColumns() {
  console.log('Starting tahun_pembukuan column fixes...');
  
  const currentYear = new Date().getFullYear();
  const tables = [
    'transaksi_penjualan',
    'pengeluaran', 
    'pendapatan_lain',
    'partisipasi_anggota',
    'simpanan_pokok',
    'simpanan_wajib',
    'simpanan_khusus',
    'simpanan_sukarela'
  ];
  
  let completed = 0;
  
  tables.forEach(tableName => {
    // Add tahun_pembukuan column if not exists
    db.run(`ALTER TABLE ${tableName} ADD COLUMN tahun_pembukuan INTEGER`, (err) => {
      if (err && !err.message.includes('duplicate column')) {
        console.error(`Error adding tahun_pembukuan to ${tableName}:`, err);
      } else {
        console.log(`✅ tahun_pembukuan column ready for ${tableName}`);
      }
      
      // Update NULL values with current year
      db.run(`UPDATE ${tableName} SET tahun_pembukuan = ? WHERE tahun_pembukuan IS NULL`, [currentYear], (err) => {
        if (err) {
          console.error(`Error updating tahun_pembukuan in ${tableName}:`, err);
        } else {
          console.log(`✅ Updated NULL tahun_pembukuan values in ${tableName} to ${currentYear}`);
        }
        
        completed++;
        if (completed === tables.length) {
          verifyTables();
        }
      });
    });
  });
}

function verifyTables() {
  console.log('\n📊 Verifying table structures...');
  
  const tables = [
    'transaksi_penjualan',
    'pengeluaran', 
    'pendapatan_lain',
    'partisipasi_anggota'
  ];
  
  let verified = 0;
  
  tables.forEach(tableName => {
    db.get(`SELECT COUNT(*) as count, 
                   COUNT(CASE WHEN tahun_pembukuan IS NOT NULL THEN 1 END) as with_tahun
            FROM ${tableName}`, [], (err, row) => {
      if (err) {
        console.error(`Error verifying ${tableName}:`, err);
      } else {
        console.log(`- ${tableName}: ${row.count} total records, ${row.with_tahun} with tahun_pembukuan`);
      }
      
      verified++;
      if (verified === tables.length) {
        console.log('\n🎉 Tahun pembukuan column fixes completed!');
        console.log('All transaction tables now have tahun_pembukuan column with default values.');
        console.log('You can now restart the server.');
        
        db.close((err) => {
          if (err) {
            console.error('Error closing database:', err);
          } else {
            console.log('Database connection closed.');
          }
          process.exit(0);
        });
      }
    });
  });
}