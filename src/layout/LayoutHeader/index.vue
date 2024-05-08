<template>
    <el-header class="layout-header">
        <BreadCurem></BreadCurem>
        <userDropdown></userDropdown>
    </el-header>
</template>
<script lang='ts' setup>
import {defineAsyncComponent} from 'vue'
const BreadCurem = defineAsyncComponent(() => import('./BreadCurem.vue'))
const userDropdown = defineAsyncComponent(() => import('./userDropdown.vue'))
</script>
<style lang='scss' scoped>

</style>