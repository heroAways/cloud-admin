<script lang="ts" setup>
import { ref, nextTick } from "vue";

// 控制抽屉的显示与隐藏
const visible = ref<boolean>(false);

// 抽屉的标题
const drawerTitle = ref<string>();

// 关闭抽屉触发的方法
const handleClose = () => {
  visible.value = false;
};

// 打开抽屉的方法
const openDrawer = (title: string) => {
  drawerTitle.value = title;
  visible.value = true;
};

// 导出给父组件使用
defineExpose({
  openDrawer,
});

const defaultProps = {
  children: "children",
  label: "label",
};

const data = ref([
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        children: [
          {
            id: 9,
            label: "Level three 1-1-1",
          },
          {
            id: 10,
            label: "Level three 1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
      },
      {
        id: 8,
        label: "Level two 3-2",
      },
    ],
  },
]);

const treeRef = ref();

// tree展开或者收起的状态
const defaultExpandAll = ref<boolean>(false);

// 展开与收起的方法
const handleExpand = () => {
  nextTick(() => {
    defaultExpandAll.value = !defaultExpandAll.value;
    changeTreeNodeStatus(treeRef.value.store.root);
  });

  console.log("defaultExpandAll", defaultExpandAll);
};

/**
 * 递归所有节点将它的子节点展开
 */
function changeTreeNodeStatus(node: any) {
  // console.log('node', node);
  node.expanded = defaultExpandAll.value;
  for (let i = 0; i < node.childNodes.length; i++) {
    // 改变节点的自身expanded状态
    node.childNodes[i].expanded = defaultExpandAll.value;
    // 查询当前节点是否还有子节点
    if (node.childNodes[i].childNodes.length > 0) {
      // 递归此节点下的N级子节点
      changeTreeNodeStatus(node.childNodes[i]);
    }
  }
}
</script>

<template>
  <el-drawer
    v-model="visible"
    title="分配【售前客服】的权限"
    direction="rtl"
    :before-close="handleClose"
    size="400px"
  >
    <el-tree
      ref="treeRef"
      style="max-width: 600px"
      :data="data"
      show-checkbox
      node-key="id"
      :default-expand-all="defaultExpandAll"
      :props="defaultProps"
    />

    <template #footer>
      <el-button type="primary">提交</el-button>
      <el-button>全选/全不选</el-button>
      <el-button @click="handleExpand">展开/收起</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss"></style>