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
    component: () => import('@/views/profile/EditProfileView.vue'),
  },
  {
    path: '/profile/:id',
    name: 'profile',
    meta: { title: 'Профиль' },
    component: () => import('@/views/profile/ProfileView.vue'),
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
    meta: { layout: 'main', title: 'Новости', action: 'add' },
    component: () => import('@/views/post/PostsPageView.vue'),
  },
  {
    path: '/news/:id',
    name: 'singleNews',
    meta: { layout: 'main' },
    component: () => import('@/views/post/SinglePostView.vue'),
  },
  {
    path: '/news/create',
    name: 'newsCreate',
    meta: { layout: 'main', title: 'Новость' },
    component: () => import('@/views/post/PostCreateView.vue'),
  },
  {
    path: '/forum',
    name: 'forum',
    meta: { layout: 'main', title: 'Форум', action: 'add' },
    component: () => import('@/views/forum/ForumView.vue'),
  },
  {
    path: '/forum/:id',
    name: 'singleQuestion',
    meta: { layout: 'main' },
    component: () => import('@/views/forum/SingleQuestionView.vue'),
  },
  {
    path: '/forum/create',
    name: 'forumCreate',
    meta: { layout: 'main', title: 'Вопрос' },
    component: () => import('@/views/forum/ForumCreateView.vue'),
  },
  {
    path: '/support',
    name: 'support',
    meta: { layout: 'main', title: 'Психологическая поддержка', action: 'add' },
    component: () => import('@/views/post/PostsPageView.vue'),
  },
  {
    path: '/support/:id',
    name: 'singleSupport',
    meta: { layout: 'main' },
    component: () => import('@/views/post/SinglePostView.vue'),
  },
  {
    path: '/post/create',
    name: 'postCreate',
    meta: { layout: 'main', title: 'Статья' },
    component: () => import('@/views/post/PostCreateView.vue'),
  },
  {
    path: '/teachers',
    name: 'teachers',
    meta: { layout: 'main', title: 'Преподаватели' },
    component: () => import('@/views/UsersView.vue'),
  },
  {
    path: '/friends',
    name: 'friends',
    meta: { layout: 'main', title: 'Преподаватели' },
    component: () => import('@/views/UsersView.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    meta: { layout: 'main', title: 'Чат' },
    component: () => import('@/views/chat/ChatListView.vue'),
  },
  {
    path: '/chat/:id',
    name: 'singleChat',
    meta: {},
    component: () => import('@/views/chat/SingleChatView.vue'),
  },
  {
    path: '/schedule',
    name: 'schedule',
    meta: { layout: 'main', title: 'Расписание занятий' },
    component: () => import('@/views/ScheduleView.vue'),
  },
  {
    path: '/diary',
    name: 'diary',
    meta: { layout: 'main', title: 'Успеваемость' },
    component: () => import('@/views/DiaryView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
