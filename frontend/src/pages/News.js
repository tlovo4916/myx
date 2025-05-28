import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Spin, Tag, Space, Button } from 'antd';
import { 
  ReadOutlined, 
  CalendarOutlined, 
  UserOutlined, 
  FireOutlined,
  HeartOutlined,
  GiftOutlined,
  CrownOutlined,
  StarOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { newsAPI } from '../services/api';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;

const PageContainer = styled.div`
  min-height: 100vh;
  padding-top: 64px;
  margin-top: -64px;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #B8860B 100%);
  color: white;
  padding: 100px 0;
  text-align: center;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 60px;
    font-family: '华文行楷', 'STXingkai', serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  p {
    font-size: 1.3rem;
    color: #D2B48C;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const SectionContainer = styled.div`
  padding: 80px 0;
  
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
      font-family: '华文行楷', 'STXingkai', serif;
      font-size: 2.5rem;
      margin-bottom: 16px;
    }
    
    p {
      color: #8B4513;
      font-size: 18px;
      line-height: 1.6;
    }
  }
`;

const FeaturedNewsCard = styled(Card)`
  margin-bottom: 50px;
  border-radius: 20px;
  overflow: hidden;
  border: 3px solid #B8860B;
  background: linear-gradient(145deg, #ffffff, #fefefe);
  box-shadow: 0 25px 50px rgba(139, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(139, 0, 0, 0.2);
  }
  
  .ant-card-cover img {
    height: 350px;
    object-fit: cover;
  }
  
  .featured-content {
    padding: 30px 0;
    
    h2 {
      margin-bottom: 16px;
      color: #8B0000;
      font-size: 24px;
      line-height: 1.3;
      font-family: '华文行楷', 'STXingkai', serif;
    }
    
    .featured-summary {
      font-size: 17px;
      color: #654321;
      line-height: 1.7;
      margin-bottom: 20px;
    }
    
    .news-meta {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 2px solid #B8860B;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #8B4513;
      font-size: 14px;
      
      .news-author, .news-date {
        display: flex;
        align-items: center;
        
        .anticon {
          margin-right: 8px;
          color: #B8860B;
          font-size: 16px;
        }
      }
    }
    
    .featured-tags {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
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
  
  .ant-card-cover {
    position: relative;
    overflow: hidden;
    
    img {
      height: 200px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
    
    .news-category {
      position: absolute;
      top: 15px;
      left: 15px;
      background: rgba(139, 0, 0, 0.9);
      color: #FFD700;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 12px;
      font-weight: bold;
    }
  }
  
  .ant-card-meta-title {
    color: #8B0000 !important;
    font-weight: bold !important;
    font-size: 16px !important;
    line-height: 1.4 !important;
    margin-bottom: 12px !important;
  }
  
  .ant-card-meta-description {
    color: #654321 !important;
    line-height: 1.6 !important;
    font-size: 14px;
  }
  
  .news-meta {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .news-author, .news-date {
      display: flex;
      align-items: center;
      color: #8B4513;
      font-size: 12px;
      
      .anticon {
        margin-right: 6px;
        color: #B8860B;
      }
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: rgba(255,255,255,0.9);
  border-radius: 20px;
  border: 2px dashed #B8860B;
  margin: 40px 0;
  
  .empty-icon {
    font-size: 80px;
    color: #B8860B;
    margin-bottom: 20px;
  }
  
  .empty-title {
    color: #8B0000 !important;
    font-size: 20px !important;
    margin-bottom: 12px !important;
    font-family: '华文行楷', 'STXingkai', serif !important;
  }
  
  .empty-desc {
    color: #8B4513 !important;
    font-size: 16px;
  }
`;

const News = () => {
  const [news, setNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(false);

  // 模拟新闻数据，包含用户提供的两则资讯
  const mockNews = [
    {
      id: 1,
      title: '温情五月，母亲节将至"食"力宠妈',
      summary: '当然要从一顿丰盛的美食盛宴开始，妙宇轩推出限定美味套餐，让爱在一餐一食中升温',
      content: '温情五月，母亲节将至"食"力宠妈当然要从一顿丰盛的美食盛宴开始妙宇轩推出限定美味套餐让爱在一餐一食中升温',
      author: '妙宇轩',
      published_at: '2025年5月7日',
      image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3',
      is_featured: true,
      category: '节日活动',
      tags: ['母亲节', '限定套餐', '家庭聚餐']
    },
    {
      id: 2,
      title: '劳动中吃苦，美食里找甜',
      summary: '劳动最光荣，干饭享钜惠！妙宇轩推出低至8折美食特惠！势不可挡的五一狂欢盛宴火！爆！来！袭！燃烧你我干饭魂！',
      content: '劳动中吃苦，美食里找甜劳动最光荣，干饭享钜惠!妙宇轩推出低至8折美食特惠！势不可挡的五一狂欢盛宴火！爆！来！袭！燃烧你我干饭魂！',
      author: '妙宇轩',
      published_at: '2025年5月1日',
      image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3',
      is_featured: false,
      category: '优惠活动',
      tags: ['五一', '8折优惠', '狂欢盛宴']
    },
    {
      id: 3,
      title: '传承中华饮食文化，弘扬家和理念',
      summary: '妙宇轩始终坚持传承中华优秀传统文化，将"家和万事兴"的理念融入每一道菜品，每一次服务中',
      content: '传承中华饮食文化，弘扬家和理念，妙宇轩始终坚持传承中华优秀传统文化，将"家和万事兴"的理念融入每一道菜品，每一次服务中',
      author: '妙宇轩',
      published_at: '2025年4月28日',
      image_url: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3',
      is_featured: false,
      category: '品牌文化',
      tags: ['传统文化', '家和理念', '品牌故事']
    },
    {
      id: 4,
      title: '妙宇轩宴会中心盛大开业',
      summary: '位于开远市杰特广场的妙宇轩宴会中心正式开业，为您提供高端宴会定制服务，打造难忘的宴会体验',
      content: '妙宇轩宴会中心盛大开业，位于开远市杰特广场的妙宇轩宴会中心正式开业，为您提供高端宴会定制服务，打造难忘的宴会体验',
      author: '妙宇轩',
      published_at: '2025年4月25日',
      image_url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3',
      is_featured: false,
      category: '门店动态',
      tags: ['新店开业', '宴会中心', '高端定制']
    }
  ];

  useEffect(() => {
    // 模拟加载数据
    setLoading(true);
    setTimeout(() => {
      setNews(mockNews);
      setFeaturedNews(mockNews.filter(item => item.is_featured));
      setLoading(false);
    }, 1000);
  }, []);

  const handleNewsClick = (newsId) => {
    console.log('查看新闻详情:', newsId);
  };

  return (
    <PageContainer>
      <HeroSection>
        <div className="container">
          <Title level={1}>
            <ReadOutlined style={{ marginRight: 16 }} />
            妙宇轩最新资讯
          </Title>
          <Paragraph>
            传承中华饮食文化，关注品牌动态<br/>
            了解妙宇轩最新活动和美食资讯，感受传统文化的魅力
          </Paragraph>
        </div>
      </HeroSection>

      <Spin spinning={loading}>
        {/* 特色资讯 */}
        {featuredNews.length > 0 && (
          <SectionContainer>
            <div className="container">
              <div className="section-title">
                <Title level={2}>
                  <FireOutlined style={{ color: '#8B0000', marginRight: 12 }} />
                  重点资讯
                </Title>
                <Paragraph>
                  妙宇轩最新动态和特色活动，不容错过的精彩内容
                </Paragraph>
              </div>
              
              {featuredNews.map(article => (
                <FeaturedNewsCard
                  key={article.id}
                  cover={
                    <img 
                      alt={article.title}
                      src={article.image_url}
                    />
                  }
                  onClick={() => handleNewsClick(article.id)}
                >
                  <div className="featured-content">
                    <Title level={2}>{article.title}</Title>
                    <Paragraph className="featured-summary">
                      {article.summary}
                    </Paragraph>
                    <div className="news-meta">
                      <div className="news-author">
                        <UserOutlined />
                        <Text strong>{article.author}</Text>
                      </div>
                      <div className="news-date">
                        <CalendarOutlined />
                        <Text>{article.published_at}</Text>
                      </div>
                    </div>
                    <div className="featured-tags">
                      {article.tags.map((tag, index) => (
                        <Tag key={index} color="#8B0000" style={{ fontSize: '14px', padding: '5px 15px' }}>
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </FeaturedNewsCard>
              ))}
            </div>
          </SectionContainer>
        )}

        {/* 全部资讯 */}
        <SectionContainer className="bg-light">
          <div className="container">
            <div className="section-title">
              <Title level={2}>
                <ReadOutlined style={{ color: '#8B0000', marginRight: 12 }} />
                全部资讯
              </Title>
              <Paragraph>
                了解妙宇轩品牌动态，感受传统文化与现代餐饮的完美融合
              </Paragraph>
            </div>
            
            <Row gutter={[24, 24]} align="stretch">
              {news.map(article => (
                <Col xs={24} sm={12} lg={6} key={article.id}>
                  <NewsCard onClick={() => handleNewsClick(article.id)}>
                    <div className="ant-card-cover">
                      <img 
                        alt={article.title}
                        src={article.image_url}
                      />
                      <div className="news-category">{article.category}</div>
                    </div>
                    <Card.Meta
                      title={article.title}
                      description={article.summary}
                    />
                    <div className="news-meta">
                      <div className="news-author">
                        <UserOutlined />
                        <Text>{article.author}</Text>
                      </div>
                      <div className="news-date">
                        <ClockCircleOutlined />
                        <Text>{article.published_at}</Text>
                      </div>
                    </div>
                  </NewsCard>
                </Col>
              ))}
            </Row>
          </div>
        </SectionContainer>

        {/* 文化传承理念 */}
        <SectionContainer className="bg-dark">
          <div className="container">
            <div className="section-title">
              <Title level={2}>
                <StarOutlined style={{ color: '#FFD700', marginRight: 12 }} />
                文化传承
              </Title>
              <Paragraph>
                以"家和"为核心，传承中华优秀传统文化，打造具有文化内涵的餐饮品牌
              </Paragraph>
            </div>
            
            <Row gutter={[32, 32]}>
              <Col xs={24} md={8}>
                <Card
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    height: '100%',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ padding: '30px 20px' }}>
                    <div style={{ fontSize: '60px', marginBottom: '20px' }}>🏠</div>
                    <Title level={4} style={{ color: '#FFD700', marginBottom: '15px' }}>
                      家和为贵
                    </Title>
                    <Paragraph style={{ color: '#D2B48C', fontSize: '14px', lineHeight: '1.6' }}>
                      以"家和"为核心理念，营造温馨和谐的用餐环境，让每一位顾客都能感受到家的温暖
                    </Paragraph>
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} md={8}>
                <Card
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    height: '100%',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ padding: '30px 20px' }}>
                    <div style={{ fontSize: '60px', marginBottom: '20px' }}>🌱</div>
                    <Title level={4} style={{ color: '#FFD700', marginBottom: '15px' }}>
                      传承创新
                    </Title>
                    <Paragraph style={{ color: '#D2B48C', fontSize: '14px', lineHeight: '1.6' }}>
                      在传承传统文化的基础上，融入现代元素，让传统文化在新时代焕发新的活力
                    </Paragraph>
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} md={8}>
                <Card
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    height: '100%',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ padding: '30px 20px' }}>
                    <div style={{ fontSize: '60px', marginBottom: '20px' }}>🤝</div>
                    <Title level={4} style={{ color: '#FFD700', marginBottom: '15px' }}>
                      诚信服务
                    </Title>
                    <Paragraph style={{ color: '#D2B48C', fontSize: '14px', lineHeight: '1.6' }}>
                      以诚待客，用心服务，建立与顾客之间的信任关系，提供超越期待的服务体验
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            </Row>
            
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <Title level={3} style={{ 
                color: '#FFD700', 
                marginBottom: '20px', 
                fontFamily: '华文行楷, STXingkai, serif',
                fontSize: '2rem'
              }}>
                "家和为贵，传承中华饮食文化"
              </Title>
              <Paragraph style={{ 
                color: '#D2B48C', 
                fontSize: '18px', 
                fontStyle: 'italic' 
              }}>
                Family is First, Inheriting Chinese Culinary Culture
              </Paragraph>
            </div>
          </div>
        </SectionContainer>

        {news.length === 0 && !loading && (
          <SectionContainer>
            <div className="container">
              <EmptyState>
                <div className="empty-icon">📰</div>
                <Title level={3} className="empty-title">
                  暂无新闻资讯
                </Title>
                <Paragraph className="empty-desc">
                  敬请期待更多精彩内容和品牌动态
                </Paragraph>
              </EmptyState>
            </div>
          </SectionContainer>
        )}
      </Spin>
    </PageContainer>
  );
};

export default News; 