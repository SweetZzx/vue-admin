import type { IUserLoginData } from '@/api/user';
import { login as loginApi } from '@/api/user';
import { setToken } from '@/utils/auth';

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    token: ''
  });
  const login = async (userInfo: IUserLoginData) => {
    try {
      const { username, password } = userInfo;
      const response = await loginApi({ username: username.trim(), password });

      const { data } = response;
      state.token = data.token;
      setToken(data.token);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return { login, state };
});
