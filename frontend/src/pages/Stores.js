import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Select, Spin, Space, Tag } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, ClockCircleOutlined, HomeOutlined } from '@ant-design/icons';
import { storeAPI } from '../services/api';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const StoresContainer = styled.div`
  padding: 40px 0;
  min-height: calc(100vh - 160px);
  background: linear-gradient(135deg, #faf8f5 0%, #f5f2ed 100%);
`;

const StoreCard = styled(Card)`
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
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
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  
  .store-info {
    .info-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 12px;
      color: #654321;
      line-height: 1.6;
      
      .anticon {
        margin-right: 10px;
        color: #B8860B;
        margin-top: 2px;
        font-size: 16px;
      }
    }
    
    .store-features {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #f0f0f0;
    }
  }
`;

const CitySelector = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  .ant-select {
    .ant-select-selector {
      border: 2px solid #B8860B;
      border-radius: 8px;
      height: 45px;
      
      &:hover, &:focus {
        border-color: #8B0000;
        box-shadow: 0 0 0 2px rgba(139, 0, 0, 0.1);
      }
    }
  }
`;

// 真实门店数据
const storeData = [
  {
    id: 1,
    name: '妙宇轩宴会中心(杰特广场店)',
    address: '云南省开远市灵泉西路方圆荟·杰特开远4楼',
    phone: '18608805188',
    city: '开远市',
    opening_hours: '10:00-22:00',
    image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3',
    brand_type: '宴会中心'
  },
  {
    id: 2,
    name: '妙宇轩餐厅(金湖东店)',
    address: '云南省个旧市金湖东路193号5-6商铺',
    phone: '18608805188',
    city: '个旧市',
    opening_hours: '10:00-22:00',
    image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3',
    brand_type: '妙宇轩餐厅'
  },
  {
    id: 3,
    name: '妙宇轩餐厅(迎晖店)',
    address: '云南省建水市鸿榆新天地购物中心F3',
    phone: '18608805188',
    city: '建水市',
    opening_hours: '10:00-22:00',
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3',
    brand_type: '妙宇轩餐厅'
  },
  {
    id: 4,
    name: '妙宇轩餐厅(南湖店)',
    address: '云南省蒙自市武庙街1号',
    phone: '18608805188',
    city: '蒙自市',
    opening_hours: '10:00-22:00',
    image_url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3',
    brand_type: '妙宇轩餐厅'
  },
      {
      id: 5,
      name: '妙宇轩餐厅(世纪店)',
      address: '云南省昆明市官渡区珥季路中段世纪西庄商业中心D幢',
      phone: '13988010682',
      city: '昆明市',
      opening_hours: '10:00-22:00',
      image_url: '/images/stores/kunming.png',
      brand_type: '妙宇轩餐厅'
    },
      {
      id: 6,
      name: '传承馆',
      address: '云南省红河哈尼族彝族自治州建水市迎晖路260号',
      phone: '13988010682',
      city: '建水市',
      opening_hours: '10:00-22:00',
      image_url: '/images/stores/chuancheng-guan.jpg',
      brand_type: '传承馆'
    },
  {
    id: 7,
    name: '喜宴宫',
    address: '云南省红河州个旧市金湖西路23号豪林新界二幢',
    phone: '13988010682',
    city: '个旧市',
    opening_hours: '10:00-22:00',
    image_url: '/images/stores/chuancheng-guan.jpg',
    brand_type: '喜宴宫'
  }
];

// 从门店数据中提取城市列表
const cities = [...new Set(storeData.map(store => store.city))].sort();

const Stores = () => {
  const [stores, setStores] = useState(storeData); // 直接初始化为全部门店
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  // 确保组件挂载时显示所有门店
  useEffect(() => {
    console.log('Stores component mounted, initializing with all stores');
    setStores(storeData);
    setLoading(false);
  }, []);

  // 添加调试日志
  console.log('Stores component rendered, stores count:', stores.length);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    if (city) {
      setStores(storeData.filter(store => store.city === city));
    } else {
      setStores(storeData);
    }
  };

  // 根据品牌类型获取颜色
  const getBrandColor = (brandType) => {
    switch (brandType) {
      case '宴会中心': return '#8B0000';
      case '妙宇轩餐厅': return '#B8860B';
      case '喜宴宫': return '#DC143C';
      case '传承馆': return '#8B4513';
      case '项巧云': return '#CD853F';
      default: return '#8B4513';
    }
  };

  return (
    <StoresContainer>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <Title level={1} style={{ 
            background: 'linear-gradient(45deg, #8B0000, #B8860B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem',
            marginBottom: 16
          }}>
            <HomeOutlined style={{ color: '#B8860B', marginRight: 12 }} />
            妙宇轩门店分布
          </Title>
          <Paragraph style={{ 
            fontSize: 18, 
            color: '#8B4513',
            maxWidth: 700,
            margin: '0 auto',
            lineHeight: 1.8
          }}>
            红河妙宇投资管理有限责任公司旗下品牌矩阵<br/>
            多家门店遍布昆明、红河州（开远、个旧、建水、蒙自等地）<br/>
            传承中华饮食文化，就近享受地道中式餐饮体验
          </Paragraph>
        </div>

        <CitySelector>
          <div style={{ textAlign: 'center' }}>
            <Space size="large" align="center">
              <Text style={{ fontSize: 16, color: '#8B4513', fontWeight: 500 }}>
                选择城市：
              </Text>
              <Select
                style={{ width: 220 }}
                placeholder="全部门店"
                value={selectedCity || undefined}
                onChange={handleCityChange}
                allowClear
                size="large"
              >
                {cities.map(city => (
                  <Option key={city} value={city}>{city}</Option>
                ))}
              </Select>
              <Text style={{ fontSize: 14, color: '#8B4513', marginLeft: 16 }}>
                当前显示：{selectedCity ? `${selectedCity} (${stores.length}家)` : `全部门店 (${stores.length}家)`}
              </Text>
            </Space>
          </div>
        </CitySelector>

        <Spin spinning={loading}>
          <Row gutter={[24, 24]}>
            {stores.map(store => {
              const brandColor = getBrandColor(store.brand_type);
              return (
                <Col xs={24} sm={12} md={8} key={store.id}>
                  <StoreCard
                    cover={
                      <img 
                        alt={store.name}
                        src={store.image_url}
                        onError={(e) => {
                          console.log('Image failed to load:', store.image_url);
                          e.target.src = 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3';
                        }}
                      />
                    }
                  >
                    <Card.Meta
                      title={
                        <div>
                          {store.name}
                          <Tag color={brandColor} style={{ marginLeft: 8 }}>
                            {store.brand_type}
                          </Tag>
                        </div>
                      }
                      description={
                        <div className="store-info">
                          <div className="info-item">
                            <EnvironmentOutlined />
                            <Text>{store.address}</Text>
                          </div>
                          <div className="info-item">
                            <PhoneOutlined />
                            <Text>{store.phone}</Text>
                          </div>
                          <div className="info-item">
                            <ClockCircleOutlined />
                            <Text>{store.opening_hours}</Text>
                          </div>
                          <div className="store-features">
                            <Space wrap>
                              <Tag color="#B8860B">传统中式</Tag>
                              <Tag color="#8B4513">地方特色</Tag>
                              <Tag color="#CD853F">家和文化</Tag>
                              {store.city && <Tag color="#8B0000">{store.city}</Tag>}
                            </Space>
                          </div>
                        </div>
                      }
                    />
                  </StoreCard>
                </Col>
              );
            })}
          </Row>
        </Spin>

        {stores.length === 0 && !loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: 60,
            background: 'rgba(255,255,255,0.9)',
            borderRadius: 15,
            margin: '40px 0',
            border: '2px dashed #B8860B'
          }}>
            <EnvironmentOutlined style={{ fontSize: 48, color: '#B8860B', marginBottom: 16 }} />
            <Paragraph style={{ fontSize: 16, color: '#8B4513', marginBottom: 8 }}>
              {selectedCity ? `${selectedCity}暂无门店` : '正在加载门店数据...'}
            </Paragraph>
            <Text style={{ color: '#8B4513' }}>
              {selectedCity ? '我们正在积极拓展，敬请期待更多门店开业' : '请稍候'}
            </Text>
          </div>
        )}
      </div>
    </StoresContainer>
  );
};

export default Stores; 