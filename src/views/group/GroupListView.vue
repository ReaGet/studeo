<template>
  <div class="flex flex-col pb-6 gap-6">
    <GroupListItem
      v-for="group of groups"
      :key="group.id"
      :group="group"
    ></GroupListItem>
  </div>
</template>
<script>
/* eslint-disable */
import GroupListItem from '@/components/GroupListItem.vue';
import { onValue, ref } from 'firebase/database';
import { database } from '@/utils/firebase';

export default {
  components: { GroupListItem },
  data: () => ({
    groups: [],
  }),
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
