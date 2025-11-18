# 🚀 PANDUAN STEP-BY-STEP KONVERSI KE LARAVEL

## FASE 1: Setup & Konfigurasi

### Step 1: Install Laravel

```bash
# Buat project Laravel baru
composer create-project laravel/laravel koperasi-laravel

# Masuk ke folder project
cd koperasi-laravel

# Test server
php artisan serve
# Akses: http://localhost:8000
```

### Step 2: Install Dependencies

```bash
# Authentication
composer require laravel/sanctum

# Image processing
composer require intervention/image

# Excel export/import
composer require maatwebsite/excel

# PDF generation
composer require barryvdh/laravel-dompdf

# Development tools
composer require --dev barryvdh/laravel-debugbar
```

### Step 3: Konfigurasi Database

Edit file `.env`:

```env
APP_NAME="Koperasi NU Vibes"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=koperasi_laravel
DB_USERNAME=root
DB_PASSWORD=

# Session & Cache
SESSION_DRIVER=database
CACHE_DRIVER=file

# File Storage
FILESYSTEM_DISK=public
```

### Step 4: Buat Database

```bash
# Login ke MySQL
mysql -u root -p

# Buat database
CREATE DATABASE koperasi_laravel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# Test koneksi
php artisan migrate
```

### Step 5: Setup Authentication

```bash
# Install Laravel Breeze (optional, untuk UI auth)
composer require laravel/breeze --dev
php artisan breeze:install blade
npm install && npm run dev

# Atau setup manual Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

### Step 6: Setup Storage

```bash
# Create storage link
php artisan storage:link

# Buat folder uploads
mkdir -p storage/app/public/uploads
mkdir -p storage/app/public/logos
```

---

## FASE 2: Database Migrations

Saya akan membuat migrations untuk semua tabel. Ini contoh untuk beberapa tabel utama:

### Migration 1: Users Table

```bash
php artisan make:migration create_users_table
```

File: `database/migrations/xxxx_create_users_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('nama_lengkap');
            $table->enum('role', ['Admin', 'Kasir', 'Pengawas'])->default('Kasir');
            $table->string('hak_akses')->nullable();
            $table->string('foto')->nullable();
            $table->enum('status', ['aktif', 'nonaktif'])->default('aktif');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};
```

### Migration 2: Koperasi Info

```bash
php artisan make:migration create_koperasi_info_table
```

### Migration 3: Anggota

```bash
php artisan make:migration create_anggota_table
```

File: `database/migrations/xxxx_create_anggota_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('anggota', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_anggota')->unique();
            $table->string('nama_lengkap');
            $table->string('nik')->nullable();
            $table->string('tempat_lahir')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan'])->nullable();
            $table->text('alamat')->nullable();
            $table->string('nomor_telpon')->nullable();
            $table->string('email')->nullable();
            $table->string('pekerjaan')->nullable();
            $table->string('foto')->nullable();
            $table->date('tanggal_bergabung');
            $table->string('username')->unique()->nullable();
            $table->string('password')->nullable();
            $table->enum('status', ['aktif', 'nonaktif'])->default('aktif');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('anggota');
    }
};
```

### Jalankan Migrations

```bash
# Run all migrations
php artisan migrate

# Rollback jika ada error
php artisan migrate:rollback

# Fresh migration (drop all tables)
php artisan migrate:fresh
```

---

## FASE 3: Models

### Model 1: User

```bash
php artisan make:model User
```

File: `app/Models/User.php`

```php
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'username',
        'password',
        'nama_lengkap',
        'role',
        'hak_akses',
        'foto',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Check if user is admin
    public function isAdmin()
    {
        return $this->role === 'Admin';
    }

    // Check if user is kasir
    public function isKasir()
    {
        return $this->role === 'Kasir';
    }
}
```

### Model 2: Anggota

```bash
php artisan make:model Anggota
```

File: `app/Models/Anggota.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Anggota extends Authenticatable
{
    protected $table = 'anggota';

    protected $fillable = [
        'nomor_anggota',
        'nama_lengkap',
        'nik',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'nomor_telpon',
        'email',
        'pekerjaan',
        'foto',
        'tanggal_bergabung',
        'username',
        'password',
        'status',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'tanggal_bergabung' => 'date',
    ];

    // Relationships
    public function simpananPokok()
    {
        return $this->hasMany(SimpananPokok::class, 'anggota_id');
    }

    public function simpananWajib()
    {
        return $this->hasMany(SimpananWajib::class, 'anggota_id');
    }

    public function simpananKhusus()
    {
        return $this->hasMany(SimpananKhusus::class, 'anggota_id');
    }

    public function simpananSukarela()
    {
        return $this->hasMany(SimpananSukarela::class, 'anggota_id');
    }

    // Calculate total simpanan
    public function getTotalSimpananAttribute()
    {
        return $this->simpananPokok()->sum('jumlah') +
               $this->simpananWajib()->sum('jumlah') +
               $this->simpananKhusus()->sum('jumlah') +
               $this->simpananSukarela()->where('jenis', 'Setoran')->sum('jumlah') -
               $this->simpananSukarela()->where('jenis', 'Penarikan')->sum('jumlah');
    }
}
```

---

## FASE 4: Controllers

### Controller 1: AuthController

```bash
php artisan make:controller Auth/AuthController
```

File: `app/Http/Controllers/Auth/AuthController.php`

```php
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'username' => 'Username atau password salah.',
        ])->onlyInput('username');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}
```

### Controller 2: AnggotaController

```bash
php artisan make:controller Admin/AnggotaController --resource
```

File: `app/Http/Controllers/Admin/AnggotaController.php`

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Anggota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AnggotaController extends Controller
{
    public function index()
    {
        $anggota = Anggota::orderBy('created_at', 'desc')->get();
        return view('admin.anggota.index', compact('anggota'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nomor_anggota' => 'required|unique:anggota',
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'nullable|string|max:16',
            'tempat_lahir' => 'nullable|string',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => 'nullable|in:Laki-laki,Perempuan',
            'alamat' => 'nullable|string',
            'nomor_telpon' => 'nullable|string',
            'email' => 'nullable|email',
            'pekerjaan' => 'nullable|string',
            'tanggal_bergabung' => 'required|date',
            'username' => 'nullable|unique:anggota',
            'password' => 'nullable|min:6',
            'foto' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $request->file('foto')->store('uploads', 'public');
        }

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        }

        Anggota::create($validated);

        return redirect()->route('admin.anggota.index')
            ->with('success', 'Anggota berhasil ditambahkan');
    }

    public function update(Request $request, Anggota $anggota)
    {
        $validated = $request->validate([
            'nomor_anggota' => 'required|unique:anggota,nomor_anggota,' . $anggota->id,
            'nama_lengkap' => 'required|string|max:255',
            // ... validasi lainnya
        ]);

        if ($request->hasFile('foto')) {
            // Delete old photo
            if ($anggota->foto) {
                Storage::disk('public')->delete($anggota->foto);
            }
            $validated['foto'] = $request->file('foto')->store('uploads', 'public');
        }

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        }

        $anggota->update($validated);

        return redirect()->route('admin.anggota.index')
            ->with('success', 'Anggota berhasil diupdate');
    }

    public function destroy(Anggota $anggota)
    {
        if ($anggota->foto) {
            Storage::disk('public')->delete($anggota->foto);
        }

        $anggota->delete();

        return redirect()->route('admin.anggota.index')
            ->with('success', 'Anggota berhasil dihapus');
    }
}
```

---

## FASE 5: Routes

File: `routes/web.php`

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AnggotaController;

// Public routes
Route::get('/', function () {
    return redirect('/login');
});

// Auth routes
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Admin routes (protected)
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Anggota
    Route::resource('anggota', AnggotaController::class);
    
    // Simpanan
    Route::prefix('simpanan')->name('simpanan.')->group(function () {
        Route::resource('pokok', SimpananPokokController::class);
        Route::resource('wajib', SimpananWajibController::class);
        Route::resource('khusus', SimpananKhususController::class);
        Route::resource('sukarela', SimpananSukarelaController::class);
    });
    
    // Transaksi
    Route::resource('penjualan', PenjualanController::class);
    Route::resource('pengeluaran', PengeluaranController::class);
    Route::resource('pendapatan-lain', PendapatanLainController::class);
    Route::resource('partisipasi', PartisipasiController::class);
    
    // Laporan
    Route::prefix('laporan')->name('laporan.')->group(function () {
        Route::get('/laba-rugi', [LaporanController::class, 'labaRugi'])->name('laba-rugi');
        Route::get('/neraca', [LaporanController::class, 'neraca'])->name('neraca');
        Route::get('/arus-kas', [LaporanController::class, 'arusKas'])->name('arus-kas');
    });
    
    // SHU
    Route::prefix('shu')->name('shu.')->group(function () {
        Route::get('/', [SHUController::class, 'index'])->name('index');
        Route::post('/hitung', [SHUController::class, 'hitung'])->name('hitung');
        Route::get('/export', [SHUController::class, 'export'])->name('export');
    });
});

// Member routes
Route::middleware(['auth:anggota'])->prefix('member')->name('member.')->group(function () {
    Route::get('/dashboard', [MemberController::class, 'dashboard'])->name('dashboard');
    Route::get('/simpanan', [MemberController::class, 'simpanan'])->name('simpanan');
    Route::get('/shu', [MemberController::class, 'shu'])->name('shu');
});
```

---

## FASE 6: Views (Blade Templates)

### Layout: app.blade.php

File: `resources/views/layouts/app.blade.php`

```blade
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title') - Koperasi NU Vibes</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <!-- Feather Icons -->
    <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
    
    @stack('styles')
</head>
<body>
    @include('layouts.sidebar')
    
    <div class="main-content">
        @include('layouts.header')
        
        <main id="contentArea">
            @if(session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @endif
            
            @if(session('error'))
                <div class="alert alert-danger">
                    {{ session('error') }}
                </div>
            @endif
            
            @yield('content')
        </main>
    </div>
    
    <!-- JavaScript -->
    <script src="{{ asset('js/app.js') }}"></script>
    <script>
        // CSRF Token for AJAX
        window.csrfToken = '{{ csrf_token() }}';
        
        // Initialize Feather Icons
        feather.replace();
    </script>
    
    @stack('scripts')
</body>
</html>
```

### View: Dashboard

File: `resources/views/admin/dashboard.blade.php`

```blade
@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
<div class="dashboard">
    <h1>Dashboard</h1>
    
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
                <h3>Total Anggota</h3>
                <p class="stat-value">{{ $totalAnggota }}</p>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-info">
                <h3>Total Simpanan</h3>
                <p class="stat-value">{{ formatRupiah($totalSimpanan) }}</p>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">📈</div>
            <div class="stat-info">
                <h3>Total Pendapatan</h3>
                <p class="stat-value">{{ formatRupiah($totalPendapatan) }}</p>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-info">
                <h3>SHU Tahun Ini</h3>
                <p class="stat-value">{{ formatRupiah($shuTahunIni) }}</p>
            </div>
        </div>
    </div>
    
    <div class="charts-grid">
        <div class="chart-container">
            <h3>Komposisi Simpanan</h3>
            <canvas id="simpananChart"></canvas>
        </div>
        
        <div class="chart-container">
            <h3>Pendapatan Bulanan</h3>
            <canvas id="pendapatanChart"></canvas>
        </div>
    </div>
</div>

@push('scripts')
<script>
    // Chart data from Laravel
    const simpananData = @json($simpananData);
    const pendapatanData = @json($pendapatanData);
    
    // Render charts
    // ... (sama seperti sebelumnya)
</script>
@endpush
@endsection
```

---

## Langkah Selanjutnya

Ini adalah struktur dasar. Untuk melanjutkan:

1. **Lengkapi semua migrations** (15+ tabel)
2. **Buat semua models** dengan relationships
3. **Buat semua controllers** untuk CRUD
4. **Convert semua views** ke Blade
5. **Migrate data** dari SQLite ke MySQL
6. **Testing** setiap fitur
7. **Deploy** ke shared hosting

**Apakah Anda ingin saya lanjutkan dengan:**
- A. Membuat semua migrations lengkap?
- B. Membuat semua models dengan relationships?
- C. Membuat controllers untuk fitur tertentu?
- D. Panduan migrasi data dari SQLite ke MySQL?

Pilih yang mana dulu? 🚀
