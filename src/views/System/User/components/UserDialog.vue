<template>
  <el-dialog :before-close="handleClose" v-model="Visible" center width="700px" style="font-size: 14px;"
    :title="dialogTitle">
    <el-form label-width="100px" status-icon ref="dialogFormRef" :model="dialogForm" :rules="dialogRuleForm">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="用户昵称：" prop="nickName">
            <el-input placeholder="请输入用户昵称" show-word-limit clearable maxlength="30" minlength="0"
              v-model="dialogForm.nickName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="手机号码：" prop="mobile">
            <el-input placeholder="请输入手机号码" v-model="dialogForm.mobile" autocomplete="off" />
          </el-form-item>
          <el-form-item label="分配角色：" prop="roleIds">
            <el-select multiple v-model="dialogForm.roleIds" placeholder="请选择角色">
              <el-option v-for="item, index in roleList" :key="index" :label="item.roleName" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="账号锁定：" prop="accountNonLocked">
            <el-radio-group v-model="dialogForm.accountNonLocked">
              <el-radio :value="false" border>未锁定</el-radio>
              <el-radio :value="true" border>已锁定</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="密码过期：" prop="credentialsNonExpired">
            <el-radio-group v-model="dialogForm.credentialsNonExpired">
              <el-radio :value="false" border>未锁定</el-radio>
              <el-radio :value="true" border>已锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户账号：" prop="username">
            <el-input maxlength="30" minlength="0" show-word-limit clearable placeholder="请输入4-30位用户账号"
              v-model="dialogForm.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="登录密码：" prop="password">
            <el-input :disabled="dialogType=='edit'" clearable placeholder="请输入6-30位登录密码" v-model="dialogForm.password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="电子邮箱：" prop="email">
            <el-input maxlength="30" minlength="0" show-word-limit clearable placeholder="请输入电子邮箱"
              v-model="dialogForm.email" autocomplete="off" />
          </el-form-item>
          <el-form-item label="账号过期：" prop="accountNonExpired">
            <el-radio-group v-model="dialogForm.accountNonExpired">
              <el-radio :value="false" border>未过期</el-radio>
              <el-radio :value="true" border>已过期</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注信息：" prop="remark">
            <el-input v-model="dialogForm.remark" maxlength="100" placeholder="请输入备注信息" show-word-limit
              type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
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
/**
 * 引用
 */
import { ref, nextTick } from 'vue'
import _ from 'lodash'
import { ElNotification, type FormInstance } from 'element-plus';
import { getRoleListApi } from '@/api/Menu/roleApi';
import type { Record } from '@/api/Types/roleType';
import type { UserParamsType } from '@/api/Types/userType';
import { addUserApi, editUserApi } from '@/api/Menu/userApi';
/**
 * 数据
 */
// 向父组件发出通知
const emits = defineEmits(['refresh'])
// 正则验证密码
const validatePassword = (rule: any, value: string, callback: any) => {
  const reg = /^[0-9a-zA-Z_*]{6,30}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('密码必须为6~30位数字、字母、下划线！'))
  }
}
// 角色信息
const roleList = ref<Record[]>([])
// 验证表单
const dialogRuleForm = ref({
  nickName: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  accountNonLocked: [{ required: true }],
  credentialsNonExpired: [{ required: true }],
  username: [{ required: true, message: '用户帐号为必填项！', trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, message: '密码必须为6~30位数字、字母、下划线！', trigger: 'blur' }],
  accountNonExpired: [{ required: true }]
})
// dialog表单标识符
const dialogFormRef = ref<FormInstance>()
// 控制dialog显示状态按钮
const Visible = ref<boolean>(false)
// 表单标题
const dialogTitle = ref<string>('')
// 表单类型
const dialogType = ref<string>('')
// 用户id
const userId = ref<number>(0)
// 表单数据 
const dialogForm = ref<UserParamsType>({
  nickName: '',
  mobile: '',
  roleIds: [],
  accountNonLocked: false,
  credentialsNonExpired: false,
  password: '',
  username: '',
  email: '',
  accountNonExpired: false,
  remark: ''
})
/**
 * 方法
 */
// 提交
const handleSubmit = async () => {
  dialogFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        await onSubmit()
        ElNotification({
          title: '操作成功',
          type: 'success',
        })
        handleClose()
        emits('refresh')
      } catch (err) {
        console.log(err)
      }
    }
  })
}
// 封装提交方法
const onSubmit = async () => {
  try {
    if (dialogType.value === 'add') {
      await addUserApi(dialogForm.value)
    }else {
      await editUserApi({
        createTime:'',
        id:userId.value,
        imageUrl:'',
        updateTime:new Date().toLocaleString(),
        ...dialogForm.value
      })
    }
  } catch (err) {
    console.log(err)
  }
}
// 获取角色信息
const getRoleList = async () => {
  let res = await getRoleListApi({})
  roleList.value = res.data.records
}
getRoleList()
// 封装打开dialog方法
const openDialog = (type: string, title: string, data = {} as any) => {
  Visible.value = true
  dialogTitle.value = title
  dialogType.value = type
  if (type === 'edit') {
    nextTick(() => {
      dialogForm.value = _.cloneDeep(data.row)
    })
  }
}

// 关闭dialog并清空表单数据
const handleClose = () => {
  Visible.value = false
  nextTick(() => {
    dialogFormRef.value?.resetFields()
  })
}
// 向父组件暴漏方法
defineExpose({
  openDialog
})
</script>
<style lang='scss' scoped></style>