<template>
  <div v-if="!loaded">Loading</div>
  <div v-else class="flex flex-col h-screen px-6">
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
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import BasicLayout from '@/layouts/BasicLayout.vue';

export default {
  components: {
    MainLayout,
    EmptyLayout,
    BasicLayout,
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'empty'}-layout`;
    },
    loaded() {
      console.log(this.$store.getters.loaded);
      return this.$store.getters.loaded;
    },
  },
};
</script>
