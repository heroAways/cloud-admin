<template>
    <div class="home-container">
        <div class="home-statistic">
            <div class="home-statistic-title">
                营业数据统计
            </div>
            <el-row :gutter="18">
                <el-col :lg="6" :md="12" :sm="12" :xs="24" :span="6">
                    <el-card shadow="hover"
                        style="height: 100px;background: #47cc62;color: #fff;padding-left: 10px;padding-top: 5px;">
                        <div class="statick-title-top" style="display: flex;align-items: center;">
                            <span style="font-size: 14px;">订单笔数</span>
                            <el-tooltip class="box-item" effect="light" content="订单笔数=(商品消费+快速消费+计次消费)的订单数"
                                placement="top">
                                <svg-icon icon="QuestionFilled" color="#fff" size="18"></svg-icon>
                            </el-tooltip>
                        </div>
                        <div class="statick-title-bottom">
                            <span style="font-size: 25px;">469</span>
                            <span style="font-size: 13px;">笔</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :lg="6" :md="12" :sm="12" :xs="24" :span="6">
                    <el-card shadow="hover"
                        style="height: 100px;background: #f64a34;color: #fff;padding-left: 10px;padding-top: 5px;">
                        <div class="statick-title-top" style="display: flex;align-items: center;">
                            <span style="font-size: 14px;">销售总额</span>
                            <el-tooltip class="box-item" effect="light" content="销售总额=商品消费+快速消费+计次消费的合计金额"
                                placement="top">
                                <svg-icon icon="QuestionFilled" color="#fff" size="18"></svg-icon>
                            </el-tooltip>
                        </div>
                        <div class="statick-title-bottom">
                            <span style="font-size: 25px;">44280.1</span>
                            <span style="font-size: 13px;">元</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :lg="6" :md="12" :sm="12" :xs="24" :span="6">
                    <el-card shadow="hover"
                        style="height: 100px;background: #fca21c;color: #fff;padding-left: 10px;padding-top: 5px;">
                        <div class="statick-title-top" style="display: flex;align-items: center;">
                            <span style="font-size: 14px;">退款总额</span>
                            <el-tooltip class="box-item" effect="light" content="退款总额=退货或撤单的退款总金额" placement="top">
                                <svg-icon icon="QuestionFilled" color="#fff" size="18"></svg-icon>
                            </el-tooltip>
                        </div>
                        <div class="statick-title-bottom">
                            <span style="font-size: 25px;">496.2</span>
                            <span style="font-size: 13px;">元</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :lg="6" :md="12" :sm="12" :xs="24" :span="6">
                    <el-card shadow="hover"
                        style="height: 100px;background: #5d8ded;color: #fff;padding-left: 10px;padding-top: 5px;">
                        <div class="statick-title-top" style="display: flex;align-items: center;">
                            <span style="font-size: 14px;">综合收入</span>
                            <el-tooltip class="box-item" effect="light" content="综合收入是指店铺实际进帐金额" placement="top">
                                <svg-icon icon="QuestionFilled" color="#fff" size="18"></svg-icon>
                            </el-tooltip>
                        </div>
                        <div class="statick-title-bottom">
                            <span style="font-size: 25px;">119500.45</span>
                            <span style="font-size: 13px;">元</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="18">
                <el-col :span="9" :lg="9" :md="11" :sm="24" :xs="24">
                    <el-card shadow="hover" style="height: 380px;">
                        <div style="width: 438px;height: 380px;" ref="charDom"></div>
                    </el-card>
                </el-col>
                <el-col :span="15" :lg="15" :md="13" :sm="24" :xs="24">
                    <el-card shadow="hover" style="height: 380px;">
                        <div ref="char2Dom" style="width: 702px;height: 340px;"></div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="18">
                <el-col :span="15" :lg="15" :md="11" :sm="24" :xs="24">
                    <el-card shadow="hover" style="height: 380px;">
                        <div ref="char3Dom" style="width: 702px;height: 340px;"></div>
                    </el-card>
                </el-col>
                <el-col :span="9" :lg="9" :md="11" :sm="24" :xs="24">
                    <el-card shadow="hover" style="height: 380px;">
                        <div style="width: 438px;height: 380px;" ref="char4Dom"></div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script lang='ts' setup name="Home">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';
import { option1,option2,option3,option4 } from '@/utils/echart'
import { getCateDateApi } from '@/api/Home/cateDateApi';
let charDom = ref()
let char2Dom = ref()
let char3Dom = ref()
let char4Dom = ref()
onMounted( async () => {
    try {
        let res = await getCateDateApi()
        option2.series[0].data = res.data.orderNumList
        option2.series[1].data = res.data.rechargeMoneyList
        option2.series[2].data = res.data.returnMoneyList
        option2.series[3].data = res.data.saleMoneyList
        let myChart = echarts.init(charDom.value)
        myChart.setOption(option1);
        let myChart2 = echarts.init(char2Dom.value)
        myChart2.setOption(option2);
        let myChart3 = echarts.init(char3Dom.value)
        myChart3.setOption(option3);
        let myChart4 = echarts.init(char4Dom.value)
        myChart4.setOption(option4);
    } catch (error) {
        console.log(error)
    }
})

</script>
<style lang='scss' scoped>
.home-container {
    .home-statistic {
        .home-statistic-title {
            font-size: 18px;
            height: 25px;
            font-weight: normal;
            border-left: 2px solid var(--el-color-primary);
            padding-left: 10px;
        }
    }
}

.el-card {
    margin: 20px 0;
}
</style>