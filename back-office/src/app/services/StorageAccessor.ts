import { User } from "../model/classes/Models";


export class StorageAccessor {
    static readonly TOKEN_KEY = "token";
    static readonly USER_KEY = "currentUser";
    
    public static deserializeStorage<T>(key: string): T {
        return JSON.parse(localStorage.getItem(key));
    }

    public static serializeStorage<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
