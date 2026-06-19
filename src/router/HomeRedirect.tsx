import { Navigate } from 'react-router-dom';
import { useAuth } from '../core/auth/useAuth';

export function HomeRedirect() {

    const { isAuthenticated } = useAuth();

    return isAuthenticated
        ? <Navigate to="/matrix" replace />
        : <Navigate to="/login" replace />;
}