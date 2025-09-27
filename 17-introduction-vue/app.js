const app = Vue.createApp({
  data() {
    // always a function that returns an object // implements the reactivity system
    return {
      // can setup any data you want
      courseGoal: 'Finish the course and learn Vue!', // can be used in the template
      courseGoalA: 'Master Vue and build amazing apps A', // cannot be used in the template
      courseGoalB: 'Master Vue and build amazing apps B', // cannot be used in the template
      vueLink: 'https://vuejs.org' // can be used in the template
    }
  },
  // what is methods? -> an object that contains functions that can be used in the template
  // what is template? -> the HTML code that is rendered by Vue
  methods: {
    outputGoal() {
      const randomNumber = Math.random()
      if (randomNumber < 0.5) {
        return this.courseGoalA
      } else {
        return this.courseGoalB
      }
    }
  }
}) // create a Vue application instance

app.mount('#user-goal') // define DOM element that Vue app will control -> section with id "user-goal"
