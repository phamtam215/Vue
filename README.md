# 🚀 Vue.js Cho Người Mới Bắt Đầu - Từ Zero Đến Hero

Chào mừng bạn đến với hành trình khám phá Vue.js! Qua 3 bài học này, bạn sẽ hiểu Vue từ cơ bản đến nâng cao theo cách dễ hiểu nhất.

---

## 📚 **Bài 1: Ứng dụng đầu tiên - Todo List**

_Folder: 01-getting-starting-project_

### Tại sao bắt đầu với Todo List?

Giống như học lái xe, bạn phải bắt đầu với những thao tác cơ bản nhất. Todo List là "bài tập lái xe" hoàn hảo để hiểu Vue!

### � **Khái niệm quan trọng:**

#### **Vue là "người quản gia thông minh" 🤖**

Hãy tưởng tượng Vue như một người quản gia siêu thông minh trong ngôi nhà của bạn:

- **Bạn nói**: "Tôi muốn thêm việc mới vào danh sách"
- **Vue làm**: Tự động cập nhật danh sách trên màn hình, không cần bạn can thiệp gì thêm!

#### **Reactive Data - Dữ liệu "sống"**

```javascript
data() {
  return {
    goals: [],           // 📝 Danh sách công việc "sống"
    enteredValue: ''     // 💬 Nội dung đang gõ "sống"
  };
}
```

**Tại sao gọi là "sống"?** Vì mỗi khi bạn thay đổi `goals` hoặc `enteredValue`, Vue tự động cập nhật mọi chỗ sử dụng chúng trên màn hình!

### 🎯 **4 "Siêu năng lực" Vue trong bài này:**

#### **1. Interpolation `{{ }}` - "Cửa sổ hiển thị"**

```html
<li v-for="goal in goals">{{goal}}</li>
```

**Ẩn dụ**: Giống như cửa sổ kính trong nhà. Bạn có thể nhìn thấy bên trong (dữ liệu) từ bên ngoài (HTML), nhưng không thể chạm vào.

#### **2. v-model - "Cặp bộ đàm thông minh"** 🎙️

```html
<input v-model="enteredValue" />
```

**Ẩn dụ**: Giống như cặp bộ đàm:

- Bạn nói vào (gõ text) → Vue nghe thấy (cập nhật data)
- Vue nói (thay đổi data) → Bạn nghe thấy (input tự động thay đổi)

#### **3. v-on - "Nhân viên lắng nghe"** 👂

```html
<button v-on:click="addGoal">Add Goal</button>
```

**Ẩn dữ**: Giống như có một nhân viên 24/7 canh gác nút này. Mỗi khi bạn click, nhân viên lập tức báo cáo cho Vue: "Sếp ơi, có người click đây!"

#### **4. v-for - "Máy photocopy thông minh"** 📄

```html
<li v-for="goal in goals">{{goal}}</li>
```

**Ẩn dụ**: Giống như máy photocopy tự động. Có bao nhiêu mục trong `goals`, nó tự động "copy" ra bấy nhiêu thẻ `<li>`.

### ✨ **Demo thực tế - Copy và chạy ngay:**

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Todo List Đầu Tiên</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
      body {
        font-family: Arial;
        padding: 20px;
      }
      input {
        padding: 10px;
        margin-right: 10px;
      }
      button {
        padding: 10px 20px;
        background: #42b883;
        color: white;
        border: none;
      }
      li {
        padding: 8px;
        margin: 5px 0;
        background: #f0f0f0;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <h1>📝 Todo List Của Tôi</h1>

      <div>
        <input v-model="enteredValue" placeholder="Nhập công việc mới..." />
        <button v-on:click="addGoal">Thêm việc</button>
      </div>

      <ul>
        <li v-for="goal in goals">{{ goal }}</li>
      </ul>
    </div>

    <script>
      Vue.createApp({
        data() {
          return {
            goals: ['Học Vue.js', 'Làm project đầu tiên'],
            enteredValue: ''
          }
        },
        methods: {
          addGoal() {
            if (this.enteredValue.trim()) {
              this.goals.push(this.enteredValue)
              this.enteredValue = ''
            }
          }
        }
      }).mount('#app')
    </script>
  </body>
</html>
```

**Thử nghiệm**: Gõ text và click "Thêm việc". Bạn sẽ thấy phép màu Vue! 🎪

---

## 🎭 **Bài 2: Hiển thị dữ liệu động**

_Folder: 17-introduction-vue_

### Vue như "Nhà ảo thuật" 🎩✨

#### **Interpolation `{{ }}` - "Chiếc mũ phép thuật"**

```html
<p>{{ courseGoal }}</p>
<p>{{ outputGoal() }}</p>
```

**Quy tắc vàng**: `{{ }}` chỉ hoạt động bên TRONG thẻ HTML, không hoạt động ở thuộc tính!

```html
<!-- ✅ ĐÚNG -->
<p>{{ message }}</p>

<!-- ❌ SAI - Không bao giờ làm thế này! -->
<a href="{{ link }}">Link lỗi</a>
```

#### **v-bind - "Cây đũa thần cho thuộc tính"** 🪄

```html
<a v-bind:href="vueLink">Đường link thần kỳ</a>

<!-- Viết tắt (nâng cao) -->
<a :href="vueLink">Cách viết pro</a>
```

**So sánh thực tế:**

- **Không có v-bind**: Giống như viết địa chỉ cố định lên phong bì
- **Có v-bind**: Giống như máy in tự động in địa chỉ từ database

### 🎲 **Demo: Máy random mục tiêu**

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Random Goals</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
      body {
        font-family: Arial;
        padding: 20px;
        text-align: center;
      }
      .goal-box {
        background: #e8f5e8;
        padding: 20px;
        margin: 20px;
        border-radius: 10px;
      }
      button {
        padding: 15px 30px;
        font-size: 16px;
        margin: 10px;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <h1>🎯 Máy Random Mục Tiêu</h1>

      <div class="goal-box">
        <h2>{{ currentGoal }}</h2>
        <p>{{ randomMessage() }}</p>
      </div>

      <button v-on:click="changeGoal">🎲 Đổi mục tiêu</button>
      <p>
        Tìm hiểu thêm
        <a v-bind:href="vueLink" target="_blank">tại đây</a>
      </p>
    </div>

    <script>
      Vue.createApp({
        data() {
          return {
            currentGoal: 'Học Vue.js cơ bản',
            goalA: 'Trở thành Vue Developer',
            goalB: 'Xây dựng ứng dụng thực tế',
            goalC: 'Tham gia dự án lớn',
            vueLink: 'https://vuejs.org'
          }
        },
        methods: {
          changeGoal() {
            const goals = [this.goalA, this.goalB, this.goalC]
            const randomIndex = Math.floor(Math.random() * goals.length)
            this.currentGoal = goals[randomIndex]
          },
          randomMessage() {
            const messages = ['Bạn có thể làm được!', 'Cố lên!', 'Tuyệt vời!']
            return messages[Math.floor(Math.random() * messages.length)]
          }
        }
      }).mount('#app')
    </script>
  </body>
</html>
```

---

## ⚡ **Bài 3: Xử lý sự kiện như pro**

_Folder: 24-basic-events_

### Vue Events - "Hệ thống điều khiển thông minh" 🎮

#### **v-on - "Bộ não xử lý sự kiện"**

**3 cấp độ từ cơ bản đến nâng cao:**

```html
<!-- Cấp độ 1: Inline (Không nên dùng) -->
<button v-on:click="counter++">Cộng 1</button>

<!-- Cấp độ 2: Gọi method (Tốt) -->
<button v-on:click="add">Cộng 1</button>

<!-- Cấp độ 3: Method với tham số (Pro) -->
<button v-on:click="add(5)">Cộng 5</button>
```

#### **Event Modifiers - "Phím tắt siêu tiện lợi"** ⌨️

```html
<!-- .prevent = không reload trang -->
<form v-on:submit.prevent="submitForm">
  <!-- .right = click chuột phải -->
  <button v-on:click.right="showMenu">Menu</button>

  <!-- .enter = nhấn phím Enter -->
  <input v-on:keyup.enter="search" />

  <!-- .stop = không lan truyền sự kiện -->
  <div v-on:click.stop="doSomething"></div>
</form>
```

**Ẩn dụ**: Giống như phím tắt trên bàn phím - một phím làm nhiều việc!

#### **v-model vs v-bind+v-on - "Cuộc đối đầu kinh điển"** ⚔️

```html
<!-- Cách cổ điển (dài dòng) -->
<input v-bind:value="name" v-on:input="name = $event.target.value" />

<!-- Cách hiện đại (ngắn gọn) -->
<input v-model="name" />
```

**v-model = v-bind + v-on** đóng gói trong một!

### 🎪 **Demo: Máy tính mini tương tác**

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Máy Tính Mini</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
      body {
        font-family: Arial;
        padding: 20px;
      }
      .calculator {
        max-width: 400px;
        margin: 0 auto;
        text-align: center;
      }
      .display {
        font-size: 2em;
        background: #333;
        color: #fff;
        padding: 20px;
        margin: 20px 0;
      }
      button {
        font-size: 1.2em;
        padding: 15px 20px;
        margin: 5px;
      }
      .add-btn {
        background: #4caf50;
        color: white;
      }
      .subtract-btn {
        background: #f44336;
        color: white;
      }
      .reset-btn {
        background: #2196f3;
        color: white;
      }
      input {
        padding: 10px;
        margin: 10px;
        width: 200px;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <div class="calculator">
        <h1>🧮 Máy Tính Mini Vue</h1>

        <div class="display">{{ counter }}</div>

        <div>
          <button class="add-btn" v-on:click="add(1)">+1</button>
          <button class="add-btn" v-on:click="add(5)">+5</button>
          <button class="add-btn" v-on:click="add(10)">+10</button>
        </div>

        <div>
          <button class="subtract-btn" v-on:click="subtract(1)">-1</button>
          <button class="subtract-btn" v-on:click.right="subtract(10)">
            -10 (Chuột phải)
          </button>
        </div>

        <div>
          <button class="reset-btn" v-on:click="reset">🔄 Reset</button>
        </div>

        <hr />

        <h3>💬 Thử v-model</h3>
        <input
          v-model="yourName"
          placeholder="Nhập tên của bạn"
          v-on:keyup.enter="sayHello"
        />
        <button v-on:click="sayHello">Chào!</button>
        <p v-if="yourName">Xin chào {{ yourName }}! 👋</p>

        <div>
          <button v-on:click="clearName">Xóa tên</button>
        </div>
      </div>
    </div>

    <script>
      Vue.createApp({
        data() {
          return {
            counter: 0,
            yourName: ''
          }
        },
        methods: {
          add(num) {
            this.counter += num
          },
          subtract(num) {
            this.counter -= num
          },
          reset() {
            this.counter = 0
          },
          sayHello() {
            if (this.yourName.trim()) {
              alert(`Xin chào ${this.yourName}! 🎉`)
            }
          },
          clearName() {
            this.yourName = ''
          }
        }
      }).mount('#app')
    </script>
  </body>
</html>
```

**Thử nghiệm:**

1. Click các nút +/- để thấy counter thay đổi
2. Click chuột PHẢI vào nút "-10"
3. Nhập tên và nhấn Enter
4. Thử các tính năng khác!

---

## 🎓 **Tổng kết: 5 "Vũ khí" Vue bạn đã thành thạo**

| Vũ khí    | Sức mạnh        | Khi nào dùng       | Ví dụ                        |
| --------- | --------------- | ------------------ | ---------------------------- |
| `{{ }}`   | Hiển thị data   | Trong nội dung thẻ | `<p>{{ message }}</p>`       |
| `v-bind`  | Thuộc tính động | Link, ảnh, class   | `<a :href="link">`           |
| `v-on`    | Bắt sự kiện     | Click, nhập liệu   | `<button @click="save">`     |
| `v-for`   | Lặp danh sách   | Render nhiều item  | `<li v-for="item in items">` |
| `v-model` | 2-way binding   | Form input         | `<input v-model="name">`     |

### 🚀 **Bước tiếp theo:**

Giờ bạn đã sẵn sàng học:

1. **Components** - Chia nhỏ ứng dụng
2. **Props & Events** - Giao tiếp components
3. **Router** - Nhiều trang trong 1 app
4. **State Management** - Quản lý data phức tạp

**Chúc mừng bạn đã hoàn thành hành trình Vue.js cơ bản! 🎉**
