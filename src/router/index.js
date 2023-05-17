/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import { auth } from '@/utils/firebase';

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main', auth: false },
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/menu',
    name: 'menu',
    meta: { layout: 'empty', auth: true },
    component: () => import('@/views/MenuView.vue'),
  },
  {
    path: '/registration',
    name: 'registration',
    meta: {
      layout: 'main',
      title: 'Регистрация',
      back: false,
      auth: false,
    },
    component: () => import('@/views/RegistrationView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'main',
      title: 'Авторизация',
      back: false,
      auth: false,
    },
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/pass',
    name: 'pass',
    meta: { layout: 'main', title: 'Электронный пропуск', auth: true },
    component: () => import('@/views/PassView.vue'),
  },
  {
    path: '/profile/edit',
    name: 'editProfile',
    meta: { layout: 'main', title: 'Личный кабинет', auth: true },
    component: () => import('@/views/profile/EditProfileView.vue'),
  },
  {
    path: '/profile/:id',
    name: 'profile',
    meta: { title: 'Профиль', auth: true },
    component: () => import('@/views/profile/ProfileView.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    meta: { layout: 'main', title: 'Настройки', auth: true },
    component: () => import('@/views/SettingsView.vue'),
  },
  {
    path: '/news',
    name: 'news',
    meta: {
      layout: 'main',
      title: 'Новости',
      action: 'add',
      auth: true,
      category: 'news',
    },
    component: () => import('@/views/post/PostsPageView.vue'),
  },
  {
    path: '/post/:id',
    name: 'post',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/post/SinglePostView.vue'),
  },
  {
    path: '/forum',
    name: 'forum',
    meta: {
      layout: 'main',
      title: 'Форум',
      action: 'add',
      auth: true,
    },
    component: () => import('@/views/forum/ForumView.vue'),
  },
  {
    path: '/forum/:id',
    name: 'singleQuestion',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/forum/SingleQuestionView.vue'),
  },
  {
    path: '/forum/create',
    name: 'forumCreate',
    meta: { layout: 'main', title: 'Вопрос', auth: true },
    component: () => import('@/views/forum/ForumCreateView.vue'),
  },
  {
    path: '/support',
    name: 'support',
    meta: {
      layout: 'main',
      title: 'Психологическая поддержка',
      action: 'add',
      auth: true,
      category: 'support',
    },
    component: () => import('@/views/post/PostsPageView.vue'),
  },
  {
    path: '/post/create',
    name: 'postCreate',
    meta: { layout: 'main', title: 'Статья', auth: true },
    component: () => import('@/views/post/PostCreateView.vue'),
  },
  {
    path: '/teachers',
    name: 'teachers',
    meta: { layout: 'main', title: 'Преподаватели', auth: true, job: 'teacher' },
    component: () => import('@/views/TeachersView.vue'),
  },
  {
    path: '/friends',
    name: 'friends',
    meta: { layout: 'main', title: 'Друзья', auth: true, job: 'student' },
    component: () => import('@/views/FriendsView.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    meta: { layout: 'main', title: 'Чат', auth: true },
    component: () => import('@/views/chat/ChatListView.vue'),
  },
  {
    path: '/chat/:id',
    name: 'singleChat',
    meta: { auth: true },
    component: () => import('@/views/chat/SingleChatView.vue'),
  },
  {
    path: '/schedule',
    name: 'schedule',
    meta: { layout: 'main', title: 'Расписание занятий', auth: true },
    component: () => import('@/views/ScheduleView.vue'),
  },
  {
    path: '/diary',
    name: 'diary',
    meta: { layout: 'main', title: 'Успеваемость', auth: true },
    component: () => import('@/views/DiaryView.vue'),
  },
  {
    path: '/students/create',
    name: 'studentsCreate',
    meta: { layout: 'main', title: 'Создание студента', auth: true, job: 'teacher' },
    component: () => import('@/views/StudentsCreateView.vue'),
  },
  {
    path: '/groups',
    name: 'groups',
    meta: {
      layout: 'main',
      title: 'Группы',
      auth: true,
      job: 'teacher',
      action: 'add',
    },
    component: () => import('@/views/group/GroupListView.vue'),
  },
  {
    path: '/groups/create',
    name: 'groupCreate',
    meta: { layout: 'main', title: 'Создание группы', auth: true, job: 'teacher' },
    component: () => import('@/views/group/GroupCreateView.vue'),
  },
  {
    path: '/group/:group',
    name: 'groupView',
    meta: { layout: 'main', title: 'Список группы', auth: true, job: 'teacher' },
    component: () => import('@/views/group/SingleGroupView.vue'),
  },
  {
    path: '/library',
    name: 'library',
    meta: { layout: 'main', title: 'Библиотека', auth: true },
    component: () => import('@/views/LibraryView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const reqiureAuth = to.matched.some((record) => record.meta.auth);
  const currentUser = auth.currentUser;

  if (reqiureAuth && !currentUser) {
    next('/');
  } else if (!reqiureAuth && currentUser) {
    next('/menu');
  } else {
    next();
  }
});

export default router;
