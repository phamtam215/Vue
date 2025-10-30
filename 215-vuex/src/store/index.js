import { createStore } from 'vuex';
import rootActions from './action.js';
import rootMutations from './mutation.js';
import rootGetters from './getters.js';
import numbersModule from './counter/index.js';

const store = createStore({
  modules: {
    numbers: numbersModule,
  },
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});

export default store;
