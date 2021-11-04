<template>
  <Transition
    enter-active-class="ease-out duration-200"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-100"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="open"
      class="fixed z-10 inset-0 overflow-y-auto scrolling-touch"
      :class="{ 'backdrop-blur-md': blur }"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:items-center sm:py-0">
        <!-- Background overlay, show/hide based on modal state. -->
        <div
          class="fixed inset-0 bg-neutral-darkest/80 transition-opacity"
          aria-hidden="true"
          @click="backdrop && $emit('update:open', false)"
        />

        <!-- Modal panel, show/hide based on modal state. -->
        <Transition
          enter-active-class="ease-out duration-200"
          enter-class="translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-100"
          leave-class="translate-y-0 sm:scale-100"
          leave-to-class="translate-y-4 sm:translate-y-0 sm:scale-95"
          mode="out-in"
        >
          <slot v-if="open" />
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'TheModal',
  props: {
    open: {
      type: Boolean,
      required: true,
    },

    blur: {
      type: Boolean,
      default: false,
    },

    backdrop: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
