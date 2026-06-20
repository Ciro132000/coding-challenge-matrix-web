export class TokenStorage {

    // Centraliza el acceso al token.
    static get() {
        return localStorage.getItem('token');
    }

    static set(token: string) {
        localStorage.setItem('token', token);
    }

    static remove() {
        localStorage.removeItem('token');
    }

}
