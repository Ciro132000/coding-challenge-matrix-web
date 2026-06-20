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

        if (error.response?.status === 401) {

            TokenStorage.remove();

            window.location.href = '/login';

        }

        return Promise.reject(error);
    }

);