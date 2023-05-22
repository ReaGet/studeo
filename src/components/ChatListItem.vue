<template>
  <router-link :to="`/chat/${this.chat.id}`">
    <div class="flex items-center p-4 rounded-xl gap-4 bg-gray-100">
      <div class="h-20 w-20 overflow-hidden rounded-xl bg-primary-light">
        <img
          v-if="user.image"
          class="h-full w-full object-cover"
          width="50"
          height="50"
          :src="user.image"
          alt="title"
        >
      </div>
      <div class="flex flex-col justify-center gap-2">
        <b class="text-xl leading-[1.25rem] text-black">{{ user.name }}</b>
        <span class="text-[1rem] leading-[1rem] text-gray-300">{{ chat.lastMessage.text }}</span>
      </div>
      <div class="shrink-0 ml-auto text-center">
        <span
          class="block text-[1rem] leading-[1rem] text-gray-300"
        >{{ time }}</span>
        <!-- eslint-disable-next-line max-len -->
        <span v-if="newMessagesCount" class="inline-block text-center py-1 px-3 mt-2 rounded-full bg-primary-default text-white">{{ newMessagesCount }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    chat: {
      id: {
        type: Number,
        required: true,
      },
      chatType: {
        type: String,
        default: 'single',
      },
      title: {
        type: String,
        default: 'Chat name',
      },
      image: {
        type: Object,
      },
      newMessagesCount: {
        type: Number,
      },
      lastMessage: {
        text: {
          type: String,
          default: '',
        },
        timestamp: {
          type: String,
          default: '',
        },
      },
    },
  },
  computed: {
    time() {
      return this.formatTime(this.chat.lastMessage.timestamp);
    },
    newMessagesCount() {
      return this.chat.newMessagesCount || 0;
    },
    user() {
      const { uid } = this.$store.getters.user;
      const { users } = this.chat;
      const id = Object.keys(users).filter((_id) => _id !== uid)[0];
      return users[id] || {};
    },
  },
};
</script>
