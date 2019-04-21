export class Storage {
    get(key, json) {
        try {
            let result = wx.getStorageSync(key);
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
    }
    set(key, value, isjson) {
        try {
            return wx.setStorageSync(key, isjson ? value : JSON.stringify(value));
        }
        catch (err) {
            wx.showToast({
                title: '不支持本地缓存'
            });
        }
    }
    getWithExpire(key) {
        try {
            let data;
            data = wx.getStorageSync(key);
            if (data && data !== null) {
                let start = data.start;
                let expire = data.expire;
                let end = new Date().getTime() / 1000;
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
    }
    setWithExpire(key, value, expire) {
        try {
            let data = {
                expire,
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
    }
    remove(key) {
        try {
            return wx.removeStorageSync(key);
        }
        catch (err) {
            wx.showToast({
                title: '不支持本地缓存'
            });
        }
    }
    clear() {
        try {
            return wx.clearStorageSync();
        }
        catch (err) {
            wx.showToast({
                title: '不支持本地缓存'
            });
        }
    }
}
export default new Storage();
// Fake localStorage implementation. 
// Mimics localStorage, including events. 
// It will work just like localStorage, except for the persistant storage part. 
