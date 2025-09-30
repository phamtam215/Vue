<template>
  <form @submit.prevent="submitData">
    <div>
      <label for="name">Name</label>
      <input type="text" id="name" v-model="newFriend.name" required />
    </div>

    <div>
      <label for="phone">Phone</label>
      <input type="tel" id="phone" v-model="newFriend.phoneNumber" required />
    </div>

    <div>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="newFriend.emailAddress"
        required
      />
    </div>

    <div class="button-add-friend">
      <button type="submit">Add Friend</button>
    </div>
  </form>
</template>

<script>
export default {
  // emit data to parent component (App.vue)
  emits: ['add-friend'],
  data() {
    return {
      newFriend: {
        name: '',
        phoneNumber: '',
        emailAddress: ''
      }
    }
  },
  methods: {
    submitData() {
      const friendData = {
        name: this.newFriend.name,
        phoneNumber: this.newFriend.phoneNumber,
        emailAddress: this.newFriend.emailAddress
      }
      // emit event to parent component (App.vue)
      this.$emit('add-friend', friendData)

      // reset form
      this.newFriend.name = ''
      this.newFriend.phoneNumber = ''
      this.newFriend.emailAddress = ''
    }
  }
}
</script>
