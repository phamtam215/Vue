export default {
  increment(state, payload) {
    state.counter += payload.value;
  },
  setFavoriteNumber(state, payload) {
    state.favoriteNumber = payload.value;
  },
};
