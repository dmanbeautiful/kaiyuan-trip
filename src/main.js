import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "normalize.css"
import "./assets/CSS/index.css"
import pinia from './stores'

createApp(App).use(router).use(pinia).mount('#app')
