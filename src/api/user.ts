import request from '@/api/config/request';
import type { ApiReponse } from './type';

export interface IUserLoginData {
  username: string;
  password: string;
}

export interface ILoginResponseData {
  token: string;
}

//登录接口
export const login = (
  data: IUserLoginData
): Promise<ApiReponse<ILoginResponseData>> => {
  return request.post('/auth/login', data);
};
