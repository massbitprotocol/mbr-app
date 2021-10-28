<template>
  <div>
    <nav class="flex items-center font-medium text-neutral-darker space-x-7.5">
      <NuxtLink :to="{ name: 'index' }">Home</NuxtLink>
      <NuxtLink :to="{ name: 'projects' }">MassBit Explorer</NuxtLink>
      <NuxtLink :to="{ name: 'index' }">My MassBit</NuxtLink>
      <NuxtLink :to="{ name: 'index' }" class="flex items-center space-x-2">
        <span>Provider</span>
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5 6.19999C4.7952 6.19999 4.5904 6.12159 4.4344 5.96559L0.434399 1.96559C0.121599 1.65279 0.121599 1.14719 0.434399 0.834392C0.747199 0.521592 1.2528 0.521592 1.5656 0.834392L5 4.26879L8.4344 0.834392C8.7472 0.521592 9.2528 0.521592 9.5656 0.834392C9.8784 1.14719 9.8784 1.65279 9.5656 1.96559L5.5656 5.96559C5.4096 6.12159 5.2048 6.19999 5 6.19999Z"
            fill="#13274C"
          />
        </svg>
      </NuxtLink>
      <NuxtLink :to="{ name: 'index' }">Documentation</NuxtLink>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TheNavigator',
};
</script>
