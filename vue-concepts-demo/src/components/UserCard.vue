<template>
  <!-- Child component: Nhận props từ parent -->
  <div class="user-card">
    <div class="user-header">
      <div class="avatar">{{ userNameInitial }}</div>
      <div class="user-info">
        <h4>{{ userName }}</h4>
        <span class="badge" v-if="isPremium">⭐ Premium</span>
      </div>
    </div>

    <div class="user-details">
      <p>
        <strong>Tuổi:</strong>
        {{ userAge }}
      </p>
      <p>
        <strong>Email:</strong>
        {{ userEmail }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  // Khai báo props với validation
  props: {
    userName: {
      type: String,
      required: true,
      default: 'Người dùng'
    },
    userAge: {
      type: Number,
      required: true,
      validator(value) {
        return value > 0 && value < 150
      }
    },
    userEmail: {
      type: String,
      required: false,
      default: 'không có email'
    },
    isPremium: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // Lấy chữ cái đầu của tên
    userNameInitial() {
      return this.userName.charAt(0).toUpperCase()
    }
  }
}
</script>

<style scoped>
.user-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fd79a8, #ff7675);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.user-info h4 {
  margin: 0;
  color: #2d3436;
}

.badge {
  display: inline-block;
  background: #ffeaa7;
  color: #d63031;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.user-details {
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.user-details p {
  margin: 8px 0;
  color: #636e72;
}
</style>
