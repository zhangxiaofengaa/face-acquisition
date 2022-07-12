import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    token: sessionStorage.getItem('token') || 'token',
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      sessionStorage.setItem('token', state.token)
    },
    setUserInfo(state, data) {
      state.userInfo = data
    },
  },
  actions:  {},
  modules: {
  }
})
