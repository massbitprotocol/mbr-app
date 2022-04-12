<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-7.5 lg:mt-9">
    <!-- Requests Limit -->
    <div
      class="flex flex-col gap-5 sm:flex-row items-center justify-between p-5 bg-white rounded-xl border border-primary-background"
    >
      <div class="w-full sm:w-auto flex items-center">
        <div
          class="flex items-center h-[64px] mr-4"
          v-html="require(`~/assets/svg/dashboard/request-limit.svg?raw`)"
        ></div>

        <div class="flex flex-col">
          <div class="text-body-1 text-neutral-normal font-medium">Requests Limit</div>
          <div v-if="limitRatePerDay" class="text-body-1 text-neutral-normal font-medium">
            <span class="text-heading-1 text-accent-green"> {{ limitRatePerDay }} </span>
            <span>/ Per day</span>
          </div>

          <div v-else class="text-body-1 text-neutral-normal font-medium">
            <span class="text-heading-1 text-accent-green">Unlimited</span>
          </div>
        </div>
      </div>

      <BaseSecondaryButton class="w-full sm:w-auto h-[40px]" @click="showModalUpdateSecutiry = true">
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
      :limitRatePerDay.sync="_limitRatePerDay"
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
    limitRatePerDay: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      showModalUpdateSecutiry: false,
      _limitRatePerDay: 0,
      limitType: 'unlimit',
      loading: false,
    };
  },

  created() {
    this._limitRatePerDay = this.getLimitRatePerDay();
    if (this._limitRatePerDay === 0) {
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
      if (this.api.limitRatePerDay) {
        return parseInt(this.api.limitRatePerDay);
      }

      return 0;
    },

    async onSave() {
      this.loading = true;

      let limitRatePerDay = this._limitRatePerDay;
      if (this.limitType === 'unlimit') {
        limitRatePerDay = 0;
      } else if (limitRatePerDay === 0) {
        this.limitType = 'unlimit';
      }

      try {
        let res = await this.$store.dispatch('api/updateApi', { id: this.api.id, limitRatePerDay });
        if (res) {
          this.$notify({ type: 'success', text: 'Changing request limit successful!!' });
          this.showModalUpdateSecutiry = false;
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
