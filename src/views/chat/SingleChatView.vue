<template>
  <!-- eslint-disable-next-line max-len -->
  <header class="relative flex items-center justify-center shrink-0 h-[17rem] pb-8 -mx-6 bg-primary-default">
    <router-link class="absolute bottom-20 -mb-[0.25rem] left-6 -mt-8" to="/">
      <svg class="stroke-primary-default stroke-white" width="25" height="16">
        <use xlink:href="/img/icons/sprite.svg#arrow-back"></use>
      </svg>
    </router-link>
    <div class="flex flex-col items-center gap-4">
      <div class="overflow-hidden rounded-md">
        <img
          width="70"
          height="70"
          src="/img/images/avatar-anime.png"
          alt="аватар"
        >
      </div>
      <h1 class="text-3xl text-white font-bold">Павлов Павел</h1>
    </div>
    <div
      class="absolute h-12 bottom-[-1px] left-0 right-0 bg-white rounded-tl-full rounded-tr-full"
    ></div>
  </header>
  <div class="flex flex-col items-start py-6 gap-4 overflow-auto">
    <MessageListItem
      v-for="message in messages"
      :key="message.id"
      :message="message"
      :is-current-user="this.uid === message.uid"
    ></MessageListItem>
  </div>
  <div class="relative py-6 bottom-0 bg-white">
    <v-textarea name="message" rows="1" min-height="0" class="w-full"></v-textarea>
    <!-- eslint-disable-next-line max-len -->
    <button class="absolute flex items-center justify-center bg-primary-default h-12 w-12 bottom-11 right-6 rounded-lg">
      <svg width="20" height="20">
        <use xlink:href="/img/icons/sprite.svg#send-message"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import MessageListItem from '@/components/MessageListItem.vue';
import VTextarea from '@/components/ui/TextareaComponent.vue';

export default {
  components: {
    VTextarea,
    MessageListItem,
  },
  data: () => ({
    uid: 2,
    messages: [
      {
        id: 1,
        uid: 1,
        text: 'Ты закончил верстку? Её натянем или тебя',
        avatar: '/img/images/avatar-anime.png',
        name: 'Сергей Константинович',
        timestamp: '4 мин',
      },
      {
        id: 2,
        uid: 1,
        text: 'Нам нужно поскорее с этим разобраться',
        avatar: '/img/images/avatar-anime.png',
        name: 'Сергей Константинович',
        timestamp: '4 мин',
      },
      {
        id: 2,
        uid: 2,
        text: 'Нам нужно поскорее с этим разобраться',
        avatar: '/img/images/avatar-anime.png',
        name: 'Рифат Ринатович',
        timestamp: 'сейчас',
      },
      {
        id: 1,
        uid: 1,
        text: 'Ты закончил верстку? Её натянем или тебя',
        avatar: '/img/images/avatar-anime.png',
        name: 'Сергей Константинович',
        timestamp: '4 мин',
      },
      {
        id: 2,
        uid: 1,
        text: 'Нам нужно поскорее с этим разобраться',
        avatar: '/img/images/avatar-anime.png',
        name: 'Сергей Константинович',
        timestamp: '4 мин',
      },
      {
        id: 2,
        uid: 2,
        text: 'Нам нужно поскорее с этим разобраться',
        avatar: '/img/images/avatar-anime.png',
        name: 'Рифат Ринатович',
        timestamp: 'сейчас',
      },
      {
        id: 1,
        uid: 1,
        text: 'Ты закончил верстку? Её натянем или тебя',
        avatar: '/img/images/avatar-anime.png',
        name: 'Сергей Константинович',
        timestamp: '4 мин',
      },
      {
        id: 2,
        uid: 1,
        text: 'Нам нужно поскорее с этим разобраться',
        avatar: '/img/images/avatar-anime.png',
        name: 'Сергей Константинович',
        timestamp: '4 мин',
      },
      {
        id: 2,
        uid: 2,
        text: 'Нам нужно поскорее с этим разобраться',
        avatar: '/img/images/avatar-anime.png',
        name: 'Рифат Ринатович',
        timestamp: 'сейчас',
      },
    ],
  }),
};
</script>
