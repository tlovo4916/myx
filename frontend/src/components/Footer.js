import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, GlobalOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const StyledFooter = styled(AntFooter)`
  background: linear-gradient(135deg, #2F1B14 0%, #8B4513 50%, #654321 100%);
  color: white;
  padding: 50px 20px 20px;
  
  .footer-section {
    margin-bottom: 20px;
    
    .ant-typography {
      color: white;
    }
    
    h4 {
      color: #FFD700;
      margin-bottom: 16px;
      font-family: '华文行楷', 'STXingkai', serif;
      font-size: 18px;
    }
    
    .footer-link {
      color: #D2B48C;
      text-decoration: none;
      display: block;
      margin-bottom: 8px;
      transition: all 0.3s;
      padding: 4px 0;
      
      &:hover {
        color: #FFD700;
        transform: translateX(5px);
      }
    }
    
    .brand-item {
      background: rgba(255, 215, 0, 0.1);
      padding: 8px 12px;
      margin: 4px 0;
      border-radius: 6px;
      border-left: 3px solid #FFD700;
    }
  }
  
  .footer-bottom {
    border-top: 2px solid #8B4513;
    padding-top: 20px;
    margin-top: 30px;
    text-align: center;
    color: #D2B48C;
    
    .company-info {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="container">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <div className="footer-section">
              <Title level={4}>关于妙宇轩</Title>
              <a href="#" className="footer-link">品牌故事</a>
              <a href="#" className="footer-link">企业文化</a>
              <a href="#" className="footer-link">发展历程</a>
              <a href="#" className="footer-link">社会责任</a>
              <a href="#" className="footer-link">传统文化传承</a>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <div className="footer-section">
              <Title level={4}>品牌矩阵</Title>
              <div className="brand-item">
                <a href="#" className="footer-link">🏛️ 妙宇轩宴会中心</a>
              </div>
              <div className="brand-item">
                <a href="#" className="footer-link">🏮 妙宇轩餐厅</a>
              </div>
              <div className="brand-item">
                <a href="#" className="footer-link">💒 喜宴宫</a>
              </div>
              <div className="brand-item">
                <a href="#" className="footer-link">🏛️ 传承馆</a>
              </div>
              <div className="brand-item">
                <a href="#" className="footer-link">👩‍🍳 项巧云</a>
              </div>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <div className="footer-section">
              <Title level={4}>传统文化</Title>
              <a href="#" className="footer-link">抓周礼仪</a>
              <a href="#" className="footer-link">传统婚宴</a>
              <a href="#" className="footer-link">地方特色菜品</a>
              <a href="#" className="footer-link">家和文化</a>
              <a href="#" className="footer-link">民俗文化</a>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <div className="footer-section">
              <Title level={4}>联系我们</Title>
              <Space direction="vertical" size="small">
                <Text>
                  <PhoneOutlined /> 400-6666-8888
                </Text>
                <Text>
                  <MailOutlined /> service@miaoyuxuan.com
                </Text>
                <Text>
                  <EnvironmentOutlined /> 云南省红河州
                </Text>
                <Text>
                  <GlobalOutlined /> www.miaoyuxuan.com
                </Text>
              </Space>
            </div>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <div className="company-info">
            <Text>红河妙宇投资管理有限责任公司</Text>
          </div>
          <Text>© 2024 妙宇轩餐饮连锁集团. 保留所有权利. | 滇ICP备12345678号</Text>
          <br />
          <Text style={{ fontSize: '14px', fontStyle: 'italic' }}>
            "家和为贵，传承中华饮食文化" - Family is First
          </Text>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer; 