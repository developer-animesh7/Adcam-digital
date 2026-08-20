# AdCam Digital - Local Development Server (PowerShell)
param (
    [int]$Port = 3000
)

$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $PSScriptRoot) { $PSScriptRoot = (Get-Location).Path }

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  AdCam Digital - Corporate Website Local Server" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Directory: $PSScriptRoot" -ForegroundColor White
Write-Host "  URL:       http://localhost:$Port" -ForegroundColor Green
Write-Host "  About:     http://localhost:$Port/pages/about.html" -ForegroundColor White
Write-Host "  Services:  http://localhost:$Port/pages/services.html" -ForegroundColor White
Write-Host "  Ecosystem: http://localhost:$Port/pages/ecosystem.html" -ForegroundColor White
Write-Host "  Contact:   http://localhost:$Port/pages/contact.html" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Launch browser in background after 1s
Start-Job -ScriptBlock {
    param($p)
    Start-Sleep -Seconds 1
    Start-Process "http://localhost:$p"
} -ArgumentList $Port | Out-Null

# 1. Prefer Python 3 if installed
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "Starting Python HTTP Server on port $Port..." -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop the server.`n" -ForegroundColor DarkGray
    python -m http.server $Port --directory "$PSScriptRoot"
    exit
}

# 2. Try npx / node if available
if (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "Starting Node.js static server on port $Port..." -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop the server.`n" -ForegroundColor DarkGray
    npx -y serve "$PSScriptRoot" -l $Port
    exit
}

# 3. Pure PowerShell .NET HttpListener fallback
Write-Host "Starting pure PowerShell native HTTP Server on port $Port..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server.`n" -ForegroundColor DarkGray

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Host "Failed to start listener on $prefix. Trying port $($Port + 1)..." -ForegroundColor Red
    $Port++
    $prefix = "http://localhost:$Port/"
    $listener.Prefixes.Clear()
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".txt"  = "text/plain; charset=utf-8"
    ".xml"  = "application/xml; charset=utf-8"
}

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $urlPath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($urlPath)) { $urlPath = "index.html" }

    $localFilePath = [System.IO.Path]::Combine($PSScriptRoot, $urlPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))

    if ([System.IO.File]::Exists($localFilePath)) {
        $ext = [System.IO.Path]::GetExtension($localFilePath).ToLower()
        $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
        
        $bytes = [System.IO.File]::ReadAllBytes($localFilePath)
        $response.ContentType = $contentType
        $response.ContentLength64 = $bytes.Length
        $response.StatusCode = 200
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $notFoundMsg = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1><p>File not found: $urlPath</p>")
        $response.ContentType = "text/html"
        $response.StatusCode = 404
        $response.ContentLength64 = $notFoundMsg.Length
        $response.OutputStream.Write($notFoundMsg, 0, $notFoundMsg.Length)
    }
    $response.OutputStream.Close()
}
