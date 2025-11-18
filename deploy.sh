#!/bin/bash

# Deployment Script for Koperasi NU Vibes
# Usage: ./deploy.sh

echo "🚀 Starting deployment process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Please edit .env file and set JWT_SECRET!"
    echo "   You can generate a secret key with:"
    echo "   node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    exit 1
fi

echo "✅ .env file found"

# Create uploads directory if not exists
if [ ! -d "public/uploads" ]; then
    echo "📁 Creating uploads directory..."
    mkdir -p public/uploads
fi

echo "✅ Uploads directory ready"

# Check if PM2 is installed
if command -v pm2 &> /dev/null; then
    echo "🔄 PM2 detected. Starting with PM2..."
    pm2 stop koperasi-nu-vibes 2>/dev/null
    pm2 delete koperasi-nu-vibes 2>/dev/null
    pm2 start server.js --name koperasi-nu-vibes
    pm2 save
    echo "✅ Application started with PM2"
    echo "📊 View logs: pm2 logs koperasi-nu-vibes"
    echo "📊 View status: pm2 status"
else
    echo "⚠️  PM2 not installed. Starting with node..."
    echo "💡 For production, install PM2: npm install -g pm2"
    node server.js
fi

echo "✅ Deployment completed!"
echo "🌐 Application should be running on http://localhost:3000"
echo "👤 Default login: username=admin, password=admin123"
echo "⚠️  IMPORTANT: Change default password after first login!"
