<template>
  <div class="mt-5 lg:mt-7.5">
    <div class="w-full flex items-center justify-between">
      <div class="uppercase text-heading-2 text-neutral-darkset font-semibold">
        {{ title }}
      </div>

      <select
        v-model="_filter"
        class="
          h-[44px]
          px-5
          cursor-pointer
          border border-primary-background
          rounded-xl
          text-body-2 text-neutral-darker
          font-semibold
        "
      >
        <template v-for="item in filters">
          <option :key="item.value" :value="item.value">{{ item.name }}</option>
        </template>
      </select>
    </div>

    <div class="w-full h-[50vh] mt-7.5">
      <iframe style="width: 100%; height: 100%" frameborder="0" ref="iframeChart" :src="chartUrL"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardStats',

  props: {
    title: {
      type: String,
      default: '',
    },

    url: {
      type: String,
      required: true,
    },

    filters: {
      type: Array,
      default: () => [],
    },

    filter: {
      type: String,
      default: '',
    },
  },

  computed: {
    _filter: {
      get() {
        return this.filter;
      },
      set(value) {
        this.$emit('update:filter', value);
      },
    },

    parsedFilter() {
      let parsedFilter = this._filter.split('|');
      return [parsedFilter[0] || '', parsedFilter[1] || ''];
    },

    chartUrL() {
      return `${this.url}&from=${this.parsedFilter[0]}&to=${this.parsedFilter[1]}`;
    },
  },
};
</script>
