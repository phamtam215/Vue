<template>
  <div class="demo-section">
    <h2>8. Slots Demo - Cơ Chế Truyền Nội Dung</h2>

    <!-- 
      ============================================
      SLOTS LÀ GÌ?
      ============================================
      Slots cho phép component con có "chỗ trống" để component cha 
      "nhét" nội dung vào. Giống như cái khung ảnh:
      - Khung (component con) có sẵn viền, kính
      - Phần giữa trống (slot) - cha quyết định đặt gì vào
      
      3 LOẠI SLOTS:
      1. Default Slot: 1 chỗ trống duy nhất, không tên
      2. Named Slots: Nhiều chỗ trống, mỗi chỗ có tên riêng
      3. Scoped Slots: Chỗ trống + con pass data cho cha quyết định hiển thị
    -->

    <!-- ============================================ -->
    <!-- 1. DEFAULT SLOT (Slot mặc định) -->
    <!-- ============================================ -->
    <div class="subsection">
      <h3>📦 Default Slot (Slot mặc định):</h3>
      <p class="explanation">
        <strong>Khái niệm:</strong>
        Component con có 1 chỗ trống, cha truyền nội dung vào.
        <br />
        <strong>Fallback:</strong>
        Nếu cha không truyền gì, hiển thị nội dung mặc định.
        <br />
        <strong>Use case:</strong>
        Card, Button, Modal - layout cố định, nội dung linh hoạt.
      </p>

      <div class="demo-box">
        <!-- Sử dụng với nội dung tùy chỉnh -->
        <SimpleCard>
          <h4>🎨 Nội dung tùy chỉnh</h4>
          <p>Đây là nội dung được truyền từ component cha vào slot mặc định.</p>
          <button>Click Me</button>
        </SimpleCard>

        <!-- Sử dụng mà không truyền nội dung (hiển thị fallback) -->
        <SimpleCard />
      </div>
    </div>

    <!-- ============================================ -->
    <!-- 2. NAMED SLOTS (Slot có tên) -->
    <!-- ============================================ -->
    <div class="subsection">
      <h3>🏷️ Named Slots (Slot có tên):</h3>
      <p class="explanation">
        <strong>Khái niệm:</strong>
        Component con có NHIỀU chỗ trống, mỗi chỗ có tên riêng.
        <br />
        <strong>Cú pháp:</strong>
        Con dùng
        <code>&lt;slot name="header"&gt;</code>
        , Cha dùng
        <code>&lt;template #header&gt;</code>
        <br />
        <strong>Use case:</strong>
        Layout phức tạp - header, sidebar, footer riêng biệt.
      </p>

      <div class="demo-box">
        <PageLayout>
          <!-- Truyền vào slot "header" -->
          <template #header>
            <h3>📰 Tiêu đề trang</h3>
            <p>Đây là phần header</p>
          </template>

          <!-- Nội dung không có tên sẽ vào slot mặc định -->
          <p>Đây là nội dung chính của trang.</p>
          <p>Slot mặc định có thể chứa nhiều elements.</p>

          <!-- Truyền vào slot "footer" -->
          <template #footer>
            <p>© 2025 - Đây là phần footer</p>
          </template>
        </PageLayout>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- 3. SCOPED SLOTS (Slot có phạm vi) -->
    <!-- ============================================ -->
    <div class="subsection">
      <h3>🔬 Scoped Slots (Slot có phạm vi):</h3>
      <p class="explanation">
        <strong>Khái niệm:</strong>
        Component con CUNG CẤP DATA, cha QUYẾT ĐỊNH HIỂN THỊ.
        <br />
        <strong>Luồng data:</strong>
        Con → Cha (ngược với props: Cha → Con)
        <br />
        <strong>Cú pháp:</strong>
        Con:
        <code>&lt;slot :user="user"&gt;</code>
        , Cha:
        <code>&lt;template #default="slotProps"&gt;</code>
        <br />
        <strong>Use case:</strong>
        List component - con có data, cha custom cách render từng item.
      </p>

      <div class="demo-box">
        <h4>Danh sách người dùng - Kiểu 1 (In hoa):</h4>
        <UserList>
          <!-- Nhận data từ child qua slotProps -->
          <template #default="slotProps">
            <div class="user-item">
              <strong>{{ slotProps.user.name.toUpperCase() }}</strong>
              <span v-if="slotProps.user.role === 'admin'" class="admin-badge">
                ⭐ Admin
              </span>
            </div>
          </template>
        </UserList>

        <h4>Danh sách người dùng - Kiểu 2 (Chi tiết):</h4>
        <UserList>
          <!-- Cùng data nhưng hiển thị khác -->
          <template #default="{ user }">
            <div class="user-detail">
              <div class="avatar">{{ user.name.charAt(0) }}</div>
              <div>
                <p>
                  <strong>{{ user.name }}</strong>
                </p>
                <p class="role">{{ user.role }}</p>
              </div>
            </div>
          </template>
        </UserList>
      </div>
    </div>

    <!-- Giải thích tổng quan -->
    <div class="subsection">
      <h3>💡 So sánh các loại Slots:</h3>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Loại Slot</th>
            <th>Mục đích</th>
            <th>Ví dụ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Default Slot</strong></td>
            <td>Truyền nội dung đơn giản</td>
            <td>&lt;BaseCard&gt;Content&lt;/BaseCard&gt;</td>
          </tr>
          <tr>
            <td><strong>Named Slot</strong></td>
            <td>Truyền nội dung vào nhiều vị trí</td>
            <td>&lt;template #header&gt;...&lt;/template&gt;</td>
          </tr>
          <tr>
            <td><strong>Scoped Slot</strong></td>
            <td>Child truyền data cho parent</td>
            <td>&lt;template #default="props"&gt;...&lt;/template&gt;</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SimpleCard from './slots/SimpleCard.vue'
import PageLayout from './slots/PageLayout.vue'
import UserList from './slots/UserList.vue'

export default {
  name: 'SlotsDemo',
  components: {
    SimpleCard,
    PageLayout,
    UserList
  }
}
</script>

<style scoped>
.demo-section {
  border: 2px solid #e17055;
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
  color: #e17055;
  margin-top: 0;
}

.explanation {
  background: white;
  padding: 12px;
  border-radius: 4px;
  border-left: 4px solid #e17055;
  margin: 10px 0;
  color: #2d3436;
}

.demo-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin: 15px 0;
}

.user-item {
  padding: 12px;
  background: #f8f9fa;
  margin: 8px 0;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-badge {
  background: #ffeaa7;
  color: #d63031;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.user-detail {
  padding: 12px;
  background: #f8f9fa;
  margin: 8px 0;
  border-radius: 4px;
  display: flex;
  gap: 15px;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e17055, #d63031);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.role {
  color: #636e72;
  font-size: 14px;
  margin: 4px 0 0 0;
}

.comparison-table {
  width: 100%;
  background: white;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
}

.comparison-table th,
.comparison-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.comparison-table th {
  background: #e17055;
  color: white;
  font-weight: bold;
}

.comparison-table tbody tr:last-child td {
  border-bottom: none;
}

.comparison-table code {
  background: #ffeaa7;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
}
</style>
