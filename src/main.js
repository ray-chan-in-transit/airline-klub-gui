/*es-lint disable*/
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <---

createApp(App).use(router).mount('#app')



// import { createApp } from 'vue'
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// Vue.use(VueRouter)

// import App from './App.vue'
// import Dash from './Dash.vue'
// // import router from './router'


// // const NotFoundComponent = { template: '<p>Page not found</p>' }
// // const HomeComponent = { template: '<p>Home page</p>' }
// // const AboutComponent = { template: '<p>About page</p>' }

// const routes = [
//   {path: '/', component: App},
//   {path: '/dash', component: Dash},
// ]

// const router = new VueRouter({routes})

// new Vue({
// 	router
// }).$mount('#app')