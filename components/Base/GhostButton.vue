<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="loading"
    class="flex items-center justify-center cursor-pointer border border-primary text-primary text-body-2 font-medium h-[40px] px-7.5 rounded-lg hover:text-primary/70 hover:border-primary/50 focus:border-primary"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
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

    loading: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
