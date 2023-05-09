<template>
  <div class="flex flex-col p-4 bg-gray-200 rounded-xl text-lg gap-2">
    <div class="flex">
      <span class="text-primary-default font-bold uppercase">{{ diaryItem.subject.title }}</span>
      <div class="flex-1 mx-1 mb-[0.4rem] border-b border-gray-300 border-dashed"></div>
      <span class="text-black font-bold">{{ diaryItem.subject.value }}</span>
    </div>
    <button
      @click="isExpanded = !isExpanded"
      class="flex items-center mr-auto text-gray-400"
    >
      <span v-if="!isExpanded">Развернуть</span>
      <span v-else>Свернуть</span>
      <svg
        class="mt-1 ml-2 fill-gray-400"
        :class="{ 'rotate-180': isExpanded }"
        width="8"
        height="5"
      >
        <use xlink:href="/img/icons/sprite.svg#arrow-down"></use>
      </svg>
    </button>
    <div v-if="isExpanded" class="flex flex-col gap-1">
      <div class="flex">
        <span class="text-gray-500">{{ diaryItem.hours.title }}</span>
        <div class="flex-1 mx-1 mb-[0.4rem] border-b border-gray-300 border-dashed"></div>
        <span class="text-black font-bold">{{ diaryItem.hours.value }}</span>
      </div>
      <div class="flex">
        <span class="text-gray-500">{{ diaryItem.subjectType.title }}</span>
        <div class="flex-1 mx-1 mb-[0.4rem] border-b border-gray-300 border-dashed"></div>
        <span class="text-black font-bold">{{ diaryItem.subjectType.value }}</span>
      </div>
      <div class="flex">
        <span class="text-gray-500">{{ diaryItem.teacher.title }}</span>
        <div class="flex-1 mx-1 mb-[0.4rem] border-b border-gray-300 border-dashed"></div>
        <span class="text-black font-bold">{{ diaryItem.teacher.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isExpanded: false,
  }),
  props: {
    diaryItem: {
      id: {
        type: Number,
        required: true,
      },
      subject: {
        title: {
          type: String,
        },
        value: {
          type: Number,
        },
      },
      hours: {
        title: {
          type: String,
        },
        value: {
          type: Number,
        },
      },
      subjectType: {
        title: {
          type: String,
        },
        value: {
          type: Number,
        },
      },
      teacher: {
        title: {
          type: String,
        },
        value: {
          type: Number,
        },
      },
    },
  },
};
</script>
