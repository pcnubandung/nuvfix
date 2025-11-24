#!/bin/bash

# Migration script for pengumuman table
# Run this on Railway or localhost to add missing columns

echo "🚀 Running pengumuman table migration..."
echo ""

node fix-pengumuman-table.js

echo ""
echo "✅ Migration completed!"
echo ""
echo "Next steps:"
echo "1. Restart your server"
echo "2. Test the form tambah pengumuman"
echo "3. Verify no errors"
