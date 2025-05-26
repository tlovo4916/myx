import React from 'react';
import { Row, Col, Card, Typography, Button, Space, Tag } from 'antd';
import { ArrowRightOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const PageContainer = styled.div`
  padding-top: 64px;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #B8860B 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    font-family: '华文行楷', 'STXingkai', serif;
  }
  
  p {
    font-size: 1.2rem;
    color: #D2B48C;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const BrandCard = styled(Card)`
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  border: 3px solid transparent;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(139, 0, 0, 0.3);
    border-color: #FFD700;
  }
  
  .brand-header {
    background: linear-gradient(135deg, #8B0000, #DC143C);
    color: white;
    padding: 30px 20px;
    text-align: center;
    
    .brand-icon {
      font-size: 80px;
      margin-bottom: 15px;
      display: block;
    }
    
    .brand-name {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
      font-family: '华文行楷', 'STXingkai', serif;
    }
    
    .brand-subtitle {
      font-size: 16px;
      color: #FFD700;
    }
  }
  
  .brand-content {
    padding: 30px 20px;
    
    .feature-list {
      margin: 20px 0;
      
      .feature-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        
        .feature-icon {
          color: #8B0000;
          margin-right: 10px;
          font-size: 16px;
        }
      }
    }
    
    .contact-info {
      background: #FFF8DC;
      padding: 15px;
      border-radius: 10px;
      margin-top: 20px;
      
      .contact-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        
        .anticon {
          color: #8B0000;
          margin-right: 8px;
        }
      }
    }
  }
`;

const SectionContainer = styled.div`
  padding: 80px 0;
  
  .section-title {
    text-align: center;
    margin-bottom: 60px;
    
    h2 {
      color: #8B0000;
      font-family: '华文行楷', 'STXingkai', serif;
      font-size: 2.5rem;
      margin-bottom: 16px;
    }
    
    p {
      color: #8B4513;
      font-size: 18px;
    }
  }
`;

const Brands = () => {
  const navigate = useNavigate();

  const brands = [
    {
      id: 1,
      name: '妙宇轩宴会中心',
      subtitle: '高端宴会定制服务',
      icon: '🏛️',
      description: '专注于高端宴会服务，提供一站式宴会解决方案，承办各类商务宴请、庆典活动、会议餐饮等高端服务。',
      features: [
        '豪华宴会厅设计',
        '专业宴会策划团队',
        '高端食材定制菜品',
        '一对一管家服务',
        '完善的音响设备'
      ],
      location: '云南省开远市灵泉西路方圆荟·杰特开远4楼',
      phone: '18608805188',
      capacity: '可容纳500人同时用餐'
    },
    {
      id: 2,
      name: '妙宇轩餐厅',
      subtitle: '传统中式餐饮',
      icon: '🏮',
      description: '传承中华饮食文化精髓，以地方特色菜品为主打，坚持传统制作工艺，为顾客提供正宗的中式餐饮体验。',
      features: [
        '传统中式装修风格',
        '地方特色菜品',
        '传统制作工艺',
        '文化主题包间',
        '茶艺表演服务'
      ],
      location: '云南省红河州各地连锁',
      phone: '18608805188',
      capacity: '多种规格包间可选'
    },
    {
      id: 3,
      name: '喜宴宫',
      subtitle: '婚宴礼仪专家',
      icon: '💒',
      description: '专业婚宴服务品牌，传承传统婚礼礼仪文化，为新人打造难忘的婚礼盛宴，见证人生最重要的时刻。',
      features: [
        '传统婚礼礼仪策划',
        '浪漫婚宴场地布置',
        '专业婚礼主持团队',
        '定制婚宴菜单',
        '婚礼摄影摄像'
      ],
      location: '云南省红河州个旧市金湖西路23号豪林新界二幢',
      phone: '13988010682',
      capacity: '婚宴专用厅可容纳300人'
    },
    {
      id: 4,
      name: '传承馆',
      subtitle: '文化传承基地',
      icon: '🏛️',
      description: '专注于中华传统文化的传承与弘扬，集文化展示、体验、教育于一体，是传统文化爱好者的精神家园。',
      features: [
        '传统文化展示',
        '非遗技艺体验',
        '文化教育培训',
        '传统礼仪服务',
        '文化主题活动'
      ],
      location: '云南省红河哈尼族彝族自治州建水县迎晖路260号',
      phone: '13988010682',
      capacity: '文化体验馆及展示厅'
    },
    {
      id: 5,
      name: '项巧云',
      subtitle: '地方特色美食',
      icon: '👩‍🍳',
      description: '以项巧云大师的名字命名，专注于挖掘和传承地方特色美食，保护传统烹饪技艺，传播地方饮食文化。',
      features: [
        '非遗传承烹饪技艺',
        '地方特色小吃',
        '传统手工制作',
        '文化故事讲解',
        '烹饪技艺展示'
      ],
      location: '云南省红河州建水县',
      phone: '13988010682',
      capacity: '特色小食体验馆'
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <div className="container">
          <Title level={1}>品牌矩阵</Title>
          <Paragraph>
            妙宇轩餐饮连锁集团旗下五大品牌，各具特色，满足不同场景的餐饮文化需求
          </Paragraph>
        </div>
      </HeroSection>

      <SectionContainer>
        <div className="container">
          <div className="section-title">
            <Title level={2}>五大子品牌</Title>
            <Paragraph>
              从高端宴会到传统中餐，从婚礼庆典到文化传承，从地方美食到文化体验，全方位覆盖餐饮文化服务领域
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {brands.map(brand => (
              <Col xs={24} lg={12} key={brand.id}>
                <BrandCard>
                  <div className="brand-header">
                    <span className="brand-icon">{brand.icon}</span>
                    <div className="brand-name">{brand.name}</div>
                    <div className="brand-subtitle">{brand.subtitle}</div>
                  </div>
                  
                  <div className="brand-content">
                    <Paragraph>{brand.description}</Paragraph>
                    
                    <div className="feature-list">
                      <Title level={5} style={{ color: '#8B0000', marginBottom: 15 }}>
                        服务特色
                      </Title>
                      {brand.features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          <span className="feature-icon">✨</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="contact-info">
                      <div className="contact-item">
                        <EnvironmentOutlined />
                        <span>{brand.location}</span>
                      </div>
                      <div className="contact-item">
                        <PhoneOutlined />
                        <span>{brand.phone}</span>
                      </div>
                      <div className="contact-item">
                        <span style={{ color: '#8B0000', marginRight: 8 }}>📍</span>
                        <span>{brand.capacity}</span>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'center', marginTop: 25 }}>
                      <Button 
                        type="primary"
                        size="large"
                        onClick={() => navigate('/reservation')}
                        style={{
                          background: 'linear-gradient(135deg, #8B0000, #DC143C)',
                          border: 'none',
                          borderRadius: '20px',
                          padding: '0 25px'
                        }}
                      >
                        立即预订 <ArrowRightOutlined />
                      </Button>
                    </div>
                  </div>
                </BrandCard>
              </Col>
            ))}
          </Row>
        </div>
      </SectionContainer>
    </PageContainer>
  );
};

export default Brands; 