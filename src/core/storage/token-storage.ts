export class TokenStorage {

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