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
    fixDatabaseColumns();
  }
});

function fixDatabaseColumns() {
  console.log('Starting database column fixes...');
  
  // Add tahun_pembukuan_aktif to koperasi_info if not exists
  db.run(`ALTER TABLE koperasi_info ADD COLUMN tahun_pembukuan_aktif INTEGER`, (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.error('Error adding tahun_pembukuan_aktif column:', err);
    } else {
      console.log('✅ tahun_pembukuan_aktif column ready');
    }
    
    // Add other missing columns
    addMissingColumns();
  });
}

function addMissingColumns() {
  const currentYear = new Date().getFullYear();
  
  // Set default tahun_pembukuan_aktif if not set
  db.run(`UPDATE koperasi_info SET tahun_pembukuan_aktif = ? WHERE tahun_pembukuan_aktif IS NULL`, [currentYear], (err) => {
    if (err) {
      console.error('Error setting default tahun_pembukuan_aktif:', err);
    } else {
      console.log(`✅ Default tahun_pembukuan_aktif set to ${currentYear}`);
    }
    
    // Add tanggal_mulai_pembukuan and tanggal_akhir_pembukuan
    db.run(`ALTER TABLE koperasi_info ADD COLUMN tanggal_mulai_pembukuan DATE`, (err) => {
      if (err && !err.message.includes('duplicate column')) {
        console.error('Error adding tanggal_mulai_pembukuan column:', err);
      } else {
        console.log('✅ tanggal_mulai_pembukuan column ready');
      }
      
      db.run(`ALTER TABLE koperasi_info ADD COLUMN tanggal_akhir_pembukuan DATE`, (err) => {
        if (err && !err.message.includes('duplicate column')) {
          console.error('Error adding tanggal_akhir_pembukuan column:', err);
        } else {
          console.log('✅ tanggal_akhir_pembukuan column ready');
        }
        
        db.run(`ALTER TABLE koperasi_info ADD COLUMN status_pembukuan TEXT DEFAULT 'aktif'`, (err) => {
          if (err && !err.message.includes('duplicate column')) {
            console.error('Error adding status_pembukuan column:', err);
          } else {
            console.log('✅ status_pembukuan column ready');
          }
          
          // Set default dates if not set
          setDefaultDates(currentYear);
        });
      });
    });
  });
}

function setDefaultDates(year) {
  db.run(`UPDATE koperasi_info SET 
           tanggal_mulai_pembukuan = ?,
           tanggal_akhir_pembukuan = ?,
           status_pembukuan = 'aktif'
           WHERE tanggal_mulai_pembukuan IS NULL`, 
         [`${year}-01-01`, `${year}-12-31`], (err) => {
    if (err) {
      console.error('Error setting default dates:', err);
    } else {
      console.log(`✅ Default pembukuan dates set for ${year}`);
    }
    
    // Verify the setup
    verifySetup();
  });
}

function verifySetup() {
  db.get('SELECT * FROM koperasi_info WHERE id = 1', [], (err, row) => {
    if (err) {
      console.error('Error verifying setup:', err);
    } else {
      console.log('\n📊 Current koperasi_info setup:');
      console.log('- tahun_pembukuan_aktif:', row?.tahun_pembukuan_aktif);
      console.log('- tanggal_mulai_pembukuan:', row?.tanggal_mulai_pembukuan);
      console.log('- tanggal_akhir_pembukuan:', row?.tanggal_akhir_pembukuan);
      console.log('- status_pembukuan:', row?.status_pembukuan);
    }
    
    console.log('\n🎉 Database column fixes completed!');
    console.log('You can now restart the server.');
    
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Database connection closed.');
      }
      process.exit(0);
    });
  });
}