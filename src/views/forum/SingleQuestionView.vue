<template>
  <div class="flex flex-col py-6 px-4 gap-6">
    <!-- eslint-disable-next-line max-len -->
    <h1 class="text-2xl text-black font-bold">{{ question.title }}</h1>
    <!-- eslint-disable-next-line max-len -->
    <p class="text-xl text-gray-300 leading-tight">{{ question.description }}</p>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <svg width="15" height="15">
          <use xlink:href="/img/icons/sprite.svg#date"></use>
        </svg>
        <span class="text-[1rem] text-primary-default">{{ question.date }}</span>
      </div>
    </div>
    <div class="h-[1px] w-full bg-gray-200"></div>
    <div class="flex items-center justify-between">
      <h2 class="text-2xl text-black font-bold">Ответов ({{ question.answersCount }})</h2>
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
    <form class="flex flex-col mb-6" v-if="isCreatingComment" @submit.prevent="sendAnswer">
      <v-textarea name="answer" :placeholder="'Введите ответ'" v-model="answer"></v-textarea>
      <button
        class="px-4 py-6 mt-8 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Отправить</button>
    </form>
    <div class="flex flex-col gap-8">
      <CommentComponent
        v-for="answer in question.answers"
        :key="answer.id"
        :answer="answer"
      ></CommentComponent>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import CommentComponent from '@/components/CommentListItem.vue';
import VTextarea from '@/components/ui/TextareaComponent.vue';
import {
  onValue,
  push,
  ref,
  set,
} from 'firebase/database';
import { database } from '@/utils/firebase';

export default {
  components: {
    CommentComponent,
    VTextarea,
  },
  data: () => ({
    isCreatingComment: false,
    answer: '',
    question: {
      answersCount: 0,
      title: '',
      description: '',
      date: '',
      answers: [],
      user: {},
    },
  }),
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const { id } = this.$route.params;
      const dataQuery = ref(database, `forum/${id}/`);
      onValue(dataQuery, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.question = {
            title: data.title,
            description: data.description,
            date: this.formatDate(data.date),
            user: data.user,
            answersCount: data.answersCount || 0,
            answers: this.convertAnswers(data.answers),
          };
        }
      });
    },
    convertAnswers(answers) {
      if (!answers) {
        return [];
      }
      return Object.keys(answers).map((key) => {
        return {
          id: key,
          text: answers[key].text,
          name: answers[key].name,
          date: this.formatDate(answers[key].date),
          avatar: answers[key].avatar || '/img/icons/avatar-girl.svg',
        };
      });
    },
    sendAnswer() {
      const { id } = this.$route.params;
      const { firstname, lastname, avatar } = this.$store.getters.user;
      const formData = {
        text: this.answer,
        name: `${firstname} ${lastname}`,
        date: new Date().toJSON(),
        avatar: avatar || '',
      };
      push(ref(database, `/forum/${id}/answers`), formData).then(() => {
        this.answer = '';
      });
      set(ref(database, `/forum/${id}/answersCount`), this.question.answers.length);
    },
  },
};
</script>
