<!-- eslint-disable -->
<template>
  <div class="w-full pb-6">
    <form
      class="flex flex-col w-full gap-8"
      @submit.prevent="handleSubmit"
    >
      <v-input :name="'lastname'" :title="'Фамилия'" v-model="lastname" />
      <v-input :name="'firstname'" :title="'Имя'" v-model="firstname" />
      <v-input :name="'middlename'" :title="'Отчество'" v-model="middlename" />
      <v-input :name="'birth'" :title="'Дата рождения'" :placeholder="'dd.mm.yyyy'" v-model="birth" />
      <v-input :name="'birth'" :title="'Должность'" :disabled="'disabled'" :modelValue="'Студент'" />
      <v-input :name="'group'" :title="'Группа'" v-model="group" />
      <v-input :name="'email'" :title="'Email'" v-model="email" />
      <button
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Создать</button>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import VInput from '@/components/ui/InputComponent.vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '@/utils/firebase';
import { ref, set } from 'firebase/database';

function generatePassword() {
  const length = 8;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0, n = charset.length; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}

export default {
  components: { VInput },
  data: () => ({
    firstname: '',
    lastname: '',
    middlename: '',
    birth: '',
    group: '',
    email: '',
    job: 'student',
    password: '',
  }),
  methods: {
    async handleSubmit() {
      const formData = {
        firstname: this.firstname,
        lastname: this.lastname,
        middlename: this.middlename,
        birth: this.birth,
        group: this.group,
        email: this.email,
        password: generatePassword(),
        job: this.job,
      };
      try {
        try {
          const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
          const uid = response.user.uid;
          await set(ref(database, `/users/${uid}/info`), formData);
          alert('Студент создан!');
          this.firstname = '';
          this.lastname = '';
          this.middlename = '';
          this.birth = '';
          this.group = '';
          this.email = '';
          this.password = '';
        } catch (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
