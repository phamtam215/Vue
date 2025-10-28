# Vue Concepts Demo

Dự án demo toàn bộ các khái niệm Vue 3 từ document.md với các ví dụ tương tác và comment tiếng Việt.

## 📚 Các Khái Niệm Được Demo

### 1. V-Bind, V-Model, V-On (`VBindModelOnDemo.vue`)

- **v-bind (`:`)**: Binding one-way từ data → template
- **v-model**: Two-way binding cho form inputs
- **v-on (`@`)**: Event handling

### 2. Computed vs Methods (`ComputedVsMethod.vue`)

- So sánh **computed properties** (có cache) vs **methods** (không cache)
- Console logs để chứng minh caching behavior

### 3. V-For và :key (`VForDemo.vue`)

- Render lists với `v-for`
- Tầm quan trọng của `:key` cho performance
- CRUD operations trên list

### 4. Watchers (`WatcherDemo.vue`)

- Watch reactive data changes
- Async operations (search với debounce)
- Deep watch cho nested objects
- Race condition handling

### 5. V-If vs V-Show (`VIfVsVShow.vue`)

- **v-if**: Conditional rendering (lazy, destroy/recreate)
- **v-show**: Toggle CSS display (always in DOM)
- Performance comparison với toggle count

### 6. Props & Emit (`PropsEmitDemo.vue`)

- Parent → Child communication bằng **props**
- Child → Parent communication bằng **$emit**
- Components: `UserCard.vue`, `CounterChild.vue`

### 7. Provide/Inject (`ProvideInjectDemo.vue`)

- Giải quyết prop drilling
- Grandparent → Grandchild data flow
- Reactivity với function wrappers
- Component: `ProvideInjectChild.vue`

### 8. Slots (`SlotsDemo.vue`)

- **Default Slots**: Content composition cơ bản
- **Named Slots**: Multiple slots trong một component
- **Scoped Slots**: Child pass data back to parent
- Components: `slots/SimpleCard.vue`, `slots/PageLayout.vue`, `slots/UserList.vue`

### 9. Dynamic Components (`DynamicComponentDemo.vue`)

- Component switching với `<component :is="...">`
- **KeepAlive**: Cache component state
- So sánh có/không KeepAlive
- Lifecycle hooks: `activated/deactivated`
- Components: `dynamic/TabCounter.vue`, `dynamic/TabForm.vue`, `dynamic/TabSettings.vue`

### 10. Teleport (`TeleportDemo.vue`)

- Render component outside current DOM hierarchy
- Escape CSS stacking context (overflow, z-index, transform)
- Use cases: Modals, Tooltips, Notifications
- `<teleport to="body">`

### 11. Forms & v-model Modifiers (`FormsDemo.vue`)

- **v-model.trim**: Auto remove whitespace
- **v-model.number**: Auto convert to Number type
- **v-model.lazy**: Update on blur instead of input
- Input types: text, textarea, checkbox, radio, select
- Form validation với computed properties

### 12. Vue Router (`router/index.js` + Views)

- **Route Configuration**: path, name, component, meta
- **Navigation Guards**: beforeEach, afterEach, beforeEnter
- **Dynamic Routes**: `/user/:id` với params
- **Programmatic Navigation**: $router.push()
- **Named Routes**: Navigate by name
- **Query Parameters**: URL query strings
- **404 Handling**: Catch-all routes
- Views: `HomeView.vue`, `AboutView.vue`, `UserProfileView.vue`, `NotFoundView.vue`

## 🚀 Cài Đặt và Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run serve

# Build cho production
npm run build
```

## 📁 Cấu Trúc Project

```
vue-concepts-demo/
├── public/
│   └── index.html
├── src/
│   ├── main.js              # Entry point + Router setup
│   ├── App.vue              # Root component với navigation
│   ├── router/
│   │   └── index.js         # Router configuration
│   ├── views/               # Router views
│   │   ├── HomeView.vue
│   │   ├── AboutView.vue
│   │   ├── UserProfileView.vue
│   │   └── NotFoundView.vue
│   └── components/
│       ├── VBindModelOnDemo.vue
│       ├── ComputedVsMethod.vue
│       ├── VForDemo.vue
│       ├── WatcherDemo.vue
│       ├── VIfVsVShow.vue
│       ├── PropsEmitDemo.vue
│       ├── ProvideInjectDemo.vue
│       ├── SlotsDemo.vue
│       ├── DynamicComponentDemo.vue
│       ├── TeleportDemo.vue
│       ├── FormsDemo.vue
│       ├── props-emit/
│       │   ├── UserCard.vue
│       │   └── CounterChild.vue
│       ├── provide-inject/
│       │   └── ProvideInjectChild.vue
│       ├── slots/
│       │   ├── SimpleCard.vue
│       │   ├── PageLayout.vue
│       │   └── UserList.vue
│       └── dynamic/
│           ├── TabCounter.vue
│           ├── TabForm.vue
│           └── TabSettings.vue
├── package.json
└── README.md
```

## 💡 Ghi Chú

- Tất cả components đều có **comment tiếng Việt** dễ hiểu
- Mở **Console** để xem logs chi tiết (computed caching, watchers, lifecycle hooks, navigation guards)
- Mỗi component đều có ví dụ **tương tác** để test behavior
- Project cover **100% concepts** từ document.md

## 🎯 Mục Đích

Dự án này được tạo để:

1. Học và thực hành các khái niệm Vue 3
2. So sánh các approaches khác nhau (computed vs methods, v-if vs v-show, etc.)
3. Hiểu rõ data flow patterns (props, emit, provide/inject, slots)
4. Làm quen với Vue Router và navigation
5. Có reference code với comment tiếng Việt

## 📖 Tài Liệu Tham Khảo

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- document.md (source của tất cả concepts)
