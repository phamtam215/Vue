<template>
  <!-- 
    ============================================
    SCOPED SLOT COMPONENT - Slot có phạm vi
    ============================================
    
    ĐẶC ĐIỂM:
    - Component CON có DATA (users array)
    - Component CHA quyết định CÁCH HIỂN THỊ
    
    LUỒNG DỮ LIỆU:
    Con → Cha (Ngược với Props: Cha → Con)
    
    CƠ CHẾ:
    1. Con: <slot :user="user"> - Bind data vào slot
    2. Cha: <template #default="slotProps"> - Nhận data qua slotProps
    3. Cha: {{ slotProps.user.name }} - Sử dụng data
    
    LỢI ÍCH:
    - Component tái sử dụng cao
    - Separation of concerns: Con lo data, Cha lo UI
    - Flexibility: Cùng data nhưng nhiều cách hiển thị khác nhau
    
    USE CASE:
    - List components: Table, Gallery, Dropdown
    - Con có data, cha custom render từng item
  -->
  <div class="user-list">
    <!-- Loop qua users và PASS DATA cho parent qua slot -->
    <div v-for="user in users" :key="user.id">
      <!-- 
        SCOPED SLOT:
        :user="user" - Bind user object vào slot
        Parent sẽ nhận được qua slotProps.user
        
        FALLBACK:
        Nếu parent không custom, hiển thị default style
      -->
      <slot :user="user">
        <!-- Fallback: hiển thị mặc định nếu parent không customize -->
        <div class="default-user">{{ user.name }} - {{ user.role }}</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      // ============================================
      // DATA CỦA COMPONENT CON
      // ============================================
      // Component con QUẢN LÝ data (users)
      // Nhưng KHÔNG quyết định cách hiển thị
      // → Truyền data cho parent qua scoped slot
      // → Parent tự do customize UI
      users: [
        { id: 1, name: 'Nguyễn Văn An', role: 'admin' },
        { id: 2, name: 'Trần Thị Bình', role: 'user' },
        { id: 3, name: 'Lê Văn Cường', role: 'user' },
        { id: 4, name: 'Phạm Thị Dung', role: 'admin' }
      ]
    }
  }
}
</script>

<style scoped>
.user-list {
  border: 2px solid #00b894;
  border-radius: 8px;
  padding: 15px;
  background: white;
}

.default-user {
  padding: 10px;
  background: #f8f9fa;
  margin: 5px 0;
  border-radius: 4px;
}
</style>
