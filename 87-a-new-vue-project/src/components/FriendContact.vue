<template>
  <li>
    <!-- Behind the scenes: Vue tạo reactive binding cho friend.name
         Khi friend.name thay đổi, DOM sẽ tự động update -->
    <h2>{{ friend.name }}</h2>

    <!-- Event listener binding - Vue tự động thêm/remove event listeners
         @click được compile thành addEventListener('click', toggleDetails) -->
    <button @click="toggleDetails">Show Details</button>

    <!-- Conditional rendering - Vue sẽ tạo/destroy DOM elements dựa trên condition
         Behind the scenes: Vue track detailsAreVisible và re-render khi thay đổi -->
    <ul v-if="detailsAreVisible">
      <li>Phone: {{ friend.phone }}</li>
      <li>Email: {{ friend.email }}</li>
    </ul>
  </li>
</template>

<script>
export default {
  // data() function được gọi cho TỪNG INSTANCE của component
  // Behind the scenes: Vue tạo reactive proxy cho return object
  data() {
    return {
      // Mỗi component instance có state riêng biệt
      // Behind the scenes: Vue wrap properties này với Proxy để track changes
      detailsAreVisible: false,
      friend: {
        name: 'Max',
        phone: '555-5555',
        email: 'max@example.com'
      }
    }
  },
  methods: {
    // Methods được bind với component instance (this context)
    // Behind the scenes: Vue đảm bảo 'this' luôn point đến component instance
    toggleDetails() {
      // Khi change reactive data, Vue sẽ:
      // 1. Track dependency (template sử dụng detailsAreVisible)
      // 2. Queue re-render
      // 3. Update DOM trong nextTick
      this.detailsAreVisible = !this.detailsAreVisible
    }
  }

  // Component Lifecycle (ẩn):
  // 1. beforeCreate: instance được tạo, chưa có data/methods
  // 2. created: data/methods đã khởi tạo, chưa mount DOM
  // 3. beforeMount: template compile xong, chưa insert vào DOM
  // 4. mounted: component đã render và insert vào DOM
  // 5. beforeUpdate/updated: khi reactive data thay đổi
  // 6. beforeUnmount/unmounted: khi component bị destroy
}
</script>
