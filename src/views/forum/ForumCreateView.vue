<template>
  <div class="w-full">
    <form class="flex flex-col w-full gap-8" @submit.prevent="createPost">
      <v-input :name="'question'" :placeholder="'Тема вопроса'" v-model="title" />
      <v-textarea
        name="description"
        :placeholder="'Опишите подробно ваш вопрос'"
        v-model="description"
      />
      <button
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Задать</button>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import VInput from '@/components/ui/InputComponent.vue';
import VTextarea from '@/components/ui/TextareaComponent.vue';
import { database } from '@/utils/firebase';
import {
  ref,
  push,
} from 'firebase/database';

export default {
  components: {
    VInput,
    VTextarea,
  },
  data: () => ({
    title: '',
    description: '',
  }),
  methods: {
    async createPost() {
    const { firstname } = this.$store.getters.user;
    const uid = await this.$store.dispatch('getUid');
    const formData = {
      title: this.title,
      description: this.description,
      date: new Date().toJSON(),
      answers: [],
      answersCount: 0,
      user: {
        firstname,
        uid,
      },
    };
    push(ref(database, '/forum/'), formData).then(() => {
      this.title = '';
      this.description = '';
    });
  },
  },
};
</script>
