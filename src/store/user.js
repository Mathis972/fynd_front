
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default {
  state: {
    isLogged: false,
    token: undefined,
    userLoading: false,
    userId: localStorage.getItem('utilisateur') || undefined
  },
  getters: {
    user_token: function (state) {
      return state.token
    },
    is_logged: function (state) { return state.isLogged },
    user_Id: function (state) { return state.userId },
    user_loading: function (state) { return state.userLoading }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER_ID (state, userId) {
      state.userId = userId
    },
    SET_USER_LOADING (state, loading) {
      state.userLoading = loading
    },
    SET_IS_LOGGED (state, isLogged) {
      state.is_logged = isLogged
    }
  },
  actions: {
    logIn: async function ({ commit, state }, data) {
      const payload = {}
      let returnValue
      // if (state.userLoading === true) return false
      // commit('SET_USER_LOADING', true)
      payload.email = data.email
      payload.mot_de_passe = data.mot_de_passe

      const connectionRequest = await axios.post('http://localhost:8000/utilisateurs/login', payload)
        .then((r) => {
          console.log(r)
          commit('SET_USER_LOADING', false)
          if (r.status === 200) {
            localStorage.setItem('token', r.data.token)
            localStorage.setItem('utilisateur', JSON.stringify(r.data.userId))
            commit('SET_TOKEN', r.data.token)
            commit('SET_USER_ID', r.data.userId)
            commit('SET_IS_LOGGED', true)
            returnValue = { error: false }
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem('utilisateur')
          }
        })
        .catch(function (e) {
          localStorage.removeItem('token')
          localStorage.removeItem('utilisateur')
          commit('SET_USER_LOADING', false)
          returnValue = { error: true, message: e.response.data.message }
        })
      Promise.all([connectionRequest]).then(function () { })
      return returnValue
    }
  },
  modules: {
  }
}
