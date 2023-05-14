<template>
  <label :for="name">
    <textarea
      id="name"
      class="w-full px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none"
      @input="handleInput"
      @keydown.enter="handleEnter"
      cols="30"
      :rows="rows"
      ref="textarea"
      :value="modelValue"
      :placeholder="placeholder"
    ></textarea>
  </label>
</template>

<script>
export default {
  name: 'v-textarea',
  props: {
    modelValue: {
      default: '',
    },
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
    placeholder: {
      default: '',
    },
    rows: {
      type: Number,
      default: 7,
    },
    minHeight: {
      type: Number,
      default: 170,
    },
  },
  mounted() {
    if (this.$refs.textarea) {
      this.$refs.textarea.focus();
      this.handleTextAreaSize();
    }
  },
  methods: {
    handleInput(event) {
      this.handleTextAreaSize();
      this.$emit('update:modelValue', event.target.value.trim());
    },
    handleTextAreaSize() {
      this.$refs.textarea.style.height = '0px';
      const height = Math.max(this.$refs.textarea.scrollHeight, this.minHeight);
      this.$refs.textarea.style.height = `${height}px`;
    },
    handleEnter(event) {
      if (event.ctrlKey) {
        event.preventDefault();
        this.$emit('submit', this.modelValue);
        this.$refs.textarea.value = '';
        // this.modelValue = '';
        return;
      }
      if (!event.ctrlKey && !event.shiftKey) {
        event.preventDefault();
        this.$refs.textarea.value += '\n';
      }
      this.handleTextAreaSize();
    },
  },
};
</script>
