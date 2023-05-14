<!-- eslint-disable -->
<template>
  <div class="w-full">
    <form class="flex flex-col w-full gap-8" @submit.prevent="createPost">
      <v-input :name="'title'" :placeholder="'Заголовок'" v-model="title"/>
      <label for="category" class="flex flex-col justify-start">
        <select
          v-model="category"
          id="category"
          class="h-[52px] indent-4 px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none"
          name="category"
        >
          <option value="default" selected>Выберите категорию</option>
          <option value="news">Статьи</option>
          <option value="support">Психологическая поддержка</option>
        </select>
      </label>
      <v-textarea name="description" :placeholder="'Описание'" v-model="description" />
      <v-file title="Выберите обложку" name="file"></v-file>
      <button
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Создать</button>
    </form>
  </div>
</template>

<script>
import VInput from '@/components/ui/InputComponent.vue';
import VTextarea from '@/components/ui/TextareaComponent.vue';
import VFile from '@/components/ui/FileSelectComponent.vue';
import { database } from '@/utils/firebase';
import {
  ref,
  push,
} from 'firebase/database';

export default {
  components: {
    VInput,
    VTextarea,
    VFile,
  },
  data: () => ({
    title: '',
    category: 'default',
    description: '',
  }),
  methods: {
    createPost() {
      const formData = {
        title: this.title,
        description: this.description,
        category: this.category,
        date: new Date().toJSON(),
      };
      push(ref(database, '/posts/'), formData).then(() => {
        this.title = '';
        this.description = '';
        this.category = 'default';
      });
    },
  },
};
</script>
