<template>
  <div class="flex flex-col pb-6 gap-6">
    <UserListItem
      v-for="user of users"
      :key="user.id"
      :user="user"
    ></UserListItem>
  </div>
</template>

<script>
/* eslint-disable */
import UserListItem from '@/components/UserListItem.vue';
import { database } from '@/utils/firebase';
import { ref, onValue, query, orderByChild, equalTo, orderByValue } from 'firebase/database';

export default {
  components: {
    UserListItem,
  },
  data: () => ({
    users: {},
  }),
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const { job } = this.$route.meta;
      const usersQuery = query(
        ref(database, `users`),
        orderByChild(`info/job`),
        equalTo(job),
      );
      onValue(usersQuery, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const users = [];
          Object.keys(data).forEach((id) => {
            const groups = data[id].groups && Object.keys(data[id].groups).map((key) => {
              return data[id].groups[key];
            });

            const items = {
              id,
              ...data[id].info,
            };

            if (groups) {
              items.groups = groups;
            }

            users.push(items);
          });
          this.users = await this.filterUsers(users);
        }
      });
    },
    async filterUsers(users) {
      const { group } = this.$store.getters.user;
      const currentUserId = await this.$store.dispatch('getUid');
      return users.filter((user) => {
        return user.id !== currentUserId && user.groups?.includes(group);
      });
    }
  },
};
</script>
