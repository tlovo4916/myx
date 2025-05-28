import React, { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const { Header: AntHeader } = Layout;

const StyledHeader = styled(AntHeader)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #B8860B 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 64px;
  
  .ant-menu {
    background: transparent;
    border-bottom: none;
    line-height: 64px;
    flex: 1;
    margin: 0 20px;
    
    .ant-menu-item {
      color: white;
      font-weight: 500;
      font-size: 16px;
      
      &:hover {
        color: #FFD700;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 6px;
      }
      
      &.ant-menu-item-selected {
        color: #FFD700;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 6px;
      }
    }
  }
  
  @media (max-width: 768px) {
    padding: 0 15px;
    
    .ant-menu {
      margin: 0 10px;
      
      .ant-menu-item {
        font-size: 14px;
        padding: 0 8px;
      }
    }
  }
`;

const Logo = styled.div`
  color: white;
  font-size: 28px;
  font-weight: bold;
  line-height: 64px;
  margin-right: 30px;
  font-family: '华文行楷', 'STXingkai', serif;
  flex-shrink: 0;
  
  a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    
    &:hover {
      color: #FFD700;
    }
  }
  
  .brand-icon {
    font-size: 32px;
    margin-right: 8px;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 64px;
  
  .ant-btn {
    margin-left: 8px;
    border-radius: 20px;
    font-weight: 500;
    height: 36px;
    
    &.login-btn {
      background: transparent;
      border: 2px solid white;
      color: white;
      
      &:hover {
        background: white;
        color: #8B0000;
        transform: translateY(-1px);
      }
    }
    
    &.register-btn {
      background: #FFD700;
      border: 2px solid #FFD700;
      color: #8B0000;
      font-weight: 600;
      
      &:hover {
        background: #FFF8DC;
        border-color: #FFF8DC;
        transform: translateY(-1px);
      }
    }
  }
  
  @media (max-width: 768px) {
    .ant-btn {
      margin-left: 4px;
      padding: 0 12px;
      font-size: 14px;
      height: 32px;
    }
  }
  
  @media (max-width: 480px) {
    .ant-btn {
      margin-left: 2px;
      padding: 0 8px;
      font-size: 12px;
      height: 28px;
    }
  }
`;

const Header = React.memo(() => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState('home');

  // 使用 useMemo 优化菜单项，避免每次渲染都重新创建
  const menuItems = useMemo(() => [
    {
      key: 'home',
      label: <Link to="/">首页</Link>,
    },
    {
      key: 'menu',
      label: <Link to="/menu">特色菜品</Link>,
    },
    {
      key: 'stores',
      label: <Link to="/stores">门店分布</Link>,
    },
    {
      key: 'reservation',
      label: <Link to="/reservation">宴席预订</Link>,
    },
    {
      key: 'brands',
      label: <Link to="/brands">品牌矩阵</Link>,
    },
    {
      key: 'culture',
      label: <Link to="/culture">传统文化</Link>,
    },
    {
      key: 'news',
      label: <Link to="/news">最新资讯</Link>,
    },
  ], []);

  // 使用 useCallback 优化事件处理函数
  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const handleLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleRegister = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  const handleMenuClick = useCallback((e) => {
    setCurrent(e.key);
  }, []);

  // 使用 useMemo 优化用户菜单项
  const userMenuItems = useMemo(() => [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ], [handleLogout]);

  return (
    <StyledHeader>
      <Logo>
        <Link to="/">
          <span className="brand-icon">🏮</span>
          妙宇轩
        </Link>
      </Logo>
      
      <Menu
        mode="horizontal"
        selectedKeys={[current]}
        items={menuItems}
        style={{ flex: 1, minWidth: 0, border: 'none' }}
        onClick={handleMenuClick}
      />
      
      <UserSection>
        {user ? (
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button type="text" style={{ color: 'white' }}>
              <Avatar size="small" icon={<UserOutlined />} />
              <span style={{ marginLeft: 8 }}>{user.username}</span>
            </Button>
          </Dropdown>
        ) : (
          <>
            <Button 
              className="login-btn"
              onClick={handleLogin}
            >
              登录
            </Button>
            <Button 
              className="register-btn"
              onClick={handleRegister}
            >
              注册
            </Button>
          </>
        )}
      </UserSection>
    </StyledHeader>
  );
});

Header.displayName = 'Header';

export default Header; 