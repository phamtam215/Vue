<template>
  <!-- Vue sẽ compile template này thành render function -->
  <h2>My friends</h2>
  <ul>
    <!-- Behind the scenes: Vue tìm 'friend-contact' trong:
         1. Local components (components: { FriendContact })
         2. Global components (app.component())
         3. Tạo 2 instance riêng biệt của FriendContact component
         4. Mỗi instance có state riêng (data, methods) -->
    <friend-contact></friend-contact>
    <friend-contact></friend-contact>
  </ul>
</template>

<script>
// Import component để sử dụng locally (không bắt buộc vì đã register globally)
import FriendContact from './components/FriendContact.vue'

export default {
  // Đăng ký component locally - Vue sẽ ưu tiên local registration hơn global
  // Behind the scenes: Vue merge local components với global components
  components: { FriendContact }

  // Note: Có thể remove dòng này vì đã register globally trong main.js
  // Nhưng best practice là register locally để code rõ ràng hơn
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

#app li {
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
}

#app button:hover,
#app button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}
</style>
