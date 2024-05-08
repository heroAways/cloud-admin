<template>
    <div class="layout-header-breadCurem">
        <div class="layout-header-breadCurem-icon">
            <svg-icon @click="handleCollapse" :icon="layoutConfigStore.isCollapse ? 'Expand' : 'Fold'"
                size="20"></svg-icon>
        </div>
        <div class="layout-header-breadCurem-bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
                    <span v-if="index === breadList.length - 1" class="flex flex-center">
                        <svg-icon :icon="item.meta.icon"></svg-icon>
                        {{ item.meta.title }}
                    </span>
                    <a @click.prevent="handleLink(item)" v-else class="flex flex-center">
                        <svg-icon :icon="item.meta.icon"></svg-icon>
                        {{ item.meta.title }}
                    </a>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { useLayoutConfig } from '@/stores/useLayoutConfig';
import { onMounted, ref } from 'vue';
const layoutConfigStore = useLayoutConfig();
const handleCollapse = () => {
    layoutConfigStore.isCollapse = !layoutConfigStore.isCollapse;
}
const breadList = ref<RouteRecordNormalized[]>([]);
import { useRouter,useRoute, onBeforeRouteUpdate, type RouteLocationNormalized, type RouteRecordNormalized } from 'vue-router';
const route = useRoute();
const router = useRouter();
onBeforeRouteUpdate((to: RouteLocationNormalized)=>{
    getBreadList(to)
})
const getBreadList = (to: RouteLocationNormalized)=>{
    let matched = to.matched.filter(item => item.meta && item.meta.title && item.meta.icon)
    breadList.value = matched
}
const handleLink = (_route: RouteRecordNormalized) => {
    const { path, redirect } = _route;
    if (redirect) router.push(redirect as string);
    else router.push(path);
};
onMounted(()=>{
    getBreadList(route)
})
</script>
<style lang='scss' scoped>
.el-breadcrumb__item {
  span {
    display: flex;
    align-items: center;
  }
}
</style>