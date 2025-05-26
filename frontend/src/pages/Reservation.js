import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Select, DatePicker, TimePicker, InputNumber, message, Row, Col, Radio } from 'antd';
import { CalendarOutlined, UserOutlined, PhoneOutlined, EnvironmentOutlined, CrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { storeAPI, reservationAPI } from '../services/api';
import styled from 'styled-components';
import dayjs from 'dayjs';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const ReservationContainer = styled.div`
  padding: 40px 0;
  min-height: calc(100vh - 160px);
  background: linear-gradient(135deg, #faf8f5 0%, #f5f2ed 100%);
`;

const ReservationCard = styled(Card)`
  max-width: 900px;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(139, 0, 0, 0.1);
  border: 2px solid #B8860B;
  background: linear-gradient(145deg, #ffffff, #fefefe);
  
  .ant-card-body {
    padding: 50px;
  }
  
  .reservation-title {
    text-align: center;
    margin-bottom: 40px;
    background: linear-gradient(45deg, #8B0000, #B8860B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .ant-form-item {
    margin-bottom: 28px;
  }
  
  .ant-form-item-label > label {
    color: #8B4513;
    font-weight: 600;
    font-size: 15px;
  }
  
  .ant-input, .ant-select-selector, .ant-picker {
    border: 2px solid #B8860B;
    border-radius: 10px;
    
    &:hover, &:focus {
      border-color: #8B0000;
      box-shadow: 0 0 0 2px rgba(139, 0, 0, 0.1);
    }
  }
  
  .submit-btn {
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
  
  .banquet-types {
    .ant-radio-group {
      width: 100%;
      
      .ant-radio-button-wrapper {
        border-color: #B8860B;
        color: #8B4513;
        
        &:hover {
          border-color: #8B0000;
          color: #8B0000;
        }
        
        &.ant-radio-button-wrapper-checked {
          background: linear-gradient(135deg, #8B0000, #B8860B);
          border-color: #8B0000;
          color: white;
        }
      }
    }
  }
`;

const BanquetTypeCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid #B8860B;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  
  .banquet-title {
    color: #8B0000;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .banquet-desc {
    color: #8B4513;
    line-height: 1.6;
  }
`;

const Reservation = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const [banquetType, setBanquetType] = useState('family');
  const { user } = useAuth();
  const navigate = useNavigate();

  const banquetTypes = [
    {
      value: 'family',
      label: '家庭聚餐',
      description: '温馨家庭聚会，传承家和文化，享受天伦之乐'
    },
    {
      value: 'wedding',
      label: '婚宴喜庆',
      description: '传统中式婚宴，红红火火，百年好合，喜庆圆满'
    },
    {
      value: 'birthday',
      label: '寿宴庆典',
      description: '长寿祝福宴席，传统抓周礼仪，福寿双全'
    },
    {
      value: 'business',
      label: '商务宴请',
      description: '商务接待宴席，彰显品味，促进合作交流'
    },
    {
      value: 'festival',
      label: '节庆聚会',
      description: '传统节日庆典，弘扬民俗文化，共享佳节'
    }
  ];

  useEffect(() => {
    if (!user) {
      message.warning('请先登录后再进行宴席预订');
      navigate('/login');
      return;
    }
    fetchStores();
  }, [user, navigate]);

  const fetchStores = async () => {
    try {
      const response = await storeAPI.getStores();
      setStores(response.data);
    } catch (error) {
      console.error('获取门店失败:', error);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const reservationData = {
        store_id: values.store_id,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm'),
        party_size: values.party_size,
        contact_name: values.contact_name,
        contact_phone: values.contact_phone,
        banquet_type: banquetType,
        special_requirements: values.special_requirements || ''
      };

      await reservationAPI.createReservation(reservationData);
      message.success('宴席预订成功！我们会尽快与您联系确认详细安排');
      form.resetFields();
      setBanquetType('family');
    } catch (error) {
      message.error(error.response?.data?.message || '预订失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const disabledDate = (current) => {
    // 不能选择过去的日期
    return current && current < dayjs().startOf('day');
  };

  if (!user) {
    return null;
  }

  return (
    <ReservationContainer>
      <div className="container">
        <ReservationCard>
          <Title level={2} className="reservation-title">
            <CrownOutlined style={{ color: '#B8860B', marginRight: 12 }} />
            妙宇轩宴席预订
          </Title>
          <Paragraph style={{ 
            textAlign: 'center', 
            marginBottom: 40, 
            color: '#8B4513',
            fontSize: 16,
            lineHeight: 1.8
          }}>
            传承中华饮食文化，家和为贵<br/>
            为您精心准备地道中式宴席，营造温馨难忘的聚会时光
          </Paragraph>
          
          <Form
            form={form}
            name="reservation"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            {/* 宴席类型选择 */}
            <Form.Item label="宴席类型" className="banquet-types">
              <Radio.Group 
                value={banquetType} 
                onChange={(e) => setBanquetType(e.target.value)}
                buttonStyle="solid"
                size="large"
              >
                <Row gutter={[12, 12]}>
                  {banquetTypes.map(type => (
                    <Col xs={12} sm={8} md={6} key={type.value}>
                      <Radio.Button value={type.value} style={{ width: '100%', textAlign: 'center' }}>
                        {type.label}
                      </Radio.Button>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>

            {/* 宴席类型说明 */}
            <BanquetTypeCard>
              <div className="banquet-title">
                {banquetTypes.find(t => t.value === banquetType)?.label}
              </div>
              <div className="banquet-desc">
                {banquetTypes.find(t => t.value === banquetType)?.description}
              </div>
            </BanquetTypeCard>

            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="store_id"
                  label="选择门店"
                  rules={[
                    {
                      required: true,
                      message: '请选择门店！',
                    },
                  ]}
                >
                  <Select
                    placeholder="请选择门店"
                    prefix={<EnvironmentOutlined />}
                  >
                    {stores.map(store => (
                      <Option key={store.id} value={store.id}>
                        {store.name} - {store.address}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="party_size"
                  label="宴席人数"
                  rules={[
                    {
                      required: true,
                      message: '请输入宴席人数！',
                    },
                  ]}
                >
                  <InputNumber
                    min={2}
                    max={100}
                    placeholder="请输入宴席人数"
                    style={{ width: '100%' }}
                    addonAfter="人"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="date"
                  label="宴席日期"
                  rules={[
                    {
                      required: true,
                      message: '请选择宴席日期！',
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder="请选择日期"
                    disabledDate={disabledDate}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="time"
                  label="宴席时间"
                  rules={[
                    {
                      required: true,
                      message: '请选择宴席时间！',
                    },
                  ]}
                >
                  <TimePicker
                    style={{ width: '100%' }}
                    placeholder="请选择时间"
                    format="HH:mm"
                    minuteStep={30}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="contact_name"
                  label="联系人姓名"
                  rules={[
                    {
                      required: true,
                      message: '请输入联系人姓名！',
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="请输入联系人姓名"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="contact_phone"
                  label="联系电话"
                  rules={[
                    {
                      required: true,
                      message: '请输入联系电话！',
                    },
                    {
                      pattern: /^1[3-9]\d{9}$/,
                      message: '请输入有效的手机号码！',
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="请输入联系电话"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="special_requirements"
              label="特殊需求"
            >
              <TextArea
                rows={4}
                placeholder="请描述您的特殊需求，如：菜品偏好、座位安排、庆典仪式等（选填）"
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-btn"
                loading={loading}
              >
                确认预订宴席
              </Button>
            </Form.Item>
          </Form>
        </ReservationCard>
      </div>
    </ReservationContainer>
  );
  };
  
export default Reservation; 