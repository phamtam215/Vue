// 1. Import Vue's createApp function để tạo Vue application instance
import { createApp } from 'vue'

// 2. Import component FriendContact - Vue sẽ parse file .vue thành JavaScript object
// Behind the scenes: Vue compiler biến đổi template, script, style thành render function
import FriendContact from './components/FriendContact.vue'

// 3. Import root component App
import App from './App.vue'

// 4. Tạo Vue application instance với App làm root component
// Behind the scenes: Vue tạo component tree với App ở root
const app = createApp(App)

// 5. QUAN TRỌNG: Đăng ký component globally với tên 'friend-contact'
// Behind the scenes: Vue lưu component vào global component registry
// Bây giờ bất kỳ component nào cũng có thể sử dụng <friend-contact> tag
app.component('friend-contact', FriendContact)

// 6. Mount app vào DOM element với id="app"
// Behind the scenes: Vue thay thế <div id="app"></div> bằng rendered App component
app.mount('#app')
