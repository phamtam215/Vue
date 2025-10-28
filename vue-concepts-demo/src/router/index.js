// ============================================
// ROUTER CONFIGURATION - CẤU HÌNH ĐỊNH TUYẾN
// ============================================

// ROUTING LÀ GÌ?
// Routing cho phép tạo Single Page Application (SPA) - ứng dụng chỉ load 1 lần
// Thay vì reload toàn bộ trang, chỉ hoán đổi component tương ứng với URL mới
// Ví dụ: /home → HomeView, /about → AboutView

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import NotFoundView from '../views/NotFoundView.vue'

// ============================================
// 1. ĐỊNH NGHĨA ROUTES (Bản đồ đường đi)
// ============================================
// Mỗi route là 1 object có: path (URL), name (tên), component (hiển thị gì)
const routes = [
  {
    // Route cơ bản - Static route
    path: '/', // URL path
    name: 'Home', // Tên route (dùng cho programmatic navigation)
    component: HomeView, // Component hiển thị
    meta: { title: 'Trang chủ' } // Meta data - thông tin bổ sung
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { title: 'Giới thiệu' }
  },
  {
    // ============================================
    // DYNAMIC ROUTE - Route có tham số động
    // ============================================
    // :id là dynamic segment - có thể nhận bất kỳ giá trị nào
    // VD: /user/1, /user/123, /user/abc đều match với route này
    path: '/user/:id',
    name: 'UserProfile',
    component: UserProfileView,
    meta: { title: 'Hồ sơ người dùng' },

    // ============================================
    // NAVIGATION GUARD - Per-Route Guard
    // ============================================
    // beforeEnter chạy TRƯỚC khi vào route này
    // Dùng để: validate params, check quyền, redirect...
    beforeEnter: (to, from, next) => {
      // to: route đích (đang đến)
      // from: route nguồn (đang rời)
      // next: function để tiếp tục navigation

      console.log('🔒 beforeEnter guard:', to.params.id)

      // Validation: kiểm tra user ID phải là số
      if (isNaN(to.params.id)) {
        alert('❌ User ID phải là số!')
        next('/') // Chặn và redirect về home
      } else {
        next() // Cho phép vào route
      }
    }
  },
  {
    // ============================================
    // CATCH-ALL ROUTE - Bắt tất cả URL không match
    // ============================================
    // Pattern :pathMatch(.*)*  bắt mọi path không khớp với routes trên
    // VD: /invalid, /abc/xyz, /not-found... đều vào đây
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { title: '404 - Không tìm thấy' }
  }
]

// ============================================
// 2. TẠO ROUTER INSTANCE
// ============================================
const router = createRouter({
  // ============================================
  // HISTORY MODE - Chế độ lịch sử
  // ============================================
  // createWebHistory: URL "thật" không có # (VD: example.com/about)
  //   - Ưu: URL đẹp, SEO tốt
  //   - Nhược: Cần cấu hình server (khi F5 phải trả về index.html)
  //
  // createWebHashHistory: URL có # (VD: example.com/#/about)
  //   - Ưu: Không cần cấu hình server
  //   - Nhược: URL xấu hơn, phần sau # không gửi lên server
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// ============================================
// 3. GLOBAL NAVIGATION GUARDS
// ============================================

// beforeEach - Chạy TRƯỚC mỗi navigation (global)
// Dùng để: check authentication, logging, loading state...
router.beforeEach((to, from, next) => {
  // Log mỗi lần chuyển trang
  console.log(`🚀 Navigation: ${from.path} → ${to.path}`)

  // Cập nhật document title từ meta
  document.title = to.meta.title || 'Vue Concepts Demo'

  // QUAN TRỌNG: Phải gọi next() để tiếp tục navigation
  next()

  // Có thể dùng:
  // next(false) - Hủy navigation
  // next('/login') - Redirect đến path khác
  // next({ name: 'Home' }) - Redirect đến named route
})

// afterEach - Chạy SAU khi navigation hoàn thành
// Không có next() vì không thể can thiệp nữa
// Dùng để: analytics, scroll position, cleanup...
router.afterEach((to, from) => {
  console.log(`✅ Navigated to: ${to.path}`)

  // VD: Gửi page view đến Google Analytics
  // ga('send', 'pageview', to.path)
})

export default router
