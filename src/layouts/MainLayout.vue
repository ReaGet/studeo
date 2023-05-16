<template>
  <header class="relative flex items-center justify-center py-14">
    <button
      class="absolute left-0"
      @click="$router.go(-1)"
    >
      <svg class="stroke-primary-default" width="25" height="16">
        <use xlink:href="/img/icons/sprite.svg#arrow-back"></use>
      </svg>
    </button>
    <h1 class="text-3xl text-primary-default font-bold">{{ title }}</h1>
    <router-link v-if="$route.meta.action" class="absolute right-0" :to="routeLink">
      <svg class="stroke-primary-default" width="25" height="16">
        <use xlink:href="/img/icons/sprite.svg#add"></use>
      </svg>
    </router-link>
  </header>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'main-layout',
  computed: {
    title() {
      return this.$route.meta?.title || '';
    },
    isBackRouteEnabled() {
      return this.$route.meta?.back !== false;
    },
    routeLink() {
      const { name } = this.$route;
      switch (name) {
        case 'forum':
          return '/forum/create';
        case 'groups':
          return '/groups/create';
        default:
          return '/post/create';
      }
    },
  },
};
</script>
