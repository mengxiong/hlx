import { useEffect, useState } from 'react';
import { UserInfo, login, LoginParams, AuthInfo } from 'src/api/auth';
import { authManager } from './auth';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | undefined>(() => authManager.getUser());

  const signin = async (values: LoginParams) => {
    const data = await login(values);
    authManager.set(data);
  };

  const signout = () => {
    authManager.set(undefined);
  };

  useEffect(() => {
    const cb = (data?: AuthInfo) => setUser(data?.userInfo);
    authManager.bind(cb);
    return () => {
      authManager.unbind(cb);
    };
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
