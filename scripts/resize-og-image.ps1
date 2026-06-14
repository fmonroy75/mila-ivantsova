Add-Type -AssemblyName System.Drawing

$source = "c:\xampp\htdocs\mila-ivantsova\public\og-image.png"
$targetW = 1200
$targetH = 630

$original = [System.Drawing.Image]::FromFile($source)
$srcW = $original.Width
$srcH = $original.Height

$targetRatio = $targetW / $targetH
$srcRatio = $srcW / $srcH

if ($srcRatio -gt $targetRatio) {
    $cropH = $srcH
    $cropW = [int]($srcH * $targetRatio)
    $cropX = [int](($srcW - $cropW) / 2)
    $cropY = 0
} else {
    $cropW = $srcW
    $cropH = [int]($srcW / $targetRatio)
    $cropX = 0
    $cropY = [int](($srcH - $cropH) / 2)
}

$srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
$destRect = New-Object System.Drawing.Rectangle 0, 0, $cropW, $cropH

$cropped = New-Object System.Drawing.Bitmap $cropW, $cropH
$cropGfx = [System.Drawing.Graphics]::FromImage($cropped)
$cropGfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$cropGfx.DrawImage($original, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$cropGfx.Dispose()

$bmp = New-Object System.Drawing.Bitmap $targetW, $targetH
$graphics = [System.Drawing.Graphics]::FromImage($bmp)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($cropped, 0, 0, $targetW, $targetH)
$graphics.Dispose()

$temp = "$source.tmp"
$bmp.Save($temp, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$cropped.Dispose()
$original.Dispose()
Move-Item -Force $temp $source
Write-Host "Resized og-image to ${targetW}x${targetH}"
