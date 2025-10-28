<template>
  <div class="demo-section">
    <h2>4. Watcher Demo - Tìm kiếm sản phẩm</h2>

    <div class="subsection">
      <h3>🔍 Tìm kiếm:</h3>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Gõ để tìm kiếm (ví dụ: laptop)..."
        class="search-input"
      />

      <p class="status">
        <strong>Trạng thái:</strong>
        {{ searchStatus }}
      </p>
    </div>

    <div class="subsection" v-if="searchResults.length > 0">
      <h3>📦 Kết quả tìm kiếm ({{ searchResults.length }} sản phẩm):</h3>
      <div
        v-for="product in searchResults"
        :key="product.id"
        class="result-item"
      >
        <span class="product-name">{{ product.name }}</span>
        <span class="product-price">{{ product.price }}đ</span>
      </div>
    </div>

    <div class="subsection">
      <h3>💡 Cách hoạt động của Watcher:</h3>
      <ul class="explanation">
        <li>
          ✅ Watch theo dõi biến
          <code>searchQuery</code>
        </li>
        <li>✅ Khi gõ, nó tự động gọi API sau 800ms (debounce)</li>
        <li>✅ Xử lý race condition (chỉ hiển thị kết quả mới nhất)</li>
        <li>✅ Có thể làm việc với async/await</li>
      </ul>
    </div>

    <!-- Demo deep watch -->
    <div class="subsection">
      <h3>🔬 Deep Watch Demo:</h3>
      <div class="user-form">
        <input type="text" v-model="user.name" placeholder="Tên người dùng" />
        <input type="email" v-model="user.email" placeholder="Email" />
      </div>
      <p class="note">
        💡 Deep watch phát hiện thay đổi bên trong object.
        <br />
        Số lần lưu:
        <strong>{{ saveCount }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WatcherDemo',
  data() {
    return {
      searchQuery: '',
      searchStatus: 'Hãy gõ gì đó để bắt đầu tìm kiếm.',
      searchResults: [],
      searchTimeout: null,

      // Data cho deep watch demo
      user: {
        name: 'Nguyễn Văn An',
        email: 'an@example.com'
      },
      saveCount: 0,

      // Danh sách sản phẩm giả lập database
      allProducts: [
        { id: 1, name: 'Laptop Dell', price: 15000000 },
        { id: 2, name: 'Laptop HP', price: 12000000 },
        { id: 3, name: 'Mouse Logitech', price: 200000 },
        { id: 4, name: 'Keyboard Mechanical', price: 500000 },
        { id: 5, name: 'Monitor Samsung', price: 3000000 },
        { id: 6, name: 'Headphone Sony', price: 800000 }
      ]
    }
  },
  watch: {
    // Watch đơn giản với debounce
    searchQuery(newValue, oldValue) {
      console.log(`🔍 Search query changed: "${oldValue}" -> "${newValue}"`)

      // Clear timeout cũ để tránh gọi API nhiều lần
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      // Nếu search query rỗng
      if (newValue.trim() === '') {
        this.searchStatus = 'Hãy gõ gì đó để bắt đầu tìm kiếm.'
        this.searchResults = []
        return
      }

      // Hiển thị trạng thái đang tìm kiếm
      this.searchStatus = `Đang tìm kiếm cho "${newValue}"...`

      // Debounce: Chờ 800ms sau lần gõ cuối cùng mới gọi API
      this.searchTimeout = setTimeout(() => {
        this.performSearch(newValue)
      }, 800)
    },

    // Deep watch: Theo dõi thay đổi sâu bên trong object
    user: {
      handler(newValue) {
        console.log('👤 User data changed:', newValue)
        // Giả lập lưu vào localStorage
        this.saveCount++
        localStorage.setItem('userData', JSON.stringify(newValue))
      },
      deep: true // Bắt buộc để watch các thuộc tính bên trong object
    }
  },
  methods: {
    // Giả lập gọi API
    async performSearch(query) {
      try {
        // Giả lập API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        // Kiểm tra race condition: chỉ cập nhật nếu query vẫn giống
        if (this.searchQuery === query) {
          // Lọc sản phẩm
          this.searchResults = this.allProducts.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
          )

          this.searchStatus = `Tìm thấy ${this.searchResults.length} sản phẩm cho "${query}"`
        }
      } catch (error) {
        this.searchStatus = 'Có lỗi xảy ra khi tìm kiếm.'
        console.error(error)
      }
    }
  },
  mounted() {
    // Load user data từ localStorage
    const savedUser = localStorage.getItem('userData')
    if (savedUser) {
      this.user = JSON.parse(savedUser)
    }
  }
}
</script>

<style scoped>
.demo-section {
  border: 2px solid #ffa502;
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
  color: #ffa502;
  margin-top: 0;
}

.search-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ffa502;
  border-radius: 4px;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #ff7f00;
}

.status {
  margin-top: 10px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  color: #666;
}

.result-item {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  margin: 8px 0;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #ffa502;
}

.product-name {
  font-weight: bold;
}

.product-price {
  color: #ff6b6b;
}

.explanation {
  background: white;
  padding: 15px 15px 15px 35px;
  border-radius: 4px;
  margin: 0;
}

.explanation li {
  margin: 8px 0;
  line-height: 1.6;
}

code {
  background: #ffeaa7;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}

.user-form {
  display: flex;
  gap: 10px;
}

.user-form input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.note {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
  font-style: italic;
  background: white;
  padding: 10px;
  border-radius: 4px;
}
</style>
