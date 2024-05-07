/// <reference types="vite/client" />
declare module '*.vue' {
    component: () => import('@/views/Home/index.vue')
}