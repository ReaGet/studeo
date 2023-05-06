<template>
  <div class="w-full">
    <form class="flex flex-col w-full gap-8">
      <v-input :name="'email'" :title="'Email'" />
      <v-input
        :name="'password'"
        :title="'Пароль'"
        :type="'password'"
      />
      <button
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import VInput from '@/components/ui/InputComponent.vue';

export default {
  components: { VInput },
};
</script>
