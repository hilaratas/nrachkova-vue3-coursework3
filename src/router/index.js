import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Tasks
  },
  {
    path: '/task/:taskId',
    name: 'Task',
    component: () => import(/* webpackChunkName: "about" */ '../views/Task.vue')
  },
  {
    path: '/new',
    name: 'New',
    component: () => import(/* webpackChunkName: "about" */ '../views/New.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
