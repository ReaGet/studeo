<template>
  <div class="w-full">
    <form
      class="flex flex-col w-full gap-8"
      @submit.prevent="handleSubmit"
    >
      <v-input
        :name="'email'"
        :title="'Email'"
        v-model="email"
      />
      <v-input
        :name="'password'"
        :title="'Пароль'"
        :type="'password'"
        v-model="password"
      />
      <button
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Авторизоваться</button>
      <router-link
        class="mx-auto text-2xl text-primary-default"
        to="/registration"
      >Зарегистрироваться?</router-link>
    </form>
  </div>
</template>

<script>
import VInput from '@/components/ui/InputComponent.vue';

export default {
  components: { VInput },
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    async handleSubmit() {
      if (!this.email || !this.password) {
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/menu');
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    // this.$store.dispatch('logout');
  },
};
</script>
