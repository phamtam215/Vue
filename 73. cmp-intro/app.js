const app = Vue.createApp({
  data() {
    return {
      detailAreVisible: false,
      friends: [
        {
          id: 'manuel',
          name: 'Manuel',
          phone: '123-456-789',
          email: 'manuel@localhost.com'
        },
        {
          id: 'julie',
          name: 'Julie',
          phone: '987-654-321',
          email: 'julie@localhost.com'
        }
      ]
    }
  },
  methods: {
    toggleDetails(event) {
      this.detailAreVisible = !this.detailAreVisible
      event.target.textContent = this.detailAreVisible
        ? 'Hide Details'
        : 'Show Details'
    }
  }
})

app.component('friend-contact', {
  template: `
    <li>
          <h2>{{ friend.name }}</h2>
          <button @click="toggleDetails">{{ detailAreVisible ? 'Hide' : 'Show' }} Details</button>
          <ul v-if="detailAreVisible">
            <li><strong>Phone:</strong> {{ friend.phone }}</li>
            <li><strong>Email:</strong> {{ friend.email }}</li>
          </ul>
    </li>
  `,
  data() {
    return {
      detailAreVisible: false,
      friend: {
        id: 'manuel',
        name: 'Manuel',
        phone: '123-456-789',
        email: 'manuel@localhost.com'
      }
    }
  },
  methods: {
    toggleDetails(event) {
      this.detailAreVisible = !this.detailAreVisible
      event.target.textContent = this.detailAreVisible
        ? 'Hide Details'
        : 'Show Details'
    }
  }
})

app.mount('#app')
