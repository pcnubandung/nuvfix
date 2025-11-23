# Panduan Implementasi Backend & Frontend

## Status: Backend API & Helper Sudah Siap ✅

### File yang Sudah Dibuat/Diupdate:

1. ✅ `database.js` - Schema dengan kolom bukti
2. ✅ `server.js` - Activity log middleware & endpoints
3. ✅ `helpers/upload-handler.js` - Upload helper
4. ✅ `migrations/add-bukti-fields.js` - Migration script

## Cara Menggunakan

### 1. Restart Server
```bash
# Stop server (Ctrl+C)
node server.js
```

Database akan otomatis membuat kolom-kolom baru.

### 2. Update Routes untuk Upload Bukti

Karena ada banyak routes yang perlu diupdate, berikut adalah template yang bisa digunakan:

#### Template untuk Simpanan (routes-simpanan.js)

```javascript
const { uploadSingle } = require('./helpers/upload-handler');

// POST dengan upload bukti
router.post('/pokok', uploadSingle('bukti_pembayaran'), (req, res) => {
  const { anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan } = req.body;
  const bukti_pembayaran = req.file ? req.file.filename : null;
  
  db.run(
    `INSERT INTO simpanan_pokok 
     (anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ 
        message: 'Simpanan pokok berhasil ditambahkan', 
        id: this.lastID,
        bukti_pembayaran 
      });
    }
  );
});

// PUT dengan upload bukti
router.put('/pokok/:id', uploadSingle('bukti_pembayaran'), (req, res) => {
  const { id } = req.params;
  const { anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan } = req.body;
  const bukti_pembayaran = req.file ? req.file.filename : req.body.bukti_pembayaran_existing;
  
  db.run(
    `UPDATE simpanan_pokok 
     SET anggota_id = ?, jumlah = ?, tanggal_transaksi = ?, 
         metode_pembayaran = ?, keterangan = ?, bukti_pembayaran = ? 
     WHERE id = ?`,
    [anggota_id, jumlah, tanggal_transaksi, metode_pembayaran, keterangan, bukti_pembayaran, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Simpanan pokok berhasil diupdate' });
    }
  );
});
```

### 3. Update Frontend Forms

#### Template HTML untuk Upload Bukti

```html
<div class="form-group">
  <label>Bukti Pembayaran (Opsional)</label>
  <input type="file" 
         name="bukti_pembayaran" 
         id="buktiPembayaran"
         accept="image/*,.pdf">
  <small style="color: #666;">
    Format: JPG, PNG, GIF, PDF. Max 5MB
  </small>
  <div id="buktiPreview" style="margin-top: 10px;"></div>
</div>
```

#### Template JavaScript untuk Upload

```javascript
// Preview file
document.getElementById('buktiPembayaran').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const preview = document.getElementById('buktiPreview');
  
  if (file) {
    // Validate size
    if (file.size > 5 * 1024 * 1024) {
      alert('File terlalu besar! Maksimal 5MB');
      e.target.value = '';
      return;
    }
    
    // Validate type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Format file tidak didukung!');
      e.target.value = '';
      return;
    }
    
    // Show preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.innerHTML = `
          <img src="${e.target.result}" 
               style="max-width: 200px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        `;
      };
      reader.readAsDataURL(file);
    } else {
      preview.innerHTML = `
        <div style="padding: 10px; background: #f0f0f0; border-radius: 4px;">
          📄 ${file.name} (${(file.size / 1024).toFixed(2)} KB)
        </div>
      `;
    }
  }
});

// Submit dengan FormData
async function tambahSimpanan() {
  const formData = new FormData();
  formData.append('anggota_id', document.getElementById('anggotaId').value);
  formData.append('jumlah', document.getElementById('jumlah').value);
  formData.append('tanggal_transaksi', document.getElementById('tanggal').value);
  formData.append('metode_pembayaran', document.getElementById('metode').value);
  formData.append('keterangan', document.getElementById('keterangan').value);
  
  const buktiFile = document.getElementById('buktiPembayaran').files[0];
  if (buktiFile) {
    formData.append('bukti_pembayaran', buktiFile);
  }
  
  try {
    const response = await fetch('/api/simpanan/pokok', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData // Jangan set Content-Type, biarkan browser yang set
    });
    
    const result = await response.json();
    
    if (response.ok) {
      alert('Simpanan berhasil ditambahkan!');
      // Reload data
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    alert('Terjadi kesalahan: ' + error.message);
  }
}
```

#### Template untuk Tampilkan Bukti di Tabel

```javascript
// Di render table
const rows = data.map((item, index) => `
  <tr>
    <td>${index + 1}</td>
    <td>${item.nomor_anggota}</td>
    <td>${item.nama_lengkap}</td>
    <td>${formatCurrency(item.jumlah)}</td>
    <td>${formatDate(item.tanggal_transaksi)}</td>
    <td>
      ${item.bukti_pembayaran ? `
        <button class="btn btn-sm btn-info" onclick="viewBukti('${item.bukti_pembayaran}')">
          <i data-feather="eye"></i> Lihat Bukti
        </button>
      ` : '<span style="color: #999;">-</span>'}
    </td>
    <td>
      <button class="btn btn-sm btn-warning" onclick="editSimpanan(${item.id})">Edit</button>
      <button class="btn btn-sm btn-danger" onclick="hapusSimpanan(${item.id})">Hapus</button>
    </td>
  </tr>
`).join('');

// Function untuk view bukti
function viewBukti(filename) {
  const fileUrl = `/uploads/${filename}`;
  const ext = filename.split('.').pop().toLowerCase();
  
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 800px;">
      <div class="modal-header">
        <h3 class="modal-title">Bukti Pembayaran</h3>
        <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
      </div>
      <div style="padding: 20px; text-align: center;">
        ${ext === 'pdf' ? `
          <iframe src="${fileUrl}" 
                  style="width: 100%; height: 600px; border: none;"></iframe>
          <br>
          <a href="${fileUrl}" target="_blank" class="btn btn-primary" style="margin-top: 10px;">
            <i data-feather="download"></i> Download PDF
          </a>
        ` : `
          <img src="${fileUrl}" 
               style="max-width: 100%; height: auto; border-radius: 8px;">
          <br>
          <a href="${fileUrl}" download class="btn btn-primary" style="margin-top: 10px;">
            <i data-feather="download"></i> Download
          </a>
        `}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  feather.replace();
}
```

### 4. Implementasi Activity Log di Beranda

#### Backend (Sudah Ada di server.js) ✅

```javascript
// GET /api/activity-log/recent?limit=10
```

#### Frontend - Tambah di pages.js (renderBeranda)

```javascript
// Di akhir renderBeranda, setelah charts
const activityHtml = `
  <div class="card" style="margin-top: 30px;">
    <div class="card-header">
      <h3 class="card-title">📋 Aktivitas Terkini</h3>
      <button class="btn btn-secondary" onclick="refreshActivity()">
        <i data-feather="refresh-cw"></i> Refresh
      </button>
    </div>
    <div class="card-body">
      <div id="activityLogContainer">
        <div class="loading">Memuat aktivitas...</div>
      </div>
    </div>
  </div>
`;

contentArea.innerHTML += activityHtml;
loadRecentActivity();

// Function untuk load activity
async function loadRecentActivity() {
  try {
    const activities = await API.get('/api/activity-log/recent?limit=15');
    
    const container = document.getElementById('activityLogContainer');
    
    if (activities.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: #999;">Belum ada aktivitas</p>';
      return;
    }
    
    container.innerHTML = `
      <div class="activity-list">
        ${activities.map(activity => `
          <div class="activity-item">
            <div class="activity-icon ${getActivityColor(activity.action)}">
              <i data-feather="${getActivityIcon(activity.action)}"></i>
            </div>
            <div class="activity-content">
              <div class="activity-header">
                <strong>${activity.username}</strong>
                <span class="activity-action">${getActionText(activity.action)}</span>
                <span class="activity-module">${activity.module}</span>
              </div>
              ${activity.description ? `
                <div class="activity-description">${activity.description}</div>
              ` : ''}
              <div class="activity-time">${formatTimeAgo(activity.created_at)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    feather.replace();
  } catch (error) {
    console.error('Error loading activity:', error);
    document.getElementById('activityLogContainer').innerHTML = 
      '<p style="color: #d32f2f;">Gagal memuat aktivitas</p>';
  }
}

// Helper functions
function getActivityColor(action) {
  const colors = {
    'CREATE': 'activity-create',
    'UPDATE': 'activity-update',
    'DELETE': 'activity-delete',
    'LOGIN': 'activity-login',
    'LOGOUT': 'activity-logout',
    'APPROVE': 'activity-approve',
    'REJECT': 'activity-reject',
    'VIEW': 'activity-view',
    'EXPORT': 'activity-export',
    'PRINT': 'activity-print'
  };
  return colors[action] || 'activity-default';
}

function getActivityIcon(action) {
  const icons = {
    'CREATE': 'plus-circle',
    'UPDATE': 'edit',
    'DELETE': 'trash-2',
    'LOGIN': 'log-in',
    'LOGOUT': 'log-out',
    'APPROVE': 'check-circle',
    'REJECT': 'x-circle',
    'VIEW': 'eye',
    'EXPORT': 'download',
    'PRINT': 'printer'
  };
  return icons[action] || 'activity';
}

function getActionText(action) {
  const texts = {
    'CREATE': 'menambahkan',
    'UPDATE': 'mengupdate',
    'DELETE': 'menghapus',
    'LOGIN': 'login ke',
    'LOGOUT': 'logout dari',
    'APPROVE': 'menyetujui',
    'REJECT': 'menolak',
    'VIEW': 'melihat',
    'EXPORT': 'mengexport',
    'PRINT': 'mencetak'
  };
  return texts[action] || action.toLowerCase();
}

function formatTimeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // seconds
  
  if (diff < 60) return 'Baru saja';
  if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} hari yang lalu`;
  
  return formatDate(dateStr);
}

function refreshActivity() {
  loadRecentActivity();
}
```

#### CSS untuk Activity Log (tambah di style.css)

```css
/* Activity Log Styles */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #ddd;
  transition: all 0.3s;
}

.activity-item:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-create { background: #e8f5e9; color: #2e7d32; }
.activity-update { background: #fff3e0; color: #f57c00; }
.activity-delete { background: #ffebee; color: #c62828; }
.activity-login { background: #e3f2fd; color: #1976d2; }
.activity-logout { background: #f3e5f5; color: #7b1fa2; }
.activity-approve { background: #e8f5e9; color: #388e3c; }
.activity-reject { background: #ffebee; color: #d32f2f; }
.activity-view { background: #e0f2f1; color: #00796b; }
.activity-export { background: #fce4ec; color: #c2185b; }
.activity-print { background: #f1f8e9; color: #689f38; }
.activity-default { background: #f5f5f5; color: #616161; }

.activity-content {
  flex: 1;
}

.activity-header {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 5px;
}

.activity-action {
  color: #666;
  font-size: 14px;
}

.activity-module {
  background: #2e7d32;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.activity-description {
  color: #666;
  font-size: 13px;
  margin: 5px 0;
}

.activity-time {
  color: #999;
  font-size: 12px;
  margin-top: 5px;
}
```

## Ringkasan Implementasi

### ✅ Sudah Selesai:
1. Database schema dengan kolom bukti
2. Activity log table
3. Server.js dengan middleware & endpoints
4. Upload handler helper
5. Dokumentasi lengkap

### 📝 Yang Perlu Dilakukan:
1. Update routes (simpanan, partisipasi, pengeluaran) dengan upload
2. Update frontend forms dengan input file
3. Tambah activity log component di beranda
4. Tambah CSS untuk activity log
5. Testing

### ⏱️ Estimasi Waktu:
- Update routes: ~1 jam
- Update frontend forms: ~2 jam
- Activity log component: ~1 jam
- Testing: ~1 jam
- **Total**: ~5 jam

## Cara Cepat Testing

1. Restart server
2. Test endpoint activity log:
   ```
   GET http://localhost:3000/api/activity-log/recent
   ```
3. Test upload file di Postman dengan form-data
4. Implementasikan satu fitur dulu (misalnya: upload KTP di Data Anggota)
5. Setelah berhasil, copy-paste ke fitur lain

---

**Status**: Backend API siap, tinggal implementasi frontend! ✅
