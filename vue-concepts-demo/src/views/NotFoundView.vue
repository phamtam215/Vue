<template>
  <!-- 404 Not Found View -->
  <div class="not-found-view">
    <div class="error-container">
      <div class="error-code">404</div>
      <h1>Không Tìm Thấy Trang</h1>
      <p class="error-message">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại.
      </p>

      <div class="route-info">
        <p><strong>URL bạn đang truy cập:</strong></p>
        <code>{{ $route.fullPath }}</code>
      </div>

      <div class="actions">
        <router-link to="/" class="btn btn-primary">
          🏠 Về Trang Chủ
        </router-link>
        <button @click="goBack" class="btn btn-secondary">← Quay Lại</button>
      </div>

      <div class="info-box">
        <h3>📚 About Catch-All Routes</h3>
        <p>
          Route này sử dụng catch-all pattern để bắt tất cả URL không match:
        </p>
        <pre><code>{
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFoundView
}</code></pre>
        <p class="note">
          💡
          <code>:pathMatch(.*)*</code>
          sẽ match bất kỳ URL nào không khớp với các routes đã định nghĩa trước
          đó.
        </p>
      </div>

      <div class="suggestions">
        <h3>Có thể bạn đang tìm:</h3>
        <ul>
          <li><router-link to="/">🏠 Trang chủ</router-link></li>
          <li><router-link to="/about">ℹ️ Giới thiệu</router-link></li>
          <li><router-link to="/user/1">👤 User Profile</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
    console.log('❌ 404 Not Found:', this.$route.fullPath)
  }
}
</script>

<style scoped>
.not-found-view {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.error-container {
  max-width: 700px;
  text-align: center;
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  color: #e74c3c;
  text-shadow: 4px 4px 0 rgba(231, 76, 60, 0.2);
  margin: 0;
  line-height: 1;
}

h1 {
  font-size: 36px;
  color: #2d3436;
  margin: 20px 0;
}

.error-message {
  font-size: 18px;
  color: #636e72;
  margin: 20px 0;
}

.route-info {
  margin: 30px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.route-info code {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  background: #2d3436;
  color: #dfe6e9;
  border-radius: 4px;
  font-family: monospace;
  word-break: break-all;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 30px 0;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #0984e3;
  color: white;
}

.btn-primary:hover {
  background: #0770c9;
}

.btn-secondary {
  background: #636e72;
  color: white;
}

.btn-secondary:hover {
  background: #2d3436;
}

.info-box {
  margin: 40px 0;
  padding: 20px;
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
  border-radius: 8px;
  text-align: left;
}

.info-box h3 {
  margin-top: 0;
  color: #2d3436;
}

.info-box pre {
  background: #2d3436;
  color: #dfe6e9;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  text-align: left;
}

.info-box code {
  font-family: monospace;
  font-size: 14px;
  line-height: 1.6;
}

.note {
  margin-top: 15px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  font-size: 14px;
}

.suggestions {
  margin-top: 40px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: left;
}

.suggestions h3 {
  margin-top: 0;
  color: #2d3436;
}

.suggestions ul {
  list-style: none;
  padding: 0;
  margin: 15px 0 0 0;
}

.suggestions li {
  margin: 10px 0;
}

.suggestions a {
  display: inline-block;
  padding: 8px 15px;
  background: white;
  color: #0984e3;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s;
}

.suggestions a:hover {
  background: #0984e3;
  color: white;
}
</style>
