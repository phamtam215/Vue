<template>
  <!-- Component với Named Slots -->
  <div class="page-layout">
    <!-- Header slot -->
    <header class="page-header">
      <slot name="header">
        <h3>Default Header</h3>
      </slot>
    </header>

    <!-- Main content - default slot -->
    <main class="page-content">
      <slot>
        <p>Default main content</p>
      </slot>
    </main>

    <!-- Footer slot -->
    <footer class="page-footer">
      <slot name="footer">
        <p>Default Footer</p>
      </slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'PageLayout'
}
</script>

<style scoped>
.page-layout {
  border: 2px solid #0984e3;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.page-header {
  background: linear-gradient(135deg, #0984e3, #74b9ff);
  color: white;
  padding: 20px;
}

.page-header h3 {
  margin: 0;
}

.page-content {
  padding: 20px;
  min-height: 100px;
  background: white;
}

.page-footer {
  background: #dfe6e9;
  padding: 15px 20px;
  text-align: center;
  color: #2d3436;
}

.page-footer p {
  margin: 0;
  font-size: 14px;
}
</style>
