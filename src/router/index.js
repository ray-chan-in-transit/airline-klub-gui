import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
