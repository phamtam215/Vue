const app = Vue.createApp({
  data() {
    return { goals: [], goalInput: '' }
  },
  methods: {
    addGoal() {
      const enteredGoal = this.goalInput
      if (enteredGoal.trim() === '') {
        return
      }
      this.goals.push({ id: Math.random().toString(), text: enteredGoal })
      this.goalInput = ''
    },
    removeGoal(index) {
      this.goals.splice(index, 1)
    }
  }
})

app.mount('#user-goals')

// v-if, v-else, v-else-if, v-show, v-for, :key
