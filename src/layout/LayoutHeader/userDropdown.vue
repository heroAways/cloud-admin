<template>
    <div class="layout-header-userDropdown">
        <div class="layout-header-userDropdown-icon">
            <svg-icon @click="handleFullScreen" :icon="isFullscreen ? 'aim' : 'FullScreen'"></svg-icon>
        </div>
        <div class="layout-header-userDropdown-switch">
            <el-switch v-model="isDark" inline-prompt active-icon="moon" inactive-icon="sunny"></el-switch>
        </div>
        <div class="layout-header-userDropdown-dropDown">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar :size="30" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
                    <span>何敏</span>
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="$router.push('/')">首页</el-dropdown-item>
                        <el-dropdown-item @click="$router.push('/401')">401</el-dropdown-item>
                        <el-dropdown-item @click="$router.push('/404')">404</el-dropdown-item>
                        <el-dropdown-item @click="logout" divided>退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { useFullscreen, useDark } from '@vueuse/core'
import {useAuthorStore} from '@/stores/useAuthor'
const store = useAuthorStore()
const { isFullscreen,toggle } = useFullscreen()
const handleFullScreen = ()=>{
   toggle()
}
const logout = ()=>{
    store.logoutStore()
}
const isDark = useDark({
    valueDark: 'dark',
    valueLight: '',
    initialValue:'dark'
})

</script>
<style lang='scss' scoped>

</style>