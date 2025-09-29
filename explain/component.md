# 1. Khái niệm

Props (viết tắt của _properties_) là cách để truyền dữ liệu từ component cha xuống component con.
Đây là cơ chế giao tiếp cơ bản và quan trọng nhất giữa các component trong Vue.

# 2. Khi nào dùng Props?

Bạn dùng props bất cứ khi nào một component cha cần gửi thông tin cho component con để nó hiển thị hoặc hoạt động.

# 3. Những điều cần lưu ý khi dùng 📝

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

### 🔹 So sánh: Nói hai ngôn ngữ

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

✅ **Chốt lại:**

- JavaScript → dùng **camelCase** (`mailAddress`)
- HTML → dùng **kebab-case** (`mail-address`)

Vue sẽ tự động xử lý phần còn lại cho bạn.
