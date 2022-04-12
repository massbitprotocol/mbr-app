<template>
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-5 pt-4">
    <div
      v-for="zone in zones"
      :key="zone.key"
      class="w-full h-full md:h-[94px] flex flex-col md:flex-row item-start md:items-center justify-between px-5 py-5 md:py-auto border border-primary-background rounded-xl gap-5"
    >
      <div class="flex items-center gap-4">
        <div v-if="zone.key === 'AS'" class="w-[64px] h-[64px] bg-asia-pattern bg-center bg-no-repeat"></div>
        <div v-if="zone.key === 'EU'" class="w-[64px] h-[64px] bg-europe-pattern bg-center bg-no-repeat"></div>
        <div
          v-if="zone.key === 'NA' || zone.key === 'SA'"
          class="w-[64px] h-[64px] bg-america-pattern bg-center bg-no-repeat"
        ></div>
        <div v-if="zone.key === 'AF'" class="w-[64px] h-[64px] bg-africa-pattern bg-center bg-no-repeat"></div>
        <div v-if="zone.key === 'OC'" class="w-[64px] h-[64px] bg-australia-pattern bg-center bg-no-repeat"></div>

        <div class="grid grid-cols-1">
          <span class="test-body-1 text-neutral-normal font-medium">
            {{ zone.name }}
          </span>

          <span class="text-heading-1 text-primary-darker font-bold"> {{ zone.value }} Nodes </span>
        </div>
      </div>

      <BaseSecondaryButton class="h-[40px]" @click="$emit('selectZone', zone.key)">
        <svg class="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 9H11V3C11 2.448 10.553 2 10 2C9.447 2 9 2.448 9 3V9H3C2.447 9 2 9.448 2 10C2 10.552 2.447 11 3 11H9V17C9 17.552 9.447 18 10 18C10.553 18 11 17.552 11 17V11H17C17.553 11 18 10.552 18 10C18 9.448 17.553 9 17 9Z"
            fill="currentColor"
          />
        </svg>

        Add Node
      </BaseSecondaryButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NodeDashboardZones',

  async fetch() {
    await this.$store.dispatch('node/getZoneSummary');
  },

  computed: {
    ...mapGetters({
      zones: 'node/zones',
    }),
  },
};
</script>
