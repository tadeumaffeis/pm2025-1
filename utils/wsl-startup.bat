@echo off

wt new-tab ^
  --title "WSL Server" ^
  --tabColor "#009999" ^  --command wsl ^
; split-pane ^
  --title "WSL Server" ^
  --tabColor "#009999" ^
  --command wsl ^
;split-pane ^
  --title "WSL Server" ^
  --tabColor "#009999" ^
  -H ^
  --command wsl
