export interface  ResponseUserListType{
    records: Record[];
    total: number;
}

export interface Record {
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    createTime: string;
    credentialsNonExpired: boolean;
    email: string;
    id: number;
    imageUrl: string;
    mobile: string;
    nickName: string;
    password: string;
    remark: string;
    roleIds: number[];
    updateTime: string;
    username: string;
}

export interface ParamsUserListType {
    current: number;
    keyword?: string;
    size: number;
}