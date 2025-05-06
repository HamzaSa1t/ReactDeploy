import axios from "axios";
import Cookies from 'js-cookie';

let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://amazoo4.onrender.com';
  if (!baseURL) {
    console.warn("REACT_APP_BACKEND_URL or NEXT_PUBLIC_BACKEND_URL is not set in production.  Defaulting to https://amazoo4.onrender.com.  This may cause errors.");
  }
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

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN'); 
    if (!config.url.includes("/register") && !config.url.includes("user/signin/") && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
      const csrfToken = Cookies.get('csrftoken');
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
