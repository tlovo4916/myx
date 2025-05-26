@echo off
chcp 65001
echo.
echo ========================================
echo    妙宇轩餐饮连锁集团 - 启动脚本
echo ========================================
echo.
echo 正在启动妙宇轩餐饮管理系统...
echo.

echo [1/2] 启动后端服务...
cd backend
start "妙宇轩后端服务" cmd /k "python app.py"
cd ..

echo [2/2] 启动前端服务...
cd frontend
start "妙宇轩前端服务" cmd /k "start-lan.bat"
cd ..

echo.
echo ========================================
echo 启动完成！
echo.
echo 后端服务: http://localhost:5000
echo 前端服务: http://localhost:3000
echo 局域网访问: http://192.168.1.2:3000
echo.
echo 传承中华饮食文化，弘扬家和理念
echo "家和为贵" - Family is First
echo ========================================
echo.
pause 