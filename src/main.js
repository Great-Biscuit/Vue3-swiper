import { createApp } from 'vue'
import App from './App.vue'

import './assets/reset.css'

import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

const app = createApp(App)
app.use(VueViewer)
app.mount('#app')


