<template>
  <!-- eslint-disable -->
  <div class="flex">
    <input
      type="file"
      :id="name"
      :disabled="disabled"
      class="absolute h-0 w-0 invisible overflow-hidden opacity-0 -z-[1]"
      @change="handleChange"
    >
    <label
      class="flex items-center w-full px-4 py-6 text-2xl text-gray-300 bg-primary-light rounded-lg outline-none"
      :for="name"
    >
      {{ title }}
      <svg
        class="absolute right-10"
        width="30"
        height="30"
      >
        <use xlink:href="/img/icons/sprite.svg#camera"></use>
      </svg>
    </label>
  </div>
</template>

<script>
export default {
  name: 'v-file',
  props: {
    name: {
      required: true,
      type: String,
    },
    title: {
      default: '',
    },
    disabled: {
      default: false,
    },
    modelValue: {
      default: null,
    },
  },
  methods: {
    handleChange(event) {
      this.$emit('changeFile', event.target.files[0]);
    },
  },
};
</script>
