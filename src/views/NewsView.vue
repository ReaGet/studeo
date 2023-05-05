<template>
  <div class="flex flex-col pb-6 gap-6">
    <NewsComponent
      v-for="post in posts"
      :key="post.id"
      :post="post"
    ></NewsComponent>
  </div>
</template>

<script>
import NewsComponent from '@/components/NewsComponent.vue';

export default {
  components: {
    NewsComponent,
  },
  data: () => ({
    posts: [
      {
        id: 1,
        title: 'Гала-концерт конкурса-фестиваля народного пения в нашем вузе',
        description: '18 марта 2023 года в Казанском институте культуры прошёл 2 тур, Гала-концерт и  награждения участников',
        date: '26.04.2023',
      },
      {
        id: 2,
        title: 'Всероссийская олимпиада для лиц, поступивших на кафедру информационной безопасности',
        description: 'В День студента, который в России отмечается 25 января в Казанском государственном институте культуры сост',
        date: '25.04.2023',
      },
      {
        id: 3,
        title: 'Гала-концерт конкурса-фестиваля народного пения в нашем вузе',
        description: '18 марта 2023 года в Казанском институте культуры прошёл 2 тур, Гала-концерт и  награждения участников',
        date: '18.03.2023',
        img: '/img/images/post-image.jpg',
      },
    ],
  }),
};
</script>
