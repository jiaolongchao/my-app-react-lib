import axios from 'axios'
import * as wepyAxiosAdapter from 'wepy-plugin-axios/dist/adapter'


import HttpRequestConfig from './HttpRequestConfig'
import NativeJs from '../native/NativeJs'
export  class HttpClient {


    public instance:any

    constructor() {
        // adapter 的初始化一定要在任何其它的 axios.create 之前执行
        const adapter = wepyAxiosAdapter(axios)

        this.instance = axios.create({
            adapter: adapter      // 此属性为可以在小程序中使用 axios 的关键
            // ...其它属性
        })
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

    interceptors = {
        request(success: Function, errorfunc: Function) {
            this.instance.interceptors.request.use(function (config) {
                return success(config)
            }, function (error) {
                return errorfunc(error)
            })
        },
        response(success: Function, errorfunc: Function) {
            this.instance.interceptors.response.use(function (config) {
                return success(config)
            }, function (error) {
                return errorfunc(error)
            })
        }
    }

    get(domainName: string, url: string, config?: HttpRequestConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            this.instance.get(`${domainName}${url}`, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data)
                } else {
                    reject(res.data)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }

    post(domainName: string, url: string, data?: any, config?: HttpRequestConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            this.instance.post(`${domainName}${url}`, data, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data)
                } else {
                    reject(res.data)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }

    put(domainName: string, url: string, data?: any, config?: HttpRequestConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            this.instance.put(`${domainName}${url}`, data, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data)
                } else {
                    reject(res.data)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }

    delete(domainName: string, url: string, config?: HttpRequestConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            this.instance.delete(`${domainName}${url}`, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data)
                } else {
                    reject(res.data)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }


}

export default new HttpClient()