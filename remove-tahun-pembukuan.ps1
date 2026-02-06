# 🗑️ Script PowerShell untuk Menghapus Fitur Tahun Pembukuan
# Mengembalikan sistem ke kondisi normal tanpa kompleksitas tahun pembukuan

Write-Host "🗑️ Memulai penghapusan fitur tahun pembukuan..." -ForegroundColor Yellow
Write-Host "📋 Proses ini akan:" -ForegroundColor Cyan
Write-Host "   ✅ Menghapus function getTahunAktif() dari server.js" -ForegroundColor Green
Write-Host "   ✅ Update semua endpoint untuk menggunakan tanggal_transaksi" -ForegroundColor Green
Write-Host "   ✅ Menghapus section tahun pembukuan dari pengaturan" -ForegroundColor Green
Write-Host "   ✅ Membuat backup file asli" -ForegroundColor Green
Write-Host ""

# 1. Backup file asli
Write-Host "📦 Membuat backup file..." -ForegroundColor Blue

if (Test-Path "server.js") {
    Copy-Item "server.js" "server.js.backup"
    Write-Host "✅ Backup server.js dibuat" -ForegroundColor Green
} else {
    Write-Host "❌ File server.js tidak ditemukan" -ForegroundColor Red
    exit 1
}

if (Test-Path "public/js/pages.js") {
    Copy-Item "public/js/pages.js" "public/js/pages.js.backup"
    Write-Host "✅ Backup pages.js dibuat" -ForegroundColor Green
} else {
    Write-Host "❌ File public/js/pages.js tidak ditemukan" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 2. Update server.js
Write-Host "🔧 Mengupdate server.js..." -ForegroundColor Blue

$serverContent = Get-Content "server.js" -Raw

# Hapus function getTahunAktif
Write-Host "   🗑️ Menghapus function getTahunAktif()..." -ForegroundColor Yellow
$serverContent = $serverContent -replace "const getTahunAktif = \(\) => \{[^}]*\}(?:\s*\.\s*then\([^}]*\}[^}]*\}[^}]*\})?[^}]*\};?\s*", ""

# Update endpoint GET penjualan
Write-Host "   🔄 Update endpoint GET penjualan..." -ForegroundColor Yellow
$newPenjualanEndpoint = @"
app.get('/api/transaksi/penjualan', authenticateToken, (req, res) => {
  db.all(`SELECT tp.*, uu.nama_usaha 
          FROM transaksi_penjualan tp 
          LEFT JOIN unit_usaha uu ON tp.unit_usaha_id = uu.id 
          ORDER BY tp.tanggal_transaksi DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
"@

$serverContent = $serverContent -replace "app\.get\('/api/transaksi/penjualan'[^}]*\}\);", $newPenjualanEndpoint

# Update endpoint GET pengeluaran
Write-Host "   🔄 Update endpoint GET pengeluaran..." -ForegroundColor Yellow
$newPengeluaranEndpoint = @"
app.get('/api/transaksi/pengeluaran', authenticateToken, (req, res) => {
  db.all(`SELECT p.*, uu.nama_usaha 
          FROM pengeluaran p 
          LEFT JOIN unit_usaha uu ON p.unit_usaha_id = uu.id 
          ORDER BY p.tanggal_transaksi DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
"@

$serverContent = $serverContent -replace "app\.get\('/api/transaksi/pengeluaran'[^}]*\}\);", $newPengeluaranEndpoint

# Update endpoint GET pendapatan-lain
Write-Host "   🔄 Update endpoint GET pendapatan-lain..." -ForegroundColor Yellow
$newPendapatanLainEndpoint = @"
app.get('/api/transaksi/pendapatan-lain', authenticateToken, (req, res) => {
  db.all(`SELECT * FROM pendapatan_lain 
          ORDER BY tanggal_transaksi DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
"@

$serverContent = $serverContent -replace "app\.get\('/api/transaksi/pendapatan-lain'[^}]*\}\);", $newPendapatanLainEndpoint

# Update endpoint SHU
Write-Host "   🔄 Update endpoint SHU..." -ForegroundColor Yellow
$newSHUEndpoint = @"
app.post('/api/shu/hitung/:tahun', authenticateToken, async (req, res) => {
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
    
    // Hitung SHU berdasarkan data yang ditemukan
    const totalPenjualan = penjualan.reduce((sum, item) => sum + (item.jumlah_penjualan || 0), 0);
    const totalPendapatanLain = pendapatanLain.reduce((sum, item) => sum + (item.jumlah || 0), 0);
    const totalPendapatan = totalPenjualan + totalPendapatanLain;
    
    // Hitung biaya operasional (exclude pembelian barang & aset)
    const biayaOperasional = pengeluaran
      .filter(p => p.kategori !== 'Pembelian Barang' && p.kategori !== 'Pembelian Aset & Inventaris')
      .reduce((sum, item) => sum + (item.jumlah || 0), 0);
    
    const keuntunganBersih = Math.max(0, totalPendapatan - biayaOperasional);
    
    // Get total anggota aktif
    const totalAnggota = await new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as total FROM anggota WHERE status = "aktif"', [], (err, row) => {
        if (err) reject(err);
        else resolve(row?.total || 0);
      });
    });
    
    res.json({
      message: `SHU tahun ${tahun} berhasil dihitung`,
      keuntunganBersih: keuntunganBersih,
      totalAnggota: totalAnggota,
      totalPendapatan: totalPendapatan,
      biayaOperasional: biayaOperasional
    });
    
  } catch (error) {
    console.error('Error calculating SHU:', error);
    res.status(500).json({ error: error.message });
  }
});
"@

$serverContent = $serverContent -replace "app\.post\('/api/shu/hitung/:\w+'[^}]*\}\);", $newSHUEndpoint

# Update dashboard stats
Write-Host "   🔄 Update dashboard stats..." -ForegroundColor Yellow
$newDashboardEndpoint = @"
app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  const currentYear = new Date().getFullYear();
  
  // Query berdasarkan tanggal transaksi tahun berjalan
  db.all("SELECT * FROM transaksi_penjualan WHERE strftime('%Y', tanggal_transaksi) = ?", [currentYear], (err, penjualan) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.all("SELECT * FROM pendapatan_lain WHERE strftime('%Y', tanggal_transaksi) = ?", [currentYear], (err, pendapatanLain) => {
      if (err) return res.status(500).json({ error: err.message });
      
      db.all("SELECT * FROM pengeluaran WHERE strftime('%Y', tanggal_transaksi) = ?", [currentYear], (err, pengeluaran) => {
        if (err) return res.status(500).json({ error: err.message });
        
        // Hitung statistik
        const totalPenjualan = penjualan.reduce((sum, item) => sum + (item.jumlah_penjualan || 0), 0);
        const totalPendapatanLain = pendapatanLain.reduce((sum, item) => sum + (item.jumlah || 0), 0);
        const totalPendapatan = totalPenjualan + totalPendapatanLain;
        
        const biayaOperasional = pengeluaran
          .filter(p => p.kategori !== 'Pembelian Barang' && p.kategori !== 'Pembelian Aset & Inventaris')
          .reduce((sum, item) => sum + (item.jumlah || 0), 0);
        
        const labaKotor = totalPendapatan;
        const labaRugi = totalPendapatan - biayaOperasional;
        
        // Get data anggota dan simpanan
        db.all('SELECT COUNT(*) as total FROM anggota WHERE status = "aktif"', [], (err, anggotaRows) => {
          if (err) return res.status(500).json({ error: err.message });
          
          db.all('SELECT SUM(jumlah) as total FROM simpanan_pokok', [], (err, pokokRows) => {
            if (err) return res.status(500).json({ error: err.message });
            
            db.all('SELECT SUM(jumlah) as total FROM simpanan_wajib', [], (err, wajibRows) => {
              if (err) return res.status(500).json({ error: err.message });
              
              const totalAnggota = anggotaRows[0]?.total || 0;
              const totalSimpananPokok = pokokRows[0]?.total || 0;
              const totalSimpananWajib = wajibRows[0]?.total || 0;
              const totalSimpanan = totalSimpananPokok + totalSimpananWajib;
              
              res.json({
                totalAnggota,
                totalSimpanan,
                totalPendapatan,
                labaKotor,
                totalPengeluaran: biayaOperasional,
                labaRugi
              });
            });
          });
        });
      });
    });
  });
});
"@

$serverContent = $serverContent -replace "app\.get\('/api/dashboard/stats'[^}]*\}\);", $newDashboardEndpoint

# Simpan perubahan server.js
Set-Content "server.js" $serverContent
Write-Host "✅ server.js berhasil diupdate" -ForegroundColor Green

Write-Host ""

# 3. Update pages.js
Write-Host "🔧 Mengupdate pages.js..." -ForegroundColor Blue

$pagesContent = Get-Content "public/js/pages.js" -Raw

# Hapus section tahun pembukuan dari renderPengaturan
Write-Host "   🗑️ Menghapus section tahun pembukuan..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "<!-- Tahun Pembukuan Section -->[\s\S]*?</div>\s*</div>", ""

# Hapus functions tahun pembukuan
Write-Host "   🗑️ Menghapus function editTahunPembukuan..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "window\.editTahunPembukuan[\s\S]*?};\s*", ""

Write-Host "   🗑️ Menghapus function tutupBuku..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "window\.tutupBuku[\s\S]*?};\s*", ""

Write-Host "   🗑️ Menghapus function bukaTahunBaru..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "window\.bukaTahunBaru[\s\S]*?};\s*", ""

# Simpan perubahan pages.js
Set-Content "public/js/pages.js" $pagesContent
Write-Host "✅ pages.js berhasil diupdate" -ForegroundColor Green

Write-Host ""

# 4. Summary
Write-Host "🎉 Fitur tahun pembukuan berhasil dihapus!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Perubahan yang dilakukan:" -ForegroundColor Cyan
Write-Host "   ✅ Dihapus function getTahunAktif() dari server.js" -ForegroundColor Green
Write-Host "   ✅ Update endpoint penjualan menggunakan tanggal_transaksi" -ForegroundColor Green
Write-Host "   ✅ Update endpoint pengeluaran menggunakan tanggal_transaksi" -ForegroundColor Green
Write-Host "   ✅ Update endpoint pendapatan-lain menggunakan tanggal_transaksi" -ForegroundColor Green
Write-Host "   ✅ Update endpoint SHU menggunakan filter tanggal" -ForegroundColor Green
Write-Host "   ✅ Update dashboard stats menggunakan tahun berjalan" -ForegroundColor Green
Write-Host "   ✅ Dihapus section tahun pembukuan dari pengaturan" -ForegroundColor Green
Write-Host "   ✅ Dihapus functions tahun pembukuan dari pages.js" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Langkah selanjutnya:" -ForegroundColor Yellow
Write-Host "   1. Restart server aplikasi (node server.js)" -ForegroundColor White
Write-Host "   2. Test perhitungan SHU 2025" -ForegroundColor White
Write-Host "   3. Verifikasi semua menu transaksi berfungsi" -ForegroundColor White
Write-Host "   4. Test dashboard dan laporan keuangan" -ForegroundColor White
Write-Host ""
Write-Host "💾 File backup tersimpan:" -ForegroundColor Blue
Write-Host "   📄 server.js.backup" -ForegroundColor White
Write-Host "   📄 public/js/pages.js.backup" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Sistem sekarang kembali normal tanpa kompleksitas tahun pembukuan!" -ForegroundColor Green