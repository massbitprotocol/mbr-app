<template>
  <div>
    <div class="uppercase text-heading-2 text-neutral-darkset font-semibold">
      {{ title }}
    </div>

    <div class="w-full h-[622px] mt-7.5">
      <!-- <select v-model="filter" style="width: 146px">
        <option value="now-5m">Last 5 Minutes</option>
        <option value="now-15m">Last 15 Minutes</option>
        <option value="now-30m">Last 30 Minutes</option>
        <option value="now-1h">Last 1 Hour</option>
        <option value="now-3h">Last 3 Hour</option>
        <option value="now-6h">Last 6 Hour</option>
        <option value="now-12h">Last 12 Hour</option>
        <option value="now-24h">Last 24 Hours</option>
        <option value="now-2d">Last 2 Days</option>
        <option value="now-7d">Last 7 Days</option>
        <option value="now-30d">Last 30 Days</option>
        <option value="now-90d">Last 90 Days</option>
        <option value="now-6M">Last 6 Months</option>
        <option value="now-1y">Last 1 Year</option>
        <option value="now-2y">Last 2 Year</option>
        <option value="now-5y">Last 5 Year</option>
        <option value="now-1d/d">Yesterday</option>
        <option value="now-2d/d">Day Before Yesterday</option>
        <option value="now-7d/d">This Day Last Week</option>
        <option value="now-1w/w">Previous Week</option>
        <option value="now-1M/M">Previous Month</option>
        <option value="now-1y/y">Previous Year</option>
        <option value="now/d">Today</option>
        <option value="now/d">Today so far</option>
        <option value="now/w">This Week</option>
        <option value="now/w">This Week so far</option>
        <option value="now/M">This Month</option>
        <option value="now/M">This Month so far</option>
        <option value="now/y">This Year</option>
        <option value="now/y">This Year so far</option>
        <option value="custom">Custom Period</option>
      </select> -->
      <client-only>
        <iframe style="width: 100%; height: 100%" frameborder="0" ref="iframe" :src="url"></iframe>
      </client-only>
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
      filter: '',
    };
  },

  created() {
    this.chartUrL = this.url;
  },
};
</script>
