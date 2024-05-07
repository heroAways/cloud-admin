<template>
        <el-aside width="200px">
                <LoGo></LoGo>
                <Menu></Menu>
        </el-aside>
</template>
<script lang='ts' setup>
import { defineAsyncComponent } from 'vue';
const LoGo = defineAsyncComponent(() => import('./Logo.vue'))
const Menu = defineAsyncComponent(() => import('./Menu.vue'))
</script>
<style lang='scss' scoped>

</style>