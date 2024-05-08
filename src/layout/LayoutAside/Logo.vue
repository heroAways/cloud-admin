<template>
    <div class="logo">
        <img src="https://img2.imgtp.com/2024/05/07/Dh48nAjK.png" alt="">
        <span v-if="!LayoutConfigStore.isCollapse">优思安-Vue3全家桶项目</span>
    </div>
</template>
<script lang='ts' setup>
import { useLayoutConfig } from '@/stores/useLayoutConfig'
const LayoutConfigStore = useLayoutConfig()
</script>
<style lang='scss' scoped>

</style>