Add-Type -AssemblyName System.Drawing

$source = Join-Path $PSScriptRoot "..\assets\logo-icon-source.png"
$public = Join-Path $PSScriptRoot "..\public"

if (-not (Test-Path $source)) {
    Write-Error "Source image not found: $source"
    exit 1
}

$sizes = @(
    @{ Name = "favicon-16x16.png"; Size = 16 },
    @{ Name = "favicon-32x32.png"; Size = 32 },
    @{ Name = "logo-icon.png"; Size = 64 },
    @{ Name = "logo.png"; Size = 256 },
    @{ Name = "apple-touch-icon.png"; Size = 180 },
    @{ Name = "android-chrome-192x192.png"; Size = 192 },
    @{ Name = "android-chrome-512x512.png"; Size = 512 }
)

$original = [System.Drawing.Image]::FromFile((Resolve-Path $source))

foreach ($item in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap $item.Size, $item.Size
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.DrawImage($original, 0, 0, $item.Size, $item.Size)
    $outPath = Join-Path $public $item.Name
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $bmp.Dispose()
    Write-Host "Created $($item.Name)"
}

# favicon.ico — use favicon-32x32.png as fallback (browsers support PNG favicons)
Write-Host "Note: favicon.ico skipped; use favicon.svg and PNG favicons in HTML."

$original.Dispose()
Write-Host "Done."
