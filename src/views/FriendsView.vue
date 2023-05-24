<template>
  <div class="flex flex-col pb-6 gap-6">
    <UserListItem
      v-for="user of users"
      :key="user.uid"
      :user="user"
    ></UserListItem>
  </div>
</template>

<script>
/* eslint-disable */
import UserListItem from '@/components/UserListItem.vue';
import { database } from '@/utils/firebase';
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';

export default {
  components: {
    UserListItem,
  },
  data: () => ({
    users: {},
    // friendList: [
    //   {
    //     id: 1,
    //     fullName: 'Романов Игорь Александрович',
    //     firstName: 'Игорь',
    //     middleName: 'Александрович',
    //     lastName: 'Романов',
    //     avatar: '/img/images/avatar-anime.png',
    //     job: {
    //       status: 'teachers',
    //       title: 'Кафедра Математики',
    //     },
    //   },
    //   {
    //     id: 2,
    //     fullName: 'Романов Игорь Александрович',
    //     firstName: 'Игорь',
    //     middleName: 'Александрович',
    //     lastName: 'Романов',
    //     avatar: '/img/images/avatar-anime.png',
    //     job: {
    //       status: 'teachers',
    //       title: 'Кафедра Математики',
    //     },
    //   },
    // ],
  }),
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      const { group } = this.$store.getters.user;
      const usersQuery = query(
        ref(database, 'users'),
        orderByChild('info/group'),
        equalTo(group),
      );
      onValue(usersQuery, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const users = [];
          Object.keys(data).forEach((id) => {
            users.push({
              uid: id,
              ...data[id].info,
            });
          });
          this.users = await this.filterUsers(users);
        }
      });
    },
    async filterUsers(users) {
      const { job } = this.$route.meta;
      const currentUserId = await this.$store.dispatch('getUid');
      // return users.filter((user) => (console.log(user)) && user.job === job && user.uid !== currentUserId);
      return users.filter((user) => user.job === job && user.uid !== currentUserId);
    }
  },
};
</script>
