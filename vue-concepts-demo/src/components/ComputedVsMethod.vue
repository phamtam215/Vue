<template>
  <div class="demo-section">
    <h2>2. Computed vs Method Demo</h2>

    <div class="subsection">
      <h3>Nhập tên:</h3>
      <input type="text" v-model="firstName" placeholder="Họ" />
      <input type="text" v-model="lastName" placeholder="Tên" />
    </div>

    <div class="subsection">
      <h3>Kết quả:</h3>
      <!-- Computed: Không có () - truy cập như thuộc tính -->
      <p>
        🛒 Computed (có caching):
        <strong>{{ fullNameComputed }}</strong>
      </p>

      <!-- Method: Phải có () - gọi như hàm -->
      <p>
        ☕ Method (không caching):
        <strong>{{ fullNameMethod() }}</strong>
      </p>
    </div>

    <div class="subsection">
      <h3>Test Caching:</h3>
      <p>Counter: {{ renderCounter }}</p>
      <button @click="renderCounter++">Tăng Counter (Trigger Re-render)</button>
      <p class="note">
        💡 Khi bấm nút này, Method sẽ chạy lại nhưng Computed thì không! Mở
        Console để xem log.
      </p>
    </div>

    <!-- Demo computed phức tạp hơn -->
    <div class="subsection">
      <h3>Danh sách công việc:</h3>
      <div v-for="task in tasks" :key="task.id" class="task-item">
        <input type="checkbox" v-model="task.done" :id="'task-' + task.id" />
        <label :for="'task-' + task.id">{{ task.text }}</label>
      </div>
      <p>
        <strong>Tổng số công việc chưa hoàn thành:</strong>
        {{ incompleteCount }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComputedVsMethod',
  data() {
    return {
      firstName: 'Nguyễn',
      lastName: 'Văn An',
      renderCounter: 0,
      tasks: [
        { id: 1, text: 'Học Vue', done: false },
        { id: 2, text: 'Làm bài tập', done: true },
        { id: 3, text: 'Đọc tài liệu', done: false }
      ]
    }
  },
  computed: {
    // Computed: Có caching, chỉ tính lại khi firstName hoặc lastName thay đổi
    fullNameComputed() {
      console.log('🛒 Computed được tính toán lại!')
      return `${this.lastName} ${this.firstName}`
    },

    // Computed: Lọc danh sách tasks chưa hoàn thành
    incompleteCount() {
      return this.tasks.filter(task => !task.done).length
    }
  },
  methods: {
    // Method: Không có caching, chạy lại mỗi lần re-render
    fullNameMethod() {
      console.log('☕ Method được gọi!')
      return `${this.lastName} ${this.firstName}`
    }
  }
}
</script>

<style scoped>
.demo-section {
  border: 2px solid #ff6b6b;
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
  color: #ff6b6b;
  margin-top: 0;
}

input[type='text'] {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #ee5a52;
}

.note {
  color: #666;
  font-size: 14px;
  font-style: italic;
}

.task-item {
  margin: 10px 0;
}

.task-item input[type='checkbox'] {
  margin-right: 8px;
}

.task-item label {
  cursor: pointer;
}
</style>
