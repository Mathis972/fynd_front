import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)
export default function () {
  const Store = new Vuex.Store({
    modules: {
      user: user
    },
    strict: process.env.DEBUGGING
  })

  return Store
}
