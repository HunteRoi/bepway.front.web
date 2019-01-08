import { NoItemException } from '../exceptions/no-item-exception';

export class DataAccess {
    static readonly TOKEN_KEY = "token";
    static readonly USER_KEY = "currentUser";
    
    public static isAuthenticated(): boolean {
        return this.exists(this.TOKEN_KEY) && this.exists(this.USER_KEY);
    }

    public static exists(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }

    public static deserializeStorage<T>(key: string): T {
        if (!this.exists(key))  throw new NoItemException;
        return JSON.parse(localStorage.getItem(key));
    }

    public static serializeStorage<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public static deleteFromStorage(key: string): boolean {
        if (!this.exists(key)) throw new NoItemException;
        localStorage.removeItem(key);

        return !this.exists(key);
    }

    public static clearStorage() {
        localStorage.clear();
    }

    public static hasData(): boolean {
        return localStorage.length !== 0;
    }
 }
