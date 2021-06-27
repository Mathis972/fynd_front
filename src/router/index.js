import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/user'
// import Connexion from '../views/Connexion.vue'
import Quizz from '../views/Quizz.vue'
import Profil from '../views/Profil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Chat',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/PageMessage.vue')
  },
  {
    component: () => import(/* webpackChunkName: "about" */ '../views/Connexion.vue'),
    path: '/Connexion',
    name: 'Connexion'
  },
  {
    path: '/quizz',
    name: 'Quizz',
    component: Quizz
  },
  {
    path: '/monprofil',
    name: 'Profil',
    component: Profil
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  store
})
// const listRoutes = ['Connexion']

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.isLogged) {
      console.log('yo')
      next('/Connexion')
    } else {
      console.log('yo2')
      next() // go to wherever I'm going
    }
  } else {
    next()
    // does not require auth, make sure to always call next()!
  }
})
export default router
