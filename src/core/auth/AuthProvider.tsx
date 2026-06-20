import {
    useState,
} from 'react';

import type {
    ReactNode,
} from 'react';

import {
    AuthContext,
} from './AuthContext';

import {
    TokenStorage,
} from '../storage/token-storage';

interface Props {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: Props) {

    // El estado inicial depende del token para mantener la sesión al recargar.
    const [
        isAuthenticated,
        setIsAuthenticated,
    ] = useState(() => {
        return !!TokenStorage.get();
    });

    const login = (
        token: string,
    ) => {

        TokenStorage.set(token);

        setIsAuthenticated(true);

    };

    const logout = () => {

        TokenStorage.remove();

        setIsAuthenticated(false);

        window.location.href = '/login';
    };

    return (

        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}
