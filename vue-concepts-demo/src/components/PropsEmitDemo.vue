<template>
  <div class="demo-section">
    <h2>6. Props và Emit Demo - Parent Component</h2>

    <!-- Truyền props xuống child -->
    <div class="subsection">
      <h3>🔽 Props: Truyền dữ liệu từ Parent → Child</h3>
      <UserCard
        :user-name="currentUser.name"
        :user-age="currentUser.age"
        :user-email="currentUser.email"
        :is-premium="currentUser.isPremium"
      />
    </div>

    <!-- Nhận emit từ child -->
    <div class="subsection">
      <h3>🔼 Emit: Nhận sự kiện từ Child → Parent</h3>
      <p class="info-box">
        <strong>Thông báo từ Child:</strong>
        {{ childMessage }}
      </p>

      <!-- Child component phát ra sự kiện -->
      <CounterChild
        :initial-count="parentCounter"
        @increment="handleIncrement"
        @decrement="handleDecrement"
        @reset="handleReset"
      />

      <p class="info-box">
        <strong>Counter ở Parent:</strong>
        {{ parentCounter }}
      </p>
    </div>

    <!-- Demo dynamic props -->
    <div class="subsection">
      <h3>🎛️ Thay đổi Props động:</h3>
      <div class="controls">
        <input v-model="currentUser.name" placeholder="Tên" />
        <input
          v-model.number="currentUser.age"
          type="number"
          placeholder="Tuổi"
        />
        <label>
          <input type="checkbox" v-model="currentUser.isPremium" />
          Premium User
        </label>
      </div>
      <p class="note">💡 Props tự động cập nhật khi data ở Parent thay đổi</p>
    </div>
  </div>
</template>

<script>
import UserCard from './UserCard.vue'
import CounterChild from './CounterChild.vue'

export default {
  name: 'PropsEmitDemo',
  components: {
    UserCard,
    CounterChild
  },
  data() {
    return {
      currentUser: {
        name: 'Nguyễn Văn An',
        age: 25,
        email: 'an@example.com',
        isPremium: false
      },
      parentCounter: 0,
      childMessage: 'Chưa có thông báo'
    }
  },
  methods: {
    // Xử lý sự kiện increment từ child
    handleIncrement(amount) {
      this.parentCounter += amount
      this.childMessage = `Child đã tăng ${amount}`
    },

    // Xử lý sự kiện decrement từ child
    handleDecrement(amount) {
      this.parentCounter -= amount
      this.childMessage = `Child đã giảm ${amount}`
    },

    // Xử lý sự kiện reset từ child
    handleReset() {
      this.parentCounter = 0
      this.childMessage = 'Child đã reset counter'
    }
  }
}
</script>

<style scoped>
.demo-section {
  border: 2px solid #fd79a8;
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
  color: #fd79a8;
  margin-top: 0;
}

.info-box {
  background: white;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #fd79a8;
  margin: 10px 0;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.controls input[type='text'],
.controls input[type='number'] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
  min-width: 150px;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.note {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
  font-style: italic;
}
</style>
