import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/core/app.vue';
import router from '@/core/router';

import httpPlugin from '@/misc/http-plugin';

const app = createApp(App);

// 路由
app.use(router);

// 状态管理
app.use(createPinia())
app.use(httpPlugin)

app.mount('#root');