import type { App } from 'vue'
import registerElementPlus from './registerElementPlus'
import registerElementPlusIcon from './registerElementPlusIcon'

export const setRegisterGlobal = (app: App) => {
    app.use(registerElementPlus)
    app.use(registerElementPlusIcon)
}

