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
          <div class="text-body-1 text-neutral-normal font-semibold">Requests Limit</div>
          <div v-if="security.limit_rate_per_sec" class="text-body-1 text-neutral-normal font-semibold">
            <span class="text-heading-1 text-accent-green"> {{ security.limit_rate_per_sec || '' }} </span>
            <span>/ Per second</span>
          </div>

          <div v-else class="text-body-1 text-neutral-normal font-semibold">
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
          <div class="text-body-1 text-neutral-normal font-semibold">Network</div>
          <div class="text-body-1 text-neutral-normal font-semibold">
            <span class="text-heading-1 text-accent-green"> Mainnet </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal change limit -->
    <DashboardModalChangeLimit :visible.sync="showModalUpdateSecutiry" />
  </div>
</template>

<script>
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
    };
  },
};
</script>
