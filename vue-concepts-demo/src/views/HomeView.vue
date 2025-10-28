<template>
  <!-- Home View - Trang chủ -->
  <div class="home-view">
    <div class="hero">
      <h1>🏠 Trang Chủ</h1>
      <p class="subtitle">Chào mừng đến với Vue Concepts Demo!</p>
    </div>

    <div class="content">
      <h2>Routing trong Vue</h2>

      <div class="info-box">
        <h3>📚 Route hiện tại (Truy cập qua $route):</h3>
        <ul>
          <li>
            <strong>Path:</strong>
            {{ $route.path }}
            <!-- VD: "/" hoặc "/about" -->
          </li>
          <li>
            <strong>Name:</strong>
            {{ $route.name }}
            <!-- VD: "Home" hoặc "About" -->
          </li>
          <li>
            <strong>FullPath:</strong>
            {{ $route.fullPath }}
            <!-- VD: "/about?search=vue" (bao gồm query) -->
          </li>
        </ul>
        <p class="note">
          💡
          <strong>$route</strong>
          là object chứa thông tin về route hiện tại. Khác với
          <strong>$router</strong>
          dùng để điều hướng (push, go, back).
        </p>
      </div>

      <div class="navigation-examples">
        <h3>Các cách điều hướng:</h3>

        <div class="example-section">
          <h4>1. Declarative Navigation (router-link)</h4>
          <p>
            <strong>&lt;router-link&gt;</strong>
            thay thế &lt;a&gt;, không reload trang.
            <br />
            Tự động thêm class
            <code>router-link-active</code>
            khi route match.
          </p>
          <div class="links">
            <!-- to="/" - Điều hướng đến path / -->
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/about" class="nav-link">About</router-link>
            <router-link to="/user/123" class="nav-link">User 123</router-link>
            <router-link to="/user/456" class="nav-link">User 456</router-link>
          </div>
        </div>

        <div class="example-section">
          <h4>2. Programmatic Navigation ($router.push)</h4>
          <p>
            Điều hướng bằng
            <strong>code trong methods</strong>
            .
            <br />
            Dùng
            <code>this.$router.push()</code>
            để chuyển trang.
          </p>
          <div class="buttons">
            <button @click="goToAbout">Go to About</button>
            <button @click="goToUser(789)">Go to User 789</button>
            <button @click="goBack">Go Back (history -1)</button>
            <button @click="goForward">Go Forward (history +1)</button>
          </div>
        </div>

        <div class="example-section">
          <h4>3. Named Routes</h4>
          <p>Sử dụng tên route thay vì path</p>
          <div class="buttons">
            <button @click="goToNamedRoute">Go to About (by name)</button>
          </div>
        </div>

        <div class="example-section">
          <h4>4. Query Parameters</h4>
          <p>Thêm query string vào URL</p>
          <div class="buttons">
            <button @click="goWithQuery">Go to About with query</button>
          </div>
          <p v-if="$route.query.message" class="query-display">
            Query message:
            <strong>{{ $route.query.message }}</strong>
          </p>
        </div>

        <div class="example-section">
          <h4>5. 404 Not Found</h4>
          <p>Thử truy cập route không tồn tại</p>
          <router-link to="/invalid-route" class="nav-link error">
            Go to Invalid Route
          </router-link>
        </div>
      </div>

      <div class="code-example">
        <h3>💡 Code Examples:</h3>
        <pre><code>// Declarative
&lt;router-link to="/about"&gt;About&lt;/router-link&gt;

// Programmatic
this.$router.push('/about')
this.$router.push({ name: 'About' })
this.$router.push({ path: '/user/123' })
this.$router.push({ path: '/about', query: { id: 123 } })

// Access route info
this.$route.path      // '/user/123'
this.$route.params    // { id: '123' }
this.$route.query     // { search: 'vue' }</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    goToAbout() {
      console.log('📍 Programmatic navigation to /about')
      this.$router.push('/about')
    },

    goToUser(userId) {
      console.log(`📍 Programmatic navigation to /user/${userId}`)
      this.$router.push(`/user/${userId}`)
    },

    goBack() {
      console.log('⬅️ Going back in history')
      this.$router.go(-1)
    },

    goForward() {
      console.log('➡️ Going forward in history')
      this.$router.go(1)
    },

    goToNamedRoute() {
      console.log('📍 Navigation using named route')
      this.$router.push({ name: 'About' })
    },

    goWithQuery() {
      console.log('📍 Navigation with query params')
      this.$router.push({
        path: '/about',
        query: {
          message: 'Hello from Home!',
          timestamp: Date.now()
        }
      })
    }
  },
  mounted() {
    console.log('🏠 HomeView mounted')
    console.log('Current route:', this.$route)
  }
}
</script>

<style scoped>
.home-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 30px;
}

.hero h1 {
  margin: 0;
  font-size: 36px;
}

.subtitle {
  font-size: 18px;
  margin: 10px 0 0 0;
  opacity: 0.9;
}

.content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-box {
  padding: 20px;
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
  border-radius: 4px;
  margin: 20px 0;
}

.info-box ul {
  margin: 10px 0 0 0;
}

.navigation-examples {
  margin: 30px 0;
}

.example-section {
  margin: 25px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.example-section h4 {
  margin-top: 0;
  color: #2d3436;
}

.links {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-link {
  padding: 10px 20px;
  background: #0984e3;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s;
}

.nav-link:hover {
  background: #0770c9;
}

.nav-link.error {
  background: #e74c3c;
}

/* router-link-active class tự động được thêm */
.nav-link.router-link-active {
  background: #00b894;
  font-weight: bold;
}

.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 10px 20px;
  background: #6c5ce7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

button:hover {
  background: #5f3dc4;
}

.query-display {
  margin-top: 15px;
  padding: 10px;
  background: #d4edda;
  border-left: 4px solid #28a745;
  border-radius: 4px;
}

.code-example {
  margin-top: 30px;
  padding: 20px;
  background: #2d3436;
  color: #dfe6e9;
  border-radius: 8px;
}

.code-example pre {
  margin: 10px 0 0 0;
  overflow-x: auto;
}

.code-example code {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
}
</style>
