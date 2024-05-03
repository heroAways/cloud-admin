import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {setRegisterGlobal} from './global'
const app = createApp(App)
app.use(setRegisterGlobal)
app.use(createPinia())
app.use(router)

app.mount('#app')
