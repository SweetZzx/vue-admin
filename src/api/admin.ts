import request from '@/api/config/request2';
import type { APIResponse } from './type'; // 假设你已经在 type 文件中定义了 APIResponse 接口

// 用户信息接口定义
export interface User {
  id?: number;
  username: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
}

// 获取用户列表
export const getUserList = async (
  pageNum: number,
  pageSize: number,
  username: string,
  name: string
): Promise<APIResponse<{ list: User[]; total: number }>> => {
  const response = await request.get<
    APIResponse<{ list: User[]; total: number }>
  >('/admin/selectPage', {
    params: { pageNum, pageSize, username, name }
  });
  return response.data; // 显式返回 data 字段以符合 Promise 类型
};

// 添加用户
export const addUser = async (
  user: User
): Promise<APIResponse<{ id: number }>> => {
  const response = await request.post<APIResponse<{ id: number }>>(
    '/admin/add',
    user
  );
  return response.data; // 显式返回 data 字段以符合 Promise 类型
};

// 更新用户
export const updateUser = async (
  user: User
): Promise<APIResponse<Record<string, never>>> => {
  const response = await request.put<APIResponse<Record<string, never>>>(
    '/admin/update',
    user
  );
  return response.data; // 显式返回 data 字段
};

// 删除用户
export const deleteUser = async (
  id: number
): Promise<APIResponse<Record<string, never>>> => {
  const response = await request.delete<APIResponse<Record<string, never>>>(
    `/admin/delete/${id}`
  );
  return response.data; // 显式返回 data 字段
};

// 批量删除用户
export const deleteBatchUsers = async (
  ids: number[]
): Promise<APIResponse<Record<string, never>>> => {
  const response = await request.delete<APIResponse<Record<string, never>>>(
    '/admin/deleteBatch',
    { data: ids }
  );
  return response.data; // 显式返回 data 字段
};

// 导出用户
export const exportUsers = (
  username: string,
  name: string,
  ids: number[],
  token: string
): string => {
  const idsStr = ids.join(',');
  return `/admin/export?username=${username || ''}&name=${name || ''}&ids=${idsStr}&token=${token}`;
};
