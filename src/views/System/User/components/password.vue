<template>
    <el-dialog center :before-close="handleClose" v-model="Visible" :title="dialogTitle" width="500">
    <el-form status-icon size="large" label-width="95px" ref="dialogRef" :model="dialogForm" :rules="dialogFormRule">
      <el-form-item label="新密码：" prop="newPassword">
        <el-input clearable placeholder="请输入新密码" v-model="dialogForm.newPassword" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码：" prop="repPassword">
        <el-input clearable placeholder="请输入确认密码" v-model="dialogForm.repPassword" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button @click="handleSubmit" type="primary">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang='ts' setup>
/**
 *  引入
 */
import { changePasswordApi } from '@/api/Menu/userApi';
import type { UserPassParamsType } from '@/api/Types/userType';
import type { FormInstance } from 'element-plus';
import {ref,nextTick} from 'vue'
/**
 *  数据
 */
// 提醒父组件刷新
const emits = defineEmits(['refresh'])
// 标题
const dialogTitle = ref<string>('')
// 控制dialog显示隐藏按钮
const Visible = ref<boolean>(false)
// 表单标识符
const dialogRef = ref<FormInstance>()
// dialog表单数据
const dialogForm = ref<UserPassParamsType>({
    userId:1,
    newPassword:'',
    repPassword:''
})
/**
 *  方法
 */
// 正则
const validateRe = (rule:string,val:string,callBack:Function) => {
  const value = dialogForm.value.newPassword
  if(val!=value){
    callBack(new Error('两次输入密码不一致!'))
  }else{
    callBack()
  }
}
// 提交
const handleSubmit = async () => {
  dialogRef.value?.validate( async (valid)=>{
    if(valid){
        try{
          Visible.value = false
          await onSubmit()
          handleClose()
          emits('refresh')
        }catch(err){
          console.log(err);
        }
    }
  })
}
// 提交方法
const onSubmit = async () => {
  try{
    await changePasswordApi(dialogForm.value)
  }catch(err){
    console.log(err);
  }
}
// 正则验证
const validateNew = (rule:string,val:string,callBack:Function) => {
    const reg = /^[0-9a-zA-Z_*]{6,30}$/
    if(reg.test(val)){
        callBack()
    }else{
        callBack(new Error('新密码必须为6~30位数字、字母、下划线！'))
    }
}
// 数据验证规则
const dialogFormRule = ref({
    newPassword:[
        {required:true,validator:validateNew,message:'新密码必须为6~30位数字、字母、下划线！',trigger:'blur'}
    ],
    repPassword:[
        {required:true,message:'确认密码为必填项！',trigger:'blur'},
        {validator:validateRe,message:'两次输入密码不一致!',trigger:'blur'}
    ]   
})
// 封装打开dialog方法
const openDialog = (type:string,title:string,data={} as any) => {
    Visible.value = true
    dialogTitle.value = title
    dialogForm.value.userId = data.row.id
}
// 向父组件暴漏方法
defineExpose({
    openDialog
})
// 关闭dialog方法
const handleClose = () => {
    Visible.value = false
    nextTick(()=>{
        dialogRef.value?.resetFields()
    })
}
</script>
<style lang='scss' scoped>

</style>