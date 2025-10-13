<template>
  <span class="badge" :class="classes">{{ caption }}</span>
</template>

<script>
export default {
  props: ['type', 'caption'],
  computed: {
    classes() {
      return {
        // 🟥 Admin badge: Chỉ add class 'badge--admin' khi type === 'admin'
        'badge--admin': this.type === 'admin',
        // 🟦 Author badge: Chỉ add class 'badge--author' khi type === 'author'
        'badge--author': this.type === 'author'
      }
    }
  }
}
</script>

<style>
.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  background-color: #ccc;
  color: #2e2e2e;
}

.badge--admin {
  background-color: #810036;
  color: white;
}

.badge--author {
  background-color: #002c8a;
  color: white;
}
</style>

<!-- 🎨 CLASS BINDING:
       - class="badge" = Static class (luôn có)
       - :class="classes" = Dynamic class binding (Vue directive)
       
       CÚ PHÁP: :class="expression"
       - Tên đầy đủ: v-bind:class
       - Shorthand: :class  
       - Loại: Vue Directive (KHÔNG phải props)
       - "classes" tham chiếu đến computed property classes() 
🔄 COMPUTED PROPERTY: Tự động re-calculate khi props thay đổi
  📝 OBJECT LITERAL WITH BOOLEAN EXPRESSIONS
  Tên gọi: "Class Object Syntax" hoặc "Conditional Class Object"
    CÚ PHÁP: { 'className': booleanExpression }
  - Nếu booleanExpression = true → class được thêm
  - Nếu booleanExpression = false → class KHÔNG được thêm -->
