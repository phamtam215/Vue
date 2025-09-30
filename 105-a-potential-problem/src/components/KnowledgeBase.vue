<template>
  <section>
    <h2>Select a Topic</h2>
    <!-- 🔴 PROPS DRILLING: KnowledgeBase chỉ là "pass-through" component!
         - Nhận :topics từ App
         - Không sử dụng topics cho bản thân
         - Chỉ truyền tiếp cho KnowledgeGrid
         
         EVENT BUBBLING: Lại là "pass-through" cho event!
         - Nhận select-topic từ KnowledgeGrid
         - Không xử lý gì
         - Chễ re-emit lên App -->
    <knowledge-grid
      :topics="topics"
      @select-topic="$emit('select-topic', $event)"
    ></knowledge-grid>
  </section>
</template>

<script>
export default {
  // 🔴 UNNECESSARY PROPS: KnowledgeBase không sử dụng topics!
  props: ['topics'],
  // 🔴 UNNECESSARY EMITS: KnowledgeBase không xử lý select-topic!
  emits: ['select-topic']

  // 🚨 VẤN ĐỀ: Component này chỉ là "middleman" không cần thiết
  // Nếu cần thêm props mới cho KnowledgeElement,
  // phải sửa KnowledgeBase này mặc dù nó không dùng!
}
</script>
