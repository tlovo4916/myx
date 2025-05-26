import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Tabs, Tag, Spin } from 'antd';
import { CrownOutlined } from '@ant-design/icons';
import { dishAPI } from '../services/api';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const MenuContainer = styled.div`
  padding: 40px 0;
  min-height: calc(100vh - 160px);
  background: linear-gradient(135deg, #faf8f5 0%, #f5f2ed 100%);
`;

const DishCard = styled(Card)`
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(139, 0, 0, 0.15);
    border-color: #B8860B;
  }
  
  .ant-card-cover img {
    height: 200px;
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
    margin-top: 12px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  }
  
  .dish-tags {
    margin-top: 12px;
  }
  
  .ant-card-meta-title {
    color: #8B4513;
    font-weight: bold;
    font-size: 16px;
  }
  
  .ant-card-meta-description {
    color: #654321;
    line-height: 1.6;
  }
`;

const CategoryTabs = styled(Tabs)`
  .ant-tabs-tab {
    font-size: 16px;
    font-weight: 500;
    color: #8B4513;
    
    &:hover {
      color: #8B0000;
    }
  }
  
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: #8B0000 !important;
      font-weight: bold;
    }
  }
  
  .ant-tabs-ink-bar {
    background: linear-gradient(90deg, #8B0000, #B8860B);
    height: 3px;
  }
`;

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: '全部特色' },
    { key: '招牌菜', label: '🏮 招牌名菜' },
    { key: '地方特色', label: '🌶️ 地方特色' },
    { key: '传统炖品', label: '🍲 传统炖品' },
    { key: '时令蔬菜', label: '🥬 时令蔬菜' },
    { key: '精品主食', label: '🍚 精品主食' },
    { key: '养生汤品', label: '🍵 养生汤品' },
    { key: '特色小食', label: '🥟 特色小食' },
  ];

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async (category = null) => {
    setLoading(true);
    try {
      const response = await dishAPI.getDishes(category);
      setDishes(response.data);
    } catch (error) {
      console.error('获取菜品失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    if (key === 'all') {
      fetchDishes();
    } else {
      fetchDishes(key);
    }
  };

  const filteredDishes = activeCategory === 'all' 
    ? dishes 
    : dishes.filter(dish => dish.category === activeCategory);

  return (
    <MenuContainer>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <Title level={1} style={{ 
            background: 'linear-gradient(45deg, #8B0000, #B8860B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem',
            marginBottom: 16
          }}>
            <CrownOutlined style={{ color: '#B8860B', marginRight: 12 }} />
            妙宇轩特色菜品
          </Title>
          <Paragraph style={{ 
            fontSize: 18, 
            color: '#8B4513',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.8
          }}>
            传承中华饮食文化，一地一特色，一方一口味<br/>
            精选地道食材，匠心烹制，营养天然健康
          </Paragraph>
        </div>

        <CategoryTabs
          activeKey={activeCategory}
          onChange={handleCategoryChange}
          centered
          size="large"
          items={categories.map(cat => ({
            key: cat.key,
            label: cat.label,
          }))}
          style={{ marginBottom: 40 }}
        />

        <Spin spinning={loading}>
          <Row gutter={[24, 24]}>
            {filteredDishes.map(dish => (
              <Col xs={24} sm={12} md={8} lg={6} key={dish.id}>
                <DishCard
                  cover={
                    <img 
                      alt={dish.name}
                      src={dish.image_url || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3'}
                    />
                  }
                >
                  <Card.Meta
                    title={dish.name}
                    description={dish.description}
                  />
                  <div className="dish-price">¥{dish.price}</div>
                  <div className="dish-tags">
                    {dish.is_recommended && <Tag color="#8B0000">招牌推荐</Tag>}
                    {dish.is_spicy && <Tag color="#DC143C">香辣</Tag>}
                    <Tag color="#B8860B">{dish.category}</Tag>
                  </div>
                </DishCard>
              </Col>
            ))}
          </Row>
        </Spin>

        {filteredDishes.length === 0 && !loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: 60,
            background: 'rgba(255,255,255,0.8)',
            borderRadius: 12,
            margin: '40px 0'
          }}>
            <Paragraph style={{ fontSize: 16, color: '#8B4513' }}>
              暂无此类菜品，敬请期待更多特色美食
            </Paragraph>
          </div>
        )}
      </div>
    </MenuContainer>
  );
};

export default Menu; 