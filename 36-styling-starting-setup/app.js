const app = Vue.createApp({
  data() {
    return {
      boxASelected: false,
      boxBSelected: false,
      boxCSelected: false
    }
  },
  computed: {
    boxAColorClasses() {
      console.log('A color', this.boxASelected)
      return {
        activeColor: this.boxASelected
      }
    },
    boxBColorClasses() {
      return {
        activeColor: this.boxBSelected
      }
    },
    boxCColorClasses() {
      return {
        activeColor: this.boxCSelected
      }
    }
  },
  methods: {
    boxSelected(box) {
      if (box === 'A') {
        this.boxASelected = !this.boxASelected
      } else if (box === 'B') {
        this.boxBSelected = !this.boxBSelected
      } else if (box === 'C') {
        this.boxCSelected = !this.boxCSelected
      }
    }
  }
})
app.mount('#styling')
