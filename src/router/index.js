import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main' },
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/menu',
    name: 'menu',
    meta: { layout: 'empty' },
    component: () => import('@/views/MenuView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
