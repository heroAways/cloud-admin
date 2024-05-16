import request from "@/utils/request";
import type { ParamsUserListType, ResponseUserListType } from "../Types/userType";

// 用户列表接口
export const userListApi = (paramsUserList :ParamsUserListType) => {
    return request<ResponseUserListType>('/system/user/search','POST',paramsUserList)
}