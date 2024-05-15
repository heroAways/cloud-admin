import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {setRegisterGlobal} from './global'
import '@/style/index.scss'
import pinia from './stores'
import './permission'
const app = createApp(App)
app.use(setRegisterGlobal)
app.use(pinia)
app.use(router)
// console.log('main',import.meta.env.VITE_APP_BASE_API);

app.mount('#app')
