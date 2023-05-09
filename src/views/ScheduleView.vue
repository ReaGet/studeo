<template>
  <div class="flex flex-col gap-6">
    <ScheduleListItem
      v-for="item in scheduleList"
      :key="item.timestamp.toString()"
      :daySchedule="item"
    ></ScheduleListItem>
  </div>
</template>

<script>
import ScheduleListItem from '@/components/ScheduleListItem.vue';

export default {
  components: { ScheduleListItem },
  data: () => ({
    scheduleList: [
      {
        timestamp: new Date(),
        items: [
          {
            subject: 'ВКР',
            info: 'практическая часть',
            time: '09:00-10:45',
            room: '100',
          },
          {
            subject: 'ВКР',
            info: 'теоритическая часть',
            time: '11:00- 12:20',
            room: '102',
          },
          {
            subject: 'Высшая математика',
            time: '13:00- 14:20',
            room: '215',
          },
        ],
      },
      {
        timestamp: new Date(2023, 4, 10),
        items: [
          {
            subject: 'ВКР',
            info: 'практическая часть',
            time: '09:00-10:45',
            room: '100',
          },
          {
            subject: 'ВКР',
            info: 'теоритическая часть',
            time: '11:00- 12:20',
            room: '102',
          },
          {
            subject: 'Высшая математика',
            time: '13:00- 14:20',
            room: '215',
          },
        ],
      },
      {
        timestamp: new Date(2023, 4, 11),
        items: [
          {
            subject: 'ВКР',
            info: 'практическая часть',
            time: '09:00-10:45',
            room: '100',
          },
          {
            subject: 'ВКР',
            info: 'теоритическая часть',
            time: '11:00- 12:20',
            room: '102',
          },
          {
            subject: 'Высшая математика',
            time: '13:00- 14:20',
            room: '215',
          },
        ],
      },
      {
        timestamp: new Date(2023, 4, 12),
        items: [
          {
            subject: 'ВКР',
            info: 'практическая часть',
            time: '09:00-10:45',
            room: '100',
          },
          {
            subject: 'ВКР',
            info: 'теоритическая часть',
            time: '11:00- 12:20',
            room: '102',
          },
          {
            subject: 'Высшая математика',
            time: '13:00- 14:20',
            room: '215',
          },
        ],
      },
    ],
  }),
};
</script>
