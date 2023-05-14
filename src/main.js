import { createApp } from 'vue';
import { auth } from '@/utils/firebase';
import formatDate from '@/mixins/dateFormat.mixin';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

let app = null;

auth.onAuthStateChanged(async () => {
  if (!app) {
    store.dispatch('fetchInfo', () => {
      app = createApp(App);
      app.use(store);
      app.use(router);
      app.mixin(formatDate);
      app.mount('#app');
    });
  }
});
