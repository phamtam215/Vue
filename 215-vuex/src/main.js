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
    increment(state) {
      state.counter++;
    },
  },
});

const app = createApp(App);

app.use(store);
app.mount('#app');
