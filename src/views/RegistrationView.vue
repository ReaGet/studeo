<template>
  <div class="w-full">
    <form class="flex flex-col w-full gap-8">
      <label for="job" class="flex flex-col justify-start">
        <span class="text-2xl text-gray-default mb-2">Должность</span>
        <!-- eslint-disable-next-line max-len -->
        <select id="job" class="h-[52px] indent-4 px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none" name="job">
          <option value="default" selected>Выберите должность</option>
          <option value="teacher">Преподаватель</option>
        </select>
      </label>
      <v-input :name="'email'" :title="'Email'" />
      <v-input
        :name="'password'"
        :title="'Пароль'"
        :type="'password'"
      />
      <v-input
        :name="'password_verify'"
        :title="'Повторите пароль'"
        :type="'password'"
      />
      <button
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import VInput from '@/components/ui/InputComponent.vue';

export default {
  components: { VInput },
};
</script>
