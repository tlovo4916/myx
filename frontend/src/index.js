import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { performanceMonitor, webVitalsMonitor } from './utils/performance';

// 启动性能监控
if (process.env.NODE_ENV === 'development') {
  // 监控页面加载性能
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = performanceMonitor.measurePageLoad();
      if (metrics) {
        console.log('🚀 妙宇轩前端性能监控启动');
        performanceMonitor.measureMemoryUsage();
      }
    }, 1000);
  });

  // 监控Web Vitals
  webVitalsMonitor.measureCoreWebVitals();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 