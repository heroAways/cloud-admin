<template>
    <el-main class="layout-main">
        <el-scrollbar>
            <div class="layout-main-wrap">
                <router-view v-slot="{ Component }">
                    <transition name="fade1" mode="out-in">
                        <keep-alive>
                            <component v-if="$route.meta.caches" :key="$route.name" :is="Component" />
                        </keep-alive>
                    </transition>
                    <transition name="fade" mode="out-in">
                        <component v-if="!$route.meta.caches" :key="$route.name" :is="Component" />
                    </transition>
                </router-view>
            </div>
        </el-scrollbar>
    </el-main>
</template>
<script lang='ts' setup>

</script>
<style lang='scss' scoped>

</style>