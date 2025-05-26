import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const { Title, Text } = Typography;

const RegisterContainer = styled.div`
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #faf8f5 0%, #f5f2ed 100%);
  padding: 40px 20px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23B8860B" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const RegisterCard = styled(Card)`
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(139, 0, 0, 0.15);
  border: 3px solid #B8860B;
  background: linear-gradient(145deg, #ffffff, #fefefe);
  position: relative;
  z-index: 1;
  
  .ant-card-body {
    padding: 50px;
  }
  
  .register-title {
    text-align: center;
    margin-bottom: 40px;
    background: linear-gradient(45deg, #8B0000, #B8860B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 28px;
  }
  
  .ant-form-item {
    margin-bottom: 25px;
  }
  
  .ant-input-affix-wrapper {
    height: 50px;
    border-radius: 12px;
    border: 2px solid #B8860B;
    
    &:hover, &:focus-within {
      border-color: #8B0000;
      box-shadow: 0 0 0 2px rgba(139, 0, 0, 0.1);
    }
    
    .ant-input {
      font-size: 16px;
      color: #8B4513;
    }
    
    .anticon {
      color: #B8860B;
      font-size: 18px;
    }
  }
  
  .register-btn {
    width: 100%;
    height: 55px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
    background: linear-gradient(135deg, #8B0000 0%, #B8860B 100%);
    border: none;
    box-shadow: 0 8px 20px rgba(139, 0, 0, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, #660000 0%, #996633 100%);
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(139, 0, 0, 0.4);
    }
  }
  
  .ant-divider {
    border-color: #B8860B;
    color: #8B4513;
    font-weight: 500;
  }
  
  .login-link {
    text-align: center;
    margin-top: 25px;
    
    .ant-typography {
      color: #8B4513;
      font-size: 15px;
    }
    
    a {
      color: #8B0000;
      font-weight: 600;
      text-decoration: none;
      
      &:hover {
        color: #B8860B;
        text-decoration: underline;
      }
    }
  }
`;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await register(values);
      if (result.success) {
        message.success('注册成功！欢迎加入妙宇轩大家庭，请登录');
        navigate('/login');
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <Title level={2} className="register-title">
          🏮 注册妙会员
        </Title>
        
        <Form
          name="register"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
              {
                min: 3,
                message: '用户名至少3个字符！',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: '请输入邮箱！',
              },
              {
                type: 'email',
                message: '请输入有效的邮箱地址！',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="请输入邮箱地址"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入有效的手机号码！',
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="请输入手机号码（可选）"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
              {
                min: 6,
                message: '密码至少6个字符！',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: '请确认密码！',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致！'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请确认密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-btn"
              loading={loading}
            >
              注册账户
            </Button>
          </Form.Item>
        </Form>
        
        <Divider>或</Divider>
        
        <div className="login-link">
          <Text>已有账号？</Text>
          <Link to="/login" style={{ marginLeft: 8 }}>
            立即登录
          </Link>
        </div>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register; 