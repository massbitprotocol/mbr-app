<template>
  <div class="pb-20">
    <DashboardBreadcrumb />

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
          <div class="w-full h-[52px] mr-5 text-2xl lg:text-medium-title text-neutral-darkset font-bold truncate">
            <template v-if="editName">
              <input
                :value="_api.name"
                @blur="updateApiName"
                ref="apiName"
                type="text"
                class="text-2xl lg:text-medium-title text-neutral-darkset font-bold appearance-none block w-full border border-primary-background rounded leading-tight"
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

              <BasePopover
                class="flex items-center"
                content="Delete this dApi, if you don’t need it anymore."
                contentClass="w-[197px]"
              >
                <BaseIconButton
                  class="w-[36px] h-[36px]"
                  icon="delete"
                  :loading="loadingDeleteApi"
                  @click="deleteApi"
                />
              </BasePopover>
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

        <div class="w-full inline-flex items-center gap-5">
          <DashboardApiID class="mr-15" :apiKey="api.id" />
          <DashboardApiKey class="mr-15" :apiKey="api.appKey" />
        </div>

        <DashboardApiProvider :api="api" />

        <DashboardApiBlockchain :blockchain="_blockchain" :apiInterface="_apiInterface" />

        <DashboardApiNetwork :limitRatePerDay="api.limitRatePerDay" />

        <DashboardApiSecurity />

        <DashboardApiEntrypoints />

        <div class="mt-10 lg:mt-15">
          <div class="flex items-center justify-between">
            <div class="uppercase text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold">
              Stats
            </div>
          </div>

          <template v-for="(chart, index) in charts">
            <DashboardStatsNew
              :key="index"
              :title="chart.name"
              :url="chart.url"
              :filters="filters"
              :params="chart.params"
              :filter.sync="chart.filter"
            />
          </template>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

import chartFilters from '~/mixins/chartFilters';

export default {
  name: 'DashboardDetail',

  middleware: ['auth'],
  auth: true,

  mixins: [chartFilters],

  async fetch() {
    try {
      const api = await this.$store.dispatch('api/getApi', this.id);
      if (!api) {
        return this.$nuxt.error({ statusCode: 404, message: 'Api not found' });
      }
    } catch (error) {
      return this.$nuxt.error({ statusCode: 404, message: 'Api not found' });
    }
  },

  created() {
    this.initChartConfig();
  },

  data() {
    return {
      editName: false,
      charts: [],
      loadingDeleteApi: false,
    };
  },

  computed: {
    ...mapGetters({
      api: 'api/value',
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
        await this.$store.dispatch('api/updateApi', { id: this.api.id, status: value ? 1 : 0 });
      },
    },

    _api: {
      get() {
        return this.api;
      },
      async set(value) {
        await this.$store.dispatch('api/updateApi', value);
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
        await this.$store.dispatch('api/updateApi', Object.assign(_api, { security: value }));
      },
    },
  },

  methods: {
    async deleteApi() {
      this.loadingDeleteApi = true;

      try {
        const isSuccess = await this.$store.dispatch('api/deleteApi', this.id);
        if (isSuccess) {
          this.$notify({ type: 'success', text: 'Api deleted successfully!' });

          this.$router.push({ name: 'projects' });
        }
      } catch (error) {
        console.log('error :>> ', error);
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          this.$notify({ type: 'error', text: message || 'Something was wrong. Please try again!' });
        } else {
          this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
        }
      }

      this.loadingDeleteApi = false;
    },

    showEditApiName() {
      this.editName = true;
      this.$nextTick(() => {
        this.$refs.apiName.focus();
      });
    },

    async updateApiName() {
      let apiName = this.$refs.apiName.value;
      if (apiName) {
        // Validate name
        if (apiName.length <= 120) {
          if (apiName !== this.api.name) {
            try {
              const res = await this.$store.dispatch('api/updateApi', { id: this.api.id, name: apiName });
              if (res) {
                this.$notify({ type: 'success', text: 'The name of your API key has been successfully changed!' });
              } else {
                this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
              }
            } catch (error) {
              console.log('error :>> ', error);
              if (error.response && error.response.data) {
                const { message } = error.response.data;
                this.$notify({ type: 'error', text: Array.isArray(message) ? message[0] : message });
              } else {
                this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
              }
            }
          }
        } else {
          this.$notify({ type: 'error', text: 'The length of the name is too long. The maximum length is 120' });
        }
      } else {
        this.$notify({ type: 'error', text: 'Please enter the name' });
      }
      this.editName = false;
    },

    initChartConfig() {
      this.charts = [
        {
          name: 'Total Requests',
          url: `${this.$config.statURL}/__internal_grafana/d-solo/YUv28Os7k/mbrg`,
          filter: 'now|now-6h',
          params: {
            orgId: 1,
            theme: 'light',
            'var-Instance': 'All',
            'var-FilterName': 'All',
            'var-Filter': `${this.id}::dapi::api_method`,
            panelId: 2,
          },
        },
        {
          name: 'Total Bandwidth',
          url: `${this.$config.statURL}/__internal_grafana/d-solo/YUv28Os7k/mbrg`,
          filter: 'now|now-6h',
          params: {
            orgId: 1,
            theme: 'light',
            'var-Instance': 'All',
            'var-FilterName': 'All',
            'var-Filter': `${this.id}::dapi::api_method`,
            panelId: 4,
          },
        },
      ];
    },
  },
};
</script>
