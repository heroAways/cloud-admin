<template>
    <div class="home-container">
        <div class="home-statistic">
            <div class="home-statistic-title">
                营业数据统计
            </div>
            <el-row :gutter="18">
                <el-col :lg="6" :md="12" :sm="12" :xs="24" :span="6">
                    <el-card shadow="hover" style="height: 100px;">1</el-card>
                </el-col>
                <el-col :lg="6" :md="12" :sm="12" :xs="24" :span="6">
                    <el-card shadow="hover" style="height: 100px;">2</el-card>
                </el-col>
                <el-col :lg="6" :md="12" :sm="12" :xs="24" :span="6">
                    <el-card shadow="hover" style="height: 100px;">3</el-card>
                </el-col>
                <el-col :lg="6" :md="12" :sm="12" :xs="24" :span="6">
                    <el-card shadow="hover" style="height: 100px;">4</el-card>
                </el-col>
            </el-row>
            <el-row :gutter="18">
                <el-col :span="9" :lg="9" :md="11" :sm="24" :xs="24">
                    <el-card shadow="hover" style="height: 380px;">1</el-card>
                </el-col>
                <el-col :span="15" :lg="15" :md="13" :sm="24" :xs="24">
                    <el-card shadow="hover" style="height: 380px;">2</el-card>
                </el-col>
            </el-row>
            <el-row :gutter="18">
                <el-col :span="15" :lg="15" :md="11" :sm="24" :xs="24">
                    <el-card shadow="hover" style="height: 380px;">1</el-card>
                </el-col>
                <el-col :span="9" :lg="9" :md="11" :sm="24" :xs="24">
                    <el-card shadow="hover" style="height: 380px;">2</el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script lang='ts' setup name="Home">
import { ref } from 'vue'
let value = ref('')
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