import Utils from '../utils/Utils';
import WXClass from '../wx/WXClass';
export const baseNativeJs = (funcName, params, ios) => {
    try {
        if (Utils.isApp()) {
            if (typeof window['webkit'] != 'undefined') {
                const realParam = ios ? Object.assign({}, {
                    "nativeCallJS": funcName
                }, Object.assign({}, ios)) : Object.assign({}, {
                    "nativeCallJS": funcName
                }, Object.assign({}, params));
                console.log("nativeparam", realParam);
                window['webkit'].messageHandlers.jsCallNative.postMessage(realParam);
            }
            else if (/Android/i.test(window.navigator.userAgent)) {
                const realParam = Object.assign({}, {
                    "nativecalljs": funcName
                }, Object.assign({}, params)); //android
                const paramstr = JSON.stringify(realParam);
                console.log("nativeparam", paramstr);
                window['haina'].pushEvent(paramstr);
            }
        }
        else {
            if (Utils.isIOS()) {
                /* EXACT:http://m-test.0606.com.cn/diagnose/js/floatwindow.js*/
                // window.location.href = 'ihayner://diagnosis_stock_activity:10050';
                // setTimeout(function () { window.location.href = 'itms-apps://itunes.apple.com/app/id1236797754' }, 1000);
            }
            else if (Utils.isAndroid()) {
                //此操作会调起app并阻止接下来的js执行
                // let iframe = document.createElement("iframe")
                // iframe.src = "ihayner://diagnosis_stock_activity:10050"
                // iframe.style.display = "none"
                // // let iframe = document.createElement("<iframe src='' style='display:none' target='' ></iframe>")
                // document.body.appendChild(iframe);
                // //没有安装应用会执行下面的语句
                // setTimeout(function () { window.location.href = 'D' + 'download/download.html' }, 1000);
            }
        }
    }
    catch (error) {
        console.log("nativejs error", error);
    }
};
export class NativeJs {
    baseWindow(funcName) {
        window[funcName] = function () {
            delete window[funcName];
        };
    }
    /**
     * 登陆
     * 返回token
     * @param callback
     */
    login(callback) {
        window['refreshtoken'] = function (result) {
            try {
                result = result;
            }
            catch (e) {
                console.log('出错！');
            }
            if (result) {
                callback(result);
                // window['userInfo'].access_token=result;
            }
        };
        return baseNativeJs("refreshtoken");
    }
    /**
     * 刷新token
     */
    refreshtoken_load() {
        if (Utils.isApp()) {
            return baseNativeJs("refreshtoken_reload");
        }
        else if (Utils.isJDJR()) {
        }
        else {
            Utils.redirectLogin();
        }
    }
    /**
     * 跳转支付
     * @param ref_id  产品id
     * @param ref_type 产品类型
     * @param buyCycle 限制体验支付，或者自实现支付列表的时候，需要传此参数
     */
    toPay(ref_id, ref_type, buyCycle) {
        // window['topay'] = function () {
        // 	delete window['topay'];
        // 	try {
        // 		// result = result;
        // 	} catch (e) {
        // 		console.log('出错！');
        // 	}
        // }
        if (Utils.isApp()) {
            return baseNativeJs("topay", Object.assign({ id: ref_id, type: ref_type }, buyCycle), Object.assign({ ref_id, ref_type }, buyCycle));
        }
        else {
            Utils.redirectPay(ref_id, ref_type, buyCycle);
        }
    }
    /**
     * 应用内部跳转
     * @param router
     */
    gorouter(router, iosRouter) {
        return baseNativeJs('gorouter', { router }, { router: iosRouter });
    }
    baseShare(name, sharevalue, footer = true) {
        let { siteUrl, url, titleUrl, parameter, title, imageUrl, desc, shareType, site } = sharevalue;
        imageUrl = imageUrl || "https://m2.0606.com.cn/assets/images/logo.png";
        shareType = shareType || "all";
        site = site || "海纳智投";
        function replacePos(strObj, start, end, replacetext) {
            var str = strObj.substr(0, start) + replacetext + strObj.substring(end, strObj.length);
            return str;
        }
        function relaceUrl(url) {
            let start = url.indexOf("access_token");
            let isAccessToken = start > -1;
            let end = url.indexOf("&", start);
            let isMore = end > -1;
            if (isMore && isAccessToken) {
                return replacePos(url, start, end, "access_token=");
            }
            else if (isAccessToken) {
                return url.replace(/access_token=[\s\S]*/, 'access_token=');
            }
            return url;
        }
        if (Utils.isApp()) {
            if (footer) {
                if (window.location.search && window.location.search !== '') {
                    siteUrl = siteUrl + '&innerapp=hayner';
                    url = url + '&innerapp=hayner';
                    titleUrl = titleUrl + '&innerapp=hayner';
                }
                else {
                    siteUrl = siteUrl + '?innerapp=hayner';
                    url = url + '?innerapp=hayner';
                    titleUrl = titleUrl + '?innerapp=hayner';
                }
            }
            sharevalue = Object.assign({}, sharevalue, {
                siteUrl: relaceUrl(siteUrl),
                url: relaceUrl(url),
                titleUrl: relaceUrl(titleUrl),
                parameter: JSON.stringify(parameter),
                imageUrl,
                shareType,
                site
            });
            baseNativeJs(name, { sharevalue });
        }
        else if (Utils.isWx()) {
            try {
                const mywx = new WXClass();
                mywx.init(encodeURIComponent(location.href.split('#')[0])).then(() => {
                    mywx.wxshare({
                        title,
                        desc,
                        link: url,
                        imgUrl: imageUrl
                    });
                });
            }
            catch (error) {
                console.error("微信分享出错");
            }
        }
        else if (Utils.isQQ()) {
            try {
                window["setShareInfo"]({
                    title,
                    summary: desc,
                    pic: imageUrl,
                    url: url // 分享链接
                });
            }
            catch (error) {
                console.error("QQ分享出错");
            }
        }
    }
    /**
     * 分享到微信
     * @param shareValue
     * @param desc 内容描述
     * @param imageUrl img的url
     * @param shareType 分享的类型
     * @param site 网站名字
     * @param siteUrl 网站链接
     * @param title 分享标题
     * @param titleUrl 标题的url
     * @param url 本身的链接
     */
    shareWeiXin(sharevalue, footer) {
        this.baseShare('shareWeiXin', sharevalue, footer);
    }
    /**
     * 分享到朋友圈
     * @param shareFriends
     * @param desc 内容描述
     * @param imageUrl img的url
     * @param shareType 分享的类型
     * @param site 网站名字
     * @param siteUrl 网站链接
     * @param title 分享标题
     * @param titleUrl 标题的url
     * @param url 本身的链接
     */
    shareFriends(sharevalue, footer) {
        this.baseShare('shareFriends', sharevalue, footer);
    }
    /**
     * 调用移动端的分享
     * @param shareFriends
     * @param desc 内容描述
     * @param imageUrl img的url
     * @param shareType 分享的类型
     * @param site 网站名字
     * @param siteUrl 网站链接
     * @param title 分享标题
     * @param titleUrl 标题的url
     * @param url 本身的链接
     */
    share(sharevalue, footer) {
        this.baseShare('share', sharevalue, footer);
    }
    /**
     *
     * @param product_id 适当性检测
     * @param risk_score
     */
    ihanerFSP(product_id, risk_score) {
        baseNativeJs('ihanerFSP', { product_id, risk_score });
    }
    /**
     *
     * @param 跳转
     */
    baseGoRouter(host, param) {
        const router = {
            host: host,
            param: typeof param === 'string' ? param : Object.keys(param).map((key) => `${key}=${param[key]}`).join("&")
        };
        const IOSRouter = {
            data: param
        };
        const IOSRouterss = `${host}param=${JSON.stringify(IOSRouter)}`;
        this.gorouter(JSON.stringify(router), IOSRouterss);
    }
    /**
     *
     * @param stocknSid 股票id
     */
    gotoStockDetailPage(stocknSid) {
        this.baseGoRouter('ihayner://stockdetail:11001?', stocknSid);
    }
    /**
     *
     * @param router跳转战队直播室
     * ihayner://homelive:10060?param={"data":"{\"liveRoomType\":0,\"roomId\":\"71314e37e7c790c95af57bcb\",\"serviceId\":\"558a3e9025ea5de341f5203d\",\"type\":0}","defaultParam":"2"}
     */
    gotoLiveDetailPage(liveType, roomId, serviceId) {
        const router = {
            host: `ihayner://homelive:10060?`,
            param: {
                data: {
                    roomId: roomId,
                    serviceId
                },
                defaultParam: liveType
            }
        };
        const IOSRouter = {
            data: {
                liveType: liveType,
                roomId: roomId,
                serviceId: serviceId
            },
            defaultParam: "2"
        };
        const IOSRouterss = `ihayner://homelive:10060?param=${JSON.stringify(IOSRouter)}`;
        this.gorouter(JSON.stringify(router), IOSRouterss);
    }
    /**
     *
     * @param router跳转直播列表
     */
    gotoLiveListPage() {
        this.baseGoRouter('ihayner://livelist_activity:10061?', "");
    }
    /**
     *
     * @param 跳转banner页
     */
    gotoBanner(bannerdata) {
        baseNativeJs('banner', { bannerdata });
    }
    /**
     * 跳转首页
     */
    gotoHome() {
        this.baseGoRouter('ihayner://homepage:10002?', "");
    }
    /**
     * 跳转交易
     */
    tradeStock(stock_name, stock_code, buyorsell) {
        baseNativeJs('tradeStock', { stock_name, stock_code, buyorsell });
    }
    /**
     * 点击放大图片
     */
    imageClick(img_url) {
        baseNativeJs("imgClick", { img_url });
    }
    /**
     * 字体缩放
     */
    changeBodyFontSize(isshow, callback) {
        window['changeBodyFontSize'] = function (result) {
            // delete window['changeBodyFontSize']
            try {
                result = result;
            }
            catch (e) {
                console.log('出错！');
            }
            if (result) {
                callback(result);
                // window['userInfo'].access_token=result;
            }
        };
        baseNativeJs("changeBodyFontSize", { isshow });
    }
    /**
     * 自选股添加和删除
     * @param stock_method 添加还是删除", （boolean值 默认false 删除）
     * @param stock_code 股票代码
     */
    optional(stock_method, stock_code) {
        baseNativeJs("optional", { stock_method, stock_code });
    }
    /**
     * 获取埋点头
     */
    getRequestHead(callback) {
        window['getRequestHead'] = function (result) {
            delete window['getRequestHead'];
            try {
                if (typeof result === 'string') {
                    result = JSON.parse(result);
                }
                result = result;
            }
            catch (e) {
                console.log('出错！');
            }
            if (result) {
                callback(result);
            }
        };
        if (Utils.isApp()) {
            return baseNativeJs("getRequestHead");
        }
        else {
            //暂时这样处理
            return callback({
                headEvents: window['HNtrack'].getHeadEvent
            });
        }
    }
    getPayRequestHead(callback) {
        window['getPayRequestHead'] = function (result) {
            delete window['getPayRequestHead'];
            try {
                if (typeof result === 'string') {
                    result = JSON.parse(result);
                }
                result = result;
            }
            catch (e) {
                console.log('出错！');
            }
            if (result) {
                callback(result);
            }
        };
        if (Utils.isApp()) {
            return baseNativeJs("getPayRequestHead");
        }
        else {
            //暂时这样处理
            return callback({
                headEvents: window['HNtrack'].getHeadEvent
            });
        }
    }
    /**
     * 拨打电话
     */
    callphone(title, phone) {
        return baseNativeJs("callphone", { title, phone });
    }
    //返回上一级
    goBack() {
        return baseNativeJs("backtofinish");
    }
    //ios改变状态栏颜色
    statusBarStyle(style) {
        if (Utils.isIOS()) {
            return baseNativeJs("statusBarStyle", { style });
        }
    }
    gotoapp() {
        if (!Utils.isApp()) {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.sz.nniu';
        }
    }
    cangoback(goback) {
        baseNativeJs("cangoback", { goback });
    }
    /**
     * 控制改变toolbar颜色与标题
     * @param title
     * @param color
     */
    toolbar(title, color) {
        baseNativeJs("toolbar", { title, color });
    }
    /**
     * 通知原生请求失败
     */
    requestfailed() {
        baseNativeJs("requestfailed");
    }
    /**
     *
     * @param user_id 开户
     * @param url
     */
    opAccount(user_id, url) {
        baseNativeJs("opAccount", { user_id, url });
    }
    /**
     *
     * @param user_id 交易
     * @param company_id
     */
    trade(user_id, company_id) {
        baseNativeJs("trade", { user_id, company_id });
    }
    bindAccount(user_id, company_id) {
        baseNativeJs("bindAccount", { user_id, company_id });
    }
    /**
     * 唤起支付sdk
     * @param order_id
     * @param prepay
     * @param paymethod 1是微信，2是支付宝，3线下支付
     */
    getPayInfo(messageBody, callback) {
        window['getPayInfo'] = function (result) {
            delete window['getPayInfo'];
            try {
                callback(result);
            }
            catch (e) {
                console.log('出错！');
            }
        };
        let { paymethod, prepay } = messageBody;
        if (!Utils.isApp() || Utils.isIOS()) {
            // callback(true)
            if (paymethod === 2) {
                let ali = `https://openapi.alipay.com/gateway.do?${prepay}`;
                location.href = ali;
            }
            else if (paymethod === 1) {
                let prepayobj = JSON.parse(prepay);
                location.href = prepayobj.mweb_url;
            }
        }
        else {
            baseNativeJs("getPayInfo", { messageBody });
        }
    }
    /**
     * 直接调起适当性认证
     */
    startFsp(productId, riskScore, order_id) {
        if (Utils.isApp()) {
            baseNativeJs("startFsp", { productId, riskScore, order_id });
        }
        else {
            Utils.redirectFsp(productId, riskScore, order_id);
        }
    }
    /**
     * 线下支付提示
     */
    offlinePayAlertMessage() {
        baseNativeJs("alertMessage");
    }
    /**
     * 海纳适当性页面 需要提示用户拨打电话时进行的弹框
     * @param phone 手机号码
     * @param content 显示内容
     * @param title 标题
     */
    callPhoneAlert(phone, content, title) {
        baseNativeJs("callPhoneAlert", { phone, content, title });
    }
    /**
     * 当购买业务时，如果用户不符合当前产品，弹框提示重新做或者打电话
     * @param phone
     * @param content
     * @param title
     * @param callback
     */
    riskAlert(phone, content, title, callback) {
        window['riskAlert'] = function (result) {
            delete window['riskAlert'];
            try {
                callback(result);
            }
            catch (e) {
                console.log('riskAlert出错！');
            }
        };
        baseNativeJs("riskAlert", { phone, content, title });
    }
    /**
     * 回调原声通知原声实名认证已经完成
     * @param name
     */
    authSuccess(name) {
        baseNativeJs("authSuccess", { name });
    }
    /**
     * 回调风险测评成功
     * @param type_string 类型的名称 例如:稳健性，激进型
     * @param risk_score 风险测评的分数
     */
    riskSuccess(type_string, risk_score) {
        baseNativeJs("riskSuccess", { type_string, risk_score });
    }
    /** 通知原声app整个开通流程完毕 */
    confirmationSuccess() {
        baseNativeJs("confirmationSuccess");
    }
    /**
     * 通知原声app适当性中途意外出错
     * @param err_code 后台返回的错误码
     * @param err_msg 接口返回的错误描述
     * @param fsp_type 1实名，2风险，3签署协议
     */
    fspFailed(err_code, err_msg, fsp_type) {
        baseNativeJs("fspFailed", { err_code, err_msg, fsp_type });
    }
    /** h5红包关闭按钮 */
    closePoup() {
        baseNativeJs('closePoup');
    }
    /**
     * 调用原生发送验证码
     * @param phone 手机号
     */
    sendCodeToH5(phone) {
        baseNativeJs('sendCodeToH5', { phone });
    }
    /**
     * h5通知app快速登录
     * @param phone  手机号
     * @param code 验证码
     */
    hbLogin(phone, code, callback) {
        window['hbLogin'] = function (result) {
            delete window['hbLogin'];
            try {
                callback(result);
            }
            catch (e) {
                console.log('hbLogin出错！');
            }
        };
        baseNativeJs('hbLogin', { phone, code });
    }
    getHomeActivityData(callback) {
        window['getHomeActivityData'] = function (result) {
            delete window['getHomeActivityData'];
            try {
                callback(result);
            }
            catch (e) {
                console.log('getHomeActivityData出错！');
            }
        };
        baseNativeJs('getHomeActivityData');
    }
    /**
     * 关闭容器
     */
    controlFinish() {
        baseNativeJs("controlFinish");
    }
    /**
     * 原生goback,返回上一页，有则返回，没有则关闭容器
     */
    appBack() {
        baseNativeJs("appBack");
    }
    /**
     * ios通知原生支付页面进入支付
     */
    webPSucceeded() {
        baseNativeJs("webPSucceeded");
    }
    /**
     * 调用原生的下拉刷新
     */
    pullRefresh(pullRefresh, callback) {
        window['pullRefresh'] = function () {
            if (callback) {
                callback();
            }
        };
        baseNativeJs("pullRefresh", { pullRefresh });
    }
    /**
     * 原生页面返回的时候，回调方法
     */
    appBackReload(appBackReload, callback) {
        window['appBackReload'] = function () {
            if (callback) {
                callback();
            }
        };
        baseNativeJs("appBackReload", { appBackReload });
    }
}
let intance = new NativeJs();
export default intance;
if (window) {
    window["NativeJs"] = new NativeJs();
}
