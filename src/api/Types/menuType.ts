export interface SearchParamsType {
    keyword?: string;
}
export interface ResponseDataType {
    children: DatumChild[];
    code: string;
    component: null | string;
    createTime: string;
    id: string;
    meta: DatumMeta;
    name: string;
    parentId: null;
    path: string;
    redirect: null | string;
    remark: string;
    sort: number;
    type: string;
    updateTime: string;
}
export interface DatumChild {
    children: ChildChild[];
    code: string;
    component: string;
    createTime: string;
    id: string;
    meta: FluffyMeta;
    name: string;
    parentId: string;
    path: string;
    redirect: null;
    remark: string;
    sort: number;
    type: string;
    updateTime: string;
}

export interface ChildChild {
    children: string[];
    code: string;
    createTime: string;
    id: string;
    meta: PurpleMeta;
    name: null;
    parentId: string;
    path: null;
    redirect: null;
    remark: string;
    sort: number;
    type: string;
    updateTime: string;
}

export interface PurpleMeta {
    cache: boolean;
    hidden: boolean;
    icon: null;
    title: string;
}

export interface FluffyMeta {
    cache: boolean;
    hidden: boolean;
    icon: string;
    title: string;
}

export interface DatumMeta {
    cache: boolean;
    hidden: boolean;
    icon: string;
    linkTo: string;
    title: string;
}