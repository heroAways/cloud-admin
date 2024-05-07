<template>
    <el-container class="layout-container">
        <LayoutAside></LayoutAside>
        <el-container direction="vertical">
            <LayoutHeader></LayoutHeader>
            <LayoutMain></LayoutMain>
        </el-container>
    </el-container>
</template>
<script lang='ts' setup>
import { defineAsyncComponent } from 'vue';
const LayoutAside = defineAsyncComponent(() => import('./LayoutAside/index.vue'));
const LayoutHeader = defineAsyncComponent(() => import('./LayoutHeader/index.vue'));
const LayoutMain = defineAsyncComponent(() => import('./LayoutMain/index.vue'));
</script>
<style lang='scss' scoped>

</style>