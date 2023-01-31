<template>
  <div
    class="relative w-full grid grid-cols-1 xl:flex items-center justify-between gap-5 mt-5 py-4 border rounded-2xl border-primary-background"
  >
    <div class="max-w-full xl:max-w-sm w-full flex flex-col justify-between px-0 xl:px-5">
      <!-- Name -->
      <div
        class="px-5 xl:px-0 mb-4 xl:mb-0 text-heading-2 xl:text-heading-1 text-neutral-darkset font-bold overflow-ellipsis whitespace-nowrap break-words overflow-hidden"
      >
        {{ project.name }}
      </div>

      <!-- API key -->
      <div class="bg-primary-darker xl:bg-white py-4 xl:py-0 px-5 xl:px-0">
        <div class="block xl:hidden text-body-2 text-primary-background font-medium">Project key</div>

        <div class="w-full inline-flex items-center justify-between gap-2">
          <div class="text-body-2 xl:text-body-1 text-neutral-white xl:text-neutral-darker font-medium truncate">
            {{ project.id | shortenKey }}
          </div>

          <TheCopyButton class="hidden xl:flex" buttonClass="bg-primary-background" :textToCopy="project.id" />
          <TheCopyButtonPrimary class="flex xl:hidden" :textToCopy="project.id" />
        </div>
      </div>
    </div>

    <!-- Blockchain -->
    <div class="flex-shrink px-5">
      <div class="grid grid-cols-1">
        <div class="text-body-2 text-neutral-normal font-medium">Blockchain</div>
        <div v-if="_blockchain" class="mt-1 capitalize text-body-1 text-neutral-darker font-medium truncate">
          {{ _blockchain.value }}
        </div>
        <div v-else class="mt-1 capitalize text-body-1 text-neutral-darker font-medium truncate">--</div>
      </div>
    </div>

    <!-- Status -->
    <div class="flex-shrink px-5">
      <div class="grid grid-cols-1">
        <div class="text-body-2 text-neutral-normal font-medium">Status</div>
        <div class="mt-1 uppercase text-body-1 text-neutral-darker font-medium truncate">
          {{ project.status }}
        </div>
      </div>
    </div>

    <!-- Usage -->
    <div class="flex-shrink px-5">
      <div class="grid grid-cols-1">
        <div class="text-body-2 text-neutral-normal font-medium">Usage</div>
        <div class="mt-1 uppercase text-body-1 text-neutral-darker font-medium truncate">
          <span :class="{ 'text-accent-green': _usage < _quota, 'text-accent-red': _usage >= _quota }">{{
            _usage
          }}</span>
          / {{ _quota || '--' }}
        </div>
      </div>
    </div>

    <!-- Gateway Settings -->
    <div
      class="flex justify-center gap-3 border-t xl:border-t-none border-primary-background xl:border-transparent px-5 pt-4 xl:pt-0"
    >
      <BaseButton
        v-if="project.status === 'created'"
        class="text-body-2 font-medium"
        :loading="loadingStaking"
        @click="showModalStaking = true"
      >
        Staking
      </BaseButton>

      <!-- <BaseButton
        v-if="project.status === 'staked'"
        class="text-body-2 font-medium"
        :loading="loadingUnStaking"
        @click="showModalUnStakeProvider = true"
      >
        Unstake
      </BaseButton> -->

      <BaseGhostButton
        class="flex items-center justify-center gap-2 text-body-2 font-medium"
        @click="showModalSwitchProject = true"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.2352 6.11576L16.5471 5.09213C16.5756 4.99876 16.6222 4.91192 16.6843 4.83658C16.7463 4.76124 16.8226 4.69887 16.9087 4.65303C16.9948 4.6072 17.0891 4.57879 17.1862 4.56944C17.2833 4.56009 17.3812 4.56997 17.4745 4.59853C17.5678 4.62708 17.6545 4.67375 17.7298 4.73586C17.805 4.79798 17.8673 4.87432 17.9131 4.96054C17.9589 5.04676 17.9872 5.14116 17.9966 5.23835C18.0059 5.33555 17.9961 5.43363 17.9675 5.52701L17.0988 8.37043C17.0412 8.55886 16.9113 8.7167 16.7375 8.80926C16.5637 8.90182 16.3604 8.92152 16.1721 8.86403L13.3319 7.99428C13.2367 7.96745 13.1478 7.92184 13.0705 7.86013C12.9931 7.79842 12.9288 7.72186 12.8814 7.63494C12.834 7.54802 12.8044 7.45249 12.7944 7.35397C12.7844 7.25545 12.7942 7.15591 12.8231 7.06122C12.852 6.96652 12.8996 6.87856 12.963 6.80252C13.0263 6.72647 13.1042 6.66387 13.1921 6.61838C13.28 6.5729 13.376 6.54545 13.4746 6.53764C13.5732 6.52984 13.6724 6.54184 13.7663 6.57294L15.0078 6.95281C14.459 6.1194 13.6935 5.45169 12.7937 5.02157C11.8939 4.59146 10.8939 4.41524 9.90152 4.51191C8.90912 4.60857 7.96185 4.97445 7.16175 5.57013C6.36165 6.16582 5.73902 6.96875 5.36094 7.89244L5.16788 8.36299C5.13277 8.45588 5.07942 8.54079 5.01099 8.61269C4.94256 8.68459 4.86043 8.74204 4.76945 8.78163C4.67847 8.82123 4.58049 8.84217 4.48129 8.84323C4.3821 8.84428 4.28369 8.82542 4.1919 8.78777C4.1001 8.75011 4.01677 8.69442 3.94683 8.62399C3.87689 8.55356 3.82176 8.46981 3.78469 8.37768C3.74761 8.28556 3.72936 8.18694 3.73099 8.08763C3.73263 7.98833 3.75412 7.89036 3.79421 7.79951L3.98727 7.32896C4.46711 6.15685 5.25678 5.13774 6.27148 4.38103C7.28619 3.62432 8.4876 3.15861 9.74673 3.03389C11.0059 2.90917 12.2751 3.13015 13.4183 3.67312C14.5614 4.21609 15.5353 5.06052 16.2352 6.11576V6.11576ZM4.70974 14.0052L4.46694 14.9798C4.44521 15.0765 4.40441 15.1678 4.34693 15.2484C4.28944 15.3291 4.21644 15.3974 4.1322 15.4494C4.04797 15.5014 3.9542 15.536 3.85642 15.5512C3.75863 15.5664 3.6588 15.5619 3.56279 15.5379C3.46677 15.5139 3.37652 15.4709 3.29732 15.4115C3.21812 15.3521 3.15159 15.2775 3.10162 15.192C3.05165 15.1065 3.01926 15.0118 3.00635 14.9136C2.99344 14.8154 3.00027 14.7156 3.02644 14.62L3.74446 11.7357C3.76868 11.6375 3.81267 11.5453 3.87373 11.4647C3.9348 11.3841 4.01164 11.3168 4.09958 11.267C4.18751 11.2172 4.28467 11.1858 4.38512 11.1749C4.48557 11.164 4.58719 11.1737 4.68375 11.2034L7.52614 11.9126C7.71726 11.9603 7.88162 12.0821 7.98307 12.2511C8.08451 12.4202 8.11473 12.6226 8.06707 12.814C8.01941 13.0053 7.89779 13.1699 7.72895 13.2714C7.5601 13.373 7.35788 13.4032 7.16676 13.3555L5.84061 13.0247C6.40754 13.8936 7.2089 14.5838 8.15175 15.0152C9.0946 15.4466 10.1403 15.6016 11.1675 15.4621C12.1948 15.3227 13.1615 14.8945 13.9556 14.2273C14.7496 13.5601 15.3385 12.6812 15.6538 11.6926C15.7137 11.5047 15.8457 11.3483 16.0207 11.2578C16.1074 11.213 16.202 11.1858 16.2992 11.1776C16.3964 11.1694 16.4943 11.1805 16.5872 11.2101C16.6801 11.2398 16.7663 11.2875 16.8408 11.3505C16.9153 11.4136 16.9767 11.4907 17.0214 11.5774C17.0662 11.6642 17.0934 11.7589 17.1016 11.8562C17.1098 11.9536 17.0987 12.0515 17.0691 12.1446C16.76 13.1154 16.2421 14.0066 15.5519 14.7555C14.8618 15.5044 14.016 16.0927 13.0743 16.4792C11.6069 17.081 9.97843 17.1639 8.45768 16.7141C6.93693 16.2643 5.61486 15.3088 4.70974 14.0052V14.0052Z"
            fill="currentColor"
          />
        </svg>

        Switch project
      </BaseGhostButton>
    </div>

    <div class="absolute right-5 bottom-0 italic text-neutral-darkest" style="font-size: 10px">
      {{ project.createdAt | formatTimeUTC }}
    </div>

    <!-- Staking -->
    <DashboardModalProjectStaking
      :key="'modalStaking'"
      :visible.sync="showModalStaking"
      :loading="loadingStaking"
      @submitStaking="stakingProject"
    />

    <!-- Un Staking -->
    <NodeDashboardModalUnStaking
      :key="'modalUnStaking'"
      :visible.sync="showModalUnStakeProvider"
      :loading="loadingUnStaking"
      :name="project.name"
      @submitUnStaking="unStakeProvider"
    />

    <!-- Switch project -->
    <DashboardModalSwitchProject :key="'modalSwitchProject'" :visible.sync="showModalSwitchProject" />
  </div>
</template>

<script>
import { stringToHex } from '@polkadot/util';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  name: 'DashboardProjectCard',

  props: {
    project: {
      type: Object,
      default: () => new Object(),
    },
  },

  data() {
    return {
      showModalSwitchProject: false,
      loadingStaking: false,
      showModalStaking: false,
      showModalUnStakeProvider: false,
      loadingUnStaking: false,
    };
  },

  computed: {
    ...mapGetters({
      getBlockchainByID: 'blockchains/getBlockchainByID',
    }),

    _blockchain() {
      return this.getBlockchainByID(this.project.blockchain) || null;
    },

    _usage() {
      return BigInt(this.project?.usage || 0);
    },

    _quota() {
      return BigInt(this.project?.quota || 0);
    },
  },

  methods: {
    async stakingProject(amount) {
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
      const staking = api.tx.dapi.registerProject(
        stringToHex(this.project.id),
        `${this.project.blockchain}.${this.project.network || 'mainnet'}`,
        amount,
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
              this.showModalStaking = false;
              this.$notify({
                type: 'success',
                title: 'Success',
                text: 'Staking project successfully',
              });
            }

            this.loadingStaking = false;
            unsub();
          }
        });
      } catch (error) {
        console.log('error :>> ', error);
      }
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
      const unstaking = api.tx.dapi.unregisterProvider(this.project.id);
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
              this.$notify({
                type: 'success',
                title: 'Success',
                text: 'Unstake node successfully',
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
  },
};
</script>
