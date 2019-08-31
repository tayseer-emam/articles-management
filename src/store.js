import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userData = JSON.parse(localStorage.getItem('am_loggedInUser')) || null;

export default new Vuex.Store({
  state: {
    user: userData,
    isLoggedIn: !!userData,
  },
  getters: {
    user: state => state.user,
    isLoggedIn: state => state.isLoggedIn,
  },
  mutations: {
    LOG_IN(state, payload) {
      state.user = payload;
      state.isLoggedIn = true;
    },
    LOG_OUT(state) {
      state.isLoggedIn = false;
      state.user = null;
    }
  },
  actions: {
    logIn({ commit }, payload) {
      commit('LOG_IN', payload);
      localStorage.setItem('am_loggedInUser', JSON.stringify(payload));
    },
    logOut({ commit }) {
      commit('LOG_OUT');
      localStorage.removeItem('am_loggedInUser');
    }
  }
})
