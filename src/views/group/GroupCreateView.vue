<!-- eslint-disable -->
<template>
  <div class="w-full pb-6">
    <form
      class="flex flex-col w-full gap-8"
      @submit.prevent="handleSubmit"
    >
      <v-input :name="'group'" :title="'Группа'" v-model="group" />
      <v-input :name="'subject'" :title="'Название кафедры'" v-model="subject" />
      <button
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Создать</button>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import VInput from '@/components/ui/InputComponent.vue';
import { database } from '@/utils/firebase';
import { ref, push } from 'firebase/database';

export default {
  components: { VInput },
  data: () => ({
    group: '',
    subject: '',
  }),
  methods: {
    async handleSubmit() {
      const formData = {
        group: this.group,
        subject: this.subject,
      };
      try {
        await push(ref(database, `/groups/`), formData);
        alert('Группа создана!');
        this.group = '';
        this.subject = '';
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
