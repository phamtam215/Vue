<template>
  <!-- User Profile View - Dynamic Route với params -->
  <div class="user-profile-view">
    <div class="header">
      <h1>👤 User Profile</h1>
      <p class="user-id">
        User ID:
        <strong>{{ userId }}</strong>
      </p>
    </div>

    <div class="content">
      <!-- Route Params -->
      <div class="section">
        <h2>🎯 Route Params (Dynamic Segments)</h2>
        <p>
          Route này sử dụng dynamic params:
          <code>/user/:id</code>
        </p>
        <div class="params-display">
          <p>
            <strong>Current User ID:</strong>
            {{ userId }}
          </p>
          <p>
            <strong>Type:</strong>
            {{ typeof userId }}
          </p>
          <p><strong>Full Params:</strong></p>
          <pre>{{ JSON.stringify($route.params, null, 2) }}</pre>
        </div>
      </div>

      <!-- Mock User Data -->
      <div class="section">
        <h2>📊 User Data</h2>
        <div v-if="userData" class="user-card">
          <div class="avatar">{{ userData.avatar }}</div>
          <div class="user-details">
            <h3>{{ userData.name }}</h3>
            <p>
              <strong>Email:</strong>
              {{ userData.email }}
            </p>
            <p>
              <strong>Role:</strong>
              <span :class="'badge ' + userData.role">{{ userData.role }}</span>
            </p>
            <p>
              <strong>Joined:</strong>
              {{ userData.joined }}
            </p>
          </div>
        </div>
        <div v-else class="not-found">❌ User not found</div>
      </div>

      <!-- Navigation để test dynamic params -->
      <div class="section">
        <h2>🔄 Thay đổi User ID</h2>
        <p>Click vào các user khác để thay đổi route params:</p>
        <div class="user-links">
          <router-link
            v-for="id in [1, 2, 3, 4, 5, 100, 999]"
            :key="id"
            :to="`/user/${id}`"
            class="user-link"
            :class="{ active: userId == id }"
          >
            User {{ id }}
          </router-link>
        </div>

        <div class="programmatic-nav">
          <p>Hoặc nhập User ID và navigate programmatically:</p>
          <input
            v-model.number="inputUserId"
            type="number"
            placeholder="Nhập User ID"
          />
          <button @click="goToUser">Go to User</button>
        </div>
      </div>

      <!-- beforeEnter Guard Demo -->
      <div class="section guard-demo">
        <h2>🔒 Route Guard Demo</h2>
        <p>
          Route này có
          <code>beforeEnter</code>
          guard kiểm tra User ID phải là số.
        </p>
        <p><strong>Thử các trường hợp sau:</strong></p>
        <div class="test-cases">
          <router-link to="/user/123" class="btn btn-success">
            ✅ /user/123 (hợp lệ)
          </router-link>
          <router-link to="/user/abc" class="btn btn-danger">
            ❌ /user/abc (sẽ bị chặn)
          </router-link>
          <router-link to="/user/xyz123" class="btn btn-danger">
            ❌ /user/xyz123 (sẽ bị chặn)
          </router-link>
        </div>
        <p class="note">💡 Mở Console để xem log của beforeEnter guard</p>
      </div>

      <!-- Watch route changes -->
      <div class="section">
        <h2>👀 Watch Route Changes</h2>
        <p>
          Component này sử dụng
          <code>watch</code>
          để phát hiện thay đổi route params
        </p>
        <p>
          Số lần route params thay đổi:
          <strong>{{ routeChangeCount }}</strong>
        </p>
        <div class="route-history">
          <strong>Lịch sử:</strong>
          <ul>
            <li v-for="(change, index) in routeHistory" :key="index">
              {{ change }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfileView',
  data() {
    return {
      inputUserId: '',
      routeChangeCount: 0,
      routeHistory: [],
      // Mock user data
      users: {
        1: {
          id: 1,
          name: 'Nguyễn Văn An',
          email: 'an@example.com',
          role: 'admin',
          joined: '2020-01-15',
          avatar: '👨‍💼'
        },
        2: {
          id: 2,
          name: 'Trần Thị Bình',
          email: 'binh@example.com',
          role: 'user',
          joined: '2021-03-20',
          avatar: '👩'
        },
        3: {
          id: 3,
          name: 'Lê Văn Cường',
          email: 'cuong@example.com',
          role: 'user',
          joined: '2021-06-10',
          avatar: '👨'
        },
        4: {
          id: 4,
          name: 'Phạm Thị Dung',
          email: 'dung@example.com',
          role: 'moderator',
          joined: '2020-11-05',
          avatar: '👩‍💻'
        },
        5: {
          id: 5,
          name: 'Hoàng Văn Em',
          email: 'em@example.com',
          role: 'user',
          joined: '2022-02-28',
          avatar: '👦'
        }
      }
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    },
    userData() {
      return this.users[this.userId] || null
    }
  },
  watch: {
    // Watch route params changes
    '$route.params.id'(newId, oldId) {
      console.log(`🔄 Route params changed: ${oldId} → ${newId}`)
      this.routeChangeCount++
      this.routeHistory.push(`${oldId || 'initial'} → ${newId}`)
    }
  },
  methods: {
    goToUser() {
      if (this.inputUserId) {
        this.$router.push(`/user/${this.inputUserId}`)
      }
    }
  },
  created() {
    console.log('✅ UserProfileView created for user:', this.userId)
    this.routeHistory.push(`Initial load: ${this.userId}`)
  },
  mounted() {
    console.log('✅ UserProfileView mounted')
  }
}
</script>

<style scoped>
.user-profile-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 30px;
}

.header h1 {
  margin: 0;
  font-size: 36px;
}

.user-id {
  margin: 10px 0 0 0;
  font-size: 18px;
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

.params-display {
  padding: 15px;
  background: white;
  border-left: 4px solid #0984e3;
  border-radius: 4px;
}

.params-display pre {
  margin: 10px 0 0 0;
  font-family: monospace;
  font-size: 14px;
}

.user-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 2px solid #dfe6e9;
}

.avatar {
  font-size: 64px;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 50%;
}

.user-details h3 {
  margin: 0 0 10px 0;
  color: #2d3436;
}

.badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.badge.admin {
  background: #e74c3c;
  color: white;
}

.badge.moderator {
  background: #f39c12;
  color: white;
}

.badge.user {
  background: #3498db;
  color: white;
}

.not-found {
  padding: 20px;
  text-align: center;
  color: #e74c3c;
  font-size: 18px;
}

.user-links {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.user-link {
  padding: 10px 20px;
  background: #0984e3;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s;
}

.user-link:hover {
  background: #0770c9;
}

.user-link.active {
  background: #00b894;
  font-weight: bold;
}

.programmatic-nav {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border-radius: 4px;
}

.programmatic-nav input {
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 16px;
}

.programmatic-nav button {
  padding: 8px 20px;
  background: #6c5ce7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.programmatic-nav button:hover {
  background: #5f3dc4;
}

.guard-demo {
  background: #fff3cd;
  border-left: 4px solid #ffc107;
}

.test-cases {
  display: flex;
  gap: 10px;
  margin: 15px 0;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-success {
  background: #00b894;
  color: white;
}

.btn-success:hover {
  background: #00a085;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
}

.note {
  margin-top: 10px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  font-size: 14px;
}

.route-history {
  padding: 15px;
  background: white;
  border-radius: 4px;
}

.route-history ul {
  margin: 10px 0 0 0;
  padding-left: 20px;
}

code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}
</style>
