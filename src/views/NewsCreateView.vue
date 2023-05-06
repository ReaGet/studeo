<template>
  <div class="w-full">
    <form class="flex flex-col w-full gap-8">
      <v-input :name="'title'" :placeholder="'Заголовок'" />
      <label for="category" class="flex flex-col justify-start">
        <!-- eslint-disable-next-line max-len -->
        <select id="job" class="h-[52px] indent-4 px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none" name="job">
          <option value="default" selected>Выберите категорию</option>
          <option value="category1">Литература</option>
          <option value="category2">Математика</option>
          <option value="category3">Искусство</option>
        </select>
      </label>
      <v-textarea name="description" :placeholder="'Описание'" />
      <button
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Создать</button>
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
