import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Typography, Carousel, Space, Tag } from 'antd';
import { ArrowRightOutlined, FireOutlined, StarOutlined, ShopOutlined, HeartOutlined, CrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { newsAPI, dishAPI } from '../services/api';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const HeroSection = styled.div`
  height: 100vh;
  min-height: 700px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(139, 0, 0, 0.3)),
              url('/images/hero-bg.jpg') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  padding-top: 64px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23FFD700" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  }
  
  .hero-content {
    max-width: 1000px;
    padding: 0 30px;
    position: relative;
    z-index: 1;
    animation: fadeInUp 1s ease-out;
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .brand-subtitle {
      font-size: 1.2rem;
      color: #FFD700;
      margin-bottom: 15px;
      font-family: '华文行楷', 'STXingkai', serif;
      font-weight: 500;
      letter-spacing: 1px;
    }
    
    h1 {
      font-size: 9rem;
      margin-bottom: 40px;
      margin-top: -30px;
      color: white;
      text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.8);
      font-family: '华文行楷', 'STXingkai', serif;
      font-weight: bold;
      letter-spacing: 2px;
    }
    
    .hero-description-wrapper {
      margin-bottom: 35px;
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .hero-description {
      font-size: 1.4rem;
      margin-bottom: 18px;
      color: #FFF8DC;
      line-height: 1.8;
      font-weight: 300;
      text-align: center;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .hero-slogan {
      font-size: 1.3rem;
      color: #FFD700;
      margin-bottom: 50px;
      font-style: italic;
      font-family: '华文行楷', 'STXingkai', serif;
      font-weight: 500;
      letter-spacing: 1px;
      padding: 0 20px;
      text-align: center;
    }
    
    .hero-buttons {
      display: flex !important;
      justify-content: center !important;
      gap: 35px !important;
      flex-wrap: wrap;
      
      .ant-btn {
        height: 60px;
        padding: 0 40px;
        font-size: 18px;
        border-radius: 30px;
        font-weight: 600;
        transition: all 0.3s ease;
        margin: 0 8px !important;
        
        &.primary-btn {
          background: linear-gradient(135deg, #8B0000, #DC143C);
          border: none;
          box-shadow: 0 6px 20px rgba(139, 0, 0, 0.4);
          
          &:hover {
            background: linear-gradient(135deg, #A0522D, #FF6347);
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(139, 0, 0, 0.5);
          }
        }
        
        &.secondary-btn {
          background: transparent;
          border: 3px solid #FFD700;
          color: #FFD700;
          
          &:hover {
            background: #FFD700;
            color: #8B0000;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
          }
        }
      }
    }
    
    @media (max-width: 768px) {
      padding: 0 20px;
      
      .brand-subtitle {
        font-size: 1rem;
        margin-bottom: 15px;
      }
      
      h1 {
        font-size: 5.5rem;
        margin-bottom: 25px;
        margin-top: -20px;
      }
      
      .hero-description-wrapper {
        margin-bottom: 25px;
      }
      
      .hero-description {
        font-size: 1.1rem;
        margin-bottom: 15px;
      }
      
      .hero-slogan {
        font-size: 1rem;
        margin-bottom: 35px;
        padding: 0 15px;
      }
      
      .hero-buttons {
        gap: 25px !important;
        
        .ant-btn {
          height: 50px;
          padding: 0 30px;
          font-size: 16px;
          margin: 0 6px !important;
        }
      }
    }
    
    @media (max-width: 480px) {
      padding: 0 15px;
      
      .brand-subtitle {
        font-size: 0.9rem;
        margin-bottom: 12px;
      }
      
      h1 {
        font-size: 4.2rem;
        margin-bottom: 20px;
        margin-top: -15px;
      }
      
      .hero-description-wrapper {
        margin-bottom: 20px;
      }
      
      .hero-description {
        font-size: 1rem;
        margin-bottom: 12px;
      }
      
      .hero-slogan {
        font-size: 0.9rem;
        margin-bottom: 30px;
        padding: 0 10px;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
        gap: 18px !important;
        
        .ant-btn {
          width: 200px;
          height: 45px;
          font-size: 15px;
          margin: 8px 0 !important;
        }
      }
    }
  }
`;

const SectionContainer = styled.div`
  padding: 90px 0;
  
  &.bg-light {
    background: linear-gradient(135deg, #FFF8DC 0%, #F5F5DC 100%);
  }
  
  &.bg-dark {
    background: linear-gradient(135deg, #2F1B14 0%, #8B4513 100%);
    color: white;
    
    .section-title h2 {
      color: #FFD700;
    }
    
    .section-title p {
      color: #D2B48C;
    }
  }
  
  .section-title {
    text-align: center;
    margin-bottom: 60px;
    
    h2 {
      color: #8B0000;
      margin-bottom: 16px;
      font-family: '华文行楷', 'STXingkai', serif;
      font-size: 2.5rem;
    }
    
    p {
      color: #8B4513;
      font-size: 18px;
      line-height: 1.6;
    }
  }
`;

const DishCard = styled(Card)`
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.4s ease;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(139, 0, 0, 0.2);
    border-color: #FFD700;
  }
  
  .ant-card-cover img {
    height: 220px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover .ant-card-cover img {
    transform: scale(1.05);
  }
  
  .dish-price {
    color: #8B0000;
    font-size: 20px;
    font-weight: bold;
  }
  
  .dish-tags {
    margin-top: 10px;
  }
`;

const NewsCard = styled(Card)`
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.4s ease;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(139, 0, 0, 0.2);
    border-color: #FFD700;
  }
  
  .ant-card-cover img {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover .ant-card-cover img {
    transform: scale(1.05);
  }
  
  .news-date {
    color: #8B4513;
    font-size: 13px;
  }
`;

const FeatureCard = styled(Card)`
  text-align: center;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(139, 0, 0, 0.15);
    background: white;
  }
  
  .feature-icon {
    font-size: 60px;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #8B0000, #FFD700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const BrandSection = styled.div`
  background: linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #B8860B 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  
  .brand-grid {
    margin-top: 50px;
    
    .ant-col {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
  }
  
  .brand-item {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 25px 15px;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    height: 180px;
    width: 100%;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: #FFD700;
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    .brand-icon {
      font-size: 42px;
      margin-bottom: 12px;
      display: block;
    }
    
    .brand-name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
      color: #FFD700;
      text-align: center;
      line-height: 1.3;
    }
    
    .brand-desc {
      font-size: 13px;
      color: #D2B48C;
      text-align: center;
      line-height: 1.4;
    }
    
    @media (max-width: 768px) {
      height: 160px;
      padding: 20px 10px;
      
      .brand-icon {
        font-size: 36px;
        margin-bottom: 10px;
      }
      
      .brand-name {
        font-size: 14px;
        margin-bottom: 6px;
      }
      
      .brand-desc {
        font-size: 12px;
      }
    }
    
    @media (max-width: 480px) {
      height: 140px;
      padding: 15px 8px;
      
      .brand-icon {
        font-size: 32px;
        margin-bottom: 8px;
      }
      
      .brand-name {
        font-size: 13px;
        margin-bottom: 5px;
      }
      
      .brand-desc {
        font-size: 11px;
      }
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [featuredNews, setFeaturedNews] = useState([]);
  const [recommendedDishes, setRecommendedDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsResponse, dishesResponse] = await Promise.all([
          newsAPI.getNews(true),
          dishAPI.getDishes()
        ]);
        
        setFeaturedNews(newsResponse.data.slice(0, 3));
        setRecommendedDishes(dishesResponse.data.filter(dish => dish.is_recommended).slice(0, 6));
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* 英雄区域 */}
      <HeroSection>
        <div className="hero-content">
          <div className="hero-slogan" style={{ marginTop: '200px' }}>
            "家和为贵，传承中华饮食文化" - Family is First
          </div>
        </div>
      </HeroSection>

      {/* 品牌矩阵 */}
      <BrandSection>
        <div className="container">
          <Title level={2} style={{ color: '#FFD700', marginBottom: 20, fontFamily: '华文行楷, STXingkai, serif' }}>
            品牌矩阵
          </Title>
          <Paragraph style={{ color: '#D2B48C', fontSize: '18px' }}>
            五大品牌矩阵，多元化布局，满足不同场景的餐饮文化需求
          </Paragraph>
          
          <Row gutter={[16, 16]} className="brand-grid" justify="center" align="middle">
            <Col xs={12} sm={8} md={6} lg={4} xl={4}>
              <div className="brand-item">
                <div className="brand-icon">🏛️</div>
                <div className="brand-name">妙宇轩宴会中心</div>
                <div className="brand-desc">高端宴会定制服务</div>
              </div>
            </Col>
            <Col xs={12} sm={8} md={6} lg={4} xl={4}>
              <div className="brand-item">
                <div className="brand-icon">🏮</div>
                <div className="brand-name">妙宇轩餐厅</div>
                <div className="brand-desc">传统中式餐饮</div>
              </div>
            </Col>
            <Col xs={12} sm={8} md={6} lg={4} xl={4}>
              <div className="brand-item">
                <div className="brand-icon">💒</div>
                <div className="brand-name">喜宴宫</div>
                <div className="brand-desc">婚宴礼仪专家</div>
              </div>
            </Col>
            <Col xs={12} sm={8} md={6} lg={4} xl={4}>
              <div className="brand-item">
                <div className="brand-icon">🏛️</div>
                <div className="brand-name">传承馆</div>
                <div className="brand-desc">文化传承基地</div>
              </div>
            </Col>
            <Col xs={12} sm={8} md={6} lg={4} xl={4}>
              <div className="brand-item">
                <div className="brand-icon">👩‍🍳</div>
                <div className="brand-name">项巧云</div>
                <div className="brand-desc">地方特色美食</div>
              </div>
            </Col>
          </Row>
        </div>
      </BrandSection>

      {/* 推荐菜品 */}
      <SectionContainer>
        <div className="container">
          <div className="section-title">
            <Title level={2}>
              <FireOutlined style={{ color: '#8B0000', marginRight: 8 }} />
              招牌特色
            </Title>
            <Paragraph>精选地方特色食材，传承正宗制作工艺，呈现纯正地方风味</Paragraph>
          </div>
          
          <Row gutter={[24, 24]}>
            {recommendedDishes.map(dish => (
              <Col xs={24} sm={12} md={8} key={dish.id}>
                <DishCard
                  cover={
                    <img 
                      alt={dish.name}
                      src={dish.image_url || 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3'}
                    />
                  }
                  actions={[
                    <Button type="link" onClick={() => navigate('/menu')} style={{ color: '#8B0000' }}>
                      查看详情 <ArrowRightOutlined />
                    </Button>
                  ]}
                >
                  <Card.Meta
                    title={dish.name}
                    description={dish.description}
                  />
                  <div style={{ marginTop: 12 }}>
                    <div className="dish-price">¥{dish.price}</div>
                    <div className="dish-tags">
                      <Tag color="red">招牌</Tag>
                      <Tag color="gold">传统</Tag>
                      {dish.is_spicy && <Tag color="orange">辣</Tag>}
                    </div>
                  </div>
                </DishCard>
              </Col>
            ))}
          </Row>
          
          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/menu')}
              style={{ 
                background: 'linear-gradient(135deg, #8B0000, #DC143C)',
                border: 'none',
                borderRadius: '25px',
                padding: '0 30px',
                height: '45px'
              }}
            >
              查看全部特色菜品 <ArrowRightOutlined />
            </Button>
          </div>
        </div>
      </SectionContainer>

      {/* 服务特色 */}
      <SectionContainer className="bg-light">
        <div className="container">
          <div className="section-title">
            <Title level={2}>
              <StarOutlined style={{ color: '#8B0000', marginRight: 8 }} />
              文化传承
            </Title>
            <Paragraph>传承中华传统文化，弘扬家和理念，打造民族民俗文化餐饮品牌</Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <FeatureCard>
                <div className="feature-icon">🎋</div>
                <Card.Meta
                  title="抓周礼仪"
                  description="传承宝宝抓周传统习俗，为新生命送上美好祝福，弘扬中华家文化"
                />
              </FeatureCard>
            </Col>
            <Col xs={24} md={8}>
              <FeatureCard>
                <div className="feature-icon">💒</div>
                <Card.Meta
                  title="传统婚宴"
                  description="承袭传统婚礼礼仪，定制专属婚宴服务，见证人生重要时刻"
                />
              </FeatureCard>
            </Col>
            <Col xs={24} md={8}>
              <FeatureCard>
                <div className="feature-icon">🍜</div>
                <Card.Meta
                  title="地方特色"
                  description="一地一特色，一方一口味，保护并传承地方传统特色菜品文化"
                />
              </FeatureCard>
            </Col>
          </Row>
        </div>
      </SectionContainer>

      {/* 服务理念 */}
      <SectionContainer className="bg-dark">
        <div className="container">
          <div className="section-title">
            <Title level={2}>
              <HeartOutlined style={{ color: '#FFD700', marginRight: 8 }} />
              服务理念
            </Title>
            <Paragraph>以营养、天然、健康的膳食理念为原则，为消费者提供优质餐饮服务</Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <FeatureCard style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                <div className="feature-icon">🌱</div>
                <Card.Meta
                  title="营养健康"
                  description="严选优质食材，科学搭配营养，确保每一道菜品的健康品质"
                />
              </FeatureCard>
            </Col>
            <Col xs={24} md={8}>
              <FeatureCard style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                <div className="feature-icon">🏠</div>
                <Card.Meta
                  title="家和文化"
                  description="以'家和'为主旨，营造温馨和谐的用餐环境，传递家的温暖"
                />
              </FeatureCard>
            </Col>
            <Col xs={24} md={8}>
              <FeatureCard style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                <div className="feature-icon">🎭</div>
                <Card.Meta
                  title="民俗传承"
                  description="传承民族民俗文化，将传统文化融入现代餐饮服务体验"
                />
              </FeatureCard>
            </Col>
          </Row>
        </div>
      </SectionContainer>

      {/* 最新资讯 */}
      <SectionContainer>
        <div className="container">
          <div className="section-title">
            <Title level={2}>
              <ShopOutlined style={{ color: '#8B0000', marginRight: 8 }} />
              最新资讯
            </Title>
            <Paragraph>了解妙宇轩最新动态，掌握传统文化活动信息</Paragraph>
          </div>
          
          <Row gutter={[24, 24]}>
            {featuredNews.map(article => (
              <Col xs={24} md={8} key={article.id}>
                <NewsCard
                  cover={
                    <img 
                      alt={article.title}
                      src={article.image_url || 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3'}
                    />
                  }
                  actions={[
                    <Button type="link" onClick={() => navigate('/news')} style={{ color: '#8B0000' }}>
                      阅读更多 <ArrowRightOutlined />
                    </Button>
                  ]}
                >
                  <Card.Meta
                    title={article.title}
                    description={article.summary}
                  />
                  <div className="news-date" style={{ marginTop: 8 }}>
                    {article.published_at}
                  </div>
                </NewsCard>
              </Col>
            ))}
          </Row>
          
          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/news')}
              style={{ 
                background: 'linear-gradient(135deg, #8B0000, #DC143C)',
                border: 'none',
                borderRadius: '25px',
                padding: '0 30px',
                height: '45px'
              }}
            >
              查看全部资讯 <ArrowRightOutlined />
            </Button>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Home; 