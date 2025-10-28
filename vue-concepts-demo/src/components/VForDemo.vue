<template>
  <div class="demo-section">
    <h2>3. V-For và :key Demo</h2>

    <div class="subsection">
      <h3>➕ Thêm sản phẩm:</h3>
      <input
        type="text"
        v-model="newProduct"
        @keyup.enter="addProduct"
        placeholder="Nhập tên sản phẩm..."
      />
      <button @click="addProduct">Thêm</button>
    </div>

    <div class="subsection">
      <h3>📋 Danh sách sản phẩm ({{ products.length }} sản phẩm):</h3>

      <!-- ✅ Đúng: Sử dụng :key với ID duy nhất -->
      <div v-for="product in products" :key="product.id" class="product-item">
        <span class="product-name">{{ product.name }}</span>
        <span class="product-price">{{ formatPrice(product.price) }}</span>
        <button @click="removeProduct(product.id)" class="btn-delete">
          Xóa
        </button>
      </div>

      <p v-if="products.length === 0" class="empty-message">
        Chưa có sản phẩm nào. Hãy thêm sản phẩm!
      </p>
    </div>

    <div class="subsection">
      <h3>🎲 Thao tác:</h3>
      <button @click="shuffleProducts">Xáo trộn danh sách</button>
      <button @click="sortProducts">Sắp xếp theo tên</button>
      <p class="note">
        💡 Nhờ có :key, Vue biết chính xác phần tử nào cần di chuyển khi sắp
        xếp/xáo trộn
      </p>
    </div>

    <!-- Demo v-for với object -->
    <div class="subsection">
      <h3>🔍 V-For với Object:</h3>
      <div class="user-info">
        <div v-for="(value, key) in userInfo" :key="key" class="info-row">
          <strong>{{ key }}:</strong>
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VForDemo',
  data() {
    return {
      newProduct: '',
      nextId: 4,
      products: [
        { id: 1, name: 'Laptop', price: 15000000 },
        { id: 2, name: 'Mouse', price: 200000 },
        { id: 3, name: 'Keyboard', price: 500000 }
      ],
      userInfo: {
        name: 'Nguyễn Văn An',
        email: 'an@example.com',
        phone: '0123456789',
        address: 'Hà Nội'
      }
    }
  },
  methods: {
    // Thêm sản phẩm mới với ID duy nhất
    addProduct() {
      if (this.newProduct.trim()) {
        this.products.push({
          id: this.nextId++, // ID tăng dần đảm bảo duy nhất
          name: this.newProduct,
          price: Math.floor(Math.random() * 10000000) + 100000
        })
        this.newProduct = ''
      }
    },

    // Xóa sản phẩm theo ID
    removeProduct(id) {
      this.products = this.products.filter(p => p.id !== id)
    },

    // Xáo trộn danh sách (để test :key)
    shuffleProducts() {
      this.products = [...this.products].sort(() => Math.random() - 0.5)
    },

    // Sắp xếp theo tên
    sortProducts() {
      this.products = [...this.products].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    },

    // Format giá tiền
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price)
    }
  }
}
</script>

<style scoped>
.demo-section {
  border: 2px solid #4ecdc4;
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
  color: #4ecdc4;
  margin-top: 0;
}

input[type='text'] {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background: #4ecdc4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #3db8af;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 8px 0;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #4ecdc4;
}

.product-name {
  flex: 1;
  font-weight: bold;
}

.product-price {
  color: #ff6b6b;
  margin: 0 15px;
}

.btn-delete {
  background: #ff6b6b;
  padding: 5px 12px;
}

.btn-delete:hover {
  background: #ee5a52;
}

.empty-message {
  text-align: center;
  color: #999;
  font-style: italic;
}

.note {
  color: #666;
  font-size: 14px;
  font-style: italic;
  margin-top: 10px;
}

.user-info {
  background: white;
  padding: 15px;
  border-radius: 4px;
}

.info-row {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.info-row:last-child {
  border-bottom: none;
}
</style>
