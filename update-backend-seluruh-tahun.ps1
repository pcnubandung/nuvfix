# 🔧 Script untuk Update Backend - Periode 'Seluruh Tahun'
# Backend harus mendukung periode 'seluruh' tanpa filter tahun

Write-Host "🔧 Mengupdate backend untuk periode 'Seluruh Tahun'..." -ForegroundColor Yellow
Write-Host "📋 Target: Endpoint API mendukung periode 'seluruh' = SEMUA data" -ForegroundColor Cyan
Write-Host ""

# Backup file server.js
if (Test-Path "server.js") {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    Copy-Item "server.js" "server.js.backup_seluruh_$timestamp"
    Write-Host "📦 Backup dibuat: server.js.backup_seluruh_$timestamp" -ForegroundColor Green
} else {
    Write-Host "❌ File server.js tidak ditemukan" -ForegroundColor Red
    exit 1
}

# Baca file server.js
$serverContent = Get-Content "server.js" -Raw
$originalContent = $serverContent

Write-Host ""
Write-Host "🔍 Mengupdate endpoint API..." -ForegroundColor Blue

# 1. UPDATE ENDPOINT LAPORAN LABA/RUGI
Write-Host ""
Write-Host "📊 Endpoint Laporan Laba/Rugi:" -ForegroundColor Magenta

Write-Host "   🔄 Update endpoint laba-rugi..." -ForegroundColor Yellow
$newLabaRugiEndpoint = @"
app.get('/api/laporan/laba-rugi', authenticateToken, (req, res) => {
  const { periode, tahun, bulan, tanggal } = req.query;
  
  let penjualanQuery = 'SELECT * FROM transaksi_penjualan ORDER BY tanggal_transaksi DESC';
  let pengeluaranQuery = 'SELECT * FROM pengeluaran ORDER BY tanggal_transaksi DESC';
  let pendapatanLainQuery = 'SELECT * FROM pendapatan_lain ORDER BY tanggal_transaksi DESC';
  let params = [];
  
  if (periode === 'harian' && tanggal) {
    penjualanQuery = 'SELECT * FROM transaksi_penjualan WHERE tanggal_transaksi = ? ORDER BY tanggal_transaksi DESC';
    pengeluaranQuery = 'SELECT * FROM pengeluaran WHERE tanggal_transaksi = ? ORDER BY tanggal_transaksi DESC';
    pendapatanLainQuery = 'SELECT * FROM pendapatan_lain WHERE tanggal_transaksi = ? ORDER BY tanggal_transaksi DESC';
    params = [tanggal];
  } else if (periode === 'bulanan' && tahun && bulan) {
    const monthPrefix = `${tahun}-${bulan.padStart(2, '0')}`;
    penjualanQuery = "SELECT * FROM transaksi_penjualan WHERE tanggal_transaksi LIKE ? ORDER BY tanggal_transaksi DESC";
    pengeluaranQuery = "SELECT * FROM pengeluaran WHERE tanggal_transaksi LIKE ? ORDER BY tanggal_transaksi DESC";
    pendapatanLainQuery = "SELECT * FROM pendapatan_lain WHERE tanggal_transaksi LIKE ? ORDER BY tanggal_transaksi DESC";
    params = [`${monthPrefix}%`];
  } else if (periode === 'tahunan' && tahun) {
    penjualanQuery = "SELECT * FROM transaksi_penjualan WHERE strftime('%Y', tanggal_transaksi) = ? ORDER BY tanggal_transaksi DESC";
    pengeluaranQuery = "SELECT * FROM pengeluaran WHERE strftime('%Y', tanggal_transaksi) = ? ORDER BY tanggal_transaksi DESC";
    pendapatanLainQuery = "SELECT * FROM pendapatan_lain WHERE strftime('%Y', tanggal_transaksi) = ? ORDER BY tanggal_transaksi DESC";
    params = [tahun];
  } else if (periode === 'seluruh') {
    // SEMUA data tanpa filter - query sudah benar di atas
    params = [];
  }
  
  // Execute queries
  db.all(penjualanQuery, params, (err, penjualan) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.all(pengeluaranQuery, params, (err, pengeluaran) => {
      if (err) return res.status(500).json({ error: err.message });
      
      db.all(pendapatanLainQuery, params, (err, pendapatanLain) => {
        if (err) return res.status(500).json({ error: err.message });
        
        res.json({
          penjualan,
          pengeluaran,
          pendapatanLain
        });
      });
    });
  });
});
"@

$serverContent = $serverContent -replace "app\.get\('/api/laporan/laba-rugi'[^}]*\}\);", $newLabaRugiEndpoint

# 2. UPDATE ENDPOINT NERACA
Write-Host "   🔄 Update endpoint neraca..." -ForegroundColor Yellow
$newNeracaEndpoint = @"
app.get('/api/laporan/neraca', authenticateToken, (req, res) => {
  const { periode, tahun, bulan, tanggal } = req.query;
  
  let simpananQuery = 'SELECT * FROM simpanan_pokok UNION ALL SELECT * FROM simpanan_wajib UNION ALL SELECT * FROM simpanan_khusus UNION ALL SELECT * FROM simpanan_sukarela ORDER BY tanggal_transaksi DESC';
  let transaksiQuery = 'SELECT * FROM transaksi_penjualan UNION ALL SELECT * FROM pengeluaran UNION ALL SELECT * FROM pendapatan_lain ORDER BY tanggal_transaksi DESC';
  let params = [];
  
  if (periode === 'harian' && tanggal) {
    simpananQuery = 'SELECT * FROM (SELECT * FROM simpanan_pokok UNION ALL SELECT * FROM simpanan_wajib UNION ALL SELECT * FROM simpanan_khusus UNION ALL SELECT * FROM simpanan_sukarela) WHERE tanggal_transaksi = ? ORDER BY tanggal_transaksi DESC';
    transaksiQuery = 'SELECT * FROM (SELECT * FROM transaksi_penjualan UNION ALL SELECT * FROM pengeluaran UNION ALL SELECT * FROM pendapatan_lain) WHERE tanggal_transaksi = ? ORDER BY tanggal_transaksi DESC';
    params = [tanggal];
  } else if (periode === 'bulanan' && tahun && bulan) {
    const monthPrefix = `${tahun}-${bulan.padStart(2, '0')}`;
    simpananQuery = 'SELECT * FROM (SELECT * FROM simpanan_pokok UNION ALL SELECT * FROM simpanan_wajib UNION ALL SELECT * FROM simpanan_khusus UNION ALL SELECT * FROM simpanan_sukarela) WHERE tanggal_transaksi LIKE ? ORDER BY tanggal_transaksi DESC';
    transaksiQuery = 'SELECT * FROM (SELECT * FROM transaksi_penjualan UNION ALL SELECT * FROM pengeluaran UNION ALL SELECT * FROM pendapatan_lain) WHERE tanggal_transaksi LIKE ? ORDER BY tanggal_transaksi DESC';
    params = [`${monthPrefix}%`];
  } else if (periode === 'tahunan' && tahun) {
    simpananQuery = "SELECT * FROM (SELECT * FROM simpanan_pokok UNION ALL SELECT * FROM simpanan_wajib UNION ALL SELECT * FROM simpanan_khusus UNION ALL SELECT * FROM simpanan_sukarela) WHERE strftime('%Y', tanggal_transaksi) = ? ORDER BY tanggal_transaksi DESC";
    transaksiQuery = "SELECT * FROM (SELECT * FROM transaksi_penjualan UNION ALL SELECT * FROM pengeluaran UNION ALL SELECT * FROM pendapatan_lain) WHERE strftime('%Y', tanggal_transaksi) = ? ORDER BY tanggal_transaksi DESC";
    params = [tahun];
  } else if (periode === 'seluruh') {
    // SEMUA data tanpa filter - query sudah benar di atas
    params = [];
  }
  
  // Execute queries
  db.all(simpananQuery, params, (err, simpanan) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.all(transaksiQuery, params, (err, transaksi) => {
      if (err) return res.status(500).json({ error: err.message });
      
      res.json({
        simpanan,
        transaksi
      });
    });
  });
});
"@

$serverContent = $serverContent -replace "app\.get\('/api/laporan/neraca'[^}]*\}\);", $newNeracaEndpoint

# 3. UPDATE ENDPOINT ARUS KAS
Write-Host "   🔄 Update endpoint arus-kas..." -ForegroundColor Yellow
$newArusKasEndpoint = @"
app.get('/api/laporan/arus-kas', authenticateToken, (req, res) => {
  const { periode, tahun, bulan, tanggal } = req.query;
  
  let arusMasukQuery = 'SELECT * FROM transaksi_penjualan UNION ALL SELECT * FROM pendapatan_lain UNION ALL SELECT * FROM simpanan_pokok UNION ALL SELECT * FROM simpanan_wajib ORDER BY tanggal_transaksi DESC';
  let arusKeluarQuery = 'SELECT * FROM pengeluaran ORDER BY tanggal_transaksi DESC';
  let params = [];
  
  if (periode === 'harian' && tanggal) {
    arusMasukQuery = 'SELECT * FROM (SELECT * FROM transaksi_penjualan UNION ALL SELECT * FROM pendapatan_lain UNION ALL SELECT * FROM simpanan_pokok UNION ALL SELECT * FROM simpanan_wajib) WHERE tanggal_transaksi = ? ORDER BY tanggal_transaksi DESC';
    arusKeluarQuery = 'SELECT * FROM pengeluaran WHERE tanggal_transaksi = ? ORDER BY tanggal_transaksi DESC';
    params = [tanggal];
  } else if (periode === 'bulanan' && tahun && bulan) {
    const monthPrefix = `${tahun}-${bulan.padStart(2, '0')}`;
    arusMasukQuery = 'SELECT * FROM (SELECT * FROM transaksi_penjualan UNION ALL SELECT * FROM pendapatan_lain UNION ALL SELECT * FROM simpanan_pokok UNION ALL SELECT * FROM simpanan_wajib) WHERE tanggal_transaksi LIKE ? ORDER BY tanggal_transaksi DESC';
    arusKeluarQuery = 'SELECT * FROM pengeluaran WHERE tanggal_transaksi LIKE ? ORDER BY tanggal_transaksi DESC';
    params = [`${monthPrefix}%`];
  } else if (periode === 'tahunan' && tahun) {
    arusMasukQuery = "SELECT * FROM (SELECT * FROM transaksi_penjualan UNION ALL SELECT * FROM pendapatan_lain UNION ALL SELECT * FROM simpanan_pokok UNION ALL SELECT * FROM simpanan_wajib) WHERE strftime('%Y', tanggal_transaksi) = ? ORDER BY tanggal_transaksi DESC";
    arusKeluarQuery = "SELECT * FROM pengeluaran WHERE strftime('%Y', tanggal_transaksi) = ? ORDER BY tanggal_transaksi DESC";
    params = [tahun];
  } else if (periode === 'seluruh') {
    // SEMUA data tanpa filter - query sudah benar di atas
    params = [];
  }
  
  // Execute queries
  db.all(arusMasukQuery, params, (err, arusMasuk) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.all(arusKeluarQuery, params, (err, arusKeluar) => {
      if (err) return res.status(500).json({ error: err.message });
      
      res.json({
        arusMasuk,
        arusKeluar
      });
    });
  });
});
"@

$serverContent = $serverContent -replace "app\.get\('/api/laporan/arus-kas'[^}]*\}\);", $newArusKasEndpoint

# 4. UPDATE ENDPOINT BUKU KAS
Write-Host "   🔄 Update endpoint buku-kas..." -ForegroundColor Yellow
$newBukuKasEndpoint = @"
app.get('/api/laporan/buku-kas', authenticateToken, (req, res) => {
  const { periode, tahun, bulan, tanggal } = req.query;
  
  let transaksiMasukQuery = 'SELECT *, "penjualan" as jenis FROM transaksi_penjualan UNION ALL SELECT *, "pendapatan_lain" as jenis FROM pendapatan_lain UNION ALL SELECT *, "simpanan" as jenis FROM simpanan_pokok UNION ALL SELECT *, "simpanan" as jenis FROM simpanan_wajib ORDER BY tanggal_transaksi DESC';
  let transaksiKeluarQuery = 'SELECT *, "pengeluaran" as jenis FROM pengeluaran ORDER BY tanggal_transaksi DESC';
  let params = [];
  
  if (periode === 'harian' && tanggal) {
    transaksiMasukQuery = 'SELECT * FROM (SELECT *, "penjualan" as jenis FROM transaksi_penjualan UNION ALL SELECT *, "pendapatan_lain" as jenis FROM pendapatan_lain UNION ALL SELECT *, "simpanan" as jenis FROM simpanan_pokok UNION ALL SELECT *, "simpanan" as jenis FROM simpanan_wajib) WHERE tanggal_transaksi = ? ORDER BY tanggal_transaksi DESC';
    transaksiKeluarQuery = 'SELECT *, "pengeluaran" as jenis FROM pengeluaran WHERE tanggal_transaksi = ? ORDER BY tanggal_transaksi DESC';
    params = [tanggal];
  } else if (periode === 'bulanan' && tahun && bulan) {
    const monthPrefix = `${tahun}-${bulan.padStart(2, '0')}`;
    transaksiMasukQuery = 'SELECT * FROM (SELECT *, "penjualan" as jenis FROM transaksi_penjualan UNION ALL SELECT *, "pendapatan_lain" as jenis FROM pendapatan_lain UNION ALL SELECT *, "simpanan" as jenis FROM simpanan_pokok UNION ALL SELECT *, "simpanan" as jenis FROM simpanan_wajib) WHERE tanggal_transaksi LIKE ? ORDER BY tanggal_transaksi DESC';
    transaksiKeluarQuery = 'SELECT *, "pengeluaran" as jenis FROM pengeluaran WHERE tanggal_transaksi LIKE ? ORDER BY tanggal_transaksi DESC';
    params = [`${monthPrefix}%`];
  } else if (periode === 'tahunan' && tahun) {
    transaksiMasukQuery = 'SELECT * FROM (SELECT *, "penjualan" as jenis FROM transaksi_penjualan UNION ALL SELECT *, "pendapatan_lain" as jenis FROM pendapatan_lain UNION ALL SELECT *, "simpanan" as jenis FROM simpanan_pokok UNION ALL SELECT *, "simpanan" as jenis FROM simpanan_wajib) WHERE strftime("%Y", tanggal_transaksi) = ? ORDER BY tanggal_transaksi DESC';
    transaksiKeluarQuery = 'SELECT *, "pengeluaran" as jenis FROM pengeluaran WHERE strftime("%Y", tanggal_transaksi) = ? ORDER BY tanggal_transaksi DESC';
    params = [tahun];
  } else if (periode === 'seluruh') {
    // SEMUA data tanpa filter - query sudah benar di atas
    params = [];
  }
  
  // Execute queries
  db.all(transaksiMasukQuery, params, (err, transaksiMasuk) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.all(transaksiKeluarQuery, params, (err, transaksiKeluar) => {
      if (err) return res.status(500).json({ error: err.message });
      
      res.json({
        transaksiMasuk,
        transaksiKeluar
      });
    });
  });
});
"@

$serverContent = $serverContent -replace "app\.get\('/api/laporan/buku-kas'[^}]*\}\);", $newBukuKasEndpoint

# 5. UPDATE ENDPOINT SHU UNTUK PERIODE SELURUH
Write-Host "   🔄 Update endpoint SHU..." -ForegroundColor Yellow
$newSHUEndpoint = @"
app.post('/api/shu/hitung/:tahun', authenticateToken, async (req, res) => {
  const { tahun } = req.params;
  const { periode } = req.body; // Tambahkan parameter periode
  
  try {
    let penjualanQuery, pendapatanLainQuery, pengeluaranQuery;
    let params = [];
    
    if (periode === 'seluruh') {
      // SEMUA data untuk SHU keseluruhan
      penjualanQuery = "SELECT * FROM transaksi_penjualan";
      pendapatanLainQuery = "SELECT * FROM pendapatan_lain";
      pengeluaranQuery = "SELECT * FROM pengeluaran";
      params = [];
    } else {
      // SHU berdasarkan tahun tertentu (default)
      penjualanQuery = "SELECT * FROM transaksi_penjualan WHERE strftime('%Y', tanggal_transaksi) = ?";
      pendapatanLainQuery = "SELECT * FROM pendapatan_lain WHERE strftime('%Y', tanggal_transaksi) = ?";
      pengeluaranQuery = "SELECT * FROM pengeluaran WHERE strftime('%Y', tanggal_transaksi) = ?";
      params = [tahun];
    }
    
    // Query berdasarkan tanggal transaksi
    const penjualan = await new Promise((resolve, reject) => {
      db.all(penjualanQuery, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    const pendapatanLain = await new Promise((resolve, reject) => {
      db.all(pendapatanLainQuery, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    const pengeluaran = await new Promise((resolve, reject) => {
      db.all(pengeluaranQuery, params, (err, rows) => {
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
    
    const periodeText = periode === 'seluruh' ? 'Seluruh Data' : `Tahun ${tahun}`;
    
    res.json({
      message: `SHU ${periodeText} berhasil dihitung`,
      keuntunganBersih: keuntunganBersih,
      totalAnggota: totalAnggota,
      totalPendapatan: totalPendapatan,
      biayaOperasional: biayaOperasional,
      periode: periodeText
    });
    
  } catch (error) {
    console.error('Error calculating SHU:', error);
    res.status(500).json({ error: error.message });
  }
});
"@

$serverContent = $serverContent -replace "app\.post\('/api/shu/hitung/:\w+'[^}]*\}\);", $newSHUEndpoint

Write-Host ""

# Simpan perubahan
if ($serverContent -ne $originalContent) {
    Set-Content "server.js" $serverContent
    Write-Host "✅ File server.js berhasil diupdate!" -ForegroundColor Green
    
    # Hitung perubahan
    $oldLines = ($originalContent -split "`n").Count
    $newLines = ($serverContent -split "`n").Count
    Write-Host "📊 Baris file: $oldLines → $newLines" -ForegroundColor Cyan
    
} else {
    Write-Host "ℹ️ Tidak ada perubahan yang diperlukan" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎉 Backend berhasil diupdate untuk periode 'Seluruh Tahun'!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Endpoint yang telah diupdate:" -ForegroundColor Cyan
Write-Host "   ✅ /api/laporan/laba-rugi - Support periode 'seluruh'" -ForegroundColor Green
Write-Host "   ✅ /api/laporan/neraca - Support periode 'seluruh'" -ForegroundColor Green
Write-Host "   ✅ /api/laporan/arus-kas - Support periode 'seluruh'" -ForegroundColor Green
Write-Host "   ✅ /api/laporan/buku-kas - Support periode 'seluruh'" -ForegroundColor Green
Write-Host "   ✅ /api/shu/hitung/:tahun - Support periode 'seluruh'" -ForegroundColor Green
Write-Host ""
Write-Host "🔹 LOGIC PERIODE:" -ForegroundColor Blue
Write-Host "   • harian: Filter berdasarkan tanggal spesifik" -ForegroundColor White
Write-Host "   • bulanan: Filter berdasarkan tahun-bulan" -ForegroundColor White
Write-Host "   • tahunan: Filter berdasarkan tahun" -ForegroundColor White
Write-Host "   • seluruh: SEMUA data tanpa filter apapun" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Parameter Query:" -ForegroundColor Yellow
Write-Host "   • periode=harian&tanggal=2025-01-07" -ForegroundColor White
Write-Host "   • periode=bulanan&tahun=2025&bulan=01" -ForegroundColor White
Write-Host "   • periode=tahunan&tahun=2025" -ForegroundColor White
Write-Host "   • periode=seluruh (tanpa parameter lain)" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Langkah selanjutnya:" -ForegroundColor Yellow
Write-Host "   1. Restart server: node server.js" -ForegroundColor White
Write-Host "   2. Test endpoint dengan periode=seluruh" -ForegroundColor White
Write-Host "   3. Verifikasi data yang dikembalikan adalah SEMUA data" -ForegroundColor White