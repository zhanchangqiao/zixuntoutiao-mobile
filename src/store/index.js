import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/until/storage'
Vue.use(Vuex)
const USER_KEY = 'user'
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setuser (state, data) {
      state.user = data
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
