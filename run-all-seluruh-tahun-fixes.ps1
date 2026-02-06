# 🚀 Script Master untuk Perbaikan "Seluruh Tahun"
# Menjalankan semua perbaikan agar "Seluruh Tahun" = SEMUA data tanpa filter

Write-Host "🚀 Memulai perbaikan lengkap untuk periode 'Seluruh Tahun'..." -ForegroundColor Green
Write-Host "=" * 80 -ForegroundColor Cyan
Write-Host ""
Write-Host "🎯 TUJUAN PERBAIKAN:" -ForegroundColor Yellow
Write-Host "   • 'Tahunan' = Data berdasarkan tahun tertentu (dengan filter tahun)" -ForegroundColor White
Write-Host "   • 'Seluruh Tahun' = SEMUA data historis (tanpa filter apapun)" -ForegroundColor White
Write-Host "   • UI: Semua filter tersembunyi untuk 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   • Backend: Endpoint mendukung periode 'seluruh'" -ForegroundColor White
Write-Host ""

# Cek apakah semua script ada
$scripts = @(
    "fix-seluruh-tahun-no-year-filter.ps1",
    "update-backend-seluruh-tahun.ps1"
)

$missingScripts = @()
foreach ($script in $scripts) {
    if (-not (Test-Path $script)) {
        $missingScripts += $script
    }
}

if ($missingScripts.Count -gt 0) {
    Write-Host "❌ Script berikut tidak ditemukan:" -ForegroundColor Red
    foreach ($missing in $missingScripts) {
        Write-Host "   📄 $missing" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "💡 Pastikan semua script sudah dibuat terlebih dahulu" -ForegroundColor Yellow
    exit 1
}

# Cek apakah file target ada
$targetFiles = @("public/js/pages.js", "server.js")
$missingFiles = @()

foreach ($file in $targetFiles) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "❌ File berikut tidak ditemukan:" -ForegroundColor Red
    foreach ($missing in $missingFiles) {
        Write-Host "   📄 $missing" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "💡 Pastikan Anda berada di direktori root project" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Semua script dan file target ditemukan" -ForegroundColor Green
Write-Host ""

# Buat backup master untuk kedua file
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$pagesBackup = "public/js/pages.js.seluruh_master_$timestamp"
$serverBackup = "server.js.seluruh_master_$timestamp"

Copy-Item "public/js/pages.js" $pagesBackup
Copy-Item "server.js" $serverBackup

Write-Host "📦 Master backup dibuat:" -ForegroundColor Green
Write-Host "   📄 $pagesBackup" -ForegroundColor White
Write-Host "   📄 $serverBackup" -ForegroundColor White
Write-Host ""

# LANGKAH 1: Update Frontend (pages.js)
Write-Host "🔧 LANGKAH 1: Update Frontend - Logic 'Seluruh Tahun'" -ForegroundColor Blue
Write-Host "-" * 60 -ForegroundColor Gray
try {
    & ".\fix-seluruh-tahun-no-year-filter.ps1"
    Write-Host "✅ Langkah 1 selesai - Frontend berhasil diupdate" -ForegroundColor Green
} catch {
    Write-Host "❌ Error pada langkah 1: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "🔄 Mengembalikan backup..." -ForegroundColor Yellow
    Copy-Item $pagesBackup "public/js/pages.js"
    Copy-Item $serverBackup "server.js"
    exit 1
}

Write-Host ""
Write-Host "=" * 80 -ForegroundColor Cyan
Write-Host ""

# LANGKAH 2: Update Backend (server.js)
Write-Host "🔧 LANGKAH 2: Update Backend - Endpoint 'Seluruh Tahun'" -ForegroundColor Blue
Write-Host "-" * 60 -ForegroundColor Gray
try {
    & ".\update-backend-seluruh-tahun.ps1"
    Write-Host "✅ Langkah 2 selesai - Backend berhasil diupdate" -ForegroundColor Green
} catch {
    Write-Host "❌ Error pada langkah 2: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "🔄 Mengembalikan backup..." -ForegroundColor Yellow
    Copy-Item $pagesBackup "public/js/pages.js"
    Copy-Item $serverBackup "server.js"
    exit 1
}

Write-Host ""
Write-Host "=" * 80 -ForegroundColor Cyan
Write-Host ""

# VERIFIKASI FINAL
Write-Host "🔍 VERIFIKASI FINAL" -ForegroundColor Blue
Write-Host "-" * 60 -ForegroundColor Gray

$pagesContent = Get-Content "public/js/pages.js" -Raw
$serverContent = Get-Content "server.js" -Raw

Write-Host "📊 Hasil verifikasi:" -ForegroundColor Cyan

# Cek frontend
$frontendChecks = @{
    "Logic 'seluruh' tanpa filter" = $pagesContent -match "periode === 'seluruh'.*filteredData = data"
    "Hide filter tahun untuk 'seluruh'" = $pagesContent -match "periode === 'seluruh'.*tahunGroup\.style\.display = 'none'"
    "Periode text 'Seluruh Data'" = $pagesContent -match "periode === 'seluruh'.*periodeText.*Seluruh Data"
    "Validasi skip untuk 'seluruh'" = $pagesContent -match "periode === 'seluruh'.*tidak perlu validasi"
}

Write-Host ""
Write-Host "🎨 FRONTEND (pages.js):" -ForegroundColor Magenta
foreach ($check in $frontendChecks.GetEnumerator()) {
    if ($check.Value) {
        Write-Host "   ✅ $($check.Key)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️ $($check.Key)" -ForegroundColor Yellow
    }
}

# Cek backend
$backendChecks = @{
    "Endpoint laba-rugi support 'seluruh'" = $serverContent -match "/api/laporan/laba-rugi.*periode === 'seluruh'"
    "Endpoint neraca support 'seluruh'" = $serverContent -match "/api/laporan/neraca.*periode === 'seluruh'"
    "Endpoint arus-kas support 'seluruh'" = $serverContent -match "/api/laporan/arus-kas.*periode === 'seluruh'"
    "Endpoint buku-kas support 'seluruh'" = $serverContent -match "/api/laporan/buku-kas.*periode === 'seluruh'"
    "SHU support periode 'seluruh'" = $serverContent -match "/api/shu/hitung.*periode === 'seluruh'"
}

Write-Host ""
Write-Host "🔧 BACKEND (server.js):" -ForegroundColor Magenta
foreach ($check in $backendChecks.GetEnumerator()) {
    if ($check.Value) {
        Write-Host "   ✅ $($check.Key)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️ $($check.Key)" -ForegroundColor Yellow
    }
}

# Hitung success rate
$totalChecks = $frontendChecks.Count + $backendChecks.Count
$passedChecks = ($frontendChecks.Values | Where-Object { $_ }).Count + ($backendChecks.Values | Where-Object { $_ }).Count
$successRate = [math]::Round(($passedChecks / $totalChecks) * 100, 1)

Write-Host ""
Write-Host "📈 SUCCESS RATE: $successRate% ($passedChecks/$totalChecks)" -ForegroundColor $(if ($successRate -ge 80) { "Green" } elseif ($successRate -ge 60) { "Yellow" } else { "Red" })

Write-Host ""
Write-Host "=" * 80 -ForegroundColor Cyan
Write-Host ""

# SUMMARY FINAL
Write-Host "🎉 PERBAIKAN 'SELURUH TAHUN' SELESAI!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 RINGKASAN PERUBAHAN:" -ForegroundColor Cyan
Write-Host ""

Write-Host "🎨 FRONTEND CHANGES:" -ForegroundColor Magenta
Write-Host "   ✅ Logic Filter:" -ForegroundColor Blue
Write-Host "      • 'tahunan': data.filter(item => item.tanggal.startsWith(tahun))" -ForegroundColor White
Write-Host "      • 'seluruh': filteredData = data (tanpa filter)" -ForegroundColor White
Write-Host ""
Write-Host "   ✅ UI Behavior:" -ForegroundColor Blue
Write-Host "      • 'tahunan': Tampilkan filter tahun" -ForegroundColor White
Write-Host "      • 'seluruh': Sembunyikan SEMUA filter (tahun, bulan, tanggal)" -ForegroundColor White
Write-Host ""
Write-Host "   ✅ Display Text:" -ForegroundColor Blue
Write-Host "      • 'tahunan': 'Tahun 2025'" -ForegroundColor White
Write-Host "      • 'seluruh': 'Seluruh Data'" -ForegroundColor White
Write-Host ""
Write-Host "   ✅ Validasi:" -ForegroundColor Blue
Write-Host "      • 'tahunan': Require tahun parameter" -ForegroundColor White
Write-Host "      • 'seluruh': Skip validasi, langsung generate" -ForegroundColor White
Write-Host ""

Write-Host "🔧 BACKEND CHANGES:" -ForegroundColor Magenta
Write-Host "   ✅ API Endpoints:" -ForegroundColor Blue
Write-Host "      • /api/laporan/laba-rugi?periode=seluruh" -ForegroundColor White
Write-Host "      • /api/laporan/neraca?periode=seluruh" -ForegroundColor White
Write-Host "      • /api/laporan/arus-kas?periode=seluruh" -ForegroundColor White
Write-Host "      • /api/laporan/buku-kas?periode=seluruh" -ForegroundColor White
Write-Host "      • /api/shu/hitung/:tahun (dengan body: {periode: 'seluruh'})" -ForegroundColor White
Write-Host ""
Write-Host "   ✅ Query Logic:" -ForegroundColor Blue
Write-Host "      • 'tahunan': WHERE strftime('%Y', tanggal) = ?" -ForegroundColor White
Write-Host "      • 'seluruh': SELECT * FROM table (tanpa WHERE)" -ForegroundColor White
Write-Host ""

Write-Host "💾 BACKUP FILES:" -ForegroundColor Yellow
Write-Host "   📄 Frontend: $pagesBackup" -ForegroundColor White
Write-Host "   📄 Backend: $serverBackup" -ForegroundColor White
Write-Host ""

Write-Host "🧪 TESTING CHECKLIST:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   🔹 FRONTEND TESTING:" -ForegroundColor Blue
Write-Host "      1. Pilih periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "      2. Verifikasi semua filter (tahun, bulan, tanggal) tersembunyi" -ForegroundColor White
Write-Host "      3. Klik 'Tampilkan Laporan'" -ForegroundColor White
Write-Host "      4. Verifikasi header laporan: 'Seluruh Data'" -ForegroundColor White
Write-Host "      5. Verifikasi data yang ditampilkan adalah SEMUA data historis" -ForegroundColor White
Write-Host ""
Write-Host "   🔹 BACKEND TESTING:" -ForegroundColor Blue
Write-Host "      1. Test endpoint: GET /api/laporan/laba-rugi?periode=seluruh" -ForegroundColor White
Write-Host "      2. Verifikasi response berisi SEMUA data penjualan/pengeluaran" -ForegroundColor White
Write-Host "      3. Test endpoint lainnya dengan periode=seluruh" -ForegroundColor White
Write-Host "      4. Verifikasi tidak ada filter WHERE dalam query" -ForegroundColor White
Write-Host ""
Write-Host "   🔹 COMPARISON TESTING:" -ForegroundColor Blue
Write-Host "      1. Generate laporan dengan periode 'Tahunan' tahun 2025" -ForegroundColor White
Write-Host "      2. Generate laporan dengan periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "      3. Verifikasi 'Seluruh Tahun' berisi lebih banyak data" -ForegroundColor White
Write-Host "      4. Verifikasi 'Tahunan' hanya berisi data 2025" -ForegroundColor White
Write-Host ""

Write-Host "🎯 EXPECTED RESULTS:" -ForegroundColor Yellow
Write-Host "   📊 'Seluruh Tahun' menampilkan SEMUA data dari database" -ForegroundColor White
Write-Host "   📊 'Tahunan' menampilkan data tahun tertentu saja" -ForegroundColor White
Write-Host "   📊 UI lebih clean untuk 'Seluruh Tahun' (no filters)" -ForegroundColor White
Write-Host "   📊 User experience lebih intuitif dan jelas" -ForegroundColor White
Write-Host ""

if ($successRate -ge 80) {
    Write-Host "🏆 STATUS: SUKSES!" -ForegroundColor Green
    Write-Host "   Perbaikan 'Seluruh Tahun' berhasil dengan baik" -ForegroundColor White
} elseif ($successRate -ge 60) {
    Write-Host "⚠️ STATUS: SUKSES DENGAN CATATAN" -ForegroundColor Yellow
    Write-Host "   Beberapa fitur mungkin perlu perbaikan manual" -ForegroundColor White
} else {
    Write-Host "❌ STATUS: PERLU REVIEW" -ForegroundColor Red
    Write-Host "   Banyak fitur yang perlu perbaikan manual" -ForegroundColor White
}

Write-Host ""
Write-Host "🚀 LANGKAH SELANJUTNYA:" -ForegroundColor Yellow
Write-Host "   1. Restart server: node server.js" -ForegroundColor White
Write-Host "   2. Refresh browser" -ForegroundColor White
Write-Host "   3. Test periode 'Seluruh Tahun' di semua laporan" -ForegroundColor White
Write-Host "   4. Verifikasi UI dan data sesuai ekspektasi" -ForegroundColor White
Write-Host ""
Write-Host "=" * 80 -ForegroundColor Cyan