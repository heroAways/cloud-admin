import request from "@/utils/request";
export const loginApi = (data:any)=>{
    return request('/auth/token', 'POST', data)
}
export const logoutApi = ()=>{
    return request('/auth/logout','POST')
}
