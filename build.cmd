@echo off
setlocal enabledelayedexpansion

echo 📦 Installing root dependencies...
call npm install
if errorlevel 1 exit /b 1

echo 📦 Installing client dependencies...
cd client
call npm install
if errorlevel 1 exit /b 1
echo 🔨 Building client...
call npm run build
if errorlevel 1 exit /b 1
cd ..

echo 📦 Installing server dependencies...
cd server
call npm install
if errorlevel 1 exit /b 1
echo 🔨 Building server...
call npm run build
if errorlevel 1 exit /b 1
cd ..

echo ✅ Build complete!
