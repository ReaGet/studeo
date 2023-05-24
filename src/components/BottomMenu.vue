<template>
  <div class="fixed flex items-center w-full bottom-0 left-0 h-[60px] bg-white">
    <ul class="flex items-center justify-around w-full">
      <li>
        <router-link to="/pass">
          <svg class="fill-primary-default" width="32" height="32">
            <use xlink:href="/img/icons/sprite.svg#pass"></use>
          </svg>
        </router-link>
      </li>
      <li>
        <router-link to="/chat">
          <svg class="fill-primary-default" width="36" height="36">
            <use xlink:href="/img/icons/sprite.svg#chat"></use>
          </svg>
        </router-link>
      </li>
      <li>
        <router-link to="/menu">
          <svg class="stroke-primary-default" width="25" height="25">
            <use xlink:href="/img/icons/sprite.svg#menu"></use>
          </svg>
        </router-link>
      </li>
    </ul>
  </div>
</template>
