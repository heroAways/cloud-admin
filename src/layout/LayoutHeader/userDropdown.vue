<template>
    <div class="layout-header-userDropdown">
        <div class="layout-header-userDropdown-icon">
            <svg-icon icon="FullScreen"></svg-icon>
        </div>
        <div class="layout-header-userDropdown-switch">
            <el-switch></el-switch>
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
                        <el-dropdown-item command="a">Action 1</el-dropdown-item>
                        <el-dropdown-item command="b">Action 2</el-dropdown-item>
                        <el-dropdown-item command="c">Action 3</el-dropdown-item>
                        <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script lang='ts' setup>

</script>
<style lang='scss' scoped>

</style>