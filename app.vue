<template>
  <div>
    <ul class="flex flex-row mb-4">
      <li class="mx-2">
        <NuxtLink
          to="/edit"
          class="p-2 border border-blue-600 bg-blue-600 rounded-md text-white"
          >edit</NuxtLink
        >
      </li>
      <li class="mx-2">
        <NuxtLink
          to="/render"
          class="p-2 border border-blue-600 bg-blue-600 rounded-md text-white"
          >render</NuxtLink
        >
      </li>
    </ul>

    <NuxtPage />
  </div>
</template>
