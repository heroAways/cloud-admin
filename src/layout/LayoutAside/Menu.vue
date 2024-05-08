<template>
    <el-menu active-text-color="#ffd04b" background-color="#fff" class="el-menu-vertical-demo"
        :default-active="$route.path" text-color="#000" router :default-openeds="['/system']"
        :collapse="LayoutConfigStore.isCollapse">
        <el-menu-item index="/home">
            <svg-icon icon="house"></svg-icon>
            <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="/system">
            <template #title>
                <svg-icon icon=setting></svg-icon>
                <span>系统管理</span>
            </template>
            <el-menu-item index="/system/menu">
                <svg-icon icon="menu"></svg-icon>
                <span>菜单管理</span>
            </el-menu-item>
            <el-menu-item index="/system/role">
                <svg-icon icon="iceCream"></svg-icon>
                <span>角色管理</span>
            </el-menu-item>
            <el-menu-item index="/system/user">
                <svg-icon icon="user"></svg-icon>
                <span>用户管理</span>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/goods">
            <template #title>
                <svg-icon icon=Goods></svg-icon>
                <span>商品管理</span>
            </template>
            <el-menu-item index="/goods/list">
                <svg-icon icon="GoodsFilled"></svg-icon>
                <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="/goods/category">
                <svg-icon icon="Operation"></svg-icon>
                <span>商品分类</span>
            </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/link">
            <svg-icon icon="link"></svg-icon>
            <span>优思安官网</span>
        </el-menu-item>
        <el-menu-item index="/401">
            <svg-icon icon="warning"></svg-icon>
            <span>401页面</span>
        </el-menu-item>
    </el-menu>
</template>
<script lang='ts' setup>
import {useLayoutConfig} from '@/stores/useLayoutConfig'
const LayoutConfigStore = useLayoutConfig()
</script>
<style lang='scss' scoped>

</style>