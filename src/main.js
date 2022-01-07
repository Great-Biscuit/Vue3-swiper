import { createApp } from 'vue'
import App from './App.vue'

import './assets/reset.css'

import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(VueViewer)
app.use(ElementPlus)
app.mount('#app')


