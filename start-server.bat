@echo off
setlocal
title AdCam Digital - Local Development Server

set PORT=3000
set DIR=%~dp0

echo ============================================================
echo   AdCam Digital - Corporate Website Local Server
echo ============================================================
echo   Directory: %DIR%
echo   URL:       http://localhost:%PORT%
echo   About:     http://localhost:%PORT%/pages/about.html
echo   Services:  http://localhost:%PORT%/pages/services.html
echo   Ecosystem: http://localhost:%PORT%/pages/ecosystem.html
echo   Contact:   http://localhost:%PORT%/pages/contact.html
echo ============================================================
echo.

:: Open default browser after 1 second in background
start "" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:%PORT%"

:: Check for Python first
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Starting Python HTTP Server on port %PORT%...
    echo Press Ctrl+C to stop the server.
    echo.
    python -m http.server %PORT% --directory "%DIR%"
    goto end
)

:: Check for Node.js npx
where npx >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Starting Node.js static server on port %PORT%...
    echo Press Ctrl+C to stop the server.
    echo.
    npx -y serve "%DIR%" -l %PORT%
    goto end
)

:: Fallback to PowerShell
echo Starting PowerShell HTTP server...
powershell -NoProfile -ExecutionPolicy Bypass -File "%DIR%start-server.ps1"

:end
pause
