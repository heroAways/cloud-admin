/// <reference types="vite/client" />
declare module '*.vue' {
    component: () => import('@/views/Home/index.vue');
    const dialog = defineAsyncComponent(() => import('./components/dialog.vue'))
}