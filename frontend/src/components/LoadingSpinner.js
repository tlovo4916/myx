import React from 'react';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Text } = Typography;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: ${props => props.minHeight || '200px'};
  
  .loading-icon {
    font-size: 32px;
    color: #8B0000;
    margin-bottom: 16px;
  }
  
  .loading-text {
    color: #666;
    font-size: 16px;
    text-align: center;
  }
  
  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.9);
    z-index: 9999;
  }
  
  &.inline {
    min-height: 100px;
    padding: 20px;
    
    .loading-icon {
      font-size: 24px;
      margin-bottom: 12px;
    }
    
    .loading-text {
      font-size: 14px;
    }
  }
`;

const LoadingSpinner = React.memo(({ 
  text = '加载中...', 
  size = 'default',
  type = 'default',
  minHeight,
  className = ''
}) => {
  const antIcon = <LoadingOutlined className="loading-icon" spin />;
  
  return (
    <LoadingContainer 
      className={`${type} ${className}`}
      minHeight={minHeight}
    >
      <Spin indicator={antIcon} />
      <Text className="loading-text">{text}</Text>
    </LoadingContainer>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner; 