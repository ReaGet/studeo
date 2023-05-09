<template>
  <div class="flex items-center p-4 rounded-xl gap-4 bg-gray-100">
    <div class="h-20 w-20 overflow-hidden rounded-xl">
      <img
        width="50"
        height="50"
        :src="chat.avatar"
        alt="title"
      >
    </div>
    <div class="flex flex-col justify-center gap-2">
      <b class="text-xl leading-[1.25rem] text-black">Игорь романов</b>
      <span class="text-[1rem] leading-[1rem] text-gray-300">{{ chat.lastMessage.text }}</span>
    </div>
    <div class="shrink-0 ml-auto text-center">
      <span
        class="block text-[1rem] leading-[1rem] text-gray-300"
      >{{ chat.lastMessage.timestamp }}</span>
      <!-- eslint-disable-next-line max-len -->
      <span class="inline-block text-center py-1 px-3 mt-2 rounded-full bg-primary-default text-white">{{ chat.newMessagesCount }}</span>
    </div>
  </div>
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
      avatar: {
        type: String,
      },
      newMessagesCount: {
        type: Number,
      },
      lastMessage: {
        uid: {
          type: Number,
          required: true,
        },
        text: {
          type: String,
        },
        avatar: {
          type: String,
        },
        name: {
          type: String,
        },
        timestamp: {
          type: String,
        },
      },
    },
  },
};
</script>
