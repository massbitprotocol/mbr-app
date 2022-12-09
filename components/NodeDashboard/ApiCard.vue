<template>
  <div class="relative flex justify-center">
    <div class="block min-w-full rounded-lg border border-primary-background bg-white max-w-sm text-center">
      <div class="flex items-center justify-between gap-3 text-left py-3 px-6 border-b border-primary-background">
        <div class="flex flex-col truncate">
          <!-- Name -->
          <div class="text-heading-1 text-neutral-darkset font-bold truncate">
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

        <div
          :class="{
            'min-w-[80px] max-w-[150px] text-xs capitalize inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-mono text-white rounded bg-gray-200': true,
            '!bg-blue-400': ['created'].includes(api.status),
            '!bg-blue-600': ['verified'].includes(api.status),
            '!bg-primary': ['approved'].includes(api.status),
            '!bg-accent-green': ['staked'].includes(api.status),
            '!bg-accent-yellow': ['investigate', 'investigate_fail'].includes(api.status),
            '!bg-accent-red': ['failed'].includes(api.status),
          }"
        >
          {{ api.status ? api.status.split('_').join(' ') : '--' }}
        </div>
      </div>

      <!-- Details -->
      <div class="p-6 grid grid-cols-3 gap-2.5 text-left">
        <!-- IP -->
        <div class="w-full px-5">
          <div class="grid grid-cols-1">
            <div class="text-body-2 text-neutral-normal">IP</div>
            <div class="mt-1 uppercase text-body-1 text-neutral-darker font-medium truncate">
              {{ api.geo ? api.geo.ip : '--' }}
            </div>
          </div>
        </div>

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
              {{ _blockchain ? _blockchain.value : '--' }} - {{ api.network ? api.network : '--' }}
            </div>
          </div>
        </div>

        <!-- Bandwidth -->
        <div class="w-full px-5">
          <div class="grid grid-cols-1">
            <div class="text-body-2 text-neutral-normal">Bandwidth</div>

            <div class="flex items-center gap-2">
              <div class="mt-1 text-body-1 text-neutral-darker font-medium">{{ bandwidth }} Mbps</div>
            </div>
          </div>
        </div>

        <!-- Requests -->
        <div class="w-full px-5">
          <div class="grid grid-cols-1">
            <div class="text-body-2 text-neutral-normal">Requests</div>

            <div class="flex items-center gap-2">
              <div class="mt-1 text-body-1 text-neutral-darker font-medium">{{ requests }} Req/s</div>
            </div>
          </div>
        </div>

        <!-- Reward -->
        <!-- <div class="w-full px-5">
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
        </div> -->
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-5 justify-end py-3 px-6 border-t border-primary-background">
        <BaseButton
          class="w-[120px] hidden xl:flex"
          v-if="api.status === 'approved'"
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

        <!-- UnStaking -->
        <NodeDashboardModalUnStaking
          :key="'modalUnStaking'"
          :visible.sync="showModalUnStakeProvider"
          :loading="loadingUnStaking"
          :name="api.name"
          @submitUnStaking="unStakeProvider"
        />

        <!-- Claim reward -->
        <!-- <BaseModalClaimReward
          :visible.sync="showModalClaimReward"
          :loading="loadingModalClaimReward"
          :name="api.name"
          :transactionFee="claimTransactionFee"
          :totalReward="totalReward"
          @submitClaimReward="submitClaimReward"
        /> -->
      </div>
    </div>

    <!-- <div class="absolute left-5 bottom-0 italic text-neutral-darkest" style="font-size: 10px">
      {{ api.createdAt | formatTimeUTC }}
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  name: 'NodeDashboardApiCard',

  props: {
    api: {
      type: Object,
      default: () => new Object(),
    },

    bandwidth: {
      type: Number | String,
      default: 0,
    },

    requests: {
      type: Number | String,
      default: 0,
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
      return;
    },

    async calculateRewardAndShowModal() {
      this.loadingClaimReward = true;

      await this.calculateTransactions();
      this.showModalClaimReward = true;

      this.loadingClaimReward = false;
    },

    async calculateEraStakeReward() {
      return;
    },

    async calculateTransactions() {
      return;
    },

    async submitClaimReward() {
      return;
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
      return;
    },

    async submitStaking(amount) {
      return;
    },
  },
};
</script>
