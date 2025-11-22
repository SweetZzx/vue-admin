import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { getToken, removeToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
import router from '@/router';

// // 🔥 根据环境设置 baseURL
// const getBaseURL = () => {
//   if (import.meta.env.DEV) {
//     // 开发环境使用代理
//     return 'http://47.109.145.118:8080';
//   } else {
//     // 🔥 生产环境直接调用服务器 API
//     return import.meta.env.VITE_API_URL || 'http://47.109.145.118:8080';
//   }
// };

const config = {
  // baseURL: 'http://localhost:8080',
  // baseURL: 'http://47.109.145.118:8080',
  baseURL: 'https://sweetzzx.dpdns.org',

  // baseURL: 'https://api.sweetzzx.dpdns.org',

  timeout: 30000
};

const service = axios.create(config);

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 设置内容类型
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    const user = JSON.parse(localStorage.getItem('userInfo') || '{}');
    config.headers['token'] = user.token;

    // // 开发环境打印请求信息（可选）
    // if (import.meta.env.DEV) {
    //   console.log('请求地址:', config.baseURL + config.url);
    // }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    let res = response.data;

    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res;
    }

    // 兼容不同的成功状态码格式
    const code = String(res?.code ?? '200');

    // 处理认证失败
    if (code === '401') {
      ElMessage.error(res.msg || res.message || 'token已过期，请重新登录');
      // // 清除token并跳转登录页
      // removeToken();
      // const store = useUserStore();
      // store.logout();
      // router.push('/login');
      return Promise.reject(res);
    }

    // 处理业务失败
    if (!['0', '200'].includes(code)) {
      const errorMsg = res.msg || res.message || '请求失败';
      ElMessage.error(errorMsg);
      return Promise.reject(res);
    }
    return res;
  },
  (error) => {
    // 增强错误处理
    let errorMessage = '请求失败';

    if (!error.response) {
      errorMessage = '网络错误，请检查网络连接';
    } else {
      const status = error.response.status;
      switch (status) {
        case 401: {
          errorMessage = 'token已过期，请重新登录';
          // // 清除token并跳转登录页
          // removeToken();
          // const store = useUserStore();
          // store.logout();
          // router.push('/login');
          break;
        }
        case 403:
          errorMessage = '没有权限访问';
          break;
        case 404:
          errorMessage = '未找到请求接口';
          break;
        case 500:
          errorMessage = '系统异常，请联系管理员';
          break;
        case 502:
          errorMessage = '网关错误';
          break;
        case 503:
          errorMessage = '服务不可用';
          break;
        case 504:
          errorMessage = '网关超时';
          break;
        default:
          errorMessage =
            error.response.data?.message || error.message || '请求失败';
      }
    }

    ElMessage.error(errorMessage);

    // 开发环境打印详细错误
    if (import.meta.env.DEV) {
      console.error('响应错误:', error);
    }

    return Promise.reject(error);
  }
);

export default service;
