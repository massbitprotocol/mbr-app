<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="
      flex
      items-center
      justify-center
      cursor-pointer
      rounded
      bg-neutral-lightest
      text-neutral-darkset
      hover:text-neutral-darkset/70
    "
    v-html="require(`~/assets/svg/icon/${icon}.svg?raw`)"
  ></button>
</template>

<script>
export default {
  name: 'BaseIconButton',

  props: {
    icon: {
      type: String,
      default: '',
    },
  },
};
</script>
