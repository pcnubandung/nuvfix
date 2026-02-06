@echo off
echo Stopping existing Node.js processes...
taskkill /F /IM node.exe >nul 2>&1

echo Waiting for processes to stop...
timeout /t 3 /nobreak >nul

echo Starting server...
start "Koperasi Server" node server.js

echo Server restarted successfully!
pause