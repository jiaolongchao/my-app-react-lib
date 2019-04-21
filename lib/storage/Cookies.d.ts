export declare class Cookies {
    constructor();
    init(): (key: any, value: any, attributes: any) => any;
    set: (key: any, value: any, attributes: any) => any;
    get(key: any): any;
    getJSON(): any;
    defaults: {};
    remove(key: any, attributes: any): void;
    withConverter: () => (key: any, value: any, attributes: any) => any;
}
declare const _default: Cookies;
export default _default;
