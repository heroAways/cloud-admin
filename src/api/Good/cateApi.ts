import request from "@/utils/request";
import type { CateParamsType, ParamsEditCateType, ResopnseCateType, paramsAddCateType } from "../Types/GoodType/cateType";

// 商品分类接口
export const getCateListApi = (cateParams:CateParamsType) => {
    return request<ResopnseCateType>("/goods/category/search", "POST",cateParams);
}

// 删除商品分类
export const deleteCateApi = (id:number) => {
    return request(`/goods/category/${id}`, "DELETE");
}

// 新增商品接口
export const addCateApi = (paramsAddCate:paramsAddCateType) => {
    return request("/goods/category", "POST", paramsAddCate);
}
// 修改商品分类接口
export const editCateApi = (paramsEditCate:ParamsEditCateType) => {
    return request("/goods/category", "PUT", paramsEditCate);
}