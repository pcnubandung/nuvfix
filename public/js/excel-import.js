// Excel Import Helper
// Menggunakan SheetJS (xlsx) library

class ExcelImporter {
  constructor() {
    this.workbook = null;
    this.data = [];
  }

  // Load Excel file
  async loadFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          this.workbook = XLSX.read(data, { type: 'array' });
          resolve(this.workbook);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }

  // Get sheet names
  getSheetNames() {
    if (!this.workbook) return [];
    return this.workbook.SheetNames;
  }

  // Parse sheet to JSON
  parseSheet(sheetName) {
    if (!this.workbook) return [];
    
    const worksheet = this.workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
      raw: false,
      defval: null 
    });
    
    this.data = jsonData;
    return jsonData;
  }

  // Validate required columns
  validateColumns(data, requiredColumns) {
    if (!data || data.length === 0) {
      return { valid: false, message: 'File Excel kosong' };
    }

    const firstRow = data[0];
    const missingColumns = [];

    requiredColumns.forEach(col => {
      if (!(col in firstRow)) {
        missingColumns.push(col);
      }
    });

    if (missingColumns.length > 0) {
      return {
        valid: false,
        message: `Kolom yang diperlukan tidak ditemukan: ${missingColumns.join(', ')}`
      };
    }

    return { valid: true };
  }

  // Format date from Excel
  formatDate(excelDate) {
    if (!excelDate) return null;
    
    // If already in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(excelDate)) {
      return excelDate;
    }
    
    // If Excel serial date
    if (typeof excelDate === 'number') {
      const date = XLSX.SSF.parse_date_code(excelDate);
      return `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
    }
    
    // Try to parse as date string
    try {
      const date = new Date(excelDate);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    } catch (e) {
      console.error('Error parsing date:', e);
    }
    
    return null;
  }

  // Format currency (remove Rp, dots, commas)
  formatCurrency(value) {
    if (!value) return 0;
    
    // If already a number
    if (typeof value === 'number') return value;
    
    // Remove Rp, dots, commas, spaces
    const cleaned = String(value)
      .replace(/Rp\.?/gi, '')
      .replace(/\./g, '')
      .replace(/,/g, '')
      .replace(/\s/g, '')
      .trim();
    
    return parseFloat(cleaned) || 0;
  }

  // Download template
  static downloadTemplate(templateName, columns, filename) {
    const ws = XLSX.utils.aoa_to_sheet([columns]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, templateName);
    XLSX.writeFile(wb, filename);
  }
}

// Export for use in other files
window.ExcelImporter = ExcelImporter;
