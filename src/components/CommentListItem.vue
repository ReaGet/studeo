<template>
  <div class="flex gap-4">
    <div class="h-12 w-12 overflow-hidden rounded-full">
      <img
        v-if="answer.avatar"
        class="rounded-full h-full w-full object-cover"
        :src="answer.avatar"
        alt="name"
      >
    </div>
    <div class="flex flex-col pt-1 gap-2">
      <div class="flex flex-col gap-1">
        <span class="text-lg leading-[1.125rem] text-black font-bold">{{ answer.name }}</span>
        <span class="text-sm leading-[1.1rem] text-gray-300">{{ answer.date }}</span>
      </div>
      <p>{{ answer.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    answer: {
      text: {
        type: String,
      },
      name: {
        type: String,
      },
      date: {
        type: String,
      },
      avatar: {
        type: String,
      },
    },
  },
};
</script>
