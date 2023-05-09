<template>
  <div class="flex justify-between px-16 text-2xl text-gray uppercase [&>button]:uppercase">
    <button>неделя</button>
    <button>месяц</button>
    <button class="text-primary-default font-bold">семестр</button>
    <button>год</button>
  </div>
  <div class="flex flex-col mt-12 gap-6">
    <DiaryListItem
      v-for="diaryItem in diaryList"
      :key="diaryItem.id"
      :diaryItem="diaryItem"
    ></DiaryListItem>
  </div>
</template>

<script>
import DiaryListItem from '@/components/DiaryListItem.vue';

export default {
  components: {
    DiaryListItem,
  },
  data: () => ({
    diaryList: [
      {
        id: 1,
        subject: {
          title: 'История',
          value: 5,
        },
        hours: {
          title: 'Кол-во часов',
          value: 35,
        },
        subjectType: {
          title: 'Форма экзамена',
          value: 'Зачет',
        },
        teacher: {
          title: 'Преподаватель',
          value: 'Аюпова Г.Р.',
        },
      },
      {
        id: 1,
        subject: {
          title: 'География',
          value: 4,
        },
        hours: {
          title: 'Кол-во часов',
          value: 45,
        },
        subjectType: {
          title: 'Форма экзамена',
          value: 'Экзамен',
        },
        teacher: {
          title: 'Преподаватель',
          value: 'Василевский И.И.',
        },
      },
    ],
  }),
};
</script>
