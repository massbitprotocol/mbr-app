<template>
  <div class="min-h-[80vh] mx-auto w-full mb-30">
    <Portal to="banner" tag="div">
      <div class="bg-banner-testnet-pattern bg-neutral-darker h-[268px] flex items-center justify-center">
        <div class="container mx-auto">
          <div class="text-title-1 md:text-medium-title text-neutral-white font-bold">Welcome to MBR Phase II</div>
          <div class="mt-3 !text-lg text-primary-background">
            After the success of the First Testnet for MassBit Route, we are launching Testnet Phase II with some new
            features. Your
            <a
              class="font-medium underline"
              href="https://docs.massbit.io/massbit-route-mbr/testnet-phase-ii-opening"
              target="_blank"
              rel="noopener noreferrer"
              >guidance & resources.</a
            >
          </div>
        </div>
      </div>
    </Portal>

    <div v-if="$fetchState.pending" class="w-full h-[45vh] flex items-center justify-center gap-3">
      <svg class="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
      <!-- Your Nodes -->
      <div class="flex flex-col md:flex-row items-start md:items-center flex-wrap justify-between gap-2 mb-5">
        <div
          class="mt-7.5 uppercase whitespace-nowrap text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold"
        >
          Your Nodes
        </div>
      </div>

      <div v-if="apiList && apiList.length > 0" class="flex flex-col gap-y-2.5">
        <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-5">
          <NodeDashboardApiCard
            v-for="(api, index) in apiList"
            :key="index"
            :api="api"
            :bandwidth="instanceBandwidthMetric.hasOwnProperty(api.id) ? instanceBandwidthMetric[api.id] : 0"
            :requests="instanceRequestMetric.hasOwnProperty(api.id) ? instanceRequestMetric[api.id] : 0"
            @updateApiStatus="(value) => updateApiStatus(api, value)"
          />

          <!-- Loading -->
          <div
            v-if="loadingGetNode"
            class="absolute flex items-center gap-3 justify-center top-0 left-0 min-w-full min-h-full bg-neutral-lightest/10"
          >
            <svg
              class="animate-spin h-5 w-5 text-primary"
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
        </div>

        <BasePagination class="mt-3" :meta="apiMeta" :links="apiLinks" @onChangePage="onChangePage" />
      </div>

      <div v-else class="mt-7.5 text-heading-2 text-neutral-darker">
        No node.<br />
        Please choose zone and create your own node.
      </div>

      <NodeDashboardModalCreateApi :visible.sync="showModalCreateApi" :zone="zone" />

      <!-- Zones -->
      <div class="mt-15 lg:mb-7.5">
        <div
          class="uppercase whitespace-nowrap text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold"
        >
          Zones
        </div>

        <NodeDashboardZones @selectZone="selectZone" />
      </div>

      <!-- Stats -->
      <div class="mt-15 lg:mb-7.5">
        <div
          class="uppercase whitespace-nowrap text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold"
        >
          Stats
        </div>

        <div class="relative min-h-[660px] mt-5 p-7.5 border border-primary-background rounded-xl">
          <div
            v-if="loadingStatBandwidth"
            class="absolute top-0 left-0 bg-primary-background/10 w-full h-full flex items-center justify-center"
          >
            <svg
              class="animate-spin -ml-1 mr-3 h-6 w-6 text-primary"
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

            <span class="text-body-1"> Loading... </span>
          </div>

          <NodeDashboardBandwidthChartSummary
            v-else
            :dataSource="statBandwidthData"
            @updateInstanceMetric="updateBanwidthInstanceMetric"
          />
        </div>

        <div class="relative min-h-[660px] mt-5 p-7.5 border border-primary-background rounded-xl">
          <div
            v-if="loadingStatRequests"
            class="absolute top-0 left-0 bg-primary-background/10 w-full h-full flex items-center justify-center"
          >
            <svg
              class="animate-spin -ml-1 mr-3 h-6 w-6 text-primary"
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

            <span class="text-body-1"> Loading... </span>
          </div>

          <NodeDashboardRequestChartSummary
            v-else
            :dataSource="statRequestsData"
            @updateInstanceMetric="updateRequestInstanceMetric"
          />
        </div>
      </div>
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
    await this.$store.dispatch('node/getListApi');
  },

  created() {
    this.getStatRequest();
    this.getStatBandwidth();
  },

  data() {
    return {
      apis: [],
      showModalCreateApi: false,
      loadingGetNode: false,
      loadingStatRequests: false,
      loadingStatBandwidth: false,
      statRequestsData: [],
      statBandwidthData: [],
      instanceBandwidthMetric: {},
      instanceRequestMetric: {},
      zone: '',
    };
  },

  computed: {
    ...mapGetters({
      apiList: 'node/list',
      apiMeta: 'node/meta',
      apiLinks: 'node/links',
    }),
  },

  methods: {
    async updateApiStatus(api, checked) {
      let _api = _.cloneDeep(api);
      await this.$store.dispatch('node/updateApi', Object.assign(_api, { status: checked ? 1 : 0 }));
    },

    selectZone(zone) {
      this.zone = zone;
      this.showModalCreateApi = true;
    },

    async onChangePage(paramsString) {
      this.loadingGetNode = true;

      await this.$store.dispatch('node/getListApi', paramsString);

      this.loadingGetNode = false;
    },

    async getStatBandwidth() {
      this.loadingStatBandwidth = true;

      const { data, instanceMetric } = await this.$axios.$get(`mbr/node/user/stat/bandwidth`);
      if (instanceMetric) {
        this.instanceBandwidthMetric = instanceMetric;
      }

      if (data && data.length) {
        this.statBandwidthData = data;
      } else {
        this.statBandwidthData = [];
      }

      this.loadingStatBandwidth = false;
    },

    async getStatRequest() {
      this.loadingStatRequests = true;

      const { data, instanceMetric } = await this.$axios.$get(`mbr/node/user/stat/requests`);
      if (instanceMetric) {
        this.instanceRequestMetric = instanceMetric;
      }
      if (data && data.length) {
        this.statRequestsData = data;
      } else {
        this.statRequestsData = [];
      }

      this.loadingStatRequests = false;
    },

    updateRequestInstanceMetric(metric) {
      const _metric = _.cloneDeep(metric);
      this.instanceRequestMetric = _metric;
    },

    updateBanwidthInstanceMetric(metric) {
      const _metric = _.cloneDeep(metric);
      this.instanceBandwidthMetric = _metric;
    },
  },
};
</script>
