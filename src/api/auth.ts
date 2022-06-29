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

export interface LoginByPassParams {
  username: string;
  pass: string;
}

export interface LoginByCodeParams {
  phone: string;
  code: string;
}

export type LoginHandler = typeof login;

// 发送手机验证码
export function sendSms(params: { phone: string }) {
  return request.post('/fc/login/sendSms', params);
}

export function login(params: LoginByPassParams | LoginByCodeParams) {
  if (Object.prototype.hasOwnProperty.call(params, 'phone')) {
    return request.post<any, AuthInfo>('/fc/login/sms', params);
  }
  return request.post<any, AuthInfo>('/fc/login/username', params);
}
