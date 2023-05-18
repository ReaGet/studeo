<!-- eslint-disable -->
<template>
  <div class="flex flex-col pb-6">
    <div class="flex items-center py-6 gap-6 border-b border-gray-light">
      <div class="w-[7rem] h-[7rem] rounded-lg bg-primary-light">
        <img
          class="h-full w-full object-cover"
          width="80"
          height="80"
          :src="avatar"
          alt="avatar"
        >
      </div>
      <span class="text-3xl text-black font-bold">Привет, {{ name }}!</span>
    </div>
    <div class="flex flex-col divide-y divide-gray-light">
      <nav v-for="(menu, i) in menuItems" :key="i" >
        <ul class="flex flex-col py-8 gap-6">
          <li
            v-for="item in menu"
            :key="item.name"
          >
            <router-link class="flex items-center gap-8" :to="item.link">
              <div
                class="flex items-center justify-center h-20 w-20 bg-gray-200 rounded-lg shadow-sm"
              >
                <svg width="20" height="20" class="fill-primary-default">
                  <use :xlink:href="'/img/icons/sprite.svg#'+item.name"></use>
                </svg>
              </div>
              <span class="text-2xl text-gray-default">{{item.title}}</span>
              <svg width="8" height="15" class="ml-auto fill-primary-default">
                <use xlink:href="/img/icons/sprite.svg#arrow-right"></use>
              </svg>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <router-link
      class="flex items-center justify-center py-6 mt-6 bg-primary-default rounded-xl gap-6"
      to="/support"
    >
      <svg width="37" height="39" class="fill-white">
        <use xlink:href="/img/icons/sprite.svg#support"></use>
      </svg>
      <span class="text-2xl text-white">Психологическая поддержка</span>
    </router-link>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'menu-view',
  data: () => ({
    menuList: [
      [
        {
          title: 'Личный кабинет',
          name: 'profile',
          link: '/profile/edit',
          job: '',
        },
        {
          title: 'Электронный пропуск',
          name: 'pass',
          link: '/pass',
          job: 'student',
        },
        {
          title: 'Успеваемость',
          name: 'diary',
          link: '/diary',
          job: 'student',
        },
        {
          title: 'Расписание',
          name: 'schedule',
          link: '/schedule',
          job: 'student',
        },
        {
          title: 'Библиотека',
          name: 'library',
          link: '/library',
          job: '',
        },
        {
          title: 'Форум',
          name: 'forum',
          link: '/forum',
          job: '',
        },
        {
          title: 'Статьи',
          name: 'news',
          link: '/news',
          job: '',
        },
      ],
      [
        {
          title: 'Чаты',
          name: 'chat',
          link: '/chat',
          job: '',
        },
        {
          title: 'Группы',
          name: 'teachers',
          link: '/groups',
          job: 'teacher',
        },
        {
          title: 'Создание студентов',
          name: 'friends',
          link: '/students/create',
          job: 'teacher',
        },
        {
          title: 'Одногруппники',
          name: 'friends',
          link: '/friends',
          job: 'student',
        },
        {
          title: 'Преподаватели',
          name: 'teachers',
          link: '/teachers',
          job: 'student',
        }
      ],
    ],
  }),
  computed: {
    name() {
      const name = this.$store.getters.user?.firstname;
      return name || 'User';
    },
    avatar() {
      return this.$store.getters.user?.avatar || '/img/icons/avatar-girl.svg';
    },
    menuItems() {
      const { job } = this.$store.getters.user;
      return this.menuList.reduce((menuList, menu) => {
        const items = menu.filter((item) => {
          if (item.job === '' || item.job === job) {
            return item;
          }
        });
        menuList.push(items);
        return menuList;
      }, []);
    },
  },
};
</script>
