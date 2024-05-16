<template>
  <el-drawer :before-close="handleClose" size="400" style="font-size: 14px;" v-model="visibale" direction="rtl">
    <template #header>
      <span>{{ drawerName }}</span>
    </template>
    <template #default>
      <el-tree ref="treeRef" :props="defaultProps" :data="data" show-checkbox node-key="id" :default-expand-all="defaultExpandAll">
        <template #default="{ node, data }">
          <svg-icon v-if="data.meta.icon" style="margin-right: 5px;" :icon="filterNode(data.meta.icon)"></svg-icon>
          <span>{{ data.meta.title }}</span>
      </template>
      </el-tree>
    </template>
    <template #footer>
      <el-popconfirm @confirm="handleSubmit" width="157" confirm-button-text="确定" cancel-button-text="取消"
        title="确定提交权限吗？">
        <template #reference>
          <el-button type="primary" @click.stop>提交</el-button>
        </template>
      </el-popconfirm>
      <el-button @click="handleCheckAll">全选/不选</el-button>
      <el-button @click="handleShowOrHide">展开/收起</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-drawer>
</template>
<script lang='ts' setup>
import { getMenuListApi } from '@/api/Menu/menuApi';
import { getIdsByGetApi, submitApi } from '@/api/Menu/roleApi';
import type { ResponseDataType } from '@/api/Types/menuType';
import { ElNotification, type ElTree } from 'element-plus';
import { ref, nextTick, onActivated, onMounted } from 'vue';
// 菜单列表数据
const data = ref<ResponseDataType[]>([])
// 获取菜单数据
const initMenuList = async () => {
  let res = await getMenuListApi()
  data.value = res.data
}
initMenuList()
// 过滤器
const filterNode = (icon: string) => {
  return icon.replace('ele-','')
}
// 角色ID
const roleId = ref<number | string>()
// 保存选中的菜单的id
const menuIds = ref<string[]>([])
// 标题名称
const drawerName = ref<string>('')
// 控制抽屉显示与隐藏
const visibale = ref<boolean>(false)
// 封装打开抽屉方法
const openDrawer = async (roleName: string, id: string | number) => {
  visibale.value = true
  roleId.value = id
  drawerName.value = roleName
  await initMenuList()
  await getIdsByGet()
  await checkMenuNode()
}
// 导出方法
defineExpose({
  openDrawer
})
// 关闭抽屉调用的方法
const handleClose = () => {
  visibale.value = false
}
/**
 * @description: 控制展开或隐藏
 */
// 控制是否全部展示或隐藏按钮
const defaultExpandAll = ref<boolean>(false)
// 定义树形控件标识符
const treeRef = ref<InstanceType<typeof ElTree>>()
onMounted(() => {
  console.log('treeRef', treeRef);

})
// 获取选中的id
const getIdsByGet = async () => {
  let res = await getIdsByGetApi(roleId.value!)
  menuIds.value = res.data
}
getIdsByGet()
// 控制展开或隐藏
const handleShowOrHide = async () => {
  defaultExpandAll.value = !defaultExpandAll.value

  await ShowOrHideTreeNode(treeRef.value?.root)
}
// 封装方法控制树形数据节点的展开属性
function ShowOrHideTreeNode(node: Node) {
  for (let i = 0; i < node.childNodes.length; i++) {
    node.childNodes[i].expanded = defaultExpandAll.value
    if (node.childNodes[i].childNodes.length > 0) {
      ShowOrHideTreeNode(node.childNodes[i])
    }
  }
}
// 全选全不选状态
const checkAll = ref<boolean>(false)
// 全选全不选
const handleCheckAll = () => {
  checkAll.value = !checkAll.value
  if (checkAll.value) {
    treeRef.value?.setCheckedNodes(data.value)
  } else {
    treeRef.value?.setCheckedNodes([])
  }
}
const defaultProps = {
  children: 'children',
  // label: (data: ResponseDataType, node: Node) => {
  //   return data.meta.title;
  // },
}
// 根据后台返回的权限数据选中对应的节点
const checkMenuNode = () => {

  menuIds.value!.forEach((id: string) => {
    treeRef.value?.setChecked(id, true, false);
  });
};
// 提交
const handleSubmit = async () => {
  let ids1 = treeRef.value!.getCheckedKeys()
  console.log('ids1', ids1);
  let ids2 = treeRef.value!.getHalfCheckedKeys()
  console.log('ids2', ids2);
  let menuAllIds = ids1.concat(ids2)
  try {
    await submitApi(roleId.value!, menuAllIds as string[])
  } catch (err) {
    console.log(err);
  }
  ElNotification({
    title: '操作成功',
    type: 'success',
  })
  handleClose()
}
</script>
<style lang='scss' scoped></style>