# Test script untuk verifikasi perbaikan Seluruh Tahun

Write-Host "Memverifikasi perbaikan periode Seluruh Tahun..." -ForegroundColor Yellow

$content = Get-Content "public/js/pages.js" -Raw

# Cek tahunGroup wrapper
$hasTahunGroup = $content -match 'id="tahunGroup"'
Write-Host "1. tahunGroup wrapper: $(if ($hasTahunGroup) { 'OK' } else { 'FAIL' })" -ForegroundColor $(if ($hasTahunGroup) { 'Green' } else { 'Red' })

# Cek event listener
$hasCorrectEventListener = $content -match "periode === 'seluruh'.*tahunGroup"
Write-Host "2. Event listener: $(if ($hasCorrectEventListener) { 'OK' } else { 'FAIL' })" -ForegroundColor $(if ($hasCorrectEventListener) { 'Green' } else { 'Red' })

# Cek filter logic
$hasCorrectFilter = $content -match "periode === 'seluruh'.*filteredPenjualan = penjualanData"
Write-Host "3. Filter logic: $(if ($hasCorrectFilter) { 'OK' } else { 'FAIL' })" -ForegroundColor $(if ($hasCorrectFilter) { 'Green' } else { 'Red' })

# Cek periode text
$hasCorrectPeriodeText = $content -match "periode === 'seluruh'.*Seluruh Data"
Write-Host "4. Periode text: $(if ($hasCorrectPeriodeText) { 'OK' } else { 'FAIL' })" -ForegroundColor $(if ($hasCorrectPeriodeText) { 'Green' } else { 'Red' })

# Cek dropdown option
$hasDropdownOption = $content -match '<option value="seluruh">Seluruh Tahun</option>'
Write-Host "5. Dropdown option: $(if ($hasDropdownOption) { 'OK' } else { 'FAIL' })" -ForegroundColor $(if ($hasDropdownOption) { 'Green' } else { 'Red' })

Write-Host ""
Write-Host "Silakan test manual:" -ForegroundColor Yellow
Write-Host "1. Refresh browser" -ForegroundColor White
Write-Host "2. Pilih periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "3. Verifikasi semua filter tersembunyi" -ForegroundColor White
Write-Host "4. Generate laporan dan cek hasilnya" -ForegroundColor White