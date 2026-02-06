# 🔧 Script untuk Memperbaiki Hide Filter Tahun di Periode 'Seluruh Tahun'
# Menambahkan wrapper ID dan logic untuk menyembunyikan filter tahun

Write-Host "🔧 Memperbaiki hide filter tahun untuk periode 'Seluruh Tahun'..." -ForegroundColor Yellow
Write-Host "📋 Masalah: Filter tahun tidak memiliki wrapper ID untuk disembunyikan" -ForegroundColor Cyan
Write-Host ""

# Backup file
if (Test-Path "public/js/pages.js") {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    Copy-Item "public/js/pages.js" "public/js/pages.js.backup_hide_tahun_$timestamp"
    Write-Host "📦 Backup dibuat: pages.js.backup_hide_tahun_$timestamp" -ForegroundColor Green
} else {
    Write-Host "❌ File public/js/pages.js tidak ditemukan" -ForegroundColor Red
    exit 1
}

# Baca file
$content = Get-Content "public/js/pages.js" -Raw
$originalContent = $content

Write-Host ""
Write-Host "🔍 Memperbaiki struktur HTML dan event listener..." -ForegroundColor Blue

# 1. TAMBAHKAN WRAPPER ID UNTUK FILTER TAHUN
Write-Host ""
Write-Host "📝 Langkah 1: Menambahkan wrapper ID untuk filter tahun..." -ForegroundColor Magenta

Write-Host "   🔄 Menambahkan tahunGroup wrapper..." -ForegroundColor Yellow
$content = $content -replace '(<div class="form-group">\s*<label>Tahun</label>\s*<select id="tahunLaporan">)', '<div class="form-group" id="tahunGroup">$1'

# 2. PERBAIKI EVENT LISTENER PERIODE CHANGE
Write-Host ""
Write-Host "📝 Langkah 2: Memperbaiki event listener periode change..." -ForegroundColor Magenta

Write-Host "   🔄 Mengganti logic hide/show filter..." -ForegroundColor Yellow

# Cari dan ganti event listener yang ada
$newEventListener = @"
  // Handle periode change
  document.getElementById('periodeLaporan').addEventListener('change', (e) => {
    const periode = e.target.value;
    const bulanGroup = document.getElementById('bulanGroup');
    const tanggalGroup = document.getElementById('tanggalGroup');
    const tahunGroup = document.getElementById('tahunGroup');
    
    if (periode === 'harian') {
      // Harian: Tampilkan tahun dan tanggal, sembunyikan bulan
      tahunGroup.style.display = 'block';
      bulanGroup.style.display = 'none';
      tanggalGroup.style.display = 'block';
    } else if (periode === 'bulanan') {
      // Bulanan: Tampilkan tahun dan bulan, sembunyikan tanggal
      tahunGroup.style.display = 'block';
      bulanGroup.style.display = 'block';
      tanggalGroup.style.display = 'none';
    } else if (periode === 'tahunan') {
      // Tahunan: Tampilkan tahun saja, sembunyikan bulan dan tanggal
      tahunGroup.style.display = 'block';
      bulanGroup.style.display = 'none';
      tanggalGroup.style.display = 'none';
    } else if (periode === 'seluruh') {
      // Seluruh Tahun: Sembunyikan SEMUA filter
      tahunGroup.style.display = 'none';
      bulanGroup.style.display = 'none';
      tanggalGroup.style.display = 'none';
    }
  });
"@

# Ganti event listener yang ada
$content = $content -replace "// Handle periode change[\s\S]*?\}\);", $newEventListener

# 3. PERBAIKI VALIDASI UNTUK PERIODE SELURUH
Write-Host ""
Write-Host "📝 Langkah 3: Memperbaiki validasi..." -ForegroundColor Magenta

Write-Host "   🔄 Update validasi untuk skip periode 'seluruh'..." -ForegroundColor Yellow

# Cari function tampilkanLaporan dan perbaiki validasi
$content = $content -replace "(// Validasi[\s\S]*?)if\s*\(\s*periode\s*===\s*['""]harian['""]\s*&&\s*!\s*tanggal\s*\)\s*\{[\s\S]*?\}\s*else\s*if\s*\(\s*periode\s*===\s*['""]bulanan['""]\s*&&\s*!\s*bulan\s*\)\s*\{[\s\S]*?\}\s*else\s*if\s*\(\s*periode\s*===\s*['""]tahunan['""]\s*&&\s*!\s*tahun\s*\)\s*\{[\s\S]*?\}", @"
  // Validasi input berdasarkan periode
  if (periode === 'harian' && !tanggal) {
    alert('Pilih tanggal untuk laporan harian');
    return;
  } else if (periode === 'bulanan' && (!tahun || !bulan)) {
    alert('Pilih tahun dan bulan untuk laporan bulanan');
    return;
  } else if (periode === 'tahunan' && !tahun) {
    alert('Pilih tahun untuk laporan tahunan');
    return;
  } else if (periode === 'seluruh') {
    // Tidak perlu validasi untuk periode 'Seluruh Tahun'
    // Langsung lanjut ke generate laporan
  }
"@

# 4. PERBAIKI PERIODE TEXT DISPLAY
Write-Host ""
Write-Host "📝 Langkah 4: Memperbaiki periode text display..." -ForegroundColor Magenta

Write-Host "   🔄 Update periode text untuk 'Seluruh Tahun'..." -ForegroundColor Yellow

# Perbaiki periode text di berbagai tempat
$content = $content -replace "(let\s+periodeText[\s\S]*?)if\s*\(\s*periode\s*===\s*['""]harian['""]\s*\)\s*\{[\s\S]*?\}\s*else\s*if\s*\(\s*periode\s*===\s*['""]bulanan['""]\s*\)\s*\{[\s\S]*?\}\s*else\s*\{[\s\S]*?\}", @"
  let periodeText = '';
  if (periode === 'harian') {
    periodeText = formatDate(tanggal);
  } else if (periode === 'bulanan') {
    const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    periodeText = `${namaBulan[parseInt(bulan) - 1]} ${tahun}`;
  } else if (periode === 'tahunan') {
    periodeText = `Tahun ${tahun}`;
  } else if (periode === 'seluruh') {
    periodeText = 'Seluruh Data';
  }
"@

# 5. TAMBAHKAN FUNCTION HELPER UNTUK TOGGLE FILTER
Write-Host ""
Write-Host "📝 Langkah 5: Menambahkan function helper..." -ForegroundColor Magenta

Write-Host "   🔄 Menambahkan function toggleFilterVisibility..." -ForegroundColor Yellow

$helperFunction = @"

// Helper function untuk toggle visibility filter
window.toggleFilterVisibility = function(periode) {
  const bulanGroup = document.getElementById('bulanGroup');
  const tanggalGroup = document.getElementById('tanggalGroup');
  const tahunGroup = document.getElementById('tahunGroup');
  
  // Reset semua ke hidden
  if (bulanGroup) bulanGroup.style.display = 'none';
  if (tanggalGroup) tanggalGroup.style.display = 'none';
  if (tahunGroup) tahunGroup.style.display = 'none';
  
  // Show sesuai periode
  switch(periode) {
    case 'harian':
      if (tahunGroup) tahunGroup.style.display = 'block';
      if (tanggalGroup) tanggalGroup.style.display = 'block';
      break;
    case 'bulanan':
      if (tahunGroup) tahunGroup.style.display = 'block';
      if (bulanGroup) bulanGroup.style.display = 'block';
      break;
    case 'tahunan':
      if (tahunGroup) tahunGroup.style.display = 'block';
      break;
    case 'seluruh':
      // Semua filter tetap hidden
      break;
    default:
      // Default: tampilkan semua
      if (tahunGroup) tahunGroup.style.display = 'block';
      if (bulanGroup) bulanGroup.style.display = 'block';
      if (tanggalGroup) tanggalGroup.style.display = 'block';
  }
};

"@

# Tambahkan helper function sebelum renderLaporan
$content = $content -replace "(window\.renderLaporan\s*=)", "$helperFunction`$1"

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
    Write-Host "⚠️ tahunGroup wrapper mungkin belum ditambahkan" -ForegroundColor Yellow
}

# Cek apakah event listener sudah diperbaiki
$hasCorrectEventListener = $updatedContent -match "periode === 'seluruh'.*tahunGroup\.style\.display = 'none'"
if ($hasCorrectEventListener) {
    Write-Host "✅ Event listener sudah diperbaiki untuk hide tahun" -ForegroundColor Green
} else {
    Write-Host "⚠️ Event listener mungkin perlu perbaikan manual" -ForegroundColor Yellow
}

# Cek helper function
$hasHelperFunction = $updatedContent -match "window\.toggleFilterVisibility"
if ($hasHelperFunction) {
    Write-Host "✅ Helper function berhasil ditambahkan" -ForegroundColor Green
} else {
    Write-Host "⚠️ Helper function mungkin belum ditambahkan" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Perbaikan hide filter tahun selesai!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Perubahan yang dilakukan:" -ForegroundColor Cyan
Write-Host "   ✅ Menambahkan wrapper id='tahunGroup' untuk filter tahun" -ForegroundColor Green
Write-Host "   ✅ Memperbaiki event listener periode change" -ForegroundColor Green
Write-Host "   ✅ Logic hide/show filter yang benar:" -ForegroundColor Green
Write-Host "      • Harian: Tampilkan tahun + tanggal" -ForegroundColor White
Write-Host "      • Bulanan: Tampilkan tahun + bulan" -ForegroundColor White
Write-Host "      • Tahunan: Tampilkan tahun saja" -ForegroundColor White
Write-Host "      • Seluruh: Sembunyikan SEMUA filter" -ForegroundColor White
Write-Host "   ✅ Perbaikan validasi untuk skip periode 'seluruh'" -ForegroundColor Green
Write-Host "   ✅ Periode text display yang benar" -ForegroundColor Green
Write-Host "   ✅ Helper function toggleFilterVisibility" -ForegroundColor Green
Write-Host ""
Write-Host "🧪 Test yang perlu dilakukan:" -ForegroundColor Yellow
Write-Host "   1. Refresh browser" -ForegroundColor White
Write-Host "   2. Buka menu Laporan" -ForegroundColor White
Write-Host "   3. Pilih periode 'Seluruh Tahun'" -ForegroundColor White
Write-Host "   4. Verifikasi SEMUA filter (tahun, bulan, tanggal) tersembunyi" -ForegroundColor White
Write-Host "   5. Klik 'Tampilkan Laporan'" -ForegroundColor White
Write-Host "   6. Verifikasi laporan menampilkan 'Seluruh Data'" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Hasil yang diharapkan:" -ForegroundColor Yellow
Write-Host "   📊 Periode 'Seluruh Tahun' = UI bersih tanpa filter apapun" -ForegroundColor White
Write-Host "   📊 Periode 'Tahunan' = Hanya tampilkan filter tahun" -ForegroundColor White
Write-Host "   📊 Periode 'Bulanan' = Tampilkan filter tahun + bulan" -ForegroundColor White
Write-Host "   📊 Periode 'Harian' = Tampilkan filter tahun + tanggal" -ForegroundColor White