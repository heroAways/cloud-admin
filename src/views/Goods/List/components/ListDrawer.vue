<template>
    <el-drawer style="font-size: 14px;" size="800px" v-model="visible" direction="rtl" :before-close="handleClose">
        <template #header>
            <h4>{{ drawerTitle }}</h4>
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
                            <el-input-number style="width: 280px;" v-model="drawerForm.stockNum" :min="0" :max="999999"
                                placeholder="请输入库存数量" />
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
                                <el-radio :value="true" border>上架</el-radio>
                                <el-radio :value="false" border>下架</el-radio>
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
                                <el-option v-for="item, index in cateData" :key="index" :label="item.label"
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
                        <el-form-item label="获得积分：" prop="score">
                            <el-input-number style="width: 280px;" placeholder="请输入获得积分"
                                v-model="drawerForm.score" :min="1" :max="10" />
                        </el-form-item>
                        <el-form-item label="品牌名称：" prop="brand">
                            <el-input style="width: 280px;" clearable minlength="10" maxlength="30" show-word-limit
                                v-model="drawerForm.brand" placeholder="请输入品牌名称"></el-input>
                        </el-form-item>
                        <el-form-item label="商品产地：" prop="address">
                            <el-input style="width: 280px;" clearable maxlength="100" show-word-limit
                                v-model="drawerForm.address" placeholder="商品产地最多输入100个字"></el-input>
                        </el-form-item>
                        <el-form-item label="备注信息：" prop="remark">
                            <el-input style="width: 280px;" clearable maxlength="100" show-word-limit
                                v-model="drawerForm.remark" placeholder="备注信息最多输入100个字"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="商品主图：" prop="imageUrl">
                                <el-upload :show-file-list="false" class="avatar-uploader" action=""
                                    accept="image/png,image/jpeg,image/jpg" :http-request="handleUploadImg">
                                    <img v-if="drawerForm.imageUrl" :src="drawerForm.imageUrl" class="avatar" />
                                    <el-icon v-else class="avatar-uploader-icon">
                                        <Plus />
                                    </el-icon>
                                    <template #tip>
                                        <div class="el-upload__tip">
                                            上传的图片大小不能超过 1MB，格式为 png/jpg/jpeg 的文件。
                                        </div>
                                    </template>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="商品详情：" prop="goodsDetail">
                                <div style="border: 1px solid #ccc">
                                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef"
                                        :defaultConfig="{}" mode="default" />
                                    <Editor style="height: 500px; overflow-y: hidden;" v-model="drawerForm.goodsDetail"
                                        :defaultConfig="{ placeholder: '请输入内容...' }" mode="default"
                                        @onCreated="handleCreated" />
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
            </el-form>
        </template>
        <template #footer>
            <el-row justify="center">
                <el-button @click="handleClose">取消</el-button>
                <el-button @click="handleSubmit" type="primary">保存</el-button>
            </el-row>
        </template>
    </el-drawer>
</template>
<script lang='ts' setup>
/**
 *  引入
 */
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { GoodAddParamsType } from '@/api/Types/GoodType/ListType';
import { ElNotification, type FormInstance, type UploadRequestOptions } from 'element-plus';
import { ref, nextTick, shallowRef, onBeforeUnmount } from 'vue'
import _ from 'lodash'
import { getUpLoadApi } from '@/api/common';
import { addGoodApi, checkCodeApi, editGoodApi } from '@/api/Good/ListApi';
/**
 *  数据
 */
// 提醒父组件更新
const emits = defineEmits(['refresh'])
const editorRef = shallowRef()
// 表单唯一标识符
const drawerRef = ref<FormInstance>()
// drawer表单类型
const drawerType = ref<string>('add')
// drawer表单标题
const drawerTitle = ref<string>('')
// 父组件的分类数据
defineProps(['cateData'])
// 验证表单
const validateCode = async (rule: any, value: number, callback: Function) => {
    try {
        let res = await checkCodeApi(value)
        if (res.data) {
            callback(new Error('商品编码已存在'))
        } else {
            callback()
        }
    } catch (err) {
        console.log(err);
    }
}
const drawerFormRules = ref({
    name: [
        { required: true, message: '商品名称为必填项！', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '商品编码为必填项！', trigger: 'blur' },
        { validator: validateCode, message: '商品编码已存在', trigger: 'blur' }
    ],
    categoryId: [
        { required: true, message: '商品分类为必填项！', trigger: 'blur' }
    ],
    stockNum: [
        { required: true, message: '库存数量为必填项！', trigger: 'blur' }
    ],
    price: [
        { required: true, message: '销售价格为必填项！', trigger: 'blur' }
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
    score: 0,
    sort: 1,
    specsName: '',
    status: false,
    stockNum: 0,
    unitName: ''
})
/**
 *  方法
 */
// 提交
const handleSubmit = () => {
    try {
        drawerRef.value?.validate(async (valid: boolean) => {
            if (valid) {
                await onSubmit()
                handleClose()
                emits('refresh')
                ElNotification({
                    title: '操作成功！',
                    type: 'success',
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}
// 封装提交接口响应
const onSubmit = async () => {
    try {
        if (drawerType.value == 'add') {
            await addGoodApi(drawerForm.value)
        }else{
            await editGoodApi(drawerForm.value)
        }
    } catch (err) {
        console.log(err);
    }
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
const handleUploadImg = async (options: UploadRequestOptions) => {
    try {
        let file = options.file
        if (file.size > 1 * 1024 * 1024) {
            return
        }
        const formData = new FormData()
        formData.append('file', file)
        formData.append('data', JSON.stringify({ sourceType: "goods_img" }))
        const res = await getUpLoadApi(formData)
        drawerForm.value.imageUrl = res.data
    } catch (err) {
        console.log(err)
    }
}
// 封装打开抽屉方法
const openDrawer = (type: string, title: string, data = {} as any) => {
    visible.value = true
    drawerType.value = type
    drawerTitle.value = title
    if (type === 'edit') {
        nextTick(() => {
            drawerForm.value = _.cloneDeep(data.row)
        })
    }
}

// 关闭抽屉方法
const handleClose = () => {
    visible.value = false
    nextTick(() => {
        drawerRef.value?.resetFields()
    })
}
// 将方法暴露出去
defineExpose({
    openDrawer
})
</script>
<style lang='scss' scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>