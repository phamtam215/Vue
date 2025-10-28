<template>
  <!-- Tab Settings - có state checkbox -->
  <div class="tab-content">
    <h4>Settings Tab</h4>
    <p>Bật/tắt các settings rồi chuyển tab:</p>
    <ul>
      <li>❌ Không KeepAlive: Settings reset về mặc định</li>
      <li>✅ Có KeepAlive: Settings giữ nguyên trạng thái</li>
    </ul>
    <div class="settings">
      <div class="setting-item">
        <label>
          <input type="checkbox" v-model="notifications" />
          Bật thông báo
        </label>
      </div>

      <div class="setting-item">
        <label>
          <input type="checkbox" v-model="darkMode" />
          Chế độ tối
        </label>
      </div>

      <div class="setting-item">
        <label>
          <input type="checkbox" v-model="autoSave" />
          Tự động lưu
        </label>
      </div>

      <div class="setting-item">
        <label>
          Theme:
          <select v-model="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </label>
      </div>

      <div class="current-settings">
        <strong>Cài đặt hiện tại:</strong>
        <pre>{{ currentSettings }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabSettings',
  data() {
    return {
      notifications: true,
      darkMode: false,
      autoSave: true,
      theme: 'light'
    }
  },
  computed: {
    currentSettings() {
      return {
        notifications: this.notifications,
        darkMode: this.darkMode,
        autoSave: this.autoSave,
        theme: this.theme
      }
    }
  },
  mounted() {
    console.log('✅ TabSettings mounted')
  },
  unmounted() {
    console.log('❌ TabSettings unmounted')
  },
  activated() {
    console.log('🔥 TabSettings activated')
  },
  deactivated() {
    console.log('💤 TabSettings deactivated')
  }
}
</script>

<style scoped>
.tab-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
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

.settings {
  margin-top: 20px;
}

.setting-item {
  padding: 12px;
  margin: 10px 0;
  background: #f8f9fa;
  border-radius: 5px;
}

.setting-item label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

input[type='checkbox'] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

select {
  padding: 5px 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
}

.current-settings {
  margin-top: 20px;
  padding: 15px;
  background: #e8f5e9;
  border-left: 4px solid #4caf50;
  border-radius: 4px;
}

.current-settings pre {
  margin: 10px 0 0 0;
  font-family: monospace;
  background: white;
  padding: 10px;
  border-radius: 4px;
}
</style>
