import axios, {
    type AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
    type Method
} from "axios";
import {useAuthorStore} from '@/stores/useAuthor'
import { ElLoading } from "element-plus";
const service: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API,
    // baseURL: 'https://mock.mengxuegu.com/mock/6638b8cfcab9671f88bd3125/api',
    timeout: 10000,
});
// 添加请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    ElLoading.service({ fullscreen: true,text:'加载中...' })
    const store = useAuthorStore()
    const token = store.token
    if(token){
        config.headers.Authorization =`Bearer ${token}`
    }
    // 在发送请求之前做些什么
    return config;
}, (error: AxiosError) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    ElLoading.service({ fullscreen: true,text:'加载中...' }).close()
    return response.data;
}, (error: AxiosError) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

type dataType<T = any> = {
    code: number
    message: string
    data: T
}

const request = <T = any>(
    url: string, method: Method = "GET", data?: Object, options?: AxiosRequestConfig
) => {
    return service.request<T, dataType<T>>({
        url: url,
        method,
        [method === "GET" ? "params" : "data"]: data,
        ...options
    })
}

export const get = <T = any>(url: string, data: Object) => {
    return request<T>(url, "GET", data)
}
export const post = <T = any>(url: string, data: Object) => {
    return request<T>(url, "POST", data)
}
export const put = <T = any>(url: string, data: Object) => {
    return request<T>(url, "PUT", data)
}
export const del = <T = any>(url: string, data: Object) => {
    return request<T>(url, "DELETE", data)
}

export default request;