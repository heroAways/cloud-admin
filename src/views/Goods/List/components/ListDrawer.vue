<template>
    <el-drawer style="font-size: 14px;" size="800px" v-model="visible" direction="rtl" :before-close="handleClose">
        <template #header>
            <h4>新增商品信息</h4>
        </template>
        <template #default>
            <el-form label-width="100px" status-icon :model="drawerForm" ref="drawerRef" :rules="drawerFormRules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品名称：" prop="name">
                            <el-input style="width: 280px;" clearable maxlength="30" show-word-limit
                                v-model="drawerForm.name" placeholder="请输入商品名称"></el-input>
                        </el-form-item>
                        <el-form-item label="商品编码：" prop="code">
                            <el-input style="width: 280px;" clearable v-model="drawerForm.code"
                                placeholder="请输入(支持条码枪)"></el-input>
                        </el-form-item>
                        <el-form-item label="库存数量：" prop="stockNum">
                            <el-input-number style="width: 280px;" placeholder="请输入库存数量" v-model="drawerForm.stockNum"
                                :min="1" :max="10" />
                        </el-form-item>
                        <el-form-item label="销售价格：" prop="price">
                            <el-input-number style="width: 280px;" placeholder="0.00" v-model="drawerForm.price"
                                :min="1" :max="10" />
                        </el-form-item>
                        <el-form-item label="成本价格：" prop="cost">
                            <el-input-number style="width: 280px;" placeholder="0.00" v-model="drawerForm.cost" :min="1"
                                :max="10" />
                        </el-form-item>
                        <el-form-item label="商品状态：" prop="status">
                            <el-radio-group v-model="drawerForm.status">
                                <el-radio :value="1" border>上架</el-radio>
                                <el-radio :value="0" border>下架</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="商品简码：" prop="quickCode">
                            <el-input style="width: 280px;" clearable maxlength="30" show-word-limit
                                v-model="drawerForm.quickCode" placeholder="请输入，方便快速搜索商品"></el-input>
                        </el-form-item>
                        <el-form-item label="排序号：" prop="sort">
                            <el-input-number style="width: 280px;" placeholder="0.00" v-model="drawerForm.sort" :min="1"
                                :max="10" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品分类：" prop="categoryId">
                            <el-select v-model="drawerForm.categoryId" placeholder="请选择商品分类">
                                <el-option v-for="item,index in cateData" :key="index" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品规格：" prop="specsName">
                            <el-input style="width: 280px;" clearable maxlength="20" show-word-limit
                                v-model="drawerForm.specsName" placeholder="请输入规格名称"></el-input>
                        </el-form-item>
                        <el-form-item label="商品单位：" prop="unitName">
                            <el-input v-model="drawerForm.unitName" placeholder="请输入商品单位"></el-input>
                        </el-form-item>
                        <el-form-item label="商品特价：" prop="discountPrice">
                            <el-input-number style="width: 280px;" placeholder="0.00" v-model="drawerForm.discountPrice"
                                :min="1" :max="10" />
                        </el-form-item>
                        <el-form-item label="获得积分：" prop="discountPrice">
                            <el-input-number style="width: 280px;" placeholder="请输入获得积分"
                                v-model="drawerForm.discountPrice" :min="1" :max="10" />
                        </el-form-item>
                        <el-form-item label="品牌名称：" prop="brand">
                            <el-input style="width: 280px;" clearable minlength="10" maxlength="30" show-word-limit
                                v-model="drawerForm.brand" placeholder="请输入品牌名称"></el-input>
                        </el-form-item>
                        <el-form-item label="商品产地：" prop="brand">
                            <el-input style="width: 280px;" clearable maxlength="100" show-word-limit
                                v-model="drawerForm.brand" placeholder="商品产地最多输入100个字"></el-input>
                        </el-form-item>
                        <el-form-item label="备注信息：" prop="remark">
                            <el-input style="width: 280px;" clearable maxlength="100" show-word-limit
                                v-model="drawerForm.remark" placeholder="备注信息最多输入100个字"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </template>
        <template #footer>
            <el-row justify="center">
                <el-button>取消</el-button>
                <el-button type="primary">保存</el-button>
            </el-row>
        </template>
    </el-drawer>
</template>
<script lang='ts' setup>
/**
 *  引入
 */
import type { GoodAddParamsType } from '@/api/Types/GoodType/ListType';
import { ref } from 'vue'

/**
 *  数据
 */
// 父组件的分类数据
defineProps(['cateData'])
// 验证表单
const drawerFormRules = ref({
    name: [
        { required: true }
    ],
    code:[
        {required:true}
    ]
})
// 控制drawer显示隐藏按钮
const visible = ref<boolean>(false)
// 表单数据
const drawerForm = ref<GoodAddParamsType>({
    address: '',
    brand: '',
    categoryId: '',
    code: '',
    cost: 0,
    discountPrice: 0,
    goodsDetail: '',
    imageUrl: '',
    name: '',
    price: 0,
    quickCode: '',
    remark: '',
    score: '',
    sort: 0,
    specsName: '',
    status: 0,
    stockNum: 0,
    unitName: ''
})
/**
 *  方法
 */
// 关闭抽屉方法
const handleClose = () => {
    visible.value = false
}
// 封装打开抽屉方法
const openDrawer = () => {
    visible.value = true
}
// 将方法暴露出去
defineExpose({
    openDrawer
})
</script>
<style lang='scss' scoped></style>