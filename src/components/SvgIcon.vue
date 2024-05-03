<template>
    <!-- <el-icon :size="size" :color="color">
        <component :is="icon" />
    </el-icon> -->
    <render/>
</template>
<script lang='ts' setup>
import { h, resolveComponent } from 'vue';

let prop = withDefaults(defineProps<{
    icon:string
    size?:number | string
    color?:string
}>(),{
    size:16
})
const render = ()=>{
    if(prop.icon){
        return h(
            resolveComponent('el-icon'),
            {
                size:prop.size,
                color:prop.color
            },
            ()=>h(resolveComponent(prop.icon))
        )
    }else{
        return h('i')
    }
}
</script>
<style lang='scss' scoped>

</style>