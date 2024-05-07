import request from "@/utils/request";
type resType = {
    "_id": string,
    "title": string,
    "status": number,
    "pic": string,
    "url": string
}
type resultType = {
    result : resType[]
}
export const getBanner = ()=>{
    return request<resultType>("/banner", "GET")
}