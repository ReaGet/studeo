<template>
  <header class="flex items-center justify-between py-14">
    <svg class="stroke-primary-default" width="25" height="16">
      <use xlink:href="/img/icons/sprite.svg#arrow-back"></use>
    </svg>
    <h1 class="mx-auto text-3xl text-primary-default font-bold">Личный кабинет</h1>
  </header>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'main-layout',
};
</script>
