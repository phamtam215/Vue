# A. PROPS

### 1. Khái niệm Props

Props (viết tắt của _properties_) là cách để truyền dữ liệu từ component cha xuống component con.
Đây là cơ chế giao tiếp cơ bản và quan trọng nhất giữa các component trong Vue.

### 2. Khi nào dùng Props?

Bạn dùng props bất cứ khi nào một component cha cần gửi thông tin cho component con để nó hiển thị hoặc hoạt động.

### 3. Những điều cần lưu ý khi dùng 📝

### 🔹 Luồng dữ liệu một chiều (One-Way Data Flow)

Đây là quy tắc quan trọng nhất. Dữ liệu chỉ chảy **từ Cha xuống Con**.
Component con không được phép thay đổi trực tiếp props mà nó nhận được.

Nếu con cần thay đổi dữ liệu, nó phải gửi một "tín hiệu" (sự kiện `emit`) lên cho cha và để cha tự quyết định việc thay đổi.
Quy tắc này giúp ứng dụng dễ quản lý và gỡ lỗi hơn.

### 🔹 Khai báo Props rõ ràng (Props Validation)

Luôn khai báo props một cách chi tiết để giúp người khác (và chính bạn) hiểu component cần gì.

```js
// ❌ Thay vì chỉ khai báo một mảng tên
// props: ['username', 'age']

// ✅ Hãy khai báo như một đối tượng để kiểm tra kiểu dữ liệu, yêu cầu, giá trị mặc định
props: {
  username: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 18
  }
}
```

### 🔹 Quy ước đặt tên (Naming Convention)

- Trong **HTML (Cha)**: dùng **kebab-case**

  ```html
  <UserProfile :user-age="user.age" />
  ```

- Trong **JavaScript (Con)**: dùng **camelCase**

  ```js
  props: {
    userAge: Number
  }
  ```

👉 Vue sẽ tự động chuyển đổi giữa hai cách viết này.

### 🔹 So sánh: cách dùng trong HTML vs Javascript

- **JavaScript** giống như tiếng Anh: viết biến dài liền nhau và viết hoa chữ cái đầu ở giữa, ví dụ: `mailAddress`.
- **HTML** có "ngôn ngữ riêng": không phân biệt chữ hoa–thường, dùng dấu gạch nối để tách từ, ví dụ: `mail-address`.

Vue chính là người phiên dịch 🤖 thông minh đứng giữa.

Khi Vue thấy bạn viết `mail-address` trong template HTML, nó sẽ tự động hiểu rằng bạn muốn nói đến prop `mailAddress` trong script.

### 🔹 Tại sao có sự khác biệt này?

Lý do chính là vì **thuộc tính HTML không phân biệt chữ hoa chữ thường**.

Ví dụ:

```html
<MyComponent mailAddress="email@example.com" />
```

Trình duyệt sẽ hiểu nó thành `mailaddress`. Điều này làm mất chữ **A** viết hoa, và Vue sẽ không thể khớp với prop `mailAddress`.

👉 Do đó, quy ước chuẩn là dùng **kebab-case trong HTML**, vì đây là cách chính thống để phân tách từ trong thuộc tính HTML.

---

### 🔹 Thứ tự ưu tiên của Vue

Hãy tưởng tượng Vue giống như một người lễ tân tìm thông tin. Khi bạn hỏi "cho tôi thông tin về name", người lễ tân sẽ tìm theo thứ tự sau:

- Kiểm tra trong props trước tiên: "Có 'khách' nào từ bên ngoài gửi vào tên là name không?" Nếu có, nó sẽ lấy ngay giá trị đó và dừng việc tìm kiếm.
- Nếu không có, mới kiểm tra trong data: "Không có khách nào tên name, vậy để tôi xem nhân viên nội bộ có ai tên name không."
- Tiếp theo là computed, methods...

Do props được ưu tiên hàng đầu, nên khi một thuộc tính có tên trùng nhau, giá trị từ props sẽ luôn được sử dụng. Giá trị bạn khai báo trong data sẽ bị "che khuất" và bỏ qua.

# B. Dynamic Props (Props động)

**Dynamic props** là props mà giá trị của nó được lấy từ dữ liệu của component cha (như `data` hoặc `computed`) và có thể thay đổi theo thời gian.

Để truyền một prop động, bạn phải dùng **`v-bind`** hoặc cú pháp viết tắt là **dấu hai chấm (`:`)**.

---

### 1. Phân biệt: Prop tĩnh vs Prop động

### 🔹 Prop Tĩnh (Static Prop)

Giá trị được truyền vào là một chuỗi văn bản cố định.

```html
<UserProfile name="Nguyễn Văn An" />
```

### 🔹 Prop Động (Dynamic Prop)

Giá trị được truyền vào là một biến hoặc một biểu thức JavaScript từ component cha.

```html
<UserProfile :name="currentUser" />
```

---

### 2. Phép so sánh dễ hiểu

- **Prop tĩnh** giống như một bảng hiệu **được in cố định** 📜.
  Nó ghi chữ _"Giảm giá 10%"_ và sẽ không bao giờ thay đổi, trừ khi bạn thay biển mới.

- **Prop động** giống như một bảng hiệu **điện tử** 🖥️.
  Nó kết nối với dữ liệu, có thể hôm nay hiển thị _"Giảm giá 10%"_ nhưng ngày mai sẽ tự động đổi thành _"Mua 1 tặng 1"_ khi dữ liệu thay đổi.

---

### 3. Ví dụ thực tế

Dưới đây là ví dụ về một component cha có thể thay đổi dữ liệu và truyền nó xuống component con.

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Vue 3: Dynamic Props</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
      body {
        font-family: sans-serif;
        padding: 20px;
        text-align: center;
      }
      .card {
        border: 1px solid #ccc;
        padding: 20px;
        margin: 20px auto;
        max-width: 400px;
      }
      button {
        font-size: 1em;
        padding: 10px 20px;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <h1>Thông tin người dùng (tại Component Cha)</h1>
      <p>Người dùng hiện tại: {{ currentUser.name }}</p>
      <button @click="changeUser">Đổi người dùng</button>

      <!-- Truyền prop động -->
      <user-greeting :username="currentUser.name"></user-greeting>
    </div>

    <script>
      const app = Vue.createApp({
        data() {
          return {
            currentUser: { id: 1, name: 'An Nguyễn' }
          }
        },
        methods: {
          changeUser() {
            if (this.currentUser.id === 1) {
              this.currentUser = { id: 2, name: 'Bình Trần' }
            } else {
              this.currentUser = { id: 1, name: 'An Nguyễn' }
            }
          }
        }
      })

      app.component('user-greeting', {
        props: ['username'],
        template: `
            <div class="card">
                <h2>Xin chào, {{ username }}!</h2>
                <p>(Đây là thông tin hiển thị ở Component Con)</p>
            </div>
        `
      })

      app.mount('#app')
    </script>
  </body>
</html>
```

---

### 4. Cách hoạt động

- Ban đầu, `currentUser.name = "An Nguyễn"`.
  → Prop `username` truyền xuống con cũng là **"An Nguyễn"**.

- Khi bấm nút **"Đổi người dùng"**, `currentUser.name` trong component cha đổi thành **"Bình Trần"**.

- Vì prop `username` được truyền **động** (`:username`), nó cũng tự động cập nhật thành **"Bình Trần"**, và component con sẽ render lại để hiển thị lời chào mới.

✅ **Chốt lại:**

- JavaScript → dùng **camelCase** (`mailAddress`)
- HTML → dùng **kebab-case** (`mail-address`)

Vue sẽ tự động xử lý phần còn lại cho bạn.

# C. Global vs Local Components

Một component được đăng ký global sẽ có sẵn để sử dụng trong template của bất kỳ component nào trong ứng dụng của bạn mà không cần phải import.

### 1. Global Components

### 🔹 Cách đăng ký

Bạn thường đăng ký chúng trong file **main.js** khi khởi tạo ứng dụng Vue.

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

// Import component bạn muốn đăng ký global
import BaseButton from './components/BaseButton.vue'
import AppIcon from './components/AppIcon.vue'

const app = createApp(App)

// Đăng ký BaseButton và AppIcon thành global component
app.component('BaseButton', BaseButton)
app.component('AppIcon', AppIcon)

app.mount('#app')
```

**👍 Ưu điểm:**

- Rất tiện lợi cho các component được sử dụng rất nhiều lần ở khắp mọi nơi, ví dụ như các nút bấm, icon, input cơ bản.

**👎 Nhược điểm:**

- Làm "ô nhiễm" không gian tên toàn cục.
- Tăng kích thước gói bundle ban đầu vì chúng luôn được tải, ngay cả khi không được sử dụng ở trang đó.
- Khó theo dõi sự phụ thuộc: Khi nhìn vào một component, bạn không biết `BaseButton` đến từ đâu nếu không nhớ rằng nó đã được đăng ký global.

---

### 2. Local Components (Đăng ký cục bộ)

Đây là cách phổ biến và được khuyên dùng nhất. Component chỉ có thể được sử dụng bên trong component đã đăng ký nó.

### 🔹 Cách đăng ký

Bạn import trực tiếp component vào file bạn cần và khai báo nó trong tùy chọn `components`.

```vue
<template>
  <div>
    <h2>Thông tin người dùng</h2>
    <UserAvatar :src="avatarUrl" />
    <BaseButton>Lưu thay đổi</BaseButton>
  </div>
</template>

<script>
// 1. Import component cần dùng
import UserAvatar from './UserAvatar.vue'

export default {
  // 2. Đăng ký component vào đây
  components: {
    UserAvatar
    // Tên component: Component được import
  }
  // ...
}
</script>
```

**👍 Ưu điểm:**

- **Đóng gói (Encapsulated):** Giúp giữ cho các component độc lập và không ảnh hưởng lẫn nhau.
- **Rõ ràng:** Dễ dàng thấy được component này phụ thuộc vào những component con nào chỉ bằng cách nhìn vào phần `<script>`.
- **Hiệu năng tốt hơn:** Hỗ trợ tree-shaking tốt hơn. Component chỉ được tải khi component cha cần đến nó.

**👎 Nhược điểm:**

- Phải import và đăng ký ở mọi nơi bạn cần sử dụng, có thể hơi dài dòng nếu dùng ở quá nhiều nơi.

---

### 3. Khi nào dùng cái nào?

| Tiêu chí             | Dùng Global ⚡                                           | Dùng Local 🧑‍🍳                                        |
| -------------------- | -------------------------------------------------------- | ---------------------------------------------------- |
| **Tần suất sử dụng** | Rất thường xuyên, ở hầu hết mọi nơi                      | Chỉ dùng ở một vài nơi cụ thể                        |
| **Ví dụ**            | BaseButton, AppIcon, FormInput, BaseCard                 | UserProfile, ProductList, OrderDetails, ShoppingCart |
| **Quy tắc chung**    | Hạn chế chỉ dùng cho các component nền tảng, rất cơ bản. | Ưu tiên sử dụng trong hầu hết các trường hợp.        |

# D. Scoped style

# Scoped Style trong Vue.js

Scoped style là một tính năng trong **Single-File Component** của Vue cho phép bạn viết CSS mà **chỉ ảnh hưởng đến component đó**, không bị "rò rỉ" hay xung đột với các component khác.

Bạn kích hoạt tính năng này bằng cách thêm thuộc tính `scoped` vào thẻ `<style>`:

    <style scoped>

---

## 🏀 Phép so sánh: Đồng phục đội bóng

- **CSS thông thường (Không scoped):**  
  Giống như một quy định của trường học yêu cầu tất cả học sinh phải mặc áo sơ mi trắng.  
  → Quy tắc này ảnh hưởng đến _mọi người_.

- **CSS scoped:**  
  Giống như đồng phục của đội bóng rổ. Quy định _"mặc áo thi đấu màu xanh"_ chỉ áp dụng cho các **thành viên trong đội bóng rổ** (component đó).  
  → Những học sinh ở câu lạc bộ cờ vua hay đội văn nghệ (các component khác) sẽ **không bị ảnh hưởng**.

---

## ⚙️ Cách hoạt động

Khi bạn dùng `<style scoped>`, Vue sẽ thực hiện một "phép màu" nhỏ phía sau hậu trường:

1. **Thêm thuộc tính dữ liệu (data attribute)** duy nhất vào tất cả các phần tử HTML trong template của component.  
   Ví dụ: `data-v-f3f3eg9`.

2. **Viết lại các quy tắc CSS** để chúng chỉ nhắm đến các phần tử có thuộc tính duy nhất đó.

---

### Những gì bạn viết

    <template>
      <p>Xin chào</p>
    </template>

    <style scoped>
      p {
        color: blue;
      }
    </style>

### Những gì Vue tạo ra trong trình duyệt

**HTML**

    <p data-v-f3f3eg9>Xin chào</p>

**CSS**

    /* CSS được sinh ra */
    p[data-v-f3f3eg9] {
      color: blue;
    }

---

## 💡 Lợi ích chính

- **Chống xung đột:**  
  Bạn có thể tự do đặt tên class `.title` hay `.card` trong nhiều component khác nhau mà không sợ chúng “đè” style của nhau.

- **Tăng tính đóng gói:**  
  Giúp HTML, JavaScript và CSS của một component thực sự nằm gọn và độc lập với nhau.

- **Dễ dàng bảo trì:**  
  Bạn có thể tự tin sửa CSS của một component mà không lo làm hỏng giao diện ở nơi khác trong ứng dụng.

---

> 🔖 **Quy tắc chung:**  
> Hầu hết các component bạn viết đều nên sử dụng `<style scoped>` để đảm bảo tính ổn định và dễ quản lý.

# E. Slots

# Slots trong Vue.js

**Slots** là một cơ chế trong Vue cho phép bạn **truyền nội dung HTML từ component cha vào các vị trí được định sẵn trong template của component con**.  
Nó giúp tạo ra các component layout có khả năng **tái sử dụng và linh hoạt cao**.

---

## 🖼️ Phép so sánh: Cái khung ảnh

- **Cái khung ảnh (Component Con):**  
  Nó có sẵn viền, kính, và móc treo. Tuy nhiên, phần quan trọng nhất ở giữa thì lại trống.  
  Chỗ trống đó chính là `<slot>`.

- **Nội dung bạn muốn trưng bày (Từ Component Cha):**  
  Bạn có thể đặt bất cứ thứ gì vào chỗ trống đó — một bức ảnh gia đình, một bức tranh, hay một tấm bằng khen.

- **Kết quả:**  
  Cái khung (Con) sẽ cung cấp phần layout bao bọc xung quanh nội dung mà bạn (Cha) đã cung cấp.

---

## 🧩 Các loại Slots

### 1. Default Slot (Slot mặc định)

Đây là trường hợp đơn giản nhất, với **một slot duy nhất không có tên**.

**BaseCard.vue (Component Con):**

    <template>
      <div class="card">
        <slot></slot>
      </div>
    </template>

    <style scoped>
      .card {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 8px;
      }
    </style>

**App.vue (Component Cha):**

    <template>
      <BaseCard>
        <h1>Đây là tiêu đề</h1>
        <p>Đây là nội dung của thẻ.</p>
      </BaseCard>
    </template>

---

### 2. Named Slots (Slot có tên)

Dùng khi bạn cần truyền nội dung vào **nhiều vị trí khác nhau** trong component con.

**PageLayout.vue (Component Con):**

    <template>
      <div class="container">
        <header>
          <slot name="header"></slot>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>
    </template>

**App.vue (Component Cha):**

    <template>
      <PageLayout>
        <template v-slot:header>
          <h1>Đây là tiêu đề trang</h1>
        </template>

        <template #footer>
          <p>Bản quyền © 2025</p>
        </template>

        <p>Đây là nội dung chính của trang.</p>
      </PageLayout>
    </template>

---

### 3. Scoped Slots (Slot có phạm vi) — Nâng cao

Cho phép **component con truyền dữ liệu ngược lên cho cha** ngay tại vị trí của slot.

**UserList.vue (Component Con):**

    <template>
      <ul>
        <li v-for="user in users" :key="user.id">
          <slot :user-data="user"></slot>
        </li>
      </ul>
    </template>

    <script>
    export default {
      data() {
        return {
          users: [
            { id: 1, name: 'An' },
            { id: 2, name: 'Bình' }
          ]
        }
      }
    }
    </script>

**App.vue (Component Cha):**

    <template>
      <UserList>
        <template v-slot:default="slotProps">
          <strong>{{ slotProps.userData.name.toUpperCase() }}</strong>
        </template>
      </UserList>
    </template>

👉 Nó giống như cái khung ảnh (Con) nói với bạn (Cha):  
_"Đây là dữ liệu về bức ảnh (userData), ông hãy tự quyết định cách hiển thị nó nhé."_

---

## 🧠 Khi nào dùng Slots?

- Khi bạn muốn tạo các **component layout có thể tái sử dụng cao**, như:

  - Modal
  - Card
  - PageLayout
  - DataTable

- Khi bạn muốn **component cha có toàn quyền quyết định nội dung HTML** bên trong component con.
