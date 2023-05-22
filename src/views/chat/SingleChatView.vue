<template>
  <!-- eslint-disable-next-line max-len -->
  <header class="relative flex items-center justify-center shrink-0 h-[17rem] pb-8 -mx-6 bg-primary-default">
    <button
      class="absolute bottom-20 -mb-[0.25rem] left-6 -mt-8"
      @click="$router.go(-1)"
    >
      <svg class="stroke-primary-default stroke-white" width="25" height="16">
        <use xlink:href="/img/icons/sprite.svg#arrow-back"></use>
      </svg>
    </button>
    <div class="flex flex-col items-center gap-4">
      <div class="h-[70px] w-[70px] overflow-hidden rounded-md">
        <img
          class="h-full w-full object-cover"
          v-if="friendAvatar"
          width="70"
          height="70"
          :src="friendAvatar"
          alt="аватар"
        >
      </div>
      <h1 class="text-3xl text-white font-bold">{{ friendName }}</h1>
    </div>
    <div
      class="absolute h-12 bottom-[-1px] left-0 right-0 bg-white rounded-tl-full rounded-tr-full"
    ></div>
  </header>
  <div
    ref="messageList"
    class="message__list flex flex-col flex-1 items-start py-6 gap-4 overflow-auto"
  >
    <MessageListItem
      v-for="message in chat.messages"
      :key="message.id"
      :message="message"
      :is-current-user="currentUid === message.uid"
    ></MessageListItem>
  </div>
  <div class="relative py-6 bottom-0 bg-white">
    <v-textarea
      :name="'message'"
      :rows="1"
      :min-height="0"
      class="w-full"
      v-model="message"
    ></v-textarea>
    <!-- eslint-disable-next-line max-len -->
    <button @click="sendMessage" class="absolute flex items-center justify-center bg-primary-default h-12 w-12 bottom-11 right-6 rounded-lg">
      <svg width="20" height="20">
        <use xlink:href="/img/icons/sprite.svg#send-message"></use>
      </svg>
    </button>
  </div>
</template>

<style>
.message__list {
  padding-right: 10px;
}
.message__list::-webkit-scrollbar {
  width: 5px;
}
.message__list::-webkit-scrollbar-track {
  background-color: #e8e8e8;
  border-radius: 6px;
}
.message__list::-webkit-scrollbar-thumb {
  background-color: rgba(93, 118, 203, 0.5);
  border-radius: 6px;
}
</style>

<script>
/* eslint-disable */
import MessageListItem from '@/components/MessageListItem.vue';
import VTextarea from '@/components/ui/TextareaComponent.vue';
import { database } from '@/utils/firebase';
import { ref, set, query, onValue, orderByChild, equalTo, push } from 'firebase/database';

export default {
  components: {
    VTextarea,
    MessageListItem,
  },
  data: () => ({
    message: '',
    friend: {},
    chat: {},
    // messages: [
    //   {
    //     id: 1,
    //     uid: 1,
    //     text: 'Ты закончил верстку? Её натянем или тебя',
    //     avatar: '/img/images/avatar-anime.png',
    //     name: 'Сергей Константинович',
    //     timestamp: '4 мин',
    //   },
    //   {
    //     id: 2,
    //     uid: 1,
    //     text: 'Нам нужно поскорее с этим разобраться',
    //     avatar: '/img/images/avatar-anime.png',
    //     name: 'Сергей Константинович',
    //     timestamp: '4 мин',
    //   },
    //   {
    //     id: 2,
    //     uid: 2,
    //     text: 'Нам нужно поскорее с этим разобраться',
    //     avatar: '/img/images/avatar-anime.png',
    //     name: 'Рифат Ринатович',
    //     timestamp: 'сейчас',
    //   },
    //   {
    //     id: 1,
    //     uid: 1,
    //     text: 'Ты закончил верстку? Её натянем или тебя',
    //     avatar: '/img/images/avatar-anime.png',
    //     name: 'Сергей Константинович',
    //     timestamp: '4 мин',
    //   },
    //   {
    //     id: 2,
    //     uid: 1,
    //     text: 'Нам нужно поскорее с этим разобраться',
    //     avatar: '/img/images/avatar-anime.png',
    //     name: 'Сергей Константинович',
    //     timestamp: '4 мин',
    //   },
    //   {
    //     id: 2,
    //     uid: 2,
    //     text: 'Нам нужно поскорее с этим разобраться',
    //     avatar: '/img/images/avatar-anime.png',
    //     name: 'Рифат Ринатович',
    //     timestamp: 'сейчас',
    //   },
    //   {
    //     id: 1,
    //     uid: 1,
    //     text: 'Ты закончил верстку? Её натянем или тебя',
    //     avatar: '/img/images/avatar-anime.png',
    //     name: 'Сергей Константинович',
    //     timestamp: '4 мин',
    //   },
    //   {
    //     id: 2,
    //     uid: 1,
    //     text: 'Нам нужно поскорее с этим разобраться',
    //     avatar: '/img/images/avatar-anime.png',
    //     name: 'Сергей Константинович',
    //     timestamp: '4 мин',
    //   },
    //   {
    //     id: 2,
    //     uid: 2,
    //     text: 'Нам нужно поскорее с этим разобраться',
    //     avatar: '/img/images/avatar-anime.png',
    //     name: 'Рифат Ринатович',
    //     timestamp: 'сейчас',
    //   },
    // ],
  }),
  mounted() {
    this.loadMessages();
    setTimeout(() => {
      this.scrollView();
    }, 200);
  },
  methods: {
    loadMessages() {
      const { id } = this.$route.params;
      const chatRef = ref(database, `chatrooms/${id}`);
      onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        this.loadFriendData(data);
        this.chat = {
          id,
          ...data,
        };
      });
    },
    loadFriendData(data) {
      const { uid } = this.$store.getters.user;
      let friendId = null;
      Object.keys(data.users).forEach((id) => {
        if (id !== uid) {
          friendId = id;
        }
      });
      const friendQuery = ref(database, `users/${friendId}`);
      onValue(friendQuery, (snapshot) => {
        const data = snapshot.val();
        this.friend = data;
      });
    },
    sendMessage() {
      console.log('try to send message');
      const { uid, avatar, firstname, lastname } = this.$store.getters.user;
      push(ref(database, `chatrooms/${this.chat.id}/messages`), {
        uid,
        text: this.message,
        avatar: avatar,
        name: `${lastname} ${firstname}`,
        timestamp: new Date().toJSON(),
      }).then(() => {
        console.log('message sent', this.message);
        this.setLastMessage(this.message);
        this.message = '';
        this.scrollView();
      });
    },
    setLastMessage(message) {
      set(ref(database, `chatrooms/${this.chat.id}/lastMessage`), {
        text: message,
        timestamp: new Date().toJSON(),
      });
    },
    scrollView() {
      this.$refs.messageList.scrollTop = this.$refs.messageList.offsetHeight;
    },
  },
  computed: {
    friendAvatar() {
      return this.friend?.info?.avatar;
    },
    friendName() {
      return `${this.friend?.info?.lastname} ${this.friend?.info?.firstname}`;
    },
    currentUid() {
      return this.$store.getters.user?.uid;
    },
  },
};
</script>
