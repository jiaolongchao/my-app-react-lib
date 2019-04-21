"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Storage = /** @class */ (function () {
    function Storage() {
    }
    Storage.prototype.get = function (key, json) {
        try {
            var result = window.localStorage.getItem(key);
            if (json) {
                result = JSON.parse(result);
            }
            return result;
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    };
    Storage.prototype.set = function (key, value, isjson) {
        try {
            return window.localStorage.setItem(key, isjson ? value : JSON.stringify(value));
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    };
    Storage.prototype.getWithExpire = function (key) {
        try {
            var data = void 0;
            data = window.localStorage.getItem(key);
            if (data && data !== null) {
                data = JSON.parse(data);
                var start = data.start;
                var expire = data.expire;
                var end = new Date().getTime() / 1000;
                if (end - start >= expire) {
                    window.localStorage.removeItem(key);
                    return null;
                }
                else {
                    return data;
                }
            }
            return data;
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    };
    Storage.prototype.setWithExpire = function (key, value, expire) {
        try {
            var data = {
                expire: expire,
                start: new Date().getTime() / 1000,
                value: value
            };
            return window.localStorage.setItem(key, JSON.stringify(data));
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    };
    Storage.prototype.remove = function (key) {
        try {
            return window.localStorage.removeItem(key);
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    };
    Storage.prototype.clear = function () {
        try {
            return window.localStorage.clear();
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    };
    return Storage;
}());
exports.Storage = Storage;
exports.default = new Storage();
// Fake localStorage implementation. 
// Mimics localStorage, including events. 
// It will work just like localStorage, except for the persistant storage part. 
