<!-- eslint-disable -->
<template>
  <div class="flex flex-col items-center pb-6 gap-16">
    <div class="relative">
      <div class="w-[100px] h-[100px] border-2 border-primary-100 bg-primary-default overflow-hidden rounded-md">
        <img
          v-if="avatarImage"
          class="h-full w-full object-cover"
          width="100"
          height="100"
          :src="avatarImage"
          alt="аватар"
        >
      </div>
      <!-- eslint-disable-next-line max-len -->
      <label
        class="absolute flex items-center justify-center w-16 h-16 -bottom-4 -right-4 border-2 border-white bg-gray-100 rounded-md bg-gray-light shadow-md"
        for="image"
      >
        <input
          class="h-0 w-0 invisible"
          type="file"
          name="image"
          id="image"
          @change="handleImage"
          accept="image/*"
        >
        <svg width="25" height="25">
          <use xlink:href="/img/icons/sprite.svg#camera"></use>
        </svg>
      </label>
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
/* eslint-disable */
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
        avatar: null,
      },
      preview: '',
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
    handleImage(event) {
      this.user.avatar = event.target.files[0];
      this.preview = URL.createObjectURL(this.user.avatar);
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
    avatarImage() {
      const isString = typeof this.user.avatar === 'string';
      return isString ? this.user.avatar : this.preview;
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
