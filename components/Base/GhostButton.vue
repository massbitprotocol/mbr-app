<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="
      flex
      items-center
      justify-center
      cursor-pointer
      border border-primary
      text-primary text-body-2
      font-medium
      h-[40px]
      px-7.5
      rounded-lg
      hover:border-primary/50
      focus:border-primary
    "
  >
    <slot />
  </button>
</template>

<script>
import Button from './Button.vue';
export default {
  components: { Button },
  name: 'BaseGhostButton',

  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
