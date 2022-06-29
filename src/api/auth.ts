import { request } from 'src/request';

export interface UserInfo {
  avatar: string;
  birthday: string;
  city: string;
  county: string;
  email?: string;
  id: number;
  deptId: number;
  realName: string;
  username: string; // phone
  phone: string;
}

export interface AuthInfo {
  accessToken: string;
  messageTotal: number;
  userInfo: UserInfo;
}

export interface LoginParams {
  username: string;
  pass: string;
}

export function login(params: LoginParams) {
  return request.post<any, AuthInfo>('/fc/login/username', params);
}
