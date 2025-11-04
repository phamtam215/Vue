<template>
  <section>FILTER2</section>
  <section>
    <div class="control">
      <button>Refresh</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      <li v-for="value in filteredCoaches" :key="value.id">
        {{ value.firstName }} {{ value.lastName }}
      </li>
    </ul>
    <h3 v-else>No coaches found!</h3>
  </section>
</template>

<script>
export default {
  computed: {
    filteredCoaches() {
      return this.$store.getters['coaches/coaches']; // Local module - cần prefix 'coaches/'
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches']; // Local module - cần prefix 'coaches/'
    },
  },
};
</script>
