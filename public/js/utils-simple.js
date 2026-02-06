// Simple version of utils.js for debugging

console.log('Loading utils-simple.js...');

// Test function
window.testFunction = function() {
  alert('Test function works!');
  console.log('Test function called');
};

// Simple cetak struk without QR code
window.cetakStruk = function(id, jenis) {
  console.log('cetakStruk called with:', id, jenis);
  
  try {
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert('Pop-up diblokir! Silakan izinkan pop-up untuk mencetak struk.');
      return;
    }
    
    // Simple HTML without complex template
    const html = '<!DOCTYPE html>' +
      '<html><head><title>Struk Test</title></head>' +
      '<body>' +
      '<h1>Test Struk</h1>' +
      '<p>ID: ' + id + '</p>' +
      '<p>Jenis: ' + jenis + '</p>' +
      '<button onclick="window.print()">Print</button>' +
      '<button onclick="window.close()">Close</button>' +
      '</body></html>';
    
    printWindow.document.write(html);
    printWindow.document.close();
    
    console.log('Simple struk opened successfully');
    
  } catch (error) {
    console.error('Error in cetakStruk:', error);
    alert('Error: ' + error.message);
  }
};

// Simple cetak struk pengeluaran
window.cetakStrukPengeluaran = function(id) {
  console.log('cetakStrukPengeluaran called with:', id);
  alert('Cetak Struk Pengeluaran ID: ' + id);
};

// Simple cetak struk pendapatan lain
window.cetakStrukPendapatanLain = function(id) {
  console.log('cetakStrukPendapatanLain called with:', id);
  alert('Cetak Struk Pendapatan Lain ID: ' + id);
};

console.log('utils-simple.js loaded successfully');
console.log('Functions available:');
console.log('- testFunction:', typeof window.testFunction);
console.log('- cetakStruk:', typeof window.cetakStruk);
console.log('- cetakStrukPengeluaran:', typeof window.cetakStrukPengeluaran);
console.log('- cetakStrukPendapatanLain:', typeof window.cetakStrukPendapatanLain);