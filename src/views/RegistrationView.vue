<template>
  <div class="w-full">
    <form
      class="flex flex-col w-full gap-8"
      @submit.prevent="handleSubmit"
    >
      <v-input :name="'name'" :title="'ФИО'" @oninput="(value) => (name = value)" />
      <label for="job" class="flex flex-col justify-start">
        <span class="text-2xl text-gray-default mb-2">Должность</span>
        <!-- eslint-disable-next-line max-len -->
        <select id="job" class="h-[52px] indent-4 px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none" name="job">
          <option value="default" selected>Выберите должность</option>
          <option value="teacher">Преподаватель</option>
        </select>
      </label>
      <v-input :name="'email'" :title="'Email'" @oninput="(value) => (email = value)" />
      <v-input
        :name="'password'"
        :title="'Пароль'"
        :type="'password'"
        @oninput="(value) => (password = value)"
      />
      <v-input
        :name="'password_verify'"
        :title="'Повторите пароль'"
        :type="'password'"
        @oninput="(value) => (password_verify = value)"
      />
      <button
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import VInput from '@/components/ui/InputComponent.vue';

export default {
  components: { VInput },
  data: () => ({
    name: '',
    email: '',
    job: '',
    password: '',
    password_verify: '',
  }),
  methods: {
    async handleSubmit() {
      if (this.password !== this.password_verify) {
        return;
      }

      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        job: this.job,
      };
      console.log(formData);

      await this.$store.dispatch('register', formData);
    },
  },
};
</script>
