<template>
    <div class="layout-padding">
        <el-form>
            <el-form-item label="菜单名称">
                <el-input v-model="findData.keyword" place></el-input>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
            <el-table-column align="center" prop="date" label="菜单名称" width="150">
                <template #default="{ row }" style="display: flex;align-items: center;justify-content: center;">
                    <svg-icon v-if="row.meta.icon" style="margin-right: 10px;"
                        :icon="filterIcon(row.meta.icon)"></svg-icon>
                    <span>{{ row.meta.title }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="path" label="路由地址" width="120" />
            <el-table-column align="center" prop="component" label="组件路径" width="120" />
            <el-table-column align="center" prop="code" label="权限标识" width="120" />
            <el-table-column align="center" label="类型" width="120">
                <template #default="{row}">
                    <el-tag v-if="row.type==1" tyep="primary">菜单</el-tag>
                    <el-tag v-else type="success">按钮</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="sort" label="排序" width="120" />
            <el-table-column align="center" label="操作" width="240" >
                <template #default="{row}">
                    <el-button @click="handleClick(row)" v-if="row.children.length>0 || row.meta.title == '首页'" link icon="Plus" type="primary">新增下级</el-button>
                    <el-button link icon="Edit" type="warning">修改</el-button>
                    <el-button link icon="Delete" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue';
import { getMenuListApi } from '@/api/Menu/menuApi'
import type { ResponseDataType } from '@/api/Types/menuType';
let tableData = ref<ResponseDataType[]>([])
let findData = ref({
    keyword: ''
})
const handleClick = (row:any) => {
    console.log('row',row);
    
}
const filterIcon = (icon: string) => {
    if (icon) {
        return icon.replace('ele-', '')
    }
}
const getMenuList = async () => {
    try {
        let res = await getMenuListApi(findData.value)
        tableData.value = res.data
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}
getMenuList()
</script>
<style lang='scss' scoped></style>