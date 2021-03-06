import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import global from './global'

const a = createApp(App)
a.config.globalProperties = global
a.config.globalProperties.$store = store
a.config.globalProperties.$state = store.state
a.use(router).mount('#app')

export default a