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
      <label for="job" class="flex flex-col justify-start">
        <span class="text-2xl text-gray-default mb-2">Должность</span>
        <select
          id="job"
          class="h-[52px] indent-4 px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none"
          name="job"
          v-model="job"
        >
          <option value="default" selected="selected">Выберите должность</option>
          <option value="teacher">Преподаватель</option>
          <option value="student">Студент</option>
        </select>
      </label>
      <label v-if="job === 'student'" for="group" class="flex flex-col justify-start">
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
      <v-input v-else :name="'subject'" :title="'Предмет'" v-model="subject"/>
      <v-input :name="'email'" :title="'Email'" v-model="email" />
      <v-input
        :name="'password'"
        :title="'Пароль'"
        :type="'password'"
        v-model="password"
      />
      <v-input
        :name="'password_verify'"
        :title="'Повторите пароль'"
        :type="'password'"
        v-model="password_verify"
      />
      <button
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Зарегистрироваться</button>
      <router-link
        class="mx-auto text-2xl text-primary-default"
        to="/login"
      >Авторизоваться?</router-link>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import VInput from '@/components/ui/InputComponent.vue';
import { onValue, ref } from 'firebase/database';
import { database } from '@/utils/firebase';

export default {
  components: { VInput },
  data: () => ({
    groups: [],
    firstname: '',
    lastname: '',
    middlename: '',
    birth: '',
    group: '',
    subject: '',
    email: '',
    job: 'default',
    password: '',
    password_verify: '',
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
      if (this.password !== this.password_verify
        || this.job === 'default') {
        return;
      }

      const formData = {
        firstname: this.firstname,
        lastname: this.lastname,
        middlename: this.middlename,
        birth: this.birth,
        group: this.group,
        subject: this.subject,
        email: this.email,
        password: this.password,
        job: this.job,
      };
      try {
        await this.$store.dispatch('register', formData);
        setTimeout(() => {
          this.$router.push('/menu');
        }, 300);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
