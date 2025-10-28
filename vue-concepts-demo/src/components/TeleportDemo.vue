<template>
  <!-- 
    ============================================
    TELEPORT COMPONENT - Di chuyển DOM ra ngoài
    ============================================
    
    VẤN ĐỀ:
    Modal/Dialog thường nằm sâu trong cấu trúc component.
    Nếu parent có CSS: overflow:hidden, transform, z-index...
    → Modal bị CẮT, CHỒNG LẤP, hoặc không hiển thị đúng.
    
    GIẢI PHÁP: <Teleport>
    "Nhấc" HTML của Modal ra khỏi vị trí hiện tại,
    đặt nó làm con trực tiếp của <body> (hoặc element khác).
    
    CÚ PHÁP:
    <teleport to="body">
      <Modal />
    </teleport>
    
    KẾT QUẢ:
    - Modal thoát khỏi CSS ràng buộc của parent
    - Backdrop có thể cover toàn màn hình
    - z-index hoạt động đúng
  -->
  <div class="teleport-demo">
    <h2>Teleport Component - "Dịch Chuyển Tức Thời"</h2>
    <p>
      <strong>Khái niệm:</strong>
      Render component ở vị trí khác trong DOM tree, thoát khỏi CSS stacking
      context của parent.
      <br />
      <strong>Use case:</strong>
      Modal, Tooltip, Notification, Dropdown menu.
    </p>

    <!-- ============================================ -->
    <!-- DEMO 1: Modal KHÔNG dùng Teleport -->
    <!-- ============================================ -->
    <!-- 
      VẤN ĐỀ:
      1. Modal nằm TRONG restricted-container
      2. Container có overflow:hidden → Modal bị CẮT
      3. Container có transform → Tạo stacking context mới → z-index không hoạt động
      4. Backdrop không thể cover toàn màn hình
      
      KẾT QUẢ: Modal hiển thị sai, không professional
    -->
    <div class="demo-section">
      <h3>❌ Modal không dùng Teleport</h3>
      <p>
        Modal bị ảnh hưởng bởi CSS của parent (overflow: hidden, z-index,
        transform...)
      </p>

      <div class="restricted-container">
        <p>
          Parent có
          <code>overflow: hidden</code>
          và
          <code>transform: scale(1)</code>
        </p>
        <button @click="showNormalModal = true">Mở Modal Thường</button>

        <!-- Modal KHÔNG teleport - bị giới hạn bởi parent -->
        <div
          v-if="showNormalModal"
          class="modal-backdrop"
          @click="showNormalModal = false"
        >
          <div class="modal-content" @click.stop>
            <h4>⚠️ Modal Thường</h4>
            <p>Modal này bị cắt bởi overflow: hidden của parent container</p>
            <p>Backdrop không cover toàn màn hình</p>
            <button @click="showNormalModal = false">Đóng</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- DEMO 2: Modal CÓ dùng Teleport -->
    <!-- ============================================ -->
    <!-- 
      GIẢI PHÁP:
      1. Bọc Modal trong <teleport to="body">
      2. Modal được "dịch chuyển" ra khỏi restricted-container
      3. Modal trở thành con TRỰC TIẾP của <body>
      4. Không bị ảnh hưởng bởi CSS của parent nữa
      
      KẾT QUẢ:
      - Backdrop cover toàn màn hình ✅
      - Modal không bị cắt ✅
      - z-index hoạt động đúng ✅
    -->
    <div class="demo-section">
      <h3>✅ Modal dùng Teleport</h3>
      <p>
        Modal được render trực tiếp vào
        <code>&lt;body&gt;</code>
        , không bị ảnh hưởng bởi parent CSS
      </p>

      <div class="restricted-container">
        <p>
          Parent có
          <code>overflow: hidden</code>
          và
          <code>transform: scale(1)</code>
        </p>
        <button @click="showTeleportModal = true">Mở Modal Teleport</button>
      </div>

      <!-- Modal DÙNG teleport - render vào body -->
      <teleport to="body">
        <div
          v-if="showTeleportModal"
          class="modal-backdrop"
          @click="showTeleportModal = false"
        >
          <div class="modal-content teleport-modal" @click.stop>
            <h4>✅ Modal Teleport</h4>
            <p>Modal này được teleport vào &lt;body&gt;</p>
            <p>
              Backdrop cover toàn màn hình, không bị ảnh hưởng bởi parent CSS
            </p>
            <p>
              Sử dụng
              <code>&lt;teleport to="body"&gt;</code>
            </p>
            <button @click="showTeleportModal = false">Đóng</button>
          </div>
        </div>
      </teleport>
    </div>

    <!-- Demo 3: Notification dùng Teleport -->
    <div class="demo-section">
      <h3>🔔 Use Case: Notifications</h3>
      <p>
        Notifications thường cần render ở top-level để luôn hiển thị đúng vị trí
      </p>
      <button @click="showNotification">Hiện Notification</button>

      <teleport to="body">
        <div v-if="notification" class="notification">
          {{ notification }}
        </div>
      </teleport>
    </div>

    <div class="info-box">
      <strong>Khi nào dùng Teleport:</strong>
      <ul>
        <li>✅ Modals/Dialogs - cần render toàn màn hình</li>
        <li>✅ Tooltips - tránh bị cắt bởi overflow</li>
        <li>✅ Notifications/Toasts - fixed position ở góc màn hình</li>
        <li>✅ Dropdown menus - thoát khỏi stacking context</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeleportDemo',
  data() {
    return {
      showNormalModal: false,
      showTeleportModal: false,
      notification: null
    }
  },
  methods: {
    showNotification() {
      this.notification = '✅ Notification được teleport vào body!'
      setTimeout(() => {
        this.notification = null
      }, 3000)
    }
  }
}
</script>

<style scoped>
.teleport-demo {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.demo-section {
  margin: 30px 0;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: #f8f9fa;
}

/* Container bị restricted - để demo vấn đề */
.restricted-container {
  padding: 20px;
  background: white;
  border: 2px dashed #e74c3c;
  border-radius: 8px;
  /* CSS gây vấn đề cho modal thường */
  overflow: hidden;
  transform: scale(1);
  position: relative;
  height: 150px;
}

button {
  padding: 10px 20px;
  background: #0984e3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #0770c9;
}

code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 14px;
}

.info-box {
  margin-top: 30px;
  padding: 20px;
  background: #e3f2fd;
  border-left: 4px solid #0984e3;
  border-radius: 4px;
}

.info-box ul {
  margin: 10px 0;
}
</style>

<!-- Global styles cho modal và notification (không scoped) -->
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-content h4 {
  margin-top: 0;
  color: #2d3436;
}

.modal-content button {
  margin-top: 15px;
  width: 100%;
}

.teleport-modal {
  border: 3px solid #00b894;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #00b894;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
