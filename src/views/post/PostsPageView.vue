<template>
  <div class="flex flex-col pb-6 gap-6">
    <PostListItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
    ></PostListItem>
  </div>
</template>

<script>
/* eslint-disable */
import PostListItem from '@/components/PostListItem.vue';
import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
import { database } from '@/utils/firebase';

export default {
  components: {
    PostListItem,
  },
  data: () => ({
    posts: [],
    // posts: [
    //   {
    //     id: 1,
    //     title: 'Гала-концерт конкурса-фестиваля народного пения в нашем вузе',
    //     description: '18 марта 2023 года в Казанском институте культуры прошёл 2 тур, Гала-концерт и  награждения участников',
    //     date: '26.04.2023',
    //   },
    //   {
    //     id: 2,
    //     title: 'Всероссийская олимпиада для лиц, поступивших на кафедру информационной безопасности',
    //     description: 'В День студента, который в России отмечается 25 января в Казанском государственном институте культуры сост',
    //     date: '25.04.2023',
    //   },
    //   {
    //     id: 3,
    //     title: 'Гала-концерт конкурса-фестиваля народного пения в нашем вузе',
    //     description: '18 марта 2023 года в Казанском институте культуры прошёл 2 тур, Гала-концерт и  награждения участников',
    //     date: '18.03.2023',
    //     img: '/img/images/post-image.jpg',
    //   },
    // ],
  }),
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      const { category } = this.$route.meta;
      const usersQuery = query(
        ref(database, 'posts'),
        orderByChild('category'),
        equalTo(category),
      );
      onValue(usersQuery, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const posts = [];
          Object.keys(data).forEach((id) => {
            const post = data[id];
            posts.push({
              id,
              title: post.title,
              description: post.description,
              category: post.category,
              date: this.formatDate(post.date),
            });
          });
          this.posts = posts;
        }
      });
    },
  },
};
</script>
