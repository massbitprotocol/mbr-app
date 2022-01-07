<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="disabled"
    :class="{
      'flex items-center justify-center cursor-pointer text-white text-body-1 font-medium h-[40px] px-7.5 rounded-lg hover:bg-primary/90': true,
      'bg-primary': !loading,
      'bg-primary/90': loading,
      'cursor-not-allowed bg-primary/70 hover:bg-primary/70': disabled === true,
    }"
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
  },
};
</script>
