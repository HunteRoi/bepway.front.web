import { User } from "../model/old/User";


export class StorageAccessor {
    public static deserializeStorage(key: string): User {
        return JSON.parse(localStorage.getItem(key));
    }

    public static serializeStorage(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
