<template>
    <div class="error-container">
        <img class="error-container-img" src="http://vue3.mengxuegu.com/assets/401-53da0fc8.svg" alt="">
        <div class="error-container-textBox">
            <div class="error-title">
                您所访问的页面不存在！
            </div>
            <div class="error-link">
                请检查您输入的网址是否正确，或点击下面的按钮返回首页。
            </div>
            <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </div>
    </div>
</template>
<script lang='ts' setup>

</script>
<style lang='scss' scoped></style>