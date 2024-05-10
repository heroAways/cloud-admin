import { local } from '@/utils/storage'
import {defineStore} from 'pinia'
import { loginApi } from '@/api/userApi'
import { ref } from 'vue'
export const useAuthorStore = defineStore('author',()=>{
    const token = ref<string>('')
    const setRemember = (state:any)=>{
        if (state.isRemember) {
            local.set('username', state.loginForm.username)
            local.set('password', state.loginForm.password)
            local.set('isRemember', state.isRemember)
        } else {
            local.remove('username')
            local.remove('password')
            local.remove('isRemember')
        }
    }
    const login = async (state:any)=>{
        let res = await loginApi(state.loginForm)
        console.log('res==>',res);
        token.value = res.data.data.access_token
    }
    return {
        setRemember,
        login,
        token
    }
},{
    persist: true
})