<template>
  <div class="min-h-[80vh] mx-auto w-full pb-30">
    <Portal to="banner" tag="div">
      <div class="bg-banner-gateway-pattern bg-neutral-darker h-[268px] flex items-center justify-center">
        <div class="container mx-auto">
          <div class="text-title-1 md:text-medium-title text-neutral-white font-bold">Welcome to Community Gateway</div>

          <!-- <div class="mt-2 text-body-1 md:text-heading-2 font-medium text-primary-background">Content</div> -->
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
          class="uppercase whitespace-nowrap text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold"
        >
          Zones
        </div>

        <GatewayDashboardZones @selectZone="selectZone" />
      </div>

      <!-- Stats -->
      <div class="mt-15 lg:mb-7.5">
        <div
          class="uppercase whitespace-nowrap text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold"
        >
          Stats
        </div>

        <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
          <template v-for="(chart, index) in charts">
            <div :key="index" class="p-7.5 border border-primary-background rounded-xl">
              <GatewayDashboardApiChart
                :title="chart.name"
                :url="chart.url"
                :filters="filters"
                :params="chart.params"
                :filter.sync="chart.filter"
              />
            </div>
          </template>
        </div>
      </div>

      <!-- Your Gateway -->
      <div class="mt-15 flex flex-col md:flex-row items-start md:items-center flex-wrap justify-between gap-2">
        <div
          class="uppercase whitespace-nowrap text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold"
        >
          Your Gateway
        </div>
      </div>

      <div v-if="apiList && apiList.length > 0" class="flex flex-col gap-y-2.5">
        <template v-for="(api, index) in apiList">
          <GatewayDashboardApiCard :key="index" :api="api" @updateApiStatus="(value) => updateApiStatus(api, value)" />
        </template>
      </div>
      <div v-else class="mt-7.5 text-heading-2 text-neutral-darker">
        No gateway.<br />
        Please choose zone and create your own gateway.
      </div>

      <GatewayDashboardModalCreateApi :visible.sync="showModalCreateApi" :zone="zone" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

import chartFilters from '~/mixins/chartFilters';

export default {
  name: 'Index',
  middleware: ['auth'],
  auth: true,

  layout: 'dashboard',

  mixins: [chartFilters],

  async fetch() {
    await this.$store.dispatch('gateway/getListApi');
  },

  data() {
    return {
      apis: [],
      showModalCreateApi: false,
      charts: [
        {
          name: 'Total Requests',
          url: 'https://stat.mbr.massbitroute.com/__internal_grafana/d-solo/zb9F6co7k/mbrg',
          filter: 'now|now-6h',
          params: {
            orgId: 1,
            theme: 'light',
            'var-Instance': 'All',
            'var-FilterName': 'All',
            'var-Filter': `All`,
            panelId: 6,
          },
        },
        {
          name: 'Total Bandwidth',
          url: 'https://stat.mbr.massbitroute.com/__internal_grafana/d-solo/zb9F6co7k/mbrg',
          filter: 'now|now-6h',
          params: {
            orgId: 1,
            theme: 'light',
            'var-Instance': 'All',
            'var-FilterName': 'All',
            'var-Filter': `All`,
            panelId: 8,
          },
        },
      ],
      zone: '',
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
      this.zone = zone;

      this.showModalCreateApi = true;
    },
  },
};
</script>
