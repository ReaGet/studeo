<template>
  <header class="flex items-center justify-between py-14">
    <h1 class="mx-auto text-3xl text-primary-default font-bold">{{ title }}</h1>
  </header>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'basic-layout',
  computed: {
    title() {
      return this.$route.meta?.title || '';
    },
  },
};
</script>
