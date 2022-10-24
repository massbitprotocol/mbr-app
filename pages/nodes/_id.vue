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
      <div
        class="w-full flex flex-col sm:flex sm:flex-row sm:items-center sm:justify-between mt-5 mb-3 lg:mt-10 lg:mb-5"
      >
        <div class="w-full mr-5 text-2xl !leading-none lg:text-medium-title text-neutral-darkset font-bold truncate">
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
            <h1 class="leading-tight">{{ _api.name }}</h1>
          </template>
        </div>

        <div class="flex justify-between items-center sm:justify-end gap-3">
          <div class="flex gap-3 items-center">
            <BasePopover class="flex items-center" content="Change the name of the API key" contentClass="w-[197px]">
              <BaseIconButton class="w-[36px] h-[36px]" icon="edit" @click="showEditApiName" />
            </BasePopover>

            <BasePopover
              v-if="api.status !== 'staked'"
              class="flex items-center"
              content="Delete this Node, if you don’t need it anymore."
              contentClass="w-[197px]"
            >
              <BaseIconButton class="w-[36px] h-[36px]" icon="delete" :loading="loadingDeleteApi" @click="deleteApi" />
            </BasePopover>
          </div>
        </div>
      </div>

      <div class="w-full inline-flex justify-between gap-1">
        <DashboardApiID :apiKey="api.id" />
        <DashboardApiStatus :api="api" :provider="'Node'" />
        <DashboardApiDetails
          v-if="api.status == 'failed' || api.status == 'verifying'"
          :api="api"
        />
        <DashboardApiCreatedAt :createdAt="api.createdAt" />
        <DashboardApiUpdatedAt :updatedAt="api.updatedAt" />
      </div>

      <div class="mt-10 lg:mt-15">
        <div class="flex items-center justify-between">
          <div class="uppercase text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold">
            Overview
          </div>
        </div>

        <NodeDashboardOverview :api="api" :isEditing.sync="isEditing" />
      </div>

      <div class="mt-15 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
        <!-- Blockchain -->
        <div v-if="_blockchain" class="p-5 bg-white rounded-xl border border-primary-background">
          <div class="text-body-1 text-neutral-darkset font-medium">Blockchain</div>

          <div v-if="_b" class="h-[44px] flex items-center justify-between">
            <div class="flex items-center mt-2">
              <img
                v-if="_blockchain.icon"
                :src="require(`~/assets/${_blockchain.icon}.svg`)"
                class="mr-2"
                width="32"
                height="32"
              />
              <div class="text-body-1 text-neutral-darkset font-medium">{{ _blockchain.value || '' }}</div>
            </div>

            <div class="h-[22px] flex items-center py-0.5 px-3 bg-primary rounded">
              <span class="text-white text-caption font-medium uppercase">{{ _blockchain.id || '' }} </span>
            </div>
          </div>
        </div>

        <!-- Network -->
        <div
          v-if="api.network"
          class="flex items-center justify-between p-5 bg-white rounded-xl border border-primary-background capitalize"
        >
          <div class="flex items-center">
            <div
              class="flex items-center h-[64px] mr-4"
              v-html="require(`~/assets/svg/dashboard/network.svg?raw`)"
            ></div>
            <div class="flex flex-col">
              <div class="text-body-1 text-neutral-normal font-medium">Network</div>
              <div class="text-body-1 text-neutral-normal font-medium">
                <span class="text-heading-1 text-accent-green"> {{ api.network }} </span>
              </div>
            </div>
          </div>
        </div>
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

          <NodeDashboardBandwidthChart v-else :dataSource="statBandwidthData" />
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

          <NodeDashboardRequestChart v-else :dataSource="statRequestsData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { mapGetters } from 'vuex';
import _ from 'lodash';

import chartFilters from '~/mixins/chartFilters';

export default {
  name: 'NodesDashboardDetail',

  middleware: ['auth'],
  auth: true,

  mixins: [chartFilters],

  async fetch() {
    const api = await this.$store.dispatch('node/getApi', this.id);
    if (!api) {
      return this.$nuxt.error({ statusCode: 404, message: 'Api not found' });
    }

    this.syncData();
  },
  fetchOnServer: false,

  async created() {
    this.getStatBandwidth();
    this.getStatRequest();
  },

  data() {
    return {
      editName: false,
      loadingDeleteApi: false,
      loadingStatBandwidth: false,
      statBandwidthData: [],
      loadingStatRequests: false,
      statRequestsData: [],
      charts: [],
      pollInfo: null,
      isEditing: false,
    };
  },

  computed: {
    ...mapGetters({
      api: 'node/value',
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
        await this.$store.dispatch('node/updateApi', Object.assign(_api, { status: value ? 1 : 0 }));
      },
    },

    _api: {
      get() {
        return this.api;
      },
      async set(value) {
        await this.$store.dispatch('node/updateApi', value);
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
        await this.$store.dispatch('node/updateApi', Object.assign(_api, { security: value }));
      },
    },
  },

  methods: {
    async deleteApi() {
      this.loadingDeleteApi = true;
      this.isEditing = true;

      try {
        const isSuccess = await this.$store.dispatch('node/deleteApi', this.id);
        if (isSuccess) {
          this.$notify({ type: 'success', text: 'Node deleted successfully!' });

          this.$router.push({ name: 'nodes' });
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
      this.isEditing = false;
    },

    showEditApiName() {
      this.editName = true;
      this.isEditing = true;
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
            let _api = _.cloneDeep(this.api);
            const result = await this.$store.dispatch('node/updateApi', Object.assign(_api, { name: apiName }));
            if (result) {
              this.$notify({ type: 'success', text: 'The name of your API key has been successfully changed!' });
            } else {
              this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
            }
          }
        } else {
          this.$notify({ type: 'error', text: 'The length of the name is too long. The maximum length is 120' });
        }
      } else {
        this.$notify({ type: 'error', text: 'Please enter the name' });
      }

      this.editName = false;
      this.isEditing = false;
    },

    async getStatBandwidth() {
      this.loadingStatBandwidth = true;

      const { data } = await this.$axios.$get(`mbr/node/stat/${this.id}/bandwidth`);
      if (data && data.length) {
        this.statBandwidthData = data;
      } else {
        this.statBandwidthData = [];
      }

      this.loadingStatBandwidth = false;
    },

    async getStatRequest() {
      this.loadingStatRequests = true;

      const { data } = await this.$axios.$get(`mbr/node/stat/${this.id}/requests`);
      if (data && data.length) {
        this.statRequestsData = data;
      } else {
        this.statRequestsData = [];
      }

      this.loadingStatRequests = false;
    },

    initChartConfig() {
      this.charts = [
        {
          name: 'Total Requests',
          url: `${this.$config.statURL}/__internal_grafana/d-solo/35llQjE7k/mbrn`,
          filter: 'now|now-6h',
          params: {
            orgId: 1,
            theme: 'light',
            'var-Instance': 'All',
            'var-FilterName': 'All',
            'var-Filter': `${this.id}::node::api_method`,
            panelId: 2,
          },
        },
        {
          name: 'Total Bandwidth',
          url: `${this.$config.statURL}/__internal_grafana/d-solo/35llQjE7k/mbrn`,
          filter: 'now|now-6h',
          params: {
            orgId: 1,
            theme: 'light',
            'var-Instance': 'All',
            'var-FilterName': 'All',
            'var-Filter': `${this.id}::node::api_method`,
            panelId: 4,
          },
        },
      ];
    },

    syncData() {
      const EventSource = EventSourcePolyfill || NativeEventSource;
      this.pollInfo = new EventSource(`${this.$config.portalURL}/mbr/node/sse/${this.id}`, {
        headers: { Authorization: this.$auth.strategy.token.get() },
      });
      this.pollInfo.onmessage = ({ data }) => {
        if (this.isEditing) {
          return;
        }

        const nodeInfo = JSON.parse(data);
        if (nodeInfo.status) {
          this.$store.commit('node/updateApi', nodeInfo);
        }
      };
    },
  },

  beforeDestroy() {
    if (this.pollInfo) {
      this.pollInfo.close();
    }
  },
};
</script>
