# 🔍 Script Verifikasi Perbaikan "Seluruh Tahun"
# Memverifikasi bahwa semua perbaikan sudah benar

Write-Host "🔍 Memverifikasi perbaikan periode 'Seluruh Tahun'..." -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path "public/js/pages.js")) {
    Write-Host "❌ File public/js/pages.js tidak ditemukan" -ForegroundColor Red
    exit 1
}

$content = Get-Content "public/js/pages.js" -Raw

Write-Host "📋 Hasil verifikasi:" -ForegroundColor Cyan
Write-Host ""

# 1. Cek tahunGroup wrapper
$hasTahunGroup = $content -match 'id="tahunGroup"'
Write-Host "1. tahunGroup wrapper: $(if ($hasTahunGroup) { '✅ Ada' } else { '❌ Tidak ada' })" -ForegroundColor $(if ($hasTahunGroup) { 'Green' } else { 'Red' })

# 2. Cek event listener yang benar
$hasCorrectEventListener = $content -match "periode === 'seluruh'.*tahunGroup\.style\.display = 'none'"
Write-Host "2. Event listener hide tahun: $(if ($hasCorrectEventListener) { '✅ Benar' } else { '❌ Salah' })" -ForegroundColor $(if ($hasCorrectEventListener) { 'Green' } else { 'Red' })

# 3. Cek logic filter yang benar (tanpa filter untuk seluruh)
$hasCorrectFilter = $content -match "periode === 'seluruh'.*filteredData = data" -or $content -match "periode === 'seluruh'.*filteredPenjualan = penjualanData"
Write-Host "3. Logic filter 'seluruh': $(if ($hasCorrectFilter) { '✅ Tanpa filter' } else { '❌ Masih ada filter' })" -ForegroundColor $(if ($hasCorrectFilter) { 'Green' } else { 'Red' })

# 4. Cek periode text yang benar
$hasCorrectPeriodeText = $content -match "periode === 'seluruh'.*periodeText.*Seluruh Data"
Write-Host "4. Periode text 'Seluruh Data': $(if ($hasCorrectPeriodeText) { '✅ Benar' } else { '❌ Salah' })" -ForegroundColor $(if ($hasCorrectPeriodeText) { 'Green' } else { 'Red' })

# 5. Cek tidak ada kondisi gabungan yang salah
$hasWrongCondition = $content -match "periode === 'tahunan' \|\| periode === 'seluruh'.*filter.*startsWith\(tahun\)"
Write-Host "5. Tidak ada kondisi gabungan salah: $(if (-not $hasWrongCondition) { '✅ Bersih' } else { '❌ Masih ada' })" -ForegroundColor $(if (-not $hasWrongCondition) { 'Green' } else { 'Red' })

# 6. Cek opsi dropdown
$hasDropdownOption = $content -match '<option value="seluruh">Seluruh Tahun</option>'
Write-Host "6. Opsi dropdown 'Seluruh Tahun': $(if ($hasDropdownOption) { '✅ Ada' } else { '❌ Tidak ada' })" -ForegroundColor $(if ($hasDropdownOption) { 'Green' } else { 'Red' })

Write-Host ""

# Hitung success rate
$checks = @($hasTahunGroup, $hasCorrectEventListener, $hasCorrectFilter, $hasCorrectPeriodeText, (-not $hasWrongCondition), $hasDropdownOption)
$passedChecks = ($checks | Where-Object { $_ }).Count
$totalChecks = $checks.Count
$successRate = [math]::Round(($passedChecks / $totalChecks) * 100, 1)

Write-Host "📊 SUCCESS RATE: $successRate% ($passedChecks/$totalChecks)" -ForegroundColor $(if ($successRate -ge 80) { "Green" } elseif ($successRate -ge 60) { "Yellow" } else { "Red" })

Write-Host ""

if ($successRate -ge 80) {
    Write-Host "🎉 PERBAIKAN BERHASIL!" -ForegroundColor Green
    Write-Host "   Periode 'Seluruh Tahun' sudah berfungsi dengan benar" -ForegroundColor White
} elseif ($successRate -ge 60) {
    Write-Host "⚠️ PERBAIKAN SEBAGIAN BERHASIL" -ForegroundColor Yellow
    Write-Host "   Beberapa fitur mungkin perlu perbaikan manual" -ForegroundColor White
} else {
    Write-Host "❌ PERBAIKAN BELUM LENGKAP" -ForegroundColor Red
    Write-Host "   Banyak fitur yang perlu diperbaiki" -ForegroundColor White
}

Write-Host ""
Write-Host "🧪 TEST MANUAL YANG PERLU DILAKUKAN:" -ForegroundColor Yellow
Write-Host "   1. Refresh browser" -ForegroundColor White
Write-Host "   2. Buka menu Laporan" -ForegroundColor White
Write-Host "   3. Pilih periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   4. Verifikasi SEMUA filter (tahun, bulan, tanggal) tersembunyi" -ForegroundColor White
Write-Host "   5. Klik 'Tampilkan Laporan'" -ForegroundColor White
Write-Host "   6. Verifikasi header laporan: 'Seluruh Data'" -ForegroundColor White
Write-Host "   7. Verifikasi data yang ditampilkan adalah SEMUA data historis" -ForegroundColor White
Write-Host ""
Write-Host "🎯 HASIL YANG DIHARAPKAN:" -ForegroundColor Yellow
Write-Host "   📊 'Seluruh Tahun' = UI bersih tanpa filter + SEMUA data" -ForegroundColor White
Write-Host "   📊 'Tahunan' = Filter tahun + data tahun tertentu" -ForegroundColor White