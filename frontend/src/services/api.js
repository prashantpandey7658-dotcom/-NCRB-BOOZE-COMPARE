import axios from 'axios';

// Automatically use relative '/api' in production (Vercel) or VITE_API_URL, fallback to localhost:5050 in local dev
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://127.0.0.1:5050/api');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Products
  getProducts: (params = {}) => apiClient.get('/products', { params }),
  getProductById: (id) => apiClient.get(`/products/${id}`),
  createProduct: (data) => apiClient.post('/products', data),
  updateProduct: (id, data) => apiClient.put(`/products/${id}`, data),
  deleteProduct: (id) => apiClient.delete(`/products/${id}`),
  getCategories: () => apiClient.get('/categories'),

  // Regions & Comparison
  getRegions: () => apiClient.get('/regions'),
  getRegionalDemoData: () => apiClient.get('/regions/demo-data'),
  getComparison: (ids) => apiClient.get('/comparison', { params: { ids: ids.join(',') } }),
  getAnalytics: () => apiClient.get('/analytics'),

  // AI Chatbot
  sendChatMessage: (message) => apiClient.post('/chatbot', { message }),
  getChatHistory: () => apiClient.get('/chatbot/history'),
  clearChatHistory: () => apiClient.post('/chatbot/clear'),

  // Admin
  resetDatabase: () => apiClient.post('/admin/reset'),
  checkHealth: () => apiClient.get('/health'),
};

export default api;
