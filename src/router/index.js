import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Diseases from '../views/Diseases.vue'
import Symptoms from '../views/Symptoms.vue'
import Covid from '../views/Covid.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/diseases',
    name: 'Diseases',
    component: Diseases
  },
  {
    path: '/symptoms',
    name: 'Symptoms',
    component: Symptoms
  },
  {
    path: '/covid',
    name: 'Covid',
    component: Covid
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
