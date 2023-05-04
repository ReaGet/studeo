<template>
  <header class="relative flex items-center justify-center py-14">
    <router-link class="absolute left-0" to="/">
      <svg class="stroke-primary-default" width="25" height="16">
        <use xlink:href="/img/icons/sprite.svg#arrow-back"></use>
      </svg>
    </router-link>
    <h1 class="text-3xl text-primary-default font-bold">{{ title }}</h1>
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
  },
};
</script>
