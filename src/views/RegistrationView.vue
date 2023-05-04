<template>
  <div class="w-full">
    <form class="flex flex-col w-full gap-8">
      <label for="job" class="flex flex-col justify-start">
        <span class="text-2xl text-gray-default mb-2">Должность</span>
        <select
          id="job"
          class="px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none"
          name="job"
        >
          <option value="default" selected>Выберите должность</option>
          <option value="teacher">Преподаватель</option>
        </select>
      </label>
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
      <label for="password_verify" class="flex flex-col justify-start">
        <span class="text-2xl text-gray-default mb-2">Подтвердите пароль</span>
        <input
          id="password_verify"
          class="px-4 py-6 text-2xl text-black bg-primary-light rounded-lg outline-none"
          type="password"
        >
      </label>
      <button
        class="px-4 py-6 mt-14 text-2xl text-white bg-primary-default rounded-lg outline-none"
      >Зарегистрироваться</button>
    </form>
  </div>
</template>
