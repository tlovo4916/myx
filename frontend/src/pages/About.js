import React from 'react';
import { Row, Col, Card, Typography, Timeline, Space, Tag, Button } from 'antd';
import { ArrowRightOutlined, HeartOutlined, CrownOutlined, TeamOutlined, TrophyOutlined, RocketOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

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

const AboutCard = styled(Card)`
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  border: 3px solid transparent;
  background: linear-gradient(145deg, #ffffff, #fafafa);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(139, 0, 0, 0.3);
    border-color: #FFD700;
  }
  
  .card-header {
    background: linear-gradient(135deg, #8B0000, #DC143C);
    color: white;
    padding: 30px 20px;
    text-align: center;
    
    .card-icon {
      font-size: 60px;
      margin-bottom: 15px;
      display: block;
      color: #FFD700;
    }
    
    .card-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
      font-family: '华文行楷', 'STXingkai', serif;
    }
  }
  
  .card-content {
    padding: 30px 20px;
    
    .highlight-item {
      background: #FFF8DC;
      padding: 15px;
      border-radius: 10px;
      margin-bottom: 15px;
      border-left: 4px solid #8B0000;
      
      .highlight-title {
        font-weight: bold;
        color: #8B0000;
        margin-bottom: 8px;
      }
      
      .highlight-desc {
        color: #8B4513;
        font-size: 14px;
        line-height: 1.6;
      }
    }
  }
`;

const TimelineContainer = styled.div`
  .ant-timeline {
    .ant-timeline-item-head {
      background: #8B0000;
      border-color: #8B0000;
      width: 16px;
      height: 16px;
    }
    
    .ant-timeline-item-content {
      .timeline-year {
        font-size: 20px;
        font-weight: bold;
        color: #8B0000;
        margin-bottom: 8px;
        font-family: '华文行楷', 'STXingkai', serif;
      }
      
      .timeline-event {
        font-size: 16px;
        font-weight: 600;
        color: #8B4513;
        margin-bottom: 6px;
      }
      
      .timeline-desc {
        color: #654321;
        line-height: 1.6;
      }
    }
  }
`;

const ValueCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  height: 100%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #FFD700;
    transform: translateY(-5px);
  }
  
  .value-icon {
    font-size: 60px;
    margin-bottom: 20px;
    color: #FFD700;
  }
  
  .value-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #FFD700;
    font-family: '华文行楷', 'STXingkai', serif;
  }
  
  .value-desc {
    color: #D2B48C;
    line-height: 1.6;
  }
`;

const About = () => {
  const navigate = useNavigate();

  const aboutSections = [
    {
      id: 'brand-story',
      title: '品牌故事',
      icon: <CrownOutlined />,
      description: '妙宇轩的创立源于对中华传统饮食文化的深深热爱和传承使命。',
      highlights: [
        {
          title: '创始初心',
          desc: '以"家和为贵"为核心理念，致力于传承中华饮食文化精髓'
        },
        {
          title: '文化传承',
          desc: '将传统文化融入现代餐饮服务，让每一道菜品都承载着文化内涵'
        },
        {
          title: '品质坚持',
          desc: '坚持使用优质食材，传统制作工艺，为顾客提供正宗的中式餐饮体验'
        }
      ]
    },
    {
      id: 'corporate-culture',
      title: '企业文化',
      icon: <HeartOutlined />,
      description: '以"家和"文化为核心，营造温馨和谐的企业氛围和服务理念。',
      highlights: [
        {
          title: '家和理念',
          desc: '将"家和万事兴"的理念贯穿于企业管理和服务的每一个环节'
        },
        {
          title: '团队精神',
          desc: '倡导团结协作，相互尊重，共同成长的团队文化'
        },
        {
          title: '服务至上',
          desc: '以客户满意为最高标准，用心服务每一位顾客'
        }
      ]
    },
    {
      id: 'social-responsibility',
      title: '社会责任',
      icon: <TeamOutlined />,
      description: '积极承担社会责任，推动传统文化传承，促进地方经济发展。',
      highlights: [
        {
          title: '文化传承',
          desc: '通过餐饮服务传播中华传统文化，弘扬民族精神'
        },
        {
          title: '就业创造',
          desc: '为当地提供就业机会，带动相关产业发展'
        },
        {
          title: '公益活动',
          desc: '积极参与社会公益活动，回馈社会，传递正能量'
        }
      ]
    }
  ];

  const developmentHistory = [
    {
      year: '2005年',
      event: '品牌创立',
      desc: '第一家妙宇轩在金湖东店开业，妙宇轩品牌正式诞生'
    },
    {
      year: '2010年',
      event: '区域扩张',
      desc: '红河州各地开设多家门店，业务覆盖开远、个旧、建水、蒙自等地'
    },
    {
      year: '2015年',
      event: '管理完善',
      desc: '红河妙宇投资管理有限责任公司成立，餐饮管理迈上更高台阶'
    },
    {
      year: '2020年',
      event: '品牌矩阵',
      desc: '相继推出项巧云、喜宴宫、传承馆等多个子品牌，形成完整品牌矩阵'
    },
    {
      year: '2025年',
      event: '高端定制',
      desc: '妙宇轩宴会中心在开远市杰特广场盛大开业，标志着品牌正式进入市场'
    }
  ];

  const coreValues = [
    {
      icon: '🏠',
      title: '家和为贵',
      desc: '以"家和"为核心理念，营造温馨和谐的用餐环境，让每一位顾客都能感受到家的温暖'
    },
    {
      icon: '🌱',
      title: '传承创新',
      desc: '在传承传统文化的基础上，融入现代元素，让传统文化在新时代焕发新的活力'
    },
    {
      icon: '🤝',
      title: '诚信服务',
      desc: '以诚待客，用心服务，建立与顾客之间的信任关系，提供超越期待的服务体验'
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <div className="container">
          <Title level={1}>关于我们</Title>
          <Paragraph>
            红河妙宇投资管理有限责任公司，传承中华饮食文化，弘扬家和理念<br/>
            致力于打造具有深厚文化底蕴的民族餐饮品牌
          </Paragraph>
        </div>
      </HeroSection>

      {/* 品牌故事、企业文化、社会责任 */}
      <SectionContainer id="brand-story">
        <div className="container">
          <div className="section-title">
            <Title level={2}>企业概况</Title>
            <Paragraph>
              深耕传统文化，专注品质服务，打造有温度的餐饮品牌
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {aboutSections.map(section => (
              <Col xs={24} lg={8} key={section.id}>
                <AboutCard id={section.id}>
                  <div className="card-header">
                    <span className="card-icon">{section.icon}</span>
                    <div className="card-title">{section.title}</div>
                  </div>
                  
                  <div className="card-content">
                    <Paragraph>{section.description}</Paragraph>
                    
                    {section.highlights.map((highlight, index) => (
                      <div key={index} className="highlight-item">
                        <div className="highlight-title">{highlight.title}</div>
                        <div className="highlight-desc">{highlight.desc}</div>
                      </div>
                    ))}
                  </div>
                </AboutCard>
              </Col>
            ))}
          </Row>
        </div>
      </SectionContainer>

      {/* 发展历程 */}
      <SectionContainer className="bg-light" id="development-history">
        <div className="container">
          <div className="section-title">
            <Title level={2}>
              <TrophyOutlined style={{ color: '#8B0000', marginRight: 12 }} />
              发展历程
            </Title>
            <Paragraph>
              从品牌创立到区域扩张，见证妙宇轩的成长足迹
            </Paragraph>
          </div>

          <Row gutter={[48, 48]}>
            <Col xs={24} md={12}>
              <TimelineContainer>
                <Timeline mode="left">
                  {developmentHistory.map((milestone, index) => (
                    <Timeline.Item key={index}>
                      <div className="timeline-year">{milestone.year}</div>
                      <div className="timeline-event">{milestone.event}</div>
                      <div className="timeline-desc">{milestone.desc}</div>
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
                  <div style={{ fontSize: '80px', marginBottom: '20px' }}>🏆</div>
                  <Title level={3} style={{ color: '#FFD700', marginBottom: '20px' }}>
                    品牌成就
                  </Title>
                  <Paragraph style={{ color: '#FFF8DC', fontSize: '16px', lineHeight: '1.6' }}>
                    短短几年时间，妙宇轩已发展成为红河州知名的餐饮品牌，
                    拥有完整的品牌矩阵和多家门店，深受顾客喜爱和信赖。
                  </Paragraph>
                  <Space direction="vertical" size="middle" style={{ marginTop: '30px' }}>
                    <Tag color="gold" style={{ fontSize: '14px', padding: '5px 15px' }}>
                      <CrownOutlined /> 五大品牌矩阵
                    </Tag>
                    <Tag color="gold" style={{ fontSize: '14px', padding: '5px 15px' }}>
                      <TeamOutlined /> 多地连锁经营
                    </Tag>
                    <Tag color="gold" style={{ fontSize: '14px', padding: '5px 15px' }}>
                      <HeartOutlined /> 文化传承使命
                    </Tag>
                  </Space>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </SectionContainer>

      {/* 核心价值观 */}
      <SectionContainer className="bg-dark">
        <div className="container">
          <div className="section-title">
            <Title level={2}>核心价值观</Title>
            <Paragraph>
              以传统文化为根基，以现代服务为标准，打造有温度的餐饮品牌
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {coreValues.map((value, index) => (
              <Col xs={24} md={8} key={index}>
                <ValueCard>
                  <div className="value-icon">{value.icon}</div>
                  <div className="value-title">{value.title}</div>
                  <div className="value-desc">{value.desc}</div>
                </ValueCard>
              </Col>
            ))}
          </Row>
        </div>
      </SectionContainer>

      {/* 招贤纳士 */}
      <SectionContainer id="recruitment">
        <div className="container">
          <div className="section-title">
            <Title level={2}>
              <RocketOutlined style={{ color: '#8B0000', marginRight: 12 }} />
              招贤纳士
            </Title>
            <Paragraph>
              诚邀有志之士加入妙宇轩大家庭，共同传承中华饮食文化
            </Paragraph>
          </div>

          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} md={16}>
              <Card
                style={{
                  background: 'linear-gradient(135deg, #FFF8DC, #F5F5DC)',
                  border: '3px solid #B8860B',
                  borderRadius: '20px',
                  textAlign: 'center',
                  padding: '20px'
                }}
              >
                <Title level={3} style={{ color: '#8B0000', marginBottom: '20px' }}>
                  我们期待这样的你
                </Title>
                <Row gutter={[24, 24]}>
                  <Col xs={24} sm={12}>
                    <div style={{ padding: '20px' }}>
                      <div style={{ fontSize: '40px', marginBottom: '15px' }}>👨‍🍳</div>
                      <Title level={4} style={{ color: '#8B4513' }}>厨师团队</Title>
                      <Paragraph style={{ color: '#654321' }}>
                        热爱传统烹饪，精通地方菜系，有创新精神
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div style={{ padding: '20px' }}>
                      <div style={{ fontSize: '40px', marginBottom: '15px' }}>🤵</div>
                      <Title level={4} style={{ color: '#8B4513' }}>服务团队</Title>
                      <Paragraph style={{ color: '#654321' }}>
                        热情周到，注重细节，有良好的沟通能力
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div style={{ padding: '20px' }}>
                      <div style={{ fontSize: '40px', marginBottom: '15px' }}>💼</div>
                      <Title level={4} style={{ color: '#8B4513' }}>管理团队</Title>
                      <Paragraph style={{ color: '#654321' }}>
                        有餐饮管理经验，认同企业文化，有团队精神
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div style={{ padding: '20px' }}>
                      <div style={{ fontSize: '40px', marginBottom: '15px' }}>🎨</div>
                      <Title level={4} style={{ color: '#8B4513' }}>策划团队</Title>
                      <Paragraph style={{ color: '#654321' }}>
                        有创意思维，熟悉传统文化，有活动策划经验
                      </Paragraph>
                    </div>
                  </Col>
                </Row>
                <div style={{ marginTop: '30px' }}>
                  <Button 
                    type="primary"
                    size="large"
                    onClick={() => window.open('https://www.zhipin.com/web/geek/jobs?query=%E5%A6%99%E5%AE%87%E8%BD%A9&city=101291200', '_blank')}
                    style={{
                      background: 'linear-gradient(135deg, #8B0000, #DC143C)',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '0 30px',
                      height: '50px',
                      fontSize: '16px'
                    }}
                  >
                    简历投递 <ArrowRightOutlined />
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </SectionContainer>
    </PageContainer>
  );
};

export default About; 