<template>
  <!-- Child component: Phát ra sự kiện cho parent -->
  <div class="counter-child">
    <h4>Counter trong Child Component</h4>
    <div class="counter-display">{{ count }}</div>

    <div class="button-group">
      <!-- Emit sự kiện với tham số -->
      <button @click="$emit('increment', 1)" class="btn-increment">+1</button>
      <button @click="$emit('increment', 5)" class="btn-increment">+5</button>
      <button @click="$emit('decrement', 1)" class="btn-decrement">-1</button>
      <button @click="$emit('reset')" class="btn-reset">Reset</button>
    </div>

    <p class="note">💡 Click các nút để phát sự kiện lên Parent</p>
  </div>
</template>

<script>
export default {
  name: 'CounterChild',
  props: {
    initialCount: {
      type: Number,
      default: 0
    }
  },
  // Khai báo các sự kiện component này có thể phát ra
  emits: ['increment', 'decrement', 'reset'],
  computed: {
    count() {
      return this.initialCount
    }
  }
}
</script>

<style scoped>
.counter-child {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.counter-child h4 {
  margin-top: 0;
  color: #2d3436;
}

.counter-display {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  color: #fd79a8;
  margin: 20px 0;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.button-group button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-increment {
  background: #00b894;
  color: white;
}

.btn-increment:hover {
  background: #00a085;
  transform: scale(1.05);
}

.btn-decrement {
  background: #ff7675;
  color: white;
}

.btn-decrement:hover {
  background: #ee6b6a;
  transform: scale(1.05);
}

.btn-reset {
  background: #74b9ff;
  color: white;
}

.btn-reset:hover {
  background: #5fa3e8;
  transform: scale(1.05);
}

.note {
  text-align: center;
  color: #636e72;
  font-size: 14px;
  font-style: italic;
  margin-top: 15px;
  margin-bottom: 0;
}
</style>
