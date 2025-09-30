<template>
  <ul>
    <!-- 🔴 PROPS DRILLING TIẾP TỤC: KnowledgeGrid cũng chỉ là "pass-through"!
         - Nhận topics từ KnowledgeBase (mà KnowledgeBase cũng nhận từ App)
         - Break topics thành individual props cho KnowledgeElement
         - Đây là logic duy nhất KnowledgeGrid làm!
         
         EVENT BUBBLING TIẾP TỤC:
         - Mỗi KnowledgeElement emit select-topic
         - KnowledgeGrid không xử lý, chỉ re-emit -->
    <knowledge-element
      v-for="topic in topics"
      :key="topic.id"
      :id="topic.id"
      :topic-name="topic.title"
      :description="topic.description"
      @select-topic="$emit('select-topic', $event)"
    ></knowledge-element>
  </ul>
</template>

<script>
export default {
  // 🔴 PROPS DRILLING: KnowledgeGrid chỉ dùng topics để loop, không sử dụng data bên trong
  props: ['topics'],
  // 🔴 EVENT BUBBLING: Lại là pass-through event!
  emits: ['select-topic']

  // 🚨 VẤN ĐỀ: Nếu KnowledgeElement cần thêm props (ví dụ: isActive),
  // phải sửa KnowledgeGrid này để pass-through!
  // Nếu cần thêm event handler khác, lại phải sửa!
}
</script>
