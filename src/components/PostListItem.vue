<template>
  <article class="flex flex-col overflow-hidden rounded-xl bg-primary-100 gap-6">
    <img
      v-if="post.image"
      class="-mb-6"
      :src="post.image"
      :alt="post.title"
    >
    <div class="flex flex-col py-6 px-4 gap-6">
      <h2
        class="text-xl text-black font-bold line-clamp-1"
      >{{ post.title }}</h2>
      <p
        class="text-sm text-gray-300 leading-tight line-clamp-2"
      >{{ post.description }}</p>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <svg class="fill-primary-default" width="15" height="15">
            <use xlink:href="/img/icons/sprite.svg#date"></use>
          </svg>
          <span class="text-[1rem] text-primary-default">{{ post.date }}</span>
        </div>
        <router-link :to="link">
          <div class="flex items-center gap-3">
            <span class="text-[1rem] text-primary-default">Читать далее</span>
            <svg class="stroke-primary-default rotate-180" width="17" height="10">
              <use xlink:href="/img/icons/sprite.svg#arrow-back"></use>
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    post: {
      id: {
        required: true,
        type: String,
      },
      title: {
        required: true,
        type: String,
      },
      category: {
        required: true,
        type: String,
      },
      description: {
        required: true,
        type: String,
      },
      date: {
        required: true,
        type: String,
        default: 'dd.mm.yyy',
      },
      image: {
        type: String,
      },
    },
  },
  computed: {
    link() {
      return `/post/${this.post.id}`;
    },
  },
};
</script>
