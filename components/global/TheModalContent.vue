<template>
  <div
    class="
      inline-block
      align-bottom
      bg-white
      rounded-xl
      text-left
      overflow-hidden
      shadow-xl
      transform
      transition-all
      sm:my-8 sm:align-middle
      p-5
    "
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TheModalContent',
};
</script>
