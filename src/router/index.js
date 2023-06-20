import { createRouter, createWebHistory } from "vue-router";
import HomePage from '../views/HomePage.vue'
import PostsPage from '../views/PostsPage.vue'

const routes = [
    {
        path: '/home',
        name: 'home',
        component: HomePage
    },
    {
        path: '/posts',
        name: 'posts',
        component: PostsPage
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router