<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-7.5 lg:mt-9">
    <!-- Blockchain -->
    <div class="p-5 bg-white rounded-xl border border-primary-background">
      <div class="text-body-1 text-neutral-darkset font-semibold">Blockchain</div>

      <div v-if="blockchain" class="h-[44px] flex items-center justify-between">
        <div class="flex items-center mt-2">
          <img v-if="blockchain.icon" :src="blockchain.icon" class="mr-2" width="32" height="32" />
          <div class="text-body-1 text-neutral-darkset font-semibold">{{ blockchain.value || '' }}</div>
        </div>

        <div class="h-[22px] flex items-center py-0.5 px-3 bg-primary rounded">
          <span class="text-white text-caption font-semibold uppercase">{{ blockchain.id || '' }} </span>
        </div>
      </div>
    </div>

    <!-- API Interface -->
    <div class="p-5 bg-white rounded-xl border border-primary-background">
      <div class="text-body-1 text-neutral-darkset font-semibold">API Interface</div>

      <div v-if="apiInterface" class="h-[44px] flex items-center justify-between">
        <div class="flex items-center mt-2">
          <div class="text-body-1 text-neutral-darkset font-semibold">
            {{ apiInterface.value ? apiInterface.value : 'JSON-RPC' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardApiBlockchain',

  props: {
    blockchain: {
      type: Object,
      default: () => new Object(),
    },

    apiInterface: {
      type: Object,
      default: () => new Object(),
    },
  },
};
</script>
