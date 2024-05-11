import { local } from '@/utils/storage'
import {defineStore} from 'pinia'
import { loginApi, logoutApi,getUserInfoApi } from '@/api/userApi'
import { ref } from 'vue'
export const useAuthorStore = defineStore('author',()=>{
    const token = ref<string>('')
    const user = ref()
    const buttonList = ref([])
    const menuList = ref([])
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
    const getUser = async () => {
        try{
            let res = await getUserInfoApi()
            console.log(res);
            user.value =res.data.data.userInfo
            buttonList.value =res.data.data.buttonList
            menuList.value = res.data.data.menuList
        }catch(err){
            console.log(err);
        }
    }
    const reMoteToken = ()=>{
        token.value = ''
    }
    const logoutStore = async ()=>{
        let res = await logoutApi()
        console.log(res);
        reMoteToken()
        window.location.reload()
    } 
    const login = async (state:any)=>{
        let res = await loginApi(state.loginForm)
        console.log('res==>',res);
        token.value = res.data.data.access_token
    }
    return {
        setRemember,
        login,
        token,
        reMoteToken,
        logoutStore,
        getUser,
        user,
        buttonList,
        menuList
    }
},{
    persist: true
})