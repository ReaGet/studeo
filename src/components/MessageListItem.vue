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
    <span class="text-lg text-gray-300">{{ message.timestamp }}</span>
  </div>
</template>

<script>
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
};
</script>
