import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

interface ProtectedRouteProps {
  element: ReactNode;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  element,
  onlyUnAuth = false
}) => {
  const location = useLocation();

  // ✅ Безопасный доступ к user slice (state.user.isAuthenticated)
  const isAuthenticated = useAppSelector(
    (state) => !!state.user?.isAuthenticated
  );

  // Для onlyUnAuth (login/register) — авторизованные перенаправляются
  if (onlyUnAuth && isAuthenticated) {
    const to = location.state?.from?.pathname || '/';
    return <Navigate to={to} replace />;
  }

  // Неавторизованные → на login
  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // Авторизованные видят контент
  return <>{element}</>;
};
