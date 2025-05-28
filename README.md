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
- ⚡ **性能优化** - React.memo、懒加载、代码分割等多重优化
- 🔐 **用户认证** - 完整的用户注册、登录系统
- 📱 **响应式布局** - 适配各种设备屏幕
- 🍽️ **宴席预订** - 支持传统宴席和抓周礼仪预约
- 📰 **文化资讯** - 传统文化和品牌动态展示
- 🏪 **门店分布** - 云南红河州各地门店信息
- 🎭 **传统文化** - 抓周礼仪、传统婚宴等文化服务
- 📊 **性能监控** - 实时性能数据和Core Web Vitals监控

## 🚀 快速开始

### 环境要求

- Python 3.8+
- Node.js 14+
- npm 或 yarn

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/tlovo4916/myx.git
   cd myx
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

### 生产部署

推荐使用Docker或宝塔面板部署，详见 [部署指南](deploy.md)

## 🏗️ 技术栈

### 后端
- **Python 3.8+** - 编程语言
- **Flask 2.3.3** - Web框架
- **SQLAlchemy** - ORM数据库操作
- **Flask-JWT-Extended 4.5.3** - JWT认证
- **Flask-CORS 4.0.0** - 跨域支持
- **SQLite** - 数据库

### 前端
- **React 18.2.0** - 前端框架
- **React Router DOM 6.8.1** - 路由管理
- **Ant Design 5.3.0** - UI组件库
- **Styled Components 5.3.9** - CSS-in-JS样式
- **Axios 1.3.4** - HTTP客户端
- **Day.js 1.11.7** - 日期处理库

### 性能优化
- **React.memo** - 组件渲染优化
- **useMemo & useCallback** - 缓存优化
- **React.lazy & Suspense** - 代码分割
- **Intersection Observer** - 图片懒加载
- **Performance API** - 性能监控

## 📁 项目结构

```
myx/
├── backend/                    # 后端代码
│   ├── app.py                 # Flask主应用
│   ├── requirements.txt       # Python依赖
│   └── instance/              # 数据库文件目录
├── frontend/                  # 前端代码
│   ├── public/               # 静态文件
│   ├── src/                  # 源代码
│   │   ├── components/       # 组件
│   │   │   ├── Header.js     # 导航头部 (已优化)
│   │   │   ├── Footer.js     # 页脚组件 (已优化)
│   │   │   ├── LazyImage.js  # 图片懒加载组件
│   │   │   └── LoadingSpinner.js # 加载状态组件
│   │   ├── pages/            # 页面
│   │   │   └── Menu.js       # 菜品页面 (已优化)
│   │   ├── contexts/         # React上下文
│   │   │   └── AuthContext.js # 认证上下文 (已优化)
│   │   ├── services/         # API服务
│   │   ├── styles/           # 样式文件
│   │   │   └── antd-theme.css # Ant Design主题
│   │   └── utils/            # 工具函数
│   │       └── performance.js # 性能监控工具
│   └── package.json          # Node.js依赖
├── docker-compose.yml        # Docker编排文件
├── Dockerfile.backend        # 后端Docker配置
├── Dockerfile.frontend       # 前端Docker配置
├── nginx.conf               # Nginx配置文件
├── .gitignore               # Git忽略文件
├── deploy.md                # 部署指南
├── Update Notes.md          # 更新日志
├── LICENSE                  # 开源许可证
└── README.md                # 项目说明
```

## 🎯 主要功能

### 核心页面
- **首页** - 品牌展示和文化理念
- **特色菜品** - 云南地方特色菜品展示（支持懒加载）
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

### 性能特性
- **组件级优化** - React.memo包装关键组件
- **智能缓存** - useMemo和useCallback优化渲染
- **图片懒加载** - Intersection Observer API实现
- **代码分割** - 页面级别按需加载
- **性能监控** - 实时监控Core Web Vitals
- **加载状态** - 统一的加载动画和错误处理

## 🎨 设计理念

项目采用中式传统色彩设计：
- **主色调**: `#8B0000` (深红色) - 代表传统与庄重
- **辅助色**: `#DC143C` (猩红色) - 体现热情与活力
- **强调色**: `#B8860B` (暗金色) - 象征尊贵与品质
- **装饰色**: `#FFD700` (金色) - 展现繁荣与吉祥

## ⚡ 性能优化

### 已实现的优化
- **React性能优化** - 减少不必要的重新渲染
- **图片懒加载** - 减少初始加载时间30-50%
- **代码分割** - 首屏加载时间减少40-60%
- **内存优化** - 缓存策略减少内存使用20-30%
- **交互优化** - 响应速度提升30-50%

### 性能监控
```javascript
// 自动性能监控
import { performanceMonitor } from './utils/performance';

// 监控页面加载
performanceMonitor.measurePageLoad();

// 监控API调用
performanceMonitor.measureApiCall('getDishes', apiFunction);
```

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

2. **打包分析**
   ```bash
   npm run build:analyze
   ```

3. **后端部署**
   - 使用Gunicorn或uWSGI部署Flask应用
   - 配置Nginx反向代理
   - 使用PostgreSQL或MySQL替换SQLite

4. **Docker部署**
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

## 📊 数据模型

### 核心实体
- **User** - 用户信息管理
- **Store** - 门店信息管理
- **Dish** - 菜品信息管理
- **Reservation** - 预订信息管理
- **News** - 资讯信息管理

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 开发规范
- 遵循React Hooks最佳实践
- 使用React.memo优化组件性能
- 添加适当的错误处理
- 编写清晰的注释和文档

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

**红河妙宇投资管理有限责任公司**
- 📍 地址：云南省红河州蒙自市
- 📞 电话：13988010682
- 📧 邮箱：service@myx111.xyz
- 🌐 网站：[www.myx111.xyz](http://www.myx111.xyz)


<div align="center">

**妙宇轩** - 传承中华饮食文化，家和为贵 🏮

[![GitHub stars](https://img.shields.io/github/stars/tlovo4916/myx.svg?style=social&label=Star)](https://github.com/tlovo4916/myx)
[![GitHub forks](https://img.shields.io/github/forks/tlovo4916/myx.svg?style=social&label=Fork)](https://github.com/tlovo4916/myx/fork)

</div> 