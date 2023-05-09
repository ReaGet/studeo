<template>
  <div class="flex flex-col pb-6 gap-6">
    <QuestionComponent
      v-for="question in questions"
      :key="question.id"
      :question="question"
    ></QuestionComponent>
  </div>
</template>

<script>
import QuestionComponent from '@/components/QuestionListItem.vue';

export default {
  components: {
    QuestionComponent,
  },
  data: () => ({
    questions: [
      {
        id: 1,
        title: 'Как сдать экзаменты?',
        date: '26.04.2023',
        answers: 10,
      },
      {
        id: 2,
        title: 'Как обрабатывать хэштеги в continue',
        date: '25.04.2023',
        answers: 0,
      },
      {
        id: 3,
        title: 'Где можно получить подпись декана?',
        date: '14.04.2023',
        answers: 2,
      },
    ],
  }),
};
</script>
