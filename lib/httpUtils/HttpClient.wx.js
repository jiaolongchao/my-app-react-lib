"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var wepyAxiosAdapter = require("wepy-plugin-axios/dist/adapter");
var HttpClient = /** @class */ (function () {
    function HttpClient() {
        this.interceptors = {
            request: function (success, errorfunc) {
                this.instance.interceptors.request.use(function (config) {
                    return success(config);
                }, function (error) {
                    return errorfunc(error);
                });
            },
            response: function (success, errorfunc) {
                this.instance.interceptors.response.use(function (config) {
                    return success(config);
                }, function (error) {
                    return errorfunc(error);
                });
            }
        };
        // adapter 的初始化一定要在任何其它的 axios.create 之前执行
        var adapter = wepyAxiosAdapter(axios_1.default);
        this.instance = axios_1.default.create({
            adapter: adapter // 此属性为可以在小程序中使用 axios 的关键
            // ...其它属性
        });
        // axios.interceptors.request.use(function (config) {
        //     // Do something before request is sent
        //     // if (window['HNtrack'].getHeadEvent) {
        //     //     config = Object.assign(config, {
        //     //         headers: {
        //     //             "uuid": window['HNtrack'].getHeadEvent
        //     //         }
        //     //     })
        //     //     console.log("requestconfig", config)
        //     //     return config
        //     // } else {
        //     //     // NativeJs.getRequestHead((result) => {
        //     //     //     config = Object.assign(config, {
        //     //     //         headers: {
        //     //     //             "uuid": result.headEvents
        //     //     //         }
        //     //     //     })
        //     //     //     console.log("requestconfig", config)
        //     //     //     return config
        //     //     // })
        //     //     return config
        //     // }
        //     return config
        // }, function (error) {
        //     // Do something with request error
        //     return Promise.reject(error);
        // });
        // axios.interceptors.response.use(function (response) {
        //     if (response.data.code === 200) {
        //         return response;
        //     } else if (response.data.code === 40010 
        //         || response.data.code === 401 
        //         || response.data.code === 40019
        //         || response.data.code === 42362
        //         || response.data.code === 42318) {
        //         //java后台
        //         NativeJs.refreshtoken_load()
        //         return Promise.reject(response.data)
        //     } else {
        //         return Promise.reject(response.data)
        //     }
        // }, function (error) {
        //     return Promise.reject(error)
        // });
    }
    HttpClient.prototype.get = function (domainName, url, config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.instance.get("" + domainName + url, config).then(function (res) {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    HttpClient.prototype.post = function (domainName, url, data, config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.instance.post("" + domainName + url, data, config).then(function (res) {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    HttpClient.prototype.put = function (domainName, url, data, config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.instance.put("" + domainName + url, data, config).then(function (res) {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    HttpClient.prototype.delete = function (domainName, url, config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.instance.delete("" + domainName + url, config).then(function (res) {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
exports.default = new HttpClient();
