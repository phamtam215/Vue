<template>
  <h3>Counter: {{ finalCounter }}</h3>
</template>

<script>
import { mapGetters } from 'vuex/dist/vuex.cjs.js';

export default {
  computed: {
    // counter() {
    //   return this.$store.getters.finalCounter; // Đọc giá trị counter từ Vuex store
    // },

    ...mapGetters(['finalCounter']), // Module global, không cần prefix
  },
};
</script>
