# 妙宇轩项目部署指南 🚀

## 🎯 推荐方案：宝塔面板部署

> 适合新手，图形化操作，快速上线

### 1. 服务器准备
```bash
# 购买云服务器（2核2G，Ubuntu 20.04）
# 安装宝塔面板
wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh
```

### 2. 环境安装
在宝塔面板中一键安装：
- Python 3.8+
- Node.js 16+
- Nginx
- MySQL 5.7+（可选）

### 3. 项目部署
```bash
# 上传项目到 /www/wwwroot/myx/

# 安装后端依赖
cd /www/wwwroot/myx/backend
pip3 install -r requirements.txt

# 构建前端
cd /www/wwwroot/myx/frontend
npm install
npm run build
```

### 4. Nginx配置
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /www/wwwroot/myx/frontend/build;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 5. 启动服务
```bash
# 启动后端（建议使用supervisor管理）
cd /www/wwwroot/myx/backend
python3 app.py
```

## 🐳 Docker部署（进阶用户）

### 快速启动
```bash
# 安装Docker和docker-compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 部署项目
cd myx
docker-compose up -d
```

## 🌐 域名和SSL配置

### 域名解析
- 在域名服务商处添加A记录，指向服务器IP

### SSL证书（Let's Encrypt）
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 🔧 常见问题

### 端口被占用
```bash
sudo netstat -tlnp | grep :5000
sudo kill -9 PID
```

### 权限问题
```bash
sudo chmod +x start.bat
sudo chown -R www-data:www-data /var/www/myx
```

### 防火墙设置
```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 5000
```

## 📊 性能优化

### 服务器配置建议
- **最低配置**：2核2G，适合测试
- **推荐配置**：2核4G，适合生产
- **高性能配置**：4核8G，适合高并发

### 优化措施
- 启用Gzip压缩
- 配置静态资源缓存
- 使用CDN加速
- 数据库索引优化

---

**部署时间**：约1-2小时  
**技术支持**：推荐使用宝塔面板，降低部署难度 