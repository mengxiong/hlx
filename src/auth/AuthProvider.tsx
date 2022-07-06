import { useEffect, useState } from 'react';
import { UserInfo, AuthInfo } from 'src/api/auth';
import { auth } from './auth';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | undefined>(() => auth.getUser());

  useEffect(() => {
    const cb = (data?: AuthInfo) => setUser(data?.userInfo);
    auth.bind(cb);
    return () => {
      auth.unbind(cb);
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
