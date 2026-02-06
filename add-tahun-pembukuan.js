// Add tahun_pembukuan columns to koperasi_info table
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'koperasi.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Adding tahun_pembukuan columns...');
console.log('Database path:', dbPath);

// Function to check if column exists
function checkColumnExists(tableName, columnName, callback) {
  db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
    if (err) {
      callback(err, false);
      return;
    }
    const exists = rows.some(row => row.name === columnName);
    callback(null, exists);
  });
}

// Add tahun_pembukuan_aktif column
checkColumnExists('koperasi_info', 'tahun_pembukuan_aktif', (err, exists) => {
  if (err) {
    console.error('❌ Error checking tahun_pembukuan_aktif column:', err.message);
    return;
  }
  
  if (!exists) {
    console.log('Adding tahun_pembukuan_aktif column...');
    const currentYear = new Date().getFullYear();
    db.run(`
      ALTER TABLE koperasi_info 
      ADD COLUMN tahun_pembukuan_aktif INTEGER DEFAULT ${currentYear}
    `, (err) => {
      if (err) {
        console.error('❌ Error adding tahun_pembukuan_aktif:', err.message);
      } else {
        console.log('✅ Column tahun_pembukuan_aktif added successfully');
      }
    });
  } else {
    console.log('✅ Column tahun_pembukuan_aktif already exists');
  }
});

// Add tanggal_mulai_pembukuan column
checkColumnExists('koperasi_info', 'tanggal_mulai_pembukuan', (err, exists) => {
  if (err) {
    console.error('❌ Error checking tanggal_mulai_pembukuan column:', err.message);
    return;
  }
  
  if (!exists) {
    console.log('Adding tanggal_mulai_pembukuan column...');
    db.run(`
      ALTER TABLE koperasi_info 
      ADD COLUMN tanggal_mulai_pembukuan DATE DEFAULT '2025-01-01'
    `, (err) => {
      if (err) {
        console.error('❌ Error adding tanggal_mulai_pembukuan:', err.message);
      } else {
        console.log('✅ Column tanggal_mulai_pembukuan added successfully');
      }
    });
  } else {
    console.log('✅ Column tanggal_mulai_pembukuan already exists');
  }
});

// Add tanggal_akhir_pembukuan column
checkColumnExists('koperasi_info', 'tanggal_akhir_pembukuan', (err, exists) => {
  if (err) {
    console.error('❌ Error checking tanggal_akhir_pembukuan column:', err.message);
    return;
  }
  
  if (!exists) {
    console.log('Adding tanggal_akhir_pembukuan column...');
    db.run(`
      ALTER TABLE koperasi_info 
      ADD COLUMN tanggal_akhir_pembukuan DATE DEFAULT '2025-12-31'
    `, (err) => {
      if (err) {
        console.error('❌ Error adding tanggal_akhir_pembukuan:', err.message);
      } else {
        console.log('✅ Column tanggal_akhir_pembukuan added successfully');
      }
    });
  } else {
    console.log('✅ Column tanggal_akhir_pembukuan already exists');
  }
});

// Add status_pembukuan column
checkColumnExists('koperasi_info', 'status_pembukuan', (err, exists) => {
  if (err) {
    console.error('❌ Error checking status_pembukuan column:', err.message);
    return;
  }
  
  if (!exists) {
    console.log('Adding status_pembukuan column...');
    db.run(`
      ALTER TABLE koperasi_info 
      ADD COLUMN status_pembukuan TEXT DEFAULT 'aktif'
    `, (err) => {
      if (err) {
        console.error('❌ Error adding status_pembukuan:', err.message);
      } else {
        console.log('✅ Column status_pembukuan added successfully');
      }
    });
  } else {
    console.log('✅ Column status_pembukuan already exists');
  }
});

// Show table structure after migration
setTimeout(() => {
  db.all('PRAGMA table_info(koperasi_info)', (err, rows) => {
    if (err) {
      console.error('❌ Error getting table info:', err.message);
    } else {
      console.log('\n📋 Current koperasi_info table structure:');
      rows.forEach(row => {
        console.log(`  - ${row.name} (${row.type})`);
      });
    }
    
    console.log('\n✅ Migration completed!');
    db.close();
  });
}, 1000);
