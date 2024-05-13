import request from "@/utils/request";
import type { ResponseDataType, SearchParamsType } from '../Types/menuType'
export const getMenuListApi = (SearchParams?:SearchParamsType)=> {
    return request<ResponseDataType[]>("/system/menu/search", "post",SearchParams);
}