import mutations from './mutation.js';
import actions from './action.js';
import getters from './getters.js';

export default {
  namespaced: true, // Local module - getters/actions/mutations cần prefix 'numbers/'
  state() {
    return {
      counter: 0, // Biến state tập trung, dùng chung cho toàn app
    };
  },
  mutations,
  actions,
  getters,
};
