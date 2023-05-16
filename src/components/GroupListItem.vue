<template>
  <article class="flex flex-col overflow-hidden rounded-xl bg-primary-100 gap-6">
    <div >
      <router-link
        class="flex items-center justify-between p-6"
        :to="link"
      >
        <h2 class="font-bold">{{ group.group }}</h2>
        <span>{{ group.subject }}</span>
      </router-link>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    group: {
      group: {
        required: true,
        type: String,
      },
      subject: {
        required: true,
        type: String,
      },
    },
  },
  computed: {
    link() {
      return `/group/${this.group.group}`;
    },
  },
};
</script>
