# Cấu Trúc Thư Mục - First Vue App

## Mô Tả Chung

Đây là một dự án Vue.js 3 được tạo bằng Vue CLI, sử dụng để học tập và phát triển ứng dụng web với Vue.js.

## Cấu Trúc Thư Mục

### 📁 Root Directory (/)

#### 📄 Các File Cấu Hình

| File              | Mục Đích                                            | Lưu Ý                                                                 |
| ----------------- | --------------------------------------------------- | --------------------------------------------------------------------- |
| `package.json`    | Quản lý dependencies, scripts và metadata của dự án | **Quan trọng**: Chứa thông tin về Vue 3.2.13 và các script chạy dự án |
| `babel.config.js` | Cấu hình Babel để transpile JavaScript ES6+         | Sử dụng preset Vue CLI mặc định                                       |
| `vue.config.js`   | Cấu hình Vue CLI và webpack                         | Hiện tại chỉ bật `transpileDependencies`                              |
| `jsconfig.json`   | Cấu hình JavaScript/TypeScript cho IDE              | Thiết lập alias `@/*` trỏ đến `src/*`                                 |
| `.gitignore`      | Loại trừ file/folder khỏi Git tracking              | Bao gồm node_modules, dist, etc.                                      |
| `README.md`       | Tài liệu hướng dẫn dự án                            | Chứa thông tin cơ bản về dự án                                        |

### 📁 public/

Thư mục chứa các file tĩnh sẽ được copy trực tiếp vào output

| File          | Mục Đích                       | Lưu Ý                                                        |
| ------------- | ------------------------------ | ------------------------------------------------------------ |
| `index.html`  | Template HTML chính            | **Quan trọng**: Chứa `<div id="app"></div>` để mount Vue app |
| `favicon.ico` | Icon hiển thị trên tab browser | File icon mặc định                                           |

**🔍 Lưu ý về public/:**

- File trong thư mục này được serve trực tiếp
- Không qua quá trình build/optimization
- Truy cập bằng đường dẫn tuyệt đối từ root (/)

### 📁 src/

Thư mục chứa source code chính của ứng dụng

#### 📄 File Chính

| File      | Mục Đích                   | Lưu Ý                                                          |
| --------- | -------------------------- | -------------------------------------------------------------- |
| `main.js` | Entry point của ứng dụng   | **Quan trọng**: Import Vue, tạo app instance và mount vào #app |
| `App.vue` | Component gốc của ứng dụng | Single File Component chứa template, script, style             |

**🔍 Chi tiết main.js:**

```javascript
import { createApp } from 'vue' // Import Vue 3 API
import App from './App.vue' // Import root component
createApp(App).mount('#app') // Tạo và mount app
```

**🔍 Chi tiết App.vue:**

- Template: Hiển thị logo Vue và component HelloWorld
- Script: Import và đăng ký component HelloWorld
- Style: CSS global cho toàn app

#### 📁 src/components/

Thư mục chứa các Vue components có thể tái sử dụng

| File             | Mục Đích                | Lưu Ý                                      |
| ---------------- | ----------------------- | ------------------------------------------ |
| `HelloWorld.vue` | Component demo mặc định | Hiển thị thông tin về Vue CLI và ecosystem |

**🔍 Lưu ý về components:**

- Đặt tên component theo PascalCase
- Mỗi component là một Single File Component (.vue)
- Nên tổ chức theo feature/module khi dự án lớn

#### 📁 src/assets/

Thư mục chứa các tài nguyên tĩnh (images, fonts, etc.)

| File       | Mục Đích        | Lưu Ý                     |
| ---------- | --------------- | ------------------------- |
| `logo.png` | Logo của Vue.js | Được import trong App.vue |

**🔍 Lưu ý về assets:**

- File trong thư mục này sẽ được webpack xử lý
- Có thể được optimize (compress, hash filename)
- Import bằng relative path hoặc alias `@/assets`

## 🚀 Scripts Quan Trọng

| Script          | Lệnh                    | Mục Đích                               |
| --------------- | ----------------------- | -------------------------------------- |
| `npm run serve` | `vue-cli-service serve` | Chạy development server với hot-reload |
| `npm run build` | `vue-cli-service build` | Build production với optimization      |
| `npm run lint`  | `vue-cli-service lint`  | Kiểm tra và fix lỗi ESLint             |

## ⚡ Cách Chạy Dự Án

1. **Cài đặt dependencies:**

   ```bash
   npm install
   ```

2. **Chạy development server:**

   ```bash
   npm run serve
   ```

   - Mở browser tại `http://localhost:8080`
   - Có hot-reload tự động

3. **Build cho production:**
   ```bash
   npm run build
   ```
   - Output sẽ được tạo trong folder `dist/`

## 🔧 Công Nghệ Sử Dụng

- **Vue.js 3.2.13**: Framework JavaScript progressive
- **Vue CLI 5.0**: Tool để tạo và quản lý dự án Vue
- **Babel**: Transpiler JavaScript ES6+
- **ESLint**: Linter để kiểm tra code quality
- **Webpack**: Module bundler (được tích hợp trong Vue CLI)

## 📝 Quy Tắc Development

1. **File Naming:**

   - Components: PascalCase (VD: `MyComponent.vue`)
   - Assets: kebab-case (VD: `my-image.png`)

2. **Import:**

   - Sử dụng alias `@` thay vì `./src`
   - VD: `import Component from '@/components/Component.vue'`

3. **Code Style:**
   - Tuân theo ESLint rules được cấu hình
   - Chạy `npm run lint` để kiểm tra

## 🎯 Mở Rộng Dự Án

Khi phát triển thêm, có thể tạo các thư mục:

- `src/views/` - Các page components
- `src/router/` - Vue Router configuration
- `src/store/` - Vuex/Pinia state management
- `src/utils/` - Utility functions
- `src/services/` - API services
- `src/composables/` - Vue 3 Composition API composables

## 🚨 Lưu Ý Quan Trọng

1. **Không edit trực tiếp file trong `public/`** trừ khi cần thiết
2. **Main.js là entry point duy nhất** - mọi thay đổi ở đây ảnh hưởng toàn app
3. **Assets vs Public**: Assets được webpack xử lý, Public được copy trực tiếp
4. **Vue 3 Composition API**: Có thể sử dụng thay vì Options API
5. **Hot Reload**: Chỉ hoạt động trong development mode
