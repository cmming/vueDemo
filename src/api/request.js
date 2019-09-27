import axios from 'axios'

import store from '@/store/index'

// import {responseMsgInterceptors} from './interceptors'

// import responseMsgInterceptorHandle from './interceptors/responseMsgInterceptor'
import { responseMsgInterceptorHandle, tokenHandler, cancelRequest } from './interceptors/index'


const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api的base_url
    // baseURL: 'http://192.168.50.58/api', // api的base_url
    // baseURL: 'http://api.chenming.club/api',
    // baseURL: 'http://192.168.50.58:81/api',
    timeout: 15000, // request timeout
    // withCredentials: true // 选项表明了是否是跨域请求
})


service.interceptors.request.use(config => {
    store.dispatch('showLoading')
    config = tokenHandler(config, store)
    cancelRequest(store, config)
    return config
}, error => {
    store.dispatch('hideLoading')
    return Promise.reject(error);
})

service.interceptors.response.use(response => {
    // console.log(process.env)
    store.dispatch('hideLoading')
        // 数据转换器

    responseMsgInterceptorHandle(response)
    return response;
}, error => {
    if (axios.isCancel(error)) {
        // 为了终结promise链 就是实际请求 不会走到.catch(rej=>{});这样就不会触发错误提示之类了。
        return new Promise(() => {});
    } else {
        store.dispatch('hideLoading')
        responseMsgInterceptorHandle(error.response)
        return Promise.reject(error.response);
    }

})

export default service