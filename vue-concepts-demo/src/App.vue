<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">🎓 Vue Concepts Demo</router-link>

        <div class="nav-links">
          <router-link to="/" class="nav-item">Home</router-link>
          <router-link to="/about" class="nav-item">About</router-link>
          <router-link to="/user/1" class="nav-item">User Profile</router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main class="main-content">
      <!-- Router View cho routing demos -->
      <div class="router-section">
        <router-view />
      </div>

      <!-- Divider -->
      <hr class="divider" />

      <!-- All Concept Demos -->
      <div class="demos-section">
        <h1 class="demos-title">📚 Tất Cả Các Khái Niệm Vue</h1>

        <!-- v-bind, v-model, v-on -->
        <section class="demo-card">
          <VBindModelOnDemo />
        </section>

        <!-- Computed vs Methods -->
        <section class="demo-card">
          <ComputedVsMethod />
        </section>

        <!-- v-for -->
        <section class="demo-card">
          <VForDemo />
        </section>

        <!-- Watchers -->
        <section class="demo-card">
          <WatcherDemo />
        </section>

        <!-- v-if vs v-show -->
        <section class="demo-card">
          <VIfVsVShow />
        </section>

        <!-- Props & Emit -->
        <section class="demo-card">
          <PropsEmitDemo />
        </section>

        <!-- Provide/Inject -->
        <section class="demo-card">
          <ProvideInjectDemo />
        </section>

        <!-- Slots -->
        <section class="demo-card">
          <SlotsDemo />
        </section>

        <!-- Dynamic Components -->
        <section class="demo-card">
          <DynamicComponentDemo />
        </section>

        <!-- Teleport -->
        <section class="demo-card">
          <TeleportDemo />
        </section>

        <!-- Forms -->
        <section class="demo-card">
          <FormsDemo />
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>🚀 Vue 3 Concepts Demo - Tất cả kiến thức từ document.md</p>
    </footer>
  </div>
</template>

<script>
// Import tất cả demo components
import VBindModelOnDemo from './components/VBindModelOnDemo.vue'
import ComputedVsMethod from './components/ComputedVsMethod.vue'
import VForDemo from './components/VForDemo.vue'
import WatcherDemo from './components/WatcherDemo.vue'
import VIfVsVShow from './components/VIfVsVShow.vue'
import PropsEmitDemo from './components/PropsEmitDemo.vue'
import ProvideInjectDemo from './components/ProvideInjectDemo.vue'
import SlotsDemo from './components/SlotsDemo.vue'
import DynamicComponentDemo from './components/DynamicComponentDemo.vue'
import TeleportDemo from './components/TeleportDemo.vue'
import FormsDemo from './components/FormsDemo.vue'

export default {
  name: 'App',
  components: {
    VBindModelOnDemo,
    ComputedVsMethod,
    VForDemo,
    WatcherDemo,
    VIfVsVShow,
    PropsEmitDemo,
    ProvideInjectDemo,
    SlotsDemo,
    DynamicComponentDemo,
    TeleportDemo,
    FormsDemo
  }
}
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #2d3436;
  background: #f5f6fa;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navigation Bar */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 5px;
  transition: all 0.3s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-item.router-link-active {
  background: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}

/* Main Content */
.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.router-section {
  margin-bottom: 40px;
}

.divider {
  margin: 40px 0;
  border: none;
  border-top: 3px solid #dfe6e9;
  border-radius: 3px;
}

.demos-section {
  padding: 20px 0;
}

.demos-title {
  text-align: center;
  font-size: 36px;
  color: #2d3436;
  margin-bottom: 40px;
}

.demo-card {
  background: white;
  margin: 30px 0;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.demo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

/* Footer */
.footer {
  background: #2d3436;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
}

.footer p {
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 15px;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .demos-title {
    font-size: 28px;
  }

  .demo-card {
    padding: 20px;
  }
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
