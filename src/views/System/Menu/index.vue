<template>
    <div class="layout-padding">
        <el-form :inline="true">
            <el-form-item label="菜单名称">
                <el-input v-model="findData.keyword" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" @click="getMenuList">查询</el-button>
                <el-button type="success" icon="plus" @click="handleClick">新增菜单</el-button>
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
                <template #default="{ row }">
                    <el-tag v-if="row.type == 1" tyep="primary">菜单</el-tag>
                    <el-tag v-else type="success">按钮</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="sort" label="排序" width="120" />
            <el-table-column align="center" label="操作" width="240">
                <template #default="{ row }">
                    <el-button @click="handleClick(row)" link
                        icon="Plus" type="primary">新增下级</el-button>
                    <el-button link icon="Edit" type="warning" @click="handleEdit(row)">修改</el-button>
                    <el-popconfirm @confirm="handleDelete(row)" width="auto" confirm-button-text="确定"
                        cancel-button-text="取消" :title="`确定永久删除【${row.meta.title}】吗?`">
                        <template #reference>
                            <el-button link icon="Delete" type="danger" @click.stop>删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <Drawer ref="dialogRef" @refresh="handleFresh"></Drawer>
    </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue';
import { getMenuListApi, deleteMenuApi, selectMenuApi } from '@/api/Menu/menuApi'
import type { ResponseDataType } from '@/api/Types/menuType';
import { ElNotification } from 'element-plus';
import { defineAsyncComponent } from 'vue';
const Drawer = defineAsyncComponent(() => import('./components/Drawer.vue'))
const dialogRef = ref()

const handleFresh = () => {
    getMenuList()
}


let tableData = ref<ResponseDataType[]>([])
let findData = ref({
    keyword: ''
})
const handleClick = (data:any) => {
    dialogRef.value.openDradow("add", "新增菜单", data);
}
const handleDelete = async (id: string) => {
    try {
        let res = await deleteMenuApi(id)
        ElNotification({
            message: '删除成功',
            type: 'success',
            duration: 1000
        })
    } catch (err) {
        console.log(err);
    }
}
const handleEdit = (data:any) => {
    dialogRef.value.openDradow("edit", "修改菜单", data);
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