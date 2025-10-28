<template>
  <div class="demo-section">
    <h2>7. Provide/Inject Demo - Giải quyết Prop Drilling</h2>

    <div class="subsection">
      <h3>🎨 Theme Settings (Grandparent Level):</h3>
      <div class="theme-controls">
        <label>
          <input type="radio" v-model="theme" value="light" />
          Light
        </label>
        <label>
          <input type="radio" v-model="theme" value="dark" />
          Dark
        </label>
        <label>
          <input type="radio" v-model="theme" value="blue" />
          Blue
        </label>
      </div>

      <div class="user-control">
        <input v-model="currentUser" placeholder="Tên người dùng" />
      </div>
    </div>

    <div class="component-tree">
      <div class="tree-level">
        <strong>👴 Grandparent (Provide)</strong>
        <p class="code-snippet">provide: {{ '{ theme, user }' }}</p>
      </div>

      <div class="arrow">↓</div>

      <div class="tree-level">
        <strong>👨 Parent (Middle Component)</strong>
        <p class="note">Không cần nhận hoặc chuyển tiếp props</p>
        <ProvideInjectChild />
      </div>
    </div>

    <div class="subsection">
      <h3>💡 Giải thích:</h3>
      <ul class="explanation">
        <li>
          ✅
          <strong>Provide</strong>
          : Grandparent "phát sóng" dữ liệu
        </li>
        <li>
          ✅
          <strong>Inject</strong>
          : Grandchild "bắt sóng" trực tiếp
        </li>
        <li>✅ Không cần truyền qua các component trung gian</li>
        <li>✅ Tránh được Prop Drilling (khoan props)</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ProvideInjectChild from './ProvideInjectChild.vue'

export default {
  name: 'ProvideInjectDemo',
  components: {
    ProvideInjectChild
  },
  data() {
    return {
      theme: 'light',
      currentUser: 'Nguyễn Văn An'
    }
  },
  // Provide: Cung cấp dữ liệu cho các component con/cháu
  provide() {
    return {
      // Provide reactive data
      theme: () => this.theme,
      user: () => this.currentUser,
      // Provide method
      changeTheme: this.changeTheme
    }
  },
  methods: {
    changeTheme(newTheme) {
      this.theme = newTheme
    }
  }
}
</script>

<style scoped>
.demo-section {
  border: 2px solid #6c5ce7;
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
  color: #6c5ce7;
  margin-top: 0;
}

.theme-controls {
  display: flex;
  gap: 15px;
  margin: 15px 0;
}

.theme-controls label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 8px 15px;
  background: white;
  border-radius: 4px;
  border: 2px solid #ddd;
  transition: all 0.3s;
}

.theme-controls label:hover {
  border-color: #6c5ce7;
}

.theme-controls input[type='radio']:checked + span {
  font-weight: bold;
}

.user-control input {
  width: 100%;
  padding: 10px;
  border: 2px solid #6c5ce7;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.component-tree {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.tree-level {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #6c5ce7;
  margin: 10px 0;
}

.arrow {
  text-align: center;
  font-size: 24px;
  color: #6c5ce7;
  margin: 10px 0;
}

.code-snippet {
  background: #2d3436;
  color: #dfe6e9;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  margin: 5px 0 0 0;
}

.note {
  color: #636e72;
  font-size: 14px;
  font-style: italic;
  margin: 5px 0 0 0;
}

.explanation {
  background: white;
  padding: 15px 15px 15px 35px;
  border-radius: 4px;
  margin: 0;
}

.explanation li {
  margin: 10px 0;
  line-height: 1.6;
}
</style>
