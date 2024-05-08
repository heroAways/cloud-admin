import {defineStore} from 'pinia' 
import {ref} from 'vue'
export const useLayoutConfig = defineStore('layoutConfig',()=>{
    let isCollapse = ref(false)
    return { isCollapse }
})