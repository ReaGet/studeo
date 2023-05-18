<template>
  <div
    class="flex flex-col"
    :class="{ 'ml-auto': isCurrentUser }"
  >
    <p
      class="p-4 rounded-lg bg-primary-default text-2xl text-white"
      :class="{
        'rounded-bl-none': !isCurrentUser,
        'rounded-br-none': isCurrentUser,
      }"
    >{{ message.text }}</p>
    <span class="text-lg text-gray-300">{{ time }}</span>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    isCurrentUser: {
      type: Boolean,
      required: true,
    },
    message: {
      id: {
        type: Number,
        required: true,
      },
      uid: {
        type: Number,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      timestamp: {
        type: String,
        required: true,
      },
    },
  },
  computed: {
    time() {
      let delta = Math.abs(new Date(this.message.timestamp) - new Date()) / 1000;
      let days = Math.floor(delta / 86400);
      delta -= days * 86400;
      let hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;
      let minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;
      let seconds = delta % 60;
      if (days > 0) {
        return `${~~days} дней назад`;
      }
      if (hours > 0) {
        return `${~~hours} часов назад`;
      }
      if (minutes > 0) {
        return `${~~minutes} минут назад`;
      }
      return `${~~seconds} секунд назад`;
    },
  },
};
</script>
