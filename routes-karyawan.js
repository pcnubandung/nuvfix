const express = require('express');
const router = express.Router();
const db = require('./database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Use UPLOAD_PATH from environment or default
const UPLOAD_PATH = process.env.UPLOAD_PATH || path.join(__dirname, 'public', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
  console.log(`✅ Routes-karyawan: Created upload directory: ${UPLOAD_PATH}`);
}

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
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024
  }
});

// Get all karyawan
router.get('/', (req, res) => {
  db.all(`SELECT k.*, u.nama_usaha 
          FROM karyawan k 
          LEFT JOIN unit_usaha u ON k.unit_usaha_id = u.id 
          ORDER BY k.id DESC`, [], (err, rows) => {
    if (err) {
      console.error('Error getting karyawan:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows || []);
  });
});

// Get karyawan by ID
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM karyawan WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Create karyawan
router.post('/', upload.single('foto'), (req, res) => {
  const { nomor_karyawan, nama_lengkap, nik, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, nomor_telpon, email, jabatan, unit_usaha_id, tanggal_bergabung, gaji } = req.body;
  const foto = req.file ? req.file.filename : null;

  db.run(`INSERT INTO karyawan (nomor_karyawan, nama_lengkap, nik, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, nomor_telpon, email, jabatan, unit_usaha_id, foto, tanggal_bergabung, gaji) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nomor_karyawan, nama_lengkap, nik, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, nomor_telpon, email, jabatan, unit_usaha_id, foto, tanggal_bergabung, gaji],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Karyawan berhasil ditambahkan', id: this.lastID });
    }
  );
});

// Update karyawan
router.put('/:id', upload.single('foto'), (req, res) => {
  const { id } = req.params;
  const { nomor_karyawan, nama_lengkap, nik, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, nomor_telpon, email, jabatan, unit_usaha_id, tanggal_bergabung, gaji, status } = req.body;
  const foto = req.file ? req.file.filename : null;

  let query = `UPDATE karyawan SET nomor_karyawan = ?, nama_lengkap = ?, nik = ?, tempat_lahir = ?, tanggal_lahir = ?, jenis_kelamin = ?, alamat = ?, nomor_telpon = ?, email = ?, jabatan = ?, unit_usaha_id = ?, tanggal_bergabung = ?, gaji = ?, status = ?`;
  let params = [nomor_karyawan, nama_lengkap, nik, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, nomor_telpon, email, jabatan, unit_usaha_id, tanggal_bergabung, gaji, status];

  if (foto) {
    query += ', foto = ?';
    params.push(foto);
  }

  query += ' WHERE id = ?';
  params.push(id);

  db.run(query, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Karyawan berhasil diupdate' });
  });
});

// Delete karyawan
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM karyawan WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Karyawan berhasil dihapus' });
  });
});

module.exports = router;
