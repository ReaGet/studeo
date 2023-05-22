import { createApp } from 'vue';
import { auth } from '@/utils/firebase';
import formatDate from '@/mixins/dateFormat.mixin';
import formatTime from '@/mixins/timeFormat.mixin';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
/* eslint-disable */
let app = null;

auth.onAuthStateChanged(async () => {
  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.mixin(formatDate);
    app.mixin(formatTime);
    app.mount('#app');
    store.dispatch('fetchInfo', () => {});
  }
});
