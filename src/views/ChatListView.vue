<template>
  <div class="flex flex-col pb-6 gap-6">
    <ChatListItem
      v-for="chat of chatList"
      :key="chat.id"
      :chat="chat"
    ></ChatListItem>
  </div>
</template>

<script>
import ChatListItem from '@/components/ChatListItem.vue';

export default {
  components: {
    ChatListItem,
  },
  data: () => ({
    chatList: [
      {
        id: 1,
        chatType: 'group',
        title: 'Групповой чат',
        avatar: '/img/images/avatar-anime.png',
        newMessagesCount: 3,
        lastMessage: {
          uid: 1,
          text: 'Привет, ты не забыл, что у тебя допка?',
          avatar: '/img/images/avatar-anime.png',
          name: 'Игорь Романов',
          timestamp: '2 мин',
        },
      },
      {
        id: 2,
        chatType: 'single',
        avatar: '/img/images/avatar-anime.png',
        newMessagesCount: 37,
        lastMessage: {
          uid: 1,
          text: 'Ты закончил верстку? Её натянем или теб...',
          avatar: '/img/images/avatar-anime.png',
          name: 'Сергей Константинович',
          timestamp: '4 мин',
        },
      },
    ],
  }),
};
</script>
