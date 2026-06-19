import { api } from '../../core/api/axios';

interface LoginResponse {
    token: string;
}

export class AuthDatasource {

    async login(
        email: string,
        password: string,
    ): Promise<LoginResponse> {

        console.log(import.meta.env.VITE_API_URL);

        const { data } = await api.post('/auth/login', {
            email,
            password,
        });

        return data;
    }

}