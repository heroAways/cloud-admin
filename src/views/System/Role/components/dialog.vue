<template>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500" :before-close="handleClose" align="center">
    <el-form :model="dialogForm" label-width="100" :rules="dialogFormRules" ref="FormDataRef">
      <el-form-item label="角色名称：" prop="roleName">
        <el-input v-model="dialogForm.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色编码：" prop="roleCode">
        <el-input v-model="dialogForm.roleCode" placeholder="保证唯一性，建议以`ROLE_`开头" />
      </el-form-item>
      <el-form-item label="角色状态：" prop="status">
        <el-switch v-model="dialogForm.status" inline-prompt active-text="启" inactive-text="停" />
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="dialogForm.remark" style="width: 100%" :rows="2" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang='ts' setup>
import { addRoleApi, editRoleApi } from '@/api/Menu/roleApi';
import type { ParamsRoleEditType, paramsRoleAddType } from '@/api/Types/roleType';
import { ElForm, ElNotification, type FormInstance, type FormRules } from 'element-plus';
import { ref, nextTick } from 'vue';
import _ from 'lodash'
// 表单唯一标识
const FormDataRef = ref<InstanceType<typeof ElForm>>()
const dialogFormRules = ref({
  roleName: [
    { required: true, message: '角色名称为必填项！', trigger: 'blur' }
  ],
  roleCode: [
    { pattern: /^[0-9a-zA-Z_]{2,10}$/, message: '只允许输入2-30位英文/数字/下划线', trigger: 'blur' }
  ],
  status: [
    { required: true }
  ]
})
const dialogType = ref<string>('')
const dialogTitle = ref<string>()
// dialog表单数据
const dialogForm = ref<paramsRoleAddType>({
  remark: '',
  roleCode: '',
  roleName: '',
  status: true
})
// 提示父组件更新
const emits = defineEmits(['refresh'])
const dialogVisible = ref<boolean>(false)
// 打开dialog回调函数
const openDialog = (type: string, title: string, data = {} as any) => {
  dialogVisible.value = true
  dialogType.value = type
  dialogTitle.value = title
  if (type == 'edit') {
    nextTick(() => {
      dialogForm.value = _.cloneDeep(data.row)
    })
  }
}
const handleSubmit = () => {
  FormDataRef.value?.validate((valid: boolean) => {
    if (valid) {
       submitForm()
    }
  })
}
// 提交
const submitForm = async () => {
  setTimeout(()=>{
    dialogVisible.value = false
  },500)
  // dialogVisible.value = false
  try {
    if (dialogType.value == 'add') {
      await addRoleApi(dialogForm.value)
    } else {
      let newData: ParamsRoleEditType = {
        createTime: '',
        id: '',
        remark: dialogForm.value.remark,
        roleCode: dialogForm.value.roleCode,
        roleName: dialogForm.value.roleName,
        status: dialogForm.value.status,
        updateTime: ''
      }
      await editRoleApi(newData)
    }
    handleClose()
  } catch (err) {
    console.log(err);
  }
  ElNotification({
    title: '操作成功!',
    type: 'success'
  })
  emits('refresh')
}
defineExpose({
  openDialog
})
// dialog关闭回调函数
const handleClose = () => {
  dialogVisible.value = false
  nextTick(()=>{
    FormDataRef.value?.resetFields()
  })
}
</script>
<style lang='scss' scoped></style>