<template>
  <!-- Tab Form - có state input -->
  <div class="tab-content">
    <h4>Form Tab</h4>
    <p>Nhập text vào form rồi chuyển tab:</p>
    <ul>
      <li>❌ Không KeepAlive: Input bị clear</li>
      <li>✅ Có KeepAlive: Input giữ nguyên text</li>
    </ul>
    <div class="form">
      <label>Tên của bạn:</label>
      <input v-model="name" type="text" placeholder="Nhập tên..." />

      <label>Email:</label>
      <input v-model="email" type="email" placeholder="Nhập email..." />

      <div v-if="name || email" class="preview">
        <p><strong>Preview:</strong></p>
        <p>Tên: {{ name || '(chưa nhập)' }}</p>
        <p>Email: {{ email || '(chưa nhập)' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabForm',
  data() {
    return {
      name: '',
      email: ''
    }
  },
  mounted() {
    console.log('✅ TabForm mounted')
  },
  unmounted() {
    console.log('❌ TabForm unmounted')
  },
  activated() {
    console.log('🔥 TabForm activated')
  },
  deactivated() {
    console.log('💤 TabForm deactivated')
  }
}
</script>

<style scoped>
.tab-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

h4 {
  color: #0984e3;
  margin-top: 0;
}

ul {
  background: #f8f9fa;
  padding: 15px 35px;
  border-radius: 5px;
}

.form {
  margin-top: 20px;
}

label {
  display: block;
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2d3436;
}

input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #0984e3;
}

.preview {
  margin-top: 20px;
  padding: 15px;
  background: #e3f2fd;
  border-left: 4px solid #0984e3;
  border-radius: 4px;
}

.preview p {
  margin: 5px 0;
}
</style>
