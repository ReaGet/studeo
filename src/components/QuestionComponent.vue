<template>
  <article class="flex flex-col overflow-hidden rounded-xl bg-primary-100 gap-6">
    <div class="flex flex-col py-6 px-4 gap-6">
      <div class="flex items-center justify-between">
        <h2 class="pr-4 text-xl text-black font-bold line-clamp-1">{{ question.title }}</h2>
        <router-link to="/">
          <div class="flex items-center gap-3">
            <svg class="stroke-primary-default rotate-180" width="17" height="10">
              <use xlink:href="/img/icons/sprite.svg#arrow-back"></use>
            </svg>
          </div>
        </router-link>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <svg width="15" height="15">
            <use xlink:href="/img/icons/sprite.svg#date"></use>
          </svg>
          <span class="text-[1rem] text-primary-default">{{ question.date }}</span>
        </div>
        <div class="flex items-center gap-3">
          <svg width="15" height="15">
            <use xlink:href="/img/icons/sprite.svg#comment"></use>
          </svg>
          <span class="text-[1rem] text-primary-default">{{ question.answers }} ответов</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    question: {
      title: {
        required: true,
        type: String,
      },
      date: {
        required: true,
        type: String,
        default: 'dd.mm.yyy',
      },
      answers: {
        required: true,
        type: Number,
        default: 0,
      },
    },
  },
};
</script>
