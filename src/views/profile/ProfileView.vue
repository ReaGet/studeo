<!-- eslint-disable -->
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
    <h1 class="-mt-8 _text-3xl text-2xl text-white font-bold">{{ fullname }}</h1>
  </header>
  <div class="flex flex-col items-center -mt-24 gap-16">
    <div class="relative">
      <div class="h-[100px] w-[100px] border-2 border-primary-100 bg-primary-default overflow-hidden rounded-md">
        <img
          v-if="user.avatar"
          class="h-full w-full object-cover"
          width="100"
          height="100"
          :src="user.avatar"
          alt="аватар"
        >
      </div>
      <!-- <button
        class="absolute flex items-center justify-center w-16 h-16 bottom-0 -right-20"
        @click="handleChatButtonClick"
      >
        <svg class="fill-primary-default" width="40" height="40">
          <use xlink:href="/img/icons/sprite.svg#message"></use>
        </svg>
      </button> -->
      <div class="absolute flex items-center justify-center w-16 h-16 bottom-0 -right-20">
        <chat-button
          v-if="user.uid"
          :friendId="user.uid"
          :size="40"
        ></chat-button>
      </div>
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
          v-if="!isTeacher && user.subject"
          :title="'Кафедра'"
          :name="'subject'"
          :modelValue="user.subject"
          :disabled="true"
        />
        <v-input
          v-if="isTeacher"
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
import ChatButton from '@/components/ChatButton.vue';
import {
  ref,
  onValue,
} from 'firebase/database';
import { database } from '@/utils/firebase';

export default {
  components: { VInput, ChatButton },
  data: () => ({
    chatId: '',
    hasChat: false,
    user: {
      firstname: '',
      lastname: '',
      middlename: '',
      job: '',
      group: '',
      subject: '',
      avatar: '',
    },
  }),
  computed: {
    fullname() {
      return `${this.user.lastname} ${this.user.firstname} ${this.user.middlename}`;
    },
    isTeacher() {
      return this.user.job === 'teacher';
    },
    friendIdLoaded() {
      return this.user.uid;
    },
  },
  async mounted() {
    await this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      const { currentUid } = this.getUserIds();
      const info = ref(database, `users/${currentUid}/info`);
      onValue(info, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const params = {};
          Object.keys(data).forEach((key) => {
            data[key] && (params[key] = data[key]);
          });
          params.uid = currentUid;
          this.user = params;
        }
      });
    },
    getUserIds() {
      const uid = this.$store.getters.user.uid;
      const currentUid = this.$route.params.id;
      return { uid, currentUid };
    },
  },
};
</script>
