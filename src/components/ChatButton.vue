<template>
  <button
    @click="handleChatButtonClick"
  >
    <svg :class="color" :width="size" :height="size">
      <use xlink:href="/img/icons/sprite.svg#message"></use>
    </svg>
  </button>
</template>

<script>
/* eslint-disable */
import {
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  push,
  set,
} from 'firebase/database';
import { database } from '@/utils/firebase';

export default {
  props: {
    friend: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 30,
    },
    color: {
      type: String,
      default: 'fill-primary-default',
    }
  },
  mounted() {
    this.getChatLink();
  },
  methods: {
    getChatLink() {
      const uid = this.$store.getters.user.uid;
      const friendId = this.friend.uid;
      const chatQuery = query(
        ref(database, `users/${friendId}/chatrooms`),
        orderByChild('uid'),
        equalTo(uid),
      );
      onValue(chatQuery, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const chatId = Object.keys(data)[0];
          this.hasChat = true;
          this.chatId = chatId;
        }
      });
    },
    handleChatButtonClick(event) {
      event.preventDefault();
      if (this.hasChat) {
        this.$router.push({
          name: 'singleChat',
          params: {
            id: this.chatId,
          }
        });
        return;
      }
      this.createChat();
    },
    async createChat() {
      const { uid, lastname, firstname, avatar } = this.$store.getters.user;
      const friendId = this.friend.uid;
      const formData = {
        users: {
          [friendId]: {
            name: `${this.friend.lastname} ${this.friend.firstname}`,
            image: this.friend.avatar || '',
          },
          [uid]: {
            name: `${lastname} ${firstname}`,
            image: avatar || '',
          },
        },
        title: '',
        lastMessage: '',
        // image: {},
      };

      // if (this.$store.getters.user?.avatar) {
      //   formData.image[uid] = this.$store.getters.user.avatar;
      // }

      // if (this.friend?.avatar) {
      //   formData.image[friendId] = this.friend.avatar;
      // }

      const response = await push(ref(database,'chatrooms'), formData);
      const chatId = response.key;
      await this.setUserChatInfo(uid, friendId, chatId);
      await this.setUserChatInfo(friendId, uid, chatId);
      this.$router.push({
        name: 'singleChat',
        params: { id: chatId },
      });
      console.log('Chat created!', chatId);
    },
    async setUserChatInfo(uid, uid2, chatId) {
      await set(ref(database, `users/${uid}/chatrooms/${chatId}`), {
        uid: uid2,
      });
    },
  },
};
</script>
