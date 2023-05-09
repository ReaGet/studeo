<template>
  <div class="flex flex-col py-6 px-4 gap-6">
    <!-- eslint-disable-next-line max-len -->
    <h1 class="text-2xl text-black font-bold">Как мне сдать все экзамены?</h1>
    <!-- eslint-disable-next-line max-len -->
    <p class="text-xl text-gray-300 leading-tight">Дело в том, что у меня с преподами в основном хорошие отнощения, но некоторые меня просто валят. Как найти к ним подход?</p>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <svg width="15" height="15">
          <use xlink:href="/img/icons/sprite.svg#date"></use>
        </svg>
        <span class="text-[1rem] text-primary-default">26.04.2023</span>
      </div>
    </div>
    <div class="h-[1px] w-full bg-gray-200"></div>
    <div class="flex items-center justify-between">
      <h2 class="text-2xl text-black font-bold">Ответов (10)</h2>
      <button
        class="flex items-center gap-2 outline-none"
        @click="isCreatingComment = !isCreatingComment"
      >
        <span
          class="text-xl leading-[1.5rem] text-primary-default"
          v-if="!isCreatingComment"
        >Добавить</span>
        <span
          class="text-xl leading-[1.5rem] text-primary-default"
          v-else
        >Скрыть</span>
        <svg
          class="transition-transform"
          :class="{ 'rotate-45': isCreatingComment }"
          width="15"
          height="15"
        >
          <use xlink:href="/img/icons/sprite.svg#add"></use>
        </svg>
      </button>
    </div>
    <form class="flex flex-col mb-6" v-if="isCreatingComment">
      <v-textarea name="answer" :placeholder="'Введите ответ'"></v-textarea>
      <button
        class="px-4 py-6 mt-8 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Отправить</button>
    </form>
    <div class="flex flex-col gap-8">
      <CommentComponent v-for="i in 3" :key="i"></CommentComponent>
    </div>
  </div>
</template>

<script>
import CommentComponent from '@/components/CommentListItem.vue';
import VTextarea from '@/components/ui/TextareaComponent.vue';

export default {
  data: () => ({
    isCreatingComment: false,
  }),
  components: {
    CommentComponent,
    VTextarea,
  },
};
</script>
