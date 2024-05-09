import request from "@/utils/request";
export const loginApi = ()=>{
    return request('/auth/token', 'POST', {username:'15565775937', password:'123456'})
} 