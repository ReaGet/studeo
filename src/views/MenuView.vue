<template>
  <div class="flex flex-col pb-6">
    <div class="flex items-center py-6 gap-6 border-b border-gray-default">
      <div class="w-[7rem] h-[7rem] rounded-lg bg-primary-light">
        <svg width="80" height="80" class="-mt-[1rem]">
          <use xlink:href="/img/icons/sprite.svg#avatar-girl"></use>
        </svg>
      </div>
      <span class="text-3xl text-black font-bold">Привет, {{ name }}!</span>
    </div>
    <div class="flex flex-col divide-y divide-gray-default">
      <nav v-for="(menu, i) in menuItems" :key="i" >
        <ul class="flex flex-col py-8 gap-6">
          <li v-for="item in menu" :key="item.name">
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
export default {
  name: 'menu-view',
  data: () => ({
    menuItems: [
      [
        {
          title: 'Личный кабинет',
          name: 'profile',
          link: '/profile/edit',
        },
        {
          title: 'Расписание',
          name: 'schedule',
          link: '/schedule',
        },
        {
          title: 'Библиотека',
          name: 'library',
          link: '/registration',
        },
        {
          title: 'Форум',
          name: 'forum',
          link: '/forum',
        },
      ],
      [
        {
          title: 'Одногруппники',
          name: 'friends',
          link: '/friends',
        },
        {
          title: 'Преподаватели',
          name: 'teachers',
          link: '/teachers',
        },
      ],
    ],
  }),
  computed: {
    name() {
      const value = this.$store.getters.user?.data?.name;
      return value || 'User';
    },
  },
};
</script>
