// ============================================================
// FILE: frontend/src/config/api.js
// CHANGE: Use VITE_API_URL instead of hardcoded localhost
// ============================================================

import axios from 'axios';

// Use environment variable, fallback to localhost for development
import { API_URL } from './apiUrl';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;