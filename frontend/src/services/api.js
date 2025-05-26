import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API方法
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
};

export const storeAPI = {
  getStores: (city) => api.get('/api/stores', { params: { city } }),
};

export const dishAPI = {
  getDishes: (category) => api.get('/api/dishes', { params: { category } }),
};

export const reservationAPI = {
  createReservation: (data) => api.post('/api/reservations', data),
  getUserReservations: () => api.get('/api/reservations'),
};

export const newsAPI = {
  getNews: (featured) => api.get('/api/news', { params: { featured } }),
  getNewsDetail: (id) => api.get(`/api/news/${id}`),
};

export default api; 