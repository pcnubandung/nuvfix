// Import Excel Functions untuk Simpanan, Partisipasi, Penjualan, Pengeluaran, Pendapatan Lain

// ===== IMPORT SIMPANAN =====
window.importSimpananExcel = function(jenis) {
  const jenisLabel = {
    'pokok': 'Simpanan Pokok',
    'wajib': 'Simpanan Wajib',
    'khusus': 'Simpanan Khusus',
    'sukarela': 'Simpanan Sukarela'
  };
  
  const modal = document.createElement('div');
  modal.className = 'modal active';
  
  // Template info berbeda untuk simpanan sukarela
  const templateInfo = jenis === 'sukarela' ? `
    <tr style="background: #fff;">
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Nomor Anggota</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">Nomor anggota (wajib)</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Jumlah</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">Nominal simpanan (wajib)</td>
    </tr>
    <tr style="background: #fff;">
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Jenis</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">Setoran/Penarikan (wajib)</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Tanggal</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">Format: YYYY-MM-DD</td>
    </tr>
    <tr style="background: #fff;">
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Metode Pembayaran</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">Tunai/Transfer/dll</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Keterangan</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">Catatan (opsional)</td>
    </tr>
  ` : `
    <tr style="background: #fff;">
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Nomor Anggota</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">Nomor anggota (wajib)</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Jumlah</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">Nominal simpanan (wajib)</td>
    </tr>
    <tr style="background: #fff;">
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Tanggal</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">Format: YYYY-MM-DD</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Metode Pembayaran</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">Tunai/Transfer/dll</td>
    </tr>
    <tr style="background: #fff;">
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Keterangan</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">Catatan (opsional)</td>
    </tr>
  `;
  
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 600px;">
      <div class="modal-header">
        <h3 class="modal-title">Import ${jenisLabel[jenis]} dari Excel</h3>
        <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
      </div>
      
      <div style="padding: 24px;">
        <div class="info-box" style="background: #E3F2FD; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 12px 0; color: #1976D2;">📋 Format Excel yang Diperlukan:</h4>
          <table style="width: 100%; font-size: 13px;">
            ${templateInfo}
          </table>
        </div>
        
        <div class="form-group">
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Pilih File Excel (.xlsx atau .xls)</label>
          <input type="file" id="importFileExcel" accept=".xlsx,.xls" style="width: 100%; padding: 10px; border: 2px dashed #2E7D32; border-radius: 8px; background: #F1F8E9;">
        </div>
        
        <div style="margin-top: 20px; display: flex; gap: 12px;">
          <button class="btn btn-secondary" onclick="downloadTemplateSimpanan('${jenis}')" style="flex: 1;">
            <i data-feather="download"></i> Download Template
          </button>
          <button class="btn btn-primary" onclick="prosesImportSimpananExcel('${jenis}')" style="flex: 1;">
            <i data-feather="upload"></i> Import Data
          </button>
        </div>
        
        <div id="importProgress" style="margin-top: 20px; display: none;">
          <div style="background: #f5f5f5; border-radius: 8px; padding: 16px;">
            <div style="font-weight: 600; margin-bottom: 8px;">Memproses...</div>
            <div style="background: #ddd; height: 8px; border-radius: 4px; overflow: hidden;">
              <div id="progressBar" style="background: #2E7D32; height: 100%; width: 0%; transition: width 0.3s;"></div>
            </div>
            <div id="progressText" style="margin-top: 8px; font-size: 13px; color: #666;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  feather.replace();
};

window.downloadTemplateSimpanan = function(jenis) {
  const jenisLabel = {
    'pokok': 'Simpanan Pokok',
    'wajib': 'Simpanan Wajib',
    'khusus': 'Simpanan Khusus',
    'sukarela': 'Simpanan Sukarela'
  };
  
  // Template berbeda untuk simpanan sukarela (ada kolom Jenis)
  let columns, sampleData;
  
  if (jenis === 'sukarela') {
    columns = ['Nomor Anggota', 'Jumlah', 'Jenis', 'Tanggal', 'Metode Pembayaran', 'Keterangan'];
    sampleData = [
      ['A001', '100000', 'Setoran', '2024-01-15', 'Transfer', 'Setoran awal'],
      ['A002', '50000', 'Penarikan', '2024-01-20', 'Tunai', 'Penarikan darurat']
    ];
  } else {
    columns = ['Nomor Anggota', 'Jumlah', 'Tanggal', 'Metode Pembayaran', 'Keterangan'];
    sampleData = [
      ['A001', '100000', '2024-01-15', 'Transfer', 'Pembayaran bulan Januari'],
      ['A002', '100000', '2024-01-15', 'Tunai', '']
    ];
  }
  
  const ws = XLSX.utils.aoa_to_sheet([columns, ...sampleData]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, jenisLabel[jenis]);
  XLSX.writeFile(wb, `Template_${jenis}_${new Date().toISOString().split('T')[0]}.xlsx`);
  
  showNotification('Template berhasil didownload', 'success');
};

window.prosesImportSimpananExcel = async function(jenis) {
  const fileInput = document.getElementById('importFileExcel');
  const file = fileInput.files[0];
  
  if (!file) {
    showNotification('Pilih file Excel terlebih dahulu', 'error');
    return;
  }
  
  const progressDiv = document.getElementById('importProgress');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  
  progressDiv.style.display = 'block';
  progressText.textContent = 'Membaca file...';
  
  try {
    const importer = new ExcelImporter();
    await importer.loadFile(file);
    
    const sheetNames = importer.getSheetNames();
    const data = importer.parseSheet(sheetNames[0]);
    
    // Validate columns
    const requiredColumns = ['Nomor Anggota', 'Jumlah'];
    const validation = importer.validateColumns(data, requiredColumns);
    
    if (!validation.valid) {
      showNotification(validation.message, 'error');
      progressDiv.style.display = 'none';
      return;
    }
    
    // Get anggota data
    const anggota = await API.get('/api/anggota');
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const progress = ((i + 1) / data.length) * 100;
      progressBar.style.width = progress + '%';
      progressText.textContent = `Memproses baris ${i + 1} dari ${data.length}...`;
      
      // Find anggota
      const anggotaItem = anggota.find(a => a.nomor_anggota === row['Nomor Anggota']);
      
      if (!anggotaItem) {
        errorCount++;
        errors.push(`Baris ${i + 2}: Anggota ${row['Nomor Anggota']} tidak ditemukan`);
        continue;
      }
      
      const postData = {
        anggota_id: anggotaItem.id,
        jumlah: importer.formatCurrency(row['Jumlah']),
        tanggal_transaksi: importer.formatDate(row['Tanggal']) || new Date().toISOString().split('T')[0],
        metode_pembayaran: row['Metode Pembayaran'] || 'Tunai',
        keterangan: row['Keterangan'] || ''
      };
      
      if (jenis === 'sukarela') {
        postData.jenis = row['Jenis'] || 'Setoran';
        // Validasi jenis transaksi
        if (!['Setoran', 'Penarikan'].includes(postData.jenis)) {
          errorCount++;
          errors.push(`Baris ${i + 2}: Jenis harus 'Setoran' atau 'Penarikan', bukan '${postData.jenis}'`);
          continue;
        }
      }
      
      try {
        await API.post(`/api/simpanan/${jenis}`, postData);
        successCount++;
      } catch (error) {
        errorCount++;
        errors.push(`Baris ${i + 2}: ${error.message}`);
      }
    }
    
    progressDiv.style.display = 'none';
    
    // Show result
    let message = `Import selesai!\n✓ Berhasil: ${successCount}\n✗ Gagal: ${errorCount}`;
    if (errors.length > 0 && errors.length <= 5) {
      message += '\n\nError:\n' + errors.join('\n');
    }
    
    showNotification(message, successCount > 0 ? 'success' : 'error');
    
    if (successCount > 0) {
      document.querySelector('.modal').remove();
      // Reload current page or simpanan unified page
      const currentPage = window.location.hash.substring(1);
      if (currentPage.includes('simpanan')) {
        // If on specific simpanan page, reload that page
        loadPage(currentPage);
      } else {
        // Otherwise reload simpanan unified
        window.renderSimpanan();
      }
    }
    
  } catch (error) {
    progressDiv.style.display = 'none';
    showNotification('Error: ' + error.message, 'error');
  }
};

// ===== IMPORT PARTISIPASI ANGGOTA =====
window.importPartisipasiExcel = function() {
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 600px;">
      <div class="modal-header">
        <h3 class="modal-title">Import Partisipasi Anggota dari Excel</h3>
        <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
      </div>
      
      <div style="padding: 24px;">
        <div class="info-box" style="background: #E3F2FD; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 12px 0; color: #1976D2;">📋 Format Excel yang Diperlukan:</h4>
          <table style="width: 100%; font-size: 13px;">
            <tr style="background: #fff;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Nomor Anggota</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Nomor anggota (wajib)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Unit Usaha</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Nama unit usaha</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Jumlah Transaksi</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Nominal transaksi (wajib)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Tanggal</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Format: YYYY-MM-DD</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Keterangan</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Catatan (opsional)</td>
            </tr>
          </table>
        </div>
        
        <div class="form-group">
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Pilih File Excel (.xlsx atau .xls)</label>
          <input type="file" id="importFilePartisipasi" accept=".xlsx,.xls" style="width: 100%; padding: 10px; border: 2px dashed #2E7D32; border-radius: 8px; background: #F1F8E9;">
        </div>
        
        <div style="margin-top: 20px; display: flex; gap: 12px;">
          <button class="btn btn-secondary" onclick="downloadTemplatePartisipasi()" style="flex: 1;">
            <i data-feather="download"></i> Download Template
          </button>
          <button class="btn btn-primary" onclick="prosesImportPartisipasiExcel()" style="flex: 1;">
            <i data-feather="upload"></i> Import Data
          </button>
        </div>
        
        <div id="importProgressPartisipasi" style="margin-top: 20px; display: none;">
          <div style="background: #f5f5f5; border-radius: 8px; padding: 16px;">
            <div style="font-weight: 600; margin-bottom: 8px;">Memproses...</div>
            <div style="background: #ddd; height: 8px; border-radius: 4px; overflow: hidden;">
              <div id="progressBarPartisipasi" style="background: #2E7D32; height: 100%; width: 0%; transition: width 0.3s;"></div>
            </div>
            <div id="progressTextPartisipasi" style="margin-top: 8px; font-size: 13px; color: #666;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  feather.replace();
};

window.downloadTemplatePartisipasi = function() {
  const columns = ['Nomor Anggota', 'Unit Usaha', 'Jumlah Transaksi', 'Tanggal', 'Keterangan'];
  const sampleData = [
    ['A001', 'Toko Sembako', '500000', '2024-01-15', 'Pembelian beras'],
    ['A002', 'Warung Kopi', '150000', '2024-01-15', 'Pembelian kopi']
  ];
  
  const ws = XLSX.utils.aoa_to_sheet([columns, ...sampleData]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Partisipasi Anggota');
  XLSX.writeFile(wb, `Template_Partisipasi_${new Date().toISOString().split('T')[0]}.xlsx`);
  
  showNotification('Template berhasil didownload', 'success');
};

window.prosesImportPartisipasiExcel = async function() {
  const fileInput = document.getElementById('importFilePartisipasi');
  const file = fileInput.files[0];
  
  if (!file) {
    showNotification('Pilih file Excel terlebih dahulu', 'error');
    return;
  }
  
  const progressDiv = document.getElementById('importProgressPartisipasi');
  const progressBar = document.getElementById('progressBarPartisipasi');
  const progressText = document.getElementById('progressTextPartisipasi');
  
  progressDiv.style.display = 'block';
  progressText.textContent = 'Membaca file...';
  
  try {
    const importer = new ExcelImporter();
    await importer.loadFile(file);
    
    const sheetNames = importer.getSheetNames();
    const data = importer.parseSheet(sheetNames[0]);
    
    const requiredColumns = ['Nomor Anggota', 'Jumlah Transaksi'];
    const validation = importer.validateColumns(data, requiredColumns);
    
    if (!validation.valid) {
      showNotification(validation.message, 'error');
      progressDiv.style.display = 'none';
      return;
    }
    
    const [anggota, unitUsaha] = await Promise.all([
      API.get('/api/anggota'),
      API.get('/api/unit-usaha')
    ]);
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const progress = ((i + 1) / data.length) * 100;
      progressBar.style.width = progress + '%';
      progressText.textContent = `Memproses baris ${i + 1} dari ${data.length}...`;
      
      const anggotaItem = anggota.find(a => a.nomor_anggota === row['Nomor Anggota']);
      
      if (!anggotaItem) {
        errorCount++;
        errors.push(`Baris ${i + 2}: Anggota ${row['Nomor Anggota']} tidak ditemukan`);
        continue;
      }
      
      let unitUsahaId = null;
      if (row['Unit Usaha']) {
        const unit = unitUsaha.find(u => u.nama_usaha === row['Unit Usaha']);
        unitUsahaId = unit ? unit.id : null;
      }
      
      const postData = {
        anggota_id: anggotaItem.id,
        unit_usaha_id: unitUsahaId,
        jumlah_transaksi: importer.formatCurrency(row['Jumlah Transaksi']),
        tanggal_transaksi: importer.formatDate(row['Tanggal']) || new Date().toISOString().split('T')[0],
        keterangan: row['Keterangan'] || ''
      };
      
      try {
        await API.post('/api/partisipasi', postData);
        successCount++;
      } catch (error) {
        errorCount++;
        errors.push(`Baris ${i + 2}: ${error.message}`);
      }
    }
    
    progressDiv.style.display = 'none';
    
    let message = `Import selesai!\n✓ Berhasil: ${successCount}\n✗ Gagal: ${errorCount}`;
    if (errors.length > 0 && errors.length <= 5) {
      message += '\n\nError:\n' + errors.join('\n');
    }
    
    showNotification(message, successCount > 0 ? 'success' : 'error');
    
    if (successCount > 0) {
      document.querySelector('.modal').remove();
      // Reload partisipasi anggota page
      if (typeof window.renderPartisipasiAnggota === 'function') {
        window.renderPartisipasiAnggota();
      } else {
        loadPage('partisipasi-anggota');
      }
    }
    
  } catch (error) {
    progressDiv.style.display = 'none';
    showNotification('Error: ' + error.message, 'error');
  }
};

// Fungsi helper untuk menampilkan notifikasi
function showNotification(message, type = 'info') {
  // Jika sudah ada fungsi showNotification global, gunakan itu
  if (window.showNotification && typeof window.showNotification === 'function') {
    return window.showNotification(message, type);
  }
  
  // Fallback ke alert
  alert(message);
}


// ===== IMPORT PENJUALAN =====
window.importPenjualanExcel = function() {
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 600px;">
      <div class="modal-header">
        <h3 class="modal-title">Import Transaksi Penjualan dari Excel</h3>
        <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
      </div>
      
      <div style="padding: 24px;">
        <div class="info-box" style="background: #E3F2FD; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 12px 0; color: #1976D2;">📋 Format Excel yang Diperlukan:</h4>
          <table style="width: 100%; font-size: 13px;">
            <tr style="background: #fff;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Unit Usaha</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Nama unit usaha</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Jumlah Penjualan</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Total penjualan (wajib)</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>HPP</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Harga Pokok Penjualan</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Tanggal</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Format: YYYY-MM-DD</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Keterangan</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Catatan (opsional)</td>
            </tr>
          </table>
        </div>
        
        <div class="form-group">
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Pilih File Excel (.xlsx atau .xls)</label>
          <input type="file" id="importFilePenjualan" accept=".xlsx,.xls" style="width: 100%; padding: 10px; border: 2px dashed #2E7D32; border-radius: 8px; background: #F1F8E9;">
        </div>
        
        <div style="margin-top: 20px; display: flex; gap: 12px;">
          <button class="btn btn-secondary" onclick="downloadTemplatePenjualan()" style="flex: 1;">
            <i data-feather="download"></i> Download Template
          </button>
          <button class="btn btn-primary" onclick="prosesImportPenjualanExcel()" style="flex: 1;">
            <i data-feather="upload"></i> Import Data
          </button>
        </div>
        
        <div id="importProgressPenjualan" style="margin-top: 20px; display: none;">
          <div style="background: #f5f5f5; border-radius: 8px; padding: 16px;">
            <div style="font-weight: 600; margin-bottom: 8px;">Memproses...</div>
            <div style="background: #ddd; height: 8px; border-radius: 4px; overflow: hidden;">
              <div id="progressBarPenjualan" style="background: #2E7D32; height: 100%; width: 0%; transition: width 0.3s;"></div>
            </div>
            <div id="progressTextPenjualan" style="margin-top: 8px; font-size: 13px; color: #666;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  feather.replace();
};

window.downloadTemplatePenjualan = function() {
  const columns = ['Unit Usaha', 'Jumlah Penjualan', 'HPP', 'Tanggal', 'Keterangan'];
  const sampleData = [
    ['Toko Sembako', '5000000', '3500000', '2024-01-15', 'Penjualan harian'],
    ['Warung Kopi', '1500000', '800000', '2024-01-15', 'Penjualan kopi dan snack']
  ];
  
  const ws = XLSX.utils.aoa_to_sheet([columns, ...sampleData]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Transaksi Penjualan');
  XLSX.writeFile(wb, `Template_Penjualan_${new Date().toISOString().split('T')[0]}.xlsx`);
  
  showNotification('Template berhasil didownload', 'success');
};

window.prosesImportPenjualanExcel = async function() {
  const fileInput = document.getElementById('importFilePenjualan');
  const file = fileInput.files[0];
  
  if (!file) {
    showNotification('Pilih file Excel terlebih dahulu', 'error');
    return;
  }
  
  const progressDiv = document.getElementById('importProgressPenjualan');
  const progressBar = document.getElementById('progressBarPenjualan');
  const progressText = document.getElementById('progressTextPenjualan');
  
  progressDiv.style.display = 'block';
  progressText.textContent = 'Membaca file...';
  
  try {
    const importer = new ExcelImporter();
    await importer.loadFile(file);
    
    const sheetNames = importer.getSheetNames();
    const data = importer.parseSheet(sheetNames[0]);
    
    const requiredColumns = ['Jumlah Penjualan'];
    const validation = importer.validateColumns(data, requiredColumns);
    
    if (!validation.valid) {
      showNotification(validation.message, 'error');
      progressDiv.style.display = 'none';
      return;
    }
    
    const unitUsaha = await API.get('/api/unit-usaha');
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const progress = ((i + 1) / data.length) * 100;
      progressBar.style.width = progress + '%';
      progressText.textContent = `Memproses baris ${i + 1} dari ${data.length}...`;
      
      let unitUsahaId = null;
      if (row['Unit Usaha']) {
        const unit = unitUsaha.find(u => u.nama_usaha === row['Unit Usaha']);
        unitUsahaId = unit ? unit.id : null;
      }
      
      const jumlahPenjualan = importer.formatCurrency(row['Jumlah Penjualan']);
      const hpp = importer.formatCurrency(row['HPP'] || 0);
      
      const postData = {
        unit_usaha_id: unitUsahaId,
        jumlah_penjualan: jumlahPenjualan,
        hpp: hpp,
        keuntungan: jumlahPenjualan - hpp,
        tanggal_transaksi: importer.formatDate(row['Tanggal']) || new Date().toISOString().split('T')[0],
        keterangan: row['Keterangan'] || ''
      };
      
      try {
        await API.post('/api/transaksi/penjualan', postData);
        successCount++;
      } catch (error) {
        errorCount++;
        errors.push(`Baris ${i + 2}: ${error.message}`);
      }
    }
    
    progressDiv.style.display = 'none';
    
    let message = `Import selesai!\n✓ Berhasil: ${successCount}\n✗ Gagal: ${errorCount}`;
    if (errors.length > 0 && errors.length <= 5) {
      message += '\n\nError:\n' + errors.join('\n');
    }
    
    showNotification(message, successCount > 0 ? 'success' : 'error');
    
    if (successCount > 0) {
      document.querySelector('.modal').remove();
      if (typeof window.renderPenjualan === 'function') {
        window.renderPenjualan();
      } else {
        loadPage('penjualan');
      }
    }
    
  } catch (error) {
    progressDiv.style.display = 'none';
    showNotification('Error: ' + error.message, 'error');
  }
};

// ===== IMPORT PENGELUARAN =====
window.importPengeluaranExcel = function() {
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 600px;">
      <div class="modal-header">
        <h3 class="modal-title">Import Pengeluaran dari Excel</h3>
        <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
      </div>
      
      <div style="padding: 24px;">
        <div class="info-box" style="background: #E3F2FD; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 12px 0; color: #1976D2;">📋 Format Excel yang Diperlukan:</h4>
          <table style="width: 100%; font-size: 13px;">
            <tr style="background: #fff;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Unit Usaha</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Nama unit usaha</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Kategori</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Kategori pengeluaran (wajib)</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Jumlah</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Nominal pengeluaran (wajib)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Tanggal</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Format: YYYY-MM-DD</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Keterangan</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Catatan (opsional)</td>
            </tr>
          </table>
        </div>
        
        <div class="form-group">
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Pilih File Excel (.xlsx atau .xls)</label>
          <input type="file" id="importFilePengeluaran" accept=".xlsx,.xls" style="width: 100%; padding: 10px; border: 2px dashed #2E7D32; border-radius: 8px; background: #F1F8E9;">
        </div>
        
        <div style="margin-top: 20px; display: flex; gap: 12px;">
          <button class="btn btn-secondary" onclick="downloadTemplatePengeluaran()" style="flex: 1;">
            <i data-feather="download"></i> Download Template
          </button>
          <button class="btn btn-primary" onclick="prosesImportPengeluaranExcel()" style="flex: 1;">
            <i data-feather="upload"></i> Import Data
          </button>
        </div>
        
        <div id="importProgressPengeluaran" style="margin-top: 20px; display: none;">
          <div style="background: #f5f5f5; border-radius: 8px; padding: 16px;">
            <div style="font-weight: 600; margin-bottom: 8px;">Memproses...</div>
            <div style="background: #ddd; height: 8px; border-radius: 4px; overflow: hidden;">
              <div id="progressBarPengeluaran" style="background: #2E7D32; height: 100%; width: 0%; transition: width 0.3s;"></div>
            </div>
            <div id="progressTextPengeluaran" style="margin-top: 8px; font-size: 13px; color: #666;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  feather.replace();
};

window.downloadTemplatePengeluaran = function() {
  const columns = ['Unit Usaha', 'Kategori', 'Jumlah', 'Tanggal', 'Keterangan'];
  const sampleData = [
    ['Toko Sembako', 'Gaji Karyawan', '3000000', '2024-01-15', 'Gaji bulan Januari'],
    ['Warung Kopi', 'Listrik & Air', '500000', '2024-01-15', 'Tagihan bulanan']
  ];
  
  const ws = XLSX.utils.aoa_to_sheet([columns, ...sampleData]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Pengeluaran');
  XLSX.writeFile(wb, `Template_Pengeluaran_${new Date().toISOString().split('T')[0]}.xlsx`);
  
  showNotification('Template berhasil didownload', 'success');
};

window.prosesImportPengeluaranExcel = async function() {
  const fileInput = document.getElementById('importFilePengeluaran');
  const file = fileInput.files[0];
  
  if (!file) {
    showNotification('Pilih file Excel terlebih dahulu', 'error');
    return;
  }
  
  const progressDiv = document.getElementById('importProgressPengeluaran');
  const progressBar = document.getElementById('progressBarPengeluaran');
  const progressText = document.getElementById('progressTextPengeluaran');
  
  progressDiv.style.display = 'block';
  progressText.textContent = 'Membaca file...';
  
  try {
    const importer = new ExcelImporter();
    await importer.loadFile(file);
    
    const sheetNames = importer.getSheetNames();
    const data = importer.parseSheet(sheetNames[0]);
    
    const requiredColumns = ['Kategori', 'Jumlah'];
    const validation = importer.validateColumns(data, requiredColumns);
    
    if (!validation.valid) {
      showNotification(validation.message, 'error');
      progressDiv.style.display = 'none';
      return;
    }
    
    const unitUsaha = await API.get('/api/unit-usaha');
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const progress = ((i + 1) / data.length) * 100;
      progressBar.style.width = progress + '%';
      progressText.textContent = `Memproses baris ${i + 1} dari ${data.length}...`;
      
      let unitUsahaId = null;
      if (row['Unit Usaha']) {
        const unit = unitUsaha.find(u => u.nama_usaha === row['Unit Usaha']);
        unitUsahaId = unit ? unit.id : null;
      }
      
      const postData = {
        unit_usaha_id: unitUsahaId,
        kategori: row['Kategori'],
        jumlah: importer.formatCurrency(row['Jumlah']),
        tanggal_transaksi: importer.formatDate(row['Tanggal']) || new Date().toISOString().split('T')[0],
        keterangan: row['Keterangan'] || ''
      };
      
      try {
        await API.post('/api/transaksi/pengeluaran', postData);
        successCount++;
      } catch (error) {
        errorCount++;
        errors.push(`Baris ${i + 2}: ${error.message}`);
      }
    }
    
    progressDiv.style.display = 'none';
    
    let message = `Import selesai!\n✓ Berhasil: ${successCount}\n✗ Gagal: ${errorCount}`;
    if (errors.length > 0 && errors.length <= 5) {
      message += '\n\nError:\n' + errors.join('\n');
    }
    
    showNotification(message, successCount > 0 ? 'success' : 'error');
    
    if (successCount > 0) {
      document.querySelector('.modal').remove();
      if (typeof window.renderPengeluaran === 'function') {
        window.renderPengeluaran();
      } else {
        loadPage('pengeluaran');
      }
    }
    
  } catch (error) {
    progressDiv.style.display = 'none';
    showNotification('Error: ' + error.message, 'error');
  }
};

// ===== IMPORT PENDAPATAN LAIN =====
window.importPendapatanLainExcel = function() {
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 600px;">
      <div class="modal-header">
        <h3 class="modal-title">Import Pendapatan Lain dari Excel</h3>
        <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
      </div>
      
      <div style="padding: 24px;">
        <div class="info-box" style="background: #E3F2FD; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 12px 0; color: #1976D2;">📋 Format Excel yang Diperlukan:</h4>
          <table style="width: 100%; font-size: 13px;">
            <tr style="background: #fff;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Unit Usaha</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Nama unit usaha</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Kategori</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Kategori pendapatan (wajib)</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Jumlah</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Nominal pendapatan (wajib)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Tanggal</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Format: YYYY-MM-DD</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Keterangan</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Catatan (opsional)</td>
            </tr>
          </table>
        </div>
        
        <div class="form-group">
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Pilih File Excel (.xlsx atau .xls)</label>
          <input type="file" id="importFilePendapatanLain" accept=".xlsx,.xls" style="width: 100%; padding: 10px; border: 2px dashed #2E7D32; border-radius: 8px; background: #F1F8E9;">
        </div>
        
        <div style="margin-top: 20px; display: flex; gap: 12px;">
          <button class="btn btn-secondary" onclick="downloadTemplatePendapatanLain()" style="flex: 1;">
            <i data-feather="download"></i> Download Template
          </button>
          <button class="btn btn-primary" onclick="prosesImportPendapatanLainExcel()" style="flex: 1;">
            <i data-feather="upload"></i> Import Data
          </button>
        </div>
        
        <div id="importProgressPendapatanLain" style="margin-top: 20px; display: none;">
          <div style="background: #f5f5f5; border-radius: 8px; padding: 16px;">
            <div style="font-weight: 600; margin-bottom: 8px;">Memproses...</div>
            <div style="background: #ddd; height: 8px; border-radius: 4px; overflow: hidden;">
              <div id="progressBarPendapatanLain" style="background: #2E7D32; height: 100%; width: 0%; transition: width 0.3s;"></div>
            </div>
            <div id="progressTextPendapatanLain" style="margin-top: 8px; font-size: 13px; color: #666;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  feather.replace();
};

window.downloadTemplatePendapatanLain = function() {
  const columns = ['Unit Usaha', 'Kategori', 'Jumlah', 'Tanggal', 'Keterangan'];
  const sampleData = [
    ['Toko Sembako', 'Sewa Tempat', '2000000', '2024-01-15', 'Sewa kios'],
    ['', 'Bunga Bank', '500000', '2024-01-15', 'Bunga deposito']
  ];
  
  const ws = XLSX.utils.aoa_to_sheet([columns, ...sampleData]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Pendapatan Lain');
  XLSX.writeFile(wb, `Template_Pendapatan_Lain_${new Date().toISOString().split('T')[0]}.xlsx`);
  
  showNotification('Template berhasil didownload', 'success');
};

window.prosesImportPendapatanLainExcel = async function() {
  const fileInput = document.getElementById('importFilePendapatanLain');
  const file = fileInput.files[0];
  
  if (!file) {
    showNotification('Pilih file Excel terlebih dahulu', 'error');
    return;
  }
  
  const progressDiv = document.getElementById('importProgressPendapatanLain');
  const progressBar = document.getElementById('progressBarPendapatanLain');
  const progressText = document.getElementById('progressTextPendapatanLain');
  
  progressDiv.style.display = 'block';
  progressText.textContent = 'Membaca file...';
  
  try {
    const importer = new ExcelImporter();
    await importer.loadFile(file);
    
    const sheetNames = importer.getSheetNames();
    const data = importer.parseSheet(sheetNames[0]);
    
    const requiredColumns = ['Kategori', 'Jumlah'];
    const validation = importer.validateColumns(data, requiredColumns);
    
    if (!validation.valid) {
      showNotification(validation.message, 'error');
      progressDiv.style.display = 'none';
      return;
    }
    
    const unitUsaha = await API.get('/api/unit-usaha');
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const progress = ((i + 1) / data.length) * 100;
      progressBar.style.width = progress + '%';
      progressText.textContent = `Memproses baris ${i + 1} dari ${data.length}...`;
      
      let unitUsahaId = null;
      if (row['Unit Usaha']) {
        const unit = unitUsaha.find(u => u.nama_usaha === row['Unit Usaha']);
        unitUsahaId = unit ? unit.id : null;
      }
      
      const postData = {
        unit_usaha_id: unitUsahaId,
        kategori: row['Kategori'],
        jumlah: importer.formatCurrency(row['Jumlah']),
        tanggal_transaksi: importer.formatDate(row['Tanggal']) || new Date().toISOString().split('T')[0],
        keterangan: row['Keterangan'] || ''
      };
      
      try {
        await API.post('/api/transaksi/pendapatan-lain', postData);
        successCount++;
      } catch (error) {
        errorCount++;
        errors.push(`Baris ${i + 2}: ${error.message}`);
      }
    }
    
    progressDiv.style.display = 'none';
    
    let message = `Import selesai!\n✓ Berhasil: ${successCount}\n✗ Gagal: ${errorCount}`;
    if (errors.length > 0 && errors.length <= 5) {
      message += '\n\nError:\n' + errors.join('\n');
    }
    
    showNotification(message, successCount > 0 ? 'success' : 'error');
    
    if (successCount > 0) {
      document.querySelector('.modal').remove();
      if (typeof window.renderPendapatanLain === 'function') {
        window.renderPendapatanLain();
      } else {
        loadPage('pendapatan-lain');
      }
    }
    
  } catch (error) {
    progressDiv.style.display = 'none';
    showNotification('Error: ' + error.message, 'error');
  }
};


// ===== MENU IMPORT SIMPANAN (untuk halaman unified) =====
window.showImportSimpananMenu = function() {
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 500px;">
      <div class="modal-header">
        <h3 class="modal-title">Import Simpanan dari Excel</h3>
        <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
      </div>
      
      <div style="padding: 24px;">
        <p style="margin-bottom: 20px; color: #666;">Pilih jenis simpanan yang ingin diimport:</p>
        
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <button class="btn btn-primary" onclick="this.closest('.modal').remove(); importSimpananExcel('pokok')" style="justify-content: flex-start; padding: 16px;">
            <i data-feather="dollar-sign"></i>
            <span style="margin-left: 12px;">Simpanan Pokok</span>
          </button>
          
          <button class="btn btn-primary" onclick="this.closest('.modal').remove(); importSimpananExcel('wajib')" style="justify-content: flex-start; padding: 16px;">
            <i data-feather="dollar-sign"></i>
            <span style="margin-left: 12px;">Simpanan Wajib</span>
          </button>
          
          <button class="btn btn-primary" onclick="this.closest('.modal').remove(); importSimpananExcel('khusus')" style="justify-content: flex-start; padding: 16px;">
            <i data-feather="dollar-sign"></i>
            <span style="margin-left: 12px;">Simpanan Khusus</span>
          </button>
          
          <button class="btn btn-primary" onclick="this.closest('.modal').remove(); importSimpananExcel('sukarela')" style="justify-content: flex-start; padding: 16px;">
            <i data-feather="dollar-sign"></i>
            <span style="margin-left: 12px;">Simpanan Sukarela</span>
          </button>
        </div>
        
        <button class="btn btn-secondary" onclick="this.closest('.modal').remove()" style="width: 100%; margin-top: 20px;">
          <i data-feather="x"></i> Batal
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  feather.replace();
};
