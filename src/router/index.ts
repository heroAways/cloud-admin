import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const dynamicRoutes: RouteRecordRaw[] = [
  {
    path:'/',
    name:'layout', 
    component:()=>import('@/layout/index.vue'),
    redirect :'/home',
    children:[
      {
        path:'/home',
        name:'Home',
        component:()=>import('@/views/Home/index.vue'),
        meta:{
          title:'首页',
          caches:false,
          hidden:false
        }
      },
      {
        path: '/system',
        name: 'System',
        meta: {
          title: '系统管理',
          caches: false,
          hidden: false
        },
        children:[
          {
            path:'/system/menu',
            name:'SystemMenu',
            component: () => import('@/views/System/Menu/index.vue'),
            meta:{
              title:'菜单管理',
              caches:false,
              hidden:false
            }
          },
          // /system/role 角色管理
          {
            path: '/system/role',
            name: 'SystemRole',
            component: () => import('@/views/System/Role/index.vue'),
            meta: {
              title: '角色管理',
              caches: false,
              hidden: false
            }
          },
          // /system/user 用户管理
          {
            path: '/system/user',
            name: 'SystemUser',
            component: () => import('@/views/System/User/index.vue'),
            meta: {
              title: '用户管理',
              caches: false,
              hidden: false
            }
          },
        ]
      },
      {
        path: '/goods',
        name: 'Goods',
        meta: {
          title: '商品管理',
          caches: false,
          hidden: false
        },
        children:[
          {
            path: '/goods/list',
            name: 'GoodsList',
            component: () => import('@/views/Goods/List/index.vue'),
            meta: {
              title: '商品列表',
              caches: false,
              hidden: false
            }
          },
          // goods/category 商品分类
          {
            path: '/goods/category',
            name: 'GoodsCategory',
            component: () => import('@/views/Goods/Category/index.vue'),
            meta: {
              title: '商品分类',
              caches: false,
              hidden: false
            }
          }
        ]
      },
      {
        path:'/link',
        name:'Link',
        component:()=>import('@/views/Link/index.vue'),
        meta:{
          title:'优思安科技有限公司',
          caches:false,
          hidden:false
        }
      },
      {
        path: '/401',
        name: 'NoPermission',
        component: () => import('@/views/error/401.vue'),
        meta: {
          title: '401页面',
          caches: true,
          hidden: true
        }
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/error/404.vue'),
        meta: {
          title: '404页面',
          caches: true,
          hidden: true
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: dynamicRoutes
})

export default router
