import Vue from 'vue'
import VueRouter from 'vue-router'
import Connexion from '../views/Connexion.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Connexion',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "about" */ '../views/PageMessage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
