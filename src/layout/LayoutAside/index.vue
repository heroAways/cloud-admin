<template>
        <el-aside class="layout-aside"
                :class="[LayoutConfigStore.isCollapse ? 'layout-aside-menu-60' : 'layout-aside-menu-200']">
                <LoGo></LoGo>
                <Menu></Menu>
        </el-aside>
</template>
<script lang='ts' setup>
import { defineAsyncComponent } from 'vue';
const LoGo = defineAsyncComponent(() => import('./Logo.vue'))
const Menu = defineAsyncComponent(() => import('./Menu.vue'))
import { useLayoutConfig } from '@/stores/useLayoutConfig'
const LayoutConfigStore = useLayoutConfig()
</script>
<style lang='scss' scoped>

</style>