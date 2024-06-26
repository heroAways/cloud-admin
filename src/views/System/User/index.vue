<template>
    <div class="layout-padding">
        <el-form :model="queryForm" :inline="true">
            <el-form-item>
                <el-input style="width: 278px;" v-model="queryForm.keyword" placeholder="请输入用户账号/昵称/手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="initUserList" icon="search">查询</el-button>
                <el-button @click="handleAdd" type="success" icon="plus">新增用户</el-button>
            </el-form-item>
        </el-form>
        <el-table height="500px" stripe border :data="userList" style="width: 100%">
            <el-table-column align="center" prop="nickName" label="用户昵称" />
            <el-table-column align="center" prop="username" label="用户账号" />
            <el-table-column align="center" prop="mobile" label="用户手机号" />
            <el-table-column align="center" prop="email" label="邮箱" />
            <el-table-column sortable align="center" prop="accountNonLocked" label="账号锁定">
                <template #default="{ row }">
                    <el-tag v-if="row.accountNonLocked" effect="dark" type="danger">锁定</el-tag>
                    <el-tag v-else effect="dark" type="success">正常</el-tag>
                </template>
            </el-table-column>
            <el-table-column sortable align="center" prop="accountNonExpired" label="账号过期">
                <template #default="{ row }">
                    <el-tag v-if="row.accountNonExpired" effect="dark" type="danger">过期</el-tag>
                    <el-tag v-else effect="dark" type="success">正常</el-tag>
                </template>
            </el-table-column>
            <el-table-column sortable align="center" prop="credentialsNonExpired" label="密码过期">
                <template #default="{ row }">
                    <el-tag v-if="row.credentialsNonExpired" effect="dark" type="danger">过期</el-tag>
                    <el-tag v-else effect="dark" type="success">正常</el-tag>
                </template>
            </el-table-column>
            <el-table-column sortable align="center" prop="createTime" label="创建时间" />
            <el-table-column align="center" label="操作" width="260">
                <template #default="{ row }">
                    <el-button link type="primary" icon="key" @click="handleChange(row)">密码重置</el-button>
                    <el-button link @click="handleEdit(row)" type="warning" icon="edit">修改</el-button>
                    <el-popconfirm width="220px" @confirm="handleDelete(row)" :title="`确定永久删除【${row.nickName}】吗?`">
                        <template #reference>
                            <el-button link type="danger" icon="delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-row justify="end" style="margin-top: 10px;">
            <el-pagination v-model:current-page="current" v-model:page-size="size" :page-sizes="[10, 20, 30, 40]"
                :background="true" layout="total, sizes, prev, pager, next" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-row>
        <!-- dialog -->
        <UserDialog ref="dialogRef" @refresh="handleFresh"></UserDialog>
        <UserPass ref="dialogPassRef" @refresh="handleFresh"></UserPass>
    </div>
</template>
<script lang='ts' setup>
import { deleteUserApi, userListApi } from '@/api/Menu/userApi';
import type { Record } from '@/api/Types/userType';
import { ElNotification } from 'element-plus';
import { ref,defineAsyncComponent } from 'vue'
const UserDialog = defineAsyncComponent(() => import('./components/UserDialog.vue'))
const UserPass = defineAsyncComponent(() => import('./components/password.vue'))
// 总数据数量
const total = ref<number>(0)
// 页码
const current = ref<number>(1)
// 每页数量
const size = ref<number>(10)
const queryForm = ref({
    keyword: ''
})
// 修改密码组件标识符
const dialogPassRef = ref<InstanceType<typeof UserPass>>()
// dialog标识
const dialogRef = ref<InstanceType<typeof UserDialog>>()
// 用户数据
const userList = ref<Record[]>([])
// 新增用户
const handleAdd = () => {
    dialogRef.value?.openDialog('add','新增用户')
}
// 修改用户
const handleEdit = (row: Record) => {
    dialogRef.value?.openDialog('edit', '修改用户', {row})
}
// 修改密码
const handleChange = (row: Record) => {
    dialogPassRef.value?.openDialog('change',`重置密码【${row.nickName}】`,{row})
}
// 删除用户
const handleDelete = async (row: Record) => {
    try {
        await deleteUserApi(row.id)
        initUserList()
        ElNotification({
            title: '删除成功',
            type: 'success',
        })
    } catch (err) {
        console.log(err);
    }
}
const handleFresh = () => {
    initUserList()
}
// 获取用户数据
const initUserList = async () => {
    try {
        let res = await userListApi({
            current: current.value,
            size: size.value
        })
        userList.value = res.data.records
        total.value = res.data.total * 1
    } catch (err) {
        console.log(err);
    }
}
initUserList()
const handleSizeChange = (val: number) => {
    size.value = val
    initUserList()
}
const handleCurrentChange = (val: number) => {
    current.value = val
    initUserList()
}
</script>
<style lang='scss' scoped></style>