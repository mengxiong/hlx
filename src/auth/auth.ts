import { AuthInfo } from 'src/api/auth';

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

  public set(data: AuthInfo | undefined) {
    this.data = data;
    this.store(data);
    this.callbacks.forEach((cb) => cb(data));
  }

  // eslint-disable-next-line class-methods-use-this
  private store(data?: AuthInfo) {
    if (data) {
      localStorage.setItem(this.key, JSON.stringify(data));
    } else {
      localStorage.removeItem(this.key);
    }
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

export const authManager = new Auth();
