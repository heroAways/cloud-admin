<template>
<h1 @click="handleClick">主页</h1>
</template>
<script lang='ts' setup>
import { getBanner } from '@/api'
const handleClick = async () =>{
    let res = await getBanner()
    console.log(res);
}
</script>
<style lang='scss' scoped>

</style>