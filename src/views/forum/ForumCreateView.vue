<template>
  <div class="w-full">
    <form class="flex flex-col w-full gap-8">
      <v-input :name="'question'" :placeholder="'Тема вопроса'" />
      <v-textarea name="description" :placeholder="'Опишите подробно ваш вопрос'" />
      <button
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Задать</button>
    </form>
  </div>
</template>

<script>
import VInput from '@/components/ui/InputComponent.vue';
import VTextarea from '@/components/ui/TextareaComponent.vue';

export default {
  components: {
    VInput,
    VTextarea,
  },
};
</script>
