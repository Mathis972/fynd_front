import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/user'
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
  routes,
  store
})
// const listRoutes = ['Connexion']

// router.beforeEach((to, from, next) => {
//   if (listRoutes.indexOf(to.name) > -1) {
//     next()
//   } else {
//     if (store.getters.is_logged === true) {
//       next()
//     } else {
//       next({ name: 'Connexion' })
//     }
//   }
// })
export default router
