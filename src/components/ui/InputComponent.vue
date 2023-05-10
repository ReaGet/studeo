<template>
  <label :for="name" class="flex flex-col justify-start">
    <span class="text-2xl text-gray-default mb-2">{{ title }}</span>
    <input
      :id="name"
      class="px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none"
      :type="type"
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="handleInput"
    >
  </label>
</template>

<script>
export default {
  name: 'v-input',
  props: {
    name: {
      required: true,
      type: String,
    },
    type: {
      default: 'text',
    },
    value: {
      default: '',
    },
    title: {
      default: '',
    },
    disabled: {
      default: false,
    },
    placeholder: {
      default: '',
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('oninput', event.target.value.trim());
    },
  },
};
</script>
