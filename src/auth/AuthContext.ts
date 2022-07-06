import React from 'react';
import { UserInfo } from 'src/api/auth';

export const AuthContext = React.createContext<UserInfo | undefined>(undefined);

export function useUser() {
  return React.useContext(AuthContext);
}
