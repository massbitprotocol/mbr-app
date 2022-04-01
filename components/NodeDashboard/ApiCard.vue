<template>
  <div
    class="relative w-full grid grid-cols-1 xl:flex items-center justify-between gap-5 mt-5 py-4 border rounded-2xl border-primary-background"
  >
    <div class="max-w-full xl:max-w-sm w-full flex flex-col justify-between px-0 xl:px-5">
      <!-- Name -->
      <div
        class="px-5 xl:px-0 mb-4 xl:mb-0 text-heading-2 xl:text-heading-1 text-neutral-darkset font-bold overflow-ellipsis whitespace-nowrap break-words overflow-hidden"
      >
        {{ api.name }}
      </div>

      <!-- API key -->
      <div class="bg-primary-darker xl:bg-white py-4 xl:py-0 px-5 xl:px-0">
        <div class="block xl:hidden text-body-2 text-primary-background font-medium">API key</div>

        <div class="w-full inline-flex items-center justify-between gap-2">
          <div class="text-body-2 xl:text-body-1 text-neutral-white xl:text-neutral-darker font-medium truncate">
            {{ api.id | shortenKey }}
          </div>

          <TheCopyButton class="hidden xl:flex" buttonClass="bg-primary-background" :textToCopy="api.id" />
          <TheCopyButtonPrimary class="flex xl:hidden" :textToCopy="api.id" />
        </div>
      </div>
    </div>

    <!-- Zone -->
    <div class="max-w-[180px] w-full flex-shrink px-5">
      <div class="grid grid-cols-1">
        <div class="text-body-2 text-neutral-normal font-medium">Zone</div>
        <div class="mt-1 text-body-1 text-neutral-darker font-medium truncate">
          {{ api.geo && api.geo.continent_name ? api.geo.continent_name : api.zone }}
        </div>
      </div>
    </div>

    <!-- Blockchain -->
    <div class="max-w-[180px] w-full flex-shrink px-5">
      <div class="grid grid-cols-1">
        <div class="text-body-2 text-neutral-normal font-medium">Blockchain</div>
        <div class="mt-1 text-body-1 text-neutral-darker font-medium truncate">
          {{ _blockchain ? _blockchain.value : '--' }}
        </div>
      </div>
    </div>

    <!-- Status -->
    <div class="flex-shrink px-5">
      <div class="grid grid-cols-1">
        <div class="text-body-2 text-neutral-normal">Status</div>
        <div class="mt-1 uppercase text-body-1 text-neutral-darker font-medium truncate">
          {{ api.status }}
        </div>
      </div>
    </div>

    <!-- Created at -->
    <!-- <div class="flex-shrink px-5">
      <div class="grid grid-cols-1">
        <div class="text-body-2 text-neutral-normal font-medium">Created at</div>
        <div class="mt-1 text-body-1 text-neutral-darker font-medium truncate">
          {{ api.createdAt | formatTimeUTC }}
        </div>
      </div>
    </div> -->

    <!-- Node Settings -->
    <div
      class="flex items-center gap-3 justify-center border-t xl:border-t-none border-primary-background xl:border-transparent px-5 pt-4 xl:pt-0"
    >
      <BaseButton
        v-if="api.status === 'verified'"
        @click="showModalStaking = true"
        :loading="loadingStaking"
        class="w-[120px] px-3 h-[42px] hidden xl:flex items-center justify-center cursor-pointer text-body-2 font-medium rounded-lg"
      >
        Register
      </BaseButton>

      <BaseButton
        v-else-if="api.status === 'staked'"
        :loading="loadingVerify"
        :disabled="loadingVerify"
        @click="showModalUnStakeProvider = true"
        class="w-[120px] px-3 h-[42px] hidden xl:flex items-center justify-center cursor-pointer text-body-2 font-medium rounded-lg"
      >
        Unregister
      </BaseButton>

      <BaseButton
        v-else-if="api.status === 'installed' || api.status === 'failed' || api.status === 'stopped'"
        :loading="loadingVerify"
        :disabled="loadingVerify"
        @click="reVerify"
        class="w-[120px] px-3 h-[42px] bg-accent-green hover:bg-accent-green/90 hidden xl:flex items-center justify-center cursor-pointer text-body-2 font-medium rounded-lg"
      >
        Verify
      </BaseButton>

      <div v-else class="w-[120px] h-[42px] px-3"></div>

      <button
        @click="$router.push({ name: 'nodes-id', params: { id: api.id } })"
        class="w-[120px] px-3 h-[42px] hidden xl:flex items-center justify-center cursor-pointer bg-neutral-lightest text-primary text-body-2 font-medium rounded-lg hover:bg-neutral-lightest/90 whitespace-nowrap"
      >
        Settings
      </button>

      <NuxtLink
        :to="{ name: 'nodes-id', params: { id: api.id } }"
        class="w-full flex xl:hidden items-center justify-between text-body-2 text-primary font-medium hover:text-primary/90"
      >
        <span> Settings</span>

        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.707 5.29301L10.707 0.293006C10.316 -0.0979941 9.684 -0.0979941 9.293 0.293006C8.902 0.684006 8.902 1.31601 9.293 1.70701L12.586 5.00001H1C0.447 5.00001 0 5.44801 0 6.00001C0 6.55201 0.447 7.00001 1 7.00001H12.586L9.293 10.293C8.902 10.684 8.902 11.316 9.293 11.707C9.488 11.902 9.744 12 10 12C10.256 12 10.512 11.902 10.707 11.707L15.707 6.70701C16.098 6.31601 16.098 5.68401 15.707 5.29301Z"
            fill="currentColor"
          />
        </svg>
      </NuxtLink>
    </div>

    <div class="absolute right-5 bottom-0 italic text-neutral-darkest" style="font-size: 10px">
      {{ api.createdAt | formatTimeUTC }}
    </div>

    <!-- Staking -->
    <NodeDashboardModalStaking
      :key="'modalStaking'"
      :visible.sync="showModalStaking"
      :loading="loadingStaking"
      @submitStaking="submitStaking"
    />

    <!-- Un Staking -->
    <NodeDashboardModalUnStaking
      :key="'modalUnStaking'"
      :visible.sync="showModalUnStakeProvider"
      :loading="loadingUnStaking"
      :name="api.name"
      @submitUnStaking="unStakeProvider"
    />
  </div>
</template>

<script>
import { stringToHex } from '@polkadot/util';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  name: 'NodeDashboardApiCard',

  props: {
    api: {
      type: Object,
      default: () => new Object(),
    },
  },

  data() {
    return {
      is_prod: false,
      loadingStaking: false,
      loadingUnStaking: false,
      loadingVerify: false,
      showModalStaking: false,
      showModalUnStakeProvider: false,
    };
  },

  async created() {
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
    const unsub = await api.query.dapiStaking.currentEra((era) => {
      console.log(`The last block has a timestamp of ${era}`);
    });

    console.log('api.query.dapiStaking :>> ', api.query.dapiStaking);
  },

  computed: {
    ...mapGetters({
      getBlockchainByID: 'blockchains/getBlockchainByID',
    }),

    _blockchain() {
      return this.getBlockchainByID(this.api.blockchain) || null;
    },

    status: {
      get() {
        return !!parseInt(this.api.status);
      },
      set(value) {
        this.$emit('updateApiStatus', value);
      },
    },
  },

  methods: {
    async reVerify() {
      this.loadingVerify = true;

      try {
        await this.$store.dispatch('node/reVerify', this.api);
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

    async unStakeProvider() {
      this.loadingUnStaking = true;

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
      const unstaking = api.tx.dapi.unregisterProvider(this.api.id);
      const signer = await this.$polkadot.getSigner({ address });
      try {
        const unsub = await unstaking.signAndSend(address, { signer }, ({ status, events = [], dispatchError }) => {
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
              console.log('blockHash :>> ', blockHash);
              this.$notify({
                type: 'success',
                title: 'Success',
                text: 'Unregister node successfully',
              });
              this.showModalUnStakeProvider = false;
            }

            this.loadingUnStaking = false;
            unsub();
          }
        });
      } catch (error) {
        console.log('error :>> ', error);
        this.loadingUnStaking = false;
      }
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
        'Node',
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
              console.log('blockHash :>> ', blockHash);
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
      }
    },
  },
};
</script>
