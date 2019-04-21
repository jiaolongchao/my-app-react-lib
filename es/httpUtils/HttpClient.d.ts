import HttpRequestConfig from './HttpRequestConfig';
export declare class HttpClient {
    constructor();
    interceptors: {
        request(success: Function, errorfunc: Function): void;
        response(success: Function, errorfunc: Function): void;
    };
    get(domainName: string, url: string, config?: HttpRequestConfig): Promise<any>;
    post(domainName: string, url: string, data?: any, config?: HttpRequestConfig): Promise<any>;
    put(domainName: string, url: string, data?: any, config?: HttpRequestConfig): Promise<any>;
    delete(domainName: string, url: string, config?: HttpRequestConfig): Promise<any>;
}
declare const _default: HttpClient;
export default _default;
