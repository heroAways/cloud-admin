<script setup lang="ts">
import { RouterView } from 'vue-router'
import SvgIcon from './components/SvgIcon.vue';
import request from './utils/request';
const req = ()=>{
  // request.post('/login').then(res=>{
  //   console.log(res);
  // })
  // request.get('/banner').then(res=>{
  //   console.log(res);
    
  // })
  request.get('').then(res=>{
    console.log(res);
  })
}
</script>

<template>
  <!-- <SvgIcon icon="Loading"></SvgIcon>
  <button @click="req">点击</button> -->
  <RouterView />
</template>

<style scoped>

</style>
