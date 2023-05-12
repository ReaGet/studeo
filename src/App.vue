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
  mounted() {
    // console.log(this.$store.getters.user.data);
    // if (!this.$store.getters.user.data) {
    //   this.$store.dispatch('fetchUserInfo');
    // }
    // // auth.onAuthStateChanged((user) => {
    // //   this.$store.dispatch('fetchUser', user);
    // // });
  },
};
</script>
