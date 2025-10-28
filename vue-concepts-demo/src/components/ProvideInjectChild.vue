<template>
  <!-- Grandchild component: Inject dữ liệu từ Grandparent -->
  <div class="grandchild" :class="themeClass">
    <div class="arrow">↓</div>

    <div class="tree-level">
      <strong>👶 Grandchild (Inject)</strong>
      <p class="code-snippet">inject: ['theme', 'user']</p>

      <div class="display-box">
        <p>
          <strong>Theme hiện tại:</strong>
          {{ currentTheme }}
        </p>
        <p>
          <strong>User hiện tại:</strong>
          {{ currentUser }}
        </p>
      </div>

      <div class="theme-preview">
        <p>
          Preview giao diện với theme
          <strong>{{ currentTheme }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProvideInjectChild',
  // Inject: Nhận dữ liệu từ provide ở component tổ tiên
  inject: ['theme', 'user'],
  computed: {
    // Vì provide là function, cần gọi nó để lấy giá trị
    currentTheme() {
      return this.theme()
    },
    currentUser() {
      return this.user()
    },
    themeClass() {
      return `theme-${this.currentTheme}`
    }
  }
}
</script>

<style scoped>
.grandchild {
  margin-top: 10px;
}

.arrow {
  text-align: center;
  font-size: 24px;
  color: #6c5ce7;
  margin: 10px 0;
}

.tree-level {
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #6c5ce7;
  transition: all 0.3s;
}

/* Theme styles */
.theme-light .tree-level {
  background: #ffffff;
  color: #2d3436;
}

.theme-dark .tree-level {
  background: #2d3436;
  color: #dfe6e9;
  border-left-color: #ffeaa7;
}

.theme-blue .tree-level {
  background: #74b9ff;
  color: white;
  border-left-color: #0984e3;
}

.code-snippet {
  background: #2d3436;
  color: #dfe6e9;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  margin: 10px 0;
}

.theme-dark .code-snippet {
  background: #ffeaa7;
  color: #2d3436;
}

.theme-blue .code-snippet {
  background: #0984e3;
  color: white;
}

.display-box {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 4px;
  margin: 10px 0;
}

.theme-light .display-box {
  background: #f5f5f5;
}

.theme-dark .display-box {
  background: rgba(255, 255, 255, 0.1);
}

.theme-blue .display-box {
  background: rgba(255, 255, 255, 0.2);
}

.display-box p {
  margin: 8px 0;
}

.theme-preview {
  margin-top: 15px;
  padding: 15px;
  border-radius: 4px;
  text-align: center;
  font-style: italic;
}

.theme-light .theme-preview {
  background: #ffeaa7;
  color: #2d3436;
}

.theme-dark .theme-preview {
  background: #636e72;
  color: white;
}

.theme-blue .theme-preview {
  background: #0984e3;
  color: white;
}
</style>
