<template>
  <div class="flex flex-col items-center justify-center h-full gap-12">
    <div>
      <img
        width="250"
        height="250"
        src="/img/images/qr.png"
        alt="Пропуск"
      >
    </div>
    <div class="flex flex-col items-center gap-2">
      <h1 class="text-4xl text-primary-default font-bold">{{ name }}</h1>
      <span class="hidden mt-4 text-3xl text-gray-default">Студент 3 курса</span>
      <span class="mt-1 text-3xl text-gray-default">Группа {{ group }}</span>
      <span class="mt-1 text-3xl text-gray-default">Кафедра {{ subject }}</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { database } from '@/utils/firebase';
import { onValue, ref } from '@firebase/database';

export default {
  data: () => ({
    groups: [],
  }),
  computed: {
    name() {
      const { firstname, lastname } = this.$store.getters.user;
      return `${lastname} ${firstname}`;
    },
    group() {
      return this.$store.getters.user.group;
    },
    subject() {
      return this.groups.find((item) => item.group === this.group)?.subject;
      // return this.$store.getters.user.subject;
    },
  },
  mounted() {
    this.fetchGroups();
  },
  methods: {
    fetchGroups() {
      const dataQuery = ref(database, 'groups');
      onValue(dataQuery, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.groups = this.convertData(data);
        }
      });
    },
    convertData(data) {
      if (!data) {
        return [];
      }
      return Object.keys(data).map((key) => {
        return {
          id: key,
          group: data[key].group,
          subject: data[key].subject,
        };
      });
    },
  },
};
</script>
