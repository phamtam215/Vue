<template>
  <li>
    <h2>
      {{ name }}
      <span v-if="isFavorite === true">★</span>
      <span v-else>☆</span>
    </h2>
    <button @click="toggleDetails">
      {{ detailsAreVisible ? 'Hide' : 'Show' }} Details
    </button>

    <button @click="toggleFavorite">
      {{ isFavorite === true ? 'Unfavorite' : 'Favorite' }}
    </button>

    <ul v-if="detailsAreVisible">
      <li>
        <strong>Phone:</strong>
        {{ phoneNumber }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ emailAddress }}
      </li>
    </ul>

    <button @click="deleteFriend(id)">Delete</button>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    emailAddress: {
      type: String,
      required: true
    },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      detailsAreVisible: false
      // friendIsFavorite: this.isFavorite
    }
  },
  emits: ['toggle-event:is-favorite', 'delete'],
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible
    },
    toggleFavorite() {
      // this.friendIsFavorite = !this.friendIsFavorite
      // Emit event để parent component (App.vue) lắng nghe và cập nhật state
      // toggle-event (kebab-case)

      // this đại diện cho component instance hiện tại, có thể truy cập props, data, methods
      // this.id là prop id được truyền từ parent component
      this.$emit('toggle-event:is-favorite', this.id)
    },
    deleteFriend(id) {
      this.$emit('delete', id)
    }
  }
}
</script>
