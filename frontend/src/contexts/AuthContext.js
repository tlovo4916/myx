import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = React.memo(({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // 这里可以添加验证token的逻辑
    }
    setLoading(false);
  }, []);

  // 使用 useCallback 优化登录函数
  const login = useCallback(async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password
      });
      
      const { access_token, user } = response.data;
      localStorage.setItem('token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || '登录失败' 
      };
    }
  }, []);

  // 使用 useCallback 优化注册函数
  const register = useCallback(async (userData) => {
    try {
      await axios.post('/api/auth/register', userData);
      return { success: true, message: '注册成功' };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || '注册失败' 
      };
    }
  }, []);

  // 使用 useCallback 优化登出函数
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  }, []);

  // 使用 useMemo 优化 context value，避免不必要的重新渲染
  const value = useMemo(() => ({
    user,
    login,
    register,
    logout,
    loading
  }), [user, login, register, logout, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
});

AuthProvider.displayName = 'AuthProvider'; 