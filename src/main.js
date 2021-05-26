import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import less from 'less'

const app = createApp(App)
app.use(less)
app.use(ElementPlus)
app.mount('#app')
