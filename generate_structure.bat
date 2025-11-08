@echo off
setlocal

set "OUTPUT=file_structure.txt"

if exist "%OUTPUT%" del "%OUTPUT%"
echo Generating file structure...

powershell -NoProfile -Command ^
  "$root = Get-Location; " ^
  "function Show-Tree($path, $indent='') {" ^
  "  Get-ChildItem -LiteralPath $path | Where-Object { $_.Name -ne 'node_modules' } | ForEach-Object {" ^
  "    Write-Output ('{0}|-- {1}' -f $indent, $_.Name);" ^
  "    if ($_.PSIsContainer -and $_.Name -ne 'node_modules') {" ^
  "      Show-Tree -path $_.FullName -indent ('  ' + $indent);" ^
  "    }" ^
  "  }" ^
  "}; " ^
  "Show-Tree $root | Out-File '%OUTPUT%' -Encoding utf8"

echo.
echo File structure saved to "%OUTPUT%"
pause
endlocal
