# 妙宇轩中式餐饮文化官网 🏮

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org)
[![Flask](https://img.shields.io/badge/flask-2.3.3-green.svg)](https://flask.palletsprojects.com)

> 传承中华饮食文化，展现"家和为贵"的品牌理念

这是一个以妙宇轩品牌为主题的全栈Web应用，使用Python Flask作为后端，React作为前端，致力于传承中华饮食文化。

## 📸 项目预览

<!-- 添加项目截图 -->
![项目首页](docs/images/homepage.png)
![菜品展示](docs/images/menu.png)
![门店分布](docs/images/stores.png)

## ✨ 项目特色

- 🏮 **中式设计** - 传统文化与现代设计完美融合
- 🔐 **用户认证** - 完整的用户注册、登录系统
- 📱 **响应式布局** - 适配各种设备屏幕
- 🍽️ **宴席预订** - 支持传统宴席和抓周礼仪预约
- 📰 **文化资讯** - 传统文化和品牌动态展示
- 🏪 **门店分布** - 云南红河州各地门店信息
- 🎭 **传统文化** - 抓周礼仪、传统婚宴等文化服务

## 🚀 快速开始

### 环境要求

- Python 3.8+
- Node.js 14+
- npm 或 yarn

### 一键启动（Windows）

```bash
# 安装依赖
install.bat

# 启动服务
start.bat
```

### 手动安装

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/miaoyuxuan.git
   cd miaoyuxuan
   ```

2. **安装后端依赖**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **安装前端依赖**
   ```bash
   cd frontend
   npm install
   ```

4. **启动后端服务**
   ```bash
   cd backend
   python app.py
   ```
   后端服务运行在 `http://localhost:5000`

5. **启动前端服务**
   ```bash
   cd frontend
   npm start
   ```
   前端服务运行在 `http://localhost:3000`

## 🏗️ 技术栈

### 后端
- **Python 3.8+** - 编程语言
- **Flask 2.3.3** - Web框架
- **SQLAlchemy** - ORM数据库操作
- **Flask-JWT-Extended** - JWT认证
- **SQLite** - 数据库

### 前端
- **React 18** - 前端框架
- **Ant Design** - UI组件库
- **Styled Components** - CSS-in-JS样式
- **Axios** - HTTP客户端
- **React Router** - 路由管理

## 📁 项目结构

```
miaoyuxuan/
├── backend/                 # 后端代码
│   ├── app.py              # Flask主应用
│   ├── requirements.txt    # Python依赖
│   └── instance/           # 数据库文件目录
├── frontend/               # 前端代码
│   ├── public/            # 静态文件
│   ├── src/               # 源代码
│   │   ├── components/    # 组件
│   │   ├── pages/         # 页面
│   │   ├── contexts/      # React上下文
│   │   └── services/      # API服务
│   └── package.json       # Node.js依赖
├── docs/                  # 文档和图片
├── .gitignore            # Git忽略文件
├── install.bat           # Windows安装脚本
├── start.bat             # Windows启动脚本
└── README.md             # 项目说明
```

## 🎯 主要功能

### 核心页面
- **首页** - 品牌展示和文化理念
- **特色菜品** - 云南地方特色菜品展示
- **门店分布** - 红河州各地门店信息
- **宴席预订** - 传统宴席和抓周礼仪预约
- **最新资讯** - 品牌动态和传统文化活动
- **品牌矩阵** - 开远宴会中心、妙宇轩、喜宴宫、项巧云
- **传统文化** - 抓周礼仪、传统婚宴文化展示
- **用户系统** - 注册、登录功能

### API接口
```
POST /api/auth/register    # 用户注册
POST /api/auth/login       # 用户登录
GET  /api/stores          # 获取门店列表
GET  /api/dishes          # 获取菜品列表
GET  /api/news            # 获取新闻列表
POST /api/reservations    # 创建预订
GET  /api/reservations    # 获取用户预订
```

## 🎨 设计理念

项目采用中式传统色彩设计：
- **主色调**: `#8B0000` (深红色) - 代表传统与庄重
- **辅助色**: `#DC143C` (猩红色) - 体现热情与活力
- **强调色**: `#B8860B` (暗金色) - 象征尊贵与品质
- **装饰色**: `#FFD700` (金色) - 展现繁荣与吉祥

## 🌐 网络访问

### 局域网访问设置

1. **获取本机IP地址**
   ```bash
   ipconfig
   ```

2. **启动前端服务（允许外部访问）**
   ```bash
   cd frontend
   npm run start-lan
   ```

3. **移动设备访问**
   ```
   http://[你的电脑IP]:3000
   ```

## 🚀 部署指南

### 生产环境部署

1. **前端构建**
   ```bash
   cd frontend
   npm run build
   ```

2. **后端部署**
   - 使用Gunicorn或uWSGI部署Flask应用
   - 配置Nginx反向代理
   - 使用PostgreSQL或MySQL替换SQLite

3. **Docker部署**
   ```bash
   docker-compose up -d
   ```

## 🏮 品牌文化

### 妙宇轩品牌矩阵
- **开远宴会中心** - 高端宴席服务
- **妙宇轩** - 传统中式餐饮
- **喜宴宫** - 婚庆宴席专家
- **项巧云** - 地方特色美食

### 传统文化服务
- **抓周礼仪** - 传统抓周仪式，寓意美好未来
- **传统婚宴** - 中式婚礼宴席，传承婚庆文化
- **节庆宴席** - 春节、中秋等传统节日主题宴席
- **家和文化** - 以"家和为贵"为核心的服务理念

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

**红河妙宇投资管理有限责任公司**
- 📍 地址：云南省红河州
- 📞 电话：0873-7123888
- 📧 邮箱：contact@miyuxuan.com
- 🌐 网站：[www.miyuxuan.com](http://www.miyuxuan.com)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和设计师。

---

<div align="center">

**妙宇轩** - 传承中华饮食文化，家和为贵 🏮

[![GitHub stars](https://img.shields.io/github/stars/your-username/miaoyuxuan.svg?style=social&label=Star)](https://github.com/your-username/miaoyuxuan)
[![GitHub forks](https://img.shields.io/github/forks/your-username/miaoyuxuan.svg?style=social&label=Fork)](https://github.com/your-username/miaoyuxuan/fork)

</div> 