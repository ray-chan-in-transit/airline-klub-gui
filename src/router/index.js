import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Dash from '../Dash.vue'
import Routes from '../Routes.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  },
  {
    path: '/routes',
    name: 'Routes',
    component: Routes
  },
  {
    path: '/dash',
    name: 'Dashboard',
    component: Dash
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
