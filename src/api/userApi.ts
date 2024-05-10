import request from "@/utils/request";
export const loginApi = (data:any)=>{
    return request('/auth/token', 'POST', data)
} 
