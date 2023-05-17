<template>
  <div
    class="flex items-center p-4 rounded-xl bg-gray-100 gap-4">
    <div class="h-20 w-20 overflow-hidden rounded-xl">
      <img
        class="h-full w-full object-cover"
        width="50"
        height="50"
        :src="book.image"
        alt="title"
      >
    </div>
    <div class="flex flex-col justify-center gap-2">
      <b class="text-xl leading-[1.25rem] text-black">{{ book.title }}</b>
      <span class="text-[1rem] leading-[1rem] text-gray">Артикул: {{ book.article }}</span>
    </div>
    <button class="ml-auto">
      <svg class="stroke-primary-default rotate-180" width="17" height="10">
        <use xlink:href="/img/icons/sprite.svg#arrow-back"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      title: {
        type: String,
      },
      article: {
        type: String,
      },
      image: {
        type: String,
        required: true,
      },
    },
  },
};
</script>
