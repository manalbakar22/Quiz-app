//src/main.js

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies';
// import '@fortawesome/fontawesome-free/css/all.css';
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import VueClipboard from 'vue-clipboard3';



const app = createApp(App)
app.use(createPinia());
app.use(router)
app.use(VueCookies)
app.directive('clipboard', VueClipboard);


app.mount('#app')


