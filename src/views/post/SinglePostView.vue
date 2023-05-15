<template>
  <div class="flex flex-col gap-6">
    <img
      v-if="post.image"
      class="-mb-6 rounded-t-xl"
      :src="post.image"
      alt="title"
    >
    <div class="flex flex-col py-6 px-4 gap-6">
      <!-- eslint-disable-next-line max-len -->
      <h1 class="text-2xl text-black font-bold">{{ post.title }}</h1>
      <!-- eslint-disable-next-line max-len -->
      <p class="text-xl text-gray-300 leading-tight whitespace-pre-wrap">{{ post.description }}</p>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <svg width="15" height="15">
            <use xlink:href="/img/icons/sprite.svg#date"></use>
          </svg>
          <span class="text-[1rem] text-primary-default">{{ post.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  onValue,
  ref,
} from 'firebase/database';
import { database } from '@/utils/firebase';

export default {
  data: () => ({
    post: {
      title: '',
      description: '',
      date: '',
      category: '',
      image: '',
    },
  }),
  mounted() {
    this.fetchPost();
  },
  methods: {
    fetchPost() {
      const { id } = this.$route.params;
      const postQuery = ref(database, `posts/${id}/`);
      onValue(postQuery, async (snapshot) => {
        const post = snapshot.val();
        if (post) {
          this.post = {
            title: post.title,
            description: post.description,
            date: this.formatDate(post.date),
            image: post.image,
          };
        }
      });
    },
  },
};
</script>
