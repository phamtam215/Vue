<template>
  <!-- 
    ============================================
    DYNAMIC COMPONENTS - Component Động
    ============================================
    
    KHÁI NIỆM:
    Thay đổi component tại cùng 1 vị trí mà không cần v-if/v-else dài dòng.
    Dùng <component :is="componentName"> - Vue sẽ "biến hình" thành component đó.
    
    VẤN ĐỀ:
    Mỗi khi chuyển component, component cũ bị DESTROY (mounted → unmounted).
    State (data) của component cũ sẽ MẤT HẾT.
    
    GIẢI PHÁP: <KeepAlive>
    Bọc <component> trong <KeepAlive> để CACHE component thay vì destroy.
    Component sẽ dùng activated/deactivated thay vì mounted/unmounted.
    
    SO SÁNH:
    - Không KeepAlive: Counter reset về 0 khi chuyển tab
    - Có KeepAlive: Counter giữ nguyên số khi quay lại
  -->
  <div class="dynamic-demo">
    <h2>Dynamic Components (Component Động)</h2>
    <p>
      <strong>Cú pháp:</strong>
      <code>&lt;component :is="currentComponent"&gt;</code>
      - Bind tên component vào :is để chuyển đổi động
    </p>

    <!-- Tab Navigation -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ active: currentTab === tab.name }"
        @click="switchTab(tab.name)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- ============================================ -->
    <!-- DEMO 1: Không dùng KeepAlive -->
    <!-- ============================================ -->
    <!-- 
      Khi chuyển tab:
      1. Component cũ bị DESTROY (unmounted hook chạy)
      2. Component mới được TẠO MỚI (mounted hook chạy)
      3. State (data) của component cũ MẤT HẾT
      
      Hậu quả: Counter reset về 0, form input bị clear
    -->
    <div class="demo-section">
      <h3>❌ Không dùng KeepAlive</h3>
      <p>Component bị destroy khi chuyển tab → Mất state</p>
      <component :is="currentTab"></component>
    </div>

    <!-- ============================================ -->
    <!-- DEMO 2: Có dùng KeepAlive -->
    <!-- ============================================ -->
    <!-- 
      Khi chuyển tab:
      1. Component cũ được CACHE (deactivated hook chạy)
      2. Component mới được KÍCH HOẠT từ cache (activated hook chạy)
      3. State (data) của component cũ ĐƯỢC GIỮ NGUYÊN
      
      Lợi ích: Counter giữ số, form input giữ text, performance tốt hơn
    -->
    <div class="demo-section">
      <h3>✅ Dùng KeepAlive</h3>
      <p>Component được cache → Giữ state khi chuyển tab</p>
      <keep-alive>
        <component :is="currentTab"></component>
      </keep-alive>
    </div>

    <div class="console-note">
      💡 Mở Console để xem lifecycle hooks: mounted/unmounted (không KeepAlive)
      vs activated/deactivated (có KeepAlive)
    </div>
  </div>
</template>

<script>
import TabCounter from './dynamic/TabCounter.vue'
import TabForm from './dynamic/TabForm.vue'
import TabSettings from './dynamic/TabSettings.vue'

export default {
  name: 'DynamicComponentDemo',
  components: {
    TabCounter,
    TabForm,
    TabSettings
  },
  data() {
    return {
      currentTab: 'TabCounter',
      tabs: [
        { name: 'TabCounter', label: 'Counter' },
        { name: 'TabForm', label: 'Form' },
        { name: 'TabSettings', label: 'Settings' }
      ]
    }
  },
  methods: {
    switchTab(tabName) {
      console.log(
        `%c🔄 Chuyển sang tab: ${tabName}`,
        'color: blue; font-weight: bold'
      )
      this.currentTab = tabName
    }
  }
}
</script>

<style scoped>
.dynamic-demo {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.tabs {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.tabs button {
  padding: 10px 20px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.tabs button:hover {
  background: #f8f9fa;
}

.tabs button.active {
  background: #0984e3;
  color: white;
  border-color: #0984e3;
}

.demo-section {
  margin: 30px 0;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: #f8f9fa;
}

.demo-section h3 {
  margin-top: 0;
}

.console-note {
  margin-top: 20px;
  padding: 15px;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
}

code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}
</style>
