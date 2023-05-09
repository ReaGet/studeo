<template>
  <div class="flex flex-col pb-6 gap-6">
    <FriendComponent
      v-for="friend of friendList"
      :key="friend.id"
      :user="friend"
    ></FriendComponent>
  </div>
</template>

<script>
import FriendComponent from '@/components/UserListItem.vue';

export default {
  components: {
    FriendComponent,
  },
  data: () => ({
    friendList: [
      {
        id: 1,
        fullName: 'Романов Игорь Александрович',
        firstName: 'Игорь',
        middleName: 'Александрович',
        lastName: 'Романов',
        avatar: '/img/images/avatar-anime.png',
        job: {
          status: 'teachers',
          title: 'Кафедра Математики',
        },
      },
      {
        id: 2,
        fullName: 'Романов Игорь Александрович',
        firstName: 'Игорь',
        middleName: 'Александрович',
        lastName: 'Романов',
        avatar: '/img/images/avatar-anime.png',
        job: {
          status: 'teachers',
          title: 'Кафедра Математики',
        },
      },
    ],
  }),
};
</script>
