<template>
  <li>
    <!-- 🟢 ĐÂY LÀ NƠI THỰC SỰ SỬ DỤNG DATA!
         - topicName và description được hiển thị
         - id được sử dụng khi emit event -->
    <h3>{{ topicName }}</h3>
    <p>{{ description }}</p>

    <!-- 🟢 ĐÂY LÀ NƠI THỰC SỰ EMIT EVENT!
         - User click button
         - Emit 'select-topic' với topic id
         - Event phải đi qua KnowledgeGrid → KnowledgeBase → App -->
    <button @click="$emit('select-topic', id)">Learn More</button>
  </li>
</template>

<script>
export default {
  // 🟢 ĐÂY LÀ COMPONENT THỰC SỰ CẦN PROPS!
  // Mọi props đều được sử dụng trong template
  props: ['id', 'topicName', 'description'],

  // 🟢 ĐÂY LÀ NƠI EVENT ĐƯỢC TẠO!
  // Component này thực sự tạo ra event 'select-topic' khi user tương tác
  emits: ['select-topic']

  // 🚨 VẤN ĐỀ: Component này OK, nhưng:
  // - Props có thể direct từ App thay vì qua 2 tầng trung gian
  // - Event có thể direct đến App thay vì bubble qua 2 tầng
}
</script>
