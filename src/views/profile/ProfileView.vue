<template>
  <header class="relative flex items-center justify-center h-64 -mx-6 bg-primary-default">
    <router-link class="absolute left-6 -mt-8" to="/">
      <svg class="stroke-primary-default stroke-white" width="25" height="16">
        <use xlink:href="/img/icons/sprite.svg#arrow-back"></use>
      </svg>
    </router-link>
    <h1 class="-mt-8 text-3xl text-white font-bold">Павлов Павел Павлович</h1>
  </header>
  <div class="flex flex-col items-center -mt-24 gap-16">
    <div class="relative">
      <div class="border-2 border-primary-100 overflow-hidden rounded-md">
        <img
          width="100"
          height="100"
          src="/img/images/avatar-anime.png"
          alt="аватар"
        >
      </div>
      <!-- eslint-disable-next-line max-len -->
      <button class="absolute flex items-center justify-center w-16 h-16 bottom-0 -right-20">
        <svg class="fill-primary-default" width="40" height="40">
          <use xlink:href="/img/icons/sprite.svg#message"></use>
        </svg>
      </button>
    </div>
    <div class="w-full">
      <form class="flex flex-col w-full gap-8">
        <v-input
          :title="'Кафедра'"
          :name="'department'"
          :value="'Информационная безопасность'"
          :disabled="true"
        />
        <v-input
          :title="'Предмет'"
          :name="'subject'"
          :value="'Высшая математика'"
          :disabled="true"
        />
        <v-input
          :title="'Заголовок'"
          :name="'title'"
          :value="'Описание'"
          :disabled="true"
        />
      </form>
    </div>
  </div>
</template>

<script>
import VInput from '@/components/ui/InputComponent.vue';

export default {
  components: { VInput },
};
</script>
