<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    type="button"
    :class="{
      'h-[40px] inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-darker hover:shadow-lg focus:bg-darker focus:shadow-lg focus:outline-none focus:ring-0 active:bg-darker active:shadow-lg transition duration-150 ease-in-out': true,
      'bg-primary': !loading,
      'bg-primary/90': loading,
      'cursor-not-allowed opacity-60': disabled === true,
      'w-full': block === true,
    }"
    :disabled="disabled"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
export default {
  name: 'BaseButton',

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
