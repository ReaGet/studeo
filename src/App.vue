<template>
  <div class="px-6">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<style>
@import './assets/style.css';
</style>

<script>
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  components: {
    MainLayout,
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'empty'}-layout`;
    },
  },
};
</script>
