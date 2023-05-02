<template>
  <header class="flex justify-between py-14">
    <svg width="25" height="16">
      <use xlink:href="/img/icons/sprite.svg#arrow-back"></use>
    </svg>
    <h1 class="text-indigo">Личный кабинет</h1>
  </header>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'main-layout',
};
</script>
