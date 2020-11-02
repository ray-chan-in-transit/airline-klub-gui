import { createRouter, createWebHistory } from 'vue-router'
// import App from '../App.vue'
import Dash from '../Dash.vue'
import Routes from '../Routes.vue'
import Home from '../views/Home.vue'
import Bank from '../views/Bank.vue'
import Oil from '../views/Oil.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  },
  {
    path: '/bank',
    name: 'Bank',
    component: Bank
  },
  {
    path: '/oil',
    name: 'Oil',
    component: Oil
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
