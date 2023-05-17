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
      <label for="group" class="flex flex-col justify-start">
        <span class="text-2xl text-gray-default mb-2">Группа</span>
        <select
          id="group"
          class="h-[52px] indent-4 px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none"
          name="group"
          v-model="group"
        >
          <option value="default" selected="selected">Выберите группу</option>
          <option
            v-for="item in groups"
            :key="item.group"
            :value="item.group"
          >{{ item.group }} - {{ item.subject }}</option>
        </select>
      </label>
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
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { database, secondAuth } from '@/utils/firebase';
import { onValue, ref, set } from 'firebase/database';

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
    groups: [],
    firstname: '',
    lastname: '',
    middlename: '',
    birth: '',
    group: '',
    email: '',
    job: 'student',
    password: '',
  }),
  mounted() {
    this.fetchGroups();
  },
  methods: {
    fetchGroups() {
      const dataQuery = ref(database, 'groups');
      onValue(dataQuery, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.groups = this.convertData(data);
        }
      });
    },
    convertData(data) {
      if (!data) {
        return [];
      }
      return Object.keys(data).map((key) => {
        return {
          id: key,
          group: data[key].group,
          subject: data[key].subject,
        };
      });
    },
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
        const response = await createUserWithEmailAndPassword(secondAuth, formData.email, formData.password);
        const uid = response.user.uid;
        await set(ref(database, `/users/${uid}/info`), formData);
        await signOut(secondAuth);
        alert('Студент создан!');
        this.firstname = '';
        this.lastname = '';
        this.middlename = '';
        this.birth = '';
        this.group = '';
        this.email = '';
        this.password = '';
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
