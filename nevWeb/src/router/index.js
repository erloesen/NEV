// create and router history
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        name: 'login',
        path: '/login',
        component:  () => import('@/views/login/index.vue')
    },
    {
        name: 'menu',
        path: '/menu',
        component:  () => import('@/views/menu/index.vue'),
        children: [
            {
                name: 'home',
                path: '/home',
                component: () => import('@/views/home/index.vue')
            },
            {
                name: 'system',
                path: '/system',
                component: () => import('@/views/set/system/index.vue')
            },
            {
                name: 'admin',
                path: '/admin',
                component: () => import('@/views/set/admin/index.vue')
            },
            {
                name: 'user',
                path: '/user',
                component: () => import('@/views/set/user/index.vue')
            },
            {
                name: 'country',
                path: '/country',
                component: () => import('@/views/country/index.vue')
            },
            {
                name: 'province',
                path: '/province',
                component: () => import('@/views/province/index.vue')
            },
            {
                name: 'satellite',
                path: '/satellite',
                component: () => import('@/views/factory/satellite/index.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
