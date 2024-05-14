export interface SearchParamsType {
    keyword?: string;
}
export interface ResponseDataType {
    children: DatumChild[];
    code?: string;
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
    code?: string;
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
    code?: string;
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

export type ResposeAddMenuType = {
    id?: string;
    code?: string;
    component: string;
    meta: Meta;
    name: string;
    parentId: string;
    path: string;
    redirect: string;
    remark: string;
    sort: number;
    type: string;
}

export type Meta = {
    cache: boolean;
    hidden: boolean;
    icon: string;
    title: string;
}

export type selectMenuTpye = {
    code?: number;
    data: Datum[];
    message: string;
}

export type Datum = {
    children: Child[];
    id: string;
    parentId: null;
    title: string;
}

export type Child = {
    children: string[];
    id: string;
    parentId: string;
    title: string;
}