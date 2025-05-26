# 妙宇轩项目服务器部署指南

## 方案一：宝塔面板部署（推荐新手）

### 1. 服务器准备
- 购买云服务器（2核4G，Ubuntu 20.04）
- 安装宝塔面板：`wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh`

### 2. 环境安装
在宝塔面板中安装：
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

## 方案二：Docker部署

### 1. 安装Docker
```bash
# Ubuntu
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. 部署项目
```bash
# 上传项目文件到服务器
# 在项目根目录执行
docker-compose up -d
```

### 3. 访问应用
- 前端：http://your-server-ip
- 后端API：http://your-server-ip/api

## 方案三：传统部署

### 1. 环境准备
```bash
# 安装Python
sudo apt update
sudo apt install python3 python3-pip

# 安装Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装Nginx
sudo apt install nginx
```

### 2. 部署后端
```bash
cd /var/www/myx/backend
pip3 install -r requirements.txt

# 使用Gunicorn运行
pip3 install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### 3. 部署前端
```bash
cd /var/www/myx/frontend
npm install
npm run build

# 将build文件夹内容复制到nginx目录
sudo cp -r build/* /var/www/html/
```

### 4. 配置Nginx
```bash
sudo nano /etc/nginx/sites-available/myx
```

添加配置后启用：
```bash
sudo ln -s /etc/nginx/sites-available/myx /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 域名和SSL配置

### 1. 域名解析
- 在域名服务商处添加A记录，指向服务器IP

### 2. SSL证书（推荐Let's Encrypt）
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 常见问题

### 1. 端口被占用
```bash
# 查看端口占用
sudo netstat -tlnp | grep :5000
# 杀死进程
sudo kill -9 PID
```

### 2. 权限问题
```bash
# 给予执行权限
sudo chmod +x start.sh
# 修改文件所有者
sudo chown -R www-data:www-data /var/www/myx
```

### 3. 防火墙设置
```bash
# Ubuntu UFW
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 5000

# CentOS firewalld
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
```

## 监控和维护

### 1. 使用PM2管理Node.js进程
```bash
npm install -g pm2
pm2 start app.py --name myx-backend --interpreter python3
pm2 startup
pm2 save
```

### 2. 日志查看
```bash
# Nginx日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# 应用日志
tail -f /var/log/myx/app.log
```

### 3. 定期备份
```bash
# 备份数据库
cp /var/www/myx/backend/instance/miyuxuan.db /backup/
# 备份代码
tar -czf /backup/myx-$(date +%Y%m%d).tar.gz /var/www/myx/
``` 