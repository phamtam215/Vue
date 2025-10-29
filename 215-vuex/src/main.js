import { createApp } from 'vue';

import App from './App.vue';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      counter: 0, // Biến state tập trung, dùng chung cho toàn app
      isLoggedIn: false,
    };
  },
  mutations: {
    increment(state, payload) {
      state.counter += payload.value;
    },
    setAuth(state, payload) {
      state.isLoggedIn = payload.isAuth;
    },
  },

  actions: {
    incrementAsync(context, payload) {
      setTimeout(() => {
        context.commit('increment', payload);
      }, 2000);
    },
    login(context) {
      context.commit('setAuth', { isAuth: true });
    },
    logout(context) {
      context.commit('setAuth', { isAuth: false });
    },
  },

  getters: {
    finalCounter(state) {
      return state.counter * 2;
    },
    normalizedCounter(_, getters) {
      const finalCounter = getters.finalCounter;
      if (finalCounter < 0) {
        return 0;
      }
      if (finalCounter > 100) {
        return 100;
      }
      return finalCounter;
    },
    userIsAuthenticated(state) {
      return state.isLoggedIn;
    },
  },
});

const app = createApp(App);

app.use(store);
app.mount('#app');
