
const routes = [
  {
    path: '/Connexion',
    name: 'Connexion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Connexion.vue')
  },
  {
    path: '/',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "about" */ '../views/PageMessage.vue')
  }
]

export default routes
