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

          <template v-if="api.status === 'verified'">
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
import { stringToHex } from '@polkadot/util';

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
          case 'node':
            await this.$store.dispatch('node/reVerify', this.api);
            break;
          case 'gateway':
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
      this.loadingStaking = true;

      if (!this.$polkadot.api.isReady) {
        await this.$polkadot.startApi();

        if (!this.$polkadot.api.isReady) {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Polkadot API is not ready',
          });

          return;
        }
      }

      const { api } = this.$polkadot;
      const address = this.$auth.user.walletAddress;
      const staking = api.tx.dapi.registerProvider(
        stringToHex(this.api.id),
        this.provider,
        amount,
        `${this.api.blockchain}.${this.api.network}`,
      );
      const signer = await this.$polkadot.getSigner({ address });

      try {
        const unsub = await staking.signAndSend(address, { signer }, ({ status, events = [], dispatchError }) => {
          if (status.isFinalized) {
            if (dispatchError) {
              if (dispatchError.isModule) {
                this.$notify({
                  type: 'error',
                  title: 'Error',
                  text: this.$polkadot.getStakingMessage(dispatchError),
                });
              } else {
                this.$notify({
                  type: 'error',
                  title: 'Error',
                  text: dispatchError.toString(),
                });
              }
            } else {
              const blockHash = status.asFinalized.toString();
              this.$notify({
                type: 'success',
                title: 'Success',
                text: 'Staking node successfully',
              });
              this.showModalStaking = false;
            }

            this.loadingStaking = false;
            unsub();
          }
        });
      } catch (error) {
        console.log('error :>> ', error);

        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Something was wrong. Please try again!',
        });
      }
    },
  },
};
</script>
