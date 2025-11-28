import request from '@/api/config/request';

export interface IUserLoginData {
  username: string;
  password: string;
  role: string;
}

// 添加注册数据接口
export interface IUserRegisterData {
  username: string;
  password: string;
  role: string;
}

//
export interface ILoginResponseData {
  token: string;
  username?: string;
  name?: string;
  phone?: string;
  avatar?: string;
  role?: string;
}

// 登出接口响应数据接口
export interface ILogoutResponseData {
  message?: string;
}

//添加注册响应数据接口
export interface IRegisterResponseData {
  message?: string;
  // 根据后端实际返回结构调整
}

// 登录接口
export const login = (data: IUserLoginData): Promise<ILoginResponseData> => {
  return request.post<ILoginResponseData>('/login', data);
};

// 注册接口
export const register = (
  data: IUserRegisterData
): Promise<IRegisterResponseData> => {
  return request.post<IRegisterResponseData>('/register', data);
};
