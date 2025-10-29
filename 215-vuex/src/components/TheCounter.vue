<template>
  <h3>Counter: {{ counter }}</h3>
</template>

<script>
export default {
  computed: {
    counter() {
      return this.$store.state.counter; // Đọc giá trị counter từ Vuex store
    },
  },
};
</script>
