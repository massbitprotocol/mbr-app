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
          <div class="text-body-1 text-neutral-normal font-semibold">
            <span class="text-heading-1 text-accent-green"> 24 </span>
            <span>/ Per Day</span>
          </div>
        </div>
      </div>

      <BaseSecondaryButton class="w-full sm:w-auto h-[52px]"> Change Limit </BaseSecondaryButton>
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
  </div>
</template>

<script>
export default {
  name: 'DashboardApiNetwork',
};
</script>
