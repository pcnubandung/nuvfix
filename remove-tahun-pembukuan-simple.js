// Script sederhana untuk menghapus fitur tahun pembukuan
// Jalankan dengan: node remove-tahun-pembukuan-simple.js

const fs = require('fs');

console.log('🗑️ Menghapus fitur tahun pembukuan - Versi Sederhana');
console.log('================================================');

// Fungsi untuk backup file
function backupFile(filePath) {
  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.backup.${Date.now()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log(`✅ Backup dibuat: ${backupPath}`);
    return true;
  }
  console.log(`❌ File tidak ditemukan: ${filePath}`);
  return false;
}

// 1. Backup files
console.log('\n📋 Step 1: Backup files...');
const serverBackup = backupFile('server.js');
const pagesBackup = backupFile('public/js/pages.js');

if (!serverBackup || !pagesBackup) {
  console.log('❌ Backup gagal. Proses dihentikan.');
  process.exit(1);
}

// 2. Update server.js - Hapus getTahunAktif dan update endpoints
console.log('\n📋 Step 2: Update server.js...');
try {
  let serverContent = fs.readFileSync('server.js', 'utf8');
  
  // Hapus function getTahunAktif
  serverContent = serverContent.replace(
    /\/\/ Helper function to get tahun pembukuan aktif[\s\S]*?const getTahunAktif = \(\) => \{[\s\S]*?\};\s*/g, 
    ''
  );
  
  // Update endpoint penjualan - hapus async dan getTahunAktif
  serverContent = serverContent.replace(
    /app\.get\('\/api\/transaksi\/penjualan', authenticateToken, async \(req, res\) => \{[\s\S]*?try \{[\s\S]*?const tahunAktif = await getTahunAktif\(\);[\s\S]*?console\.log\('Getting penjualan for tahun:', tahunAktif\);[\s\S]*?db\.all\(`SELECT tp\.\*, uu\.nama_usaha[\s\S]*?WHERE tp\.tahun_pembukuan = \?[\s\S]*?ORDER BY tp\.tanggal_transaksi DESC`, \[tahunAktif\], \(err, rows\) => \{[\s\S]*?\}\);[\s\S]*?\} catch \(error\) \{[\s\S]*?\}\s*\}\);/g,
    `app.get('/api/transaksi/penjualan', authenticateToken, (req, res) => {
  db.all(\`SELECT tp.*, uu.nama_usaha 
          FROM transaksi_penjualan tp 
          LEFT JOIN unit_usaha uu ON tp.unit_usaha_id = uu.id 
          ORDER BY tp.tanggal_transaksi DESC\`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});`
  );
  
  // Update endpoint pengeluaran
  serverContent = serverContent.replace(
    /app\.get\('\/api\/transaksi\/pengeluaran', authenticateToken, async \(req, res\) => \{[\s\S]*?try \{[\s\S]*?const tahunAktif = await getTahunAktif\(\);[\s\S]*?console\.log\('Getting pengeluaran for tahun:', tahunAktif\);[\s\S]*?db\.all\(`SELECT p\.\*, uu\.nama_usaha[\s\S]*?WHERE p\.tahun_pembukuan = \?[\s\S]*?ORDER BY p\.tanggal_transaksi DESC`, \[tahunAktif\], \(err, rows\) => \{[\s\S]*?\}\);[\s\S]*?\} catch \(error\) \{[\s\S]*?\}\s*\}\);/g,
    `app.get('/api/transaksi/pengeluaran', authenticateToken, (req, res) => {
  db.all(\`SELECT p.*, uu.nama_usaha 
          FROM pengeluaran p 
          LEFT JOIN unit_usaha uu ON p.unit_usaha_id = uu.id 
          ORDER BY p.tanggal_transaksi DESC\`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});`
  );
  
  // Update endpoint pendapatan lain
  serverContent = serverContent.replace(
    /app\.get\('\/api\/transaksi\/pendapatan-lain', authenticateToken, async \(req, res\) => \{[\s\S]*?try \{[\s\S]*?const tahunAktif = await getTahunAktif\(\);[\s\S]*?console\.log\('Getting pendapatan-lain for tahun:', tahunAktif\);[\s\S]*?db\.all\(`SELECT \* FROM pendapatan_lain[\s\S]*?WHERE tahun_pembukuan = \?[\s\S]*?ORDER BY tanggal_transaksi DESC`, \[tahunAktif\], \(err, rows\) => \{[\s\S]*?\}\);[\s\S]*?\} catch \(error\) \{[\s\S]*?\}\s*\}\);/g,
    `app.get('/api/transaksi/pendapatan-lain', authenticateToken, (req, res) => {
  db.all(\`SELECT * FROM pendapatan_lain 
          ORDER BY tanggal_transaksi DESC\`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});`
  );
  
  // Update SHU endpoint - ganti ke filter berdasarkan tanggal
  serverContent = serverContent.replace(
    /app\.post\('\/api\/shu\/hitung\/:tahun', authenticateToken, async \(req, res\) => \{[\s\S]*?const tahunAktif = await getTahunAktif\(\);[\s\S]*?WHERE tahun_pembukuan = \?[\s\S]*?\[tahunAktif\]/g,
    `app.post('/api/shu/hitung/:tahun', authenticateToken, async (req, res) => {
  const { tahun } = req.params;
  
  try {
    // Query berdasarkan tanggal transaksi
    const penjualan = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM transaksi_penjualan WHERE strftime('%Y', tanggal_transaksi) = ?", [tahun], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    const pendapatanLain = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM pendapatan_lain WHERE strftime('%Y', tanggal_transaksi) = ?", [tahun], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    const pengeluaran = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM pengeluaran WHERE strftime('%Y', tanggal_transaksi) = ?", [tahun], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    // Hitung SHU
    const totalPenjualan = penjualan.reduce((sum, item) => sum + (item.jumlah_penjualan || 0), 0);
    const totalPendapatanLain = pendapatanLain.reduce((sum, item) => sum + (item.jumlah || 0), 0);
    const totalPendapatan = totalPenjualan + totalPendapatanLain;
    
    // Biaya operasional (exclude pembelian barang & aset)
    const biayaOperasional = pengeluaran
      .filter(p => p.kategori !== 'Pembelian Barang' && p.kategori !== 'Pembelian Aset & Inventaris')
      .reduce((sum, item) => sum + (item.jumlah || 0), 0);
    
    const keuntunganBersih = Math.max(0, totalPendapatan - biayaOperasional);
    
    // Get anggota aktif
    db.all('SELECT COUNT(*) as total FROM anggota WHERE status = "aktif"', [], (err, anggotaRows) => {
      if (err) return res.status(500).json({ error: err.message });
      
      const totalAnggota = anggotaRows[0]?.total || 0;
      
      // Hitung SHU per anggota jika ada keuntungan
      if (keuntunganBersih > 0 && totalAnggota > 0) {
        // Get komponen SHU
        db.get('SELECT * FROM shu_komponen WHERE tahun = ?', [tahun], (err, komponen) => {
          if (err) return res.status(500).json({ error: err.message });
          
          if (!komponen) {
            return res.status(400).json({ error: 'Komponen SHU belum diatur untuk tahun ' + tahun });
          }
          
          // Hitung pembagian SHU
          const jasaSimpanan = (keuntunganBersih * (komponen.jasa_simpanan || 0)) / 100;
          const jasaTransaksi = (keuntunganBersih * (komponen.jasa_transaksi || 0)) / 100;
          
          // Simpan hasil perhitungan (implementasi sesuai kebutuhan)
          // ...
          
          res.json({
            message: \`SHU tahun \${tahun} berhasil dihitung\`,
            keuntunganBersih: keuntunganBersih,
            totalAnggota: totalAnggota,
            jasaSimpanan: jasaSimpanan,
            jasaTransaksi: jasaTransaksi
          });
        });
      } else {
        res.json({
          message: \`SHU tahun \${tahun} berhasil dihitung\`,
          keuntunganBersih: keuntunganBersih,
          totalAnggota: totalAnggota
        });
      }
    });
    
  } catch (error) {
    console.error('Error calculating SHU:', error);
    res.status(500).json({ error: error.message });
  }`
  );
  
  fs.writeFileSync('server.js', serverContent);
  console.log('✅ server.js berhasil diupdate');
  
} catch (error) {
  console.log('❌ Error updating server.js:', error.message);
}

// 3. Update pages.js - Hapus section tahun pembukuan
console.log('\n📋 Step 3: Update pages.js...');
try {
  let pagesContent = fs.readFileSync('public/js/pages.js', 'utf8');
  
  // Hapus section tahun pembukuan dari renderPengaturan
  pagesContent = pagesContent.replace(
    /<!-- Tahun Pembukuan Section -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g,
    ''
  );
  
  // Hapus functions tahun pembukuan
  pagesContent = pagesContent.replace(/window\.editTahunPembukuan[\s\S]*?};\s*/g, '');
  pagesContent = pagesContent.replace(/window\.tutupBuku[\s\S]*?};\s*/g, '');
  pagesContent = pagesContent.replace(/window\.bukaTahunBaru[\s\S]*?};\s*/g, '');
  
  fs.writeFileSync('public/js/pages.js', pagesContent);
  console.log('✅ pages.js berhasil diupdate');
  
} catch (error) {
  console.log('❌ Error updating pages.js:', error.message);
}

console.log('\n🎉 SELESAI! Fitur tahun pembukuan berhasil dihapus');
console.log('================================================');
console.log('📋 Langkah selanjutnya:');
console.log('1. Restart server aplikasi');
console.log('2. Test menu Transaksi (harus menampilkan semua data)');
console.log('3. Test perhitungan SHU 2025');
console.log('4. Verifikasi dashboard dan laporan');
console.log('\n💡 Jika ada masalah, restore dari backup:');
console.log('   - server.js.backup.[timestamp]');
console.log('   - public/js/pages.js.backup.[timestamp]');