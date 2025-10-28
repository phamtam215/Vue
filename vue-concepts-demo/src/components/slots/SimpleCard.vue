<template>
  <!-- 
    ============================================
    DEFAULT SLOT COMPONENT
    ============================================
    
    CƠ CHẾ:
    1. Component con định nghĩa <slot> - "chỗ trống"
    2. Parent truyền nội dung vào giữa thẻ mở/đóng
    3. Nội dung của parent sẽ "thay thế" vào vị trí <slot>
    
    FALLBACK CONTENT:
    - Nội dung bên trong <slot>...</slot>
    - Hiển thị KHI parent KHÔNG truyền gì
    - Như "placeholder" mặc định
    
    SỬ DỤNG:
    <!-- Parent truyền nội dung -->
  <SimpleCard>
    <h4>Custom Title</h4>
    <p>Custom content</p>
  </SimpleCard>

  <!-- Parent không truyền → Hiển thị fallback -->
  <SimpleCard />
  -->
  <div class="simple-card">
    <!-- Slot mặc định - "chỗ trống" để parent nhét nội dung -->
    <slot>
      <!-- Fallback content - Nội dung dự phòng -->
      <!-- Chỉ hiển thị NẾU parent KHÔNG truyền gì vào -->
      <p class="fallback">📄 Đây là nội dung mặc định của card.</p>
      <p class="fallback">Parent không truyền nội dung vào.</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'SimpleCard'
}
</script>

<style scoped>
.simple-card {
  border: 2px solid #e17055;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fallback {
  color: #636e72;
  font-style: italic;
  margin: 8px 0;
}
</style>
