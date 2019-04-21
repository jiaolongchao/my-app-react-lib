"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Storage = /** @class */ (function () {
    function Storage() {
    }
    Storage.prototype.get = function (key, json) {
        try {
            var result = wx.getStorageSync(key);
            if (json) {
                result = JSON.parse(result);
            }
            return result ? result : null;
        }
        catch (err) {
            wx.showToast({
                title: '不支持本地缓存'
            });
        }
    };
    Storage.prototype.set = function (key, value, isjson) {
        try {
            return wx.setStorageSync(key, isjson ? value : JSON.stringify(value));
        }
        catch (err) {
            wx.showToast({
                title: '不支持本地缓存'
            });
        }
    };
    Storage.prototype.getWithExpire = function (key) {
        try {
            var data = void 0;
            data = wx.getStorageSync(key);
            if (data && data !== null) {
                var start = data.start;
                var expire = data.expire;
                var end = new Date().getTime() / 1000;
                if (end - start >= expire) {
                    wx.removeStorageSync(key);
                    return null;
                }
                else {
                    return data;
                }
            }
            return data ? data : null;
        }
        catch (err) {
            wx.showToast({
                title: '不支持本地缓存'
            });
        }
    };
    Storage.prototype.setWithExpire = function (key, value, expire) {
        try {
            var data = {
                expire: expire,
                start: new Date().getTime() / 1000,
                value: value
            };
            return wx.setStorageSync(key, data);
        }
        catch (err) {
            wx.showToast({
                title: '不支持本地缓存'
            });
        }
    };
    Storage.prototype.remove = function (key) {
        try {
            return wx.removeStorageSync(key);
        }
        catch (err) {
            wx.showToast({
                title: '不支持本地缓存'
            });
        }
    };
    Storage.prototype.clear = function () {
        try {
            return wx.clearStorageSync();
        }
        catch (err) {
            wx.showToast({
                title: '不支持本地缓存'
            });
        }
    };
    return Storage;
}());
exports.Storage = Storage;
exports.default = new Storage();
// Fake localStorage implementation. 
// Mimics localStorage, including events. 
// It will work just like localStorage, except for the persistant storage part. 
