import { createApp } from 'vue';
import { auth } from '@/utils/firebase';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

auth.onAuthStateChanged(() => {
  // auth.onAuthStateChanged((user) => {
  //   this.$store.dispatch('fetchUser', user);
  // });
  createApp(App).use(store).use(router).mount('#app');
  store.dispatch('fetchUserInfo');
});
