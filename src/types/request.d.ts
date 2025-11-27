import { InternalAxiosRequestConfig } from 'axios';

// 扩展 axios 请求配置接口，添加自定义属性
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    showDefaultMsg?: boolean;
    successMsg?: string;
    errorMsg?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
  }
}
