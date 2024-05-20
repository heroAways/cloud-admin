import request from "@/utils/request";
import type { ParamsUserListType, ResponseUserListType, UserEditParamsType, UserParamsType, UserPassParamsType } from "../Types/userType";

// 用户列表接口
export const userListApi = (paramsUserList :ParamsUserListType) => {
    return request<ResponseUserListType>('/system/user/search','POST',paramsUserList)
}
// 删除用户
export const deleteUserApi = (id:number) => {
    return request(`/system/user/${id}`,'DELETE')
}
// 添加用户
export const addUserApi = (userParams:UserParamsType) => {
    return request('/system/user','POST',userParams)
}
// 编辑用户
export const editUserApi = (userParams:UserEditParamsType) => {
    return request('/system/user','PUT',userParams)
}
// 修改密码
export const changePasswordApi = (userPassParams:UserPassParamsType) => {
    return request('/system/user/password','PUT',userPassParams)
}