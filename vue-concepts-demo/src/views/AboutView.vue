<template>
  <!-- About View - Trang giới thiệu -->
  <div class="about-view">
    <div class="header">
      <h1>ℹ️ Giới Thiệu</h1>
      <p>Trang này demo các tính năng của Vue Router</p>
    </div>

    <div class="content">
      <div class="section">
        <h2>📍 Route Information</h2>
        <div class="route-info">
          <p>
            <strong>Path:</strong>
            <code>{{ $route.path }}</code>
          </p>
          <p>
            <strong>Name:</strong>
            <code>{{ $route.name }}</code>
          </p>
          <p>
            <strong>Full Path:</strong>
            <code>{{ $route.fullPath }}</code>
          </p>
        </div>
      </div>

      <!-- Query Parameters -->
      <div v-if="hasQueryParams" class="section query-section">
        <h2>🔍 Query Parameters</h2>
        <p>Route này có query parameters:</p>
        <div class="query-display">
          <pre>{{ JSON.stringify($route.query, null, 2) }}</pre>
        </div>

        <p v-if="$route.query.message" class="message-box">
          💬 Message:
          <strong>{{ $route.query.message }}</strong>
        </p>
      </div>

      <!-- Navigation -->
      <div class="section">
        <h2>🧭 Navigation</h2>
        <div class="nav-buttons">
          <router-link to="/" class="btn btn-primary">
            ← Back to Home
          </router-link>
          <router-link to="/user/100" class="btn btn-secondary">
            Go to User Profile →
          </router-link>
        </div>
      </div>

      <!-- Navigation Guards Info -->
      <div class="section">
        <h2>🔒 Navigation Guards</h2>
        <p>Mở Console để xem navigation guards được trigger:</p>
        <ul>
          <li>
            <code>router.beforeEach()</code>
            - Global guard trước mọi navigation
          </li>
          <li>
            <code>router.afterEach()</code>
            - Global hook sau khi navigation xong
          </li>
          <li>
            <code>beforeEnter</code>
            - Guard của từng route riêng lẻ
          </li>
        </ul>

        <div class="example">
          <p>
            <strong>Ví dụ:</strong>
            Thử truy cập User Profile với ID không phải số:
          </p>
          <router-link to="/user/abc" class="btn btn-warning">
            Go to /user/abc (sẽ bị chặn)
          </router-link>
        </div>
      </div>

      <!-- Route Meta -->
      <div class="section">
        <h2>📝 Route Meta Fields</h2>
        <p>Route này có meta data:</p>
        <div class="meta-display">
          <pre>{{ JSON.stringify($route.meta, null, 2) }}</pre>
        </div>
        <p class="note">
          💡 Meta fields được dùng để lưu thông tin như: title, requiresAuth,
          layout, v.v.
        </p>
      </div>

      <!-- Component Lifecycle với Router -->
      <div class="section">
        <h2>♻️ Component Lifecycle với Router</h2>
        <p>Các lifecycle hooks đã chạy (xem Console):</p>
        <ul>
          <li>
            ✅
            <code>created()</code>
            - Component được tạo
          </li>
          <li>
            ✅
            <code>mounted()</code>
            - Component được mount vào DOM
          </li>
          <li>
            ⏳
            <code>beforeUnmount()</code>
            - Sẽ chạy khi rời khỏi route
          </li>
          <li>
            ⏳
            <code>unmounted()</code>
            - Sẽ chạy sau khi unmount
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  computed: {
    hasQueryParams() {
      return Object.keys(this.$route.query).length > 0
    }
  },
  created() {
    console.log('✅ AboutView created')
  },
  mounted() {
    console.log('✅ AboutView mounted')
    console.log('Route params:', this.$route.params)
    console.log('Route query:', this.$route.query)
  },
  beforeUnmount() {
    console.log('⏳ AboutView beforeUnmount')
  },
  unmounted() {
    console.log('❌ AboutView unmounted')
  }
}
</script>

<style scoped>
.about-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 30px;
}

.header h1 {
  margin: 0;
  font-size: 36px;
}

.header p {
  margin: 10px 0 0 0;
  opacity: 0.9;
}

.content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section {
  margin: 30px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.section h2 {
  margin-top: 0;
  color: #2d3436;
}

.route-info,
.query-display,
.meta-display {
  padding: 15px;
  background: white;
  border-radius: 4px;
  border-left: 4px solid #0984e3;
}

.query-display pre,
.meta-display pre {
  margin: 0;
  font-family: monospace;
  font-size: 14px;
}

.message-box {
  margin-top: 15px;
  padding: 15px;
  background: #d4edda;
  border-left: 4px solid #28a745;
  border-radius: 4px;
}

.nav-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s;
  display: inline-block;
}

.btn-primary {
  background: #0984e3;
  color: white;
}

.btn-primary:hover {
  background: #0770c9;
}

.btn-secondary {
  background: #6c5ce7;
  color: white;
}

.btn-secondary:hover {
  background: #5f3dc4;
}

.btn-warning {
  background: #fdcb6e;
  color: #2d3436;
}

.btn-warning:hover {
  background: #f9bf3b;
}

.example {
  margin-top: 15px;
  padding: 15px;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
}

.note {
  margin-top: 10px;
  padding: 10px;
  background: #e3f2fd;
  border-radius: 4px;
  font-size: 14px;
}

code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}

ul {
  line-height: 1.8;
}
</style>
