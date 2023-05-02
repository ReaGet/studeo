<template>
  <div class="flex flex-col">
    <div class="flex items-center py-6 gap-6 border-b border-gray-default">
      <div class="w-[7rem] h-[7rem] rounded-lg bg-primary-light">
        <svg width="80" height="80" class="-mt-[1rem]">
          <use xlink:href="/img/icons/sprite.svg#avatar-girl"></use>
        </svg>
      </div>
      <span class="text-3xl text-black font-bold">Привет, Анастасия!</span>
    </div>
    <div class="flex flex-col divide-y divide-gray-default">
      <nav v-for="(menu, i) in menuItems" :key="i" >
        <ul class="flex flex-col py-8 gap-6">
          <li v-for="item in menu" :key="item.name">
            <router-link class="flex items-center gap-8" :to="item.link">
              <div
                class="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-lg shadow-md"
              >
                <svg width="16" height="16" class="fill-primary-default">
                  <use :xlink:href="'/img/icons/sprite.svg#'+item.name"></use>
                </svg>
              </div>
              <span class="text-xl text-gray-default">{{item.title}}</span>
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
      to="/"
    >
      <svg width="37" height="39" class="fill-white">
        <use xlink:href="/img/icons/sprite.svg#support"></use>
      </svg>
      <span class="text-xl text-white">Психологическая поддержка</span>
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
          link: '/',
        },
        {
          title: 'Расписание',
          name: 'schedule',
          link: '/',
        },
        {
          title: 'Библиотека',
          name: 'library',
          link: '/',
        },
        {
          title: 'Форум',
          name: 'forum',
          link: '/',
        },
      ],
      [
        {
          title: 'Одногруппники',
          name: 'friends',
          link: '/',
        },
        {
          title: 'Преподаватели',
          name: 'teachers',
          link: '/',
        },
      ],
    ],
  }),
};
</script>
