<template>
    <div>
        <h1>主页</h1>
        <el-input width="200" v-model="value"></el-input>
    </div>
</template>
<script lang='ts' setup name="Home">
import { ref } from 'vue'
let value = ref('')
</script>
<style lang='scss' scoped></style>