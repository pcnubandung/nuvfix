// Add tahun_pembukuan column to all transaction tables
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'koperasi.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Adding tahun_pembukuan column to transaction tables...');
console.log('Database path:', dbPath);

const currentYear = new Date().getFullYear();

// Tables that need tahun_pembukuan column
const tables = [
  'simpanan',
  'transaksi_simpanan',
  'partisipasi',
  'shu',
  'pengeluaran',
  'pemasukan'
];

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

// Function to add column to table
function addColumnToTable(tableName, callback) {
  checkColumnExists(tableName, 'tahun_pembukuan', (err, exists) => {
    if (err) {
      console.error(`❌ Error checking ${tableName}:`, err.message);
      callback(err);
      return;
    }
    
    if (!exists) {
      console.log(`Adding tahun_pembukuan to ${tableName}...`);
      db.run(`
        ALTER TABLE ${tableName} 
        ADD COLUMN tahun_pembukuan INTEGER DEFAULT ${currentYear}
      `, (err) => {
        if (err) {
          console.error(`❌ Error adding column to ${tableName}:`, err.message);
          callback(err);
        } else {
          console.log(`✅ Column added to ${tableName}`);
          
          // Update existing records
          db.run(`
            UPDATE ${tableName} 
            SET tahun_pembukuan = ${currentYear} 
            WHERE tahun_pembukuan IS NULL
          `, (err) => {
            if (err) {
              console.error(`❌ Error updating ${tableName}:`, err.message);
            } else {
              console.log(`✅ Updated existing records in ${tableName}`);
            }
            callback(null);
          });
        }
      });
    } else {
      console.log(`✅ Column already exists in ${tableName}`);
      callback(null);
    }
  });
}

// Process all tables
let processed = 0;
tables.forEach(tableName => {
  // Check if table exists first
  db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [tableName], (err, table) => {
    if (err) {
      console.error(`❌ Error checking table ${tableName}:`, err.message);
      processed++;
      if (processed === tables.length) {
        finish();
      }
      return;
    }
    
    if (!table) {
      console.log(`⚠️  Table ${tableName} does not exist, skipping...`);
      processed++;
      if (processed === tables.length) {
        finish();
      }
      return;
    }
    
    addColumnToTable(tableName, (err) => {
      processed++;
      if (processed === tables.length) {
        finish();
      }
    });
  });
});

function finish() {
  console.log('\n📋 Summary:');
  console.log(`Processed ${tables.length} tables`);
  console.log('\n✅ Migration completed!');
  console.log('\nNext steps:');
  console.log('1. Restart your server');
  console.log('2. All new transactions will use current tahun_pembukuan');
  console.log('3. Filter queries by tahun_pembukuan to show only current year data');
  
  db.close();
}
