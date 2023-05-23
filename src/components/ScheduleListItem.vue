<template>
  <div class="flex flex-col">
    <!-- eslint-disable-next-line max-len -->
    <div class="flex items-center justify-between pb-2 border-b border-primary-default text-xl text-primary-default font-bold">
      <span class="uppercase">{{ dayOfWeek }}</span>
      <span>{{ date }}</span>
    </div>
    <div class="flex flex-col py-2 gap-2">
      <div
        v-for="item in daySchedule.subjects"
        :key="item.subject"
        class="flex items-center justify-between gap-4"
      >
        <div class="flex flex-col flex-1 py-3 px-4 bg-primary-light rounded-xl">
          <b class="text-xl leading-[1.25rem]">{{ item.subject }}</b>
          <span
            v-if="item.info"
            class="mt-1 text-lg text-gray-300 leading-[1.125rem]"
          >{{ item.info }}</span>
        </div>
        <div class="flex items-center h-full py-3 px-4 bg-gray-100 rounded-xl">
          {{ convertTime(item.timeStart, item.timeEnd) }}
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
      subjects: {
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
    convertTime(timeStart, timeEnd) {
      const format = (t) => {
        return t.toLocaleTimeString([], {
          hour: '2-digit',
          minute:'2-digit',
        });
      }
      return `${format(new Date(timeStart))} - ${format(new Date(timeEnd))}`;
    },
  },
};
</script>
