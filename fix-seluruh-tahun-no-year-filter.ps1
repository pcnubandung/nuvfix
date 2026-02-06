# 🔧 Script untuk Memperbaiki Filter "Seluruh Tahun"
# "Seluruh Tahun" = SEMUA data tanpa filter tahun
# "Tahunan" = Data berdasarkan tahun tertentu

Write-Host "🔧 Memperbaiki logic filter 'Seluruh Tahun'..." -ForegroundColor Yellow
Write-Host "📋 Target: 'Seluruh Tahun' = SEMUA data, 'Tahunan' = Filter tahun tertentu" -ForegroundColor Cyan
Write-Host ""

# Backup file
if (Test-Path "public/js/pages.js") {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    Copy-Item "public/js/pages.js" "public/js/pages.js.backup_seluruh_$timestamp"
    Write-Host "📦 Backup dibuat: pages.js.backup_seluruh_$timestamp" -ForegroundColor Green
} else {
    Write-Host "❌ File public/js/pages.js tidak ditemukan" -ForegroundColor Red
    exit 1
}

# Baca file
$content = Get-Content "public/js/pages.js" -Raw
$originalContent = $content

Write-Host ""
Write-Host "🔍 Mencari dan memperbaiki logic filter periode..." -ForegroundColor Blue

# 1. PERBAIKI KONDISI FILTER UTAMA
Write-Host ""
Write-Host "📊 Memperbaiki kondisi filter utama:" -ForegroundColor Magenta

# Pattern untuk filter berdasarkan periode
Write-Host "   🔄 Memisahkan logic 'tahunan' dan 'seluruh'..." -ForegroundColor Yellow

# Ganti kondisi gabungan menjadi terpisah
$content = $content -replace "if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*\)\s*\{", @"
if (periode === 'tahunan') {
    // Filter berdasarkan tahun tertentu
"@

# Tambahkan kondisi terpisah untuk 'seluruh'
$content = $content -replace "if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\)\s*\{[\s\S]*?filteredData\s*=\s*data\.filter\([^}]*startsWith\(tahun\)[^}]*\);", @"
if (periode === 'tahunan') {
    // Filter berdasarkan tahun tertentu
    filteredData = data.filter(item => item.tanggal_transaksi.startsWith(tahun));
} else if (periode === 'seluruh') {
    // Tampilkan SEMUA data tanpa filter tahun
    filteredData = data;
"@

# 2. PERBAIKI FILTER DI SETIAP LAPORAN
Write-Host ""
Write-Host "📊 Memperbaiki filter di setiap laporan:" -ForegroundColor Magenta

# LAPORAN LABA/RUGI
Write-Host "   🔄 Laporan Laba/Rugi..." -ForegroundColor Yellow
$content = $content -replace "(\/\/ Filter Penjualan[\s\S]*?)if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*\)\s*\{[\s\S]*?filteredPenjualan\s*=\s*penjualan\.filter\([^}]*startsWith\(tahun\)[^}]*\);", @"
`$1if (periode === 'harian' && tanggal) {
    filteredPenjualan = penjualan.filter(item => item.tanggal_transaksi === tanggal);
} else if (periode === 'bulanan' && bulan) {
    filteredPenjualan = penjualan.filter(item => item.tanggal_transaksi.startsWith(`${tahun}-${bulan}`));
} else if (periode === 'tahunan') {
    filteredPenjualan = penjualan.filter(item => item.tanggal_transaksi.startsWith(tahun));
} else if (periode === 'seluruh') {
    filteredPenjualan = penjualan; // SEMUA data penjualan
"@

$content = $content -replace "(\/\/ Filter Pengeluaran[\s\S]*?)if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*\)\s*\{[\s\S]*?filteredPengeluaran\s*=\s*pengeluaran\.filter\([^}]*startsWith\(tahun\)[^}]*\);", @"
`$1if (periode === 'harian' && tanggal) {
    filteredPengeluaran = pengeluaran.filter(item => item.tanggal_transaksi === tanggal);
} else if (periode === 'bulanan' && bulan) {
    filteredPengeluaran = pengeluaran.filter(item => item.tanggal_transaksi.startsWith(`${tahun}-${bulan}`));
} else if (periode === 'tahunan') {
    filteredPengeluaran = pengeluaran.filter(item => item.tanggal_transaksi.startsWith(tahun));
} else if (periode === 'seluruh') {
    filteredPengeluaran = pengeluaran; // SEMUA data pengeluaran
"@

$content = $content -replace "(\/\/ Filter Pendapatan Lain[\s\S]*?)if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*\)\s*\{[\s\S]*?filteredPendapatanLain\s*=\s*pendapatanLain\.filter\([^}]*startsWith\(tahun\)[^}]*\);", @"
`$1if (periode === 'harian' && tanggal) {
    filteredPendapatanLain = pendapatanLain.filter(item => item.tanggal_transaksi === tanggal);
} else if (periode === 'bulanan' && bulan) {
    filteredPendapatanLain = pendapatanLain.filter(item => item.tanggal_transaksi.startsWith(`${tahun}-${bulan}`));
} else if (periode === 'tahunan') {
    filteredPendapatanLain = pendapatanLain.filter(item => item.tanggal_transaksi.startsWith(tahun));
} else if (periode === 'seluruh') {
    filteredPendapatanLain = pendapatanLain; // SEMUA data pendapatan lain
"@

# NERACA
Write-Host "   🔄 Neraca..." -ForegroundColor Yellow
$content = $content -replace "(\/\/ Filter Simpanan[\s\S]*?)if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*\)\s*\{[\s\S]*?filteredSimpanan\s*=\s*simpanan\.filter\([^}]*startsWith\(tahun\)[^}]*\);", @"
`$1if (periode === 'harian' && tanggal) {
    filteredSimpanan = simpanan.filter(item => item.tanggal_transaksi === tanggal);
} else if (periode === 'bulanan' && bulan) {
    filteredSimpanan = simpanan.filter(item => item.tanggal_transaksi.startsWith(`${tahun}-${bulan}`));
} else if (periode === 'tahunan') {
    filteredSimpanan = simpanan.filter(item => item.tanggal_transaksi.startsWith(tahun));
} else if (periode === 'seluruh') {
    filteredSimpanan = simpanan; // SEMUA data simpanan
"@

# LAPORAN ARUS KAS
Write-Host "   🔄 Laporan Arus Kas..." -ForegroundColor Yellow
$content = $content -replace "(\/\/ Filter Arus Kas[\s\S]*?)if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*\)\s*\{[\s\S]*?filteredArusKas\s*=\s*arusKas\.filter\([^}]*startsWith\(tahun\)[^}]*\);", @"
`$1if (periode === 'harian' && tanggal) {
    filteredArusKas = arusKas.filter(item => item.tanggal_transaksi === tanggal);
} else if (periode === 'bulanan' && bulan) {
    filteredArusKas = arusKas.filter(item => item.tanggal_transaksi.startsWith(`${tahun}-${bulan}`));
} else if (periode === 'tahunan') {
    filteredArusKas = arusKas.filter(item => item.tanggal_transaksi.startsWith(tahun));
} else if (periode === 'seluruh') {
    filteredArusKas = arusKas; // SEMUA data arus kas
"@

# BUKU KAS
Write-Host "   🔄 Buku Kas..." -ForegroundColor Yellow
$content = $content -replace "(\/\/ Filter Buku Kas[\s\S]*?)if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*\)\s*\{[\s\S]*?filteredBukuKas\s*=\s*bukuKas\.filter\([^}]*startsWith\(tahun\)[^}]*\);", @"
`$1if (periode === 'harian' && tanggal) {
    filteredBukuKas = bukuKas.filter(item => item.tanggal_transaksi === tanggal);
} else if (periode === 'bulanan' && bulan) {
    filteredBukuKas = bukuKas.filter(item => item.tanggal_transaksi.startsWith(`${tahun}-${bulan}`));
} else if (periode === 'tahunan') {
    filteredBukuKas = bukuKas.filter(item => item.tanggal_transaksi.startsWith(tahun));
} else if (periode === 'seluruh') {
    filteredBukuKas = bukuKas; // SEMUA data buku kas
"@

# 3. PERBAIKI PERIODE TEXT DISPLAY
Write-Host ""
Write-Host "📊 Memperbaiki periode text display:" -ForegroundColor Magenta

Write-Host "   🔄 Periode text untuk 'Seluruh Tahun'..." -ForegroundColor Yellow
$content = $content -replace "(periodeText\s*=[\s\S]*?)if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*\)\s*\{[\s\S]*?periodeText\s*=\s*[^;]*tahun[^;]*;", @"
`$1if (periode === 'harian') {
    periodeText = formatDate(tanggal);
} else if (periode === 'bulanan') {
    periodeText = `${namaBulan[parseInt(bulan) - 1]} ${tahun}`;
} else if (periode === 'tahunan') {
    periodeText = `Tahun ${tahun}`;
} else if (periode === 'seluruh') {
    periodeText = 'Seluruh Data';
"@

# 4. PERBAIKI HIDE/SHOW FILTER
Write-Host ""
Write-Host "📊 Memperbaiki hide/show filter:" -ForegroundColor Magenta

Write-Host "   🔄 Hide filter untuk 'Seluruh Tahun'..." -ForegroundColor Yellow
$content = $content -replace "(addEventListener\('change'[\s\S]*?)if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*\)\s*\{[\s\S]*?bulanGroup\.style\.display\s*=\s*['""]none['""]\s*;[\s\S]*?tanggalGroup\.style\.display\s*=\s*['""]none['""]\s*;", @"
`$1if (periode === 'harian') {
    bulanGroup.style.display = 'none';
    tanggalGroup.style.display = 'block';
    tahunGroup.style.display = 'block';
} else if (periode === 'bulanan') {
    bulanGroup.style.display = 'block';
    tanggalGroup.style.display = 'none';
    tahunGroup.style.display = 'block';
} else if (periode === 'tahunan') {
    bulanGroup.style.display = 'none';
    tanggalGroup.style.display = 'none';
    tahunGroup.style.display = 'block';
} else if (periode === 'seluruh') {
    // Hide SEMUA filter untuk 'Seluruh Tahun'
    bulanGroup.style.display = 'none';
    tanggalGroup.style.display = 'none';
    tahunGroup.style.display = 'none';
"@

# 5. PERBAIKI VALIDASI
Write-Host ""
Write-Host "📊 Memperbaiki validasi:" -ForegroundColor Magenta

Write-Host "   🔄 Validasi untuk 'Seluruh Tahun'..." -ForegroundColor Yellow
$content = $content -replace "(\/\/ Validasi[\s\S]*?)if\s*\(\s*periode\s*===\s*['""]harian['""]\s*&&\s*!\s*tanggal\s*\)\s*\{[\s\S]*?\}\s*else\s*if\s*\(\s*periode\s*===\s*['""]bulanan['""]\s*&&\s*!\s*bulan\s*\)\s*\{[\s\S]*?\}\s*else\s*if\s*\(\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*\)\s*&&\s*!\s*tahun\s*\)\s*\{[\s\S]*?\}", @"
`$1if (periode === 'harian' && !tanggal) {
    alert('Pilih tanggal untuk laporan harian');
    return;
} else if (periode === 'bulanan' && !bulan) {
    alert('Pilih bulan untuk laporan bulanan');
    return;
} else if (periode === 'tahunan' && !tahun) {
    alert('Pilih tahun untuk laporan tahunan');
    return;
} else if (periode === 'seluruh') {
    // Tidak perlu validasi untuk 'Seluruh Tahun'
    // Langsung lanjut generate laporan
"@

# 6. PERBAIKI FUNCTION GENERATE LAPORAN
Write-Host ""
Write-Host "📊 Memperbaiki function generate laporan:" -ForegroundColor Magenta

Write-Host "   🔄 Generate laporan untuk 'Seluruh Tahun'..." -ForegroundColor Yellow
$content = $content -replace "(function\s+generateLaporan[\s\S]*?)if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*\)\s*\{[\s\S]*?url\s*=\s*[^;]*tahun[^;]*;", @"
`$1if (periode === 'harian') {
    url = `/api/laporan/${jenis}?periode=harian&tanggal=${tanggal}`;
} else if (periode === 'bulanan') {
    url = `/api/laporan/${jenis}?periode=bulanan&tahun=${tahun}&bulan=${bulan}`;
} else if (periode === 'tahunan') {
    url = `/api/laporan/${jenis}?periode=tahunan&tahun=${tahun}`;
} else if (periode === 'seluruh') {
    url = `/api/laporan/${jenis}?periode=seluruh`;
"@

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

# Cek apakah logic sudah benar
$hasCorrectLogic = $updatedContent -match "periode === 'seluruh'.*filteredData = data;" -or 
                   $updatedContent -match "periode === 'seluruh'.*filteredPenjualan = penjualan;"

if ($hasCorrectLogic) {
    Write-Host "✅ Logic 'Seluruh Tahun' sudah benar (tanpa filter tahun)" -ForegroundColor Green
} else {
    Write-Host "⚠️ Logic 'Seluruh Tahun' mungkin perlu perbaikan manual" -ForegroundColor Yellow
}

# Cek hide filter tahun
$hasHideYearFilter = $updatedContent -match "periode === 'seluruh'.*tahunGroup\.style\.display = 'none'"

if ($hasHideYearFilter) {
    Write-Host "✅ Filter tahun tersembunyi untuk 'Seluruh Tahun'" -ForegroundColor Green
} else {
    Write-Host "⚠️ Filter tahun mungkin masih tampil untuk 'Seluruh Tahun'" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Proses perbaikan 'Seluruh Tahun' selesai!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Perbedaan setelah perbaikan:" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔹 PERIODE 'TAHUNAN':" -ForegroundColor Blue
Write-Host "   • Menampilkan data berdasarkan tahun tertentu" -ForegroundColor White
Write-Host "   • Filter: tahun (required)" -ForegroundColor White
Write-Host "   • Logic: data.filter(item => item.tanggal_transaksi.startsWith(tahun))" -ForegroundColor White
Write-Host "   • Display: 'Tahun 2025'" -ForegroundColor White
Write-Host ""
Write-Host "🔹 PERIODE 'SELURUH TAHUN':" -ForegroundColor Blue
Write-Host "   • Menampilkan SEMUA data tanpa filter tahun" -ForegroundColor White
Write-Host "   • Filter: tidak ada (semua filter tersembunyi)" -ForegroundColor White
Write-Host "   • Logic: filteredData = data (tanpa filter)" -ForegroundColor White
Write-Host "   • Display: 'Seluruh Data'" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Keuntungan:" -ForegroundColor Yellow
Write-Host "   ✅ 'Seluruh Tahun' = Benar-benar SEMUA data historis" -ForegroundColor Green
Write-Host "   ✅ 'Tahunan' = Data tahun tertentu saja" -ForegroundColor Green
Write-Host "   ✅ UI lebih clean (filter tersembunyi untuk 'Seluruh Tahun')" -ForegroundColor Green
Write-Host "   ✅ User experience lebih intuitif" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Test yang perlu dilakukan:" -ForegroundColor Yellow
Write-Host "   1. Pilih periode 'Seluruh Tahun' → Semua filter harus tersembunyi" -ForegroundColor White
Write-Host "   2. Generate laporan → Harus menampilkan SEMUA data" -ForegroundColor White
Write-Host "   3. Pilih periode 'Tahunan' → Filter tahun harus muncul" -ForegroundColor White
Write-Host "   4. Generate laporan tahunan → Harus filter berdasarkan tahun" -ForegroundColor White