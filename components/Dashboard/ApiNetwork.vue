<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-7.5 lg:mt-9">
    <!-- Requests Limit -->
    <div
      class="
        flex flex-col
        gap-5
        sm:flex-row
        items-center
        justify-between
        p-5
        bg-white
        rounded-xl
        border border-primary-background
      "
    >
      <div class="w-full sm:w-auto flex items-center">
        <div
          class="flex items-center h-[64px] mr-4"
          v-html="require(`~/assets/svg/dashboard/request-limit.svg?raw`)"
        ></div>

        <div class="flex flex-col">
          <div class="text-body-1 text-neutral-normal font-medium">Requests Limit</div>
          <div v-if="security.limit_rate_per_day" class="text-body-1 text-neutral-normal font-medium">
            <span class="text-heading-1 text-accent-green"> {{ security.limit_rate_per_day }} </span>
            <span>/ Per day</span>
          </div>

          <div v-else class="text-body-1 text-neutral-normal font-medium">
            <span class="text-heading-1 text-accent-green">Unlimited</span>
          </div>
        </div>
      </div>

      <BaseSecondaryButton class="w-full sm:w-auto h-[52px]" @click="showModalUpdateSecutiry = true">
        Change Limit
      </BaseSecondaryButton>
    </div>

    <!-- Network -->
    <div class="flex items-center justify-between p-5 bg-white rounded-xl border border-primary-background">
      <div class="flex items-center">
        <div class="flex items-center h-[64px] mr-4" v-html="require(`~/assets/svg/dashboard/network.svg?raw`)"></div>
        <div class="flex flex-col">
          <div class="text-body-1 text-neutral-normal font-medium">Network</div>
          <div class="text-body-1 text-neutral-normal font-medium">
            <span class="text-heading-1 text-accent-green"> Mainnet </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal change limit -->
    <DashboardModalChangeLimit
      @onSave="onSave()"
      :visible.sync="showModalUpdateSecutiry"
      :limitRatePerDay.sync="limitRatePerDay"
      :limitType.sync="limitType"
      :loading.sync="loading"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  name: 'DashboardApiNetwork',

  props: {
    security: {
      type: Object,
      default: () => new Object(),
    },
  },

  data() {
    return {
      showModalUpdateSecutiry: false,
      limitRatePerDay: 0,
      limitType: 'unlimit',
      loading: false,
    };
  },

  created() {
    this.limitRatePerDay = this.getLimitRatePerDay();
    if (this.limitRatePerDay === 0) {
      this.limitType = 'unlimit';
    } else {
      this.limitType = 'limit';
    }
  },

  computed: {
    ...mapGetters({
      api: 'api/value',
    }),
  },

  methods: {
    getLimitRatePerDay() {
      if (this.api.security && this.api.security.limit_rate_per_day) {
        return parseInt(this.api.security.limit_rate_per_day);
      }

      return 0;
    },

    async onSave() {
      this.loading = true;

      let _api = _.cloneDeep(this.api);

      let limitRatePerDay = this.limitRatePerDay;
      if (this.limitType === 'unlimit') {
        limitRatePerDay = 0;
      } else if (limitRatePerDay === 0) {
        this.limitType = 'unlimit';
      }

      let _security = _api.security;
      if (typeof _security === 'object') {
        _security = Object.assign(_security, { limit_rate_per_day: limitRatePerDay });
      } else {
        _security = { limit_rate_per_day: limitRatePerDay, limit_rate_per_sec: 0, allow_methods: '' };
      }

      let result = await this.$store.dispatch(
        'api/updateApi',
        Object.assign(_api, {
          security: _security,
        }),
      );
      if (result) {
        this.$notify({ type: 'success', text: 'Changing request limit successful!!' });
        this.showModalUpdateSecutiry = false;
      } else {
        this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
      }

      this.loading = false;
    },
  },
};
</script>
