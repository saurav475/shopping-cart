<<<<<<< HEAD
@echo off
REM Shopping Cart Setup Script for Windows

echo.
echo ============================================
echo   Shopping Cart Setup
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed.
    echo Please download and install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js installed: 
node -v

echo [OK] NPM installed: 
npm -v

echo.
echo ============================================
echo   Setting up Backend
echo ============================================
echo.

cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
    echo [OK] Backend dependencies installed
) else (
    echo [OK] Backend dependencies already installed
)

if not exist ".env" (
    copy .env.example .env
    echo [OK] Backend .env file created
)

cd ..

echo.
echo ============================================
echo   Setting up Frontend
echo ============================================
echo.

cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    echo [OK] Frontend dependencies installed
) else (
    echo [OK] Frontend dependencies already installed
)

if not exist ".env" (
    copy .env.example .env
    echo [OK] Frontend .env file created
)

cd ..

echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo Next Steps:
echo   1. Ensure MongoDB is running on localhost:27017
echo   2. Run "npm run dev" in the backend directory
echo   3. Run "npm start" in the frontend directory
echo.
echo Web: http://localhost:3000
echo API: http://localhost:5000
echo.
pause
=======
@echo off
REM Shopping Cart Setup Script for Windows

echo.
echo ============================================
echo   Shopping Cart Setup
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed.
    echo Please download and install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js installed: 
node -v

echo [OK] NPM installed: 
npm -v

echo.
echo ============================================
echo   Setting up Backend
echo ============================================
echo.

cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
    echo [OK] Backend dependencies installed
) else (
    echo [OK] Backend dependencies already installed
)

if not exist ".env" (
    copy .env.example .env
    echo [OK] Backend .env file created
)

cd ..

echo.
echo ============================================
echo   Setting up Frontend
echo ============================================
echo.

cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    echo [OK] Frontend dependencies installed
) else (
    echo [OK] Frontend dependencies already installed
)

if not exist ".env" (
    copy .env.example .env
    echo [OK] Frontend .env file created
)

cd ..

echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo Next Steps:
echo   1. Ensure MongoDB is running on localhost:27017
echo   2. Run "npm run dev" in the backend directory
echo   3. Run "npm start" in the frontend directory
echo.
echo Web: http://localhost:3000
echo API: http://localhost:5000
echo.
pause
>>>>>>> 62fd90be2eccb936805075527a7a8436f943ddaf
