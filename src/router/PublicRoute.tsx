import {
    Navigate,
} from 'react-router-dom';

import type {
    ReactNode,
} from 'react';
import { useAuth } from '../core/auth/useAuth';


interface Props {
    children: ReactNode;
}

export function PublicRoute({
    children,
}: Props) {

    const { isAuthenticated } =
        useAuth();

    if (isAuthenticated) {
        return <Navigate to="/matrix" />;
    }

    return children;
}