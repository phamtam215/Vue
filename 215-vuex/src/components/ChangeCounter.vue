<template>
  <button @click="incrementAsync({ value: numberIncrement })">
    Add {{ numberIncrement }}
  </button>
</template>

<script>
import { mapActions } from 'vuex/dist/vuex.cjs.js';

export default {
  props: {
    numberIncrement: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    // addOne() {
    // this.$store.commit('increment', { value: this.numberIncrement }); // Gọi mutation có tên là "increment" để tăng counter, coi như truyền tham số value
    // this.$store.dispatch('incrementAsync', { value: this.numberIncrement }); // Gọi action có tên là "incrementAsync" để tăng counter bất đồng bộ

    // },

    ...mapActions(['incrementAsync']), // Ánh xạ action incrementAsync từ Vuex store vào component
  },
};
</script>
