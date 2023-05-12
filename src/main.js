import { createApp } from 'vue';
import { auth } from '@/utils/firebase';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

let app = null;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount('#app');
    store.dispatch('fetchUserInfo');
  }
});
