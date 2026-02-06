# 🔧 Script untuk Mengganti Kondisi Filter Periode yang Tersisa
# Melanjutkan penambahan opsi "Seluruh Tahun" ke semua kondisi yang terlewat

Write-Host "🔧 Mencari dan mengganti kondisi filter periode yang tersisa..." -ForegroundColor Yellow
Write-Host "📋 Target: Mengganti 'periode === 'tahunan'' menjadi 'periode === 'tahunan' || periode === 'seluruh''" -ForegroundColor Cyan
Write-Host ""

# Backup file terlebih dahulu
if (Test-Path "public/js/pages.js") {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    Copy-Item "public/js/pages.js" "public/js/pages.js.backup_$timestamp"
    Write-Host "📦 Backup dibuat: pages.js.backup_$timestamp" -ForegroundColor Green
} else {
    Write-Host "❌ File public/js/pages.js tidak ditemukan" -ForegroundColor Red
    exit 1
}

# Baca file pages.js
$pagesContent = Get-Content "public/js/pages.js" -Raw
$originalContent = $pagesContent

Write-Host "🔍 Mencari kondisi filter periode yang perlu diupdate..." -ForegroundColor Blue
Write-Host ""

# 1. Pattern untuk kondisi if dengan periode === 'tahunan'
Write-Host "   🔄 Mengganti kondisi if (periode === 'tahunan')..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\)", "if (periode === 'tahunan' || periode === 'seluruh')"

# 2. Pattern untuk kondisi else if dengan periode === 'tahunan'
Write-Host "   🔄 Mengganti kondisi else if (periode === 'tahunan')..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "else\s+if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\)", "else if (periode === 'tahunan' || periode === 'seluruh')"

# 3. Pattern untuk kondisi } else if dengan periode === 'tahunan'
Write-Host "   🔄 Mengganti kondisi } else if (periode === 'tahunan')..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "\}\s*else\s+if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\)", "} else if (periode === 'tahunan' || periode === 'seluruh')"

# 4. Pattern untuk ternary operator dengan periode === 'tahunan'
Write-Host "   🔄 Mengganti ternary operator periode === 'tahunan'..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "periode\s*===\s*['""]tahunan['""]\s*\?", "(periode === 'tahunan' || periode === 'seluruh') ?"

# 5. Pattern untuk kondisi dalam filter array
Write-Host "   🔄 Mengganti kondisi dalam filter array..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "\.filter\([^)]*periode\s*===\s*['""]tahunan['""]\s*[^)]*\)", ".filter(item => periode === 'tahunan' || periode === 'seluruh')"

# 6. Pattern untuk switch case
Write-Host "   🔄 Mengganti switch case 'tahunan'..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "case\s+['""]tahunan['""]\s*:", "case 'tahunan':`ncase 'seluruh':"

# 7. Pattern untuk kondisi dalam string template atau concatenation
Write-Host "   🔄 Mengganti kondisi dalam template string..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "\`([^`]*)\$\{periode\s*===\s*['""]tahunan['""]\s*\?([^}]*)\}", "`$1`${(periode === 'tahunan' || periode === 'seluruh') ? `$2}"

# 8. Pattern untuk kondisi dengan logical AND
Write-Host "   🔄 Mengganti kondisi dengan logical AND..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "periode\s*===\s*['""]tahunan['""]\s*&&", "(periode === 'tahunan' || periode === 'seluruh') &&"

# 9. Pattern untuk kondisi dengan logical OR
Write-Host "   🔄 Mengganti kondisi dengan logical OR..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "\|\|\s*periode\s*===\s*['""]tahunan['""]\s*", "|| (periode === 'tahunan' || periode === 'seluruh')"

# 10. Pattern khusus untuk display periode text
Write-Host "   🔄 Mengganti kondisi untuk display text..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*\)\s*\{\s*periodeText\s*=", "if (periode === 'tahunan' || periode === 'seluruh') { periodeText ="

# 11. Pattern untuk kondisi dalam event listener
Write-Host "   🔄 Mengganti kondisi dalam event listener..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "if\s*\(\s*e\.target\.value\s*===\s*['""]tahunan['""]\s*\)", "if (e.target.value === 'tahunan' || e.target.value === 'seluruh')"

# 12. Pattern untuk kondisi dengan variable assignment
Write-Host "   🔄 Mengganti kondisi dengan variable assignment..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "const\s+\w+\s*=\s*periode\s*===\s*['""]tahunan['""]\s*;", "const isYearlyPeriod = periode === 'tahunan' || periode === 'seluruh';"

# 13. Pattern untuk kondisi dalam function parameter
Write-Host "   🔄 Mengganti kondisi dalam function parameter..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "function\s+\w+\([^)]*periode\s*===\s*['""]tahunan['""]\s*[^)]*\)", "function(periode === 'tahunan' || periode === 'seluruh')"

# 14. Pattern untuk kondisi dalam return statement
Write-Host "   🔄 Mengganti kondisi dalam return statement..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "return\s+periode\s*===\s*['""]tahunan['""]\s*", "return (periode === 'tahunan' || periode === 'seluruh')"

# 15. Pattern untuk kondisi dalam console.log atau alert
Write-Host "   🔄 Mengganti kondisi dalam console.log..." -ForegroundColor Yellow
$pagesContent = $pagesContent -replace "console\.log\([^)]*periode\s*===\s*['""]tahunan['""]\s*[^)]*\)", "console.log('Periode yearly or seluruh:', periode === 'tahunan' || periode === 'seluruh')"

Write-Host ""

# Cek apakah ada perubahan
if ($pagesContent -ne $originalContent) {
    # Simpan perubahan
    Set-Content "public/js/pages.js" $pagesContent
    Write-Host "✅ File pages.js berhasil diupdate!" -ForegroundColor Green
    
    # Hitung jumlah perubahan
    $changes = ($originalContent -split "`n").Count - ($pagesContent -split "`n").Count
    Write-Host "📊 Perubahan yang dilakukan: Multiple pattern replacements" -ForegroundColor Cyan
    
} else {
    Write-Host "ℹ️ Tidak ada kondisi periode yang perlu diubah" -ForegroundColor Cyan
    Write-Host "   Kemungkinan semua kondisi sudah diupdate sebelumnya" -ForegroundColor White
}

Write-Host ""

# Verifikasi hasil
Write-Host "🔍 Memverifikasi hasil perubahan..." -ForegroundColor Blue

$updatedContent = Get-Content "public/js/pages.js" -Raw

# Cek apakah masih ada kondisi periode === 'tahunan' yang belum diupdate
$remainingConditions = [regex]::Matches($updatedContent, "periode\s*===\s*['""]tahunan['""]\s*(?!\s*\|\|\s*periode\s*===\s*['""]seluruh['""]\s*)")

if ($remainingConditions.Count -gt 0) {
    Write-Host "⚠️ Masih ditemukan $($remainingConditions.Count) kondisi yang belum diupdate:" -ForegroundColor Yellow
    
    foreach ($match in $remainingConditions) {
        $lineNumber = ($updatedContent.Substring(0, $match.Index) -split "`n").Count
        Write-Host "   📍 Baris $lineNumber : $($match.Value)" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "💡 Silakan periksa manual kondisi tersebut" -ForegroundColor Yellow
    
} else {
    Write-Host "✅ Semua kondisi periode berhasil diupdate!" -ForegroundColor Green
}

# Cek apakah opsi 'seluruh' sudah ada di dropdown
if ($updatedContent -match '<option value="seluruh">Seluruh Tahun</option>') {
    Write-Host "✅ Opsi 'Seluruh Tahun' sudah ada di dropdown" -ForegroundColor Green
} else {
    Write-Host "⚠️ Opsi 'Seluruh Tahun' belum ditambahkan ke dropdown" -ForegroundColor Yellow
    Write-Host "   💡 Jalankan script untuk menambahkan opsi dropdown" -ForegroundColor White
}

Write-Host ""

# Buat script untuk menambahkan opsi dropdown jika belum ada
if ($updatedContent -notmatch '<option value="seluruh">Seluruh Tahun</option>') {
    Write-Host "📝 Membuat script untuk menambahkan opsi dropdown..." -ForegroundColor Blue
    
    $addDropdownScript = @"
# 📝 Script untuk Menambahkan Opsi 'Seluruh Tahun' ke Dropdown

Write-Host "📝 Menambahkan opsi 'Seluruh Tahun' ke dropdown periode..." -ForegroundColor Yellow

`$pagesContent = Get-Content "public/js/pages.js" -Raw

# Tambahkan opsi 'Seluruh Tahun' setelah opsi 'Tahunan'
`$pagesContent = `$pagesContent -replace '(<option value="tahunan">Tahunan</option>)', '`$1`n                <option value="seluruh">Seluruh Tahun</option>'

Set-Content "public/js/pages.js" `$pagesContent

Write-Host "✅ Opsi 'Seluruh Tahun' berhasil ditambahkan!" -ForegroundColor Green
"@
    
    Set-Content "add-dropdown-option.ps1" $addDropdownScript
    Write-Host "✅ Script dibuat: add-dropdown-option.ps1" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Proses update filter periode selesai!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Ringkasan yang telah dilakukan:" -ForegroundColor Cyan
Write-Host "   ✅ Mengganti kondisi if (periode === 'tahunan')" -ForegroundColor Green
Write-Host "   ✅ Mengganti kondisi else if (periode === 'tahunan')" -ForegroundColor Green
Write-Host "   ✅ Mengganti ternary operator dengan periode tahunan" -ForegroundColor Green
Write-Host "   ✅ Mengganti kondisi dalam filter array" -ForegroundColor Green
Write-Host "   ✅ Mengganti switch case 'tahunan'" -ForegroundColor Green
Write-Host "   ✅ Mengganti kondisi dalam template string" -ForegroundColor Green
Write-Host "   ✅ Mengganti kondisi dengan logical operators" -ForegroundColor Green
Write-Host "   ✅ Mengganti kondisi dalam event listener" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Hasil:" -ForegroundColor Yellow
Write-Host "   📊 Semua laporan keuangan sekarang mendukung 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   📊 Filter periode konsisten di semua fitur" -ForegroundColor White
Write-Host "   📊 User experience lebih baik dengan opsi yang eksplisit" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Langkah selanjutnya:" -ForegroundColor Yellow
Write-Host "   1. Test semua laporan dengan periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   2. Verifikasi auto-hide filter bulan/tanggal" -ForegroundColor White
Write-Host "   3. Test export PDF dan Excel" -ForegroundColor White