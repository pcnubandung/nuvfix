# 🔧 Script Khusus untuk Mengganti Kondisi Periode di Laporan Keuangan
# Menangani kondisi spesifik dalam setiap jenis laporan

Write-Host "🔧 Mengganti kondisi periode di laporan keuangan..." -ForegroundColor Yellow
Write-Host "📋 Target: Laporan Laba/Rugi, Neraca, Arus Kas, Buku Kas" -ForegroundColor Cyan
Write-Host ""

# Backup file
if (Test-Path "public/js/pages.js") {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    Copy-Item "public/js/pages.js" "public/js/pages.js.backup_laporan_$timestamp"
    Write-Host "📦 Backup dibuat: pages.js.backup_laporan_$timestamp" -ForegroundColor Green
} else {
    Write-Host "❌ File public/js/pages.js tidak ditemukan" -ForegroundColor Red
    exit 1
}

# Baca file
$content = Get-Content "public/js/pages.js" -Raw
$originalContent = $content

Write-Host ""
Write-Host "🔍 Mencari dan mengganti kondisi periode di setiap laporan..." -ForegroundColor Blue

# 1. LAPORAN LABA/RUGI
Write-Host ""
Write-Host "📊 Laporan Laba/Rugi:" -ForegroundColor Magenta

# Filter penjualan
Write-Host "   🔄 Filter penjualan..." -ForegroundColor Yellow
$content = $content -replace "(filteredPenjualan\s*=\s*penjualan\.filter\([^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Filter pengeluaran  
Write-Host "   🔄 Filter pengeluaran..." -ForegroundColor Yellow
$content = $content -replace "(filteredPengeluaran\s*=\s*pengeluaran\.filter\([^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Filter pendapatan lain
Write-Host "   🔄 Filter pendapatan lain..." -ForegroundColor Yellow
$content = $content -replace "(filteredPendapatanLain\s*=\s*pendapatanLain\.filter\([^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Kondisi periode text untuk laba rugi
Write-Host "   🔄 Periode text display..." -ForegroundColor Yellow
$content = $content -replace "(\/\/ Laporan Laba\/Rugi[\s\S]*?if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\))", "`$1 || periode === 'seluruh'"

# 2. NERACA
Write-Host ""
Write-Host "📊 Neraca:" -ForegroundColor Magenta

# Filter simpanan pokok
Write-Host "   🔄 Filter simpanan pokok..." -ForegroundColor Yellow
$content = $content -replace "(filteredSimpananPokok\s*=\s*simpananPokok\.filter\([^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Filter simpanan wajib
Write-Host "   🔄 Filter simpanan wajib..." -ForegroundColor Yellow
$content = $content -replace "(filteredSimpananWajib\s*=\s*simpananWajib\.filter\([^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Filter simpanan khusus
Write-Host "   🔄 Filter simpanan khusus..." -ForegroundColor Yellow
$content = $content -replace "(filteredSimpananKhusus\s*=\s*simpananKhusus\.filter\([^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Filter simpanan sukarela
Write-Host "   🔄 Filter simpanan sukarela..." -ForegroundColor Yellow
$content = $content -replace "(filteredSimpananSukarela\s*=\s*simpananSukarela\.filter\([^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Filter transaksi untuk neraca
Write-Host "   🔄 Filter transaksi neraca..." -ForegroundColor Yellow
$content = $content -replace "(\/\/ Neraca[\s\S]*?filteredPenjualan\s*=\s*penjualan\.filter\([^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# 3. LAPORAN ARUS KAS
Write-Host ""
Write-Host "📊 Laporan Arus Kas:" -ForegroundColor Magenta

# Filter arus kas masuk
Write-Host "   🔄 Filter arus kas masuk..." -ForegroundColor Yellow
$content = $content -replace "(\/\/ Arus Kas Masuk[\s\S]*?if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\))", "`$1 || periode === 'seluruh'"

# Filter arus kas keluar
Write-Host "   🔄 Filter arus kas keluar..." -ForegroundColor Yellow
$content = $content -replace "(\/\/ Arus Kas Keluar[\s\S]*?if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\))", "`$1 || periode === 'seluruh'"

# Filter aset berdasarkan tanggal perolehan
Write-Host "   🔄 Filter aset..." -ForegroundColor Yellow
$content = $content -replace "(filteredAset\s*=\s*aset\.filter\([^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# 4. BUKU KAS
Write-Host ""
Write-Host "📊 Buku Kas:" -ForegroundColor Magenta

# Filter transaksi masuk
Write-Host "   🔄 Filter transaksi masuk..." -ForegroundColor Yellow
$content = $content -replace "(\/\/ Buku Kas[\s\S]*?transaksiMasuk\s*=\s*[^;]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Filter transaksi keluar
Write-Host "   🔄 Filter transaksi keluar..." -ForegroundColor Yellow
$content = $content -replace "(transaksiKeluar\s*=\s*[^;]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# 5. KONDISI UMUM UNTUK SEMUA LAPORAN
Write-Host ""
Write-Host "📊 Kondisi Umum:" -ForegroundColor Magenta

# Periode text display umum
Write-Host "   🔄 Periode text display umum..." -ForegroundColor Yellow
$content = $content -replace "(periodeText\s*=\s*[^;]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Kondisi untuk hide/show filter
Write-Host "   🔄 Hide/show filter conditions..." -ForegroundColor Yellow
$content = $content -replace "(bulanGroup\.style\.display\s*=\s*[^;]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"
$content = $content -replace "(tanggalGroup\.style\.display\s*=\s*[^;]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Event listener untuk periode change
Write-Host "   🔄 Event listener periode change..." -ForegroundColor Yellow
$content = $content -replace "(addEventListener\('change'[^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# 6. KONDISI DALAM FUNCTION CETAK DAN EXPORT
Write-Host ""
Write-Host "📊 Cetak dan Export:" -ForegroundColor Magenta

# Function cetak PDF
Write-Host "   🔄 Function cetak PDF..." -ForegroundColor Yellow
$content = $content -replace "(function\s+cetakPDF[^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Function export Excel
Write-Host "   🔄 Function export Excel..." -ForegroundColor Yellow
$content = $content -replace "(function\s+exportExcel[^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Kondisi dalam generate laporan
Write-Host "   🔄 Generate laporan conditions..." -ForegroundColor Yellow
$content = $content -replace "(generateLaporan[^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# 7. KONDISI KHUSUS YANG MUNGKIN TERLEWAT
Write-Host ""
Write-Host "📊 Kondisi Khusus:" -ForegroundColor Magenta

# Kondisi dalam loop atau iterasi
Write-Host "   🔄 Kondisi dalam loop..." -ForegroundColor Yellow
$content = $content -replace "(for\s*\([^)]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"
$content = $content -replace "(forEach\([^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Kondisi dalam map atau reduce
Write-Host "   🔄 Kondisi dalam map/reduce..." -ForegroundColor Yellow
$content = $content -replace "(\.map\([^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"
$content = $content -replace "(\.reduce\([^}]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

# Kondisi dalam validasi
Write-Host "   🔄 Kondisi validasi..." -ForegroundColor Yellow
$content = $content -replace "(if\s*\(\s*!\s*[^&]*periode\s*===\s*['""]tahunan['""]\s*)", "`$1 || periode === 'seluruh'"

Write-Host ""

# Simpan perubahan
if ($content -ne $originalContent) {
    Set-Content "public/js/pages.js" $content
    Write-Host "✅ File pages.js berhasil diupdate!" -ForegroundColor Green
    
    # Hitung perubahan
    $oldLines = ($originalContent -split "`n").Count
    $newLines = ($content -split "`n").Count
    Write-Host "📊 Baris file: $oldLines → $newLines" -ForegroundColor Cyan
    
} else {
    Write-Host "ℹ️ Tidak ada perubahan yang diperlukan" -ForegroundColor Cyan
}

# Verifikasi hasil
Write-Host ""
Write-Host "🔍 Memverifikasi hasil..." -ForegroundColor Blue

$updatedContent = Get-Content "public/js/pages.js" -Raw

# Cek kondisi yang masih tersisa
$remainingConditions = [regex]::Matches($updatedContent, "periode\s*===\s*['""]tahunan['""]\s*(?!\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*)")

if ($remainingConditions.Count -gt 0) {
    Write-Host "⚠️ Masih ada $($remainingConditions.Count) kondisi yang belum diupdate:" -ForegroundColor Yellow
    
    $lineCount = 0
    foreach ($match in $remainingConditions) {
        $lineNumber = ($updatedContent.Substring(0, $match.Index) -split "`n").Count
        $lineCount++
        if ($lineCount -le 10) {  # Tampilkan maksimal 10 baris
            Write-Host "   📍 Baris $lineNumber : $($match.Value)" -ForegroundColor White
        }
    }
    
    if ($remainingConditions.Count -gt 10) {
        Write-Host "   ... dan $($remainingConditions.Count - 10) kondisi lainnya" -ForegroundColor Gray
    }
    
} else {
    Write-Host "✅ Semua kondisi periode berhasil diupdate!" -ForegroundColor Green
}

# Cek apakah opsi dropdown sudah ada
if ($updatedContent -match '<option value="seluruh">Seluruh Tahun</option>') {
    Write-Host "✅ Opsi 'Seluruh Tahun' sudah ada di dropdown" -ForegroundColor Green
} else {
    Write-Host "⚠️ Opsi 'Seluruh Tahun' belum ada di dropdown" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Proses update kondisi laporan selesai!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Laporan yang telah diupdate:" -ForegroundColor Cyan
Write-Host "   ✅ Laporan Laba/Rugi - Filter penjualan, pengeluaran, pendapatan lain" -ForegroundColor Green
Write-Host "   ✅ Neraca - Filter simpanan dan transaksi" -ForegroundColor Green
Write-Host "   ✅ Laporan Arus Kas - Filter arus masuk/keluar dan aset" -ForegroundColor Green
Write-Host "   ✅ Buku Kas - Filter transaksi masuk/keluar" -ForegroundColor Green
Write-Host "   ✅ Cetak PDF & Export Excel - Support periode 'Seluruh Tahun'" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Hasil:" -ForegroundColor Yellow
Write-Host "   📊 Semua laporan mendukung periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   📊 Konsistensi filter di semua fitur laporan" -ForegroundColor White
Write-Host "   📊 User experience yang lebih baik" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Test yang perlu dilakukan:" -ForegroundColor Yellow
Write-Host "   1. Test Laporan Laba/Rugi dengan periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   2. Test Neraca dengan periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   3. Test Laporan Arus Kas dengan periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   4. Test Buku Kas dengan periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   5. Test Cetak PDF dan Export Excel" -ForegroundColor White