// 商品分类类型
export interface CateParamsType {
    current: number;
    size: number;
}
export interface ResopnseCateType {
    records: ResopnseCateTypeRecord[];
    total: number;
}

export interface ResopnseCateTypeRecord {
    id: number;
    name: string;
    remark: string;
    sort: number;
    status: boolean;
}
// 新增商品类型
export interface paramsAddCateType {
    name: string;
    remark: string;
    sort: number;
    status: boolean;
}
// 编辑商品类型

export interface ParamsEditCateType {
    id: number;
    name: string;
    remark: string;
    sort: number;
    status: boolean;
}