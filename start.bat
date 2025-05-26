@echo off
echo 启动海底捞火锅官网项目...
echo.

echo 1. 启动后端服务...
cd backend
start "后端服务" cmd /k "python app.py"
cd ..

echo 2. 等待3秒后启动前端服务...
timeout /t 3 /nobreak > nul

echo 3. 启动前端服务...
cd frontend
start "前端服务" cmd /k "npm start"
cd ..

echo.
echo 项目启动完成！
echo 后端服务: http://localhost:5000
echo 前端服务: http://localhost:3000
echo.
pause 