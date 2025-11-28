import request from '@/api/config/request';

export const login = (data) => {
  return request.post('/login', data);
};

export const register = (data) => {
  return request.post('/register', data);
};
