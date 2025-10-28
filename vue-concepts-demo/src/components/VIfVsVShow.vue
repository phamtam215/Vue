<template>
  <div class="demo-section">
    <h2>5. V-If vs V-Show Demo</h2>

    <div class="subsection">
      <h3>🎮 Điều khiển:</h3>
      <button @click="showVIf = !showVIf">
        Toggle V-If ({{ showVIf ? 'Đang hiển thị' : 'Đang ẩn' }})
      </button>
      <button @click="showVShow = !showVShow">
        Toggle V-Show ({{ showVShow ? 'Đang hiển thị' : 'Đang ẩn' }})
      </button>
    </div>

    <!-- Demo v-if: Thêm/xóa khỏi DOM -->
    <div class="subsection">
      <h3>🔴 V-If (Thêm/xóa khỏi DOM):</h3>
      <div v-if="showVIf" class="content-box v-if-box">
        <p><strong>Component với v-if</strong></p>
        <p>
          Tôi được
          <strong>thêm vào</strong>
          hoặc
          <strong>xóa khỏi</strong>
          DOM.
        </p>
        <p>Số lần được mounted: {{ vIfMountCount }}</p>
      </div>
      <p v-else class="empty-state">V-If đang ẩn (không có trong DOM)</p>
    </div>

    <!-- Demo v-show: Chỉ thay đổi display CSS -->
    <div class="subsection">
      <h3>🟢 V-Show (Chỉ thay đổi CSS display):</h3>
      <div v-show="showVShow" class="content-box v-show-box">
        <p><strong>Component với v-show</strong></p>
        <p>
          Tôi
          <strong>luôn có trong DOM</strong>
          , chỉ ẩn/hiện bằng CSS.
        </p>
        <p>Số lần được mounted: {{ vShowMountCount }}</p>
      </div>
      <p v-show="!showVShow" class="empty-state">
        V-Show đang ẩn (vẫn có trong DOM)
      </p>
    </div>

    <!-- Demo v-if với v-else-if và v-else -->
    <div class="subsection">
      <h3>🎯 V-If với V-Else-If và V-Else:</h3>
      <select v-model="userRole">
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="guest">Guest</option>
      </select>

      <div class="role-display">
        <div v-if="userRole === 'admin'" class="role-box admin">
          👑
          <strong>Admin Panel</strong>
          <br />
          Bạn có quyền truy cập mọi thứ!
        </div>
        <div v-else-if="userRole === 'user'" class="role-box user">
          👤
          <strong>User Dashboard</strong>
          <br />
          Bạn có quyền truy cập giới hạn.
        </div>
        <div v-else class="role-box guest">
          👋
          <strong>Guest View</strong>
          <br />
          Vui lòng đăng nhập để xem thêm.
        </div>
      </div>
    </div>

    <!-- So sánh hiệu năng -->
    <div class="subsection">
      <h3>📊 So sánh:</h3>
      <table class="comparison-table">
        <tr>
          <th></th>
          <th>V-If</th>
          <th>V-Show</th>
        </tr>
        <tr>
          <td>Chi phí render ban đầu</td>
          <td class="good">Thấp</td>
          <td class="bad">Cao</td>
        </tr>
        <tr>
          <td>Chi phí toggle</td>
          <td class="bad">Cao (thêm/xóa DOM)</td>
          <td class="good">Thấp (chỉ CSS)</td>
        </tr>
        <tr>
          <td>Số lần toggle</td>
          <td>{{ vIfToggleCount }}</td>
          <td>{{ vShowToggleCount }}</td>
        </tr>
        <tr>
          <td>Khi nào dùng</td>
          <td>Ít thay đổi trạng thái</td>
          <td>Thay đổi thường xuyên</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VIfVsVShow',
  data() {
    return {
      showVIf: true,
      showVShow: true,
      userRole: 'user',
      vIfMountCount: 0,
      vShowMountCount: 0,
      vIfToggleCount: 0,
      vShowToggleCount: 0
    }
  },
  watch: {
    // Đếm số lần toggle v-if
    showVIf(newValue) {
      this.vIfToggleCount++
      if (newValue) {
        this.vIfMountCount++
      }
    },
    // Đếm số lần toggle v-show
    showVShow() {
      this.vShowToggleCount++
    }
  },
  mounted() {
    // V-if và v-show đều được mount lần đầu
    this.vIfMountCount = 1
    this.vShowMountCount = 1
  }
}
</script>

<style scoped>
.demo-section {
  border: 2px solid #a29bfe;
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
  color: #a29bfe;
  margin-top: 0;
}

button {
  margin: 5px;
  padding: 10px 20px;
  background: #a29bfe;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #8b7ff5;
}

.content-box {
  padding: 20px;
  border-radius: 4px;
  margin: 10px 0;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.v-if-box {
  background: #ffeaa7;
  border-left: 4px solid #fdcb6e;
}

.v-show-box {
  background: #dfe6e9;
  border-left: 4px solid #74b9ff;
}

.empty-state {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 20px;
}

select {
  padding: 8px 12px;
  border: 2px solid #a29bfe;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.role-display {
  margin-top: 15px;
}

.role-box {
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.admin {
  background: #ff7675;
  color: white;
}

.user {
  background: #74b9ff;
  color: white;
}

.guest {
  background: #a29bfe;
  color: white;
}

.comparison-table {
  width: 100%;
  background: white;
  border-collapse: collapse;
  border-radius: 4px;
  overflow: hidden;
}

.comparison-table th,
.comparison-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.comparison-table th {
  background: #a29bfe;
  color: white;
  font-weight: bold;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.good {
  color: #00b894;
  font-weight: bold;
}

.bad {
  color: #d63031;
  font-weight: bold;
}
</style>
