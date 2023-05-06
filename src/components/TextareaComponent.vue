<template>
  <label :for="name">
    <textarea
      id="name"
      class="w-full px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none"
      @input="handleInput"
      @keydown.enter="handleEnter"
      cols="30"
      rows="7"
      ref="textarea"
      v-model.trim="text"
      :placeholder="placeholder"
    ></textarea>
  </label>
</template>

<script>
export default {
  name: 'v-textarea',
  props: {
    name: {
      required: true,
      type: String,
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
  data() {
    return {
      text: this.value,
    };
  },
  mounted() {
    if (this.$refs.textarea) {
      this.$refs.textarea.focus();
      this.handleTextAreaSize();
    }
  },
  methods: {
    handleInput() {
      this.handleTextAreaSize();
      this.$emit('input', this.text);
    },
    handleTextAreaSize() {
      this.$refs.textarea.style.height = '0px';
      const height = Math.max(this.$refs.textarea.scrollHeight, 170);
      this.$refs.textarea.style.height = `${height}px`;
    },
    handleEnter(event) {
      if (event.ctrlKey) {
        event.preventDefault();
        this.$emit('submit', this.text);
        this.text = '';
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
