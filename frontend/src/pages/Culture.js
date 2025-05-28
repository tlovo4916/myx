import React from 'react';
import { Row, Col, Card, Typography, Button, Timeline, Space, Tag } from 'antd';
import { ArrowRightOutlined, HeartOutlined, CrownOutlined, GiftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const PageContainer = styled.div`
  min-height: 100vh;
  padding-top: 64px;
  margin-top: -64px;
`;

const HeroSection = styled.div`
  background: linear-gradient(rgba(139, 0, 0, 0.8), rgba(184, 134, 11, 0.6)),
              url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3') center/cover;
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
    color: #FFF8DC;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const CultureCard = styled(Card)`
  height: 100% !important;
  min-height: 750px !important;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  border: 3px solid transparent;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(139, 0, 0, 0.3);
    border-color: #FFD700;
  }
  
  .ant-card-body {
    padding: 0 !important;
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
  }
  
  .culture-header {
    background: linear-gradient(135deg, #8B0000, #DC143C);
    color: white;
    padding: 40px 20px;
    text-align: center;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    
    .culture-icon {
      font-size: 80px;
      margin-bottom: 20px;
      display: block;
    }
    
    .culture-title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
      font-family: '华文行楷', 'STXingkai', serif;
    }
    
    .culture-subtitle {
      font-size: 16px;
      color: #FFD700;
    }
  }
  
  .culture-content {
    padding: 30px 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    height: calc(100% - 200px);
    
    .culture-description {
      margin-bottom: 20px;
      flex-shrink: 0;
      
      .ant-typography {
        margin-bottom: 0 !important;
      }
    }
    
    .traditions-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 25px;
      overflow-y: auto;
    }
    
    .tradition-item {
      background: #FFF8DC;
      padding: 15px;
      border-radius: 10px;
      margin-bottom: 15px;
      border-left: 4px solid #8B0000;
      flex-shrink: 0;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .tradition-title {
        font-weight: bold;
        color: #8B0000;
        margin-bottom: 8px;
      }
      
      .tradition-desc {
        color: #8B4513;
        font-size: 14px;
        line-height: 1.5;
      }
    }
    
    .button-container {
      margin-top: auto;
      text-align: center;
      padding-top: 20px;
      flex-shrink: 0;
    }
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

const TimelineContainer = styled.div`
  .ant-timeline {
    .ant-timeline-item-head {
      background: #8B0000;
      border-color: #8B0000;
    }
    
    .ant-timeline-item-content {
      .timeline-title {
        font-size: 18px;
        font-weight: bold;
        color: #8B0000;
        margin-bottom: 8px;
      }
      
      .timeline-desc {
        color: #8B4513;
        line-height: 1.6;
      }
    }
  }
`;

const PhilosophyCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #FFD700;
    transform: translateY(-5px);
  }
  
  .philosophy-icon {
    font-size: 60px;
    margin-bottom: 20px;
    color: #FFD700;
  }
  
  .philosophy-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #FFD700;
    font-family: '华文行楷', 'STXingkai', serif;
  }
  
  .philosophy-desc {
    color: #D2B48C;
    line-height: 1.6;
  }
`;

const Culture = () => {
  const navigate = useNavigate();

  const cultureServices = [
    {
      id: 1,
      title: '抓周礼仪',
      subtitle: '传承千年的成长祝福',
      icon: '🎋',
      description: '抓周是中华民族传统的儿童成长礼仪，寓意着对孩子未来的美好祝愿。妙宇轩传承这一古老习俗，为宝宝的成长里程碑增添仪式感。',
      traditions: [
        {
          title: '传统抓周物品',
          desc: '准备书籍、算盘、印章、笔墨等传统物品，寓意不同的人生道路'
        },
        {
          title: '现代抓周创新',
          desc: '结合现代元素，增加科技产品、艺术用品等，与时俱进'
        },
        {
          title: '家庭聚会仪式',
          desc: '邀请亲朋好友共同见证，营造温馨的家庭氛围'
        },
        {
          title: '专业摄影记录',
          desc: '专业摄影师全程记录珍贵时刻，留下美好回忆'
        }
      ]
    },
    {
      id: 2,
      title: '传统婚宴',
      subtitle: '见证爱情的神圣时刻',
      icon: '💒',
      description: '传承中华传统婚礼文化，融合现代婚宴服务，为新人打造既有文化底蕴又具现代气息的完美婚礼。',
      traditions: [
        {
          title: '三书六礼',
          desc: '遵循传统婚礼程序，体现对婚姻的庄重态度'
        },
        {
          title: '凤冠霞帔',
          desc: '提供传统中式婚服，让新人体验古典婚礼之美'
        },
        {
          title: '拜堂成亲',
          desc: '传统拜堂仪式，在亲友见证下完成人生大礼'
        },
        {
          title: '喜宴佳肴',
          desc: '精心准备寓意吉祥的传统婚宴菜品'
        }
      ]
    },
    {
      id: 3,
      title: '节庆文化',
      subtitle: '传统节日的文化传承',
      icon: '🏮',
      description: '在传统节日期间，举办各种文化活动，让顾客在用餐的同时感受浓厚的节日氛围和传统文化魅力。',
      traditions: [
        {
          title: '春节团圆宴',
          desc: '准备年夜饭套餐，营造浓厚的春节氛围'
        },
        {
          title: '中秋赏月宴',
          desc: '中秋节期间提供赏月套餐，传承团圆文化'
        },
        {
          title: '端午文化节',
          desc: '端午节包粽子活动，传承传统节日习俗'
        },
        {
          title: '重阳敬老宴',
          desc: '重阳节举办敬老活动，弘扬孝道文化'
        }
      ]
    }
  ];

  const weddingProcess = [
    {
      title: '婚前咨询',
      desc: '专业婚宴顾问一对一咨询，了解新人需求，制定个性化方案'
    },
    {
      title: '场地布置',
      desc: '根据传统文化元素进行场地设计，营造浪漫典雅的婚礼氛围'
    },
    {
      title: '礼仪策划',
      desc: '专业礼仪师指导传统婚礼流程，确保每个环节都庄重得体'
    },
    {
      title: '菜品定制',
      desc: '根据地方传统和新人喜好，定制寓意吉祥的婚宴菜单'
    },
    {
      title: '现场服务',
      desc: '专业服务团队全程跟进，确保婚礼顺利进行'
    },
    {
      title: '后续服务',
      desc: '提供婚礼照片整理、纪念品制作等后续贴心服务'
    }
  ];

  const philosophies = [
    {
      icon: '🏠',
      title: '家和万事兴',
      desc: '以"家和"为核心理念，营造温馨和谐的用餐环境，让每一位顾客都能感受到家的温暖'
    },
    {
      icon: '🌱',
      title: '传承与创新',
      desc: '在传承传统文化的基础上，融入现代元素，让传统文化在新时代焕发新的活力'
    },
    {
      icon: '🤝',
      title: '和谐共融',
      desc: '促进不同地区文化的交流融合，在保持地方特色的同时，增进文化认同'
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <div className="container">
          <Title level={1}>传统文化</Title>
          <Paragraph>
            传承中华优秀传统文化，弘扬民族民俗精神，让传统文化在现代餐饮中绽放新的光彩
          </Paragraph>
        </div>
      </HeroSection>

      <SectionContainer>
        <div className="container">
          <div className="section-title">
            <Title level={2}>文化服务</Title>
            <Paragraph>
              将传统文化融入餐饮服务，为人生重要时刻增添仪式感和文化内涵
            </Paragraph>
          </div>

          <Row gutter={[32, 32]} align="stretch" style={{ minHeight: '800px' }}>
            {cultureServices.map(service => (
              <Col xs={24} lg={8} key={service.id} style={{ display: 'flex' }}>
                <CultureCard style={{ width: '100%' }}>
                  <div className="culture-header">
                    <span className="culture-icon">{service.icon}</span>
                    <div className="culture-title">{service.title}</div>
                    <div className="culture-subtitle">{service.subtitle}</div>
                  </div>
                  
                  <div className="culture-content">
                    <div className="culture-description">
                      <Paragraph>{service.description}</Paragraph>
                    </div>
                    
                    <div className="traditions-container">
                      {service.traditions.map((tradition, index) => (
                        <div key={index} className="tradition-item">
                          <div className="tradition-title">{tradition.title}</div>
                          <div className="tradition-desc">{tradition.desc}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="button-container">
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
                        预约咨询 <ArrowRightOutlined />
                      </Button>
                    </div>
                  </div>
                </CultureCard>
              </Col>
            ))}
          </Row>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-light">
        <div className="container">
          <div className="section-title">
            <Title level={2}>婚宴服务流程</Title>
            <Paragraph>
              专业的婚宴服务团队，为您打造完美的传统中式婚礼
            </Paragraph>
          </div>

          <Row gutter={[48, 48]}>
            <Col xs={24} md={12}>
              <TimelineContainer>
                <Timeline mode="left">
                  {weddingProcess.map((step, index) => (
                    <Timeline.Item key={index}>
                      <div className="timeline-title">{step.title}</div>
                      <div className="timeline-desc">{step.desc}</div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </TimelineContainer>
            </Col>
            <Col xs={24} md={12}>
              <Card
                style={{
                  background: 'linear-gradient(135deg, #8B0000, #DC143C)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  height: '100%'
                }}
              >
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontSize: '80px', marginBottom: '20px' }}>💒</div>
                  <Title level={3} style={{ color: '#FFD700', marginBottom: '20px' }}>
                    专业婚宴服务
                  </Title>
                  <Paragraph style={{ color: '#FFF8DC', fontSize: '16px', lineHeight: '1.6' }}>
                    我们拥有专业的婚宴策划团队，丰富的传统文化知识，
                    以及完善的服务体系，为您的婚礼提供全方位的支持。
                  </Paragraph>
                  <Space direction="vertical" size="middle" style={{ marginTop: '30px', width: '100%' }} align="center">
                    <Tag color="gold" style={{ fontSize: '14px', padding: '8px 20px', minWidth: '160px', textAlign: 'center' }}>
                      <CrownOutlined /> 专业策划团队
                    </Tag>
                    <Tag color="gold" style={{ fontSize: '14px', padding: '8px 20px', minWidth: '160px', textAlign: 'center' }}>
                      <HeartOutlined /> 个性化定制
                    </Tag>
                    <Tag color="gold" style={{ fontSize: '14px', padding: '8px 20px', minWidth: '160px', textAlign: 'center' }}>
                      <GiftOutlined /> 全程贴心服务
                    </Tag>
                  </Space>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-dark">
        <div className="container">
          <div className="section-title">
            <Title level={2}>文化理念</Title>
            <Paragraph>
              以"家和"为核心，传承中华优秀传统文化，打造具有文化内涵的餐饮品牌
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {philosophies.map((philosophy, index) => (
              <Col xs={24} md={8} key={index}>
                <PhilosophyCard>
                  <div className="philosophy-icon">{philosophy.icon}</div>
                  <div className="philosophy-title">{philosophy.title}</div>
                  <div className="philosophy-desc">{philosophy.desc}</div>
                </PhilosophyCard>
              </Col>
            ))}
          </Row>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Title level={3} style={{ color: '#FFD700', marginBottom: '20px', fontFamily: '华文行楷, STXingkai, serif' }}>
              "家和为贵，传承中华饮食文化"
            </Title>
            <Paragraph style={{ color: '#D2B48C', fontSize: '18px', fontStyle: 'italic' }}>
              Family is First
            </Paragraph>
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  );
};

export default Culture; 