export declare class Storage {
    get(key: string, json?: boolean): any;
    set(key: string, value: any, isjson?: boolean): void;
    getWithExpire(key: string): any;
    setWithExpire(key: string, value: any, expire: number): void;
    remove(key: string): void;
    clear(): void;
}
declare const _default: Storage;
export default _default;
