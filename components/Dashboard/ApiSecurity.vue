<template>
  <div class="mt-10 lg:mt-15">
    <div class="uppercase text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold">Security</div>

    <ValidationObserver
      v-slot="{ invalid }"
      tag="div"
      class="mt-3 lg:mt-4 p-5 bg-white rounded-xl border border-primary-background"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-7.5">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min_value:0"
          name="rate-limiting"
          tag="div"
          class="flex flex-col gap-2"
        >
          <div class="flex items-center text-body-1 text-neutral-darkset font-medium">
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
            class="appearance-none block w-full text-body-1 text-neutral-darkset font-medium border border-primary-background rounded-lg py-3 px-4 leading-tight"
            type="text"
          />

          <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
        </ValidationProvider>

        <div class="flex flex-col gap-2">
          <div class="flex items-center text-body-1 text-neutral-darkset font-medium">
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
      <BaseSecondaryButton
        class="w-full md:w-auto h-[52px] mt-7.5"
        @click="updateSecurity"
        :disabled="invalid"
        :loading="loading"
      >
        Update
      </BaseSecondaryButton>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

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
        const _methods = _.cloneDeep(this._blockchain.methods);
        return _methods.map((item) => new Object({ key: item, name: item }));
      }

      return [];
    },

    getApiMethods() {
      if (this._blockchain && this._blockchain.methods) {
        const allowMethods = this.getAllowMethods();
        const _methods = _.cloneDeep(this._blockchain.methods);
        if (allowMethods && allowMethods.length > 0) {
          const apiMethod = _methods.filter((item) => !allowMethods.includes(item));
          return apiMethod.map((item) => new Object({ key: item, name: item }));
        }

        return _methods.map((item) => new Object({ key: item, name: item }));
      }

      return [];
    },

    getAllowMethods() {
      if (this.api.allowMethods) {
        return _.cloneDeep(this.api.allowMethods);
      }

      return [];
    },

    getLimitRatePerSec() {
      if (this.api.limitRatePerSec) {
        return parseInt(this.api.limitRatePerSec);
      }

      return 0;
    },

    async updateSecurity() {
      this.loading = true;

      try {
        let res = await this.$store.dispatch('api/updateApi', {
          id: this.api.id,
          limitRatePerSec: parseInt(this.limitRatePerSec),
          allowMethods: this.allowMethods,
        });
        if (res) {
          this.$notify({ type: 'success', text: 'Update security successful!' });
        } else {
          this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          this.$notify({ type: 'error', text: Array.isArray(message) ? message[0] : message });
        } else {
          this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
        }
      }

      this.loading = false;
    },
  },
};
</script>
