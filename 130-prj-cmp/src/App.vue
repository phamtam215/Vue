<template>
  <the-header title="RememberMe"></the-header>
  <stored-resource :stored-resources="storedResources"></stored-resource>
</template>

<script>
import StoredResource from './components/learning-resources/StoredResource.vue';

export default {
  components: {
    StoredResource,
  },
  data() {
    return {
      storedResources: [
        {
          id: 'official-guide',
          name: 'Official Guide',
          description: 'The official guide Vue.',
          link: 'https://vuejs.org',
        },
        {
          id: 'google',
          name: 'Google',
          description: "Search the world's information",
          link: 'https://www.google.com',
        },
      ],
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
</style>
