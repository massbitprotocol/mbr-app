<template>
  <div class="flex flex-col border border-primary-background py-3 px-5 rounded-lg max-w-lg">
    <div class="text-primary text-heading-1 font-bold">
      {{ value }}
    </div>

    <div class="text-body-1 mt-1 text-neutral-normal">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseStatistic',

  props: {
    name: {
      type: String,
      default: '',
    },

    value: {
      type: String | Number,
      default: '',
    },
  },
};
</script>
