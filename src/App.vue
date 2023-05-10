<template>
  <div class="flex flex-col h-screen px-6">
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
import { auth } from '@/utils/firebase';

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
  },
  async mounted() {
    auth.onAuthStateChanged((user) => {
      this.$store.dispatch('fetchUser', user);
    });
  },
};
</script>
