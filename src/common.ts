import request from "./utils/request";

export const getImg = () => {
    return request('/system/media/upload/img','POST',{},{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
};