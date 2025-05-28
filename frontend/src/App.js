import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import './styles/antd-theme.css';

// 使用 React.lazy 进行代码分割，按需加载页面组件
const Home = React.lazy(() => import('./pages/Home'));
const Menu = React.lazy(() => import('./pages/Menu'));
const Stores = React.lazy(() => import('./pages/Stores'));
const Reservation = React.lazy(() => import('./pages/Reservation'));
const News = React.lazy(() => import('./pages/News'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Brands = React.lazy(() => import('./pages/Brands'));
const Culture = React.lazy(() => import('./pages/Culture'));

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Suspense fallback={<LoadingSpinner text="页面加载中..." />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/stores" element={<Stores />} />
                  <Route path="/reservation" element={<Reservation />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/brands" element={<Brands />} />
                  <Route path="/culture" element={<Culture />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App; 