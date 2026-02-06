# Final test untuk verifikasi perbaikan

$content = Get-Content "public/js/pages.js" -Raw

Write-Host "=== FINAL VERIFICATION ===" -ForegroundColor Cyan

# Test 1: tahunGroup wrapper
$test1 = $content -match 'id="tahunGroup"'
Write-Host "1. tahunGroup wrapper: $(if ($test1) { 'PASS' } else { 'FAIL' })" -ForegroundColor $(if ($test1) { 'Green' } else { 'Red' })

# Test 2: Event listener hide tahun
$test2 = $content -match "periode === 'seluruh'.*tahunGroup\.style\.display = 'none'"
Write-Host "2. Hide tahun filter: $(if ($test2) { 'PASS' } else { 'FAIL' })" -ForegroundColor $(if ($test2) { 'Green' } else { 'Red' })

# Test 3: Filter logic tanpa filter
$test3 = $content -match "periode === 'seluruh'.*filteredPenjualan = penjualanData"
Write-Host "3. No filter logic: $(if ($test3) { 'PASS' } else { 'FAIL' })" -ForegroundColor $(if ($test3) { 'Green' } else { 'Red' })

# Test 4: Periode text
$test4 = $content -match "periodeText = \`Seluruh Data\`"
Write-Host "4. Periode text: $(if ($test4) { 'PASS' } else { 'FAIL' })" -ForegroundColor $(if ($test4) { 'Green' } else { 'Red' })

# Test 5: Dropdown option
$test5 = $content -match '<option value="seluruh">Seluruh Tahun</option>'
Write-Host "5. Dropdown option: $(if ($test5) { 'PASS' } else { 'FAIL' })" -ForegroundColor $(if ($test5) { 'Green' } else { 'Red' })

$passed = @($test1, $test2, $test3, $test4, $test5) | Where-Object { $_ }
$total = 5

Write-Host ""
Write-Host "RESULT: $($passed.Count)/$total tests passed" -ForegroundColor $(if ($passed.Count -eq $total) { 'Green' } else { 'Yellow' })

if ($passed.Count -eq $total) {
    Write-Host "✅ ALL TESTS PASSED! Ready for manual testing." -ForegroundColor Green
} else {
    Write-Host "⚠️ Some tests failed. Check the implementation." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "MANUAL TEST STEPS:" -ForegroundColor Yellow
Write-Host "1. Refresh browser" -ForegroundColor White
Write-Host "2. Go to Laporan menu" -ForegroundColor White
Write-Host "3. Select 'Seluruh Tahun' period" -ForegroundColor White
Write-Host "4. Verify ALL filters are hidden" -ForegroundColor White
Write-Host "5. Click 'Tampilkan Laporan'" -ForegroundColor White
Write-Host "6. Check report shows 'Seluruh Data'" -ForegroundColor White
Write-Host "7. Verify data includes ALL historical records" -ForegroundColor White