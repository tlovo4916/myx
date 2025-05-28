import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Skeleton } from 'antd';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  
  .lazy-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
    
    &.loading {
      opacity: 0;
    }
    
    &.loaded {
      opacity: 1;
    }
  }
  
  .image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    color: #999;
    font-size: 14px;
  }
`;

const LazyImage = React.memo(({ 
  src, 
  alt, 
  placeholder = '加载中...', 
  className = '',
  style = {},
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // 使用 Intersection Observer 实现懒加载
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleLoad = useCallback((e) => {
    setIsLoaded(true);
    onLoad?.(e);
  }, [onLoad]);

  const handleError = useCallback((e) => {
    setHasError(true);
    onError?.(e);
  }, [onError]);

  return (
    <ImageContainer ref={imgRef} className={className} style={style}>
      {!isLoaded && !hasError && (
        <div className="image-placeholder">
          <Skeleton.Image active style={{ width: '100%', height: '100%' }} />
        </div>
      )}
      
      {hasError && (
        <div className="image-placeholder">
          图片加载失败
        </div>
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </ImageContainer>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage; 