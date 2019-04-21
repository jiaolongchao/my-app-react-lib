"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Storage_1 = require("../storage/Storage");
var NativeJs_1 = require("../native/NativeJs");
var Utils = /** @class */ (function () {
    function Utils() {
        this.phoneRegex = {
            'ar-dz': /^(\+?213|0)(5|6|7)\d{8}$/,
            'ar-sy': /^(!?(\+?963)|0)?9\d{8}$/,
            'ar-sa': /^(!?(\+?966)|0)?5\d{8}$/,
            'en-us': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
            'cs-cz': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
            'de-de': /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
            'da-dk': /^(\+?45)?(\d{8})$/,
            'el-gr': /^(\+?30)?(69\d{8})$/,
            'en-au': /^(\+?61|0)4\d{8}$/,
            'en-gb': /^(\+?44|0)7\d{9}$/,
            'en-hk': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
            'en-in': /^(\+?91|0)?[789]\d{9}$/,
            'en-nz': /^(\+?64|0)2\d{7,9}$/,
            'en-za': /^(\+?27|0)\d{9}$/,
            'en-zm': /^(\+?26)?09[567]\d{7}$/,
            'es-es': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
            'fi-fi': /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
            'fr-fr': /^(\+?33|0)[67]\d{8}$/,
            'he-il': /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,
            'hu-hu': /^(\+?36)(20|30|70)\d{7}$/,
            'it-it': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
            'ja-jp': /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
            'ms-my': /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
            'nb-no': /^(\+?47)?[49]\d{7}$/,
            'nl-be': /^(\+?32|0)4?\d{8}$/,
            'nn-no': /^(\+?47)?[49]\d{7}$/,
            'pl-pl': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
            'pt-br': /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
            'pt-pt': /^(\+?351)?9[1236]\d{7}$/,
            'ru-ru': /^(\+?7|8)?9\d{9}$/,
            'sr-rs': /^(\+3816|06)[- \d]{5,9}$/,
            'tr-tr': /^(\+?90|0)?5\d{9}$/,
            'vi-vn': /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
            'zh-cn': /^(\+?0?86\-?)?1[345789]\d{9}$/,
            'zh-tw': /^(\+?886\-?|0)?9\d{8}$/
        };
        this.CheckIdCard = {
            //Wi 加权因子 Xi 余数0~10对应的校验码 Pi省份代码
            Wi: [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
            Xi: [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2],
            Pi: [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 91],
            //检验18位身份证号码出生日期是否有效
            //parseFloat过滤前导零，年份必需大于等于1900且小于等于当前年份，用Date()对象判断日期是否有效。
            brithday18: function (sIdCard) {
                var year = parseFloat(sIdCard.substr(6, 4));
                var month = parseFloat(sIdCard.substr(10, 2));
                var day = parseFloat(sIdCard.substr(12, 2));
                var checkDay = new Date(year, month - 1, day);
                var nowDay = new Date();
                if (1900 <= year && year <= nowDay.getFullYear() && month == (checkDay.getMonth() + 1) && day == checkDay.getDate()) {
                    return true;
                }
                return false;
            },
            //检验15位身份证号码出生日期是否有效
            brithday15: function (sIdCard) {
                var year = parseFloat(sIdCard.substr(6, 2));
                var month = parseFloat(sIdCard.substr(8, 2));
                var day = parseFloat(sIdCard.substr(10, 2));
                var checkDay = new Date(year, month - 1, day);
                if (month == (checkDay.getMonth() + 1) && day == checkDay.getDate()) {
                    return true;
                }
                ;
                return false;
            },
            //检验校验码是否有效
            validate: function (sIdCard) {
                var aIdCard = sIdCard.split("");
                var sum = 0;
                for (var i = 0; i < this.Wi.length; i++) {
                    sum += this.Wi[i] * aIdCard[i]; //线性加权求和
                }
                ;
                var index = sum % 11; //求模，可能为0~10,可求对应的校验码是否于身份证的校验码匹配
                if (this.Xi[index] == aIdCard[17].toUpperCase()) {
                    return true;
                }
                ;
                return false;
            },
            //检验输入的省份编码是否有效
            province: function (sIdCard) {
                var p2 = sIdCard.substr(0, 2);
                for (var i = 0; i < this.Pi.length; i++) {
                    if (this.Pi[i] == p2) {
                        return true;
                    }
                }
                return false;
            }
        };
        $(document).off("click");
        $(document).on("click", "[data-stockclick]", function (e) {
            NativeJs_1.default.gotoStockDetailPage($(this).text());
        });
    }
    Utils.prototype.UUID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
    Utils.prototype.getQuertString = function (key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        var r = location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return null;
    };
    Utils.prototype.isApp = function () {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('hayner') > 1 || window['haina'];
    };
    Utils.prototype.isIOS = function () {
        return navigator.appVersion.match(/iphone|iPad|iPod|iOS/gi);
    };
    Utils.prototype.isAndroid = function () {
        return navigator.appVersion.match(/android/gi);
    };
    Utils.prototype.isPhone = function (phone) {
        return this.phoneRegex[navigator.language.toLowerCase()].test(phone.replace(/\s+/g, ""));
    };
    Utils.prototype.getRealByFontSize = function (value) {
        var baseFontSize = window['baseFontSize_haina'];
        var fontSize = Number.parseFloat(document.documentElement.style.fontSize);
        return value * (fontSize / baseFontSize);
    };
    Utils.prototype.setDocumentTitle = function (title) {
        document.title = title;
        if (this.isIOS() && !this.isApp()) {
            console.log('ios_in');
            var iframe_1 = document.createElement('iframe');
            iframe_1.style.cssText = 'display: none; width: 0; height: 0;';
            iframe_1.src = 'about:blank';
            var listener_1 = function () {
                setTimeout(function () {
                    iframe_1.removeEventListener('load', listener_1);
                    setTimeout(function () {
                        document.body.removeChild(iframe_1);
                    }, 0);
                }, 0);
            };
            iframe_1.addEventListener('load', listener_1);
            document.body.appendChild(iframe_1);
        }
    };
    Utils.prototype.loadOutJS = function (jsurl, async) {
        if (async === void 0) { async = false; }
        var script = document.createElement("script");
        script.type = 'text/javascript';
        script.src = jsurl;
        script.async = async;
        document.body.appendChild(script);
    };
    Utils.prototype.isWx = function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('micromessenger') < 0) {
            return false;
        }
        else {
            return true;
        }
    };
    Utils.prototype.isQQ = function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/QQ/ig)) {
            return true;
        }
        return false;
    };
    Utils.prototype.isJDJR = function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/jdjr/ig)) {
            return true;
        }
        return false;
    };
    Utils.prototype.IDCardVerify = function (idNo, successCallback, errCallback) {
        var sIdCard = idNo && idNo.replace(/^\s+|\s+$/g, "") || '';
        if (sIdCard.match(/^\d{14,17}(\d|X)$/gi) == null) {
            var info = { code: 1000, errMsg: '身份证号码须为18位' };
            try {
                if (errCallback) {
                    if (typeof errCallback === "function") {
                        return errCallback(info);
                    }
                    else {
                        return info;
                    }
                }
                else {
                    return false;
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else if (sIdCard.length == 18) {
            if (this.CheckIdCard.province(sIdCard) && this.CheckIdCard.brithday18(sIdCard) && this.CheckIdCard.validate(sIdCard)) {
                var info = { code: 200, errMsg: '身份证号码合法' };
                try {
                    if (successCallback) {
                        if (typeof successCallback === "function") {
                            return successCallback(info);
                        }
                        else {
                            return info;
                        }
                    }
                    else {
                        return true;
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
            else {
                var info = { code: 1001, errMsg: '姓名与身份证号码不匹配' };
                try {
                    if (errCallback) {
                        if (typeof errCallback === "function") {
                            return errCallback(info);
                        }
                        else {
                            return info;
                        }
                    }
                    else {
                        return false;
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        } /*else if(sIdCard.length==15){
            if (Utils.CheckIdCard.province(sIdCard)&&Utils.CheckIdCard.brithday15(sIdCard)) {
                let info = {code:200,errMsg:'身份证号码合法'};
                try{
                    if(successCallback){
                        if(typeof successCallback === "function"){
                            return successCallback(info);
                        }else{
                            return info;
                        }
                    }else {
                        return true;
                    }
                }catch (err){
                    console.log(err);
                }
            }else {
                let info = {code:1001,errMsg:'请输入有效的身份证号码'};
                try{
                    if(errCallback){
                        if(typeof errCallback === "function"){
                            return errCallback(info);
                        }else{
                            return info;
                        }
                    }else {
                        return false;
                    }
                }catch (err){
                    console.log(err);
                }
            }
        }*/
    };
    Utils.prototype.isChineseName = function (name) {
        var regName = /^[\u4e00-\u9fa5]{2,13}$/;
        if (!regName.test(name)) {
            return false;
        }
        return true;
    };
    /**
     * 重定向到登陆页面
     */
    Utils.prototype.redirectLogin = function () {
        Storage_1.default.remove("localstorage_login");
        window["webviewHistory"].push('/login');
    };
    Utils.prototype.redirectJDJRLogin = function () {
    };
    Utils.prototype.redirectFsp = function (productId, riskScore, order_id) {
        window["webviewHistory"].push("/propernature?page=0&product_id=" + productId + "&order_id=" + order_id);
    };
    Utils.prototype.redirectPay = function (ref_id, ref_type, buyCycle) {
        var num = buyCycle.num, timeType = buyCycle.timeType, serviceType = buyCycle.serviceType, isExclusive = buyCycle.isExclusive;
        var url = "/pay?ref_id=" + ref_id + "&ref_type=" + ref_type + "&num=" + num + "&timeType=" + timeType + "&serviceType=" + (serviceType ? serviceType : 0) + "&isExclusive=" + (isExclusive ? isExclusive : 0);
        window["webviewHistory"].push(url);
    };
    /**
     * 自动给股票代码加跳转事件
     */
    Utils.prototype.textOfStockcodeOnClick = function (text) {
        // (((002|000|300|600)[\d]{3})|60[\d]{4})
        // ((002|000|300|600|601|603|60[\d]{1})[\d]{3})
        text = text.replace(/((002|000|300|600|601|603|60[\d]{1})[\d]{3})/, function (match, param1) {
            var astock = "<a class=\"stockcode\" data-stockclick=\"" + match + "\">" + match + "</a>";
            return astock;
        });
        return text;
    };
    Utils.prototype.getAppVersion = function () {
        if (this.isApp()) {
            var ua = navigator.userAgent.toLowerCase();
            var version = ua.match(/hnversion[\d].[\d].[\d]/ig);
            if (version) {
                return version[0];
            }
            return false;
        }
        else {
            return window['haina_version'];
        }
    };
    return Utils;
}());
exports.Utils = Utils;
exports.default = new Utils();
