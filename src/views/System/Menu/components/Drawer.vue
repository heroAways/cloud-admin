<template>
    <!-- 抽屉 -->
    <el-drawer size="650px" v-model="drawer" direction="rtl" :before-close="handleClose">
        <template #header>
            <h4>{{ dialogTitle }}</h4>
        </template>
        <template #default>
            <el-form :model="formData" label-width="120px" label-position="right" ref="formDtaRef">
                <el-form-item label="上级菜单：" prop="parentId">
                    <el-cascader style="width: 100%" placeholder="请选择上级菜单" v-model="formData.parentId"
                        :options="options" :props="props" clearable />
                </el-form-item>
                <el-form-item label="菜单类型：" required prop="type">
                    <el-radio-group v-model="formData.type">
                        <el-radio value="1" size="large" border>菜单</el-radio>
                        <el-radio value="2" size="large" border>按钮</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="菜单名称：" :rules="{
                    required: true,
                    message: '请选择菜单类型',
                    trigger: 'blur',
                }" prop="meta.title">
                    <el-input v-model="formData.meta.title" maxlength="10" placeholder="请输入菜单名称" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item label="路由地址：" v-if="formData.type == '1'" prop="path">
                    <el-input v-model="formData.path" maxlength="200" placeholder="路由地址path值" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item label="路由名称：" v-if="formData.type == '1'" prop="name">
                    <el-input v-model="formData.name" maxlength="50" placeholder="路由名称" show-word-limit type="text" />
                </el-form-item> 
                <el-form-item label="组件路径：" v-if="formData.type == '1'" prop="component">
                    <el-input v-model="formData.component" maxlength="390" placeholder="路由组件相对路径" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item prop="meta.code" label="权限标识：" v-if="formData.type == '2'">
                    <el-input v-model="formData.code" maxlength="50" placeholder="请输入权限标识" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item label="菜单图标：" v-if="formData.type == '1'" prop="meta.icon">
                    <el-input v-model="formData.meta.icon" maxlength="100" placeholder="请输入图标名 ele- 开头" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item label="重定向：" v-if="formData.type == '1'" prop="redirect">
                    <el-input v-model="formData.redirect" maxlength="200" placeholder="路由重定向地址redirect值" show-word-limit
                        type="text" />
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item required label="是否隐藏：">
                            <el-radio-group v-model="formData.meta.hidden" class="ml-4">
                                <el-radio :value="false">不隐藏</el-radio>
                                <el-radio :value="true">隐藏</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item required label="是否缓存：">
                            <el-radio-group v-model="formData.meta.cache" class="ml-4">
                                <el-radio :value="false">不缓存</el-radio>
                                <el-radio :value="true">缓存</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="排序：" prop="sort">
                    <el-input-number v-model="formData.sort" style="width: 300px;" :min="1" :max="10" />
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input v-model="formData.remark" maxlength="50" placeholder="请输入备注" show-word-limit
                        type="textarea" />
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-row justify="center">
                <el-col :span="3"><el-button @click="handleClose">取消</el-button></el-col>
                <el-col :span="3"><el-button type="primary" @click="handleSubmit">确定</el-button></el-col>
            </el-row>
        </template>
    </el-drawer>
</template>
<script lang='ts' setup>
import { addMenuApi, selectMenuApi, updateMenuApi } from '@/api/Menu/menuApi';
import { ElNotification } from 'element-plus';
import _ from 'lodash'
import { ref } from 'vue'
const emits = defineEmits(['refresh'])
const dialogTitle = ref('新增菜单')
const dialogType = ref('add')
const formDtaRef = ref()
// 表单数据
interface FormData {
    id?:'',
    code?: string,
    remark: string,
    sort: number,
    parentId: string,
    type: string,
    path: string,
    name: string,
    component: string,
    redirect: string,
    meta: any
}
const formData = ref<FormData>({
    id:'',
    code: '',
    remark: '',
    sort: 1,
    parentId: '',
    type: '1',
    path: '',
    name: '',
    component: '',
    redirect: '',
    meta: {
        title: '',
        hidden: false,
        cache: false,
        icon: ''
    }
})
const drawer = ref(false)
const openDradow = (type : "add" | "edit",title:string,data:any) => {
    drawer.value = true
    getSelectMenuList()
    dialogTitle.value = title
    dialogType.value = type
    formData.value.parentId = data.parentId
    if(type == "edit"){
        formData.value = _.cloneDeep(data)
    }
}
const handleSubmit = async () => {
    formDtaRef.value.validate(async (valid : any) => {
        if(valid){
            if(formData.value.type == "2"){
                formData.value.path = ''
                formData.value.component = ''
                formData.value.name = ''
                formData.value.redirect = ''
                formData.value.meta.icon = ''
                formData.value.meta.cache = false
                formData.value.meta.hidden = false
            }
            submitData()
        }
    })
}

const submitData = async () => {
    try {
    if (dialogType.value === "add") {
    //   delete formData.value.code;
      await addMenuApi(formData.value);
    } else {
      // 编辑
      await updateMenuApi(formData.value);
    }

    ElNotification({
      title: "操作成功!",
      type: "success",
    });

    handleClose();

    // 通过父组件操作成功
    emits("refresh");
  } catch (error) {
    console.log(error);
  }
}

defineExpose({
    openDradow,
});
const handleClose = () => {
    drawer.value = false
    formDtaRef.value.resetFields()
}
const options = ref()
const props = {
    checkStrictly: true,
    value: 'id',
    label: 'title'
}
// 获取选择菜单列表数据
const getSelectMenuList = async () => {
    try {
        let res = await selectMenuApi()
        options.value = res.data
    } catch (error) {
        console.log(error);
    }
}
</script>
<style lang='scss' scoped></style>