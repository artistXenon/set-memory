import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const a = createApp(App)
a.use(router).mount('#app')
a.config.globalProperties.$api_domain = 'http://localhost:3003'
a.config.globalProperties.$page_domain = 'http://localhost:8080'