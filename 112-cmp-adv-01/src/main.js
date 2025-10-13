import { createApp } from 'vue'

import App from './App.vue'
// import TheHeader from './components/TheHeader.vue'
import BaseBadge from './components/BaseBadge.vue'
// import BadgeList from './components/BadgeList.vue';
// import UserInfo from './components/UserInfo.vue'

const app = createApp(App)

// app.component('the-header', TheHeader); use only inside App.vue -> no need to register globally
app.component('base-badge', BaseBadge)
// app.component('badge-list', BadgeList); use only inside App.vue -> no need to register globally
// app.component('user-info', UserInfo) // use only inside App.vue -> no need to register globally

app.mount('#app')
