import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from './AuthContext';

export function AuthRequired({ children }: { children: JSX.Element }) {
  const user = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!user.registerFlag) {
    return <Navigate to="/register" state={{ from: location.pathname }} replace />;
  }

  return children;
}
