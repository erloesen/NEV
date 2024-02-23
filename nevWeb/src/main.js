import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// pinia
import pinia from "@/store/index.js";

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// for chinese
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// svg icon
import 'virtual:svg-icons-register';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
// 全局样式
import '@/assets/css/common.scss'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router);
app.use(ElementPlus, {locale: zhCn});
app.use(pinia)
app.config.globalProperties.L = L
app.mount('#app');
