const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: '',
      name2: ''
    }
  },
  computed: {
    fullName() {
      console.log('fullName is called')
      if (this.name === '') {
        return ''
      }
      return this.name + ' ' + 'Smith'
    }
  },
  methods: {
    // setName(event) {
    //   this.name = event.target.value
    // },

    // setName2(event, lastName) {
    //   this.name2 = event.target.value + ' ' + lastName
    // },
    add(num) {
      this.counter += num
    },
    subtract(num) {
      console.log('Heloo')
      this.counter -= num
    },
    submitForm(event) {
      event.preventDefault()
      alert('Submitted!')
    },
    submitName() {
      alert(this.name)
    },
    resetInput() {
      this.name = ''
    },
    testUpdateAfterReactiveAnyComponent() {
      console.log('Test function is called after any component is updated')
    }
  }
})

app.mount('#events')
