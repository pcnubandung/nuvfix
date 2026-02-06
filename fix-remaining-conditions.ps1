# 🔧 Script untuk Mengganti Kondisi yang Tersisa
# Menangani semua kondisi tahun_pembukuan yang mungkin terlewat

Write-Host "🔧 Mencari dan mengganti kondisi tahun_pembukuan yang tersisa..." -ForegroundColor Yellow
Write-Host ""

# Baca file server.js
if (Test-Path "server.js") {
    $serverContent = Get-Content "server.js" -Raw
    $originalContent = $serverContent
    
    Write-Host "📋 Mencari kondisi yang perlu diganti di server.js..." -ForegroundColor Blue
    
    # 1. Ganti semua query yang masih menggunakan tahun_pembukuan
    Write-Host "   🔄 Mengganti query tahun_pembukuan dengan tanggal_transaksi..." -ForegroundColor Yellow
    
    # Pattern untuk WHERE tahun_pembukuan = ?
    $serverContent = $serverContent -replace "WHERE\s+\w+\.tahun_pembukuan\s*=\s*\?", "WHERE strftime('%Y', `$1.tanggal_transaksi) = ?"
    $serverContent = $serverContent -replace "WHERE\s+tahun_pembukuan\s*=\s*\?", "WHERE strftime('%Y', tanggal_transaksi) = ?"
    
    # Pattern untuk AND tahun_pembukuan = ?
    $serverContent = $serverContent -replace "AND\s+\w+\.tahun_pembukuan\s*=\s*\?", "AND strftime('%Y', `$1.tanggal_transaksi) = ?"
    $serverContent = $serverContent -replace "AND\s+tahun_pembukuan\s*=\s*\?", "AND strftime('%Y', tanggal_transaksi) = ?"
    
    # 2. Ganti parameter tahunAktif dengan tahun yang sesuai
    Write-Host "   🔄 Mengganti parameter tahunAktif..." -ForegroundColor Yellow
    $serverContent = $serverContent -replace "\[tahunAktif\]", "[req.params.tahun || new Date().getFullYear()]"
    $serverContent = $serverContent -replace "tahunAktif", "new Date().getFullYear()"
    
    # 3. Hapus semua async/await yang tidak diperlukan setelah menghapus getTahunAktif
    Write-Host "   🔄 Membersihkan async/await yang tidak diperlukan..." -ForegroundColor Yellow
    $serverContent = $serverContent -replace "app\.get\('([^']+)',\s*authenticateToken,\s*async\s*\(req,\s*res\)\s*=>", "app.get('`$1', authenticateToken, (req, res) =>"
    $serverContent = $serverContent -replace "app\.post\('([^']+)',\s*authenticateToken,\s*async\s*\(req,\s*res\)\s*=>", "app.post('`$1', authenticateToken, async (req, res) =>"
    
    # 4. Hapus try-catch yang hanya untuk getTahunAktif
    Write-Host "   🔄 Membersihkan try-catch yang tidak diperlukan..." -ForegroundColor Yellow
    $serverContent = $serverContent -replace "try\s*\{\s*const\s+tahunAktif\s*=\s*await\s+getTahunAktif\(\);[\s\S]*?\}\s*catch\s*\([^)]*\)\s*\{[\s\S]*?\}", ""
    
    # 5. Ganti console.log yang masih mereferensi tahun aktif
    Write-Host "   🔄 Membersihkan console.log tahun aktif..." -ForegroundColor Yellow
    $serverContent = $serverContent -replace "console\.log\('Getting\s+\w+\s+for\s+tahun:',\s*tahunAktif\);", ""
    $serverContent = $serverContent -replace "console\.log\('Tahun\s+aktif:',\s*\w+\);", ""
    
    # 6. Pastikan semua endpoint menggunakan parameter yang benar
    Write-Host "   🔄 Memastikan parameter endpoint benar..." -ForegroundColor Yellow
    
    # Untuk endpoint yang membutuhkan tahun dari parameter
    $serverContent = $serverContent -replace "app\.get\('/api/shu/data/(\w+)', authenticateToken, \(req, res\) => \{", "app.get('/api/shu/data/`$1', authenticateToken, (req, res) => {"
    
    # Simpan jika ada perubahan
    if ($serverContent -ne $originalContent) {
        Set-Content "server.js" $serverContent
        Write-Host "✅ server.js berhasil diperbaiki" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ Tidak ada perubahan diperlukan di server.js" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ File server.js tidak ditemukan" -ForegroundColor Red
}

Write-Host ""

# Baca file pages.js
if (Test-Path "public/js/pages.js") {
    $pagesContent = Get-Content "public/js/pages.js" -Raw
    $originalPagesContent = $pagesContent
    
    Write-Host "📋 Mencari kondisi yang perlu diganti di pages.js..." -ForegroundColor Blue
    
    # 1. Hapus semua referensi ke tahun pembukuan di JavaScript
    Write-Host "   🔄 Menghapus referensi tahun pembukuan..." -ForegroundColor Yellow
    $pagesContent = $pagesContent -replace "tahun_pembukuan", ""
    $pagesContent = $pagesContent -replace "tahunPembukuan", ""
    
    # 2. Hapus event listener untuk tahun pembukuan
    Write-Host "   🔄 Menghapus event listener tahun pembukuan..." -ForegroundColor Yellow
    $pagesContent = $pagesContent -replace "document\.getElementById\('tahun-pembukuan'\)\.addEventListener[\s\S]*?\}\);", ""
    
    # 3. Hapus validasi tahun pembukuan
    Write-Host "   🔄 Menghapus validasi tahun pembukuan..." -ForegroundColor Yellow
    $pagesContent = $pagesContent -replace "if\s*\(\s*!tahun_pembukuan[\s\S]*?\}", ""
    
    # 4. Hapus fetch ke endpoint tahun pembukuan
    Write-Host "   🔄 Menghapus fetch tahun pembukuan..." -ForegroundColor Yellow
    $pagesContent = $pagesContent -replace "fetch\('/api/tahun-pembukuan[\s\S]*?\}\);", ""
    
    # 5. Hapus HTML elements tahun pembukuan yang mungkin terlewat
    Write-Host "   🔄 Menghapus HTML elements tahun pembukuan..." -ForegroundColor Yellow
    $pagesContent = $pagesContent -replace "<div[^>]*tahun-pembukuan[\s\S]*?</div>", ""
    $pagesContent = $pagesContent -replace "<input[^>]*tahun-pembukuan[^>]*>", ""
    $pagesContent = $pagesContent -replace "<select[^>]*tahun-pembukuan[\s\S]*?</select>", ""
    
    # 6. Bersihkan komentar HTML yang mereferensi tahun pembukuan
    Write-Host "   🔄 Membersihkan komentar tahun pembukuan..." -ForegroundColor Yellow
    $pagesContent = $pagesContent -replace "<!--[\s\S]*?tahun[\s\S]*?pembukuan[\s\S]*?-->", ""
    
    # Simpan jika ada perubahan
    if ($pagesContent -ne $originalPagesContent) {
        Set-Content "public/js/pages.js" $pagesContent
        Write-Host "✅ pages.js berhasil diperbaiki" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ Tidak ada perubahan diperlukan di pages.js" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ File public/js/pages.js tidak ditemukan" -ForegroundColor Red
}

Write-Host ""

# Cek file lain yang mungkin mengandung referensi tahun pembukuan
Write-Host "🔍 Mencari file lain yang mungkin mengandung referensi tahun pembukuan..." -ForegroundColor Blue

$filesToCheck = @(
    "public/index.html",
    "public/css/style.css",
    "package.json",
    "README.md"
)

foreach ($file in $filesToCheck) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match "tahun.*pembukuan|pembukuan.*tahun") {
            Write-Host "   ⚠️ Ditemukan referensi tahun pembukuan di: $file" -ForegroundColor Yellow
            Write-Host "   📝 Silakan periksa manual file ini" -ForegroundColor White
        }
    }
}

Write-Host ""

# Buat script verifikasi
Write-Host "📋 Membuat script verifikasi..." -ForegroundColor Blue

$verificationScript = @"
# 🔍 Script Verifikasi Penghapusan Tahun Pembukuan

Write-Host "🔍 Memverifikasi penghapusan fitur tahun pembukuan..." -ForegroundColor Yellow
Write-Host ""

# Cek apakah masih ada referensi tahun pembukuan
`$serverContent = Get-Content "server.js" -Raw
`$pagesContent = Get-Content "public/js/pages.js" -Raw

`$issues = @()

# Cek server.js
if (`$serverContent -match "getTahunAktif") {
    `$issues += "❌ Function getTahunAktif masih ada di server.js"
}

if (`$serverContent -match "tahun_pembukuan") {
    `$issues += "❌ Referensi tahun_pembukuan masih ada di server.js"
}

if (`$serverContent -match "tahunAktif") {
    `$issues += "❌ Variable tahunAktif masih ada di server.js"
}

# Cek pages.js
if (`$pagesContent -match "editTahunPembukuan|tutupBuku|bukaTahunBaru") {
    `$issues += "❌ Function tahun pembukuan masih ada di pages.js"
}

if (`$pagesContent -match "tahun.*pembukuan|pembukuan.*tahun") {
    `$issues += "❌ Referensi tahun pembukuan masih ada di pages.js"
}

# Tampilkan hasil
if (`$issues.Count -eq 0) {
    Write-Host "✅ Semua fitur tahun pembukuan berhasil dihapus!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎯 Sistem sekarang:" -ForegroundColor Cyan
    Write-Host "   ✅ Menggunakan tanggal_transaksi untuk filter" -ForegroundColor Green
    Write-Host "   ✅ SHU dihitung berdasarkan tahun transaksi" -ForegroundColor Green
    Write-Host "   ✅ Dashboard menggunakan tahun berjalan" -ForegroundColor Green
    Write-Host "   ✅ Tidak ada kompleksitas tahun pembukuan" -ForegroundColor Green
} else {
    Write-Host "⚠️ Masih ada beberapa issue yang perlu diperbaiki:" -ForegroundColor Yellow
    foreach (`$issue in `$issues) {
        Write-Host "   `$issue" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📋 Langkah selanjutnya:" -ForegroundColor Yellow
Write-Host "   1. Restart server: node server.js" -ForegroundColor White
Write-Host "   2. Test SHU 2025" -ForegroundColor White
Write-Host "   3. Verifikasi semua menu berfungsi" -ForegroundColor White
"@

Set-Content "verify-removal.ps1" $verificationScript
Write-Host "✅ Script verifikasi dibuat: verify-removal.ps1" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Proses perbaikan kondisi tersisa selesai!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Yang telah dilakukan:" -ForegroundColor Cyan
Write-Host "   ✅ Mengganti semua query tahun_pembukuan dengan tanggal_transaksi" -ForegroundColor Green
Write-Host "   ✅ Menghapus parameter tahunAktif yang tersisa" -ForegroundColor Green
Write-Host "   ✅ Membersihkan async/await yang tidak diperlukan" -ForegroundColor Green
Write-Host "   ✅ Menghapus try-catch untuk getTahunAktif" -ForegroundColor Green
Write-Host "   ✅ Membersihkan console.log tahun aktif" -ForegroundColor Green
Write-Host "   ✅ Menghapus referensi tahun pembukuan di pages.js" -ForegroundColor Green
Write-Host "   ✅ Membuat script verifikasi" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Jalankan verify-removal.ps1 untuk memverifikasi hasil!" -ForegroundColor Yellow