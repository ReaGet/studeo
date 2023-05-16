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
import { onValue, ref } from 'firebase/database';
import { database } from '@/utils/firebase';

export default {
  components: {
    QuestionComponent,
  },
  data: () => ({
    questions: [],
    // questions: [
    //   {
    //     id: 1,
    //     title: 'Как сдать экзаменты?',
    //     date: '26.04.2023',
    //     answers: 10,
    //   },
    //   {
    //     id: 2,
    //     title: 'Как обрабатывать хэштеги в continue',
    //     date: '25.04.2023',
    //     answers: 0,
    //   },
    //   {
    //     id: 3,
    //     title: 'Где можно получить подпись декана?',
    //     date: '14.04.2023',
    //     answers: 2,
    //   },
    // ],
  }),
  mounted() {
    this.fetchQuestions();
  },
  methods: {
    fetchQuestions() {
      const questionsRef = ref(database, 'forum');
      onValue(questionsRef, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const questions = [];
          Object.keys(data).forEach((id) => {
            const question = data[id];
            questions.push({
              id,
              title: question.title,
              description: question.description,
              date: this.formatDate(question.date),
              user: question.user,
            });
          });
          this.questions = questions;
        }
      });
    },
  },
};
</script>
