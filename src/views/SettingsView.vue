<!-- eslint-disable -->
<template>
  <div class="flex flex-col gap-6">
    <checkbox-component title="Уведомления" name="notifications"></checkbox-component>
    <label for="job" class="flex flex-col justify-start">
      <span class="text-2xl text-gray mb-2">Тема</span>
      <select
        id="job"
        class="h-[52px] indent-4 px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none"
        name="theme"
        v-model="theme"
        @change="setTheme"
      >
        <option value="light">Бежевая</option>
        <option value="blue">Синяя</option>
      </select>
    </label>
  </div>
</template>

<script>
import CheckboxComponent from '@/components/ui/CheckboxComponent.vue';

export default {
  components: {
    CheckboxComponent,
  },
  data: () => ({
    theme: 'light',
  }),
  mounted() {
    this.$store.dispatch('loadTheme');
    this.theme = this.$store.getters.theme;
  },
  methods: {
    setTheme() {
      this.$store.dispatch('updateTheme', this.theme);
    },
  },
};
</script>
