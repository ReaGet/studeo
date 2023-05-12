<!-- eslint-disable -->
<template>
  <form class="flex flex-col w-full gap-8" @submit.prevent="handleSubmit">
    <v-input :title="'Фамилия'" :name="'firstname'" :value="userData.firstname" @oninput="(value) => (user.firstname = value)" />
    <v-input :title="'Имя'" :name="'lastname'" :value="userData.lastname" @oninput="(value) => (user.lastname = value)" />
    <v-input :title="'Отчество'" :name="'middlename'" :value="userData.middlename" @oninput="(value) => (user.middlename = value)" />
    <v-input :title="'Дата рождения'" :name="'birth'" :value="userData.birth" @oninput="(value) => (user.birth = value)" />
    <v-input v-if="userData.job === 'student'" :title="'Группа'" :name="'group'" :value="userData.group" @oninput="(value) => (user.group = value)" />
    <button
      class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
    >Сохранить</button>
  </form>
</template>

<script>
import VInput from '@/components/ui/InputComponent.vue';

export default {
  components: { VInput },
  data() {
    return {
      user: { ...this.userData },
    };
  },
  props: {
    userData: {
      type: Object,
      default: () => ({
        firstname: '',
        lastname: '',
        middlename: '',
        job: '',
        group: '',
        birth: '',
      }),
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('onsubmit', this.user);
    },
  },
};
</script>
