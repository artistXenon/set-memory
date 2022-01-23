import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'

const a = createApp(App)
a.config.globalProperties.$store = store
a.config.globalProperties.$state = store.state
a.config.globalProperties.$api_domain = 'http://localhost:3003'
a.config.globalProperties.$page_domain = 'http://localhost:8080'
a.use(router).mount('#app')