<template>
  <div class="w-full">
    <form class="flex flex-col w-full gap-8">
      <label for="email" class="flex flex-col justify-start">
        <span class="text-2xl text-gray-default mb-2">Email</span>
        <input
          id="email"
          class="px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none"
          type="text"
        >
      </label>
      <label for="password" class="flex flex-col justify-start">
        <span class="text-2xl text-gray-default mb-2">Пароль</span>
        <input
          id="password"
          class="px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none"
          type="password"
        >
      </label>
      <button
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Авторизоваться</button>
    </form>
  </div>
</template>
