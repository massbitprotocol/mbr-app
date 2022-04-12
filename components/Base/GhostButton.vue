<template>
  <button
    type="button"
    :class="{
      'h-[40px] inline-flex items-center justify-center px-6 py-2 border-2 border-primary text-primary font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out': true,
      'w-full': block,
    }"
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="loading"
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

    block: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
