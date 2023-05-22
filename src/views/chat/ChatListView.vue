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
/* eslint-disable */
import ChatListItem from '@/components/ChatListItem.vue';
import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
import { database } from '@/utils/firebase';

export default {
  components: {
    ChatListItem,
  },
  data: () => ({
    chatList: [],
    // chatList: [
    //   {
    //     id: 1,
    //     chatType: 'group',
    //     title: 'Групповой чат',
    //     avatar: '/img/images/avatar-anime.png',
    //     newMessagesCount: 3,
    //     lastMessage: {
    //       uid: 1,
    //       text: 'Привет, ты не забыл, что у тебя допка?',
    //       avatar: '/img/images/avatar-anime.png',
    //       name: 'Игорь Романов',
    //       timestamp: '2 мин',
    //     },
    //   },
    //   {
    //     id: 2,
    //     chatType: 'single',
    //     avatar: '/img/images/avatar-anime.png',
    //     newMessagesCount: 37,
    //     lastMessage: {
    //       uid: 1,
    //       text: 'Ты закончил верстку? Её натянем или теб...',
    //       avatar: '/img/images/avatar-anime.png',
    //       name: 'Сергей Константинович',
    //       timestamp: '4 мин',
    //     },
    //   },
    // ],
  }),
  mounted() {
    this.loadUserChasInfo();
  },
  methods: {
    loadUserChasInfo() {
      const { uid } = this.$store.getters.user;
      const userChatsRef = ref(database, `users/${uid}/chatrooms`);
      onValue(userChatsRef, (snapshot) => {
        const data = snapshot.val() || [];
        const chatIds = Object.keys(data).map((id) => {
          return id;
        });
        this.loadChats(chatIds);
      });
    },
    loadChats(chatIds) {
      if (!chatIds.length) {
        return;
      }
      const chatsRef = ref(database, 'chatrooms');
      onValue(chatsRef, (snapshot) => {
        const data = snapshot.val();
        const chats = [];
        chatIds.map((id) => {
          if (data[id]) {
            chats.push({
              id,
              ...data[id],
            });
          }
          this.chatList = chats;
        });
      });
    },
  },
};
</script>
