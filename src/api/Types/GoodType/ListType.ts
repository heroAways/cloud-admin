// 商品列表接口
export interface GoodListParamsType {
    current?: number;
    size?: number;
}

export interface ResponseGoodsListType {
    records: ResponseGoodsListTypeRecord[];
    total: number;
}

export interface ResponseGoodsListTypeRecord {
    address: string;
    brand: string;
    categoryId: number;
    categoryName: string;
    code: number;
    cost: number;
    createTime: string;
    discountPrice: number;
    goodsDetail: string;
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    quickCode: string;
    remark: string;
    score: number;
    sort: number;
    specsName: string;
    status: number;
    stockNum: number;
    unitName: string;
    updateTime: string;
}

// 商品新增类型
export interface GoodAddParamsType {
    address: string;
    brand: string;
    categoryId: number | string;
    code: string;
    cost: number | string;
    discountPrice: number | string;
    goodsDetail: string;
    imageUrl: string;
    name: string;
    price: number | string;
    quickCode: string;
    remark: string;
    score: number | string;
    sort: number | string;
    specsName: string;
    status: number | string;
    stockNum: number | string;
    unitName: string;
}
export interface ParamsGoodStatusType {
    id: number;
    status: number;
}