import request from "@/utils/request";
import type { GoodAddParamsType, GoodListParamsType, ParamsGoodStatusType, ResponseGoodsListType } from "../Types/GoodType/ListType";

// 获取商品列表

export const getGoodListApi = (goodListParams: GoodListParamsType) => {
    return request<ResponseGoodsListType>("/goods/search", "POST", goodListParams);
};

// 新增商品

export const addGoodApi = (goodAddParams: GoodAddParamsType) => {
    return request("/goods", "POST", goodAddParams);
};

// 删除商品
export const deleteGoodApi = (id: number) => {
    return request(`/goods/${id}`, "DELETE");
};

// 商品状态接口
export const changeGoodStatusApi = (paramsGoodStatus:ParamsGoodStatusType) => {
    return request('/goods/status', "PUT",paramsGoodStatus);
};