// stores/user.ts
import type { IUserLoginData, IUserRegisterData } from '@/api/user';
import { login as loginApi, register as registerApi } from '@/api/user';
import { setToken, removeToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    token: '',
    userInfo: null as any
  });

  const login = async (userInfo: IUserLoginData) => {
    try {
      console.log('store 收到:', userInfo);
      const response = await loginApi(userInfo);
      const { data } = response;

      // 保存 token
      state.token = data.token;
      state.userInfo = data;
      setToken(data.token);

      localStorage.setItem('userInfo', JSON.stringify(data));

      ElMessage.success('登录成功');
      return Promise.resolve(data);
    } catch (error) {
      ElMessage.error('登录失败，请检查用户名和密码');
      return Promise.reject(error);
    }
  };

  const register = async (userInfo: IUserRegisterData) => {
    try {
      console.log('store 注册收到:', userInfo);
      const response = await registerApi(userInfo);
      const { data } = response;

      ElMessage.success('注册成功');
      return Promise.resolve(data);
    } catch (error) {
      ElMessage.error('注册失败，请检查输入信息');
      return Promise.reject(error);
    }
  };

  const logout = () => {
    // 清除本地数据
    state.token = '';
    state.userInfo = null;
    removeToken();

    // 可能还需要清除其他本地存储
    localStorage.removeItem('userInfo');

    ElMessage.success('退出成功');
  };

  // 添加初始化方法，页面刷新时恢复用户信息
  const initUserInfo = () => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');

    if (token && userInfo) {
      state.token = token;
      try {
        state.userInfo = JSON.parse(userInfo);
      } catch (error) {
        console.error('解析用户信息失败:', error);
        localStorage.removeItem('userInfo');
      }
    }
  };

  return {
    login,
    register,
    logout,
    initUserInfo,
    state
  };
});
