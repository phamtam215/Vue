<template>
  <button @click="addOne">Add {{ numberIncrement }}</button>
</template>

<script>
export default {
  props: {
    numberIncrement: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    addOne() {
      this.$store.commit('increment', { value: this.numberIncrement }); // Gọi mutation có tên là "increment" để tăng counter, coi như truyền tham số value
    },
  },
};
</script>
