# 🚀 Script Master untuk Menjalankan Semua Perbaikan Filter Periode
# Menjalankan semua script perbaikan secara berurutan

Write-Host "🚀 Memulai proses perbaikan filter periode secara menyeluruh..." -ForegroundColor Green
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host ""

# Cek apakah semua script ada
$scripts = @(
    "update-filter-periode-remaining.ps1",
    "fix-laporan-periode-conditions.ps1"
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
if (-not (Test-Path "public/js/pages.js")) {
    Write-Host "❌ File public/js/pages.js tidak ditemukan" -ForegroundColor Red
    Write-Host "💡 Pastikan Anda berada di direktori root project" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Semua script dan file target ditemukan" -ForegroundColor Green
Write-Host ""

# Buat backup master
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$masterBackup = "public/js/pages.js.master_backup_$timestamp"
Copy-Item "public/js/pages.js" $masterBackup
Write-Host "📦 Master backup dibuat: $masterBackup" -ForegroundColor Green
Write-Host ""

# Jalankan script 1: Update filter periode remaining
Write-Host "🔧 LANGKAH 1: Menjalankan update-filter-periode-remaining.ps1" -ForegroundColor Blue
Write-Host "-" * 50 -ForegroundColor Gray
try {
    & ".\update-filter-periode-remaining.ps1"
    Write-Host "✅ Langkah 1 selesai" -ForegroundColor Green
} catch {
    Write-Host "❌ Error pada langkah 1: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "🔄 Mengembalikan backup..." -ForegroundColor Yellow
    Copy-Item $masterBackup "public/js/pages.js"
    exit 1
}

Write-Host ""
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host ""

# Jalankan script 2: Fix laporan periode conditions
Write-Host "🔧 LANGKAH 2: Menjalankan fix-laporan-periode-conditions.ps1" -ForegroundColor Blue
Write-Host "-" * 50 -ForegroundColor Gray
try {
    & ".\fix-laporan-periode-conditions.ps1"
    Write-Host "✅ Langkah 2 selesai" -ForegroundColor Green
} catch {
    Write-Host "❌ Error pada langkah 2: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "🔄 Mengembalikan backup..." -ForegroundColor Yellow
    Copy-Item $masterBackup "public/js/pages.js"
    exit 1
}

Write-Host ""
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host ""

# Verifikasi final
Write-Host "🔍 VERIFIKASI FINAL" -ForegroundColor Blue
Write-Host "-" * 50 -ForegroundColor Gray

$finalContent = Get-Content "public/js/pages.js" -Raw

# Cek kondisi yang masih tersisa
$remainingConditions = [regex]::Matches($finalContent, "periode\s*===\s*['""]tahunan['""]\s*(?!\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*)")

Write-Host "📊 Hasil verifikasi:" -ForegroundColor Cyan
Write-Host "   📄 File size: $([math]::Round((Get-Item "public/js/pages.js").Length / 1KB, 2)) KB" -ForegroundColor White
Write-Host "   📝 Total lines: $(($finalContent -split "`n").Count)" -ForegroundColor White
Write-Host "   🔍 Kondisi tersisa: $($remainingConditions.Count)" -ForegroundColor White

if ($remainingConditions.Count -eq 0) {
    Write-Host "   ✅ Status: SEMUA KONDISI BERHASIL DIUPDATE" -ForegroundColor Green
} else {
    Write-Host "   ⚠️ Status: MASIH ADA KONDISI YANG PERLU MANUAL REVIEW" -ForegroundColor Yellow
}

# Cek opsi dropdown
if ($finalContent -match '<option value="seluruh">Seluruh Tahun</option>') {
    Write-Host "   ✅ Dropdown: Opsi 'Seluruh Tahun' sudah ada" -ForegroundColor Green
} else {
    Write-Host "   ⚠️ Dropdown: Opsi 'Seluruh Tahun' belum ada" -ForegroundColor Yellow
}

Write-Host ""

# Tampilkan kondisi yang masih tersisa (jika ada)
if ($remainingConditions.Count -gt 0) {
    Write-Host "⚠️ Kondisi yang masih perlu manual review:" -ForegroundColor Yellow
    
    $displayCount = [math]::Min($remainingConditions.Count, 5)
    for ($i = 0; $i -lt $displayCount; $i++) {
        $match = $remainingConditions[$i]
        $lineNumber = ($finalContent.Substring(0, $match.Index) -split "`n").Count
        $context = $finalContent.Substring([math]::Max(0, $match.Index - 50), [math]::Min(100, $finalContent.Length - $match.Index + 50))
        Write-Host "   📍 Baris $lineNumber : ...$(($context -replace "`n", " ").Trim())..." -ForegroundColor White
    }
    
    if ($remainingConditions.Count -gt 5) {
        Write-Host "   ... dan $($remainingConditions.Count - 5) kondisi lainnya" -ForegroundColor Gray
    }
    
    Write-Host ""
    Write-Host "💡 Silakan review manual kondisi tersebut" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host ""

# Summary final
Write-Host "🎉 PROSES PERBAIKAN FILTER PERIODE SELESAI!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 RINGKASAN YANG TELAH DILAKUKAN:" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ KONDISI UMUM:" -ForegroundColor Magenta
Write-Host "   • if (periode === 'tahunan') → if (periode === 'tahunan' || periode === 'seluruh')" -ForegroundColor White
Write-Host "   • else if (periode === 'tahunan') → else if (periode === 'tahunan' || periode === 'seluruh')" -ForegroundColor White
Write-Host "   • Ternary operators dengan periode tahunan" -ForegroundColor White
Write-Host "   • Switch case 'tahunan' → case 'tahunan': case 'seluruh':" -ForegroundColor White
Write-Host "   • Kondisi dalam template strings" -ForegroundColor White
Write-Host "   • Logical operators (&&, ||)" -ForegroundColor White
Write-Host ""
Write-Host "✅ LAPORAN KEUANGAN:" -ForegroundColor Magenta
Write-Host "   • Laporan Laba/Rugi - Filter penjualan, pengeluaran, pendapatan lain" -ForegroundColor White
Write-Host "   • Neraca - Filter simpanan (pokok, wajib, khusus, sukarela) dan transaksi" -ForegroundColor White
Write-Host "   • Laporan Arus Kas - Filter arus masuk/keluar dan aset" -ForegroundColor White
Write-Host "   • Buku Kas - Filter transaksi masuk/keluar" -ForegroundColor White
Write-Host ""
Write-Host "✅ FITUR TAMBAHAN:" -ForegroundColor Magenta
Write-Host "   • Event listeners untuk periode change" -ForegroundColor White
Write-Host "   • Hide/show filter bulan dan tanggal" -ForegroundColor White
Write-Host "   • Function cetak PDF dan export Excel" -ForegroundColor White
Write-Host "   • Periode text display" -ForegroundColor White
Write-Host "   • Kondisi dalam loop, map, reduce" -ForegroundColor White
Write-Host ""
Write-Host "💾 BACKUP FILES:" -ForegroundColor Yellow
Write-Host "   📄 Master backup: $masterBackup" -ForegroundColor White
Write-Host "   📄 Individual backups: pages.js.backup_*" -ForegroundColor White
Write-Host ""
Write-Host "🚀 LANGKAH SELANJUTNYA:" -ForegroundColor Yellow
Write-Host "   1. 🔄 Refresh browser atau restart server" -ForegroundColor White
Write-Host "   2. 🧪 Test Laporan Laba/Rugi dengan periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   3. 🧪 Test Neraca dengan periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   4. 🧪 Test Laporan Arus Kas dengan periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   5. 🧪 Test Buku Kas dengan periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   6. 🧪 Test auto-hide filter bulan/tanggal" -ForegroundColor White
Write-Host "   7. 🧪 Test cetak PDF dan export Excel" -ForegroundColor White
Write-Host ""
Write-Host "🎯 HASIL YANG DIHARAPKAN:" -ForegroundColor Yellow
Write-Host "   📊 Semua laporan keuangan mendukung periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   📊 Filter bulan/tanggal tersembunyi untuk periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   📊 Output laporan identik antara 'Tahunan' dan 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   📊 User experience yang lebih baik dan eksplisit" -ForegroundColor White
Write-Host ""

if ($remainingConditions.Count -eq 0) {
    Write-Host "🏆 STATUS: SUKSES SEMPURNA!" -ForegroundColor Green
    Write-Host "   Semua kondisi periode berhasil diupdate" -ForegroundColor White
} else {
    Write-Host "⚠️ STATUS: SUKSES DENGAN CATATAN" -ForegroundColor Yellow
    Write-Host "   $($remainingConditions.Count) kondisi perlu manual review" -ForegroundColor White
}

Write-Host ""
Write-Host "=" * 70 -ForegroundColor Cyan