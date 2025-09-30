<template>
  <section>
    <!-- 🟢 COMPONENT NÀY KHÔNG CÓ VẤN ĐỀ!
         - Nhận props trực tiếp từ App.vue
         - Sử dụng props để hiển thị
         - Không có pass-through nào -->
    <h2>{{ topicTitle }}</h2>
    <p>{{ text }}</p>
  </section>
</template>

<script>
export default {
  // 🟢 PROPS ĐƯỢC SỬ DỤNG TRỰC TIẾP - KHÔNG CÓ DRILLING!
  // App.vue truyền trực tiếp, ActiveElement sử dụng luôn
  props: ['topicTitle', 'text']

  // 📝 SO SÁNH:
  // ActiveElement: App → ActiveElement (1 bước)
  // KnowledgeElement: App → KnowledgeBase → KnowledgeGrid → KnowledgeElement (3 bước)
}
</script>
