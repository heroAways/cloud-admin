import router from './router'
import { useAuthorStore } from '@/stores/useAuthor'
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    const store = useAuthorStore()
    const token = store.token
    // 如果有token就放行 但是不能进入login页面
    if (token) {
        if (to.path === '/login') {
            next({ path: from.path })
        } else {
            next()
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})