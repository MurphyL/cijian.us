import { createWebHashHistory, createRouter } from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: () => import('@/views/blog-list.vue') },
        { name: 'blog-page', path: '/page/:num', component: () => import('@/views/blog-list.vue') },
        { name: 'blog-post', path: '/post/:filename', component: () => import('@/views/blog-post.vue') },
        { path: '/achive', component: () => import('@/views/blog-achive.vue') },
        { path: '/tags', component: () => import('@/views/blog-tags.vue') },
        { path: '/about', component: () => import('@/views/blog-list.vue') },
    ],
})