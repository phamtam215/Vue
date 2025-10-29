<template>
  <button @click="login" v-if="!isAuthenticated">Login</button>
  <button @click="logout" v-if="isAuthenticated">Logout</button>
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.dispatch('login');
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.userIsAuthenticated;
    },
  },
};
</script>
