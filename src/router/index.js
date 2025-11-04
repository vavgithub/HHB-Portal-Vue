import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../components/Layout/AdminLayout.vue'
import Dashboard from '../pages/admin/Dashboard.vue'

const routes = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'carrier',
        name: 'Carrier',
        component: Dashboard
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

