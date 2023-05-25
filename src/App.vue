<template>
  <LoadingView v-if="!loaded"></LoadingView>
  <div v-else class="h-full min-h-screen px-6">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<style>
@import '@/assets/style.css';
</style>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import BasicLayout from '@/layouts/BasicLayout.vue';
import LoadingView from '@/views/LoadingView.vue';

export default {
  components: {
    LoadingView,
    MainLayout,
    EmptyLayout,
    BasicLayout,
  },
  methods: {
    setTheme() {
      this.$store.dispatch('updateTheme', this.theme);
    },
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'empty'}-layout`;
    },
    loaded() {
      return this.$store.getters.loaded;
    },
  },
};
</script>
