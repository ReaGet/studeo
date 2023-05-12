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
      <EditProfileForm
        :user-data="userData"
        :key="userData.email"
        @onsubmit="handleSubmit"
      ></EditProfileForm>
      <button
        class="w-full px-4 py-4 mt-6 text-xl text-gray-default bg-primary-light rounded-lg outline-none"
        @click="logout"
      >Выйти</button>
    </div>
  </div>
</template>

<script>
import EditProfileForm from '@/components/forms/EditProfileForm.vue';

export default {
  components: { EditProfileForm },
  methods: {
    handleSubmit(data) {
      this.$store.dispatch('updateInfo', data);
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
  computed: {
    userData() {
      return this.$store.getters.user?.data || {};
    },
  },
};
</script>
