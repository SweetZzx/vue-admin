import axios from 'axios';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';

const config = {
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 3000
};

const service = axios.create(config);

service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const { code, message } = response.data;
    if (code !== 0) {
      ElMessage.error(message);
      return Promise.reject(message);
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
