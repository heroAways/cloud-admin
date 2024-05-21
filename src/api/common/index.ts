import request from "@/utils/request";

// 公共请求图片接口
export const getUpLoadApi = (data:any) => {
    return request("/system/media/upload/img", "post", data,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};