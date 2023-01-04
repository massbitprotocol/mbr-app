<template>
  <div>
    <div class="hidden lg:block">
      <div class="block text-body-1 text-neutral-normal font-medium">Status</div>

      <div class="flex gap-3 items-center text-body-1 text-neutral-darkset font-medium mt-1.5">
        <span class="uppercase overflow-ellipsis whitespace-nowrap break-words overflow-hidden">{{ api.status }}</span>

        <div class="flex items-center pb-1">
          <BaseButton
            v-if="api.status === 'failed'"
            class="absolute h-[28px] px-4 text-caption bg-accent-green hover:bg-accent-green/90"
            @click="reVerify"
            :loading="loadingVerify"
            :disabled="loadingVerify"
          >
            Verify
          </BaseButton>

          <template v-if="api.status === 'approved'">
            <BaseButton
              class="absolute h-[28px] px-4 text-caption"
              @click="showModalStaking = true"
              :loading="loadingStaking"
              :disabled="loadingStaking"
            >
              Staking
            </BaseButton>

            <!-- Staking -->
            <NodeDashboardModalStaking
              :key="'modalStaking'"
              :visible.sync="showModalStaking"
              :loading="loadingStaking"
              @submitStaking="submitStaking"
            />
          </template>
        </div>
      </div>
    </div>

    <div class="block lg:hidden w-full bg-primary-darker p-4 rounded-xl">
      <div class="block text-body-2 text-primary-background font-medium">ID</div>

      <div class="flex items-center text-body-2 text-neutral-darkset font-medium">
        <span class="text-white uppercase mr-2 overflow-ellipsis whitespace-nowrap break-words overflow-hidden">{{
          api.status
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    api: {
      type: Object,
      default: () => ({}),
    },

    provider: {
      type: String,
      default: 'node',
    },
  },

  data() {
    return {
      loadingVerify: false,
      loadingStaking: false,
      showModalStaking: false,
    };
  },

  methods: {
    async reVerify() {
      this.loadingVerify = true;

      try {
        switch (this.provider) {
          case 'Node':
            await this.$store.dispatch('node/reVerify', this.api);
            break;
          case 'Gateway':
            await this.$store.dispatch('gateway/reVerify', this.api);
            break;
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          this.$notify({ type: 'error', text: message });
        } else {
          this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
        }
      }

      this.loadingVerify = false;
    },

    async submitStaking(amount) {
      return;
    },
  },
};
</script>
