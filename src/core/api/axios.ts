import axios from 'axios';
import { TokenStorage } from '../storage/token-storage';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(config => {

    // Agrega el token JWT a cada request autenticado.
    const token = TokenStorage.get();

    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`;

    }

    return config;
});

api.interceptors.response.use(

    response => response,

    error => {

        // Si el backend invalida la sesión, se limpia el token y se fuerza login.
        if (error.response?.status === 401) {

            TokenStorage.remove();

            window.location.href = '/login';

        }

        return Promise.reject(error);
    }

);
