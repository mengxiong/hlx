import { AuthInfo, UserInfo } from 'src/api/auth';

type DataCallback = (data: AuthInfo | undefined) => void;

class Auth {
  private key = 'LOCAL_STORAGE_USER';

  private data?: AuthInfo;

  private callbacks: DataCallback[];

  constructor() {
    this.data = this.getDataFromStore();
    this.callbacks = [];
  }

  public bind(callback: DataCallback) {
    this.callbacks.push(callback);
  }

  public unbind(callback: DataCallback) {
    this.callbacks = this.callbacks.filter((cb) => cb !== callback);
  }

  public getAccessToken() {
    return this.data?.accessToken;
  }

  public getUser() {
    return this.data?.userInfo;
  }

  public updateUser(user: Partial<UserInfo>) {
    const userInfo = { ...this.data!.userInfo, ...user };
    this.set({ ...this.data!, userInfo });
  }

  public clear() {
    this.data = undefined;
    localStorage.removeItem(this.key);
    this.callbacks.forEach((cb) => cb(this.data));
  }

  public set(data: AuthInfo) {
    this.data = data;
    localStorage.setItem(this.key, JSON.stringify(data));
    this.callbacks.forEach((cb) => cb(data));
  }

  private getDataFromStore(): AuthInfo {
    let data: any = localStorage.getItem(this.key);
    try {
      if (data) {
        data = JSON.parse(data);
      }
    } catch (error) {
      data = null;
      // eslint-disable-next-line no-console
      console.error(error);
    }
    return data;
  }
}

export const auth = new Auth();
