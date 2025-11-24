// Fix pengumuman table - Add missing columns
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'koperasi.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Fixing pengumuman table...');
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

// Add tampilkan_judul column if not exists
checkColumnExists('pengumuman', 'tampilkan_judul', (err, exists) => {
  if (err) {
    console.error('❌ Error checking tampilkan_judul column:', err.message);
    return;
  }
  
  if (!exists) {
    console.log('Adding tampilkan_judul column...');
    db.run(`
      ALTER TABLE pengumuman 
      ADD COLUMN tampilkan_judul INTEGER DEFAULT 1
    `, (err) => {
      if (err) {
        console.error('❌ Error adding tampilkan_judul:', err.message);
      } else {
        console.log('✅ Column tampilkan_judul added successfully');
      }
    });
  } else {
    console.log('✅ Column tampilkan_judul already exists');
  }
});

// Add tampilkan_konten column if not exists
checkColumnExists('pengumuman', 'tampilkan_konten', (err, exists) => {
  if (err) {
    console.error('❌ Error checking tampilkan_konten column:', err.message);
    return;
  }
  
  if (!exists) {
    console.log('Adding tampilkan_konten column...');
    db.run(`
      ALTER TABLE pengumuman 
      ADD COLUMN tampilkan_konten INTEGER DEFAULT 1
    `, (err) => {
      if (err) {
        console.error('❌ Error adding tampilkan_konten:', err.message);
      } else {
        console.log('✅ Column tampilkan_konten added successfully');
      }
    });
  } else {
    console.log('✅ Column tampilkan_konten already exists');
  }
});

// Update existing records
setTimeout(() => {
  db.run(`
    UPDATE pengumuman 
    SET tampilkan_judul = 1
    WHERE tampilkan_judul IS NULL
  `, (err) => {
    if (err) {
      console.log('Note: tampilkan_judul update skipped (column may not exist yet)');
    } else {
      console.log('✅ Updated tampilkan_judul for existing records');
    }
  });
  
  db.run(`
    UPDATE pengumuman 
    SET tampilkan_konten = 1
    WHERE tampilkan_konten IS NULL
  `, (err) => {
    if (err) {
      console.log('Note: tampilkan_konten update skipped (column may not exist yet)');
    } else {
      console.log('✅ Updated tampilkan_konten for existing records');
    }
  });
  
  // Show table structure
  setTimeout(() => {
    db.all('PRAGMA table_info(pengumuman)', (err, rows) => {
      if (err) {
        console.error('❌ Error getting table info:', err.message);
      } else {
        console.log('\n📋 Current pengumuman table structure:');
        rows.forEach(row => {
          console.log(`  - ${row.name} (${row.type})`);
        });
      }
      
      console.log('\n✅ Migration completed!');
      db.close();
    });
  }, 1000);
}, 500);
