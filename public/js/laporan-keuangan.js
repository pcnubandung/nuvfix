// Laporan Keuangan - Buku Kas
// Override any existing renderLaporan function
window.renderLaporan = async function() {
  console.log('renderLaporan from laporan-keuangan.js called');
  contentArea.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Laporan Keuangan - Buku Kas</h3>
        <div class="btn-group">
          <button class="btn btn-success" onclick="exportBukuKas()">
            <i data-feather="download"></i> Export Excel
          </button>
          <button class="btn btn-warning" onclick="cetakBukuKas()">
            <i data-feather="printer"></i> Cetak
          </button>
        </div>
      </div>
      
      <div class="card-body">
        <!-- Filter Periode -->
        <div class="filter-section" style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
          <div class="form-row">
            <div class="form-group">
              <label>Dari Tanggal</label>
              <input type="date" id="filterTanggalMulai" onchange="filterBukuKas()">
            </div>
            <div class="form-group">
              <label>Sampai Tanggal</label>
              <input type="date" id="filterTanggalAkhir" onchange="filterBukuKas()">
            </div>
            <div class="form-group" style="display: flex; align-items: flex-end;">
              <button class="btn btn-primary" onclick="filterBukuKas()">
                <i data-feather="filter"></i> Filter
              </button>
              <button class="btn btn-secondary" onclick="resetFilterBukuKas()" style="margin-left: 10px;">
                <i data-feather="x"></i> Reset
              </button>
            </div>
          </div>
        </div>
        
        <!-- Tabel Buku Kas -->
        <div class="table-container" id="bukuKasContainer">
          <div class="loading">Memuat data...</div>
        </div>
      </div>
    </div>
  `;
  
  feather.replace();
  await loadBukuKasData();
};

// Load dan render data Buku Kas
window.loadBukuKasData = async function() {
  try {
    // Ambil semua data transaksi
    const [simpanan, penjualan, pengeluaran, pendapatanLain] = await Promise.all([
      API.get('/api/simpanan/all'),
      API.get('/api/transaksi/penjualan'),
      API.get('/api/transaksi/pengeluaran'),
      API.get('/api/transaksi/pendapatan-lain')
    ]);
    
    // Gabungkan semua transaksi
    const allTransaksi = [];
    
    // Transaksi Simpanan (Penerimaan)
    simpanan.forEach(item => {
      allTransaksi.push({
        tanggal: item.tanggal_transaksi,
        uraian: `Simpanan ${item.jenis_simpanan} - ${item.nama_lengkap} (${item.nomor_anggota})`,
        penerimaan: parseFloat(item.jumlah || 0),
        pengeluaran: 0,
        sumber: 'Simpanan'
      });
    });
    
    // Hasil Penjualan (Penerimaan)
    penjualan.forEach(item => {
      allTransaksi.push({
        tanggal: item.tanggal_transaksi,
        uraian: `Penjualan - ${item.keterangan || 'Hasil Penjualan'} (${item.nama_usaha || '-'})`,
        penerimaan: parseFloat(item.jumlah_penjualan || 0),
        pengeluaran: 0,
        sumber: 'Penjualan'
      });
    });
    
    // Pendapatan Lain (Penerimaan)
    pendapatanLain.forEach(item => {
      allTransaksi.push({
        tanggal: item.tanggal_transaksi,
        uraian: `Pendapatan Lain - ${item.keterangan || '-'}`,
        penerimaan: parseFloat(item.jumlah || 0),
        pengeluaran: 0,
        sumber: 'Pendapatan Lain'
      });
    });
    
    // Pengeluaran
    pengeluaran.forEach(item => {
      allTransaksi.push({
        tanggal: item.tanggal_transaksi,
        uraian: `${item.kategori || 'Pengeluaran'} - ${item.keterangan || '-'}`,
        penerimaan: 0,
        pengeluaran: parseFloat(item.jumlah || 0),
        sumber: 'Pengeluaran'
      });
    });
    
    // Urutkan berdasarkan tanggal
    allTransaksi.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
    
    // Simpan ke global variable untuk filter
    window.bukuKasData = allTransaksi;
    
    // Render tabel
    renderBukuKasTable(allTransaksi);
    
  } catch (error) {
    console.error('Error loading buku kas:', error);
    document.getElementById('bukuKasContainer').innerHTML = `
      <div class="error-message">
        <p>Terjadi kesalahan saat memuat data: ${error.message}</p>
      </div>
    `;
  }
};

// Render tabel Buku Kas
window.renderBukuKasTable = function(data) {
  let saldo = 0;
  let totalPenerimaan = 0;
  let totalPengeluaran = 0;
  
  const rows = data.map((item, index) => {
    saldo += item.penerimaan - item.pengeluaran;
    totalPenerimaan += item.penerimaan;
    totalPengeluaran += item.pengeluaran;
    
    return `
      <tr>
        <td style="text-align: center;">${index + 1}</td>
        <td>${formatDate(item.tanggal)}</td>
        <td>${item.uraian}</td>
        <td style="text-align: right;">${item.penerimaan > 0 ? formatCurrency(item.penerimaan) : '-'}</td>
        <td style="text-align: right;">${item.pengeluaran > 0 ? formatCurrency(item.pengeluaran) : '-'}</td>
        <td style="text-align: right; font-weight: bold; color: ${saldo >= 0 ? '#2E7D32' : '#d32f2f'};">
          ${formatCurrency(saldo)}
        </td>
      </tr>
    `;
  }).join('');
  
  const html = `
    <table>
      <thead>
        <tr>
          <th style="width: 50px; text-align: center;">No.</th>
          <th style="width: 120px;">Tanggal</th>
          <th>Uraian</th>
          <th style="width: 150px; text-align: right;">Penerimaan (Rp)</th>
          <th style="width: 150px; text-align: right;">Pengeluaran (Rp)</th>
          <th style="width: 150px; text-align: right;">Saldo (Rp)</th>
        </tr>
      </thead>
      <tbody>
        ${data.length > 0 ? rows : '<tr><td colspan="6" style="text-align: center; color: #999;">Tidak ada data transaksi</td></tr>'}
      </tbody>
      <tfoot>
        <tr style="background: #f8f9fa; font-weight: bold;">
          <td colspan="3" style="text-align: right;"><strong>TOTAL</strong></td>
          <td style="text-align: right; color: #2E7D32;"><strong>${formatCurrency(totalPenerimaan)}</strong></td>
          <td style="text-align: right; color: #d32f2f;"><strong>${formatCurrency(totalPengeluaran)}</strong></td>
          <td style="text-align: right; color: ${saldo >= 0 ? '#2E7D32' : '#d32f2f'};"><strong>${formatCurrency(saldo)}</strong></td>
        </tr>
      </tfoot>
    </table>
    
    <div style="margin-top: 20px; padding: 16px; background: #e8f5e9; border-radius: 8px; border-left: 4px solid #2E7D32;">
      <h4 style="margin: 0 0 8px 0; color: #1B5E20;">📊 Ringkasan</h4>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 10px;">
        <div>
          <p style="margin: 0; color: #666; font-size: 13px;">Total Penerimaan</p>
          <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: #2E7D32;">${formatCurrency(totalPenerimaan)}</p>
        </div>
        <div>
          <p style="margin: 0; color: #666; font-size: 13px;">Total Pengeluaran</p>
          <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: #d32f2f;">${formatCurrency(totalPengeluaran)}</p>
        </div>
        <div>
          <p style="margin: 0; color: #666; font-size: 13px;">Saldo Akhir</p>
          <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: ${saldo >= 0 ? '#2E7D32' : '#d32f2f'};">${formatCurrency(saldo)}</p>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('bukuKasContainer').innerHTML = html;
  feather.replace();
};

// Filter Buku Kas berdasarkan periode
window.filterBukuKas = function() {
  const tanggalMulai = document.getElementById('filterTanggalMulai').value;
  const tanggalAkhir = document.getElementById('filterTanggalAkhir').value;
  
  if (!window.bukuKasData) return;
  
  let filteredData = window.bukuKasData;
  
  if (tanggalMulai) {
    filteredData = filteredData.filter(item => item.tanggal >= tanggalMulai);
  }
  
  if (tanggalAkhir) {
    filteredData = filteredData.filter(item => item.tanggal <= tanggalAkhir);
  }
  
  renderBukuKasTable(filteredData);
};

// Reset filter
window.resetFilterBukuKas = function() {
  document.getElementById('filterTanggalMulai').value = '';
  document.getElementById('filterTanggalAkhir').value = '';
  
  if (window.bukuKasData) {
    renderBukuKasTable(window.bukuKasData);
  }
};

// Export Buku Kas ke Excel
window.exportBukuKas = function() {
  console.log('exportBukuKas called');
  console.log('bukuKasData:', window.bukuKasData);
  
  if (!window.bukuKasData || window.bukuKasData.length === 0) {
    alert('Tidak ada data untuk diexport');
    return;
  }
  
  // Helper function untuk format tanggal
  const formatTanggal = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  // Ambil data yang sedang ditampilkan (sudah difilter)
  const tanggalMulai = document.getElementById('filterTanggalMulai').value;
  const tanggalAkhir = document.getElementById('filterTanggalAkhir').value;
  
  let data = [...window.bukuKasData];
  
  if (tanggalMulai) {
    data = data.filter(item => item.tanggal >= tanggalMulai);
  }
  
  if (tanggalAkhir) {
    data = data.filter(item => item.tanggal <= tanggalAkhir);
  }
  
  let saldo = 0;
  let totalPenerimaan = 0;
  let totalPengeluaran = 0;
  
  // Header CSV
  let csv = 'No.,Tanggal,Uraian,Penerimaan (Rp),Pengeluaran (Rp),Saldo (Rp)\n';
  
  // Data rows
  data.forEach((item, index) => {
    saldo += item.penerimaan - item.pengeluaran;
    totalPenerimaan += item.penerimaan;
    totalPengeluaran += item.pengeluaran;
    
    // Escape quotes in uraian
    const uraian = (item.uraian || '').replace(/"/g, '""');
    
    csv += `${index + 1},"${formatTanggal(item.tanggal)}","${uraian}",${item.penerimaan},${item.pengeluaran},${saldo}\n`;
  });
  
  // Total row
  csv += `\nTOTAL,,,${totalPenerimaan},${totalPengeluaran},${saldo}\n`;
  
  // Create and download
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `buku-kas-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  alert('Data Buku Kas berhasil diexport!');
};

// Cetak Buku Kas
window.cetakBukuKas = async function() {
  console.log('cetakBukuKas called');
  console.log('bukuKasData:', window.bukuKasData);
  
  if (!window.bukuKasData || window.bukuKasData.length === 0) {
    alert('Tidak ada data untuk dicetak');
    return;
  }
  
  try {
    const info = await API.get('/api/koperasi-info');
    
    // Helper functions untuk format
    const formatTanggal = (dateStr) => {
      if (!dateStr) return '-';
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    
    const formatRupiah = (amount) => {
      if (!amount && amount !== 0) return 'Rp 0';
      return 'Rp ' + Math.abs(amount).toLocaleString('id-ID');
    };
    
    // Ambil data yang sedang ditampilkan (sudah difilter)
    const tanggalMulai = document.getElementById('filterTanggalMulai').value;
    const tanggalAkhir = document.getElementById('filterTanggalAkhir').value;
    
    let data = [...window.bukuKasData];
    
    if (tanggalMulai) {
      data = data.filter(item => item.tanggal >= tanggalMulai);
    }
    
    if (tanggalAkhir) {
      data = data.filter(item => item.tanggal <= tanggalAkhir);
    }
    
    let saldo = 0;
    let totalPenerimaan = 0;
    let totalPengeluaran = 0;
    
    const rows = data.map((item, index) => {
      saldo += item.penerimaan - item.pengeluaran;
      totalPenerimaan += item.penerimaan;
      totalPengeluaran += item.pengeluaran;
      
      return `
        <tr>
          <td style="text-align: center;">${index + 1}</td>
          <td>${formatTanggal(item.tanggal)}</td>
          <td>${item.uraian || '-'}</td>
          <td style="text-align: right;">${item.penerimaan > 0 ? formatRupiah(item.penerimaan) : '-'}</td>
          <td style="text-align: right;">${item.pengeluaran > 0 ? formatRupiah(item.pengeluaran) : '-'}</td>
          <td style="text-align: right; font-weight: bold;">${formatRupiah(saldo)}</td>
        </tr>
      `;
    }).join('');
    
    const periode = tanggalMulai && tanggalAkhir 
      ? `Periode: ${formatTanggal(tanggalMulai)} s/d ${formatTanggal(tanggalAkhir)}`
      : 'Semua Periode';
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Buku Kas - ${info.nama_koperasi || 'Koperasi'}</title>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px; }
          .header h2 { margin: 5px 0; }
          .header p { margin: 3px 0; font-size: 14px; }
          .periode { text-align: center; margin: 15px 0; font-weight: bold; font-size: 14px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px; }
          th, td { border: 1px solid #333; padding: 6px; }
          th { background-color: #2E7D32; color: white; text-align: center; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          tfoot tr { background-color: #f0f0f0; font-weight: bold; }
          .summary { margin-top: 20px; padding: 15px; background: #f8f9fa; border: 1px solid #ddd; }
          .summary-row { display: flex; justify-content: space-between; margin: 8px 0; }
          .footer { margin-top: 30px; font-size: 12px; text-align: right; }
          @media print {
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>${info.nama_koperasi || 'Koperasi'}</h2>
          <p>${info.alamat || ''}</p>
          <p>Telp: ${info.nomor_telpon || '-'} | Email: ${info.email || '-'}</p>
          <h3 style="margin-top: 15px;">BUKU KAS</h3>
        </div>
        
        <div class="periode">${periode}</div>
        
        <table>
          <thead>
            <tr>
              <th style="width: 40px;">No.</th>
              <th style="width: 90px;">Tanggal</th>
              <th>Uraian</th>
              <th style="width: 120px;">Penerimaan (Rp)</th>
              <th style="width: 120px;">Pengeluaran (Rp)</th>
              <th style="width: 120px;">Saldo (Rp)</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="text-align: right;"><strong>TOTAL</strong></td>
              <td style="text-align: right;"><strong>${formatRupiah(totalPenerimaan)}</strong></td>
              <td style="text-align: right;"><strong>${formatRupiah(totalPengeluaran)}</strong></td>
              <td style="text-align: right;"><strong>${formatRupiah(saldo)}</strong></td>
            </tr>
          </tfoot>
        </table>
        
        <div class="summary">
          <h4 style="margin: 0 0 10px 0;">Ringkasan</h4>
          <div class="summary-row">
            <span>Total Penerimaan:</span>
            <strong>${formatRupiah(totalPenerimaan)}</strong>
          </div>
          <div class="summary-row">
            <span>Total Pengeluaran:</span>
            <strong>${formatRupiah(totalPengeluaran)}</strong>
          </div>
          <div class="summary-row" style="border-top: 2px solid #333; padding-top: 8px; margin-top: 8px;">
            <span>Saldo Akhir:</span>
            <strong style="color: ${saldo >= 0 ? '#2E7D32' : '#d32f2f'};">${formatRupiah(saldo)}</strong>
          </div>
        </div>
        
        <div class="footer">
          <p>Dicetak pada: ${new Date().toLocaleString('id-ID')}</p>
        </div>
        
        <div style="margin-top: 20px; text-align: center;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #2E7D32; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Cetak Dokumen
          </button>
          <button onclick="window.close()" style="padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
            Tutup
          </button>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  } catch (error) {
    console.error('Error cetak buku kas:', error);
    alert('Terjadi kesalahan saat mencetak: ' + error.message);
  }
};

console.log('=== LAPORAN KEUANGAN JS LOADED ===');
