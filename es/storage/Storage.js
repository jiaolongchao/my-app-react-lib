export class Storage {
    get(key, json) {
        try {
            let result = window.localStorage.getItem(key);
            if (json) {
                result = JSON.parse(result);
            }
            return result;
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    }
    set(key, value, isjson) {
        try {
            return window.localStorage.setItem(key, isjson ? value : JSON.stringify(value));
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    }
    getWithExpire(key) {
        try {
            let data;
            data = window.localStorage.getItem(key);
            if (data && data !== null) {
                data = JSON.parse(data);
                let start = data.start;
                let expire = data.expire;
                let end = new Date().getTime() / 1000;
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
    }
    setWithExpire(key, value, expire) {
        try {
            let data = {
                expire,
                start: new Date().getTime() / 1000,
                value: value
            };
            return window.localStorage.setItem(key, JSON.stringify(data));
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    }
    remove(key) {
        try {
            return window.localStorage.removeItem(key);
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    }
    clear() {
        try {
            return window.localStorage.clear();
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    }
}
export default new Storage();
// Fake localStorage implementation. 
// Mimics localStorage, including events. 
// It will work just like localStorage, except for the persistant storage part. 
