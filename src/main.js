import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'

import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'
import 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'

import './move.js'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia, router)
app.use(router)

app.mount('#app')
