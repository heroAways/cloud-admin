export interface ParamsRoleListType {
    current: number;
    name: string;
    size: number;
}
export interface ResponseRoleListType {
    records: Record[];
    total: number;
}

export interface Record {
    createTime: string;
    id: number;
    remark: string;
    roleCode: string;
    roleName: string;
    status: boolean;
    updateTime: string;
}


export interface paramsRoleAddType {
    remark: string;
    roleCode: string;
    roleName: string;
    status: boolean;
}

// 编辑接口数据类型
export interface ParamsRoleEditType {
    createTime: string;
    id: number | string;
    remark: string;
    roleCode: string;
    roleName: string;
    status: boolean;
    updateTime: string;
}