<template>
  <header class="relative flex items-center justify-center h-64 -mx-6 bg-primary-default">
    <button
      class="absolute left-6 -mt-8"
      @click="$router.go(-1)"
    >
      <svg class="stroke-white" width="25" height="16">
        <use xlink:href="/img/icons/sprite.svg#arrow-back"></use>
      </svg>
    </button>
    <h1 class="-mt-8 text-3xl text-white font-bold">{{ fullname }}</h1>
  </header>
  <div class="flex flex-col items-center -mt-24 gap-16">
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
      <button class="absolute flex items-center justify-center w-16 h-16 bottom-0 -right-20">
        <svg class="fill-primary-default" width="40" height="40">
          <use xlink:href="/img/icons/sprite.svg#message"></use>
        </svg>
      </button>
    </div>
    <div class="w-full">
      <form class="flex flex-col w-full gap-8">
        <v-input
          v-if="!isTeacher"
          :title="'Группа'"
          :name="'group'"
          :modelValue="user.group"
          :disabled="true"
        />
        <v-input
          v-else
          :title="'Предмет'"
          :name="'subject'"
          :modelValue="user.subject"
          :disabled="true"
        />
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VInput from '@/components/ui/InputComponent.vue';
import { ref, onValue } from 'firebase/database';
import { database } from '@/utils/firebase';

export default {
  components: { VInput },
  data: () => ({
    user: {
      firstname: '',
      lastname: '',
      middlename: '',
      job: '',
      group: '',
      subject: '',
    },
  }),
  computed: {
    fullname() {
      return `${this.user.lastname} ${this.user.firstname} ${this.user.middlename}`;
    },
    isTeacher() {
      return this.user.job === 'teacher';
    },
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      const { id } = this.$route.params;
      const info = ref(database, `users/${id}/info`);
      onValue(info, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const params = {};
          Object.keys(data).forEach((key) => {
            data[key] && (params[key] = data[key]);
          });
          this.user = params;
        }
      });
    },
  },
};
</script>
