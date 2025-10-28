<template>
  <div class="demo-section">
    <h2>1. V-Bind, V-Model, V-On Demo</h2>

    <!-- Demo v-bind: Liên kết thuộc tính động -->
    <div class="subsection">
      <h3>📢 V-Bind (Một chiều: JS → HTML)</h3>
      <img :src="logoUrl" alt="Vue Logo" style="width: 100px" />
      <p :class="{ active: isActive, highlight: isHighlight }">
        Đoạn văn này thay đổi class dựa trên data
      </p>
      <button @click="isActive = !isActive">Toggle Active</button>
      <button @click="isHighlight = !isHighlight">Toggle Highlight</button>
    </div>

    <!-- Demo v-model: Liên kết hai chiều -->
    <div class="subsection">
      <h3>🔁 V-Model (Hai chiều: JS ↔ HTML)</h3>
      <input type="text" v-model="message" placeholder="Gõ gì đó..." />
      <p>
        Bạn đã gõ:
        <strong>{{ message }}</strong>
      </p>
    </div>

    <!-- Demo v-on: Xử lý sự kiện -->
    <div class="subsection">
      <h3>🔔 V-On (Một chiều: HTML → JS)</h3>
      <button @click="counter++">Đã click {{ counter }} lần</button>
      <button @click="handleReset">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VBindModelOnDemo',
  data() {
    return {
      // Data cho v-bind demo
      logoUrl: 'https://vuejs.org/images/logo.png',
      isActive: false,
      isHighlight: false,

      // Data cho v-model demo
      message: 'Hello Vue!',

      // Data cho v-on demo
      counter: 0
    }
  },
  methods: {
    handleReset() {
      this.counter = 0
    }
  }
}
</script>

<style scoped>
.demo-section {
  border: 2px solid #42b983;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}

.subsection {
  margin: 20px 0;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
}

h2 {
  color: #42b983;
  margin-top: 0;
}

h3 {
  color: #35495e;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #35805f;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 5px;
}

/* CSS cho demo v-bind */
.active {
  color: red;
  font-weight: bold;
}

.highlight {
  background-color: yellow;
  padding: 5px;
}
</style>
