<!-- eslint-disable -->
<template>
  <header class="relative flex items-center justify-center h-64 -mx-6 bg-primary-default">
    <button
      class="absolute left-6 -mt-8"
      @click="$router.go(-1)"
    >
      <svg class="stroke-white" width="25" height="16">
        <use xlink:href="/img/icons/sprite.svg#arrow-back"></use>
      </svg>
    </button>
    <h1 class="-mt-8 _text-3xl text-2xl text-white font-bold">{{ fullname }}</h1>
  </header>
  <div class="flex flex-col items-center -mt-24 gap-16">
    <div class="relative">
      <div class="h-[100px] w-[100px] border-2 border-primary-100 bg-primary-default overflow-hidden rounded-md">
        <img
          v-if="user.avatar"
          class="h-full w-full object-cover"
          width="100"
          height="100"
          :src="user.avatar"
          alt="аватар"
        >
      </div>
      <button
        class="absolute flex items-center justify-center w-16 h-16 bottom-0 -right-20"
        @click="handleChatButtonClick"
      >
        <svg class="fill-primary-default" width="40" height="40">
          <use xlink:href="/img/icons/sprite.svg#message"></use>
        </svg>
      </button>
    </div>
    <div class="w-full">
      <form class="flex flex-col w-full gap-8">
        <v-input
          v-if="!isTeacher"
          :title="'Группа'"
          :name="'group'"
          :modelValue="user.group"
          :disabled="true"
        />
        <v-input
          v-if="!isTeacher && user.subject"
          :title="'Кафедра'"
          :name="'subject'"
          :modelValue="user.subject"
          :disabled="true"
        />
        <v-input
          v-if="isTeacher"
          :title="'Предмет'"
          :name="'subject'"
          :modelValue="user.subject"
          :disabled="true"
        />
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VInput from '@/components/ui/InputComponent.vue';
import {
  ref,
  onValue,
  query,
  orderByKey,
  orderByChild,
  equalTo,
  push,
  set
} from 'firebase/database';
import { database, auth } from '@/utils/firebase';

const uData = {
  chatroomId: 'id',
  users: {
    0: 'uid1',
    1: 'uid2',
    2: 'uid3',
  },
};

const cData = {
  users: {
    0: 'uid1',
    1: 'uid2',
    2: 'uid3',
  },
  title: 'title',
  lastMessage: 'asdasd',
  image: {
    uid1: '',
    uid2: '',
  },
  messages: [],
};

export default {
  components: { VInput },
  data: () => ({
    chatId: '',
    hasChat: false,
    user: {
      firstname: '',
      lastname: '',
      middlename: '',
      job: '',
      group: '',
      subject: '',
      avatar: '',
    },
  }),
  computed: {
    fullname() {
      return `${this.user.lastname} ${this.user.firstname} ${this.user.middlename}`;
    },
    isTeacher() {
      return this.user.job === 'teacher';
    },
  },
  async mounted() {
    await this.fetchUserInfo();
    this.getChatLink();
  },
  methods: {
    fetchUserInfo() {
      const { currentUid } = this.getUserIds();
      const info = ref(database, `users/${currentUid}/info`);
      onValue(info, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const params = {};
          Object.keys(data).forEach((key) => {
            data[key] && (params[key] = data[key]);
          });
          params.uid = currentUid;
          this.user = params;
        }
      });
    },
    getChatLink() {
      const { uid, currentUid } = this.getUserIds();
      const chatQuery = query(
        ref(database, `users/${currentUid}/chatrooms`),
        orderByChild('uid'),
        equalTo(uid),
      );
      onValue(chatQuery, (snapshot) => {
        console.log(snapshot.val());
        const data = snapshot.val();
        if (data) {
          const chatId = Object.keys(data)[0];
          this.hasChat = true;
          this.chatId = chatId;
        }
      });
    },
    handleChatButtonClick() {
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
      const { uid, currentUid } = this.getUserIds();
      const formData = {
        users: {
          [uid]: true,
          [currentUid]: true,
        },
        title: '',
        lastMessage: '',
        image: {
          [uid]: this.$store.getters.user.avatar,
          [currentUid]: this.user.avatar,
        },
      };
      await push(ref(database,'chatrooms'), formData).then((snapshot) => {
        const chatId = snapshot.key;
        this.setUserChatInfo(uid, currentUid, chatId);
        this.setUserChatInfo(currentUid, uid, chatId);
        this.$router.push({
          name: 'chat',
          params: { id: chatId },
        })
        console.log('Chat created!');
      });
    },
    setUserChatInfo(uid, uid2, chatId) {
        set(ref(database, `users/${uid}/chatrooms/${chatId}`), {
          uid: uid2,
        });
    },
    getUserIds() {
      const uid = this.$store.getters.user.uid;
      const currentUid = this.$route.params.id;
      return { uid, currentUid };
    },
  },
};
</script>
