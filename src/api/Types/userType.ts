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


export interface UserParamsType {
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    email: string;
    mobile: string;
    nickName: string;
    password: string;
    remark: string;
    roleIds: number[];
    username: string;
}

// 编辑类型

export interface UserEditParamsType {
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

// 修改密码

export interface UserPassParamsType {
    newPassword: string;
    repPassword: string;
    userId: number;
}