<template>
  <div class="flex flex-col">
    <!-- eslint-disable-next-line max-len -->
    <div class="flex items-center justify-between pb-2 border-b border-primary-default text-xl text-primary-default font-bold">
      <span class="uppercase">{{ dayOfWeek }}</span>
      <span>{{ date }}</span>
    </div>
    <div class="flex flex-col py-2 gap-2">
      <div
        v-for="item in daySchedule.items"
        :key="item.subject"
        class="flex items-center justify-between gap-4"
      >
        <div class="flex flex-col flex-1 py-3 px-4 bg-primary-light rounded-xl">
          <b class="text-xl leading-[1.25rem]">{{ item.subject }}</b>
          <span
            v-if="item.info"
            class="text-lg text-gray-300 leading-[1.125rem]"
          >{{ item.info }}</span>
        </div>
        <div class="flex items-center h-full py-3 px-4 bg-gray-100 rounded-xl">
          {{ convertTime(item.time) }}
        </div>
        <div
          class="flex items-center h-full py-3 px-4 bg-gray-100 rounded-xl"
        >{{ item.room }} ауд.</div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    daySchedule: {
      timestamp: {
        type: String,
      },
      items: {
        type: Array,
        required: true,
      },
    },
  },
  computed: {
    dayOfWeek() {
      const options = { weekday: 'long' };
      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(this.daySchedule.timestamp));
    },
    date() {
      return new Intl.DateTimeFormat('ru-RU').format(new Date(this.daySchedule.timestamp));
    },
  },
  methods: {
    convertTime(time) {
      const format = (t) => {
        return t.toLocaleTimeString([], {
          hour: '2-digit',
          minute:'2-digit',
        });
      }
      const date = new Date(time);
      date.setHours(date.getHours() + 1);
      date.setMinutes(date.getMinutes() + 30);
      return `${format(new Date(time))} - ${format(date)}`;
    },
  },
};
</script>
