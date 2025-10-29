<template>
  <h3>Counter: {{ counter }}</h3>
</template>

<script>
import { mapGetters } from 'vuex/dist/vuex.cjs.js';

export default {
  computed: {
    // counter() {
    //   return this.$store.getters.finalCounter; // Đọc giá trị counter từ Vuex store
    // },

    ...mapGetters(['finalCounter']),
  },
};
</script>
