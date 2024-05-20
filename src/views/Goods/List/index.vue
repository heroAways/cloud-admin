<template>
    <div class="layout-padding">
        <el-row>
            <el-col :span="24">
                <el-form ref="queryRef" :model="queryForm" :inline="true">
                    <el-form-item label="名称/编码">
                        <el-input v-model="queryForm.keyword" placeholder="请输入商品名称/编码/简码" />
                    </el-form-item>
                    <el-form-item label="商品状态">
                        <el-select v-model="queryForm.status" placeholder="请选择商品状态" style="width: 240px">
                            <el-option label="已上架" :value="true" />
                            <el-option label="已下架" :value="false" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="search" @click="initGoodsList">查询</el-button>
                        <el-button @click="handleAdd" type="success" icon="plus">新增商品</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-table border stripe :data="initGoods" style="width: 100%" height="500px">
            <el-table-column align="center" prop="date" label="商品名称/编码" width="210px">
                <template #default="{ row }">
                    <!-- <el-avatar shape="square" :size="50" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" /> -->
                    <div class="imgbox">
                        <el-avatar shape="square" :size="50" :src="row.imageUrl" />
                        <div class="rit">
                            <p>{{ row.name }}</p>
                            <a @click.prevent href="###">{{ row.code }}</a>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="specsName" label="商品规格" width="90px" />
            <el-table-column align="center" prop="categoryName" label="所属分类" width="90px" />
            <el-table-column align="center" prop="quickCode" label="快捷码" />
            <el-table-column align="center" prop="unitName" label="单位" />
            <el-table-column align="center" prop="stockNum" label="库存" width="100px" sortable />
            <el-table-column align="center" prop="price" label="销售价" width="100px" sortable />
            <el-table-column align="center" label="商品特价" width="110px" sortable>
                <template #default="{ row }">
                    ￥{{ row.discountPrice }}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="cost" label="成本价" width="100px" sortable />
            <el-table-column align="center" prop="createTime" label="入库时间" width="120px" />
            <el-table-column align="center" label="商品状态" width="100px">
                <template #default="{ row }">
                    <el-switch v-model="row.status" :loading="isloading" @click="handleSwitch(row)" inline-prompt active-text="已上架" inactive-text="已下架" />
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200px">
                <template #default="{ row }">
                    <el-button link type="warning" icon="edit">编辑</el-button>
                    <el-popconfirm @confirm="handleDelete(row)" width="300" confirm-button-text="确定"
                        cancel-button-text="取消" :title="`确定永久删除【${row.name}】吗?`">
                        <template #reference>
                            <el-button link type="danger" icon="delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row justify="end">
            <el-pagination style="margin-top: 10px;" v-model:current-page="current" v-model:page-size="size"
                :page-sizes="[10, 20, 30, 40]" :background="true" layout="total, sizes, prev, pager, next"
                :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-row>
        <ListDrawer ref="drawerRef" :cateData="cateData"></ListDrawer>
    </div>
</template>
<script lang='ts' setup name="List">
/**
 * 引入包
 */
import { ref, defineAsyncComponent, onMounted } from 'vue'
import { changeGoodStatusApi, deleteGoodApi, getGoodListApi } from '@/api/Good/ListApi';
import type { ResponseGoodsListTypeRecord } from '@/api/Types/GoodType/ListType';
import { ElNotification, type FormInstance } from 'element-plus';
/**
 *  数据
 */
// 是否加载
const isloading = ref<boolean>(false)
// 数据总数
const total = ref<number>(0)
// 分类数据
const cateData = ref<any>([])
// 搜索表单标识符
const queryRef = ref<FormInstance>()
// 抽屉组件唯一标识符
const drawerRef = ref<InstanceType<typeof ListDrawer>>()
// 抽屉组件
const ListDrawer = defineAsyncComponent(() => import('./components/ListDrawer.vue'))
// 搜索参数
interface IqueryType {
    keyword: string,
    status: string | boolean
}
const queryForm = ref<IqueryType>({
    keyword: '',
    status: ''
})
const initGoods = ref<ResponseGoodsListTypeRecord[]>([])
// 页码
const current = ref<number>(1)
// 每页条数
const size = ref<number>(10)
/**
 * 方法
 */
// 更改状态
const handleSwitch = async (row: ResponseGoodsListTypeRecord) => {
    isloading.value = true
    try {
        await changeGoodStatusApi({
            id: row.id,
            status: row.status
        })
        setTimeout(()=>{
            isloading.value = false
        },500)
        ElNotification({
            title: '状态更改成功!',
            type: 'success',
        })
    } catch (err) {
        console.log(err)
    }
}
// 删除操作  deleteGoodApi()
const handleDelete = async (row: ResponseGoodsListTypeRecord) => {
    try {
        await deleteGoodApi(row.id)
        initGoodsList()
        ElNotification({
            title: '删除成功!',
            type: 'success',
        })
    } catch (err) {
        console.log(err)
    }
}
// 新增
const handleAdd = () => {
    drawerRef.value?.openDrawer()
}
// 获取商品列表数据
const initGoodsList = async () => {
    try {
        let res = await getGoodListApi({
            current: current.value,
            size: size.value,
            ...queryForm.value
        })
        console.log('res=>', res);
        initGoods.value = res.data.records
        total.value = res.data.total * 1
        cateData.value = res.data.records.map((item: ResponseGoodsListTypeRecord) => {
            return {
                label: item.categoryName,
                value: item.categoryId
            }
        })
        console.log('cateData=>', cateData.value);

    } catch (err) {
        console.log(err)
    }
}
initGoodsList()
// 获取分类数据

// 分页方法
const handleSizeChange = (val: number) => {
    size.value = val
    initGoodsList()
}
const handleCurrentChange = (val: number) => {
    current.value = val
    initGoodsList()
}
</script>
<style lang='scss' scoped>
.imgbox {
    width: 100%;
    height: 100%;
    display: flex;

    .rit {
        margin-left: 5px;
        text-align: left;
    }
}

a {
    color: #80c8fd;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}
</style>