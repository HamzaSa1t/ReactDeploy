import axios from "axios";
import { ACCESS_TOKEN } from "./constants";
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!config.url.includes("/register") && !config.url.includes("user/signin/") && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;