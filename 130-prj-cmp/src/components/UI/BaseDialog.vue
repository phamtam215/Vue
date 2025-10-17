<template>
  <!-- phần Backdrop (mờ)) - click sẽ phát ra sự kiện "close" để đóng dialog -->
  <div @click="$emit('close')"></div>
  <!-- Dialog container -->

  <dialog open @click.stop>
    <header>
      <slot name="header">
        <h2>{{ title }}</h2>
      </slot>
    </header>
    <section>
      <!-- Nội dung chính -->
      <slot></slot>
    </section>
    <menu>
      <!-- Buttons từ parent -->
      <slot name="actions">
        <base-button @click="$emit('close')">Close</base-button>
      </slot>
    </menu>
  </dialog>
</template>

<script>
import BaseButton from './BaseButton.vue';

export default {
  components: { BaseButton },
  props: {
    title: { type: String, required: false }, // Tiêu đề dialog (optional)
  },
  emits: ['close'], // Phát sự kiện close lên parent
};
</script>

<style scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background: white;
}

header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
