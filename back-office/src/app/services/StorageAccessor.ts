import { User } from "../model/classes/Models";


export class StorageAccessor {
    public static deserializeStorage<T>(key: string): T {
        return JSON.parse(localStorage.getItem(key));
    }

    public static serializeStorage<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
