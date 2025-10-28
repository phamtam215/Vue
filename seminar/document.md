### v-bind, v-on, v-model

| **Chỉ thị** | **Tên đầy đủ**   | **Viết tắt** | **Luồng dữ liệu**     | **Phép so sánh**             |
| ----------- | ---------------- | ------------ | --------------------- | ---------------------------- |
| v-bind      | v-bind:attribute | :            | Một chiều (JS → HTML) | 📢 TV (Chỉ nhận tín hiệu)    |
| v-on        | v-on:event       | @            | Một chiều (HTML → JS) | 🔔 Chuông cửa (Gửi tín hiệu) |
| v-model     | v-model          | (không có)   | Hai chiều (JS ↔ HTML) | 🔁 Bộ đàm (Gửi và nhận)      |

- **v-bind**
  - Khái niệm
    `v-bind` dùng để **"ràng buộc"** một thuộc tính (attribute) của thẻ HTML với một dữ liệu trong phần script của bạn. Dữ liệu sẽ chảy **từ JavaScript ra HTML**.
  - Khi nào dùng
    - Khi bạn muốn một thuộc tính của HTML (như `class`, `src`, `href`, `style`, `disabled`) được quyết định bởi dữ liệu trong Vue.
    - `v-bind` (hoặc dấu `:`) luôn luôn được dùng để ràng buộc dữ liệu với một **thuộc tính (attribute)** của một thẻ HTML hoặc một **prop** của một component con.
    - Khi một component cha muốn truyền dữ liệu xuống cho component con, nó cũng sử dụng `v-bind` để "ràng buộc" dữ liệu của cha với một `prop` của con.
  - Example
    ```html
    <div id="app">
      <img :src="imageUrl" alt="Ảnh mô tả" />

      <!-- Vue (Liên tục "lắng nghe" dữ liệu và thêm/xóa class khi cần)
    Nếu không có v-bind (:class) rình duyệt chỉ đọc một lần lúc tải trang)
    -->
      <p :class="{ active: isActive }">Đoạn văn này có thể đổi màu.</p>

      <button @click="isActive = !isActive">Đổi màu</button>
    </div>

    <script>
      //...
      data() {
        return {
          imageUrl: 'https://vuejs.org/images/logo.png',
          isActive: false
        }
      }
    </script>

    <style>
      .active {
        color: red;
        font-weight: bold;
      }
    </style>
    ```
- **v-on**
  - Khái niệm
    `v-on` dùng để **lắng nghe** một sự kiện từ người dùng (như click chuột, gõ phím) trên một thẻ HTML và **thực thi** một hành động (gọi một method) trong phần script.
  - Khi nào dùng
    Khi bạn muốn thực hiện một logic nào đó để đáp lại tương tác của người dùng.
  - Example
    ```html
    <div id="app">
      <!-- v-on:click lắng nghe để gọi method sayHello -->
      <button @click="sayHello">Chào bạn!</button>

      <!-- v-on:submit lắng nghe để gọi method handleSubmit -->
      <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Gõ rồi Enter..." />
      </form>
    </div>

    <script>
      //...
      methods: {
        sayHello() {
          alert('Xin chào!');
        },
        handleSubmit() {
          console.log('Form đã được gửi đi!');
        }
      }
    </script>
    ```
- **v-model**
  - Khái niệm
    `v-model` là một chỉ thị đặc biệt, nó là sự kết hợp của `v-bind` và `v-on`, tạo ra một liên kết **hai chiều** giữa dữ liệu và một phần tử form (`<input>`, `<textarea>`, `<select>`).
  - Khi nào dùng
    Hầu hết các trường hợp bạn cần làm việc với form nhập liệu.
  - Example
    ```html
    <div id="app">
      <input type="text" v-model="message" />

      <h1>{{ message }}</h1>
    </div>

    <script>
      //...
      data() {
        return {
          message: 'Hãy gõ gì đó...'
        }
      }
    </script>
    ```
    Hoàn toàn tương đương với:
    `<input :value="message" @input="message = $event.target.value">`
    - **:value="message"**: Dùng `v-bind` để đẩy dữ liệu từ `message` ra ô input.
      - attribute của input là “value”
    - **@input="..."**: Dùng `v-on` để lắng nghe sự kiện gõ phím, lấy giá trị mới (`$event.target.value`) và cập nhật lại vào biến `message`.

### computed , method

- **computed**
  - Khái niệm
    **`Computed`** là một "biến thông minh" được tính toán dựa trên các dữ liệu khác.
    Nó có một đặc tính cực kỳ quan trọng là **`caching (lưu vào bộ nhớ đệm)`**.
    Điều này có nghĩa là nó sẽ chỉ tính toán lại khi một trong các "nguyên liệu" (dữ liệu phụ thuộc) của nó thay đổi. Nếu không, nó sẽ trả về kết quả đã được lưu trữ ngay lập tức.
    Trong template, bạn truy cập nó như một thuộc tính dữ liệu bình thường (không có dấu ngoặc `()`).
  - Khi nào dùng
    Bạn nên dùng `computed` khi cần **hiển thị một giá trị** được suy ra hoặc biến đổi từ các dữ liệu có sẵn.
    - **Kết hợp dữ liệu:** Tạo ra `fullName` từ `firstName` và `lastName`.
    - **Lọc hoặc biến đổi danh sách:** Hiển thị danh sách các sản phẩm đang giảm giá (`saleProducts`) từ một danh sách đầy đủ.
    - **Định dạng dữ liệu:** Biến một con số `price` thành một chuỗi tiền tệ có định dạng (`formattedPrice`).
    - **Logic điều kiện:** Trả về `true`/`false` dựa trên một điều kiện nào đó, ví dụ `isFormValid`.
    > Quy tắc vàng: Nếu bạn thấy mình đang viết logic phức tạp bên trong dấu ngoặc nhọn {{ ... }} của template, hãy chuyển nó vào computed.
  - Cần lưu ý khi dùng
    - **Hiệu năng cao:** Nhờ cơ chế caching, `computed` rất hiệu quả cho các phép tính phức tạp hoặc lặp qua các mảng lớn.
    - **Phải chạy đồng bộ:** Một `computed` property phải trả về một giá trị ngay lập tức. Nó **không thể** chứa các hành động bất đồng bộ như gọi API (vì nó không thể "chờ" kết quả).
    - **Không gây tác dụng phụ (No Side Effects):** Mục đích của `computed` là trả về một giá trị. Không nên thay đổi các biến `data` khác hoặc thực hiện các hành động khác từ bên trong một `computed`.
    - **Chỉ đọc (Read-only):** Mặc định, bạn không thể gán giá trị mới cho một `computed` property.
  - Example
    ```html
    <div id="app">
      <h2>Công việc chưa xong ({{ incompleteTasksCount }}):</h2>
      <ul>
        <li v-for="task in incompleteTasks" :key="task.id">{{ task.text }}</li>
      </ul>
    </div>

    <script>
      Vue.createApp({
        data() {
          return {
            tasks: [
              { id: 1, text: 'Học về Vue', done: true },
              { id: 2, text: 'Làm bài tập', done: false },
              { id: 3, text: 'Đi chợ', done: false },
              { id: 4, text: 'Đọc sách', done: true }
            ]
          }
        },
        computed: {
          // 1. Computed để lọc ra danh sách các task chưa xong
          incompleteTasks() {
            console.log('Lọc lại danh sách...')
            return this.tasks.filter(task => !task.done)
          },
          // 2. Computed có thể phụ thuộc vào một computed khác!
          incompleteTasksCount() {
            return this.incompleteTasks.length
          }
        }
      }).mount('#app')
    </script>
    ```
    - **Hiệu năng:** Việc lọc một danh sách lớn có thể tốn tài nguyên. Nhờ caching, Vue sẽ chỉ chạy lại hàm `filter` khi mảng `tasks` thực sự thay đổi.
    - **Dễ đọc:** Thay vì viết logic lọc trực tiếp trong template, bạn có một thuộc tính `incompleteTasks` với cái tên rất rõ ràng.
- **method**
  - Khái niệm
    **`Method`** là một hàm JavaScript thông thường được định nghĩa trong component.
    Nó sẽ **`luôn luôn chạy lại`** mỗi khi được gọi trong template, bất kể dữ liệu có thay đổi hay không.
    Trong template, bạn phải gọi nó kèm theo dấu ngoặc `()`
  - Khi nào dùng
    Bạn nên dùng `methods` khi cần **`thực hiện một hành động`** để đáp lại tương tác của người dùng hoặc một sự kiện nào đó.
    - **Xử lý sự kiện:** Phản hồi lại các sự kiện như `@click`, `@submit`, `@mouseover`. Ví dụ: `login()`, `deleteItem()`.
    - **Khi cần truyền tham số:** `Computed` không thể nhận tham số từ template, nhưng `method` thì có thể. Ví dụ: `addToCart(productId)`.
    - **Khi cần thực hiện các hành động có tác dụng phụ:** Gọi API, thay đổi nhiều biến `data`, điều hướng trang, v.v.
  - Cần lưu ý khi dùng
    - **Không có caching:** Hãy cẩn thận khi đặt các tính toán nặng vào một `method` được gọi từ template. Nó sẽ chạy lại trên mỗi lần re-render, có thể gây ảnh hưởng đến hiệu năng.
    - **Phải gọi với `()`:** Luôn nhớ thêm dấu ngoặc đơn khi gọi một `method` trong template để thực thi nó.
    - **Tính linh hoạt:** `Methods` có thể làm mọi thứ mà một hàm JavaScript bình thường có thể làm.
  - Example
    ```html
    <div id="app">
      <button @click="fetchUser" :disabled="loading">
        {{ loading ? 'Đang tải...' : 'Tải người dùng mới' }}
      </button>

      <div v-if="user" class="user-card">
        <img :src="user.picture.large" alt="User avatar" />
        <h3>{{ user.name.first }} {{ user.name.last }}</h3>
        <p>{{ user.email }}</p>
      </div>
    </div>

    <script>
      Vue.createApp({
        data() {
          return {
            user: null,
            loading: false
          }
        },
        methods: {
          // Dùng async/await để xử lý bất đồng bộ
          async fetchUser() {
            this.loading = true // Bắt đầu tải
            console.log('Đang gọi API...')
            try {
              const response = await fetch('https://randomuser.me/api/')
              const data = await response.json()
              this.user = data.results[0]
            } catch (error) {
              console.error('Lỗi khi tải dữ liệu:', error)
            } finally {
              this.loading = false // Tải xong (dù thành công hay thất bại)
            }
          }
        }
      }).mount('#app')
    </script>
    <style>
      .user-card {
        margin-top: 20px;
        text-align: center;
        border: 1px solid #ccc;
        padding: 10px;
      }
      .user-card img {
        border-radius: 50%;
      }
    </style>
    ```
    - Vì việc lấy dữ liệu là một **hành động có tác dụng phụ** và **bất đồng bộ** (cần thời gian để hoàn thành), điều mà `computed` không được thiết kế để xử lý.
- **so sánh**
  - Example
    ```html
    <template>
      <p>
        ☕ Họ tên từ Method:
        <strong>{{ getFullNameFromMethod() }}</strong>
      </p>
      <p>
        🛒 Họ tên từ Computed:
        <strong>{{ fullNameFromComputed }}</strong>
      </p>
      <button v-on:click="counter++">Tăng Counter</button>
    </template>
    <script>
      Vue.createApp({
        data() {
          return {
            firstName: 'An',
            lastName: 'Nguyễn Văn',
            counter: 0
          }
        },
        methods: {
          getFullNameFromMethod() {
            console.log('☕ Method được gọi!')
            return this.lastName + ' ' + this.firstName
          }
        },
        computed: {
          fullNameFromComputed() {
            console.log('🛒 Computed được tính toán lại!')
            return this.lastName + ' ' + this.firstName
          }
        }
      }).mount('#app')
    </script>
    ```
    1. **Khi bạn gõ vào ô input:** `firstName` hoặc `lastName` thay đổi.
       - `computed` được tính toán lại vì "nguyên liệu" của nó đã thay đổi. `console.log` của `computed` xuất hiện.
       - Sự thay đổi dữ liệu này cũng gây ra re-render, và vì template gọi `getFullNameFromMethod()`, `method` cũng được thực thi lại. `console.log` của `method` xuất hiện.
    2. **Khi bạn bấm nút "Tăng Counter":** Đây là lúc điều kỳ diệu xảy ra.
       - Biến `counter` thay đổi, khiến Vue phải re-render lại giao diện.
       - Trong quá trình re-render, Vue thấy `{{ getFullNameFromMethod() }}` và **chạy lại `method` này**. `console.log` của `method` xuất hiện.
       - Vue cũng thấy `{{ fullNameFromComputed }}`. Nó kiểm tra "nguyên liệu" của `computed` là `firstName` và `lastName` và nhận thấy chúng **không hề thay đổi**. Vì vậy, nó **không tính toán lại** mà dùng ngay kết quả đã cache. `console.log` của `computed` **không xuất hiện**.
  - Mục đích sử dụng
    | **Tiêu chí**            | **Computed (Thuộc tính tính toán)**                                                                     | **Methods (Phương thức)**                                                                   |
    | ----------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
    | Mục đích chính          | Tính toán & mô tả một dữ liệu mới để hiển thị.                                                          | Thực hiện một hành động để đáp lại sự kiện.                                                 |
    | Câu hỏi trả lời         | "Giá trị này là gì?"                                                                                    | "Cần phải làm gì?"                                                                          |
    | Khi nào dùng            | Khi cần một giá trị được suy ra từ dữ liệu khác và muốn tối ưu hiệu năng (ví dụ: fullName, totalPrice). | Khi cần xử lý sự kiện từ người dùng (ví dụ: @click, @submit) hoặc khi hàm cần nhận tham số. |
    | Cách gọi trong template | Như một biến (không có ()).                                                                             | Phải gọi như một hàm (có ()).                                                               |
    | Caching                 | Có, chỉ tính lại khi cần thiết.                                                                         | Không, luôn chạy lại mỗi lần gọi.                                                           |

### tối ưu hóa re-render

Vue tối ưu hóa việc render bằng cách **hạn chế tối đa việc tương tác trực tiếp với DOM thật**. Nó thực hiện điều này chủ yếu thông qua hai cơ chế: **Virtual DOM** và **hệ thống phản ứng (reactivity)**.

Thay vì vẽ lại toàn bộ trang mỗi khi có thay đổi nhỏ, Vue tính toán cách cập nhật hiệu quả nhất và chỉ thay đổi những phần tử thực sự cần thiết.

---

### **1. Virtual DOM (V-DOM) — Bản thiết kế của kiến trúc sư 📐**

**DOM thật** giống như một tòa nhà đã xây dựng. Việc thay đổi bất cứ thứ gì trong tòa nhà (như đập một bức tường) đều rất tốn kém và chậm.

**Virtual DOM** (V-DOM) là một **bản thiết kế chi tiết** của tòa nhà đó, được lưu trong bộ nhớ JavaScript.

**Quy trình hoạt động:**

1. **Tạo bản thiết kế:** Khi một component cần render, Vue không xây dựng tòa nhà thật ngay. Thay vào đó, nó tạo một "bản thiết kế" (V-DOM) trong JavaScript.
2. **So sánh trên giấy:** Khi dữ liệu thay đổi (ví dụ `price` từ 100 lên 150), Vue tạo một **bản thiết kế mới** và so sánh với bản cũ. Việc so sánh hai đối tượng JavaScript trong bộ nhớ nhanh hơn hàng nghìn lần so với việc kiểm tra DOM thật.
3. **Xác định thay đổi:** Quá trình so sánh này (gọi là "diffing" hoặc "reconciliation") tìm ra danh sách thay đổi tối thiểu cần thiết. Ví dụ: "Chỉ cần thay đổi nội dung văn bản ở tầng 2, phòng số 3".
4. **Thi công:** Cuối cùng, Vue lấy danh sách thay đổi tối thiểu đó và áp dụng vào DOM thật.

Điều này đảm bảo các thao tác "đắt đỏ" trên DOM thật chỉ xảy ra khi thực sự cần thiết và với số lượng ít nhất.

---

### **2. Cập nhật theo lô (Batched Updates) — Chuyến xe giao hàng 📦**

Giả sử bạn thay đổi 3 biến `data` khác nhau gần như cùng lúc:

JavaScript

`this.name = 'An';
this.age = 25;
this.status = 'Active';`

Nếu không có cơ chế tối ưu, Vue sẽ render lại giao diện 3 lần riêng biệt — rất lãng phí.

Thay vào đó, Vue hoạt động như một người giao hàng thông minh. Nó **gom tất cả các thay đổi** xảy ra trong cùng một "tick" (chu kỳ sự kiện) vào một "lô hàng", sau đó chỉ thực hiện **một chuyến giao hàng duy nhất** (một lần re-render) để cập nhật tất cả.

Điều này ngăn chặn các lần re-render không cần thiết và đảm bảo mỗi thay đổi chỉ được áp dụng một lần trong mỗi chu kỳ cập nhật.

---

### **3. Cách bạn có thể tối ưu hóa thêm**

Hiểu được cơ chế của Vue, bạn có thể viết code hiệu quả hơn:

- **Dùng `v-show` cho các phần tử bật/tắt thường xuyên:** `v-show` chỉ thay đổi CSS `display`, nhanh hơn nhiều so với `v-if` (phải thêm/xóa phần tử khỏi V-DOM).
- **Sử dụng `:key` đúng cách với `v-for`:** Cung cấp `:key` ổn định và duy nhất giúp thuật toán diffing của Vue nhận dạng và sắp xếp lại các phần tử hiệu quả thay vì tạo lại chúng.
- **Sử dụng `&lt;KeepAlive&gt;`:** Đối với các component động, `&lt;KeepAlive&gt;` lưu component vào bộ nhớ đệm thay vì hủy nó, giúp việc chuyển đổi qua lại nhanh hơn nhiều.
- **Chia nhỏ component:** Component nhỏ hơn có nghĩa là các lần re-render chỉ ảnh hưởng đến một phần nhỏ của cây V-DOM, giúp tối ưu hóa phạm vi cập nhật.

### v-for

- **v-for**
  - Khái niệm
    - **`v-for` (Máy Photocopy Thông Minh 📠):** Đây là chỉ thị trong Vue dùng để **vẽ một danh sách** các phần tử dựa trên một mảng (array) hoặc đối tượng (object). Nó hoạt động như một vòng lặp, lấy từng mục trong dữ liệu của bạn và tạo ra một bản sao của khối HTML tương ứng cho mỗi mục đó.
    - **`:key` (Thẻ Căn Cước Công Dân 🆔):** Đây là một thuộc tính **bắt buộc** phải đi kèm với `v-for`. Nó cung cấp một **"danh tính" duy nhất** cho mỗi phần tử trong danh sách. Khi danh sách của bạn thay đổi (thêm, xóa, sắp xếp lại), Vue sẽ dựa vào `:key` để biết chính xác phần tử nào đã thay đổi, giúp nó cập nhật giao diện một cách hiệu quả nhất thay vì phải vẽ lại toàn bộ danh sách.
  - Khi nào dùng
    - **`v-for`**: Bất cứ khi nào bạn muốn hiển thị một danh sách các mục có cấu trúc lặp lại. Ví dụ: danh sách sản phẩm, danh sách bài viết, danh sách bình luận, các hàng trong bảng...
    - **`:key`**: **Luôn luôn** phải sử dụng khi bạn dùng `v-for`. Đây là yêu cầu bắt buộc để đảm bảo hiệu năng và tránh các lỗi hiển thị không mong muốn.
  - Cần lưu ý khi dùng
    - **`:key` phải là duy nhất**: Giá trị của `:key` trong cùng một danh sách phải là duy nhất. Thông thường, bạn nên dùng **ID** của dữ liệu (ví dụ: `product.id`, `user.id`), vì ID là duy nhất và ổn định.
    - **Không dùng `index` làm `:key`**: Tránh dùng vị trí của phần tử trong mảng (`index`) làm `:key`, đặc biệt là khi danh sách có thể thay đổi thứ tự hoặc bị xóa bớt phần tử ở giữa. Dùng `index` có thể gây ra lỗi hiển thị và làm giảm hiệu năng, vì Vue có thể tái sử dụng sai phần tử DOM cho dữ liệu mới.
    - **`:key` là viết tắt**: `:key` là cách viết tắt của `v-bind:key`.
    - **`v-for` có thể lặp qua đối tượng**: Bạn cũng có thể dùng `v-for` để lặp qua các thuộc tính của một đối tượng:
  - Example
    ```html
    <div id="app">
      <h2>Công việc chưa xong ({{ incompleteTasksCount }}):</h2>
      <ul>
        <li v-for="task in incompleteTasks" :key="task.id">{{ task.text }}</li>
      </ul>
    </div>

    <script>
      Vue.createApp({
        data() {
          return {
            tasks: [
              { id: 1, text: 'Học về Vue', done: true },
              { id: 2, text: 'Làm bài tập', done: false },
              { id: 3, text: 'Đi chợ', done: false },
              { id: 4, text: 'Đọc sách', done: true }
            ]
          }
        },
        computed: {
          // 1. Computed để lọc ra danh sách các task chưa xong
          incompleteTasks() {
            console.log('Lọc lại danh sách...')
            return this.tasks.filter(task => !task.done)
          },
          // 2. Computed có thể phụ thuộc vào một computed khác!
          incompleteTasksCount() {
            return this.incompleteTasks.length
          }
        }
      }).mount('#app')
    </script>
    ```
    - **Hiệu năng:** Việc lọc một danh sách lớn có thể tốn tài nguyên. Nhờ caching, Vue sẽ chỉ chạy lại hàm `filter` khi mảng `tasks` thực sự thay đổi.
    - **Dễ đọc:** Thay vì viết logic lọc trực tiếp trong template, bạn có một thuộc tính `incompleteTasks` với cái tên rất rõ ràng.

### watcher

- **watcher**
  - Khái niệm
    - **`watch`** là một công cụ cho phép bạn **thực hiện một hành động** bất cứ khi nào một **dữ liệu cụ thể** thay đổi.
    - Hãy coi nó như một "lính canh" 🕵️ được giao nhiệm vụ theo dõi riêng một biến dữ liệu của bạn. Người lính canh này không quan tâm đến các biến khác. Anh ta chỉ phản ứng khi và chỉ khi mục tiêu được giao của mình thay đổi, và khi đó, anh ta sẽ thực thi một chuỗi mệnh lệnh đã được lập trình sẵn.
  - Khi nào dùng
    Bạn nên dùng `watch` khi bạn muốn thực hiện các **hành động có "tác dụng phụ" (side effects)** để đáp lại sự thay đổi của dữ liệu. "Tác dụng phụ" là những hành động không chỉ đơn giản là tính toán ra một giá trị mới.
        Đây là các trường hợp kinh điển:

        - **Gọi API (Hành động bất đồng bộ) 🌐:** Đây là trường hợp phổ biến nhất. Khi người dùng gõ vào ô tìm kiếm (`searchQuery`), bạn muốn gọi đến server để lấy kết quả tìm kiếm tương ứng. `watch` có thể xử lý các tác vụ bất đồng bộ (chờ đợi), điều mà `computed` không thể làm.
        - **Lưu dữ liệu 💾:** Khi người dùng thay đổi một cài đặt, bạn muốn tự động lưu cài đặt đó vào `localStorage` của trình duyệt mà không cần họ phải bấm nút "Lưu".
        - **Thực hiện logic phức tạp 🧠:** Khi một biến thay đổi, bạn cần phải thay đổi một loạt các biến `data` khác hoặc gọi nhiều `method`.
  - Cần lưu ý khi dùng
    - **Không phải là `computed`:** Tuyệt đối không dùng `watch` để tính toán ra một giá trị mới để hiển thị. Việc dùng `watch` để làm công việc của `computed` cũng giống như bạn **"dùng dao mổ trâu để cắt giấy"** 🔪 — nó làm được, nhưng cồng kềnh, kém hiệu quả (vì không có caching), và không đúng mục đích.
    - **Xử lý bất đồng bộ (Race Conditions) ⚠️:** Khi một giá trị thay đổi liên tục (như trong ô tìm kiếm), nhiều hành động bất đồng bộ có thể được kích hoạt gần như cùng lúc. Bạn cần có logic để đảm bảo rằng chỉ có kết quả của hành động cuối cùng được xử lý. (Ví dụ bên dưới có xử lý việc này).
    - **Tên hàm phải khớp:** Tên của hàm `watch` trong đối tượng `watch` phải **trùng khớp chính xác** với tên của biến `data` bạn muốn theo dõi.
    - **Theo dõi sâu (Deep Watch):** Mặc định, `watch` không phát hiện các thay đổi bên trong một đối tượng hoặc mảng. Để làm vậy, bạn cần cấu hình thêm `{ deep: true }`.
  - Example
    ```html
    <div id="app">
      <h1>Tìm kiếm sản phẩm</h1>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Gõ tên sản phẩm..."
      />
      <p>
        <strong>Trạng thái:</strong>
        {{ searchResult }}
      </p>
    </div>

    <script>
      Vue.createApp({
        data() {
          return {
            searchQuery: '',
            searchResult: 'Hãy gõ gì đó để bắt đầu tìm kiếm.'
          }
        },
        watch: {
          // Tên hàm 'searchQuery' khớp với biến data 'searchQuery'.
          // Vue tự động truyền vào giá trị mới (newValue) và giá trị cũ (oldValue).
          searchQuery(newValue, oldValue) {
            // Nếu người dùng xóa hết chữ, reset trạng thái.
            if (newValue.trim() === '') {
              this.searchResult = 'Hãy gõ gì đó để bắt đầu tìm kiếm.'
              return
            }

            // 1. Thực hiện hành động tức thì: Cập nhật giao diện để báo cho người dùng biết.
            this.searchResult = `Đang tìm kiếm cho "${newValue}"...`

            // 2. Thực hiện hành động bất đồng bộ (giả lập việc gọi API).
            setTimeout(() => {
              // 3. Xử lý "Race Condition": Chỉ cập nhật kết quả nếu giá trị tìm kiếm hiện tại
              //    vẫn giống với giá trị đã kích hoạt timer này. Điều này ngăn việc
              //    kết quả cũ ghi đè lên kết quả mới nếu người dùng gõ nhanh.
              if (this.searchQuery === newValue) {
                this.searchResult = `Đã tìm thấy 5 sản phẩm cho "${newValue}"`
              }
            }, 1000)
          }
        }
      }).mount('#app')
    </script>
    ```
    **Luồng hoạt động của ví dụ:**
    1. Người dùng gõ một ký tự vào ô input.
    2. `v-model` cập nhật biến `searchQuery`.
    3. `watch` phát hiện `searchQuery` thay đổi và kích hoạt hàm tương ứng.
    4. Hàm này ngay lập tức thay đổi `searchResult` thành "Đang tìm kiếm...".
    5. Nó đặt một `setTimeout` để giả lập việc gọi API.
    6. Sau 1 giây, hàm bên trong `setTimeout` được thực thi. Nó kiểm tra lại xem `searchQuery` có còn giống với `newValue` lúc nó được gọi hay không. Nếu có, nó mới cập nhật `searchResult` với kết quả cuối cùng.

### v-if, v-else-if, v-show

`v-if` thực sự thêm hoặc xóa các phần tử khỏi DOM, trong khi `v-show` chỉ ẩn hoặc hiện chúng bằng CSS.

- Khái niệm
  - **`v-if:` Bản chất** của `v-if` là nó sẽ **thực sự thêm hoặc xóa** phần tử ra khỏi cây DOM. Nếu điều kiện là `false`, phần tử đó sẽ không tồn tại trong HTML. Nó giống như một người gác cổng, chỉ cho phép phần tử vào DOM khi điều kiện được đáp ứng.
  - **`v-show:` Bản chất** của `v-show` là nó **luôn giữ phần tử trong cây DOM**. Nó chỉ đơn giản là thay đổi thuộc tính `display: none` của CSS để ẩn hoặc hiện phần tử đó. Nó giống như một nhà ảo thuật dùng tấm màn che để ẩn hiện một vật thể, vật thể đó vẫn luôn ở trên sân khấu.
- Khi nào dùng
  | **Tình huống**                                                                                    | **Nên dùng** | **Lý do**                                                                                    |
  | ------------------------------------------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------- |
  | Nội dung ít khi thay đổi trạng thái (ví dụ: chỉ kiểm tra quyền người dùng một lần lúc tải trang). | v-if         | Tiết kiệm chi phí render ban đầu vì phần tử không được tạo ra nếu không cần thiết.           |
  | Nội dung cần chuyển đổi hiển thị thường xuyên (ví dụ: một tab menu, một thông báo lỗi).           | v-show       | Hiệu năng cao hơn khi bật/tắt liên tục vì chỉ thay đổi CSS, không phải thêm/xóa phần tử DOM. |
  | Cần có logic else hoặc else-if.                                                                   | v-if         | v-show không hỗ trợ cú pháp else.                                                            |
  |                                                                                                   |              |                                                                                              |
- Cần lưu ý khi dùng
  - **Chi phí:** `v-if` có **chi phí chuyển đổi cao hơn** (vì phải tạo/hủy component), trong khi `v-show` có **chi phí render ban đầu cao hơn** (vì phần tử luôn được tạo ra).
  - **Thứ tự:** `v-else` và `v-else-if` phải được đặt **ngay sau** một `v-if` hoặc `v-else-if` tương ứng.
  - **Không dùng chung:** Bạn **không thể** đặt `v-if` và `v-for` trên cùng một phần tử vì `v-for` có độ ưu tiên cao hơn. Nếu cần, hãy bọc `v-for` trong một thẻ `<template>` có `v-if`.

### component

- Khái niệm
  Component là một khối xây dựng độc lập và có thể tái sử dụng
- Tổ chức (Global - Local)
  - Local
    - Đây là cách phổ biến và **được khuyên dùng nhất**.
    - Component chỉ có thể được sử dụng bên trong component đã import và đăng ký nó.
    ```html
    <script>
      // 1. Import component cần dùng
      import UserAvatar from './UserAvatar.vue'

      export default {
        // 2. Đăng ký component vào đây
        components: {
          UserAvatar
        }
      }
    </script>
    ```
    - **👍 Ưu điểm:** Tăng tính đóng gói (độc lập), rõ ràng về sự phụ thuộc, và hiệu năng tốt hơn (hỗ trợ tree-shaking).
    - **👎 Nhược điểm:** Phải `import` và đăng ký ở mọi nơi bạn cần sử dụng.
  - Global
    - Một component được đăng ký global sẽ có sẵn ở **mọi nơi** trong ứng dụng mà không cần import
    - Bạn thường đăng ký chúng trong file `main.js`.
    ```jsx
    // main.js
    import BaseButton from './components/BaseButton.vue'
    const app = createApp(App)
    app.component('BaseButton', BaseButton)
    ```
- Giao tiếp giữa các component
  - Từ cha xuống con `Props` 🔽
    **Props** là cơ chế để component cha truyền dữ liệu xuống cho component con. Đây là luồng dữ liệu **một chiều**.
    - **Props Tĩnh (Static):** Truyền một chuỗi văn bản cố định.
      ```jsx
      <UserProfile name="Nguyễn Văn An" />
      ```
    - **Động (Dynamic):** Truyền một biến bằng `v-bind` (hoặc `:`). Giá trị sẽ tự động cập nhật khi dữ liệu ở cha thay đổi.
      ```jsx
      <UserProfile :name="currentUser" />
      ```
    **Những lưu ý**
    - **Luồng Dữ Liệu Một Chiều:** Component con **không được phép** thay đổi trực tiếp props.
    - **Khai Báo Rõ Ràng (Validation):** Luôn khai báo `props` dưới dạng đối tượng để xác định `type`, `required`, `default`.
    - **Quy Ước Đặt Tên:**
      - Trong **JavaScript** (khai báo ở con), dùng **`camelCase`** (ví dụ: `userAge`).
      - Trong **HTML** (truyền từ cha), dùng **`kebab-case`** (ví dụ: `user-age`).
    - **Độ Ưu Tiên:** Nếu một thuộc tính có cùng tên trong `props` và `data`, **`props` sẽ luôn được ưu tiên**.
  - Từ cha lên con `Events ($emit)` 🔼
    **Emit** là cơ chế để component con "bắn một tín hiệu" (sự kiện) lên cho component cha. Component cha sẽ lắng nghe (`@tên-sự-kiện`) và thực hiện một hành động.
    ```html
    <button @click="$emit('close-modal', true)">Đóng</button>

    <MyModal @close-modal="handleModalClose" />
    ```
  - Vấn đề khi cấu trúc lồng nhau sâu
    Khi các component lồng vào nhau quá nhiều cấp, việc giao tiếp đơn giản (Props/Emit) trở nên phức tạp.
    - **a. Prop Drilling (Khoan Props) 🔽**
      Dữ liệu từ component "ông bà" phải truyền qua các component "cha mẹ" trung gian chỉ để đến được component "cháu".
      - **Luồng dữ liệu:** `A -> B -> C -> D`
      - **Vấn đề:** Các component B và C trở nên phức tạp một cách không cần thiết.
    - **b. Event Bubbling Problem (Sự kiện nổi bọt) 🔼**
      Một sự kiện từ component "cháu" phải `emit` qua nhiều cấp "cha mẹ" trung gian để đến được component "ông bà".
      - **Luồng sự kiện:** `D -> C -> B -> A`
      - **Vấn đề:** Các component trung gian chỉ làm nhiệm vụ "chuyển tiếp" sự kiện, làm code dài dòng và khó bảo trì.
  - Giải pháp cho giao tiếp phức tạp
    - **1. Provide / Inject (Giải pháp tích hợp của Vue)**
      - **Tưởng tượng:** Giống như một **mạng Wi-Fi** 📶. Component tổ tiên "phát" (`provide`) dữ liệu, và bất kỳ component hậu duệ nào cũng có thể "bắt sóng" (`inject`) trực tiếp.
      - **Tốt nhất cho:** Giải quyết triệt để **Prop Drilling**. Thích hợp cho dữ liệu ít thay đổi như thông tin người dùng, theme, cấu hình.
      - **Nhược điểm:** Không xử lý tốt Event Bubbling, khó theo dõi nguồn dữ liệu khi ứng dụng lớn.
    - **2. Pinia (Quản lý trạng thái toàn cục)**
      - **Tưởng tượng:** Giống như một **kho tổng** 📦 của ứng dụng. Mọi component đều có thể lấy dữ liệu (state) hoặc gọi hành động (actions) để thay đổi dữ liệu một cách tập trung.
      - **Tốt nhất cho:** Giải quyết **cả hai vấn đề (Prop Drilling và Event Bubbling)**. Đây là giải pháp chuẩn mặc định cho các ứng dụng vừa và lớn.
      - **Ưu điểm:** Mạnh mẽ, có cấu trúc rõ ràng, dễ debug với Vue Devtools.
  - Dynamic Binding
    ```
    <template>
      <!-- ✅ Đúng: Static binding -->
      <the-header title="Learning Resources"></the-header>

      <!-- ✅ Đúng: Dynamic binding với string -->
      <the-header :title="'Learning Resources'"></the-header>

      <!-- ✅ Đúng: Dynamic binding với biến -->
      <the-header :title="pageTitle"></the-header>

      <!-- ❌ Sai: Dynamic binding không hợp lệ -->
      <the-header :title="Learning Resources"></the-header>
    </template>

    <script>
    export default {
      data() {
        return {
          pageTitle: "Learning Resources"
        }
      }
    }
    </script>
    ```
    **V-bind không chỉ để truyền cha → con**
    V-bind (`v-bind:` hay `:`) có **2 mục đích chính**:
    1. Truyền dữ liệu từ cha sang con (như bạn biết)
    ```css
    <!-- Component cha -->
    <child-component :user-data="userData"></child-component>
    ```
    **2. Bind giá trị động trong template của chính component đó**
    ```css
    <!-- Trong component -->
    <template>
      <div :class="dynamicClass" :style="dynamicStyle">
        <img :src="imagePath" :alt="imageAlt">
        <button :disabled="isLoading">{{ buttonText }}</button>
      </div>
    </template>

    <script>
    export default {
      data() {
        return {
          dynamicClass: 'active',
          imagePath: '/images/logo.png',
          isLoading: false
        }
      }
    }
    </script>
    ```
    **Kết luận**: V-bind được dùng để **bind bất kỳ giá trị JavaScript nào** (biến, props, computed, etc.) vào thuộc tính HTML, không chỉ riêng việc truyền cha → con!
  - Vấn đề hay gặp với provide/inject
    provide sẽ phát reference của array chứ không phải giá trị của array
    ```jsx
    // Parent
    this.storedResources.unshift(D);  // Modify Array#1 → [D, A, B, C]

    // Child
    // Vẫn point tới Array#1 → thấy [D, A, B, C] ✅

    ----------------------------------------------

    // Parent
    this.storedResources = this.storedResources.filter(...);
    // Tạo Array#2 → [A, C]
    // this.storedResources giờ point tới Array#2

    // Child
    // Vẫn point tới Array#1 → thấy [A, B, C] (cũ) ❌
    ```
- Slot
  - Khái niệm
    - Slots là một cơ chế trong Vue cho phép bạn "nhét" nội dung HTML từ component cha vào các vị trí đã định sẵn bên trong component con.
    - Hãy tưởng tượng component con là một **cái khung ảnh** 🖼️. Bản thân cái khung đã có viền, kính, và móc treo, nhưng phần quan trọng nhất ở giữa thì lại trống. Chỗ trống đó chính là **`<slot>`**. Component cha có thể đặt bất cứ thứ gì vào chỗ trống đó—một bức ảnh, một bức tranh, v.v.
  - Khi nào dùng
    - Dùng để tạo ra các **component layout có khả năng tái sử dụng** và linh hoạt cao
    - Mục đích chính là để component con **quyết định về bố cục (layout)**, trong khi component cha **quyết định về nội dung (content)**.
    - **Ví dụ 1: `BaseCard.vue` (Sử dụng Slot Mặc định)**
      - Component này cung cấp một "khung" (viền, bóng đổ) và cho phép component cha chèn bất kỳ nội dung nào vào giữa.
      - **`BaseCard.vue` (Component Con).** Nó định nghĩa phần "khung" và một `<slot>` không tên.
        ```html
        <template>
          <div class="card">
            <slot>
              <p>Đây là nội dung thẻ mặc định.</p>
            </slot>
          </div>
        </template>
        ```
      - **`App.vue` (Component Cha).** Component cha sử dụng `BaseCard` và chèn nội dung tùy chỉnh vào.
        ```html
        <template>
          <h1>Ví dụ về BaseCard</h1>

          <BaseCard>
            <h2>Đây là tiêu đề tùy chỉnh</h2>
            <p>Nội dung này được truyền từ component cha.</p>
            <img src="https://vuejs.org/images/logo.png" width="50" />
          </BaseCard>

          <BaseCard />
        </template>

        <script>
          import BaseCard from './BaseCard.vue'
          export default {
            components: { BaseCard }
          }
        </script>
        ```
  - Cần lưu ý khi dùng
    - **Nội dung dự phòng (Fallback Content):**
      Nội dung bạn đặt bên trong thẻ `<slot>` (ở component con) sẽ được hiển thị nếu component cha không cung cấp bất kỳ nội dung nào.
          ```html
          <button><slot>Click Me</slot></button>

          <MyButton /> <MyButton>Submit</MyButton> ```
          ```
    - **Slot có tên (Named Slots):**
      Bạn có thể tạo nhiều "khe" khác nhau bằng cách đặt tên cho chúng. Điều này cho phép cha gửi nội dung đến các vị trí cụ thể.
          ```html
          <header>
            <slot name="header"></slot>
          </header>

          <main>
          <!-- default slot -->
            <slot></slot>
          </main>

          <footer>
            <slot name="footer"></slot>
          </footer>
          ```

          ```html
          <PageLayout>
            <template #header><h1>Đây là tiêu đề</h1></template>
            <p>Đây là nội dung chính.</p>
            <template #footer><p>Đây là chân trang</p></template>
          </PageLayout>
          ```
    - **Scoped Slots (Slot có phạm vi):**
      Đây là một tính năng nâng cao. Nó không chỉ là "khe" để nhận, mà còn có thể **truyền dữ liệu từ con ngược lên cho cha** ngay tại vị trí đó. Cha sẽ nhận dữ liệu và quyết định cách hiển thị nó.
          **`UserList.vue` (Component Con - "Xưởng")**

          Component này lặp qua một danh sách và "gửi" dữ liệu của từng `user` ra ngoài qua slot.

          ```html
          <template>
            <ul class="user-list">
              <li v-for="user in users" :key="user.id">
                <slot :userData="user"></slot>
              </li>
            </ul>
          </template>

          <script>
          export default {
            data() {
              return {
                users: [
                  { id: 1, name: 'An Nguyễn', role: 'admin' },
                  { id: 2, name: 'Bình Trần', role: 'user' },
                  { id: 3, name: 'Cường Lê', role: 'user' }
                ]
              }
            }
          }
          </script>
          ```

          **`App.vue` (Component Cha - "Người Gói Hàng")**

          Component này sử dụng `UserList` và "nhận" dữ liệu để quyết định cách hiển thị.

          ```html
          <template>
            <h1>Danh sách người dùng</h1>

            <UserList>
              <template v-slot:default="slotProps">
                <div>
                  <strong>{{ slotProps.userData.name.toUpperCase() }}</strong>
                  <span v-if="slotProps.userData.role === 'admin'" style="color: red; margin-left: 10px;">
                    (Quản trị viên)
                  </span>
                </div>
              </template>
            </UserList>
          </template>

          <script>
          import UserList from './UserList.vue';
          export default {
            components: { UserList }
          }
          </script>
          ```

          ### **Kết quả:**

          Giao diện sẽ hiển thị:

          - **AN NGUYỄN** (Quản trị viên)
          - **BÌNH TRẦN**
          - **CƯỜNG LÊ**

          **Lợi ích:** Component `UserList` (Con) không cần biết gì về logic "in hoa" hay "hiển thị mác admin". Nó chỉ cung cấp dữ liệu. Component cha đã toàn quyền quyết định cách trình bày, làm cho `UserList` trở nên cực kỳ linh hoạt và có thể tái sử dụng ở nhiều nơi với nhiều cách hiển thị khác nhau.
- Dynamic Component
  - Khái niệm
    - Dynamic components là một tính năng của Vue cho phép bạn chuyển đổi linh hoạt giữa nhiều component khác nhau tại **cùng một vị trí**.
    - Thay vì dùng `v-if` / `v-else-if` dài dòng, bạn dùng một component đặc biệt của Vue là `<component>` và "ra lệnh" cho nó biết phải "biến hình" thành component nào.
  - Khi nào dùng
    - Bạn chỉ cần bind tên của component bạn muốn hiển thị vào thuộc tính `:is` của thẻ `<component>`
    - **Ví dụ: Giao diện dạng Tab**
      ```html
      <template>
        <button @click="activeTab = 'HomeTab'">Home</button>
        <button @click="activeTab = 'AboutTab'">About</button>

        <hr />

        <KeepAlive>
          <component :is="activeTab"></component>
        </KeepAlive>
      </template>

      <script>
        // (Giả sử 2 component HomeTab và AboutTab đã được đăng ký)

        export default {
          data() {
            return {
              // Biến này chứa TÊN của component cần hiển thị
              activeTab: 'HomeTab'
            }
          }
        }
      </script>
      ```
      **Luồng hoạt động:**
      1. Ban đầu, `activeTab` là `'HomeTab'`, component `HomeTab` được hiển thị.
      2. Khi bạn bấm nút "About", `activeTab` đổi thành `'AboutTab'`.
      3. Thẻ `<component :is="...">` ngay lập tức "biến hình" thành `AboutTab`.
      4. `<KeepAlive>` đảm bảo nếu bạn quay lại "Home", trạng thái của nó (nếu có) vẫn được giữ nguyên.
  - Cần lưu ý khi dùng
    - 1. Vue sẽ **hủy (destroy)** component cũ
      Mặc định, mỗi khi bạn chuyển đổi, Vue sẽ **hủy (destroy)** component cũ và **tạo mới (create)** component mới.
      - **Hậu quả:** Mọi trạng thái bên trong component (như chữ bạn đã gõ vào ô input, dữ liệu đã tải) sẽ **bị mất**.
      - **Giải pháp:** Để giữ lại trạng thái, bạn **phải** bọc component động bằng thẻ `<KeepAlive>`.
        ```html
        <KeepAlive>
          <component :is="activeTab"></component>
        </KeepAlive>
        ```
    - **2. Thay đổi về Vòng đời (Lifecycle Hooks)**
      Khi bạn đã dùng `<KeepAlive>`, component sẽ không bị "hủy" và "tạo mới" nữa.
      - **Hậu quả:** Các hooks `mounted` và `unmounted` sẽ **chỉ chạy một lần duy nhất** (lần đầu tiên component được tải).
      - **Giải pháp:** Nếu bạn cần chạy code mỗi khi component được hiển thị/ẩn (ví dụ: để fetch lại dữ liệu mới), hãy dùng hai hooks đặc biệt:
        - **`activated`**: Được gọi khi component được bật (hiển thị).
        - **`deactivated`**: Được gọi khi component bị ẩn (chuyển tab khác).
        ```jsx
        // Bên trong component con (ví dụ: PostsTab.vue)
        export default {
          activated() {
            console.log('Tab này được bật. Fetch dữ liệu mới...')
            this.fetchData()
          },
          deactivated() {
            console.log('Tab này bị ẩn.')
          }
        }
        ```
      ### **Cách truyền Props và Lắng nghe Events**
    - **3. Cách truyền Props và Lắng nghe Events**
      Bạn vẫn có thể truyền `props` và lắng nghe `events` bình thường, ngay trên thẻ `<component>`. Vue đủ thông minh để biết cách chuyển chúng đến component đang hoạt động.
      ```jsx
      <component
        :is="activeTab"
        :user-data="data"
        @save="onSave"
      ></component>
      ```
    - **4. Tối ưu hiệu năng (Tải bất đồng bộ)**
      Nếu các component trong tab của bạn rất lớn, việc tải tất cả chúng ngay từ đầu có thể làm chậm trang web. Bạn nên sử dụng `defineAsyncComponent` để Vue chỉ tải code của component **khi nó thực sự cần đến** (lần đầu tiên người dùng click vào tab đó).
      ```jsx
      import { defineAsyncComponent } from 'vue'

      export default {
        components: {
          HomeTab: defineAsyncComponent(() => import('./HomeTab.vue')),
          PostsTab: defineAsyncComponent(() => import('./PostsTab.vue')),
          AboutTab: defineAsyncComponent(() => import('./AboutTab.vue'))
        }
        // ...
      }
      ```
- Teleport Component
  - Khái niệm
    `<Teleport>` là một component tích hợp sẵn trong Vue cho phép bạn "dịch chuyển" một phần HTML của component này sang một vị trí khác trong DOM, thường là ra bên ngoài cấu trúc `div#app` của bạn.
    Hãy tưởng tượng nó như một **cánh cổng dịch chuyển** 🌀. Component của bạn (ví dụ: `UserProfile`) nằm ở một vị trí, nhưng bạn muốn cái Modal (cửa sổ pop-up) mà nó tạo ra phải được hiển thị ở ngay `<body>` (giữa màn hình) chứ không phải bị nhốt bên trong `UserProfile`. `<Teleport>` sẽ tạo một cổng vào bên trong component của bạn và một cổng ra ở `<body>`.
    Vấn đề chính mà nó giải quyết là **CSS Stacking Context (Ngữ cảnh xếp chồng)**. Nếu một component Modal nằm sâu bên trong nhiều lớp `div` có `position: relative` hoặc `overflow: hidden`, việc dùng `z-index` để làm cho Modal đó hiển thị _đè lên_ mọi thứ khác trên trang là cực kỳ khó khăn, thậm chí là không thể.
    `<Teleport>` giải quyết vấn đề này bằng cách "nhấc" HTML của Modal ra khỏi component cha và đặt nó làm con trực tiếp của `<body>`.
  - Khi nào dùng
    Bạn bọc phần HTML bạn muốn dịch chuyển bằng thẻ `<Teleport>` và chỉ định đích đến bằng prop `to`.
    **Quan trọng:** Mặc dù HTML được _dịch chuyển_ đi, nhưng **logic (data, methods)** vẫn nằm và hoạt động bên trong component gốc.
    Trong ví dụ này, `MyComponent` bị "nhốt" trong một `div` có `overflow: hidden`, nhưng Modal của nó vẫn có thể hiển thị toàn màn hình nhờ `<Teleport>`.
    ```html
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <title>Vue 3 Teleport</title>
        <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
        <style>
            .modal {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.5); display: flex;
                justify-content: center; align-items: center;
            }
            .modal-content { background: white; padding: 20px; border-radius: 5px; }

            /* Đây là CSS gây ra vấn đề */
            .wrapper {
                overflow: hidden; /* Cắt xén mọi thứ bên trong */
                position: relative;
                border: 2px solid red;
                padding: 10px;
                width: 300px;
                height: 100px;
            }
        </style>
    </head>
    <body>

    </body>
    -->

    <div id="app">
        <div class="wrapper">
            <h3>Component bị giới hạn</h3>
            <my-component></my-component>
        </div>
    </div>

    <script>
        const app = Vue.createApp({});

        // Component con chứa logic Teleport
        app.component('my-component', {
            data() {
                return {
                    showModal: false
                }
            },
            template: `
                <button @click="showModal = true">Mở Modal (từ bên trong)</button>

                <Teleport to="body">
                    <div v-if="showModal" class="modal">
                        <div class="modal-content">
                            <p>Tôi đã thoát ra ngoài!</p>
                            <button @click="showModal = false">Đóng</button>
                        </div>
                    </div>
                </Teleport>
            `
        });

        app.mount('#app');
    </script>

    </body>
    </html>
    ```
  - Cần lưu ý khi dùng
    - **`to` là một CSS Selector:** Prop `to` phải là một CSS selector hợp lệ (ví dụ: `to="body"`, `to="#modal-root"`, `to=".notifications"`). Phần tử đích đó phải tồn tại trong DOM _trước khi_ component được mount.
    - **Logic vẫn ở component gốc:** Toàn bộ `data`, `props`, `computed`, và `methods` vẫn thuộc về component gốc nơi bạn khai báo `<Teleport>`, giúp bạn dễ dàng điều khiển trạng thái (như `showModal`).
    - **Nhiều Teleport:** Bạn có thể có nhiều `<Teleport>` cùng trỏ đến một đích. Chúng sẽ được nối tiếp vào phần tử đích theo thứ tự chúng được render.
    - **Disabled:** Bạn có thể vô hiệu hóa `Teleport` một cách có điều kiện: `<Teleport to="body" :disabled="isMobile">`. Nếu `isMobile` là `true`, modal sẽ không được dịch chuyển mà render ngay tại vị trí cũ.
    - Khi bạn "teleport" một phần tử, nó sẽ **giữ lại** CSS `scoped` của **chính nó**, nhưng sẽ **thoát khỏi** CSS `scoped` của component **cha** nơi nó được khai báo.
      Hãy tưởng tượng thế này:
      - **Component Cha (`UserProfile`):** Là một căn phòng có tường màu xanh (CSS `scoped` của cha).
      - **Component Con (`Modal`):** Là bạn, đang mặc một bộ đồng phục màu đỏ (CSS `scoped` của con).
      - **`<Teleport to="body">`:** Bạn bước ra khỏi căn phòng xanh và đi ra sảnh chính (`<body>`).
      **Kết quả:**
      - Bạn vẫn mặc bộ đồng phục màu đỏ (CSS của con vẫn áp dụng).
      - Bạn không còn đứng trong căn phòng màu xanh nữa (CSS `scoped` của cha _không_ áp dụng).
      - Bạn đang đứng ở sảnh chính và sẽ bị ảnh hưởng bởi ánh đèn chung của sảnh (CSS **global** vẫn áp dụng).
    - **Chi tiết 3 quy tắc CSS**
    - **1. CSS `scoped` của Component Con (chứa `<Teleport>`) 🟢 VẪN ÁP DỤNG**
      Vue gắn các thuộc tính `data` (ví dụ `data-v-f3f3eg9`) vào các phần tử của component để áp dụng style `scoped`. Khi bạn teleport, các thuộc tính `data` này **vẫn đi theo** phần tử.
      ```html
      <template>
        <Teleport to="body">
          <div class="modal-content">...</div>
        </Teleport>
      </template>

      <style scoped>
        /* Style này VẪN hoạt động vì "modal-content" và "data-v-abc" 
         được dịch chuyển cùng nhau */
        .modal-content {
          background: white;
        }
      </style>
      ```
    - **2. CSS `scoped` của Component Cha (gọi `<Teleport>`) 🔴 KHÔNG ÁP DỤNG**
      Đây chính là **lý do lớn nhất** chúng ta dùng `Teleport`. Phần tử được dịch chuyển không còn là con của component cha trong cây DOM nữa, vì vậy nó thoát khỏi mọi giới hạn CSS của cha.
      ```html
      <template>
        <div class="wrapper">
          <Modal />
        </div>
      </template>

      <style scoped>
        /* Style này SẼ KHÔNG ảnh hưởng đến modal 
         vì modal đã bị dịch chuyển ra ngoài .wrapper */
        .wrapper :deep(.modal-content) {
          border: 2px solid red;
        }
      </style>
      ```
    - **3. CSS Toàn cục (Global) 🟢 VẪN ÁP DỤNG**
      Phần tử được dịch chuyển (thường là ra `<body>`) sẽ kế thừa bất kỳ CSS global nào được áp dụng cho vị trí mới đó, ví dụ như `font-family`, `font-size`, `color`... được định nghĩa cho `body` hoặc `*` trong file CSS chính của bạn.
      ```css
      /* style.css (Global) */
      body {
        font-family: Arial, sans-serif; /* Modal sẽ kế thừa font này */
      }
      ```

### form

- **`v-model`: Phép thuật hai chiều 🔁**
  Đây là công cụ cốt lõi. `v-model` tạo ra một liên kết **hai chiều** giữa một biến trong `data` và một phần tử form (như `<input>`).
  - **Chiều 1 (JS → HTML):** Khi dữ liệu `data` thay đổi, ô input sẽ tự động hiển thị giá trị mới.
  - **Chiều 2 (HTML → JS):** Khi bạn gõ chữ vào ô input, dữ liệu `data` sẽ tự động được cập nhật.
  ```jsx
  <div id="app">
    <input v-model="message" placeholder="Gõ gì đó...">
    <p>Tin nhắn của bạn là: {{ message }}</p>

    <textarea v-model="longMessage" placeholder="Gõ tin nhắn dài"></textarea>
  </div>
  ```
  ```jsx
  <script>
    Vue.createApp({
      data() {
        return {
          message: '',
          longMessage: ''
        }
      }
    }).mount('#app');
  </script>
  ```
- Xử lý các loại Input khác nhau
  `v-model` hoạt động khác nhau một chút tùy thuộc vào loại input:
  - **a. Checkbox (Hộp kiểm)**
    - **Một Checkbox (Boolean):**
      Liên kết với một biến `boolean` (`true` / `false`).
          ```jsx
          <input type="checkbox" id="agree" v-model="isAgreed">
          <label for="agree">Tôi đồng ý với điều khoản</label>

          data() { return { isAgreed: false } }
          ```
    - **Nhiều Checkbox (Array):**
      Liên kết nhiều checkbox với **một mảng (array)**. Giá trị (`value`) của các ô được tích sẽ được thêm vào mảng.
          ```jsx
          <p>Trái cây yêu thích: {{ selectedFruits }}</p>

          <input type="checkbox" id="apple" value="Táo" v-model="selectedFruits">
          <label for="apple">Táo</label>

          <input type="checkbox" id="banana" value="Chuối" v-model="selectedFruits">
          <label for="banana">Chuối</label>

          data() { return { selectedFruits: [] } }
          // Nếu bạn tích cả hai, selectedFruits sẽ là: ['Táo', 'Chuối']
          ```
  - **b. Radio Button (Nút chọn một)**
    Tất cả các radio button trong một nhóm phải được liên kết với **cùng một biến `v-model`**.
    ```jsx
    <p>Giới tính: {{ gender }}</p>

    <input type="radio" id="male" value="Nam" v-model="gender">
    <label for="male">Nam</label>

    <input type="radio" id="female" value="Nữ" v-model="gender">
    <label for="female">Nữ</label>

    data() { return { gender: '' } }
    // 'gender' sẽ là 'Nam' hoặc 'Nữ'
    ```
  - **c. Select (Dropdown)**
    Liên kết `v-model` với thẻ `<select>`.
    ```jsx
    <label for="country">Chọn quốc gia:</label>
    <select id="country" v-model="selectedCountry">
      <option value="VN">Việt Nam</option>
      <option value="US">Hoa Kỳ</option>
      <option value="JP">Nhật Bản</option>
    </select>
    <p>Bạn đã chọn: {{ selectedCountry }}</p>

    data() { return { selectedCountry: 'VN' } } // Đặt giá trị mặc định
    ```
- **Các "chất bổ" cho `v-model` (Modifiers)**
  Modifiers là các "đuôi" bạn thêm vào `v-model` để thay đổi hành vi của nó.
  - **`.lazy`**: Mặc định, `v-model` cập nhật dữ liệu sau mỗi sự kiện `input` (gõ từng chữ). `.lazy` sẽ đổi nó sang sự kiện `change` (chỉ cập nhật khi bấm ra ngoài).
  ```jsx
  <input v-model.lazy="message">
  ```
  - **`.number`**: Tự động ép kiểu giá trị nhập vào thành `Number`.
  ```jsx
  <input v-model.number="age" type="number">
  ```
  - **`.trim`**: Tự động cắt bỏ khoảng trắng ở đầu và cuối chuỗi.
  ```jsx
  <input v-model.trim="username">
  ```
- **Gửi Form (Form Submission)**
  Để xử lý việc gửi toàn bộ form, bạn lắng nghe sự kiện `submit` trên thẻ `<form>`.
  **Lưu ý quan trọng:** Luôn dùng modifier `.prevent` để **ngăn chặn hành vi mặc định của trình duyệt** (tải lại trang).
  ```jsx
  <form @submit.prevent="handleSubmit">
    <input v-model="username" placeholder="Tên đăng nhập">
    <input v-model="password" type="password" placeholder="Mật khẩu">

    <button type="submit">Đăng nhập</button>
  </form>

  <script>
  export default {
    data() {
      return { username: '', password: '' }
    },
    methods: {
      handleSubmit() {
        // Logic gửi form ở đây (ví dụ: gọi API)
        console.log('Đang gửi dữ liệu:', this.username, this.password);
        alert('Đăng nhập thành công!');
      }
    }
  }
  </script>
  ```
- **Validation (Kiểm tra dữ liệu) đơn giản**
  Bạn có thể dễ dàng thực hiện validation đơn giản bằng cách dùng `computed` properties.
  **Ví dụ:** Vô hiệu hóa nút submit nếu form chưa hợp lệ.
  ```jsx
  <form @submit.prevent="handleSubmit">
    <input v-model="email" placeholder="Email">
    <input v-model="password" type="password" placeholder="Mật khẩu (ít nhất 6 ký tự)">

    <button type="submit" :disabled="isFormInvalid">Gửi</button>

    <p v-if="isFormInvalid" style="color: red;">
      Vui lòng điền đúng email và mật khẩu dài hơn 6 ký tự.
    </p>
  </form>

  <script>
  export default {
    data() {
      return { email: '', password: '' }
    },
    computed: {
      // Computed property này sẽ tự động tính toán lại
      isFormInvalid() {
        return !this.email.includes('@') || this.password.length < 6;
      }
    },
    methods: {
      handleSubmit() {
        // Logic gửi...
      }
    }
  }
  </script>
  ```
  **Lưu ý:** Đối với các form phức tạp, bạn nên sử dụng các thư viện validation chuyên dụng như **Vuelidate** hoặc **VeeValidate**

### **tổng quan về Kiến trúc Web Hiện đại: Ai "Vẽ" trang web?**

Kiến trúc web hiện đại chủ yếu xoay quanh một câu hỏi cốt lõi: **Giao diện HTML được "vẽ" (render) ở đâu?**

- Nó được "lắp ráp sẵn" tại **máy chủ (server)** rồi gửi đi?
- Hay nó được gửi dưới dạng "linh kiện" và tự lắp ráp tại **trình duyệt (client)**?

Câu trả lời cho câu hỏi này định nghĩa nên các kiến trúc chính mà chúng ta sử dụng ngày nay.

- **1. SSR (Server-Side Rendering) - Kiến trúc truyền thống**
  Đây là cách web hoạt động trong nhiều năm, thường được gọi là **MPA (Multi-Page Application)**.
  - **Nó là gì?** Là quá trình "vẽ" giao diện HTML **trực tiếp trên máy chủ (server)**. Server sẽ gửi về cho trình duyệt một file HTML đã hoàn chỉnh.
  - **Analogy (Mua đồ nội thất đã lắp sẵn 🪑):** Bạn đặt mua một cái ghế. Cửa hàng (server) sẽ lắp ráp sẵn cái ghế đó rồi mới giao cho bạn. Bạn nhận được là có thể dùng ngay.
  - **Ưu điểm:** Lần tải trang đầu tiên rất nhanh, tốt cho SEO (vì máy tìm kiếm đọc được HTML đầy đủ ngay).
  - **Nhược điểm:** Mỗi lần chuyển trang (click vào link), bạn phải yêu cầu server "lắp ráp" và "giao" một trang mới, gây ra cảm giác "chớp" (flicker) khi tải lại.
- **2. CSR (Client-Side Rendering) - Kiến trúc SPA**
  Đây là kiến trúc cốt lõi của các framework hiện đại như Vue, React, Angular, tạo ra **SPA (Single Page Application)**.
  - **Nó là gì?** Là quá trình "vẽ" (render) giao diện HTML **hoàn toàn trên trình duyệt của người dùng** bằng JavaScript.
  - **Analogy (Lắp ráp đồ nội thất IKEA 🛋️):** Server chỉ gửi cho bạn một "thùng hàng" (một file HTML gần như trống rỗng và một file JavaScript lớn). Trình duyệt của bạn (client) phải mở thùng hàng đó ra, đọc hướng dẫn (JS) và **tự tay lắp ráp** toàn bộ đồ nội thất (giao diện).
  - **Ưu điểm:** Trải nghiệm mượt mà như ứng dụng di động. Sau lần tải đầu tiên, việc chuyển trang gần như tức thì.
  - **Vấn đề:** Lần tải trang đầu tiên có thể chậm (vì phải tải và chạy JS) và không tốt cho SEO (vì ban đầu HTML trống rỗng).
- **3. Các công cụ hỗ trợ SPA (CSR)**
  Để kiến trúc SPA hoạt động, nó cần 2 công cụ hỗ trợ chính:
  ### **a. API (RESTful hoặc GraphQL)**
  - **Nó là gì?** Nếu SPA là "tiệc buffet" 🍽️, thì API chính là **"nhà bếp" và "thực đơn"**.
  - **Vai trò:** Vì SPA không tải lại HTML, nó cần một cách để lấy dữ liệu mới. Nó "gọi điện" đến API (cánh cổng của server) để yêu cầu dữ liệu thô (thường là JSON). JavaScript sau đó nhận dữ liệu JSON này và tự "vẽ" nó ra thành HTML.
  ### **b. Client-Side Routing (Định tuyến phía Client)**
  - **Nó là gì?** Đây là cơ chế cho phép SPA thay đổi URL trên thanh địa chỉ mà **không cần tải lại trang**.
  - **Analogy (Mục lục sách 📖):** Bạn đang đọc một cuốn sách (ứng dụng). Khi bạn muốn chuyển đến chương 5 (`/chapter-5`), bạn không vứt cuốn sách đi và lấy một cuốn mới. Bạn chỉ đơn giản là **lật đến trang** của chương 5.
  - **Vai trò:** Thư viện như `vue-router` sẽ lắng nghe sự thay đổi URL (ví dụ từ `/` sang `/about`) và chỉ hoán đổi component đang hiển thị (ví dụ từ `HomeView` sang `AboutView`).
- **4. Hydration (SSR + CSR) - Giải pháp "Lai" Hiện đại**
  Đây là kiến trúc nâng cao, kết hợp những gì tốt nhất của cả SSR và CSR, được sử dụng bởi các framework như **Nuxt (cho Vue)** và **Next.js (cho React)**.
  - **Nó là gì?** Là quá trình "thổi hồn" cho một trang HTML tĩnh.
  - **Cách hoạt động:**
    1. **Bước 1 (Giống SSR):** Server tạo ra một trang HTML hoàn chỉnh và gửi nó cho trình duyệt. (Tải nhanh, tốt cho SEO).
    2. **Bước 2 (Giống CSR):** JavaScript sau đó được tải về trong khi người dùng đang xem trang.
    3. **Bước 3 (Hydration):** JavaScript sẽ "quét" qua trang HTML có sẵn đó và **gắn các sự kiện** (`@click`, `v-model`,...) vào. Nó biến trang HTML "tĩnh" (như một bức tượng) thành một ứng dụng "sống" (có thể tương tác).

### routing

- khái niệm
  - Routing (định tuyến) là cơ chế cho phép bạn tạo ra một **Single Page Application (SPA)**—một trang web chỉ tải _một lần_ duy nhất.
  - Thay vì tải lại toàn bộ trang khi bạn click vào một link (như web truyền thống), routing cho phép Vue **chỉ hoán đổi các component** tương ứng với URL mới.
  - Hãy tưởng tượng:
    - **Web truyền thống (Multi-Page App):** Giống như bạn đang đọc một bộ sách. Mỗi lần bạn muốn xem "Giới thiệu", bạn phải cất cuốn "Trang chủ" đi và lấy cuốn "Giới thiệu" ra.
    - **Vue SPA (Single-Page App):** Giống như bạn đọc một cuốn sách duy nhất. Bạn chỉ cần **lật trang** (thay đổi component) để xem nội dung "Trang chủ" hay "Giới thiệu". Trang sách (trang web) không bao giờ bị thay đổi.
  Thư viện chính thức để làm việc này là **`vue-router`**.
- khi nào dùng
  - **Trải nghiệm người dùng (UX):** Nhanh hơn rất nhiều. Người dùng không phải nhìn thấy màn hình trắng "chớp" một cái mỗi khi chuyển trang. Cảm giác mượt mà như dùng một ứng dụng di động.
  - **Hiệu quả:** Chỉ tải những dữ liệu cần thiết thay vì tải lại toàn bộ HTML, CSS, JS.
  - **1. Cấu hình `routes` (Bản đồ 🗺️)**
    Đây là một mảng JavaScript, nơi bạn định nghĩa "bản đồ" cho trang web của mình. Nó nói rằng: "Nếu người dùng truy cập URL này, hãy hiển thị component kia".
    `router/index.js` (Ví dụ)
    ```jsx
    import { createRouter, createWebHistory } in 'vue-router'
    import HomeView from '../views/HomeView.vue'
    import AboutView from '../views/AboutView.vue'

    // Định nghĩa bản đồ
    const routes = [
      {
        path: '/', // Khi người dùng ở trang chủ
        name: 'home',
        component: HomeView // Hiển thị component HomeView
      },
      {
        path: '/about', // Khi người dùng ở trang /about
        name: 'about',
        component: AboutView // Hiển thị component AboutView
      }
    ]

    // Chế độ URL sạch. Nó cho phép URL của ứng dụng (SPA) của bạn trông giống như một trang web truyền thống, không có dấu thăng (#)

    const router = createRouter({
      history: createWebHistory(),
      routes, // Sử dụng bản đồ ở trên
    })

    export default router
    ```
  - **2. `<router-link>` (Người chỉ đường 👆)**
    Đây là component dùng để **thay thế cho thẻ `<a>`** truyền thống.
    Sự khác biệt là `<router-link>` sẽ không tải lại trang. Nó chỉ thay đổi URL trên thanh địa chỉ và "báo" cho `vue-router` biết để hoán đổi component.
    **Trong template (ví dụ `App.vue`):**
    ```jsx
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    ```
  - **3. `<router-view>` (Khung tranh 🖼️)**
    Đây là component **placeholder (giữ chỗ)**. Nó là "khung tranh" rỗng.
    `vue-router` sẽ tự động tìm component tương ứng với URL hiện tại (dựa trên bản đồ `routes`) và "vẽ" component đó vào bên trong `<router-view>`.
    **Trong template (ví dụ `App.vue`):**
    ```jsx
    <template>
      <div id="app">
        <nav>
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </nav>

        <router-view />
      </div>
    </template>
    ```
  - **Luồng hoạt động tóm tắt**
    1. Người dùng click vào thẻ `<router-link to="/about">`.
    2. `vue-router` chặn hành vi tải lại trang. Nó cập nhật URL trên thanh địa chỉ thành `/about`.
    3. `vue-router` nhìn vào "bản đồ" `routes` và thấy rằng `/about` tương ứng với `AboutView`.
    4. `vue-router` tự động "tiêm" component `AboutView` vào bên trong thẻ `<router-view>`.
    5. Giao diện thay đổi mà không cần tải lại trang.
- createWebHistory - SPA là gì ?
  `createWebHistory` chính là **một trong hai cách** để thực hiện "routing" trong một "SPA".
  Nó liên quan trực tiếp vì nó là công cụ để tạo ra **"ảo giác"** chuyển trang.
  Hãy xem xét một **SPA (Single Page Application)**. Toàn bộ trang web của bạn thực chất chỉ là **một file `index.html` duy nhất**.
  ***
  ## **Vấn đề: SPA chỉ có 1 trang, làm sao có nhiều URL?**
  Bạn có một file `index.html`. Làm thế nào để bạn có cả hai trang `example.com/` (Home) và `example.com/about` (About)?
  Vue Router giải quyết việc này bằng 2 chiến lược (hai cách "làm ảo thuật"):
  - **Chiến lược 1: `createHashHistory` (Dùng dấu `#`)**
    - **URL:** `example.com/#/about`
    - **Cách hoạt động:** Mọi thứ sau dấu `#` được gọi là "hash". Khi bạn thay đổi phần "hash", trình duyệt **không tải lại trang**. Trình duyệt hiểu rằng đây chỉ là một "đánh dấu" (bookmark) _bên trong_ trang hiện tại.
    - **Ai xử lý:** `vue-router` (JavaScript) sẽ "lắng nghe" sự thay đổi của hash này và tự động hoán đổi component.
    - **Ưu điểm:** Đơn giản, không cần cấu hình server.
  - **Chiến lược 2: `createWebHistory` (Dùng URL "thật")**
    - **URL:** `example.com/about`
    - **Cách hoạt động (ảo giác):**
      1. Khi bạn đang _ở trong_ ứng dụng (ví dụ: ở trang chủ), bạn bấm vào `<router-link to="/about">`.
      2. `vue-router` sẽ **chặn** trình duyệt, ngăn nó tải lại trang.
      3. Nó sử dụng một API của trình duyệt (gọi là History API) để **thay đổi URL** trên thanh địa chỉ một cách "giả mạo" thành `example.com/about`.
      4. Nó tự hoán đổi component `HomeView` thành `AboutView`.
    - **Kết quả:** Bạn thấy URL thay đổi, nội dung thay đổi, nhưng trang không hề tải lại. Đây chính là **"client-side routing"**.
  `createWebHistory` làm cho URL của bạn trông "thật" (như `example.com/about`), nhưng nó tạo ra một vấn đề khi người dùng **tải lại trang (nhấn F5)**.
  Hãy tưởng tượng thế này:
  - **1. Chế độ cũ (có dấu `#`) 📮**
    - **Địa chỉ:** `example.com/#/about`
    - Giống như bạn gửi thư đến một **tòa nhà chung cư** (`example.com`).
    - Người đưa thư (Server) chỉ cần biết địa chỉ tòa nhà. Anh ta đưa toàn bộ thư (file `index.html`) đến quầy lễ tân.
    - Người lễ tân (JavaScript/Vue) sẽ nhìn vào số phòng (`#/about`) và đưa bạn lên đúng căn hộ (`AboutView`).
    - **Kết quả:** Bạn nhấn F5, thư vẫn đến đúng tòa nhà, mọi thứ hoạt động.
  - **2. Chế độ mới (`createWebHistory`) 🏠**
    - **Địa chỉ:** `example.com/about`
    - Giống như bạn đang tìm một **ngôi nhà cụ thể** trong một dãy phố.
    - Bạn nhấn F5 (hoặc gõ thẳng URL), bạn đang yêu cầu người đưa thư (Server) tìm chính xác ngôi nhà tên là `/about`.
    - **Vấn đề:** Trong ứng dụng Vue (SPA), thực ra **chỉ có một ngôi nhà duy nhất** là `index.html`. Không hề có ngôi nhà nào tên là `/about`.
    - **Kết quả:** Người đưa thư (Server) không tìm thấy, liền báo lỗi **404 Not Found**.
    - **Giải pháp (Cấu hình Server) 📋 cho chiến lược 2**
      Bạn phải dán một **tấm biển chỉ dẫn** ở đầu dãy phố (cấu hình server) với nội dung:
      "Gửi anh đưa thư! Dù ai hỏi nhà `/about`, nhà `/profile` hay bất cứ nhà nào khác, anh cứ mang hết thư đến ngôi nhà `index.html` nhé. Người bên trong (Vue Router) sẽ tự biết phải làm gì."
      **Tóm lại:** Cấu hình server là một quy tắc "dự phòng". Nó bảo server rằng: "Nếu không tìm thấy một file thật (như `/about`), đừng báo lỗi 404. Thay vào đó, hãy luôn gửi file `index.html`, và để JavaScript tự xử lý."
- tại sao phải cần dùng? thay vì dùng dynamic component
  - Bạn dùng URL (với `vue-router`) khi bạn muốn **biến một trạng thái của ứng dụng thành một địa chỉ có thể truy cập được từ bên ngoài.**
  - Bạn dùng `<component :is>` (dynamic component) khi bạn chỉ muốn hoán đổi các component dựa trên một **trạng thái nội bộ**, không cần chia sẻ.
  - Hãy tưởng tượng sự khác biệt giữa **địa chỉ của một video YouTube** và **nút "Play/Pause"** trên video đó.
    - **Vue Router (URL) 🌎:** Giống như **địa chỉ của video YouTube** (ví dụ: `youtube.com/watch?v=...`).
      - Đây là một địa chỉ công khai, ai cũng có thể truy cập.
      - Bạn có thể **chia sẻ** nó cho bạn bè.
      - Bạn có thể **đánh dấu trang (bookmark)** nó để xem lại sau.
      - Nó nằm trong **lịch sử trình duyệt** (bạn có thể bấm nút "Back" để quay lại video trước).
    - **Dynamic Component (`<component :is>`) 📺:** Giống như **nút "Play/Pause"**.
      - Đây là một hành động _nội bộ_ của trang.
      - Khi bạn bấm "Pause", trạng thái thay đổi, nhưng URL không đổi.
      - Bạn **không thể** gửi một link cho bạn bè để họ thấy video của bạn đang ở trạng Bị Tạm Dừng.
      - Nó **không** nằm trong lịch sử trình duyệt. Bấm "Back" sẽ đưa bạn ra khỏi trang YouTube, chứ không phải "Play" lại video.
        | **Dùng vue-router (URLs) khi...**                                                            | **Dùng <component :is> (Dynamic) khi...**                                                                    |
        | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
        | Bạn đang xây dựng các "Trang" (Pages) riêng biệt của ứng dụng (ví dụ: Home, About, Profile). | Bạn đang hoán đổi các "View" (khung nhìn) nhỏ bên trong một trang duy nhất (ví dụ: các tab trong một modal). |
        | Bạn muốn nội dung có thể được truy cập trực tiếp qua một link.                               | Nội dung không cần được truy cập trực tiếp, nó phụ thuộc vào tương tác trước đó.                             |
        | Bạn muốn người dùng có thể dùng nút "Back" để quay lại.                                      | Bạn không muốn hành động này ảnh hưởng đến lịch sử trình duyệt.                                              |
- cần lưu ý khi dùng
  Khi dùng `vue-router`, có một vài lưu ý quan trọng để giúp ứng dụng của bạn chạy mượt mà, đúng logic và có hiệu năng cao.
  Dưới đây là những điều quan trọng nhất bạn cần lưu ý.
  ***
  - **1. Dùng `<router-link>`, KHÔNG dùng thẻ `<a>`**
    Đây là lưu ý cơ bản và quan trọng nhất.
    - **Thẻ `<a>` (ví dụ: `<a href="/about">`):** Sẽ **tải lại toàn bộ trang**. Việc này phá vỡ hoàn toàn trải nghiệm "Single Page Application" (SPA) và làm mất hết trạng thái của Vue.
    - **`<router-link>` (ví dụ: `<router-link to="/about">`):** Sẽ **không tải lại trang**. Nó chỉ thay đổi URL trên thanh địa chỉ và hoán đổi component bên trong `<router-view>` một cách mượt mà.
    **Lưu ý:** Luôn dùng `<router-link to="...">` cho mọi điều hướng _nội bộ_ bên trong ứng dụng của bạn.
  ***
  - **2. Hiểu về "History Mode" (Chế độ Lịch sử)**
    Khi cấu hình router, bạn có 2 lựa chọn chính cho `history`:
    - **`createHashHistory()` (Hash Mode):**
      - URL của bạn sẽ có dấu thăng (`#`): `https://example.com/#/about`
      - **Ưu điểm:** Dễ nhất, **hoạt động ngay lập tức** mà không cần cấu hình server.
      - **Nhược điểm:** URL trông không được "sạch".
    - **`createWebHistory()` (Web/HTML5 Mode):**
      - URL của bạn sẽ trông bình thường: `https://example.com/about`
      - **Ưu điểm:** URL sạch, đẹp, tốt cho SEO.
      - **Lưu ý CỰC KỲ QUAN TRỌNG:** Chế độ này **YÊU CẦU CẤU HÌNH PHÍA SERVER**. Nếu không, khi người dùng truy cập thẳng vào `https://example.com/about` (hoặc nhấn F5), server sẽ báo lỗi 404 (Không tìm thấy). Bạn phải cấu hình server để mọi yêu cầu đều "trả về" file `index.html` của bạn.
  ***
  - **3. Lấy dữ liệu từ URL (Dynamic Params)**
    Đây là cách bạn tạo các trang động như chi tiết sản phẩm hoặc hồ sơ người dùng.
    - **Định nghĩa Route:** Dùng dấu hai chấm `:` trong `path` để đánh dấu một "param" (tham số).JavaScript
      ```jsx
      // trong file router/index.js
      const routes = [
        {
          path: '/user/:id', // :id là một param động
          name: 'user-detail',
          component: UserDetailView
        }
      ]
      ```
    - Truy cập trong Component: (Ví dụ: UserDetailView.vue)HTML
      Sử dụng đối tượng $route để lấy giá trị của param.
      ```jsx
      <template>
        <h2>Hồ sơ người dùng ID: {{ userId }}</h2>
      </template>

      <script>
      export default {
        computed: {
          userId() {
            // Lấy 'id' từ URL (phải khớp với tên param ':id')
            return this.$route.params.id;
          }
        }
      }
      </script>
      ```
  ***
  - **4. Bảo vệ Route (Navigation Guards)**
    Đây là cách bạn ngăn người dùng chưa đăng nhập truy cập vào các trang riêng tư (ví dụ: trang `/profile`).
    - **Khái niệm:** "Navigation Guards" (Người gác cổng) là các hàm chạy _trước khi_ một route được hiển thị.
    - **Ví dụ (Kiểm tra đăng nhập):**JavaScript
      ```jsx
      // trong file router/index.js
      router.beforeEach((to, from, next) => {
        const isLoggedIn = localStorage.getItem('user-token') // Kiểm tra xem đã đăng nhập chưa

        // Nếu route yêu cầu đăng nhập VÀ người dùng chưa đăng nhập
        if (to.meta.requiresAuth && !isLoggedIn) {
          // Chuyển hướng về trang login
          next({ name: 'login' })
        } else {
          // Cho phép đi tiếp
          next()
        }
      })

      // Bạn cần đánh dấu route nào cần bảo vệ
      const routes = [
        {
          path: '/profile',
          name: 'profile',
          component: ProfileView,
          meta: { requiresAuth: true } // Đánh dấu route này
        },
        {
          path: '/login',
          name: 'login',
          component: LoginView
        }
      ]
      ```
  ***
  - **5. Tải lười (Lazy Loading) để tối ưu hiệu năng** 🚀
    - **Vấn đề:** Mặc định, Vue sẽ tải code của TẤT CẢ các trang (Home, About, Profile...) vào một file JavaScript duy nhất. Nếu ứng dụng lớn, file này sẽ rất nặng, làm chậm lần tải đầu tiên.
    - **Giải pháp (Lazy Loading):** Chỉ tải code của một trang khi người dùng thực sự truy cập vào trang đó.
    - **Cách làm:** Thay vì `import` component ở đầu file, hãy dùng `import()` động trong định nghĩa `component`.JavaScriptJavaScript
      **Cách thông thường (Tải tất cả):**
      ```jsx
      import AboutView from '../views/AboutView.vue'
      const routes = [{ path: '/about', component: AboutView }]
      ```
      **Cách Lazy Loading (Tối ưu):**
      ```jsx
      const routes = [
        {
          path: '/about',
          // Code của AboutView sẽ được tách ra file riêng
          // và chỉ được tải khi người dùng click vào /about
          component: () => import('../views/AboutView.vue')
        }
      ]
      ```
  ***
  - **6. Component không cập nhật (Lỗi Reactivity)**
    - **Vấn đề:** Bạn đang ở trang `/user/1`, bạn click vào một link để đi đến `/user/2`. URL thay đổi, nhưng component... **không render lại**?
    - **Lý do:** Vue rất thông minh. Nó thấy cả hai URL (`/user/1` và `/user/2`) đều dùng chung component `UserDetailView`, nên nó sẽ **tái sử dụng** component đó để tiết kiệm hiệu năng, thay vì hủy đi tạo lại.
    - **Giải pháp:** Bạn phải "theo dõi" (watch) sự thay đổi của `$route.params`.JavaScript
      ```jsx
      // Bên trong UserDetailView.vue
      export default {
        data() {
          return {
            userData: null,
            userId: this.$route.params.id // Chỉ chạy 1 lần lúc đầu
          }
        },
        watch: {
          // Theo dõi sự thay đổi của $route
          '$route.params.id'(newId, oldId) {
            // Khi param 'id' thay đổi (ví dụ từ 1 sang 2)
            // hãy gọi lại hàm để lấy dữ liệu mới
            this.fetchUserData(newId)
          }
        },
        methods: {
          fetchUserData(id) {
            // logic gọi API để lấy dữ liệu cho user 'id'
            this.userId = id
          }
        },
        mounted() {
          // Lấy dữ liệu cho lần đầu tiên
          this.fetchUserData(this.userId)
        }
      }
      ```
- linkActiveClass trong cấu hình router làm gì ?
  `linkActiveClass` là một tùy chọn cấu hình trong `vue-router` cho phép bạn **thay đổi tên class CSS mặc định** được tự động thêm vào các link đang "active" (đang được chọn).
  ***
  - **Vấn đề mặc định (Default)**
    Khi bạn sử dụng `<router-link>`, Vue Router rất tốt bụng. Khi bạn đang ở trang `/about`, nó sẽ tự động thêm một class vào link "About" của bạn để bạn có thể tô sáng nó.
    Tên class mặc định đó là **`router-link-active`**.
    **Ví dụ (Mặc định):**
    ```html
    <a href="/about" class="router-link-active">About</a>
    ```
    **Vấn đề:** Rất nhiều thư viện CSS (như Bootstrap, Bulma...) không dùng class `router-link-active`. Họ dùng một tên class đơn giản hơn, ví dụ như **`active`**.
  ***
  - **Giải pháp: `linkActiveClass` 💡**
    `linkActiveClass` cho phép bạn bảo Vue Router:
    > "Đừng dùng tên router-link-active nữa. Thay vào đó, hãy dùng tên class là active (hoặc bất cứ tên gì tôi muốn)."
    Nó giống như bạn đổi "nhãn dán" mặc định của Vue Router để nó khớp với "nhãn dán" mà thư viện CSS của bạn đang tìm kiếm.
  ***
  - **Cách sử dụng (Ví dụ)**
    Bạn thiết lập nó khi khởi tạo router (thường là trong file `router/index.js`).
    ```jsx
    import { createRouter, createWebHistory } from 'vue-router'
    // ... import các routes ...

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        /* ... */
      ],

      // ĐÂY LÀ PHẦN QUAN TRỌNG:
      // Bảo router hãy dùng class 'active' thay vì 'router-link-active'
      linkActiveClass: 'active'
    })

    export default router
    ```
    ### **Kết quả:**
    Bây giờ, khi bạn ở trang `/about`, HTML được render ra sẽ là:
    ```html
    <a href="/about" class="active">About</a>
    ```
    Điều này giúp nó **tự động tương thích** với các thư viện CSS như Bootstrap mà không cần bạn phải viết thêm bất kỳ CSS tùy chỉnh nào.
- CSS cho route-link
  Excellent question! Đây là một điểm quan trọng về cách Vue Router render `<router-link>`:
  - **1. `<router-link>` được render thành `<a>`:**
    ```
    <!-- Template code -->
    <router-link to="/teams">Teams</router-link>

    <!-- Rendered HTML trong browser -->
    <a href="/teams" class="">Teams</a>

    ```
    **Vue Router tự động convert `<router-link>` thành thẻ `<a>` trong DOM!**
    **📋 So sánh template vs DOM:**
    | **Template (Vue)** | **Rendered DOM (Browser)** |
    | ------------------ | -------------------------- |
    | `<router-link>`    | `<a>`                      |
    | `to="/teams"`      | `href="/teams"`            |
    | Vue component      | HTML element               |
  - **🎯 Tại sao CSS target `a` thay vì `router-link`:**
    **1. CSS chỉ hiểu HTML elements:**
    ```css
    /* ✅ WORKS - Browser hiểu thẻ <a> */
    a {
      color: white;
    }

    /* ❌ WON'T WORK - Browser không hiểu <router-link> */
    router-link {
      color: white;
    }
    ```
    **2. Vue components không tồn tại trong DOM:**
    ```html
    <!-- Vue template -->
    <router-link to="/teams">Teams</router-link>

    <!-- Browser DOM (thực tế) -->
    <a href="/teams">Teams</a>
    ```
  - **🔄 Active class magic:**
    **Vue Router tự động thêm class `active`:**
    ```html
    <!-- Khi route hiện tại là /teams -->
    <a href="/teams" class="router-link-exact-active router-link-active">
      Teams
    </a>

    <!-- CSS selector hoạt động -->
    a.active { /* styles */ }
    ```
    **💡 Cách Vue Router add active class:**
    ```jsx
    <router-link
      to="/teams"
      active-class="active"      <!-- Custom active class -->
      exact-active-class="exact" <!-- Custom exact active class -->
    >
      Teams
    </router-link>

    ```
    **Rendered:**
    ```html
    <a href="/teams" class="active">Teams</a>
    ```
  - **🎨 Alternative styling approaches:**
    **1. Style bằng Vue class (không khuyến khích):**
    ```css
    /* ❌ Không work vì router-link không tồn tại trong DOM */
    .router-link {
      color: white;
    }
    ```
    **2. Style bằng attribute selector:**
    ```css
    /* ✅ Works nhưng verbose */
    [data-router-link] {
      color: white;
    }
    ```
    **3. Style bằng custom class:**
    ```
    <router-link to="/teams" class="nav-link">Teams</router-link>

    ```
    ```css
    /* ✅ Works */
    .nav-link {
      color: white;
    }
    ```
    **🔧 Best Practice:**
    ```jsx
    <template>
      <router-link to="/teams" class="nav-link">Teams</router-link>
    </template>

    <style scoped>
    /* Style both the component class AND the rendered element */
    .nav-link,
    a.nav-link {
      color: white;
      text-decoration: none;
    }

    /* Active state */
    a.nav-link.router-link-active {
      color: #f1a80a;
    }
    </style>

    ```
    **Tóm lại**: CSS style `a` vì đó là element thực tế trong DOM, không phải `<router-link>`! 🎯
- navigate in code
  Action `this.$router.push('/teams')` làm những việc sau:
  ## **🔄 Chức năng chính:**
  ### **1. Programmatic Navigation (Điều hướng bằng code):**
  ```jsx
  this.$router.push('/teams')
  // ✅ Chuyển từ route hiện tại sang route '/teams'
  ```
  ## **📋 Những gì xảy ra khi execute:**
  ### **1. URL Change:**
  ```
  Từ: <http://localhost:8080/users>
  Đến: <http://localhost:8080/teams>

  ```
  ### **2. Component Switch:**
  ```
  UsersList.vue (hiện tại) → TeamsPage.vue (mới)

  ```
  ### **3. Browser History:**
  ```jsx
  // Thêm entry mới vào history stack
  History: ['/users', '/teams'] // '/teams' được push lên top
  ```
  ## **🎯 So sánh với các cách điều hướng khác:**
  | **Method**                  | **History**        | **Use Case**            |
  | --------------------------- | ------------------ | ----------------------- |
  | `$router.push('/teams')`    | ✅ Add to history  | Điều hướng thông thường |
  | `$router.replace('/teams')` | ❌ Replace current | Không muốn back         |
  | `$router.go(-1)`            | ↩️ Navigate back   | Back button             |
  ## **💡 Ví dụ thực tế:**
  ### **Flow trong UsersList:**
  1. **User click "Confirm"** → Trigger `confirmInput()`
  2. **Execute logic** → "do something" (xử lý data)
  3. **Navigate away** → `$router.push('/teams')`
  4. **Component unmount** → UsersList.vue destroyed
  5. **New component mount** → Teams component rendered
  ## **🔄 Equivalent alternatives:**
  ### **1. Declarative (template):**
  ```
  <!-- Thay vì programmatic -->
  <router-link to="/teams">
    <button>Confirm</button>
  </router-link>

  ```
  ### **2. With params:**
  ```jsx
  // Nếu cần pass data
  this.$router.push({
    path: '/teams',
    query: { from: 'users' }
  })
  ```
  ### **3. Named routes:**
  ```jsx
  // Nếu dùng named routes
  this.$router.push({ name: 'teams' })
  ```
  ## **⚡ Tại sao dùng programmatic navigation:**
  ### **✅ Ưu điểm:**
  - **Conditional navigation**: Chỉ navigate khi logic hoàn thành
  - **Data processing**: Xử lý data trước khi chuyển trang
  - **Validation**: Check điều kiện trước khi navigate
  - **Dynamic routing**: Route dựa trên runtime data
  ### **📝 Use case trong code:**
  ```jsx
  confirmInput() {
    // Xử lý logic (validate, save data, etc.)
    // Chỉ navigate khi thành công
    this.$router.push('/teams');
  }

  ```
  **Tóm lại**: Action này **chuyển hướng** từ Users page sang Teams page sau khi user click "Confirm"! 🎯
- redirect- alias
  - **Khi nào dùng `redirect`?**
    - **Các link cũ:** Bạn đổi `path: '/old-profile'` thành `path: '/profile'`. Bạn tạo một `redirect` từ `/old-profile` để những người dùng cũ vẫn truy cập được.
    - **Tạo shortcut:** Tạo một link ngắn (`/g`) để chuyển hướng đến một link dài (`/go-to-this-page`).
    - **Route mặc định:** Khi vào `/settings`, tự động chuyển hướng đến `/settings/profile`.
      - Example
        ```jsx
        const routes = [
          {
            // 1. Chuyển hướng cơ bản
            // Khi người dùng vào '/home', URL sẽ đổi thành '/'
            path: '/home',
            redirect: '/'
          },
          {
            // 2. Chuyển hướng bằng tên
            // Khi vào '/first-post', URL sẽ đổi thành '/blog/post-1'
            path: '/first-post',
            redirect: { name: 'blog-post', params: { id: 'post-1' } }
          },
          {
            path: '/blog/:id',
            name: 'blog-post',
            component: BlogPost
          },
          {
            path: '/',
            component: Home
          }
        ]
        ```
  - **Khi nào dùng `alias`?**
    - `alias` giống như một người có nhiều "biệt danh".
      Bạn có một component (ví dụ: `HomeComponent`). Bạn muốn người dùng có thể truy cập nó qua nhiều URL khác nhau (ví dụ: `/`, `/home`, hoặc `/trang-chu`). Khi người dùng truy cập vào một "bí danh", component đó sẽ được hiển thị, nhưng **URL trên thanh địa chỉ sẽ không thay đổi.**
    - Khi bạn muốn cùng một nội dung có thể truy cập được từ nhiều URL khác nhau.
    - Hỗ trợ các URL cũ nhưng bạn _không muốn_ đổi URL của người dùng.
    - Tạo các URL thân thiện cho các chiến dịch marketing (`/sale-2025`) nhưng vẫn dùng component `ProductPage`.
      - Example
        ```jsx
        const routes = [
          {
            path: '/',
            name: 'home',
            component: HomeComponent,
            // Bất cứ khi nào người dùng truy cập '/home' hoặc '/trang-chu',
            // Vue sẽ render 'HomeComponent', và URL trên trình duyệt
            // VẪN SẼ LÀ '/home' hoặc '/trang-chu'.
            alias: ['/home', '/trang-chu']
          },
          {
            path: '/products',
            component: ProductComponent,
            // Alias cũng có thể là một chuỗi
            alias: '/hang-hoa'
          }
        ]
        ```
  - **Khi nào chọn cái nào?**
    - Dùng **`redirect`** khi bạn muốn **chỉ có một URL "chính thức"** cho nội dung đó. Điều này tốt hơn cho SEO vì nó hợp nhất "sức mạnh" của các link về một địa chỉ duy nhất.
    - Dùng **`alias`** khi bạn **chủ động muốn** nội dung của mình tồn tại ở nhiều địa chỉ khác nhau mà không muốn chuyển hướng người dùng.
      | **Tính năng**            | **redirect (Chuyển hướng)**                                               | **alias (Bí danh)**                                              |
      | ------------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------- |
      | **Bản chất**             | Chuyển nhà 📦                                                             | Thêm biệt danh 🎭                                                |
      | **URL trên trình duyệt** | **Bị thay đổi** sang URL mới.                                             | **Giữ nguyên** URL bí danh.                                      |
      | **Mục đích**             | Chỉ có **một** URL đúng. Dẫn người dùng từ link cũ/lối tắt đến link đúng. | Cho phép **nhiều** URL cùng trỏ về một nội dung.                 |
      | **Ví dụ**                | Vào `/home` ➡️ URL đổi thành `/`.                                         | Vào `/home` ➡️ URL vẫn là `/home` (nhưng hiện nội dung của `/`). |
- cách handle khi nhập invalid url
  Các trang web lớn xử lý URL không hợp lệ bằng cách hiển thị một **Trang 404 Tùy chỉnh** (Custom 404 Page) thân thiện với người dùng, thay vì để trình duyệt hiển thị một trang lỗi mặc định, trống rỗng và xấu xí.
  Mục tiêu của họ không phải là để báo lỗi, mà là để **giữ người dùng ở lại trang web** và hướng họ đến đúng nơi họ cần.
  ***
  - **1. Trang 404 Tùy Chỉnh (The Custom 404 Page)**
    Đây là một trang HTML bình thường, nhưng được thiết kế theo đúng nhận diện thương hiệu (logo, màu sắc, menu) của trang web.
    Tưởng tượng:
    - **Lỗi 404 mặc định:** Giống như bạn đi vào một ngõ cụt và thấy một bức tường trắng với dòng chữ "Hết đường". Bạn sẽ quay lưng bỏ đi.
    - **Trang 404 tùy chỉnh:** Giống như bạn đi vào ngõ cụt, nhưng ở đó có một **hướng dẫn viên** 🗺️ thân thiện nói: "Rất tiếc, đây không phải đường, nhưng tôi có thể chỉ cho bạn lối về Trang chủ, hoặc bạn có muốn tìm kiếm thứ khác không?"
  ***
  - **2. Các yếu tố của một trang 404 tốt (Cách họ làm)**
    Các trang web lớn không chỉ hiển thị "Không tìm thấy". Họ cung cấp các công cụ để giúp người dùng:
    1. **Thông báo rõ ràng, thân thiện:** Dùng ngôn ngữ đơn giản, đôi khi hài hước. (Ví dụ: "Oops! Có vẻ bạn đã đi lạc.")
    2. **Liên kết điều hướng cốt lõi:** Luôn luôn có một link rõ ràng để quay về **Trang chủ**. Họ cũng có thể thêm các link quan trọng khác như "Sản phẩm", "Liên hệ", hoặc "Blog".
    3. **Thanh tìm kiếm (Quan trọng nhất):** Đây là cách tốt nhất để giữ người dùng. Họ cho phép người dùng tìm kiếm lại thứ họ muốn ngay trên trang lỗi.
    4. **Giữ vững thương hiệu:** Họ thường thiết kế trang 404 rất sáng tạo để tạo ấn tượng tốt, biến một trải nghiệm tiêu cực (bị lỗi) thành một trải nghiệm tích cực (thú vị).
  ***
  - **3. Kỹ thuật nâng cao: Chuyển hướng (Redirects)**
    Đối với các URL không hợp lệ _do gõ nhầm_, các trang web lớn thường đủ thông minh để tự sửa lỗi.
    - **Ví dụ 1 (Sửa lỗi gõ nhầm):** Nếu bạn gõ `amazon.com/prducts` (sai chữ 'o'), server của Amazon có thể sẽ tự động "đoán" bạn muốn đến `amazon.com/products` và **chuyển hướng (redirect)** bạn đến đó.
    - **Ví dụ 2 (Link cũ):** Nếu họ đổi tên một sản phẩm (URL cũ: `/ao-thun-cu`, URL mới: `/ao-thun-moi`), họ sẽ thiết lập một **chuyển hướng 301** để bất kỳ ai truy cập link cũ đều tự động được đưa đến link mới.
  ***
  - **4. Cách làm trong SPA (Vue Router)**
    Trong một ứng dụng Vue (SPA) sử dụng `vue-router` (đặc biệt là với `createWebHistory`), server đã được cấu hình để trỏ mọi thứ về `index.html`.
    Vì vậy, `vue-router` phải tự xử lý các URL không khớp. Cách làm là tạo ra một **route "bắt tất cả" (catch-all)** và đặt nó ở **cuối cùng** trong danh sách `routes` của bạn.
    **Ví dụ (`router/index.js`):**
    JavaScript
    ```jsx
    import { createRouter, createWebHistory } from 'vue-router'
    import HomeView from '../views/HomeView.vue'
    import AboutView from '../views/AboutView.vue'
    import NotFoundView from '../views/NotFoundView.vue' // 1. Tạo component 404

    const routes = [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'about',
        component: AboutView
      },
      // 3. ĐẶT ROUTE NÀY Ở CUỐI CÙNG
      // Nó sẽ "bắt" BẤT KỲ URL nào không khớp với các route bên trên
      {
        path: '/:pathMatch(.*)*', // (.*)* là một regex "bắt tất cả"
        name: 'NotFound',
        component: NotFoundView // 2. Trỏ đến component 404 của bạn
      }
    ]

    const router = createRouter({
      history: createWebHistory(),
      routes
    })

    export default router
    ```
- nested route
  Nested routes (tuyến đường lồng nhau) là một tính năng của `vue-router` cho phép bạn **đặt một `<router-view>` bên trong một component của `<router-view>` khác**.
  Nó được dùng để xây dựng các giao diện phức tạp nơi các phần của trang được lồng vào nhau, ví dụ như trang cài đặt, trang hồ sơ người dùng.
  ***
  - **Phép so sánh: Búp bê Nga 🪆**
    Hãy tưởng tượng trang web của bạn là một con búp bê Nga:
    - **`<router-view>` chính (trong `App.vue`):** Là con búp bê lớn nhất. Nó có thể chứa `UserView`.
    - **`UserView` (Component Cha):** Là con búp bê cỡ vừa. Nó hiển thị thông tin chung (như tên) và có một "chỗ trống" bên trong nó.
    - **`<router-view>` lồng nhau:** Chính là "chỗ trống" bên trong con búp bê cỡ vừa.
    - **Các route con (`Profile`, `Posts`):** Là những con búp bê nhỏ nhất, được đặt vào "chỗ trống" đó.
  ***
  - **Khi nào dùng?**
    Khi bạn có một component layout chung và chỉ muốn thay đổi một phần nội dung bên trong nó.
    - **Trang hồ sơ người dùng:**
      - `/user/1` (Hiển thị layout chung của người dùng 1)
      - `/user/1/profile` (Hiển thị chi tiết hồ sơ bên trong layout chung)
      - `/user/1/posts` (Hiển thị các bài viết bên trong layout chung)
    - **Trang cài đặt:**
      - `/settings` (Layout chung với menu bên trái)
      - `/settings/account` (Hiển thị form tài khoản ở bên phải)
      - `/settings/security` (Hiển thị form bảo mật ở bên phải)
  ***
  - **Cách cấu hình (2 bước chính)**
    - **Bước 1: Cấu hình `children` trong Router**
      Trong file `router/index.js`, bạn định nghĩa các route con bằng cách thêm một mảng `children` vào route cha.
      ```jsx
      // router/index.js
      import UserView from '../views/UserView.vue'
      import UserProfile from '../views/UserProfile.vue'
      import UserPosts from '../views/UserPosts.vue'

      const routes = [
        {
          // 1. Đây là route cha
          path: '/user/:id',
          name: 'user',
          component: UserView, // Component cha (con búp bê vừa)

          // 2. Đây là các route con (lồng nhau)
          children: [
            {
              // Khi URL là /user/:id/profile
              path: 'profile', // Không có dấu '/' ở đầu
              name: 'user-profile',
              component: UserProfile // Component con (búp bê nhỏ)
            },
            {
              // Khi URL là /user/:id/posts
              path: 'posts',
              name: 'user-posts',
              component: UserPosts // Component con khác (búp bê nhỏ)
            }
          ]
        }
      ]
      ```
    - **Bước 2: Thêm `<router-view>` lồng nhau**
      Trong template của component cha (`UserView.vue`), bạn phải đặt một thẻ `<router-view>` thứ hai để chỉ định nơi các component con sẽ được render.
      ```jsx
      <template>
        <div>
          <h1>Hồ sơ người dùng: {{ $route.params.id }}</h1>
          <nav>
            <router-link :to="`/user/${$route.params.id}/profile`">Chi tiết</router-link> |
            <router-link :to="`/user/${$route.params.id}/posts`">Bài viết</router-link>
          </nav>

          <hr>

          <router-view></router-view>

        </div>
      </template>
      ```
  ***
  - **Lưu ý quan trọng**
    - **Phải có `<router-view>` lồng nhau:** Nếu bạn cấu hình `children` trong router mà lại quên thêm `<router-view>` vào component cha (`UserView.vue`), các component con (`UserProfile`, `UserPosts`) sẽ **không bao giờ hiển thị**.
    - **Đường dẫn (Path) của con:** Đường dẫn của route con **không** có dấu `/` ở đầu. `'profile'` là đúng, `'/profile'` là sai (vì nó sẽ trở thành route cấp cao nhất).
- query param
  Query parameters (hay query params) là những cặp **`key=value`** bạn thấy ở cuối URL, bắt đầu sau dấu chấm hỏi (`?`) và ngăn cách nhau bởi dấu và (`&`).
  Chúng được dùng để **gửi thêm thông tin** hoặc tùy chọn cho trang web mà không làm thay đổi đường dẫn chính.
  ***
  - **Phép so sánh: Gọi món ăn 🍕**
    Hãy tưởng tượng URL chính (`/pizza`) giống như bạn gọi món "Pizza". Query parameters giống như các **yêu cầu thêm** bạn ghi chú cho đầu bếp:
    - `/pizza` (Chỉ gọi pizza)
    - `/pizza**?size=large&topping=cheese&extra=pepperoni**` (Gọi pizza cỡ lớn, thêm phô mai, thêm xúc xích pepperoni)
    Các yêu cầu thêm (`size=large`, `topping=cheese`) không làm thay đổi món chính (vẫn là pizza), nhưng nó cung cấp thêm chi tiết.
  ***
  - **Mục đích sử dụng**
    Query parameters rất hữu ích cho:
    - **Lọc (Filtering):** `/products?category=electronics&brand=sony` (Lọc sản phẩm điện tử của Sony)
    - **Sắp xếp (Sorting):** `/users?sortBy=name&order=asc` (Sắp xếp người dùng theo tên tăng dần)
    - **Phân trang (Pagination):** `/articles?page=2&limit=10` (Hiển thị trang 2, mỗi trang 10 bài viết)
    - **Tìm kiếm (Searching):** `/search?q=vue+router` (Tìm kiếm từ khóa "vue router")
    - **Tracking (Theo dõi):** `/landing-page?utm_source=facebook&utm_medium=cpc` (Theo dõi nguồn truy cập từ quảng cáo Facebook)
    - **Lưu trạng thái UI:** `/dashboard?showSidebar=false` (Ẩn thanh sidebar)
  ***
  - **Cách truy cập trong Vue Router**
    Trong component Vue, bạn có thể truy cập các query parameters thông qua đối tượng `$route.query`.
    Ví dụ:
    Nếu URL của bạn là: /search?q=vuejs&type=repositories
    Trong component của bạn:
    ```jsx
    <template>
      <div>
        <p>Bạn đang tìm kiếm: {{ searchQuery }}</p>
        <p>Loại tìm kiếm: {{ searchType }}</p>
      </div>
    </template>

    <script>
    export default {
      computed: {
        searchQuery() {
          // Truy cập giá trị của param 'q'
          return this.$route.query.q;
        },
        searchType() {
          // Truy cập giá trị của param 'type'
          return this.$route.query.type;
        }
      },
      mounted() {
        console.log('Query params:', this.$route.query);
        // Output: { q: 'vuejs', type: 'repositories' }
      }
    }
    </script>
    ```
    **Lưu ý:** `$route.query` là một đối tượng JavaScript chứa tất cả các query parameters dưới dạng key-value.
- controlling scrolling behavior
  Kiểm soát hành vi cuộn (Controlling Scrolling Behavior) là một tính năng của `vue-router` cho phép bạn tùy chỉnh **vị trí cuộn của trang** khi người dùng điều hướng giữa các route.
  Trong các ứng dụng SPA (Single Page Application), khi bạn chuyển đổi giữa các component, trình duyệt mặc định **không tự động cuộn lên đầu trang** như các trang web truyền thống. Điều này có thể gây khó chịu cho người dùng. `vue-router` cung cấp một hàm `scrollBehavior` để bạn giải quyết vấn đề này.
  - **Tại sao cần kiểm soát?**
    - **Trải nghiệm người dùng nhất quán:** Người dùng thường mong đợi được cuộn lên đầu khi họ điều hướng đến một "trang" mới.
    - **Điều hướng Back/Forward:** Khi người dùng bấm nút "Back" hoặc "Forward" của trình duyệt, họ mong muốn trang được cuộn về đúng vị trí họ đã xem trước đó.
    - **Điều hướng đến Hash:** Khi click vào một link có hash (ví dụ: `/page#section`), bạn muốn trang tự động cuộn đến phần tử có ID là `section`.
  - **Cách dùng: Hàm `scrollBehavior`**
    Bạn định nghĩa hàm này khi khởi tạo router (`createRouter`). Hàm này nhận vào 3 đối số:
    - `to`: Route sắp tới (nơi bạn đang điều hướng _đến_).
    - `from`: Route hiện tại (nơi bạn đang điều hướng _đi_).
    - `savedPosition`: Một đối tượng `{ left: number, top: number }` chứa vị trí cuộn đã được lưu lại khi người dùng rời khỏi route `from` (chỉ tồn tại khi điều hướng bằng nút Back/Forward).
    Hàm này phải trả về một đối tượng mô tả vị trí cuộn mong muốn, hoặc `false` nếu bạn không muốn cuộn.
  - **Ví dụ phổ biến (`router/index.js`)**
    Đây là cách cấu hình `scrollBehavior` để xử lý 3 trường hợp phổ biến nhất:
    ```jsx
    import { createRouter, createWebHistory } from 'vue-router'
    // ... import các routes ...

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        /* ... */
      ],

      // ĐÂY LÀ PHẦN QUAN TRỌNG
      scrollBehavior(to, from, savedPosition) {
        // 1. Nếu có vị trí đã lưu (người dùng bấm Back/Forward)
        if (savedPosition) {
          // Trả về đúng vị trí đó
          return savedPosition
        }
        // 2. Nếu route sắp tới có hash (ví dụ: #section)
        else if (to.hash) {
          // Cuộn đến phần tử có ID tương ứng
          return {
            el: to.hash, // Sử dụng selector CSS
            behavior: 'smooth' // Thêm hiệu ứng cuộn mượt (tùy chọn)
          }
        }
        // 3. Mặc định (điều hướng đến trang mới)
        else {
          // Luôn cuộn lên đầu trang
          return { left: 0, top: 0 }
        }
      }
    })

    export default router
    ```
  - **Giải thích ví dụ:**
    1. **Ưu tiên `savedPosition`:** Nếu `savedPosition` tồn tại (do bấm Back/Forward), hàm sẽ trả về ngay vị trí đó, mô phỏng hành vi tự nhiên của trình duyệt.
    2. **Kiểm tra `to.hash`:** Nếu không có `savedPosition` nhưng URL mới có hash (`#`), nó sẽ trả về một đối tượng yêu cầu cuộn đến phần tử có `id` khớp với hash đó (`el: to.hash`). `behavior: 'smooth'` là tùy chọn để làm hiệu ứng cuộn mượt mà hơn.
    3. **Mặc định cuộn lên đầu:** Trong mọi trường hợp còn lại (điều hướng thông thường đến một trang mới), hàm trả về `{ left: 0, top: 0 }`, yêu cầu cuộn lên vị trí trên cùng bên trái của trang.
    **Lợi ích:** Hàm `scrollBehavior` giúp ứng dụng SPA của bạn hoạt động giống như một trang web truyền thống về mặt cuộn trang, mang lại trải nghiệm người dùng tốt hơn.
- navigation guard
  Navigation guards là các hàm do `vue-router` cung cấp cho phép bạn **can thiệp vào quá trình điều hướng** trước khi nó xảy ra hoặc ngay sau khi nó hoàn thành.
  Hãy tưởng tượng chúng như những **nhân viên bảo vệ** 💂 đứng ở lối vào của mỗi route (URL). Trước khi cho phép ai đó đi qua (render component), người bảo vệ có thể kiểm tra "vé" của họ (ví dụ: đã đăng nhập chưa?) hoặc thực hiện một hành động nào đó.
  ***
  - Tại sao lại dùng Navigation Guards?
    Các công dụng phổ biến nhất là:
    - **Xác thực (Authentication):** Ngăn chặn người dùng chưa đăng nhập truy cập vào các route nhất định (như `/profile` hoặc `/settings`).
    - **Phân quyền (Authorization):** Kiểm tra xem người dùng đã đăng nhập có _quyền_ cần thiết để truy cập một route cụ thể không (ví dụ: trang chỉ dành cho quản trị viên).
    - **Lấy dữ liệu (Data Fetching):** Lấy dữ liệu cần thiết cho một route _trước khi_ component thực sự được render.
    - **Ghi log/Phân tích (Logging/Analytics):** Theo dõi các route mà người dùng đang truy cập.
    - **Ngăn chặn thay đổi chưa lưu:** Hỏi xác nhận người dùng nếu họ cố gắng rời khỏi trang có thay đổi chưa lưu trong form.
  ***
  - Cách hoạt động (Hàm `next()`)
    Navigation guards hoạt động bằng cách sử dụng một hàm đặc biệt gọi là `next()`. Hàm này **phải được gọi chính xác một lần** bên trong guard để giải quyết hook. Cách bạn gọi `next()` quyết định điều gì sẽ xảy ra:
    - **`next()`:** Cho phép điều hướng tiếp tục như kế hoạch. (✅ "Bạn có thể đi qua.")
    - **`next(false)`:** Hủy bỏ điều hướng hiện tại. (❌ "Dừng lại! Bạn không thể đi đến đó.")
    - **`next('/login')`** hoặc **`next({ name: 'login' })`:** Chuyển hướng người dùng đến một route khác. (↩️ "Bạn cần đến trang đăng nhập trước.")
  ***
  - Các loại Guard
    - 1. Global Guards (Phổ biến nhất)
      Các guard này chạy cho **mọi thay đổi route** trong ứng dụng của bạn. Bạn định nghĩa chúng trực tiếp trên đối tượng router.
      - **`router.beforeEach((to, from, next) => { ... })`:** Chạy _trước_ mọi điều hướng. Hoàn hảo cho việc kiểm tra xác thực.
      - **`router.beforeResolve((to, from, next) => { ... })`:** Chạy _sau_ tất cả các guard trong component nhưng _trước khi_ điều hướng được xác nhận. Hữu ích để lấy dữ liệu.
      - **`router.afterEach((to, from) => { ... })`:** Chạy _sau khi_ điều hướng đã hoàn thành. Tốt cho việc phân tích. Lưu ý: `afterEach` không nhận hàm `next`.
        **Ví dụ (Kiểm tra xác thực trong `router/index.js`):**
        ```jsx
        router.beforeEach((to, from, next) => {
          // Kiểm tra xem route sắp tới có yêu cầu đăng nhập không
          const requiresAuth = to.matched.some(
            record => record.meta.requiresAuth
          )
          // Kiểm tra trạng thái đăng nhập (ví dụ đơn giản)
          const isLoggedIn = !!localStorage.getItem('user-token')

          if (requiresAuth && !isLoggedIn) {
            // Nếu route cần đăng nhập và người dùng chưa đăng nhập, chuyển hướng đến login
            next({ name: 'Login' })
          } else {
            // Nếu không, cho phép điều hướng
            next()
          }
        })

        // Định nghĩa route nào cần xác thực
        const routes = [
          {
            path: '/profile',
            component: Profile,
            meta: { requiresAuth: true } // Đánh dấu route này
          },
          { path: '/login', name: 'Login', component: Login }
        ]
        ```
    - 2. Per-Route Guards
      Được định nghĩa trực tiếp trong cấu hình của một route cụ thể. Chỉ chạy khi điều hướng _đến_ route đó.
      ```jsx
      const routes = [
        {
          path: '/admin',
          component: AdminPanel,
          beforeEnter: (to, from, next) => {
            // Kiểm tra xem người dùng có phải là admin không trước khi vào '/admin'
            if (isAdmin()) {
              next()
            } else {
              next({ name: 'Unauthorized' })
            }
          }
        }
      ]
      ```
    - 3. In-Component Guards
      Được định nghĩa trực tiếp bên trong file component. Hữu ích cho logic cụ thể của component đó, như kiểm tra thay đổi chưa lưu trước khi rời đi.
      - **`beforeRouteEnter(to, from, next)`:** Chạy _trước khi_ component được tạo. **Không thể truy cập `this`**.
      - **`beforeRouteUpdate(to, from, next)`:** Chạy khi route thay đổi nhưng _component này được tái sử dụng_ (ví dụ: đi từ `/user/1` đến `/user/2`). Có thể truy cập `this`.
      - **`beforeRouteLeave(to, from, next)`:** Chạy khi điều hướng _ra khỏi_ route render component này. Hoàn hảo cho cảnh báo "thay đổi chưa lưu". Có thể truy cập `this`.
      **Ví dụ (Cảnh báo thay đổi chưa lưu):**
      Code snippet
      ```jsx
      <script>
      export default {
        data() {
          return {
            isFormDirty: false // Theo dõi xem form có thay đổi không
          }
        },
        beforeRouteLeave(to, from, next) {
          if (this.isFormDirty) {
            const answer = window.confirm('Bạn có thực sự muốn rời đi? Bạn có những thay đổi chưa được lưu!');
            if (answer) {
              next(); // Cho phép rời đi
            } else {
              next(false); // Ở lại trang
            }
          } else {
            next(); // Không có thay đổi chưa lưu, cho phép rời đi
          }
        }
      }
      </script>
      ```
- meta data
  `meta` data trong Vue Router cho phép bạn đính kèm **thông tin tùy chỉnh** vào một định nghĩa route cụ thể. Hãy tưởng tượng nó như một tờ **giấy ghi chú** 🏷️ bạn dán vào một vị trí trên bản đồ (`route`) để lưu trữ các chi tiết bổ sung không phải là địa chỉ chính (`path`, `component`).
  ***
  - **Tại sao dùng `meta`?**
    Nó thường được sử dụng cho:
    - **Xác thực/Phân quyền:** Đánh dấu các route yêu cầu người dùng phải đăng nhập (`meta: { requiresAuth: true }`) hoặc có quyền cụ thể (`meta: { requiresAdmin: true }`).
    - **Kiểm soát Layout:** Chỉ định component layout nào sẽ bao bọc view của route (`meta: { layout: 'AdminLayout' }`).
    - **Breadcrumbs:** Lưu trữ thông tin cần thiết để tạo breadcrumb điều hướng (`meta: { breadcrumb: 'Hồ sơ người dùng' }`).
    - **Tiêu đề trang:** Xác định tiêu đề sẽ hiển thị trên tab trình duyệt (`meta: { title: 'Hồ sơ của tôi' }`).
  ***
  - **Cách định nghĩa và truy cập `meta`**
    Bạn định nghĩa `meta` là một đối tượng bên trong cấu hình route của bạn. Sau đó, bạn có thể truy cập đối tượng này trong navigation guards hoặc bên trong các component.
    - **Định nghĩa `meta` (`router/index.js`)**
      ```jsx
      const routes = [
        {
          path: '/',
          name: 'Home',
          component: HomeView,
          meta: { title: 'Trang chủ' } // Dữ liệu meta đơn giản
        },
        {
          path: '/profile',
          name: 'Profile',
          component: ProfileView,
          // Dữ liệu meta phức tạp hơn cho việc phân quyền
          meta: {
            requiresAuth: true,
            permissions: ['view_profile']
          }
        },
        {
          path: '/admin',
          name: 'AdminDashboard',
          component: AdminDashboard,
          meta: {
            requiresAuth: true,
            layout: 'AdminLayout' // Chỉ định một layout khác
          }
        }
      ]
      ```
    - **Truy cập `meta` trong Navigation Guards (`router/index.js`)**
      Đây là trường hợp sử dụng phổ biến nhất, đặc biệt là để xác thực.
      ```jsx
      router.beforeEach((to, from, next) => {
        // Kiểm tra xem route có yêu cầu đăng nhập không
        if (to.meta.requiresAuth && !isLoggedIn()) {
          next({ name: 'Login' }) // Chuyển hướng đến login nếu chưa đăng nhập
        } else {
          next() // Cho phép đi tiếp
        }

        // Ví dụ: Tự động đặt tiêu đề tài liệu
        if (to.meta.title) {
          document.title = `Ứng dụng của tôi - ${to.meta.title}`
        } else {
          document.title = 'Ứng dụng của tôi'
        }
      })
      ```
      - **`to.meta`**: Truy cập đối tượng `meta` của route bạn đang điều hướng **đến**.
      - **`to.matched.some(record => record.meta.requiresAuth)`**: Đây là cách kiểm tra `meta` mạnh mẽ hơn, đặc biệt với các route lồng nhau, vì nó kiểm tra `meta` của tất cả các bản ghi route khớp.
    - **Truy cập `meta` trong Components**
      Bạn có thể truy cập thông tin meta của route hiện tại thông qua `$route.meta`.
      ```jsx
      <template>
        <div>
          <h1>{{ pageTitle }}</h1>
          </div>
      </template>

      <script>
      export default {
        computed: {
          pageTitle() {
            // Truy cập trường meta của route hiện tại
            return this.$route.meta.title || 'Tiêu đề mặc định';
          }
        }
      }
      </script>
      ```
