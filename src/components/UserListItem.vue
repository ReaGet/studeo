<template>
  <div
    class="flex items-center p-4 rounded-xl gap-4"
    :class="{
      'bg-primary-default': isTeacher,
      'bg-gray-100': !isTeacher,
    }"
  >
    <div class="h-20 w-20 overflow-hidden rounded-xl">
      <img
        class="h-full w-full object-cover"
        width="50"
        height="50"
        :src="avatar"
        alt="title"
      >
    </div>
    <div class="flex flex-col justify-center gap-2">
      <router-link :to="routeTo">
        <b
          class="text-xl leading-[1.25rem]"
          :class="{
          'text-white': isTeacher,
          'text-black': !isTeacher,
        }"
        >{{ name }}</b>
      </router-link>
      <span
        v-if="isTeacher"
        class="text-[1rem] leading-[1rem] text-white"
      >{{ user.subject }}</span>
    </div>
    <div class="ml-auto">
      <chat-button
        v-if="user.uid"
        :friendId="user.uid"
        :color="chatButtonColor"
      ></chat-button>
    </div>
    <!-- <button class="ml-auto">
      <svg
        :class="{
          'fill-white': isTeacher,
          'fill-primary-default': !isTeacher,
        }"
        width="30"
        height="30"
      >
        <use xlink:href="/img/icons/sprite.svg#message"></use>
      </svg>
    </button> -->
  </div>
</template>

<script>
import ChatButton from '@/components/ChatButton.vue';

export default {
  components: { ChatButton },
  props: {
    user: {
      uid: {
        type: Number,
      },
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      job: {
        type: String,
      },
      subject: {
        type: Object,
      },
    },
  },
  computed: {
    name() {
      return `${this.user.firstname} ${this.user.lastname}`;
    },
    isTeacher() {
      return this.user.job === 'teacher';
    },
    avatar() {
      return this.user.avatar || '/img/icons/avatar-girl.svg';
    },
    routeTo() {
      return `/profile/${this.user.uid}`;
    },
    chatButtonColor() {
      return this.isTeacher ? 'fill-white' : 'fill-primary-default';
    },
  },
};
</script>
