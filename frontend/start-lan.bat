@echo off
chcp 65001
echo.
echo ========================================
echo    妙宇轩前端服务 - 局域网访问模式
echo ========================================
echo.
echo 正在启动前端服务（支持局域网访问）...
echo.

set HOST=0.0.0.0
set REACT_APP_API_URL=http://localhost:5000
set GENERATE_SOURCEMAP=false

npm start

echo.
echo 前端服务已启动
echo 本地访问: http://localhost:3000
echo 局域网访问: http://192.168.1.2:3000
echo.
pause 