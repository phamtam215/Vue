<template>
  <base-card>
    <base-button
      @click="setSelectedTab('stored-resource')"
      :mode="storedButtonMode"
      >Stored Resource</base-button
    >
    <base-button @click="setSelectedTab('add-resource')" :mode="addButtonMode"
      >Add Resource</base-button
    >
  </base-card>

  <keep-alive>
    <component :is="selectedTab"></component>
  </keep-alive>
</template>

<script>
import BaseCard from '../UI/BaseCard.vue';
import BaseButton from '../UI/BaseButton.vue';
import StoredResource from './StoredResource.vue';
import AddResource from './AddResource.vue';
export default {
  components: { BaseCard, BaseButton, StoredResource, AddResource },
  data() {
    return {
      selectedTab: 'stored-resource',
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
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
    addResource(title, description, link) {
      const newResource = {
        id: new Date().toISOString(),
        name: title,
        description: description,
        link: link,
      };
      this.storedResources.unshift(newResource);
      this.selectedTab = 'stored-resource';
    },
    removeResource(id) {
      const index = this.storedResources.findIndex(
        (resource) => resource.id === id
      );

      if (index !== -1) {
        this.storedResources.splice(index, 1); // ✅ Mutate existing array
      }
    },
  },
  // Provide storedResources to all child components
  provide() {
    return {
      storedResources: this.storedResources,
      // Provide the addResource method to child components
      addResource: this.addResource,
      removeResource: this.removeResource,
    };
  },
  computed: {
    // Computed properties for button modes
    storedButtonMode() {
      return this.selectedTab === 'stored-resource' ? null : 'flat';
    },
    addButtonMode() {
      return this.selectedTab === 'add-resource' ? null : 'flat';
    },
  },
};
</script>
