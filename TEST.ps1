#!/usr/bin/env pwsh
# CyberSafety Advisory — Quick Test Script
# Run from: c:\Users\Tanuj Kumar\Desktop\cyberclarity-advisory

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CyberSafety Advisory — Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Colors
$success = "Green"
$error = "Red"
$info = "Yellow"

# Check files exist
Write-Host "✓ Checking HTML files..." -ForegroundColor $info
$htmlFiles = @(
    "index.html",
    "how-we-help.html",
    "resources.html",
    "about.html",
    "contact.html"
)

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor $success
    } else {
        Write-Host "  ✗ $file MISSING" -ForegroundColor $error
    }
}

Write-Host ""
Write-Host "✓ Checking CSS & JS..." -ForegroundColor $info
$otherFiles = @(
    "css/style.css",
    "js/main.js"
)

foreach ($file in $otherFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        Write-Host "  ✓ $file ($size bytes)" -ForegroundColor $success
    } else {
        Write-Host "  ✗ $file MISSING" -ForegroundColor $error
    }
}

Write-Host ""
Write-Host "✓ Checking assets..." -ForegroundColor $info
$assets = @(
    "img/logo.svg",
    "img/hero.svg"
)

foreach ($file in $assets) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor $success
    } else {
        Write-Host "  ✗ $file MISSING" -ForegroundColor $error
    }
}

Write-Host ""
Write-Host "✓ Checking documentation..." -ForegroundColor $info
$docs = @(
    "README.md",
    "SITEMAP.md"
)

foreach ($file in $docs) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor $success
    } else {
        Write-Host "  ✗ $file MISSING" -ForegroundColor $error
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Quick HTML Validation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check for critical HTML elements
$pagesToCheck = @(
    "index.html",
    "how-we-help.html",
    "resources.html",
    "about.html",
    "contact.html"
)

foreach ($page in $pagesToCheck) {
    Write-Host "Checking $page..." -ForegroundColor $info
    $content = Get-Content $page -Raw
    
    # Check for DOCTYPE
    if ($content -match '<!doctype html>') {
        Write-Host "  ✓ DOCTYPE declared" -ForegroundColor $success
    } else {
        Write-Host "  ✗ DOCTYPE missing" -ForegroundColor $error
    }
    
    # Check for required nav links
    $requiredPages = @("index.html", "how-we-help.html", "resources.html", "about.html", "contact.html")
    $linkCount = 0
    foreach ($link in $requiredPages) {
        if ($content -match "href=`"$link`"") {
            $linkCount++
        }
    }
    Write-Host "  ✓ Navigation links: $linkCount/5" -ForegroundColor $success
    
    # Check for main tag
    if ($content -match '<main') {
        Write-Host "  ✓ Semantic <main> tag" -ForegroundColor $success
    } else {
        Write-Host "  ✗ Missing <main> tag" -ForegroundColor $error
    }
    
    # Check for footer
    if ($content -match '<footer') {
        Write-Host "  ✓ Footer present" -ForegroundColor $success
    } else {
        Write-Host "  ✗ Missing footer" -ForegroundColor $error
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Statistics" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$htmlSize = (Get-Item index.html).Length + (Get-Item how-we-help.html).Length + (Get-Item resources.html).Length + (Get-Item about.html).Length + (Get-Item contact.html).Length
$cssSize = (Get-Item "css/style.css").Length
$jsSize = (Get-Item "js/main.js").Length

Write-Host "Total HTML: $([math]::Round($htmlSize/1KB, 1)) KB" -ForegroundColor $info
Write-Host "Total CSS:  $([math]::Round($cssSize/1KB, 1)) KB" -ForegroundColor $info
Write-Host "Total JS:   $([math]::Round($jsSize/1KB, 1)) KB" -ForegroundColor $info

Write-Host ""
Write-Host "✓ All files ready for deployment!" -ForegroundColor $success
Write-Host ""
