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
      >{{ user.job.title }}</span>
    </div>
    <button class="ml-auto">
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
    </button>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      id: {
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
      return `/profile/${this.user.id}`;
    },
  },
};
</script>
