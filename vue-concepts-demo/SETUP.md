# 🎯 Hướng Dẫn Cài Đặt và Chạy Project

## Bước 1: Cài đặt Dependencies

```bash
cd vue-concepts-demo
npm install
```

## Bước 2: Chạy Development Server

```bash
npm run serve
```

Mở trình duyệt và truy cập: `http://localhost:8080`

## Bước 3: Khám phá các Demo

Project bao gồm 7 phần demo chính:

### 1️⃣ V-Bind, V-Model, V-On

- Thử thay đổi input để xem v-model
- Click buttons để xem v-on
- Toggle các checkbox để xem v-bind với :class

### 2️⃣ Computed vs Method

- **Quan trọng**: Mở Console (F12) để xem logs
- Gõ tên để thấy cả Computed và Method chạy
- Click "Tăng Counter" để thấy chỉ Method chạy lại (Computed không chạy do có caching)

### 3️⃣ V-For và :key

- Thêm/xóa sản phẩm
- Click "Xáo trộn" và "Sắp xếp" để thấy tầm quan trọng của :key

### 4️⃣ Watcher

- **Quan trọng**: Mở Console để xem logs
- Gõ từ khóa tìm kiếm (ví dụ: "laptop")
- Xem debounce hoạt động (chờ 800ms sau lần gõ cuối)
- Thay đổi tên/email để thấy deep watch

### 5️⃣ V-If vs V-Show

- Toggle cả 2 loại
- Mở Inspector (F12 → Elements) để xem DOM
- V-If: Element biến mất khỏi DOM
- V-Show: Element vẫn có, chỉ `display: none`

### 6️⃣ Props và Emit

- Thay đổi input để xem props cập nhật real-time
- Click buttons trong Counter Child
- Xem Parent nhận events và cập nhật

### 7️⃣ Provide/Inject

- Chọn theme khác nhau
- Thay đổi tên user
- Xem Grandchild component tự động cập nhật (không cần truyền qua Parent)

## 💡 Tips

- **Luôn mở Console**: Nhiều demo có console.log để giải thích
- **Đọc comments trong code**: Mọi đoạn code đều có giải thích
- **Thử nghiệm**: Click tất cả buttons, gõ vào inputs để hiểu rõ

## 🐛 Troubleshooting

### Lỗi: "Cannot find module 'vue'"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 8080 đã được sử dụng

```bash
npm run serve -- --port 8081
```

### Lỗi ESLint

Project đã config ESLint. Nếu có warning, có thể ignore hoặc fix:

```bash
npm run lint
```

## 📚 Học thêm

Sau khi chạy xong tất cả demo, hãy:

1. Đọc kỹ code trong từng component
2. Thử modify và xem kết quả
3. Tạo thêm features mới
4. Đọc lại document.md để củng cố kiến thức

---

**Chúc bạn học tốt! 🚀**
