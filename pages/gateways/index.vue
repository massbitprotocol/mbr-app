<template>
  <div class="min-h-[80vh] mx-auto w-full pb-30">
    <Portal to="banner" tag="div">
      <div class="bg-banner-gateway-pattern bg-neutral-darker h-[268px] flex items-center justify-center">
        <div class="container mx-auto">
          <div class="text-title-1 md:text-medium-title text-neutral-white font-bold">Welcome to Community Gateway</div>

          <div class="mt-2 text-body-1 md:text-heading-2 font-medium text-primary-background">Content</div>
        </div>
      </div>
    </Portal>

    <div v-if="$fetchState.pending" class="w-full h-[45vh] flex items-center justify-center">
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
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

      <div class="text-body-1 font-medium text-neutral-darkset">Loading...</div>
    </div>

    <div v-else>
      <!-- Zones -->
      <div class="mt-15 lg:mb-7.5">
        <div
          class="
            uppercase
            whitespace-nowrap
            text-heading-2
            lg:text-title-2
            text-neutral-darkset
            font-medium
            lg:font-bold
          "
        >
          Zones
        </div>

        <GatewayDashboardZones @selectZone="selectZone" />
      </div>

      <!-- Stats -->
      <div class="mt-15 lg:mb-7.5">
        <div
          class="
            uppercase
            whitespace-nowrap
            text-heading-2
            lg:text-title-2
            text-neutral-darkset
            font-medium
            lg:font-bold
          "
        >
          Stats
        </div>

        <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
          <template v-for="(chart, index) in charts">
            <div :key="index" class="p-7.5 border border-primary-background rounded-xl">
              <GatewayDashboardApiChart
                :title="chart.name"
                :url="chart.url"
                :filters="chart.filters"
                :filter.sync="chart.filter"
              />
            </div>
          </template>
        </div>
      </div>

      <!-- Your Gateway -->
      <div class="mt-15 flex flex-col md:flex-row items-start md:items-center flex-wrap justify-between gap-2">
        <div
          class="
            uppercase
            whitespace-nowrap
            text-heading-2
            lg:text-title-2
            text-neutral-darkset
            font-medium
            lg:font-bold
          "
        >
          Your Gateway
        </div>
      </div>

      <div class="flex flex-col gap-y-2.5">
        <template v-for="(api, index) in apiList">
          <GatewayDashboardApiCard :key="index" :api="api" @updateApiStatus="(value) => updateApiStatus(api, value)" />
        </template>
      </div>

      <GatewayDashboardModalCreateApi :visible.sync="showModalCreateApi" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

const charts = [
  {
    name: 'Total Requests',
    url: 'https://gw.mbr.massbitroute.com/__internal_grafana/d-solo/6y_ACGKnk/sitestat?orgId=1&var-Instance=All&var-Host=p3v1vkrvkz89.eth-mainnet.massbitroute.com&panelId=1',
    filters: [
      {
        name: 'Last 5 Minutes',
        value: 'now|now-5m',
      },
      {
        name: 'Last 30 Minutes',
        value: 'now|now-30m',
      },
      {
        name: 'Last 1 Hour',
        value: 'now|now-1h',
      },
      {
        name: 'Last 6 Hour',
        value: 'now|now-6h',
      },
      {
        name: 'Last 12 Hour',
        value: 'now|now-12h',
      },
      {
        name: 'Last 24 Hour',
        value: 'now|now-24h',
      },
      {
        name: 'Last 2 Days',
        value: 'now|now-2d',
      },
      {
        name: 'Last 7 Days',
        value: 'now|now-7d',
      },
      {
        name: 'Last 30 Days',
        value: 'now|now-30d',
      },
      {
        name: 'Last 90 Days',
        value: 'now|now-90d',
      },
      {
        name: 'Last 6 Months',
        value: 'now|now-6M',
      },
      {
        name: 'Last 1 Year',
        value: 'now|now-1y',
      },
      {
        name: 'Last 2 Year',
        value: 'now|now-2y',
      },
      {
        name: 'Last 5 Year',
        value: 'now|now-5y',
      },
      {
        name: 'Yesterday',
        value: 'now-1d/d|now-1d/d',
      },
      {
        name: 'Day Before Yesterday',
        value: 'now-2d/d|now-2d/d',
      },
      {
        name: 'This Day Last Week',
        value: 'now-7d/d|now-7d/d',
      },
      {
        name: 'Previous Week',
        value: 'now-1w/w|now-1w/w',
      },
      {
        name: 'Previous Month',
        value: 'now-1M/M|now-1M/M',
      },
      {
        name: 'Previous Year',
        value: 'now-1y/y|now-1y/y',
      },
      {
        name: 'Today',
        value: 'now/d|now/d',
      },
      {
        name: 'Today so far',
        value: 'now|now/d',
      },
      {
        name: 'This Week',
        value: 'now/w|now/w',
      },
      {
        name: 'This Week so far',
        value: 'now|now/w',
      },
      {
        name: 'This Month',
        value: 'now/M|now/M',
      },
      {
        name: 'This Month so far',
        value: 'now|now/M',
      },
      {
        name: 'This Year',
        value: 'now/y|now/y',
      },
      {
        name: 'This Year so far',
        value: 'now|now/y',
      },
    ],
    filter: 'now|now-6h',
  }, // Total Requests
  {
    name: 'Total Bandwidth',
    url: 'https://gw.mbr.massbitroute.com/__internal_grafana/d-solo/6y_ACGKnk/sitestat?orgId=1&var-Instance=All&var-Host=p3v1vkrvkz89.eth-mainnet.massbitroute.com&panelId=2',
    filters: [
      {
        name: 'Last 5 Minutes',
        value: 'now|now-5m',
      },
      {
        name: 'Last 30 Minutes',
        value: 'now|now-30m',
      },
      {
        name: 'Last 1 Hour',
        value: 'now|now-1h',
      },
      {
        name: 'Last 6 Hour',
        value: 'now|now-6h',
      },
      {
        name: 'Last 12 Hour',
        value: 'now|now-12h',
      },
      {
        name: 'Last 24 Hour',
        value: 'now|now-24h',
      },
      {
        name: 'Last 2 Days',
        value: 'now|now-2d',
      },
      {
        name: 'Last 7 Days',
        value: 'now|now-7d',
      },
      {
        name: 'Last 30 Days',
        value: 'now|now-30d',
      },
      {
        name: 'Last 90 Days',
        value: 'now|now-90d',
      },
      {
        name: 'Last 6 Months',
        value: 'now|now-6M',
      },
      {
        name: 'Last 1 Year',
        value: 'now|now-1y',
      },
      {
        name: 'Last 2 Year',
        value: 'now|now-2y',
      },
      {
        name: 'Last 5 Year',
        value: 'now|now-5y',
      },
      {
        name: 'Yesterday',
        value: 'now-1d/d|now-1d/d',
      },
      {
        name: 'Day Before Yesterday',
        value: 'now-2d/d|now-2d/d',
      },
      {
        name: 'This Day Last Week',
        value: 'now-7d/d|now-7d/d',
      },
      {
        name: 'Previous Week',
        value: 'now-1w/w|now-1w/w',
      },
      {
        name: 'Previous Month',
        value: 'now-1M/M|now-1M/M',
      },
      {
        name: 'Previous Year',
        value: 'now-1y/y|now-1y/y',
      },
      {
        name: 'Today',
        value: 'now/d|now/d',
      },
      {
        name: 'Today so far',
        value: 'now|now/d',
      },
      {
        name: 'This Week',
        value: 'now/w|now/w',
      },
      {
        name: 'This Week so far',
        value: 'now|now/w',
      },
      {
        name: 'This Month',
        value: 'now/M|now/M',
      },
      {
        name: 'This Month so far',
        value: 'now|now/M',
      },
      {
        name: 'This Year',
        value: 'now/y|now/y',
      },
      {
        name: 'This Year so far',
        value: 'now|now/y',
      },
    ],
    filter: 'now|now-6h',
  }, // Total Bandwidth
];
export default {
  name: 'Index',
  middleware: ['auth'],
  auth: true,

  layout: 'dashboard',

  async fetch() {
    await this.$store.dispatch('gateway/getListApi');
  },

  data() {
    return {
      apis: [],
      showModalCreateApi: false,
      charts,
    };
  },

  computed: {
    ...mapGetters({
      apiList: 'gateway/list',
    }),
  },

  methods: {
    async updateApiStatus(api, checked) {
      let _api = _.cloneDeep(api);
      await this.$store.dispatch('gateway/updateApi', Object.assign(_api, { status: checked ? 1 : 0 }));
    },

    selectZone(zone) {
      console.log('zone :>> ', zone);
      this.showModalCreateApi = true;
    },
  },
};
</script>
