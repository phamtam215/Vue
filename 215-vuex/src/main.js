import { createApp } from 'vue';

import App from './App.vue';
import { createStore } from 'vuex';

const numbersModule = {
  state() {
    return {
      counter: 0, // Biến state tập trung, dùng chung cho toàn app
    };
  },
  mutations: {
    increment(state, payload) {
      state.counter += payload.value;
    },
    setFavoriteNumber(state, payload) {
      state.favoriteNumber = payload.value;
    },
  },
  actions: {
    incrementAsync(context, payload) {
      setTimeout(() => {
        context.commit('increment', payload);
      }, 2000);
    },
  },
  getters: {
    finalCounter(state) {
      return state.counter;
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
  },
};

const store = createStore({
  modules: {
    numbers: numbersModule,
  },

  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {
    setAuth(state, payload) {
      state.isLoggedIn = payload.isAuth;
    },
  },
  actions: {
    login(context) {
      context.commit('setAuth', { isAuth: true });
    },
    logout(context) {
      context.commit('setAuth', { isAuth: false });
    },
  },
  getters: {
    userIsAuthenticated(state) {
      return state.isLoggedIn;
    },
  },
});

const app = createApp(App);

app.use(store);
app.mount('#app');
