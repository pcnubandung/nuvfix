// Script to update server.js endpoints with tahun_pembukuan filter
// This is a reference guide for manual updates

const endpointsToUpdate = {
  
  // ===== TRANSAKSI PENJUALAN =====
  'GET /api/transaksi/penjualan': {
    before: `
app.get('/api/transaksi/penjualan', authenticateToken, (req, res) => {
  db.all(\`SELECT tp.*, uu.nama_usaha 
          FROM transaksi_penjualan tp 
          LEFT JOIN unit_usaha uu ON tp.unit_usaha_id = uu.id 
          ORDER BY tp.tanggal_transaksi DESC\`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});`,
    after: `
app.get('/api/transaksi/penjualan', authenticateToken, async (req, res) => {
  try {
    const tahunAktif = await getTahunAktif();
    db.all(\`SELECT tp.*, uu.nama_usaha 
            FROM transaksi_penjualan tp 
            LEFT JOIN unit_usaha uu ON tp.unit_usaha_id = uu.id 
            WHERE tp.tahun_pembukuan = ?
            ORDER BY tp.tanggal_transaksi DESC\`, [tahunAktif], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`
  },

  // ===== PENGELUARAN =====
  'GET /api/transaksi/pengeluaran': {
    before: `
app.get('/api/transaksi/pengeluaran', authenticateToken, (req, res) => {
  db.all(\`SELECT p.*, uu.nama_usaha 
          FROM pengeluaran p 
          LEFT JOIN unit_usaha uu ON p.unit_usaha_id = uu.id 
          ORDER BY p.tanggal_transaksi DESC\`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});`,
    after: `
app.get('/api/transaksi/pengeluaran', authenticateToken, async (req, res) => {
  try {
    const tahunAktif = await getTahunAktif();
    db.all(\`SELECT p.*, uu.nama_usaha 
            FROM pengeluaran p 
            LEFT JOIN unit_usaha uu ON p.unit_usaha_id = uu.id 
            WHERE p.tahun_pembukuan = ?
            ORDER BY p.tanggal_transaksi DESC\`, [tahunAktif], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`
  },

  // ===== PARTISIPASI =====
  'GET /api/partisipasi': {
    before: `
app.get('/api/partisipasi', authenticateToken, (req, res) => {
  db.all(\`SELECT pa.*, a.nama_lengkap, a.nomor_anggota, uu.nama_usaha 
          FROM partisipasi_anggota pa 
          LEFT JOIN anggota a ON pa.anggota_id = a.id 
          LEFT JOIN unit_usaha uu ON pa.unit_usaha_id = uu.id 
          ORDER BY pa.tanggal_transaksi DESC\`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});`,
    after: `
app.get('/api/partisipasi', authenticateToken, async (req, res) => {
  try {
    const tahunAktif = await getTahunAktif();
    db.all(\`SELECT pa.*, a.nama_lengkap, a.nomor_anggota, uu.nama_usaha 
            FROM partisipasi_anggota pa 
            LEFT JOIN anggota a ON pa.anggota_id = a.id 
            LEFT JOIN unit_usaha uu ON pa.unit_usaha_id = uu.id 
            WHERE pa.tahun_pembukuan = ?
            ORDER BY pa.tanggal_transaksi DESC\`, [tahunAktif], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`
  },

  // ===== PENDAPATAN LAIN =====
  'GET /api/transaksi/pendapatan-lain': {
    before: `
app.get('/api/transaksi/pendapatan-lain', authenticateToken, (req, res) => {
  db.all(\`SELECT pl.*, uu.nama_usaha 
          FROM pendapatan_lain pl 
          LEFT JOIN unit_usaha uu ON