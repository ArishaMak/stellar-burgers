import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

interface ProtectedRouteProps {
    element: React.ReactNode;
    onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
    element,
    onlyUnAuth = false
}) => {
    const location = useLocation();
    const { isAuthenticated } = useAppSelector(state => state.user);

    if (onlyUnAuth && isAuthenticated) {
        const to = location.state?.from?.pathname || '/';
        return <Navigate to={to} replace />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{element}</>;
};
