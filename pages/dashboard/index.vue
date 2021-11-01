<template>
  <div class="min-h-[80vh] mx-auto w-full">
    <div class="text-title-2 lg:text-medium-title text-neutral-darkset font-bold my-5 lg:my-10">Dashboard</div>
    <div class="flex items-center flex-wrap justify-between gap-2 mb-3 lg:mb-7.5">
      <div class="whitespace-nowrap text-heading-2 lg:text-title-2 text-neutral-darkset font-semibold lg:font-bold">
        YOUR API KEYS
      </div>

      <button
        class="
          flex
          items-center
          justify-center
          cursor-pointer
          bg-neutral-lightest
          text-primary text-body-1
          font-semibold
          h-[52px]
          px-7.5
          rounded-lg
          hover:bg-neutral-lightest/90
          whitespace-nowrap
        "
      >
        <svg class="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 9H11V3C11 2.448 10.553 2 10 2C9.447 2 9 2.448 9 3V9H3C2.447 9 2 9.448 2 10C2 10.552 2.447 11 3 11H9V17C9 17.552 9.447 18 10 18C10.553 18 11 17.552 11 17V11H17C17.553 11 18 10.552 18 10C18 9.448 17.553 9 17 9Z"
            fill="#2C3ACF"
          />
        </svg>

        Create new API Key
      </button>
    </div>

    <DashboardApiCard />

    <template v-for="(chart, index) in charts">
      <DashboardApiChart :key="index" :title="chart.name" :url="chart.url" class="my-10 lg:my-15" />
    </template>
  </div>
</template>

<script>
const charts = [
  {
    name: 'Total Requests"',
    url: 'https://gw.mbr.massbitroute.com/__internal_grafana/d-solo/6y_ACGKnk/sitestat?orgId=1&amp;var-Instance=All&amp;var-Host=p3v1vkrvkz89.eth-mainnet.massbitroute.com&amp;panelId=1&amp;from=now&amp;to=now-6h',
  },
];

export default {
  name: 'Index',

  data() {
    return {
      charts,
    };
  },

  created() {
    // this.test();
  },

  methods: {
    async test() {
      try {
        const data = await this.$axios.$get('/api/v1?action=user.ping');
        console.log('data :>> ', data);
      } catch (error) {
        console.log('error :>> ', error);
      }
    },
  },
};
</script>
