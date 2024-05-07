import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {setRegisterGlobal} from './global'
import '@/style/index.scss'
const app = createApp(App)
app.use(setRegisterGlobal)
app.use(createPinia())
app.use(router)
console.log('main',import.meta.env.VITE_APP_BASE_API);

app.mount('#app')
