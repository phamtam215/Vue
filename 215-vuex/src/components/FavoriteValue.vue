<template>
  <h3>Counter Favorite: {{ counter }}</h3>
  <p>Do</p>
</template>

<script>
export default {
  computed: {
    counter() {
      return this.$store.getters.normalizedCounter; // Đọc giá trị counter từ Vuex store
    },
  },
};
</script>
