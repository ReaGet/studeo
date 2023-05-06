import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/menu',
    name: 'home',
    meta: { layout: 'main' },
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/',
    name: 'menu',
    meta: { layout: 'empty' },
    component: () => import('@/views/MenuView.vue'),
  },
  {
    path: '/registration',
    name: 'registration',
    meta: { layout: 'basic', title: 'Регистрация' },
    component: () => import('@/views/RegistrationView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'basic', title: 'Авторизация' },
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/pass',
    name: 'pass',
    meta: { layout: 'main', title: 'Электронный пропуск' },
    component: () => import('@/views/PassView.vue'),
  },
  {
    path: '/profile/edit',
    name: 'editProfile',
    meta: { layout: 'main', title: 'Личный кабинет' },
    component: () => import('@/views/EditProfileView.vue'),
  },
  {
    path: '/profile/:id',
    name: 'profile',
    meta: { title: 'Профиль' },
    component: () => import('@/views/ProfileView.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    meta: { layout: 'main', title: 'Настройки' },
    component: () => import('@/views/SettingsView.vue'),
  },
  {
    path: '/news',
    name: 'news',
    meta: { layout: 'main', title: 'Новости', action: 'addNews' },
    component: () => import('@/views/NewsView.vue'),
  },
  {
    path: '/news/:id',
    name: 'singleNews',
    meta: { layout: 'main' },
    component: () => import('@/views/SingleNewsView.vue'),
  },
  {
    path: '/news/create',
    name: 'newsCreate',
    meta: { layout: 'main', title: 'Новость' },
    component: () => import('@/views/NewsCreateView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
