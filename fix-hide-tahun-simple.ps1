# 🔧 Script Sederhana untuk Memperbaiki Hide Filter Tahun
# Approach langsung dengan string replacement yang lebih aman

Write-Host "🔧 Memperbaiki hide filter tahun untuk periode 'Seluruh Tahun'..." -ForegroundColor Yellow
Write-Host ""

# Backup file
if (Test-Path "public/js/pages.js") {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    Copy-Item "public/js/pages.js" "public/js/pages.js.backup_simple_$timestamp"
    Write-Host "📦 Backup dibuat: pages.js.backup_simple_$timestamp" -ForegroundColor Green
} else {
    Write-Host "❌ File public/js/pages.js tidak ditemukan" -ForegroundColor Red
    exit 1
}

# Baca file
$content = Get-Content "public/js/pages.js" -Raw
$originalContent = $content

Write-Host "🔍 Melakukan perbaikan..." -ForegroundColor Blue

# 1. Tambahkan ID wrapper untuk filter tahun
Write-Host "   🔄 Menambahkan tahunGroup wrapper..." -ForegroundColor Yellow
$content = $content -replace '<div class="form-group">\s*<label>Tahun</label>', '<div class="form-group" id="tahunGroup"><label>Tahun</label>'

# 2. Ganti event listener periode change
Write-Host "   🔄 Mengganti event listener..." -ForegroundColor Yellow

$oldEventListener = @"
  // Handle periode change
  document.getElementById('periodeLaporan').addEventListener('change', (e) => {
    const periode = e.target.value;
    const bulanGroup = document.getElementById('bulanGroup');
    const tanggalGroup = document.getElementById('tanggalGroup');
    
    if (periode === 'harian') {
      bulanGroup.style.display = 'none';
      tanggalGroup.style.display = 'block';
    } else if (periode === 'bulanan') {
      bulanGroup.style.display = 'block';
      tanggalGroup.style.display = 'none';
    } else {
      bulanGroup.style.display = 'none';
      tanggalGroup.style.display = 'none';
    }
  });
"@

$newEventListener = @"
  // Handle periode change
  document.getElementById('periodeLaporan').addEventListener('change', (e) => {
    const periode = e.target.value;
    const bulanGroup = document.getElementById('bulanGroup');
    const tanggalGroup = document.getElementById('tanggalGroup');
    const tahunGroup = document.getElementById('tahunGroup');
    
    if (periode === 'harian') {
      // Harian: Tampilkan tahun dan tanggal, sembunyikan bulan
      if (tahunGroup) tahunGroup.style.display = 'block';
      if (bulanGroup) bulanGroup.style.display = 'none';
      if (tanggalGroup) tanggalGroup.style.display = 'block';
    } else if (periode === 'bulanan') {
      // Bulanan: Tampilkan tahun dan bulan, sembunyikan tanggal
      if (tahunGroup) tahunGroup.style.display = 'block';
      if (bulanGroup) bulanGroup.style.display = 'block';
      if (tanggalGroup) tanggalGroup.style.display = 'none';
    } else if (periode === 'tahunan') {
      // Tahunan: Tampilkan tahun saja, sembunyikan bulan dan tanggal
      if (tahunGroup) tahunGroup.style.display = 'block';
      if (bulanGroup) bulanGroup.style.display = 'none';
      if (tanggalGroup) tanggalGroup.style.display = 'none';
    } else if (periode === 'seluruh') {
      // Seluruh Tahun: Sembunyikan SEMUA filter
      if (tahunGroup) tahunGroup.style.display = 'none';
      if (bulanGroup) bulanGroup.style.display = 'none';
      if (tanggalGroup) tanggalGroup.style.display = 'none';
    }
  });
"@

$content = $content -replace [regex]::Escape($oldEventListener), $newEventListener

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

# Cek apakah tahunGroup sudah ditambahkan
$hasTahunGroup = $updatedContent -match 'id="tahunGroup"'
if ($hasTahunGroup) {
    Write-Host "✅ tahunGroup wrapper berhasil ditambahkan" -ForegroundColor Green
} else {
    Write-Host "⚠️ tahunGroup wrapper belum ditambahkan" -ForegroundColor Yellow
}

# Cek apakah event listener sudah diperbaiki
$hasCorrectEventListener = $updatedContent -match "periode === 'seluruh'"
if ($hasCorrectEventListener) {
    Write-Host "✅ Event listener berhasil diperbaiki" -ForegroundColor Green
} else {
    Write-Host "⚠️ Event listener belum diperbaiki" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Perbaikan selesai!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Yang telah diperbaiki:" -ForegroundColor Cyan
Write-Host "   ✅ Menambahkan id='tahunGroup' untuk filter tahun" -ForegroundColor Green
Write-Host "   ✅ Event listener periode change yang lengkap:" -ForegroundColor Green
Write-Host "      • Harian: Tahun + Tanggal" -ForegroundColor White
Write-Host "      • Bulanan: Tahun + Bulan" -ForegroundColor White
Write-Host "      • Tahunan: Tahun saja" -ForegroundColor White
Write-Host "      • Seluruh: Semua filter tersembunyi" -ForegroundColor White
Write-Host ""
Write-Host "🧪 Test sekarang:" -ForegroundColor Yellow
Write-Host "   1. Refresh browser" -ForegroundColor White
Write-Host "   2. Pilih periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   3. Verifikasi semua filter tersembunyi" -ForegroundColor White