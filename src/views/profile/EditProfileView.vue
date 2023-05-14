<!-- eslint-disable -->
<template>
  <div class="flex flex-col items-center pb-6 gap-16">
    <div class="relative">
      <div class="border-2 border-primary-100 overflow-hidden rounded-md">
        <img
          width="100"
          height="100"
          src="/img/images/avatar-anime.png"
          alt="аватар"
        >
      </div>
      <!-- eslint-disable-next-line max-len -->
      <button class="absolute flex items-center justify-center w-16 h-16 -bottom-4 -right-4 border-2 border-white bg-gray-100 rounded-md bg-gray-light shadow-md">
        <svg width="25" height="25">
          <use xlink:href="/img/icons/sprite.svg#camera"></use>
        </svg>
      </button>
    </div>
    <div class="w-full">
      <form class="flex flex-col w-full gap-8" @submit.prevent="handleSubmit">
        <v-input :title="'Фамилия'" :name="'lastname'" v-model="user.lastname" />
        <v-input :title="'Имя'" :name="'firstname'" v-model="user.firstname" />
        <v-input :title="'Отчество'" :name="'middlename'" v-model="user.middlename" />
        <v-input :title="'Дата рождения'" :name="'birth'" v-model="user.birth" />
        <v-input v-if="user.job === 'student'" :title="'Группа'" :name="'group'" v-model="user.group" />
        <button
          class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
        >Сохранить</button>
      </form>
      <button
        class="w-full px-4 py-4 mt-6 text-xl text-gray-default bg-primary-light rounded-lg outline-none"
        @click="logout"
      >Выйти</button>
    </div>
  </div>
</template>

<script>
import VInput from '@/components/ui/InputComponent.vue';

export default {
  components: { VInput },
  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        middlename: '',
        birth: '',
        job: '',
        group: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch('updateInfo', this.user);
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
  mounted() {
    if (this.userData) {
      this.user = { ...this.userData };
    }
  },
  computed: {
    userData() {
      return this.$store.getters.user || {};
    },
  },
  watch: {
    userData: {
      handler(newValue) {
        this.user = { ...newValue };
      },
      deep: true,
    },
  },
};
</script>
