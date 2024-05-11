import router from './router'
import { useAuthorStore } from '@/stores/useAuthor'
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
    const store = useAuthorStore()
    const token = store.token
    // 如果有token就放行 但是不能进入login页面
    if (token) {
        if (to.path === '/login') {
            next({ path: from.path })
        } else {
            if(!store.user?.username || store.buttonList.length <= 0){
                const res:any = await store.getUser()
                if(res.data.data.userInfo.username){
                    next()
                }else{
                    next('/login')
                }
            }else{
                next()
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})