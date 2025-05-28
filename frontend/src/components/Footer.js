import React, { useMemo } from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Footer: AntFooter } = Layout;
const { Title } = Typography;

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

const Footer = React.memo(() => {
  // 使用 useMemo 优化静态数据，避免每次渲染都重新创建
  const aboutLinks = useMemo(() => [
    { href: "/about#brand-story", text: "品牌故事" },
    { href: "/about#corporate-culture", text: "企业文化" },
    { href: "/about#development-history", text: "发展历程" },
    { href: "/about#social-responsibility", text: "社会责任" },
    { href: "/about#recruitment", text: "招贤纳士" }
  ], []);

  const brandItems = useMemo(() => [
    { href: "#", text: "妙宇轩宴会中心" },
    { href: "#", text: "妙宇轩餐厅" },
    { href: "#", text: "喜宴宫" },
    { href: "#", text: "传承馆" },
    { href: "#", text: "项巧云" }
  ], []);

  const cultureLinks = useMemo(() => [
    { href: "#", text: "抓周礼仪" },
    { href: "#", text: "传统婚宴" },
    { href: "#", text: "地方特色" },
    { href: "#", text: "家和文化" },
    { href: "#", text: "民俗起源" }
  ], []);

  const contactInfo = useMemo(() => [
    { href: "tel:0873-3130377", text: "📞 0873-3130377" },
    { href: "mailto:service@myx111.xyz", text: "✉️ service@myx111.xyz" },
    { href: "http://www.myx111.xyz", text: "🌐 www.myx111.xyz" },
    { href: "#", text: "📍 云南省红河州" }
  ], []);

  return (
    <StyledFooter>
      <div className="container">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <div className="footer-section">
              <Title level={4}>关于妙宇轩</Title>
              {aboutLinks.map((link, index) => (
                <Link key={index} to={link.href} className="footer-link">
                  {link.text}
                </Link>
              ))}
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <div className="footer-section">
              <Title level={4}>品牌矩阵</Title>
              {brandItems.map((item, index) => (
                <a key={index} href={item.href} className="footer-link">
                  {item.text}
                </a>
              ))}
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <div className="footer-section">
              <Title level={4}>传统文化</Title>
              {cultureLinks.map((link, index) => (
                <a key={index} href={link.href} className="footer-link">
                  {link.text}
                </a>
              ))}
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <div className="footer-section">
              <Title level={4}>联系我们</Title>
              {contactInfo.map((contact, index) => (
                <a key={index} href={contact.href} className="footer-link">
                  {contact.text}
                </a>
              ))}
            </div>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <div className="company-info">
            <span>红河妙宇投资管理有限责任公司</span>
          </div>
          <span>© 2025 妙宇轩餐饮连锁集团. 保留所有权利. | 滇ICP备12345678号</span>
          <br />
          <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
            "家和为贵，传承中华饮食文化" - Family is First
          </span>
        </div>
      </div>
    </StyledFooter>
  );
});

Footer.displayName = 'Footer';

export default Footer; 