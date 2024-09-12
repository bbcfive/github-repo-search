import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import MainPage from './MainPage.vue';
import './index.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainPage },
  ],
});

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(ElementPlus)
  .mount('#app');