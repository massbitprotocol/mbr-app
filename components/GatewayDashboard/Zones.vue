<template>
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-5 pt-4">
    <div
      v-for="zone in zones"
      :key="zone.key"
      class="
        w-full
        h-full
        md:h-[94px]
        flex flex-col
        md:flex-row
        item-start
        md:items-center
        justify-between
        px-5
        py-5
        md:py-auto
        border border-primary-background
        rounded-xl
        gap-5
      "
    >
      <div class="flex items-center gap-4">
        <div v-if="zone.key === 'asia'" class="w-[64px] h-[64px] bg-asia-pattern bg-center bg-no-repeat"></div>
        <div v-if="zone.key === 'europe'" class="w-[64px] h-[64px] bg-europe-pattern bg-center bg-no-repeat"></div>
        <div v-if="zone.key === 'america'" class="w-[64px] h-[64px] bg-america-pattern bg-center bg-no-repeat"></div>
        <div v-if="zone.key === 'africa'" class="w-[64px] h-[64px] bg-africa-pattern bg-center bg-no-repeat"></div>
        <div
          v-if="zone.key === 'australia'"
          class="w-[64px] h-[64px] bg-australia-pattern bg-center bg-no-repeat"
        ></div>

        <div class="grid grid-cols-1">
          <span class="test-body-1 text-neutral-normal font-medium">
            {{ zone.name }}
          </span>

          <span class="text-heading-1 text-primary-darker font-bold"> {{ zone.value }} Gateways </span>
        </div>
      </div>

      <BaseSecondaryButton class="h-[52px]" @click="$emit('selectZone', zone.key)">
        <svg class="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 9H11V3C11 2.448 10.553 2 10 2C9.447 2 9 2.448 9 3V9H3C2.447 9 2 9.448 2 10C2 10.552 2.447 11 3 11H9V17C9 17.552 9.447 18 10 18C10.553 18 11 17.552 11 17V11H17C17.553 11 18 10.552 18 10C18 9.448 17.553 9 17 9Z"
            fill="currentColor"
          />
        </svg>

        Add Gateway
      </BaseSecondaryButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GatewayDashboardZones',

  computed: {
    ...mapGetters({
      zones: 'gateway/zones',
    }),
  },
};
</script>
