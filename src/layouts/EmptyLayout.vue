<template>
  <div
    class="flex flex-col min-h-screen"
    :class="{ 'pb-[50px]': menuEnabled }"
  >
    <router-view></router-view>
  </div>
  <BottomMenu v-if="menuEnabled"></BottomMenu>
</template>

<script>
/* eslint-disable */
import BottomMenu from '@/components/BottomMenu.vue';

export default {
  name: 'empty-layout',
  components: { BottomMenu },
  computed: {
    menuEnabled() {
      return this.$route.meta?.menu === false ? false : true;
    },
  },
};
</script>
