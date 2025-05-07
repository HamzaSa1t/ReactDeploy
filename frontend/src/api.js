import axios from "axios";
import Cookies from 'js-cookie';

let baseURL;

if (import.meta.env.PROD) { 
    baseURL = import.meta.env.VITE_BACKEND_URL || 'https://amazoo4.onrender.com';
  } else {
    baseURL = 'http://localhost:8000';
  }

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    // Always add CSRF token for non-GET requests
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
      const csrfToken = Cookies.get('csrftoken');
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
    }
    
    // Add JWT token for all authenticated requests
    if (token && !config.url.includes("/user/signin")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  });

export default api;
