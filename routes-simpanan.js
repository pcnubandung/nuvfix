const express = require('express');
const router = express.Router();
const db = require('./database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const emailService = require('./helpers/email-service');

// Use UPLOAD_PATH from environment or default
const UPLOAD_PATH = process.env.UPLOAD_PATH || path.join(__dirname, 'public', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
  console.log(`✅ Routes-simpanan: Created upload directory: ${UPLOAD_PATH}`);
}

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    cb(null, UPLOAD_PATH); 
  },
  filename: (req, file, cb) => { 
    cb(null, Date.now() + '-' + file.originalname); 
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Format file tidak didukung. Gunakan JPG, PNG, GIF, atau PDF'));
    }
  }
});

// Helper function untuk format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Helper function untuk log activity
const logActivity = (req, action, module, description) => {
  if (req.user) {
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent') || '';
    
    db.run(
      `INSERT INTO activity_log (user_id, username, action, module, description, ip_address, user_agent) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, req.user.username, action, module, description, ip, userAgent],
      (err) => {
        if (err) console.error('Error logging activity:', err);
      }
    );
  }
};

// Helper function untuk kirim email notifikasi pembayaran
const sendPaymentNotification = async (anggotaId, simpananData) => {
  if (process.env.ENABLE_EMAIL_NOTIFICATIONS !== 'true') return;
  
  try {
    // Get anggota data
    const anggota = await new Promise((resolve, reject) => {
      db.get('SELECT nama_lengkap, email FROM anggota WHERE id = ?', [anggotaId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (!anggota || !anggota.email) {
      console.log('⚠️ Anggota tidak punya email, skip notifikasi');
      return;
    }
    
    // Get total saldo
    const saldoTotal = await new Promise((resolve, reject) => {
      const queries = [
        'SELECT COALESCE(SUM(jumlah), 0) as total FROM simpanan_pokok WHERE anggota_id = ?',
        'SELECT COALESCE(SUM(jumlah), 0) as total FROM simpanan_wajib WHERE anggota_id = ?',
        'SELECT COALESCE(SUM(jumlah), 0) as total FROM simpanan_khusus WHERE anggota_id = ?',
        'SELECT COALESCE(SUM(jumlah), 0) as total FROM simpanan_sukarela WHERE anggota_id = ?'
      ];
      
      Promise.all(queries.map(q => new Promise((res, rej) => {
        db.get(q, [anggotaId], (err, row) => {
          if (err) rej(err);
          else res(row.total);
        });
      }))).then(totals => {
        resolve(totals.reduce((a, b) => a + b, 0));
      }).catch(reject);
    });
    
    const emailData = {
      ...anggota,
      ...simpananData,
      saldo_total: saldoTotal
    };
    
    console.log('📧 Sending payment notification to:', anggota.email);
    
    if (simpananData.jumlah < 0) {
      await emailService.sendWithdrawalConfirmationEmail(anggota, emailData);
    } else {
      await emailService.sendPaymentConfirmationEmail(anggota, emailData);
    }
  } catch (error) {
    console.error('❌ Failed to send payment notification:', error.message);
  }
};

// Get All Simpanan (untuk Buku Kas)
router.get('/all', (req, res) => {
  // Get all simpanan from all tables (only approved)
  const queries = [
    `SELECT id, anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, 'Pokok' as jenis_simpanan 
     FROM simpanan_pokok WHERE status = 'approved' OR status IS NULL`,
    `SELECT id, anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, 'Wajib' as jenis_simpanan 
     FROM simpanan_wajib WHERE status = 'approved' OR status IS NULL`,
    `SELECT id, anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, 'Khusus' as jenis_simpanan 
     FROM simpanan_khusus WHERE status = 'approved' OR status IS NULL`,
    `SELECT id, anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, 'Sukarela' as jenis_simpanan 
     FROM simpanan_sukarela WHERE status = 'approved' OR status IS NULL`
  ];
  
  const unionQuery = queries.join(' UNION ALL ');
  const finalQuery = `
    SELECT s.*, a.nama_lengkap, a.nomor_anggota 
    FROM (${unionQuery}) s
    JOIN anggota a ON s.anggota_id = a.id
    ORDER BY s.tanggal_transaksi DESC
  `;
  
  db.all(finalQuery, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Simpanan Pokok
router.get('/pokok', (req, res) => {
  console.log('GET /pokok - Fetching data...');
  
  // First, let's check all data without JOIN to see if records exist
  db.all(`SELECT * FROM simpanan_pokok ORDER BY tanggal_transaksi DESC`, [], (err, allRows) => {
    if (err) {
      console.error('Error fetching all simpanan_pokok:', err);
    } else {
      console.log('Total simpanan_pokok in DB:', allRows.length);
      console.log('Sample data:', allRows.slice(0, 2));
    }
  });
  
  // Try with status filter and LEFT JOIN (to include records even if anggota not found)
  db.all(`SELECT sp.*, a.nama_lengkap, a.nomor_anggota 
          FROM simpanan_pokok sp 
          LEFT JOIN anggota a ON sp.anggota_id = a.id 
          WHERE sp.status = 'approved' OR sp.status IS NULL
          ORDER BY sp.tanggal_transaksi DESC`, [], (err, rows) => {
    if (err && err.message.includes('no such column')) {
      console.log('Status column not found, fetching all with LEFT JOIN...');
      // Status column doesn't exist, get all
      db.all(`SELECT sp.*, a.nama_lengkap, a.nomor_anggota 
              FROM simpanan_pokok sp 
              LEFT JOIN anggota a ON sp.anggota_id = a.id 
              ORDER BY sp.tanggal_transaksi DESC`, [], (err2, rows2) => {
        if (err2) {
          console.error('Error fetching simpanan_pokok (no status):', err2);
          return res.status(500).json({ error: err2.message });
        }
        console.log('Simpanan pokok fetched (no status):', rows2.length, 'rows');
        res.json(rows2);
      });
    } else if (err) {
      console.error('Error fetching simpanan_pokok:', err);
      return res.status(500).json({ error: err.message });
    } else {
      console.log('Simpanan pokok fetched with filter:', rows.length, 'rows');
      console.log('Sample filtered data:', rows.slice(0, 2));
      res.json(rows);
    }
  });
});

router.post('/pokok', upload.single('bukti_pembayaran'), (req, res) => {
  let { anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan } = req.body;
  const bukti_pembayaran = req.file ? req.file.filename : null;
  
  // Convert anggota_id to integer to ensure consistency
  anggota_id = parseInt(anggota_id);
  
  console.log('POST /pokok - Data received:', { 
    anggota_id, 
    anggota_id_type: typeof anggota_id,
    jumlah, 
    tanggal_transaksi, 
    metode_pembayaran, 
    keterangan, 
    bukti_pembayaran 
  });
  
  if (!anggota_id || isNaN(anggota_id)) {
    console.error('Invalid anggota_id:', req.body.anggota_id);
    return res.status(400).json({ error: 'anggota_id tidak valid' });
  }
  
  // Get anggota name first
  db.get('SELECT id, nama_lengkap, nomor_anggota FROM anggota WHERE id = ?', [anggota_id], (err, anggota) => {
    if (err) {
      console.error('Error getting anggota:', err);
      return res.status(500).json({ error: err.message });
    }
    
    console.log('Anggota found:', anggota);
    
    if (!anggota) {
      console.error('Anggota not found for ID:', anggota_id);
      // Check if anggota exists at all
      db.all('SELECT id, nama_lengkap FROM anggota LIMIT 5', [], (err, allAnggota) => {
        console.log('Sample anggota in DB:', allAnggota);
      });
      return res.status(404).json({ error: 'Anggota tidak ditemukan' });
    }
    
    db.run('INSERT INTO simpanan_pokok (anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, 'approved'],
      function(err) {
        if (err) {
          console.error('Error inserting simpanan_pokok:', err);
          return res.status(500).json({ error: err.message });
        }
        
        console.log('Simpanan pokok inserted with ID:', this.lastID);
        
        // Log activity
        const anggotaName = anggota ? anggota.nama_lengkap : 'Unknown';
        logActivity(
          req, 
          'CREATE', 
          'Simpanan', 
          `Menambahkan simpanan pokok ${formatCurrency(jumlah)} untuk ${anggotaName}`
        );
        
        res.json({ 
          message: 'Simpanan pokok berhasil ditambahkan', 
          id: this.lastID,
          bukti_pembayaran: bukti_pembayaran,
          status: 'approved',
          anggota: anggota.nama_lengkap
        });
      }
    );
  });
});

// Simpanan Wajib
router.get('/wajib', (req, res) => {
  db.all(`SELECT sw.*, a.nama_lengkap, a.nomor_anggota 
          FROM simpanan_wajib sw 
          JOIN anggota a ON sw.anggota_id = a.id 
          WHERE sw.status = 'approved' OR sw.status IS NULL
          ORDER BY sw.tanggal_transaksi DESC`, [], (err, rows) => {
    if (err && err.message.includes('no such column')) {
      db.all(`SELECT sw.*, a.nama_lengkap, a.nomor_anggota 
              FROM simpanan_wajib sw 
              JOIN anggota a ON sw.anggota_id = a.id 
              ORDER BY sw.tanggal_transaksi DESC`, [], (err2, rows2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json(rows2);
      });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

router.post('/wajib', upload.single('bukti_pembayaran'), (req, res) => {
  let { anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan } = req.body;
  const bukti_pembayaran = req.file ? req.file.filename : null;
  
  // Convert anggota_id to integer
  anggota_id = parseInt(anggota_id);
  
  if (!anggota_id || isNaN(anggota_id)) {
    return res.status(400).json({ error: 'anggota_id tidak valid' });
  }
  
  // Get anggota name first
  db.get('SELECT nama_lengkap, nomor_anggota FROM anggota WHERE id = ?', [anggota_id], (err, anggota) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!anggota) return res.status(404).json({ error: 'Anggota tidak ditemukan' });
    
    db.run('INSERT INTO simpanan_wajib (anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, 'approved'],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        // Log activity
        const anggotaName = anggota ? anggota.nama_lengkap : 'Unknown';
        logActivity(
          req, 
          'CREATE', 
          'Simpanan', 
          `Menambahkan simpanan wajib ${formatCurrency(jumlah)} untuk ${anggotaName}`
        );
        
        res.json({ 
          message: 'Simpanan wajib berhasil ditambahkan', 
          id: this.lastID,
          bukti_pembayaran: bukti_pembayaran
        });
      }
    );
  });
});

// Simpanan Khusus
router.get('/khusus', (req, res) => {
  db.all(`SELECT sk.*, a.nama_lengkap, a.nomor_anggota 
          FROM simpanan_khusus sk 
          JOIN anggota a ON sk.anggota_id = a.id 
          WHERE sk.status = 'approved' OR sk.status IS NULL
          ORDER BY sk.tanggal_transaksi DESC`, [], (err, rows) => {
    if (err && err.message.includes('no such column')) {
      db.all(`SELECT sk.*, a.nama_lengkap, a.nomor_anggota 
              FROM simpanan_khusus sk 
              JOIN anggota a ON sk.anggota_id = a.id 
              ORDER BY sk.tanggal_transaksi DESC`, [], (err2, rows2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json(rows2);
      });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

router.post('/khusus', upload.single('bukti_pembayaran'), (req, res) => {
  let { anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan } = req.body;
  const bukti_pembayaran = req.file ? req.file.filename : null;
  
  // Convert anggota_id to integer
  anggota_id = parseInt(anggota_id);
  
  if (!anggota_id || isNaN(anggota_id)) {
    return res.status(400).json({ error: 'anggota_id tidak valid' });
  }
  
  // Get anggota name first
  db.get('SELECT nama_lengkap, nomor_anggota FROM anggota WHERE id = ?', [anggota_id], (err, anggota) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!anggota) return res.status(404).json({ error: 'Anggota tidak ditemukan' });
    
    db.run('INSERT INTO simpanan_khusus (anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, 'approved'],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        // Log activity
        const anggotaName = anggota ? anggota.nama_lengkap : 'Unknown';
        logActivity(
          req, 
          'CREATE', 
          'Simpanan', 
          `Menambahkan simpanan khusus ${formatCurrency(jumlah)} untuk ${anggotaName}`
        );
        
        res.json({ 
          message: 'Simpanan khusus berhasil ditambahkan', 
          id: this.lastID,
          bukti_pembayaran: bukti_pembayaran
        });
      }
    );
  });
});

// Simpanan Sukarela
router.get('/sukarela', (req, res) => {
  db.all(`SELECT ss.*, a.nama_lengkap, a.nomor_anggota 
          FROM simpanan_sukarela ss 
          JOIN anggota a ON ss.anggota_id = a.id 
          WHERE ss.status = 'approved' OR ss.status IS NULL
          ORDER BY ss.tanggal_transaksi DESC`, [], (err, rows) => {
    if (err && err.message.includes('no such column')) {
      db.all(`SELECT ss.*, a.nama_lengkap, a.nomor_anggota 
              FROM simpanan_sukarela ss 
              JOIN anggota a ON ss.anggota_id = a.id 
              ORDER BY ss.tanggal_transaksi DESC`, [], (err2, rows2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json(rows2);
      });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

router.post('/sukarela', upload.single('bukti_pembayaran'), (req, res) => {
  let { anggota_id, jumlah, jenis, tanggal_transaksi, metode_pembayaran, keterangan } = req.body;
  const bukti_pembayaran = req.file ? req.file.filename : null;
  
  // Convert anggota_id to integer
  anggota_id = parseInt(anggota_id);
  
  if (!anggota_id || isNaN(anggota_id)) {
    return res.status(400).json({ error: 'anggota_id tidak valid' });
  }
  
  // Get anggota name first
  db.get('SELECT nama_lengkap, nomor_anggota FROM anggota WHERE id = ?', [anggota_id], (err, anggota) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!anggota) return res.status(404).json({ error: 'Anggota tidak ditemukan' });
    
    db.run('INSERT INTO simpanan_sukarela (anggota_id, jumlah, jenis, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [anggota_id, jumlah, jenis, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, 'approved'],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        // Log activity
        const anggotaName = anggota ? anggota.nama_lengkap : 'Unknown';
        const jenisText = jenis === 'setor' ? 'setoran' : 'penarikan';
        logActivity(
          req, 
          'CREATE', 
          'Simpanan', 
          `Menambahkan simpanan sukarela ${jenisText} ${formatCurrency(jumlah)} untuk ${anggotaName}`
        );
        
        res.json({ 
          message: 'Simpanan sukarela berhasil ditambahkan', 
          id: this.lastID,
          bukti_pembayaran: bukti_pembayaran
        });
      }
    );
  });
});

module.exports = router;


// Update Simpanan Pokok
router.put('/pokok/:id', upload.single('bukti_pembayaran'), (req, res) => {
  const { id } = req.params;
  const { anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan } = req.body;
  const bukti_pembayaran = req.file ? req.file.filename : null;
  
  // Get anggota name first
  db.get('SELECT nama_lengkap FROM anggota WHERE id = ?', [anggota_id], (err, anggota) => {
    if (err) return res.status(500).json({ error: err.message });
    
    let query = 'UPDATE simpanan_pokok SET anggota_id = ?, jumlah = ?, tanggal_transaksi = ?, metode_pembayaran = ?, keterangan = ?';
    let params = [anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan];
    
    if (bukti_pembayaran) {
      query += ', bukti_pembayaran = ?';
      params.push(bukti_pembayaran);
    }
    
    query += ' WHERE id = ?';
    params.push(id);
    
    db.run(query, params, function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      // Log activity
      const anggotaName = anggota ? anggota.nama_lengkap : 'Unknown';
      logActivity(
        req, 
        'UPDATE', 
        'Simpanan', 
        `Mengupdate simpanan pokok ID ${id} - ${anggotaName} menjadi ${formatCurrency(jumlah)}`
      );
      
      res.json({ 
        message: 'Simpanan pokok berhasil diupdate',
        bukti_pembayaran: bukti_pembayaran
      });
    });
  });
});

// Delete Simpanan Pokok
router.delete('/pokok/:id', (req, res) => {
  const { id } = req.params;
  
  // Get simpanan info before delete
  db.get('SELECT sp.*, a.nama_lengkap FROM simpanan_pokok sp JOIN anggota a ON sp.anggota_id = a.id WHERE sp.id = ?', [id], (err, simpanan) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.run('DELETE FROM simpanan_pokok WHERE id = ?', [id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      // Log activity
      if (simpanan) {
        logActivity(
          req, 
          'DELETE', 
          'Simpanan', 
          `Menghapus simpanan pokok ID ${id} - ${simpanan.nama_lengkap} ${formatCurrency(simpanan.jumlah)}`
        );
      }
      
      res.json({ message: 'Simpanan pokok berhasil dihapus' });
    });
  });
});

// Update Simpanan Wajib
router.put('/wajib/:id', upload.single('bukti_pembayaran'), (req, res) => {
  const { id } = req.params;
  const { anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan } = req.body;
  const bukti_pembayaran = req.file ? req.file.filename : null;
  
  // Get anggota name first
  db.get('SELECT nama_lengkap FROM anggota WHERE id = ?', [anggota_id], (err, anggota) => {
    if (err) return res.status(500).json({ error: err.message });
    
    let query = 'UPDATE simpanan_wajib SET anggota_id = ?, jumlah = ?, tanggal_transaksi = ?, metode_pembayaran = ?, keterangan = ?';
    let params = [anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan];
    
    if (bukti_pembayaran) {
      query += ', bukti_pembayaran = ?';
      params.push(bukti_pembayaran);
    }
    
    query += ' WHERE id = ?';
    params.push(id);
    
    db.run(query, params, function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      // Log activity
      const anggotaName = anggota ? anggota.nama_lengkap : 'Unknown';
      logActivity(
        req, 
        'UPDATE', 
        'Simpanan', 
        `Mengupdate simpanan wajib ID ${id} - ${anggotaName} menjadi ${formatCurrency(jumlah)}`
      );
      
      res.json({ 
        message: 'Simpanan wajib berhasil diupdate',
        bukti_pembayaran: bukti_pembayaran
      });
    });
  });
});

// Delete Simpanan Wajib
router.delete('/wajib/:id', (req, res) => {
  const { id } = req.params;
  
  // Get simpanan info before delete
  db.get('SELECT sw.*, a.nama_lengkap FROM simpanan_wajib sw JOIN anggota a ON sw.anggota_id = a.id WHERE sw.id = ?', [id], (err, simpanan) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.run('DELETE FROM simpanan_wajib WHERE id = ?', [id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      // Log activity
      if (simpanan) {
        logActivity(
          req, 
          'DELETE', 
          'Simpanan', 
          `Menghapus simpanan wajib ID ${id} - ${simpanan.nama_lengkap} ${formatCurrency(simpanan.jumlah)}`
        );
      }
      
      res.json({ message: 'Simpanan wajib berhasil dihapus' });
    });
  });
});

// Update Simpanan Khusus
router.put('/khusus/:id', upload.single('bukti_pembayaran'), (req, res) => {
  const { id } = req.params;
  const { anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan } = req.body;
  const bukti_pembayaran = req.file ? req.file.filename : null;
  
  // Get anggota name first
  db.get('SELECT nama_lengkap FROM anggota WHERE id = ?', [anggota_id], (err, anggota) => {
    if (err) return res.status(500).json({ error: err.message });
    
    let query = 'UPDATE simpanan_khusus SET anggota_id = ?, jumlah = ?, tanggal_transaksi = ?, metode_pembayaran = ?, keterangan = ?';
    let params = [anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan];
    
    if (bukti_pembayaran) {
      query += ', bukti_pembayaran = ?';
      params.push(bukti_pembayaran);
    }
    
    query += ' WHERE id = ?';
    params.push(id);
    
    db.run(query, params, function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      // Log activity
      const anggotaName = anggota ? anggota.nama_lengkap : 'Unknown';
      logActivity(
        req, 
        'UPDATE', 
        'Simpanan', 
        `Mengupdate simpanan khusus ID ${id} - ${anggotaName} menjadi ${formatCurrency(jumlah)}`
      );
      
      res.json({ 
        message: 'Simpanan khusus berhasil diupdate',
        bukti_pembayaran: bukti_pembayaran
      });
    });
  });
});

// Delete Simpanan Khusus
router.delete('/khusus/:id', (req, res) => {
  const { id } = req.params;
  
  // Get simpanan info before delete
  db.get('SELECT sk.*, a.nama_lengkap FROM simpanan_khusus sk JOIN anggota a ON sk.anggota_id = a.id WHERE sk.id = ?', [id], (err, simpanan) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.run('DELETE FROM simpanan_khusus WHERE id = ?', [id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      // Log activity
      if (simpanan) {
        logActivity(
          req, 
          'DELETE', 
          'Simpanan', 
          `Menghapus simpanan khusus ID ${id} - ${simpanan.nama_lengkap} ${formatCurrency(simpanan.jumlah)}`
        );
      }
      
      res.json({ message: 'Simpanan khusus berhasil dihapus' });
    });
  });
});

// Update Simpanan Sukarela
router.put('/sukarela/:id', upload.single('bukti_pembayaran'), (req, res) => {
  const { id } = req.params;
  const { anggota_id, jumlah, jenis, tanggal_transaksi, metode_pembayaran, keterangan } = req.body;
  const bukti_pembayaran = req.file ? req.file.filename : null;
  
  // Get anggota name first
  db.get('SELECT nama_lengkap FROM anggota WHERE id = ?', [anggota_id], (err, anggota) => {
    if (err) return res.status(500).json({ error: err.message });
    
    let query = 'UPDATE simpanan_sukarela SET anggota_id = ?, jumlah = ?, jenis = ?, tanggal_transaksi = ?, metode_pembayaran = ?, keterangan = ?';
    let params = [anggota_id, jumlah, jenis, tanggal_transaksi, metode_pembayaran, keterangan];
    
    if (bukti_pembayaran) {
      query += ', bukti_pembayaran = ?';
      params.push(bukti_pembayaran);
    }
    
    query += ' WHERE id = ?';
    params.push(id);
    
    db.run(query, params, function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      // Log activity
      const anggotaName = anggota ? anggota.nama_lengkap : 'Unknown';
      const jenisText = jenis === 'setor' ? 'setoran' : 'penarikan';
      logActivity(
        req, 
        'UPDATE', 
        'Simpanan', 
        `Mengupdate simpanan sukarela ${jenisText} ID ${id} - ${anggotaName} menjadi ${formatCurrency(jumlah)}`
      );
      
      res.json({ 
        message: 'Simpanan sukarela berhasil diupdate',
        bukti_pembayaran: bukti_pembayaran
      });
    });
  });
});

// Delete Simpanan Sukarela
router.delete('/sukarela/:id', (req, res) => {
  const { id } = req.params;
  
  // Get simpanan info before delete
  db.get('SELECT ss.*, a.nama_lengkap FROM simpanan_sukarela ss JOIN anggota a ON ss.anggota_id = a.id WHERE ss.id = ?', [id], (err, simpanan) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.run('DELETE FROM simpanan_sukarela WHERE id = ?', [id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      // Log activity
      if (simpanan) {
        const jenisText = simpanan.jenis === 'setor' ? 'setoran' : 'penarikan';
        logActivity(
          req, 
          'DELETE', 
          'Simpanan', 
          `Menghapus simpanan sukarela ${jenisText} ID ${id} - ${simpanan.nama_lengkap} ${formatCurrency(simpanan.jumlah)}`
        );
      }
      
      res.json({ message: 'Simpanan sukarela berhasil dihapus' });
    });
  });
});


// ===== MEMBER ENDPOINTS =====

// Member: Submit Pembayaran Simpanan (Pending Approval)
router.post('/member/bayar', upload.single('bukti_pembayaran'), (req, res) => {
  const { jenis_simpanan, jumlah, tanggal_transaksi, metode_pembayaran, keterangan } = req.body;
  const bukti_pembayaran = req.file ? req.file.filename : null;
  const anggota_id = req.user.id; // From authenticated user
  
  if (!bukti_pembayaran) {
    return res.status(400).json({ error: 'Bukti pembayaran wajib diupload' });
  }
  
  // Get anggota name
  db.get('SELECT nama_lengkap FROM anggota WHERE id = ?', [anggota_id], (err, anggota) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const tableName = `simpanan_${jenis_simpanan}`;
    const query = jenis_simpanan === 'sukarela' 
      ? `INSERT INTO ${tableName} (anggota_id, jumlah, jenis, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      : `INSERT INTO ${tableName} (anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    const params = jenis_simpanan === 'sukarela'
      ? [anggota_id, jumlah, 'setor', tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, 'pending']
      : [anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, 'pending'];
    
    db.run(query, params, function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      // Log activity
      const jenisLabel = {
        'pokok': 'Simpanan Pokok',
        'wajib': 'Simpanan Wajib',
        'khusus': 'Simpanan Khusus',
        'sukarela': 'Simpanan Sukarela'
      };
      
      logActivity(
        req,
        'CREATE',
        'Simpanan',
        `Member ${anggota ? anggota.nama_lengkap : 'Unknown'} mengajukan pembayaran ${jenisLabel[jenis_simpanan]} ${formatCurrency(jumlah)} (Pending Approval)`
      );
      
      res.json({
        message: 'Pembayaran simpanan berhasil diajukan dan menunggu persetujuan admin',
        id: this.lastID,
        status: 'pending'
      });
    });
  });
});

// Get Pending Simpanan Count (for notification)
router.get('/pending/count', (req, res) => {
  // Check if status column exists
  db.get("SELECT status FROM simpanan_pokok LIMIT 1", [], (err, row) => {
    if (err && err.message.includes('no such column')) {
      // Status column doesn't exist yet, return 0
      return res.json({ count: 0 });
    }
    
    const queries = [
      'SELECT COUNT(*) as count FROM simpanan_pokok WHERE status = "pending"',
      'SELECT COUNT(*) as count FROM simpanan_wajib WHERE status = "pending"',
      'SELECT COUNT(*) as count FROM simpanan_khusus WHERE status = "pending"',
      'SELECT COUNT(*) as count FROM simpanan_sukarela WHERE status = "pending"'
    ];
    
    let totalCount = 0;
    let completed = 0;
    
    queries.forEach(query => {
      db.get(query, [], (err, row) => {
        if (!err && row) {
          totalCount += row.count;
        }
        completed++;
        
        if (completed === queries.length) {
          res.json({ count: totalCount });
        }
      });
    });
  });
});

// Get All Pending Simpanan (for approval page)
router.get('/pending', (req, res) => {
  // Check if status column exists, if not return empty array
  db.get("SELECT status FROM simpanan_pokok LIMIT 1", [], (err, row) => {
    if (err && err.message.includes('no such column')) {
      // Status column doesn't exist yet, return empty array
      console.log('Status column not found, returning empty array');
      return res.json([]);
    }
    
    const queries = [
      `SELECT id, anggota_id, jumlah, NULL as jenis, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status, created_at, 'pokok' as jenis_simpanan 
       FROM simpanan_pokok WHERE status = 'pending'`,
      `SELECT id, anggota_id, jumlah, NULL as jenis, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status, created_at, 'wajib' as jenis_simpanan 
       FROM simpanan_wajib WHERE status = 'pending'`,
      `SELECT id, anggota_id, jumlah, NULL as jenis, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status, created_at, 'khusus' as jenis_simpanan 
       FROM simpanan_khusus WHERE status = 'pending'`,
      `SELECT id, anggota_id, jumlah, jenis, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status, created_at, 'sukarela' as jenis_simpanan 
       FROM simpanan_sukarela WHERE status = 'pending'`
    ];
    
    const unionQuery = queries.join(' UNION ALL ');
    const finalQuery = `
      SELECT s.*, a.nama_lengkap, a.nomor_anggota 
      FROM (${unionQuery}) s
      JOIN anggota a ON s.anggota_id = a.id
      ORDER BY s.created_at DESC
    `;
    
    db.all(finalQuery, [], (err, rows) => {
      if (err) {
        console.error('Error getting pending simpanan:', err);
        return res.status(500).json({ error: err.message });
      }
      res.json(rows || []);
    });
  });
});

// Approve Simpanan
router.put('/approve/:jenis/:id', (req, res) => {
  const { jenis, id } = req.params;
  const tableName = `simpanan_${jenis}`;
  
  // Get simpanan info before approve
  db.get(`SELECT s.*, a.nama_lengkap FROM ${tableName} s JOIN anggota a ON s.anggota_id = a.id WHERE s.id = ?`, [id], (err, simpanan) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!simpanan) return res.status(404).json({ error: 'Data tidak ditemukan' });
    
    db.run(`UPDATE ${tableName} SET status = 'approved' WHERE id = ?`, [id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      // Log activity
      const jenisLabel = {
        'pokok': 'Simpanan Pokok',
        'wajib': 'Simpanan Wajib',
        'khusus': 'Simpanan Khusus',
        'sukarela': 'Simpanan Sukarela'
      };
      
      logActivity(
        req,
        'APPROVE',
        'Simpanan',
        `Menyetujui pembayaran ${jenisLabel[jenis]} ${formatCurrency(simpanan.jumlah)} dari ${simpanan.nama_lengkap}`
      );
      
      res.json({ message: 'Pembayaran simpanan berhasil disetujui' });
    });
  });
});

// Reject Simpanan
router.put('/reject/:jenis/:id', (req, res) => {
  const { jenis, id } = req.params;
  const { alasan } = req.body;
  const tableName = `simpanan_${jenis}`;
  
  // Get simpanan info before reject
  db.get(`SELECT s.*, a.nama_lengkap FROM ${tableName} s JOIN anggota a ON s.anggota_id = a.id WHERE s.id = ?`, [id], (err, simpanan) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!simpanan) return res.status(404).json({ error: 'Data tidak ditemukan' });
    
    db.run(`UPDATE ${tableName} SET status = 'rejected', rejection_reason = ? WHERE id = ?`, [alasan, id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      // Log activity
      const jenisLabel = {
        'pokok': 'Simpanan Pokok',
        'wajib': 'Simpanan Wajib',
        'khusus': 'Simpanan Khusus',
        'sukarela': 'Simpanan Sukarela'
      };
      
      logActivity(
        req,
        'REJECT',
        'Simpanan',
        `Menolak pembayaran ${jenisLabel[jenis]} ${formatCurrency(simpanan.jumlah)} dari ${simpanan.nama_lengkap}. Alasan: ${alasan || 'Tidak disebutkan'}`
      );
      
      res.json({ message: 'Pembayaran simpanan ditolak' });
    });
  });
});


// Member: Get My Simpanan History (including pending and rejected)
router.get('/member/history', (req, res) => {
  const anggota_id = req.user.id;
  
  const queries = [
    `SELECT id, anggota_id, jumlah, NULL as jenis, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status, rejection_reason, created_at, 'pokok' as jenis_simpanan 
     FROM simpanan_pokok WHERE anggota_id = ${anggota_id}`,
    `SELECT id, anggota_id, jumlah, NULL as jenis, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status, rejection_reason, created_at, 'wajib' as jenis_simpanan 
     FROM simpanan_wajib WHERE anggota_id = ${anggota_id}`,
    `SELECT id, anggota_id, jumlah, NULL as jenis, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status, rejection_reason, created_at, 'khusus' as jenis_simpanan 
     FROM simpanan_khusus WHERE anggota_id = ${anggota_id}`,
    `SELECT id, anggota_id, jumlah, jenis, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, status, rejection_reason, created_at, 'sukarela' as jenis_simpanan 
     FROM simpanan_sukarela WHERE anggota_id = ${anggota_id}`
  ];
  
  const unionQuery = queries.join(' UNION ALL ');
  const finalQuery = `
    SELECT * FROM (${unionQuery})
    ORDER BY created_at DESC
  `;
  
  db.all(finalQuery, [], (err, rows) => {
    if (err) {
      console.error('Error getting member history:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows || []);
  });
});
