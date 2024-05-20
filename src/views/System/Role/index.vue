<template>
    <div class="layout-padding">
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="findData">
                    <el-form-item label="角色名称">
                        <el-input placeholder="请输入角色名称" v-model="findData.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="search" type="primary" @click="initRoleList">查询</el-button>
                        <el-button icon="plus" type="success" @click="handleAdd">新增角色</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
            <el-table height="500px" scrollbar="true" :data="RoleList" stripe style="width: 100%" border highlight-current-row
                align="center">
                <el-table-column align="center" type="index" label="序号" width="80" />
                <el-table-column align="center" prop="roleName" label="角色名称" />
                <el-table-column align="center" prop="roleCode" label="角色编码" />
                <el-table-column align="center" label="角色状态">
                    <template #default="{ row }">
                        <el-tag v-if="row.status === true" type="success">启用</el-tag>
                        <el-tag v-else type="warning">停用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="remark" label="备注" width="150" />
                <el-table-column align="center" label="操作" width="250">
                    <template #default="{ row }">
                        <el-button link icon="Check" type="primary" @click="handlePermissition(row)">分配权限</el-button>
                        <el-button link icon="Edit" type="warning" @click="handleEdit(row)">修改</el-button>
                        <el-popconfirm @confirm="handleDelete(row.id)" width="250" confirm-button-text="确定"
                            cancel-button-text="取消" icon="QuestionFilled" icon-color="#ff9900" title="确定删除此角色和所拥有权限吗?">
                            <template #reference>
                                <el-button link icon="Delete" type="danger" @click.stop>删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        <el-row justify="end">
            <el-col :span="14">
                <el-pagination style="margin-top: 10px;" v-model:current-page="findData.current"
                    v-model:page-size="findData.size" :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </el-col>
        </el-row>
        <DialogComponent ref="dialogRef" @refresh="handleFresh"></DialogComponent>
        <drawerComponent ref="drawerRef"></drawerComponent>
    </div>
</template>
<script lang='ts' setup>
import type { ParamsRoleListType, ResponseRoleListType, Record } from '@/api/Types/roleType';
import { deleteRoleApi, getRoleListApi } from '@/api/Menu/roleApi';
import { ref, type ComponentInstance } from 'vue';
import { ElNotification, type FormInstance } from 'element-plus';
import { defineAsyncComponent } from 'vue';
// 编辑
const handleEdit = (row: Record) => {
    dialogRef.value!.openDialog('edit', '修改角色', { row })
}
const drawerRef = ref<InstanceType<typeof drawerComponent>>()
// 权限抽屉开启
const handlePermissition = (row: Record) => {
    drawerRef.value?.openDrawer(`分配【${row.roleName}】的权限`,row.id)
}
// 新增
const handleAdd = () => {
    dialogRef.value!.openDialog('add', '新增角色')
}
const dialogRef = ref<InstanceType<typeof DialogComponent>>()
const DialogComponent = defineAsyncComponent(() => import('./components/dialog.vue'))
const drawerComponent = defineAsyncComponent(() => import('./components/drawer.vue'))
// 角色列表数据总数
const total = ref<number>(0)
// 角色列表
const RoleList = ref<Record[]>([])
let findData = ref<ParamsRoleListType>({
    current: 1,
    name: '',
    size: 10
})
// 初始化
const handleFresh = () => {
    initRoleList()
}
// 删除接口
const handleDelete = async (id: number) => {
    try {
        await deleteRoleApi(id)
        initRoleList()
    } catch (err) {
        console.log(err);
    }
    ElNotification({
        title: '操作成功',
        type: 'success',
    })
}
const initRoleList = async <ResponseRoleListType>() => {
    try {
        let res = await getRoleListApi(findData.value)
        RoleList.value = res.data.records
        total.value = res.data.total
    } catch (err) {
        console.log(err);
    }
}
initRoleList()
const handleSizeChange = (val: number) => {
    findData.value.size = val
    initRoleList()
}
const handleCurrentChange = (val: number) => {
    findData.value.current = val
    initRoleList()
}
</script>
<style lang='scss' scoped></style>