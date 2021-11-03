<template>
  <v-popover trigger="hover" offset="8" :placement="placement">
    <slot />

    <template slot="popover">
      <div :class="contentClass">
        {{ content }}
      </div>
    </template>
  </v-popover>
</template>

<script>
export default {
  name: 'BasePopover',

  props: {
    content: {
      type: String,
      default: '',
    },

    contentClass: {
      type: String,
      default: '',
    },

    placement: {
      type: String,
      default: 'bottom',
    },
  },
};
</script>
