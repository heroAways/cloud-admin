import request from "@/utils/request";
import type { ParamsRoleEditType, ParamsRoleListType, ResponseRoleListType, paramsRoleAddType } from "@/api/Types/roleType";
// 获取角色列表
export const getRoleListApi = (paramsRoleList:ParamsRoleListType)=> {
    return request<ResponseRoleListType>("/system/role/search", "POST", paramsRoleList);
}
// 删除角色接口
export const deleteRoleApi = (id:number)=> {
    return request(`/system/role/${id}`, "DELETE");
}
// 添加角色接口
export const addRoleApi = (paramsRoleAdd:paramsRoleAddType)=> {
    return request("/system/role", "POST", paramsRoleAdd);
}

// 编辑角色接口
export const editRoleApi = (paramsRoleEdit:ParamsRoleEditType) => {
    return request("/system/role", "PUT", paramsRoleEdit);
}

// 获取选中数据的id的接口
export const getIdsByGetApi = (id:number | string) => {
    return request(`/role/${id}/menu/ids`, "GET");
}

// 提交接口
export const submitApi = (id:string | number,submitParams : string[]) => {
    return request(`/system/role/${id}/menu/ids`,'POST',submitParams)
}