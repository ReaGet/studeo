<!-- eslint-disable -->
<template>
  <div class="w-full pb-6">
    <form
      class="flex flex-col w-full gap-8"
      @submit.prevent
    >
      <label for="group" class="flex flex-col justify-start">
        <span class="text-2xl text-gray-default mb-2">Группа</span>
        <select
          id="group"
          class="h-[52px] indent-4 px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none"
          name="group"
          @change="handleGroup"
        >
          <option value="default" selected="selected">Выберите группу</option>
          <option
            v-for="item in groups"
            :key="item.group"
            :value="item.group"
            :data-subject="item.subject"
          >{{ item.group }} - {{ item.subject }}</option>
        </select>
      </label>
      <v-input :name="'date'" :title="'Дата'" :type="'date'" v-model="date" />
      <div class="flex flex-col gap-6 bg-gray-100 p-6">
        <v-input :name="'subject'" :title="'Предмет'" v-model="subject" />
        <v-input :name="'info'" :title="'Дополнительная информация'" v-model="info" />
        <v-input :name="'time'" :title="'Время'" :type="'time'" v-model="time" />
        <v-input :name="'room'" :title="'Аудитория'" :type="'number'" v-model="room" />
        <button
          @click="createSubject"
          class="px-4 py-6 mt-8 text-2xl text-white bg-primary-300 rounded-lg outline-none"
        >Добавить предмет</button>
      </div>
      <button
        @click="handleSubmit"
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Сохранить</button>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import { onValue, ref, push } from 'firebase/database';
import { database } from '@/utils/firebase';
import VInput from '@/components/ui/InputComponent.vue';

export default {
  components: { VInput },
  data: () => ({
    group: {},
    groups: [],
    subjects: [],
    subject: '',
    date: '',
    time: '',
    room: '',
    info: '',
  }),
  mounted() {
    this.fetchGroups();
  },
  methods: {
    fetchGroups() {
      const dataQuery = ref(database, 'groups');
      onValue(dataQuery, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.groups = this.convertData(data);
        }
      });
    },
    convertData(data) {
      if (!data) {
        return [];
      }
      return Object.keys(data).map((key) => {
        return {
          id: key,
          group: data[key].group,
          subject: data[key].subject,
        };
      });
    },
    handleGroup(event) {
      const { value } = event.target;
      const option = event.target.querySelector('option:checked');
      const { subject } = option.dataset;
      this.group = {
        group: value,
        subject,
      };
    },
    createSubject() {
      const date = new Date(`${this.date} ${this.time}`);
      date.setHours(date.getHours() + 1);
      date.setMinutes(date.getMinutes() + 1);
      this.subjects.push({
        subject: this.subject,
        info: this.info,
        time: date.toJSON(),
        room: this.room,
      });
      this.subject = '';
      this.info = '';
      this.time = '';
      this.room = '';
    },
    async handleSubmit() {
      const formData = {
        group: this.group.group,
        timestamp: new Date(this.date).toJSON(),
        subjects: this.subjects,
      };
      console.log(formData);
      try {
        push(ref(database, 'schedule'), formData).then(() => {
          this.date = '';
          this.subject = '';
          this.info = '';
          this.time = '';
          this.room = '';
          alert(`Расписание для группы ${this.group.group} добавлено!`);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
