<template>
    <div class="layout-padding">
        <el-form :inline="true" :model="searchForm">
            <el-form-item label="分类名称">
                <el-input v-model="searchForm.name" placeholder="请输入分类名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" @click="initGoodsCateDate">查询</el-button>
                <el-button type="success" icon="plus" @click="handleAdd">新增分类</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="initGoodsCate" border stripe style="width: 100%" height="500px">
            <el-table-column align="center" prop="name" label="分类名称" />
            <el-table-column align="center" prop="status" label="分类状态">
                <template #default="{ row }" width="200px">
                    <el-tag v-if="row.status == 1" type="success">启用</el-tag>
                    <el-tag v-else type="warning">停用</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="sort" label="排序号" />
            <el-table-column align="center" prop="remark" label="备注信息" />
            <el-table-column align="center" label="操作">
                <template #default="{ row }" width="200px">
                    <el-button type="warning" link icon="edit" @click="handleEdit(row)">修改</el-button>
                    <el-popconfirm width="250" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="handleDelete(row)" :title="`确定永久删除【${row.name}】吗?`">
                        <template #reference>
                            <el-button type="danger" @click.stop link icon="delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row justify="end">
            <el-pagination style="margin-top: 10px" v-model:current-page="current" v-model:page-size="size"
                :page-sizes="[10, 20, 30, 40]" :background="true" layout="total, sizes, prev, pager, next"
                :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-row>
        <!-- dialog组件 -->
        <CateDialog ref="CateDialogRef" @refresh="handleRefresh"></CateDialog>
    </div>
</template>
<script lang='ts' setup>
/**
 *  引入
 */
import { deleteCateApi, getCateListApi } from '@/api/Good/cateApi';
import type { ResopnseCateTypeRecord } from '@/api/Types/GoodType/cateType';
import { ElNotification } from 'element-plus';
import { ref,defineAsyncComponent } from 'vue'
/**
 *  数据
 */
// 加载dialog组件
const CateDialog = defineAsyncComponent(() => import('./components/CateDialog.vue'))
// dialog组件唯一标识符
const CateDialogRef = ref<InstanceType<typeof CateDialog>>()
// 搜索参数
const searchForm = ref<any>({
    name: ''
})
// 数据总数
const total = ref<number>(0)
// 页数
const current = ref<number>(1)
// 每页条数
const size = ref<number>(10)
// 商品分类数据
const initGoodsCate = ref<ResopnseCateTypeRecord[]>([])
/**
 *  方法
 */
// 刷新
const handleRefresh = () => {
    initGoodsCateDate()
}
// 编辑操作
const handleEdit = (row:ResopnseCateTypeRecord) => {
    CateDialogRef.value?.openDialog('edit','修改分类',{row})
}
// 新增操作
const handleAdd = () => {
    CateDialogRef.value?.openDialog('add','新增分类')
}
// 删除操作
const handleDelete = async (row: ResopnseCateTypeRecord) => {
    try {
        await deleteCateApi(row.id)
        ElNotification({
            title: '操作成功!',
            type: 'success',
        })
        initGoodsCateDate()
    } catch (err) {
        console.log(err)
    }
}
// 获取商品分类数据
const initGoodsCateDate = async () => {
    try {
        let res = await getCateListApi({
            current: current.value,
            size: size.value,
            ...searchForm.value
        })
        initGoodsCate.value = res.data.records
        total.value = res.data.total * 1
    } catch (err) {
        console.log(err)
    }
}
initGoodsCateDate()
// 分页操作
const handleSizeChange = (val: number) => {
    size.value = val
    initGoodsCateDate()
}
const handleCurrentChange = (val: number) => {
    current.value = val
    initGoodsCateDate()
}
</script>
<style lang='scss' scoped></style>