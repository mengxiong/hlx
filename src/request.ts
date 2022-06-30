import axios from 'axios';
import md5 from 'md5';
import dayjs from 'dayjs';
import { toast } from 'react-hot-toast';
import { authManager } from './auth/auth';

export const request = axios.create({
  timeout: 15000,
  baseURL: 'https://admin.huilaixue.cn',
});

request.interceptors.request.use((config) => {
  const now = Date.now();
  const mac = md5(dayjs(now).format('YYYY-MM-DD HH:mm:ss'));
  const token = authManager.getAccessToken();
  config.headers!.mac = mac;
  if (token) {
    config.headers!['x-Authorization'] = token;
  }
  return config;
});

request.interceptors.response.use(
  (res) => {
    const { data } = res;
    if (Object.prototype.hasOwnProperty.call(data, 'respResult') && data.respResult === 'success') {
      return data.respBody;
    }
    return Promise.reject(data);
  },
  (err) => {
    const msg = err.response?.data?.message || err.message;

    if (err.response?.status === 401) {
      authManager.set(undefined);
    }
    toast.error(msg);
    return Promise.reject(err);
  }
);
