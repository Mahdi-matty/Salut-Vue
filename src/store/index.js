import { createStore } from 'vuex';

const store = createStore({
  state: {
    isLoggedIn: false,
    user: null,
    token: null
  },
  mutations: {
    login(state, { token, user }) {
      state.isLoggedIn = true;
      state.user = user;
      state.token = token;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('idToken');
      localStorage.removeItem('user');
    }
  },
  getters: {
    selfUserId(state) {
      return state.user ? state.user.id : null;
    }
  },
  actions: {
    // Define actions for login and logout if needed
  },
});

export default store

