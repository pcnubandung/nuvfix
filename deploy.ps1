# Deployment Script for Koperasi NU Vibes (Windows)
# Usage: .\deploy.ps1

Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm -v
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green

# Check if .env file exists
if (-not (Test-Path .env)) {
    Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
    Write-Host "📝 Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "⚠️  IMPORTANT: Please edit .env file and set JWT_SECRET!" -ForegroundColor Yellow
    Write-Host "   You can generate a secret key with:" -ForegroundColor Yellow
    Write-Host "   node -e `"console.log(require('crypto').randomBytes(32).toString('hex'))`"" -ForegroundColor Cyan
    exit 1
}

Write-Host "✅ .env file found" -ForegroundColor Green

# Create uploads directory if not exists
if (-not (Test-Path "public/uploads")) {
    Write-Host "📁 Creating uploads directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "public/uploads" -Force | Out-Null
}

Write-Host "✅ Uploads directory ready" -ForegroundColor Green

# Check if PM2 is installed
try {
    pm2 -v | Out-Null
    Write-Host "🔄 PM2 detected. Starting with PM2..." -ForegroundColor Yellow
    pm2 stop koperasi-nu-vibes 2>$null
    pm2 delete koperasi-nu-vibes 2>$null
    pm2 start server.js --name koperasi-nu-vibes
    pm2 save
    Write-Host "✅ Application started with PM2" -ForegroundColor Green
    Write-Host "📊 View logs: pm2 logs koperasi-nu-vibes" -ForegroundColor Cyan
    Write-Host "📊 View status: pm2 status" -ForegroundColor Cyan
} catch {
    Write-Host "⚠️  PM2 not installed. Starting with node..." -ForegroundColor Yellow
    Write-Host "💡 For production, install PM2: npm install -g pm2" -ForegroundColor Cyan
    node server.js
}

Write-Host "✅ Deployment completed!" -ForegroundColor Green
Write-Host "🌐 Application should be running on http://localhost:3000" -ForegroundColor Cyan
Write-Host "👤 Default login: username=admin, password=admin123" -ForegroundColor Cyan
Write-Host "⚠️  IMPORTANT: Change default password after first login!" -ForegroundColor Yellow
