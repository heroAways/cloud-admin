import request from "@/utils/request";

export interface CateDateResponseType {
    last30Days: string[];
    orderNumList: number[];
    rechargeMoneyList: number[];
    returnMoneyList: number[];
    saleMoneyList: number[];
}
export const getCateDateApi = () => {
    return request<CateDateResponseType>('/home/30days/saleData','GET')
};