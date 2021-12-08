<template>
  <div class="pb-20">
    <NodeDashboardBreadcrumb />

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
      <client-only>
        <div
          class="w-full flex flex-col sm:flex sm:flex-row sm:items-center sm:justify-between mt-5 mb-3 lg:mt-10 lg:mb-5"
        >
          <div class="text-2xl lg:text-medium-title text-neutral-darkset font-bold">
            <template v-if="editName">
              <input
                :value="_api.name"
                @blur="updateApiName"
                ref="apiName"
                type="text"
                class="
                  text-2xl
                  lg:text-medium-title
                  text-neutral-darkset
                  font-bold
                  appearance-none
                  block
                  w-full
                  border border-primary-background
                  rounded
                  leading-tight
                "
              />
            </template>
            <template v-else>
              {{ _api.name }}
            </template>
          </div>

          <div class="flex justify-between items-center sm:justify-end gap-3 mt-3">
            <div class="flex gap-3 items-center">
              <BasePopover class="flex items-center" content="Change the name of the API key" contentClass="w-[197px]">
                <BaseIconButton class="w-[36px] h-[36px]" icon="edit" @click="showEditApiName" />
              </BasePopover>

              <!-- <BasePopover
              class="flex items-center"
              content="Delete this API key, if you don’t need it anymore."
              contentClass="w-[197px]"
            >
              <BaseIconButton class="w-[36px] h-[36px]" icon="delete" />
            </BasePopover> -->
            </div>

            <BasePopover
              class="flex items-center"
              content="Change status of the API key. If you don't want API key active, please switch it off."
              contentClass="w-[197px]"
            >
              <BaseToggle :checked.sync="status" />
            </BasePopover>
          </div>
        </div>

        <div class="grid items-center grid-cols-1 lg:grid-cols-3 gap-5">
          <DashboardApiID :apiKey="api.id" />
          <DashboardApiCreatedAt :createdAt="api.created_at" />
          <DashboardApiUpdatedAt :updatedAt="api.updated_at" />
        </div>

        <div class="mt-10 lg:mt-15">
          <div class="flex items-center justify-between">
            <div class="uppercase text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold">
              Overview
            </div>
          </div>

          <DashboardOverview :api="api" />
        </div>

        <div class="mt-10 lg:mt-15">
          <div class="flex items-center justify-between">
            <div class="uppercase text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold">
              Stats
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
            <template v-for="(chart, index) in charts">
              <DashboardStats
                :key="index"
                :title="chart.name"
                :url="chart.url"
                :filters="chart.filters"
                :filter.sync="chart.filter"
              />
            </template>
          </div>
        </div>
      </client-only>
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
  name: 'NodesDashboardDetail',

  middleware: ['auth'],
  auth: true,

  async fetch() {
    const api = await this.$store.dispatch('gateway/getApi', this.id);
    if (!api) {
      return this.$nuxt.error({ statusCode: 404, message: 'Api not found' });
    }
  },

  data() {
    return {
      editName: false,
      charts,
    };
  },

  computed: {
    ...mapGetters({
      api: 'gateway/value',
      getBlockchainByID: 'blockchains/getBlockchainByID',
    }),

    id() {
      return this.$route.params.id || null;
    },

    status: {
      get() {
        return !!parseInt(this.api.status);
      },
      async set(value) {
        let _api = _.cloneDeep(this.api);
        await this.$store.dispatch('gateway/updateApi', Object.assign(_api, { status: value ? 1 : 0 }));
      },
    },

    _api: {
      get() {
        return this.api;
      },
      async set(value) {
        await this.$store.dispatch('gateway/updateApi', value);
      },
    },

    _blockchain() {
      return this.getBlockchainByID(this.api.blockchain) || null;
    },

    _apiInterface() {
      if (this._blockchain && this._blockchain.api_interface && this.api.api_interface) {
        return this._blockchain.api_interface.find((item) => item.id === this.api.api_interface);
      }

      return null;
    },

    _security: {
      get() {
        return this.api.security;
      },
      async set(value) {
        let _api = _.cloneDeep(this.api);
        await this.$store.dispatch('gateway/updateApi', Object.assign(_api, { security: value }));
      },
    },
  },

  methods: {
    showEditApiName() {
      this.editName = true;
      this.$nextTick(() => {
        this.$refs.apiName.focus();
      });
    },

    async updateApiName() {
      let apiName = this.$refs.apiName.value;
      if (apiName) {
        if (apiName !== this.api.name) {
          let _api = _.cloneDeep(this.api);
          const result = await this.$store.dispatch('api/updateApi', Object.assign(_api, { name: apiName }));
          if (result) {
            this.$notify({ type: 'success', text: 'The name of your API key has been successfully changed!' });
          } else {
            this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
          }
        }
      } else {
        this.$notify({ type: 'error', text: 'Please enter the name' });
      }
      this.editName = false;
    },
  },
};
</script>
