<template>
  <label class="flex items-center justify-between" :for="name">
    <span class="text-2xl text-gray">{{ title }}</span>
    <input
      :id="name"
      type="checkbox"
    >
  </label>
</template>

<style scoped>
input {
  position: relative;
  display: flex;
  align-items: center;
  width: 0;
  height: 0;
}
input:before {
  content: '';
  position: absolute;
  display: block;
  width: 4.5rem;
  height: 2.6rem;
  right: 0;
  border-radius: 2rem;
  @apply bg-primary-100;
}
input:after {
  content: '';
  position: absolute;
  display: block;
  width: 2rem;
  height: 2rem;
  right: 0.3rem;
  border-radius: 100%;
  @apply bg-primary-default transition-transform;
}
input:checked:after {
  transform: translateX(-1.8rem);
}
</style>

<script>
export default {
  props: {
    name: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
  },
};
</script>
