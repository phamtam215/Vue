<template>
  <!-- Tab Counter - có state số đếm -->
  <div class="tab-content">
    <h4>Counter Tab</h4>
    <p>Thử đếm lên rồi chuyển sang tab khác, sau đó quay lại xem:</p>
    <ul>
      <li>❌ Không KeepAlive: Counter reset về 0</li>
      <li>✅ Có KeepAlive: Counter giữ nguyên số</li>
    </ul>
    <div class="counter">
      <button @click="count--">-</button>
      <span class="count">{{ count }}</span>
      <button @click="count++">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabCounter',
  data() {
    return {
      count: 0 // State - số đếm hiện tại
    }
  },

  // ============================================
  // LIFECYCLE HOOKS - KHÔNG KeepAlive
  // ============================================
  // Khi chuyển tab:
  // 1. Component bị DESTROY
  // 2. count reset về 0
  // 3. Tốn performance (phải tạo/hủy liên tục)

  mounted() {
    console.log('✅ TabCounter mounted - Component được TẠO MỚI')
    console.log('   Count hiện tại:', this.count) // Luôn = 0
  },

  unmounted() {
    console.log('❌ TabCounter unmounted - Component bị DESTROY')
    console.log('   State (count) sẽ bị MẤT HẾT')
  },

  // ============================================
  // LIFECYCLE HOOKS - CÓ KeepAlive
  // ============================================
  // Khi chuyển tab:
  // 1. Component được CACHE (không destroy)
  // 2. count GIỮ NGUYÊN
  // 3. Performance tốt (chỉ show/hide)

  activated() {
    console.log('🔥 TabCounter activated - Component được KÍCH HOẠT từ cache')
    console.log('   Count được GIỮ NGUYÊN:', this.count)
  },

  deactivated() {
    console.log('💤 TabCounter deactivated - Component được CACHE lại')
    console.log('   State (count) vẫn còn trong bộ nhớ:', this.count)
  }
}
</script>

<style scoped>
.tab-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.counter button {
  width: 50px;
  height: 50px;
  font-size: 24px;
  background: #0984e3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.counter button:hover {
  background: #0770c9;
}

.count {
  font-size: 36px;
  font-weight: bold;
  color: #2d3436;
  min-width: 60px;
  text-align: center;
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
</style>
