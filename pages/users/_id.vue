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
          <div class="w-full mr-5 text-2xl lg:text-medium-title text-neutral-darkset font-bold truncate">
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

        <DashboardApiKey :apiKey="api.api_key" />

        <DashboardApiProvider :gatewayHttp="api.gateway_http" :gatewayWss="api.gateway_wss" />

        <DashboardApiBlockchain :blockchain="_blockchain" :apiInterface="_apiInterface" />

        <DashboardApiNetwork :security="_security" />

        <DashboardApiSecurity />

        <DashboardApiEntrypoints />

        <div class="mt-10 lg:mt-15">
          <div class="flex items-center justify-between">
            <div class="uppercase text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold">
              Stats
            </div>
          </div>

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
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

import chartConfig from '~/mixins/chartConfig';

export default {
  name: 'DashboardDetail',

  middleware: ['auth'],
  auth: true,

  mixins: [chartConfig],

  async fetch() {
    const api = await this.$store.dispatch('api/getApi', this.id);
    if (!api) {
      return this.$nuxt.error({ statusCode: 404, message: 'Api not found' });
    }
  },

  data() {
    return {
      editName: false,
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
        let _api = _.cloneDeep(this.api);
        await this.$store.dispatch('api/updateApi', Object.assign(_api, { status: value ? 1 : 0 }));
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
            let _api = _.cloneDeep(this.api);
            const result = await this.$store.dispatch('api/updateApi', Object.assign(_api, { name: apiName }));
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
    },
  },
};
</script>
