export declare class Utils {
    constructor();
    phoneRegex: {
        'ar-dz': RegExp;
        'ar-sy': RegExp;
        'ar-sa': RegExp;
        'en-us': RegExp;
        'cs-cz': RegExp;
        'de-de': RegExp;
        'da-dk': RegExp;
        'el-gr': RegExp;
        'en-au': RegExp;
        'en-gb': RegExp;
        'en-hk': RegExp;
        'en-in': RegExp;
        'en-nz': RegExp;
        'en-za': RegExp;
        'en-zm': RegExp;
        'es-es': RegExp;
        'fi-fi': RegExp;
        'fr-fr': RegExp;
        'he-il': RegExp;
        'hu-hu': RegExp;
        'it-it': RegExp;
        'ja-jp': RegExp;
        'ms-my': RegExp;
        'nb-no': RegExp;
        'nl-be': RegExp;
        'nn-no': RegExp;
        'pl-pl': RegExp;
        'pt-br': RegExp;
        'pt-pt': RegExp;
        'ru-ru': RegExp;
        'sr-rs': RegExp;
        'tr-tr': RegExp;
        'vi-vn': RegExp;
        'zh-cn': RegExp;
        'zh-tw': RegExp;
    };
    UUID(): string;
    getQuertString(key: string): string;
    isApp(): any;
    isIOS(): RegExpMatchArray;
    isAndroid(): RegExpMatchArray;
    isPhone(phone: string): any;
    getRealByFontSize(value: number): number;
    setDocumentTitle(title: string): void;
    loadOutJS(jsurl: string, async?: boolean): void;
    isWx(): boolean;
    isQQ(): boolean;
    isJDJR(): boolean;
    CheckIdCard: {
        Wi: number[];
        Xi: (string | number)[];
        Pi: number[];
        brithday18: (sIdCard: any) => boolean;
        brithday15: (sIdCard: any) => boolean;
        validate: (sIdCard: any) => boolean;
        province: (sIdCard: any) => boolean;
    };
    IDCardVerify(idNo: any, successCallback: any, errCallback: any): any;
    isChineseName(name: any): boolean;
    /**
     * 重定向到登陆页面
     */
    redirectLogin(): void;
    redirectJDJRLogin(): void;
    redirectFsp(productId: any, riskScore: any, order_id: any): void;
    redirectPay(ref_id: any, ref_type: any, buyCycle?: any): void;
    /**
     * 自动给股票代码加跳转事件
     */
    textOfStockcodeOnClick(text: string): string;
    getAppVersion(): any;
}
declare const _default: Utils;
export default _default;
