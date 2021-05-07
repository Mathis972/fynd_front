import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

const socketConnection = SocketIO('http://localhost:8000')

Vue.use(VueMaterial)

Vue.use(new VueSocketIO({
  debug: true,
  connection: socketConnection
})
)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
