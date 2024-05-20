<template>
    <el-dialog :before-close="handleClose" v-model="visible" center :title="dialogTitle" width="500">
        <el-form label-width="100px" :model="dialogForm" :rules="dialogFormRules" ref="dialogFormRef">
            <el-form-item label="分类名称：" prop="name">
                <el-input placeholder="请输入分类名称" v-model="dialogForm.name" maxlength="30" show-word-limit />
            </el-form-item>
            <el-form-item label="分类状态：" prop="status">
                <el-switch v-model="dialogForm.status" inline-prompt active-text="启" inactive-text="停" />
            </el-form-item>
            <el-form-item label="排序号：" prop="sort">
                <el-input-number style="width: 365px;" v-model="dialogForm.sort" :min="1" :max="10" />
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input v-model="dialogForm.remark" style="width: 365px" :rows="2" type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleSubmit">
                    保存
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang='ts' setup>
/**
 *  引入
 */
import { addCateApi, editCateApi } from '@/api/Good/cateApi';
import type { paramsAddCateType } from '@/api/Types/GoodType/cateType';
import { ElNotification, type FormInstance } from 'element-plus';
import { ref, nextTick } from 'vue'
/**
 *  数据
 */
// 商品id
const goodId = ref<number>(1)
// dialog标题
const dialogTitle = ref<string>()
// dialog类型
const dialogType = ref<string>()
// 提示父组件刷新
const emits = defineEmits(['refresh'])
// 表单唯一标识符
const dialogFormRef = ref<FormInstance>()
// 验证表单
const dialogFormRules = ref({
    name: [
        { required: true, message: '分类名称为必填项！', trigger: 'blur' }
    ],
    status: [
        { required: true }
    ]
})
// 弹窗显示
const visible = ref<boolean>(false)
// 表单数据
const dialogForm = ref<paramsAddCateType>({
    name: '',
    status: true,
    sort: 1,
    remark: ''
})
/**
 *  方法
 */
// 关闭dialog的方法 
const handleClose = () => {
    visible.value = false
    dialogFormRef.value?.resetFields()
}
// 提交表单
const handleSubmit = () => {
    dialogFormRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            await onSubmit()
            ElNotification({
                title: '操作成功!',
                type: 'success',
            })
            handleClose()
            emits('refresh')
        }
    })
}
// 新增以及编辑方法
const onSubmit = async () => {
    try {
        if (dialogType.value == 'add') {
            await addCateApi(dialogForm.value)
        } else {
            await editCateApi({
                id: goodId.value,
                ...dialogForm.value
            })
        }
    } catch (err) {
        console.log(err)
    }
}
// 封装打开dialog方法
const openDialog = (type: string, title: string, data = {} as any) => {
    visible.value = true
    dialogTitle.value = title
    dialogType.value = type
    nextTick(() => {
        goodId.value = data.row.id
    })
    if (type === 'edit') {
        nextTick(() => {
            dialogForm.value = data.row
        })
    }
}
// 将方法暴漏给父组件
defineExpose({
    openDialog
})
</script>
<style lang='scss' scoped></style>