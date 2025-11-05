export default {
  incrementAsync(context, payload) {
    setTimeout(() => {
      context.commit('increment', payload);
    }, 2000);
  },
};
