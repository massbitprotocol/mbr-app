<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="
      flex
      items-center
      justify-center
      cursor-pointer
      bg-primary
      text-white text-body-1
      font-semibold
      h-[40px]
      px-7.5
      rounded-lg
      hover:bg-primary/90
    "
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
