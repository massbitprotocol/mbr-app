<template>
  <div class="mt-10 lg:mt-15">
    <div class="uppercase text-heading-2 lg:text-title-2 text-neutral-darkset font-semibold lg:font-bold">Security</div>

    <div class="mt-3 lg:mt-4 p-5 bg-white rounded-xl border border-primary-background">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-7.5">
        <div class="flex flex-col gap-2">
          <div class="flex items-center text-body-1 text-neutral-darkset font-semibold">
            <span class="mr-2"> Per second requests rate-limiting </span>

            <BasePopover
              class="flex items-center"
              content="Restrict requests per second for this project. Decimal value, 0 means default limits are applied."
              contentClass="w-[197px]"
              placement="top"
            >
              <div class="flex items-center" v-html="require(`~/assets/svg/icon/info.svg?raw`)"></div>
            </BasePopover>
          </div>

          <input
            v-model="limitRatePerSec"
            class="
              appearance-none
              block
              w-full
              text-body-1 text-neutral-darkset
              font-semibold
              border border-primary-background
              rounded-lg
              py-3
              px-4
              leading-tight
            "
            type="text"
          />
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex items-center text-body-1 text-neutral-darkset font-semibold">
            <span class="mr-2"> Allowlist API request method </span>

            <BasePopover
              class="flex items-center"
              content="Protect the integrity of your requests by specifying the allowed API methods."
              contentClass="w-[197px]"
              placement="top"
            >
              <div class="flex items-center" v-html="require(`~/assets/svg/icon/info.svg?raw`)"></div>
            </BasePopover>
          </div>

          <BaseMultiSelect :sourceData.sync="apiMethods" :selected.sync="allowMethods" :source="getApiSource()" />
        </div>
      </div>

      <BaseSecondaryButton class="w-full md:w-auto h-[52px] mt-7.5" @click="updateSecurity" :loading="loading"
        >Update</BaseSecondaryButton
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DashboardApiSecurity',

  data() {
    return {
      loading: false,
      apiMethods: [],
      allowMethods: [],
      limitRatePerSec: 0,
    };
  },

  created() {
    this.apiMethods = this.getApiMethods();
    this.allowMethods = this.getAllowMethods();
    this.limitRatePerSec = this.getLimitRatePerSec();
  },

  computed: {
    ...mapGetters({
      api: 'api/value',
      getBlockchainByID: 'blockchains/getBlockchainByID',
    }),

    _blockchain() {
      return this.getBlockchainByID(this.api.blockchain) || null;
    },
  },

  methods: {
    getApiSource() {
      if (this._blockchain && this._blockchain.methods) {
        return this._blockchain.methods.map((item) => new Object({ key: item, name: item }));
      }

      return [];
    },

    getApiMethods() {
      if (this._blockchain && this._blockchain.methods) {
        const allowMethods = this.getAllowMethods();
        if (allowMethods && allowMethods.length > 0) {
          const apiMethod = this._blockchain.methods.filter((item) => !allowMethods.includes(item));
          return apiMethod.map((item) => new Object({ key: item, name: item }));
        }

        return this._blockchain.methods.map((item) => new Object({ key: item, name: item }));
      }

      return [];
    },

    getAllowMethods() {
      if (this.api.security && this.api.security.allow_methods) {
        return this.api.security.allow_methods.split(',');
      }

      return [];
    },

    getLimitRatePerSec() {
      if (this.api.security && this.api.security.limit_rate_per_sec) {
        return parseInt(this.api.security.limit_rate_per_sec);
      }

      return 0;
    },

    async updateSecurity() {
      this.loading = true;

      let _api = _.cloneDeep(this.api);

      let _security = _api.security;
      if (typeof _security === 'object') {
        _security = Object.assign(_security, {
          allow_methods: this.allowMethods.join(),
          limit_rate_per_sec: this.limitRatePerSec,
        });
      } else {
        _security = {
          limit_rate_per_day: 0,
          allow_methods: this.allowMethods.join(),
          limit_rate_per_sec: this.limitRatePerSec,
        };
      }

      let result = await this.$store.dispatch(
        'api/updateApi',
        Object.assign(_api, {
          security: _security,
        }),
      );
      if (result) {
        this.$notify({ type: 'success', text: 'Changing security successful!' });
      } else {
        this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
      }

      this.loading = false;
    },
  },
};
</script>
