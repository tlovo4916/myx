# 2C2G服务器性能优化指南

## 前端优化

### 1. 启用Gzip压缩
在nginx配置中添加：
```nginx
server {
    # ... 其他配置
    
    # 启用gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
```

### 2. 静态资源缓存
```nginx
# 静态资源长期缓存
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Vary Accept-Encoding;
}
```

### 3. 图片优化
- 使用WebP格式图片
- 压缩图片大小
- 使用适当的图片尺寸

## 后端优化

### 1. Flask配置优化
在app.py中添加：
```python
# 生产环境配置
app.config['DEBUG'] = False
app.config['TESTING'] = False

# 数据库连接池
app.config['SQLALCHEMY_POOL_SIZE'] = 5
app.config['SQLALCHEMY_POOL_TIMEOUT'] = 20
app.config['SQLALCHEMY_POOL_RECYCLE'] = 3600
```

### 2. 使用Gunicorn
```bash
# 安装gunicorn
pip3 install gunicorn

# 启动命令（2个worker进程适合2核CPU）
gunicorn -w 2 -b 0.0.0.0:5000 --timeout 120 app:app
```

### 3. 数据库优化
```python
# 添加数据库索引
class Store(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, index=True)  # 添加索引
    city = db.Column(db.String(50), nullable=False, index=True)   # 添加索引
```

## 系统优化

### 1. 内存优化
```bash
# 创建swap文件（增加虚拟内存）
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 永久启用
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 2. 系统监控
```bash
# 安装htop监控工具
sudo apt install htop

# 查看系统资源使用
htop
```

### 3. 日志管理
```bash
# 限制日志文件大小
sudo nano /etc/logrotate.d/nginx
```

添加配置：
```
/var/log/nginx/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
```

## 宝塔面板优化

### 1. 关闭不必要的服务
- 如果不用MySQL，可以关闭MySQL服务
- 关闭不必要的监控功能

### 2. 设置自动重启
- 配置supervisor管理Python进程
- 设置进程异常自动重启

### 3. 定期清理
```bash
# 清理系统缓存
sudo apt autoremove
sudo apt autoclean

# 清理日志文件
sudo journalctl --vacuum-time=7d
```

## 性能监控

### 1. 网站性能测试
使用工具测试：
- GTmetrix
- PageSpeed Insights
- Pingdom

### 2. 服务器监控
```bash
# 查看内存使用
free -h

# 查看磁盘使用
df -h

# 查看CPU使用
top
```

### 3. 网络监控
```bash
# 查看网络连接
netstat -tuln

# 查看带宽使用
iftop
```

## 预期性能表现

### 在2C2G配置下：
- **首页加载时间**：3-8秒（首次访问）
- **后续页面**：1-3秒（有缓存）
- **API响应时间**：100-500ms
- **并发用户**：20-50个同时在线用户
- **日访问量**：1000-5000次访问

### 流量消耗估算：
- **首次访问**：约5MB
- **后续访问**：约500KB-1MB
- **月流量200G**：可支持4-8万次访问

## 扩容建议

当网站访问量增长时：
1. **优先升级内存**：2G → 4G
2. **其次升级带宽**：3M → 5M
3. **最后升级CPU**：2核 → 4核

## 成本控制

- **月费用**：约30-80元/月
- **性价比**：非常高
- **适用场景**：中小型企业官网、个人项目 