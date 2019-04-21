export declare class Storage {
    get(key: string, json?: boolean): any;
    set(key: string, value: any, isjson?: boolean): any;
    getWithExpire(key: string): any;
    setWithExpire(key: string, value: any, expire: number): any;
    remove(key: string): any;
    clear(): any;
}
declare const _default: Storage;
export default _default;
