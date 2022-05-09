<template>
  <div class="relative flex justify-center">
    <div class="block min-w-full rounded-lg border border-primary-background bg-white max-w-sm text-center">
      <div class="text-left py-3 px-6 border-b border-primary-background">
        <!-- Name -->
        <div
          class="text-heading-1 text-neutral-darkset font-bold overflow-ellipsis whitespace-nowrap break-words overflow-hidden"
        >
          {{ api.name }}
        </div>

        <!-- API key -->
        <div class="w-full inline-flex items-center gap-2">
          <div class="text-body-2 xl:text-body-1 text-neutral-darker font-medium truncate">
            {{ api.id | shortenKey }}
          </div>

          <TheCopyButton buttonClass="bg-primary-background" :textToCopy="api.id" />
        </div>
      </div>

      <!-- Details -->
      <div class="p-6 grid grid-cols-3 gap-2.5 text-left">
        <!-- Zone -->
        <div class="w-full px-5">
          <div class="grid grid-cols-1">
            <div class="text-body-2 text-neutral-normal">Zone</div>
            <div class="mt-1 text-body-1 text-neutral-darker font-medium truncate">
              {{ api.geo && api.geo.continent_name ? api.geo.continent_name : api.zone }}
            </div>
          </div>
        </div>

        <!-- Blockchain -->
        <div class="w-full px-5">
          <div class="grid grid-cols-1">
            <div class="text-body-2 text-neutral-normal">Blockchain</div>
            <div class="mt-1 text-body-1 text-neutral-darker font-medium truncate">
              {{ _blockchain ? _blockchain.value : '--' }}
            </div>
          </div>
        </div>

        <!-- Status -->
        <div class="w-full px-5">
          <div class="grid grid-cols-1">
            <div class="text-body-2 text-neutral-normal">Status</div>
            <div class="mt-1 uppercase text-body-1 text-neutral-darker font-medium truncate">
              {{ api.status }}
            </div>
          </div>
        </div>

        <!-- Reward -->
        <div class="w-full px-5">
          <div class="grid grid-cols-1">
            <div class="text-body-2 text-neutral-normal">Reward</div>

            <div class="flex items-center gap-2" v-if="totalReward && totalReward !== '0'">
              <div class="mt-1 uppercase text-body-1 text-neutral-darker font-medium">
                {{ totalReward }} {{ chainToken }}
              </div>
              <div class="w-18 flex items-center">
                <BaseGhostButton
                  class="absolute px-4 !h-[32px] text-caption font-medium text-primary cursor-pointer"
                  :loading="loadingClaimReward"
                  @click="calculateRewardAndShowModal"
                >
                  Claim
                </BaseGhostButton>
              </div>
            </div>

            <div v-else>--</div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-5 justify-end py-3 px-6 border-t border-primary-background">
        <BaseButton
          class="w-[120px] hidden xl:flex"
          v-if="api.status === 'verified'"
          @click="showModalStaking = true"
          :loading="loadingStaking"
        >
          Register
        </BaseButton>

        <BaseButton
          v-else-if="api.status === 'staked'"
          :loading="loadingVerify"
          :disabled="loadingVerify"
          @click="showModalUnStakeProvider = true"
          class="w-[120px] hidden xl:flex"
        >
          Unregister
        </BaseButton>

        <BaseButton
          v-else-if="api.status === 'installed' || api.status === 'failed'"
          :loading="loadingVerify"
          :disabled="loadingVerify"
          @click="reVerify"
          class="w-[120px] bg-accent-green hover:bg-accent-green/90 hidden xl:flex"
        >
          Verify
        </BaseButton>

        <div v-else class="w-[120px] h-[42px]"></div>

        <BaseSecondaryButton
          class="w-[120px] h-[42px]"
          @click="$router.push({ name: 'nodes-id', params: { id: api.id } })"
        >
          <span> Settings </span>
        </BaseSecondaryButton>

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

        <!-- Claim reward -->
        <BaseModalClaimReward
          :visible.sync="showModalClaimReward"
          :loading="loadingModalClaimReward"
          :name="api.name"
          :transactionFee="claimTransactionFee"
          :totalReward="totalReward"
          @submitClaimReward="submitClaimReward"
        />
      </div>
    </div>

    <!-- <div class="absolute left-5 bottom-0 italic text-neutral-darkest" style="font-size: 10px">
      {{ api.createdAt | formatTimeUTC }}
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
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

  watch: {
    currentEra() {
      this.calculateEraStakeReward();
    },

    'api.id'() {
      this.calculateEraStakeReward();
    },
  },

  data() {
    return {
      is_prod: false,
      loadingStaking: false,
      loadingUnStaking: false,
      loadingVerify: false,
      loadingClaimReward: false,
      loadingModalClaimReward: false,
      showModalStaking: false,
      showModalUnStakeProvider: false,
      showModalClaimReward: false,
      claimRewardTransactions: [],
      claimTransactionFee: 0,
      totalReward: '',
    };
  },

  async created() {
    await this.checkApiIsReady();
    this.calculateEraStakeReward();
  },

  computed: {
    ...mapGetters({
      getBlockchainByID: 'blockchains/getBlockchainByID',
    }),

    ...mapState({
      chainToken: (state) => state.chain.chainToken,
      chainDecimal: (state) => state.chain.chainDecimal,
      currentEra: (state) => state.chain.currentEra,
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
    async checkApiIsReady() {
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
    },

    async calculateRewardAndShowModal() {
      this.loadingClaimReward = true;

      await this.calculateTransactions();
      this.showModalClaimReward = true;

      this.loadingClaimReward = false;
    },

    async calculateEraStakeReward() {
      if (this.api.status !== 'staked') {
        this.totalReward = null;
        return;
      }

      this.checkApiIsReady();

      const { api } = this.$polkadot;

      const datas = await api.query.dapiStaking.providerEraInfo.entries(this.api.id);

      let totalReward = BigInt(0);

      datas.forEach(([key, exposure]) => {
        const [hashProviderId, _era] = key.args;

        if (_era.toNumber() < this.currentEra) {
          const era = _era.toString();
          const providerId = hashProviderId.toHuman();
          const stakeData = exposure.toString();

          if (stakeData.length > 0) {
            const stake = JSON.parse(stakeData);

            if (!stake.providerRewardClaimed) {
              totalReward += BigInt(stake.total);
            }
          }
        }
      });

      this.totalReward = this.$utils.formatBalance(totalReward, this.chainDecimal);
    },

    async calculateTransactions() {
      this.claimRewardTransactions = [];

      try {
        this.checkApiIsReady();

        let transacions = [];

        const address = this.$auth.user.walletAddress;
        const { api } = this.$polkadot;

        const datas = await api.query.dapiStaking.providerEraInfo.entries(this.api.id);
        datas.forEach(([key, exposure]) => {
          const [hashProviderId, _era] = key.args;
          const era = _era.toString();

          if (_era.toNumber() < this.currentEra) {
            const providerId = hashProviderId.toHuman();
            const stakeData = exposure.toString();

            if (stakeData.length > 0) {
              const stake = JSON.parse(stakeData);
              if (!stake.providerRewardClaimed) {
                const tx = api.tx.dapiStaking.claimProvider(this.api.id, era);
                transacions.push(tx);
              }
            }
          }
        });

        if (transacions.length) {
          this.claimRewardTransactions = transacions;

          const { partialFee } = await api.tx.utility.batch(transacions).paymentInfo(address);
          if (partialFee) {
            this.claimTransactionFee = partialFee.toNumber() / 100000000000;
          }
        } else {
          // Reset
          this.claimRewardTransactions = [];
          this.claimTransactionFee = 0;
        }
      } catch (error) {
        console.log('error :>> ', error);
      }
    },

    async submitClaimReward() {
      this.loadingModalClaimReward = true;

      try {
        this.checkApiIsReady();

        const address = this.$auth.user.walletAddress;
        const { api } = this.$polkadot;
        const signer = await this.$polkadot.getSigner({ address });

        const _transactions = await api.tx.utility.batch(this.claimRewardTransactions);
        const unsub = await _transactions.signAndSend(address, { signer }, ({ status, events = [], dispatchError }) => {
          if (status.isInBlock) {
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
              const blockHash = status.asInBlock.toString();
              this.$notify({
                type: 'success',
                title: 'Success',
                text: `Claim node reward successfully submitted to block ${blockHash}`,
              });
              this.showModalClaimReward = false;

              this.calculateEraStakeReward();
            }

            this.loadingModalClaimReward = false;
            unsub();
          }
        });
      } catch (error) {
        this.$notify({ type: 'error', text: this.$utils.getErrorMessage(error) });
        this.loadingModalClaimReward = false;
      }
    },

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
          if (status.isInBlock) {
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
              const blockHash = status.asInBlock.toString();
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
      const staking = api.tx.dapi.depositProvider(stringToHex(this.api.id), amount);
      const signer = await this.$polkadot.getSigner({ address });

      try {
        const unsub = await staking.signAndSend(address, { signer }, ({ status, events = [], dispatchError }) => {
          if (status.isInBlock) {
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
              const blockHash = status.asInBlock.toString();
              this.$notify({
                type: 'success',
                title: 'Success',
                text: `Staking node successfully submitted to block ${blockHash}`,
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
