<template>
  <h3>Counter Favorite: {{ counter }}</h3>
  <p>Do</p>
</template>

<script>
export default {
  computed: {
    counter() {
      return this.$store.getters['numbers/normalizedCounter']; // Local module - cần prefix 'numbers/'
    },
  },
};
</script>
