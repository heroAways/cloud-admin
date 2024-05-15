import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import type { App } from 'vue'
export default {
    install(app: App) {
        app.use(ElementPlus,{
            locale: zhCn,
          })
    }
}