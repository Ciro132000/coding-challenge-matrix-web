import { api } from '../../core/api/axios';

interface LoginResponse {
    token: string;
}

export class AuthDatasource {

    // Datasource encargado de traducir el login de la UI al contrato HTTP del backend.
    async login(
        email: string,
        password: string,
    ): Promise<LoginResponse> {

        const { data } = await api.post('/auth/login', {
            email,
            password,
        });

        return data;
    }

}
