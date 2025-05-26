@echo off
echo 安装海底捞火锅官网项目依赖...
echo.

echo 1. 安装后端依赖...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo 后端依赖安装失败！请检查Python和pip是否正确安装。
    pause
    exit /b 1
)
cd ..

echo.
echo 2. 安装前端依赖...
cd frontend
npm install
if %errorlevel% neq 0 (
    echo 前端依赖安装失败！请检查Node.js和npm是否正确安装。
    pause
    exit /b 1
)
cd ..

echo.
echo 依赖安装完成！
echo 现在可以运行 start.bat 启动项目。
echo.
pause 