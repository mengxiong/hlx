import React from 'react';
import { LoginParams, UserInfo } from 'src/api/auth';

interface AuthContextType {
  user?: UserInfo;
  signin: (values: LoginParams) => Promise<void>;
  signout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function useUser() {
  return React.useContext(AuthContext).user;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
