import { createApp } from 'vue';

import App from './App.vue';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      counter: 0, // Biến state tập trung, dùng chung cho toàn app
    };
  },
  mutations: {
    increment(state, payload) {
      state.counter += payload.value;
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
  },
});

const app = createApp(App);

app.use(store);
app.mount('#app');
