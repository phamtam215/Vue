<template>
  <section>
    <header>
      <h1>My Friends</h1>
    </header>

    <new-friend-form @add-friend="addFriend($event)"></new-friend-form>

    <ul>
      <friend-contact
        v-for="friend in friends"
        :id="friend.id"
        :key="friend.id"
        :name="friend.name"
        :phone-number="friend.phoneNumber"
        :email-address="friend.emailAddress"
        :is-favorite="friend.isFavorite"
        @toggle-event:is-favorite="toggleFavoriteStatus($event)"
        @delete="deleteFriend($event)"
      ></friend-contact>
    </ul>
  </section>
</template>

<script>
import FriendContact from './components/FriendContact.vue'
import NewFriendForm from './components/NewFriendForm.vue'
export default {
  components: { FriendContact, NewFriendForm },

  data() {
    return {
      friends: [
        {
          id: 'f1',
          name: 'Manuel Lorenz',
          phoneNumber: '0123 45678 90',
          emailAddress: 'manuel@localhost.com',
          isFavorite: false
        },
        {
          id: 'f2',
          name: 'Julie Jones',
          phoneNumber: '0987 654421 21',
          emailAddress: 'julie@localhost.com',
          isFavorite: true
        }
      ],
      newFriend: {
        name: '',
        phoneNumber: '',
        emailAddress: ''
      }
    }
  },
  methods: {
    toggleFavoriteStatus(friendId) {
      const friend = this.friends.find(f => f.id === friendId)
      if (friend) {
        friend.isFavorite = !friend.isFavorite
      }
    },
    addFriend(friendData) {
      const newFriend = {
        id: 'f' + (this.friends.length + 1),
        name: friendData.name,
        phoneNumber: friendData.phoneNumber,
        emailAddress: friendData.emailAddress,
        isFavorite: false
      }
      this.friends.push(newFriend)
    },
    deleteFriend(friendId) {
      this.friends = this.friends.filter(f => f.id !== friendId)
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: 'Jost', sans-serif;
}
body {
  margin: 0;
}
header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}
#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app li,
#app form {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}
#app h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
}
#app button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
  border: solid #4e4343 2px; /* ⬅️ Thêm dòng này */
  border-radius: 4px;
  margin: 2px;
}
#app button:hover,
#app button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

#app form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Flexbox cho từng div chứa label + input */
#app form div {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Đẩy button qua bên phải */
#app form div {
  justify-content: flex-end;
}

/* Label có width cố định để các input align */
#app form label {
  min-width: 80px;
  text-align: left;
}

input {
  font: inherit;
  padding: 0.25rem;
  /* Xóa margin-left vì đã dùng gap trong flexbox */
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1; /* Input chiếm phần còn lại */
}
</style>
