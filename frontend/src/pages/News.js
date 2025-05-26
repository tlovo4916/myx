import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Spin, Tag } from 'antd';
import { ReadOutlined, CalendarOutlined, UserOutlined, FireOutlined } from '@ant-design/icons';
import { newsAPI } from '../services/api';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;

const NewsContainer = styled.div`
  padding: 40px 0;
  min-height: calc(100vh - 160px);
  background: linear-gradient(135deg, #faf8f5 0%, #f5f2ed 100%);
`;

const NewsCard = styled(Card)`
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  background: linear-gradient(145deg, #ffffff, #fafafa);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(139, 0, 0, 0.15);
    border-color: #B8860B;
  }
  
  .ant-card-cover img {
    height: 220px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover .ant-card-cover img {
    transform: scale(1.05);
  }
  
  .ant-card-meta-title {
    color: #8B0000;
    font-weight: bold;
    font-size: 16px;
    line-height: 1.4;
  }
  
  .ant-card-meta-description {
    color: #654321;
    line-height: 1.6;
  }
  
  .news-meta {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #8B4513;
    font-size: 13px;
    
    .news-author {
      display: flex;
      align-items: center;
      
      .anticon {
        margin-right: 6px;
        color: #B8860B;
      }
    }
    
    .news-date {
      display: flex;
      align-items: center;
      
      .anticon {
        margin-right: 6px;
        color: #B8860B;
      }
    }
  }
`;

const FeaturedCard = styled(Card)`
  margin-bottom: 50px;
  border-radius: 20px;
  overflow: hidden;
  border: 3px solid #B8860B;
  background: linear-gradient(145deg, #ffffff, #fefefe);
  box-shadow: 0 25px 50px rgba(139, 0, 0, 0.15);
  
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
      
      .news-author {
        display: flex;
        align-items: center;
        
        .anticon {
          margin-right: 8px;
          color: #B8860B;
          font-size: 16px;
        }
      }
      
      .news-date {
        display: flex;
        align-items: center;
        
        .anticon {
          margin-right: 8px;
          color: #B8860B;
          font-size: 16px;
        }
      }
    }
  }
`;

const SectionTitle = styled(Title)`
  &.ant-typography {
    color: #8B0000;
    margin-bottom: 30px;
    
    .anticon {
      color: #B8860B;
      margin-right: 12px;
    }
  }
`;

const News = () => {
  const [news, setNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const [allNewsResponse, featuredResponse] = await Promise.all([
        newsAPI.getNews(),
        newsAPI.getNews(true)
      ]);
      
      setNews(allNewsResponse.data);
      setFeaturedNews(featuredResponse.data);
    } catch (error) {
      console.error('获取新闻失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsClick = (newsId) => {
    // 这里可以导航到新闻详情页
    console.log('查看新闻详情:', newsId);
  };

  return (
    <NewsContainer>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <Title level={1} style={{ 
            background: 'linear-gradient(45deg, #8B0000, #B8860B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem',
            marginBottom: 16
          }}>
            <ReadOutlined style={{ color: '#B8860B', marginRight: 12 }} />
            妙宇轩最新资讯
          </Title>
          <Paragraph style={{ 
            fontSize: 18, 
            color: '#8B4513',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.8
          }}>
            传承中华饮食文化，关注品牌动态<br/>
            了解妙宇轩最新活动、传统文化传承和美食资讯
          </Paragraph>
        </div>

        <Spin spinning={loading}>
          {/* 特色新闻 */}
          {featuredNews.length > 0 && (
            <div style={{ marginBottom: 60 }}>
              <SectionTitle level={3}>
                <FireOutlined />
                重点资讯
                <Tag color="#8B0000" style={{ marginLeft: 12, fontSize: 14 }}>
                  特别关注
                </Tag>
              </SectionTitle>
              {featuredNews.slice(0, 1).map(article => (
                <FeaturedCard
                  key={article.id}
                  cover={
                    <img 
                      alt={article.title}
                      src={article.image_url || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3'}
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
                  </div>
                </FeaturedCard>
              ))}
            </div>
          )}

          {/* 所有新闻 */}
          <div>
            <SectionTitle level={3}>
              <ReadOutlined />
              全部资讯
            </SectionTitle>
            <Row gutter={[24, 24]}>
              {news.map(article => (
                <Col xs={24} sm={12} md={8} key={article.id}>
                  <NewsCard
                    cover={
                      <img 
                        alt={article.title}
                        src={article.image_url || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3'}
                      />
                    }
                    onClick={() => handleNewsClick(article.id)}
                  >
                    <Card.Meta
                      title={
                        <div>
                          {article.title}
                          {article.is_featured && (
                            <Tag color="#8B0000" size="small" style={{ marginLeft: 8 }}>
                              热门
                            </Tag>
                          )}
                        </div>
                      }
                      description={article.summary}
                    />
                    <div className="news-meta">
                      <div className="news-author">
                        <UserOutlined />
                        <Text>{article.author}</Text>
                      </div>
                      <div className="news-date">
                        <CalendarOutlined />
                        <Text>{article.published_at}</Text>
                      </div>
                    </div>
                  </NewsCard>
                </Col>
              ))}
            </Row>
          </div>
        </Spin>

        {news.length === 0 && !loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: 60,
            background: 'rgba(255,255,255,0.9)',
            borderRadius: 15,
            margin: '40px 0',
            border: '2px dashed #B8860B'
          }}>
            <ReadOutlined style={{ fontSize: 48, color: '#B8860B', marginBottom: 16 }} />
            <Paragraph style={{ fontSize: 16, color: '#8B4513', marginBottom: 8 }}>
              暂无新闻资讯
            </Paragraph>
            <Text style={{ color: '#8B4513' }}>
              敬请期待更多精彩内容和品牌动态
            </Text>
          </div>
        )}
      </div>
    </NewsContainer>
  );
};

export default News; 