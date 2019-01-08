import { NoItemException } from "../model/exceptions/exception";


export class StorageAccessor {
    static readonly TOKEN_KEY = "token";
    static readonly USER_KEY = "currentUser";
    
    public static Exists(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }

    public static deserializeStorage<T>(key: string): T {
        if (!this.Exists(key))  throw new NoItemException;
        return JSON.parse(localStorage.getItem(key));
    }

    public static serializeStorage<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public static deleteFromStorage(key: string): boolean {
        if (!this.Exists(key)) throw new NoItemException;
        localStorage.removeItem(key);

        return !this.Exists(key);
    }

    public static clearStorage(): boolean {
        localStorage.clear();
        return true;
    }
}
