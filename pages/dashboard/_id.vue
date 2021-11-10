<template>
  <div class="pb-20">
    <client-only>
      <DashboardBreadcrumb />
    </client-only>

    <div v-if="_api">
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
            {{ api.name }}
          </template>
        </div>

        <client-only>
          <div class="flex justify-between items-center sm:justify-end gap-3 mt-3">
            <div class="flex gap-3 items-center">
              <BasePopover class="flex items-center" content="Change the name of the API key" contentClass="w-[197px]">
                <BaseIconButton class="w-[36px] h-[36px]" icon="edit" @click="showEditApiName" />
              </BasePopover>

              <BasePopover
                class="flex items-center"
                content="Delete this API key, if you don’t need it anymore."
                contentClass="w-[197px]"
              >
                <BaseIconButton class="w-[36px] h-[36px]" icon="delete" />
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
        </client-only>
      </div>

      <client-only>
        <DashboardApiKey :apiKey="api.api_key" />

        <DashboardApiProvider :gatewayHttp="api.gateway_http" :gatewayWss="api.gateway_wss" />

        <DashboardApiBlockchain :blockchain="_blockchain" :apiInterface="_apiInterface" />

        <DashboardApiNetwork :security="_security" />

        <DashboardApiSecurity />

        <DashboardApiEntrypoints />

        <div class="mt-10 lg:mt-15">
          <div class="flex items-center justify-between">
            <div class="uppercase text-heading-2 lg:text-title-2 text-neutral-darkset font-semibold lg:font-bold">
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

    <div v-else></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import chartConfig from '~/mixins/chartConfig';

export default {
  name: 'DashboardDetail',

  middleware: ['auth'],
  auth: true,

  mixins: [chartConfig],

  async asyncData({ store, error, params }) {
    const api = await store.dispatch('api/getApi', params.id);
    if (!api) {
      error({ statusCode: 404, message: 'Api not found' });
    }
  },

  data() {
    return {
      editName: false,
    };
  },

  created() {
    console.log('this.api :>> ', this.api);
  },

  computed: {
    ...mapGetters({
      api: 'api/value',
      getBlockchainByID: 'blockchains/getBlockchainByID',
    }),

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
