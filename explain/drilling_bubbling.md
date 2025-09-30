# Prop Drilling & Event Bubbling Problem trong Vue

Cả **Prop Drilling** và **Event Bubbling Problem** đều làm code khó bảo trì và khiến các component phụ thuộc lẫn nhau một cách không cần thiết.

---

## 1. Prop Drilling (Khoan Props) 🔽

### 🔹 Nó là gì?

Prop drilling giống như việc bạn phải **chuyền một món đồ qua nhiều người** chỉ để đưa cho người cuối cùng.
Những người ở giữa không cần món đồ đó, nhưng vẫn phải nhận rồi chuyền tiếp.

Trong Vue:

- Component cha ở cấp cao (A) có dữ liệu cần bởi component cháu ở cấp sâu (D).
- Dữ liệu phải truyền qua các component trung gian (B, C).

Luồng dữ liệu:

```
A -> B -> C -> D
```

### 🔹 Khi nào xảy ra?

Thường xuất hiện trong cấu trúc component lồng nhau sâu. Ví dụ:

- Layout chính chứa thông tin `userInfo`.
- Layout này chứa `TheHeader`.
- `TheHeader` chứa `UserAvatar`.
- `UserAvatar` cần hiển thị `userInfo.avatarUrl`.

👉 Để `UserAvatar` có dữ liệu, ta phải truyền `userInfo` từ **Layout → TheHeader → UserAvatar**.

### 🔹 Ví dụ thực tế

#### UserProfilePage.vue (Ông)

```vue
<template>
  <UserInfoSection :user="user" />
</template>
<script>
export default {
  data() {
    return {
      user: { name: '...', email: '...', phone: '...' }
    }
  }
}
</script>
```

#### UserInfoSection.vue (Cha)

```vue
<template>
  <h1>{{ user.name }}</h1>
  <ContactDetails :user="user" />
</template>
<script>
export default { props: ['user'] }
</script>
```

#### ContactDetails.vue (Con)

```vue
<template>
  <p>Email: {{ user.email }}</p>
  <p>Phone: {{ user.phone }}</p>
</template>
<script>
export default { props: ['user'] }
</script>
```

👉 `UserInfoSection` chỉ là “trạm trung gian” không cần thiết.

### 🔹 Giải pháp

- `provide / inject`
- **Pinia**
- **Vuex**

---

## 2. Event Bubbling Problem (Sự kiện nổi bọt) 🫧

### 🔹 Nó là gì?

Đây là mặt trái của prop drilling, nhưng **theo chiều ngược lại**:

- Một component cháu ở cấp sâu (D) phát ra sự kiện.
- Component ông bà ở cấp cao (A) mới cần xử lý sự kiện đó.
- Sự kiện phải đi qua các “trạm trung gian” (C, B).

Luồng sự kiện:

```
D -> C -> B -> A
```

### 🔹 Khi nào xảy ra?

Khi hành động của người dùng trong component con cần thay đổi trạng thái toàn cục.

Ví dụ:

- `ModalFooter` chứa nút “Đóng”.
- Nó nằm trong `ModalContent`.
- `ModalContent` nằm trong `BaseModal`.
- `BaseModal` được gọi từ `HomePage`.
- Trạng thái `isModalOpen` nằm ở `HomePage`.

👉 Để sự kiện đến `HomePage`, phải “bubble” qua nhiều cấp.

### 🔹 Ví dụ thực tế: Giỏ hàng

#### CartItem.vue (Con)

```vue
<template>
  <button @click="$emit('remove-item', itemId)">Xóa</button>
</template>
<script>
export default {
  props: ['itemId'],
  emits: ['remove-item']
}
</script>
```

#### CartItemsList.vue (Mẹ)

```vue
<template>
  <CartItem
    v-for="item in items"
    :key="item.id"
    :item-id="item.id"
    @remove-item="$emit('remove-item', $event)"
  />
</template>
<script>
export default {
  props: ['items'],
  emits: ['remove-item']
}
</script>
```

#### ShoppingCartPage.vue (Bà)

```vue
<template>
  <CartItemsList :items="cartItems" @remove-item="handleRemoveItem" />
</template>
<script>
export default {
  data() {
    return { cartItems: [] }
  },
  methods: {
    handleRemoveItem(itemId) {
      // Logic xóa item khỏi cartItems
    }
  }
}
</script>
```

👉 Ở đây, `CartItemsList` chỉ làm nhiệm vụ “chuyển tiếp” sự kiện.

### 🔹 Giải pháp

- **Global Event Bus**
- **Pinia**
- **Vuex**

# Giải pháp cho Prop Drilling & Event Bubbling

---

## 1. Provide / Inject (Giải pháp tích hợp của Vue)

### 🔹 Tưởng tượng

Giống như **mạng Wi-Fi** 📶:

- Component cha “phát” (provide) dữ liệu.
- Component cháu, dù sâu đến đâu, có thể “bắt sóng” (inject) mà không cần qua trung gian.

### 🔹 Cách dùng

**Component Cha (UserProfilePage.vue)**

```vue
<script>
import { provide } from 'vue'

export default {
  setup() {
    const user = { name: '...', email: '...', phone: '...' }
    provide('userData', user) // "Phát" dữ liệu cho con cháu
  }
}
</script>
```

**Component Cháu (ContactDetails.vue)**

```vue
<script>
import { inject } from 'vue'

export default {
  setup() {
    const user = inject('userData') // "Bắt sóng"
    return { user }
  }
}
</script>
```

👉 `UserInfoSection.vue` không còn cần nhận/truyền prop nữa → code gọn hơn.

### 🔹 Khi nào dùng

- Tốt cho dữ liệu ít thay đổi: **user info**, **theme**, **config**, **hàm tiện ích**.
- Giải quyết **triệt để Prop Drilling**, nhưng **không xử lý tốt Event Bubbling**.

---

## 2. Pinia (State Management - Giải pháp toàn diện)

### 🔹 Tưởng tượng

Pinia giống như một **kho tổng** 📦:

- Mọi component đều có thể lấy dữ liệu (state).
- Hoặc gọi action để thay đổi dữ liệu.
- Tập trung, rõ ràng, dễ mở rộng.

### 🔹 Cách dùng

**1. Tạo Store (stores/userStore.js)**

```js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    cartItems: []
  }),
  actions: {
    fetchUser() {
      this.user = { name: '...', email: '...' }
    },
    removeItemFromCart(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId)
    }
  }
})
```

**2. Dùng trong component**

- 🔽 Giải quyết Prop Drilling:

```vue
<script setup>
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()

// Truy cập trực tiếp
// userStore.user.email
</script>
```

- 🔼 Giải quyết Event Bubbling:

```vue
<template>
  <button @click="userStore.removeItemFromCart(item.id)">Xóa</button>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
</script>
```

👉 Không cần truyền props hoặc emit qua nhiều cấp.

### 🔹 Khi nào dùng

- Chuẩn **mặc định cho ứng dụng vừa và lớn**.
- Quản lý trạng thái tập trung, dễ debug, dễ mở rộng.

---

## 3. Global Event Bus (Giải pháp cũ, ít được khuyến khích)

### 🔹 Tưởng tượng

Như **loa phát thanh** 📢:

- Ai cũng có thể phát sự kiện.
- Ai cũng có thể nghe nếu đăng ký.

### 🔹 Vấn đề

- Giúp tránh Event Bubbling.
- Nhưng **khó debug** khi app lớn (không biết event đến từ đâu).
- Gây rối dòng dữ liệu.
- Thường dùng lib như `mitt`.
- Tuy nhiên, **Pinia** gần như luôn là lựa chọn tốt hơn.

---

## 4. Bảng so sánh

| Giải pháp            | Tốt nhất cho                                   | Ưu điểm                                                    | Nhược điểm                                                |
| -------------------- | ---------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| **Provide / Inject** | Giải quyết **Prop Drilling**                   | Tích hợp sẵn, nhẹ, dễ dùng                                 | Không xử lý tốt Event Bubbling, khó theo dõi khi phức tạp |
| **Pinia**            | Giải quyết **cả hai vấn đề**, quản lý toàn cục | Mạnh mẽ, có cấu trúc, dễ debug, dễ mở rộng, chuẩn hiện đại | Cần cài đặt thêm, có setup ban đầu                        |
| **Event Bus**        | Giao tiếp giữa component rời rạc (app nhỏ)     | Dễ thiết lập                                               | Dễ rối, khó debug, không khuyến khích cho dự án lớn       |

---

## 📌 Khuyến nghị

- Với app nhỏ, dùng **Provide / Inject** để giải quyết nhanh.
- Với app vừa/lớn, dùng **Pinia** để quản lý trạng thái rõ ràng, lâu dài.
- Tránh dùng **Event Bus** trừ khi app rất nhỏ hoặc cần giải pháp tạm thời.

## 2 điều kiện cần là:

- Quan hệ Tổ tiên - Hậu duệ: Component inject phải được đặt bên trong component provide. Khoảng cách bao nhiêu cấp cũng được.
- Cùng "chìa khóa" (Key): Tên (key) bạn dùng trong provide('myKey', ...) phải khớp chính xác với tên trong inject('myKey').
