<template>
  <div>
    <div class="uppercase text-heading-2 text-neutral-darkset font-semibold">
      {{ title }}
    </div>

    <div class="w-full h-[622px] mt-7.5">
      <iframe style="width: 100%; height: 100%" frameborder="0" ref="iframe" :src="chartUrL"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },

    url: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      chartUrL: null,
    };
  },

  created() {
    this.chartUrL = this.url;
  },
};
</script>
