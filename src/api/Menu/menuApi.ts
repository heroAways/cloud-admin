import request from "@/utils/request";
import type { ResponseDataType, ResposeAddMenuType, SearchParamsType, selectMenuTpye } from '../Types/menuType'
export const getMenuListApi = (SearchParams?:SearchParamsType)=> {
    return request<ResponseDataType[]>("/system/menu/search", "post",SearchParams);
}
// 删除菜单接口
export const deleteMenuApi = (id:number | string)=> {
    return request(`/system/menu/${id}`, "DELETE");
}

export const addMenuApi = (data:ResposeAddMenuType)=> {
    return request<ResposeAddMenuType>("/system/menu", "POST", data);
}

export const selectMenuApi = ()=> {
    return request<selectMenuTpye>('/system/menu/select', "GET");
}

// 修改接口
export const updateMenuApi = (data:ResposeAddMenuType)=> {
    return request<ResposeAddMenuType>('/system/menu', "PUT", data);
}