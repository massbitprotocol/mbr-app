<template>
  <div class="min-h-[80vh] mx-auto w-full">
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
      <!-- YOUR GATEWAY -->
      <div
        class="mt-15 flex flex-col md:flex-row items-start md:items-center flex-wrap justify-between gap-2 lg:mb-7.5"
      >
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
          YOUR GATEWAY
        </div>
      </div>

      <div class="flex flex-col gap-y-2.5">
        <template v-for="(api, index) in apiList">
          <GatewayDashboardApiCard :key="index" :api="api" @updateApiStatus="(value) => updateApiStatus(api, value)" />
        </template>
      </div>

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
          ZONES
        </div>

        <GatewayDashboardZones @selectZone="selectZone" />
      </div>

      <template v-for="(chart, index) in charts">
        <GatewayDashboardApiChart
          class="my-10 lg:my-15"
          :key="index"
          :title="chart.name"
          :url="chart.url"
          :filters="chart.filters"
          :filter.sync="chart.filter"
        />
      </template>

      <GatewayDashboardModalCreateApi :visible.sync="showModalCreateApi" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

import chartConfig from '~/mixins/chartConfig';

export default {
  name: 'Index',
  middleware: ['auth'],
  auth: true,

  layout: 'dashboard',

  mixins: [chartConfig],

  async fetch() {
    await this.$store.dispatch('gateway/getListApi');
  },

  data() {
    return {
      apis: [],
      showModalCreateApi: false,
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
