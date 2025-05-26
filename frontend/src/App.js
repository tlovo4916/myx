import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Stores from './pages/Stores';
import Reservation from './pages/Reservation';
import News from './pages/News';
import Login from './pages/Login';
import Register from './pages/Register';
import Brands from './pages/Brands';
import Culture from './pages/Culture';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
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
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App; 