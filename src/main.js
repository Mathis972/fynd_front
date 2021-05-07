import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
Vue.config.productionTip = false

const socketConnection = SocketIO('http://localhost:8000')

Vue.use(new VueSocketIO({
  debug: true,
  connection: socketConnection
})
)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
