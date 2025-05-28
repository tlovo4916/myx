// 性能监控工具
export const performanceMonitor = {
  // 监控页面加载性能
  measurePageLoad: () => {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        const metrics = {
          // DNS查询时间
          dnsTime: navigation.domainLookupEnd - navigation.domainLookupStart,
          // TCP连接时间
          tcpTime: navigation.connectEnd - navigation.connectStart,
          // 请求响应时间
          requestTime: navigation.responseEnd - navigation.requestStart,
          // DOM解析时间
          domParseTime: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          // 页面完全加载时间
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          // 首次内容绘制时间
          firstContentfulPaint: 0,
          // 最大内容绘制时间
          largestContentfulPaint: 0
        };

        // 获取FCP和LCP
        const paintEntries = performance.getEntriesByType('paint');
        paintEntries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            metrics.firstContentfulPaint = entry.startTime;
          }
        });

        const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
        if (lcpEntries.length > 0) {
          metrics.largestContentfulPaint = lcpEntries[lcpEntries.length - 1].startTime;
        }

        console.log('页面性能指标:', metrics);
        return metrics;
      }
    }
    return null;
  },

  // 监控组件渲染性能
  measureComponentRender: (componentName, renderFunction) => {
    const startTime = performance.now();
    const result = renderFunction();
    const endTime = performance.now();
    
    console.log(`${componentName} 渲染时间: ${(endTime - startTime).toFixed(2)}ms`);
    return result;
  },

  // 监控API请求性能
  measureApiCall: async (apiName, apiFunction) => {
    const startTime = performance.now();
    try {
      const result = await apiFunction();
      const endTime = performance.now();
      console.log(`${apiName} API请求时间: ${(endTime - startTime).toFixed(2)}ms`);
      return result;
    } catch (error) {
      const endTime = performance.now();
      console.log(`${apiName} API请求失败，耗时: ${(endTime - startTime).toFixed(2)}ms`);
      throw error;
    }
  },

  // 内存使用监控
  measureMemoryUsage: () => {
    if (typeof window !== 'undefined' && window.performance && window.performance.memory) {
      const memory = window.performance.memory;
      const memoryInfo = {
        // 已使用的JS堆内存大小
        usedJSHeapSize: (memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + ' MB',
        // JS堆内存总大小
        totalJSHeapSize: (memory.totalJSHeapSize / 1024 / 1024).toFixed(2) + ' MB',
        // JS堆内存限制
        jsHeapSizeLimit: (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2) + ' MB'
      };
      
      console.log('内存使用情况:', memoryInfo);
      return memoryInfo;
    }
    return null;
  },

  // 图片加载性能监控
  measureImageLoad: (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      const startTime = performance.now();
      
      img.onload = () => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        console.log(`图片加载时间 (${imageUrl}): ${loadTime.toFixed(2)}ms`);
        resolve({ success: true, loadTime });
      };
      
      img.onerror = () => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        console.log(`图片加载失败 (${imageUrl}): ${loadTime.toFixed(2)}ms`);
        resolve({ success: false, loadTime });
      };
      
      img.src = imageUrl;
    });
  }
};

// Web Vitals 监控
export const webVitalsMonitor = {
  // 监控核心Web指标
  measureCoreWebVitals: () => {
    if (typeof window !== 'undefined') {
      // 监控CLS (Cumulative Layout Shift)
      let clsValue = 0;
      let clsEntries = [];

      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsEntries.push(entry);
            clsValue += entry.value;
          }
        }
        console.log('CLS (累积布局偏移):', clsValue);
      });

      try {
        observer.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        console.log('浏览器不支持layout-shift监控');
      }

      // 监控FID (First Input Delay)
      const fidObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fid = entry.processingStart - entry.startTime;
          console.log('FID (首次输入延迟):', fid);
        }
      });

      try {
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        console.log('浏览器不支持first-input监控');
      }
    }
  }
};

// 性能优化建议
export const performanceOptimizer = {
  // 检查是否需要优化
  checkOptimizationNeeds: (metrics) => {
    const suggestions = [];
    
    if (metrics.firstContentfulPaint > 2000) {
      suggestions.push('首次内容绘制时间过长，建议优化关键资源加载');
    }
    
    if (metrics.largestContentfulPaint > 2500) {
      suggestions.push('最大内容绘制时间过长，建议优化图片和字体加载');
    }
    
    if (metrics.loadTime > 3000) {
      suggestions.push('页面加载时间过长，建议启用代码分割和懒加载');
    }
    
    return suggestions;
  }
}; 