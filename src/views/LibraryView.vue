<template>
  <div class="flex flex-col pb-6 gap-6">
    <BookListItem
      v-for="book in books"
      :key="book.article"
      :book="book"
    ></BookListItem>
  </div>
</template>

<script>
import BookListItem from '@/components/BookListItem.vue';

export default {
  components: { BookListItem },
  data: () => ({
    books: [
      {
        title: 'Федор Достоевский: Преступление и наказание',
        article: '482353',
        image: '/img/books/1.webp',
      },
      {
        title: 'Гюго: Отверженные',
        article: '714857',
        image: '/img/books/2.jpg',
      },
      {
        title: 'Высшая математика Учебное пособие',
        article: '142395',
        image: '/img/books/3.webp',
      },
    ],
  }),
};
</script>
