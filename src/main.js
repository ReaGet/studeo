import { createApp } from 'vue';
import { auth } from '@/utils/firebase';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

let app = null;

auth.onAuthStateChanged(async () => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount('#app');
    await store.dispatch('fetchUserInfo');
  }
});
