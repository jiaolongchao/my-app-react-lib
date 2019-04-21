export  class Storage {


    get(key: string, json?: boolean): any {
        try {
            let result = wx.getStorageSync(key)
            if (json) {
                result = JSON.parse(result)
            }
            return result?result:null
        } catch (err) {
            wx.showToast({
                title:'不支持本地缓存'
            })
        }
    }

    set(key: string, value: any, isjson?: boolean) {

        try {
            return wx.setStorageSync(key,isjson ? value : JSON.stringify(value))
        } catch (err) {
            wx.showToast({
                title:'不支持本地缓存'
            })
        }
    }

    getWithExpire(key: string): any {
        try {
            let data:any
            data = wx.getStorageSync(key)
            if (data&&data!==null) {

                let start = data.start
                let expire = data.expire
                let end = new Date().getTime()/1000
                if(end - start >= expire) {
                    wx.removeStorageSync(key)
                    return null
                }else {
                    return data
                }
            }
            return data?data:null
        } catch (err) {
            wx.showToast({
                title:'不支持本地缓存'
            })
        }
    }

    setWithExpire(key: string, value: any, expire: number) {


        try {
            let data = {
                expire,
                start:new Date().getTime()/1000,
                value:value
            }
            return wx.setStorageSync(key, data)
        } catch (err) {
            wx.showToast({
                title:'不支持本地缓存'
            })
        }
    }

    remove(key: string) {

        try {
            return wx.removeStorageSync(key)
        } catch (err) {
            wx.showToast({
                title:'不支持本地缓存'
            })
        }
    }

    clear() {

        try {
            return wx.clearStorageSync()
        } catch (err) {
            wx.showToast({
                title:'不支持本地缓存'
            })
        }
    }
}
export default new Storage()
// Fake localStorage implementation. 
// Mimics localStorage, including events. 
// It will work just like localStorage, except for the persistant storage part. 

