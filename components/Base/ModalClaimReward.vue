<template>
  <TheModal :open.sync="_visible" :backdrop="true">
    <div
      class="max-w-[570px] w-full flex justify-center flex-col bg-white p-5 rounded-lg z-10 text-left overflow-hidden"
    >
      <div class="w-full flex items-center justify-between">
        <div class="text-heading-2 text-neutral-darkset font-bold">
          Claim Reward on {{ type }}: <span class="text-primary">{{ name }}</span>
        </div>
      </div>

      <div class="w-full my-5 relative flex flex-col gap-3 px-4 py-5 border rounded-2xl border-primary-background">
        <div class="text-body text-neutral-normal font-medium">Reward</div>
        <div class="flex items-center h-[42px] text-xl text-neutral-darkset font-medium gap-5 pb-5">
          <div class="flex items-center justify-center">
            <svg width="30" height="30" viewBox="0 0 251 252" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M125.46 252C194.749 252 250.919 195.588 250.919 126C250.919 56.4121 194.749 0 125.46 0C56.1702 0 0 56.4121 0 126C0 195.588 56.1702 252 125.46 252Z"
                fill="#2C3ACF"
              />
              <path
                d="M43.9557 166.007C43.5104 166.007 43.0554 165.914 42.6261 165.714C41.0177 164.974 40.3096 163.066 41.0465 161.451L81.8432 71.9117C82.5802 70.2963 84.4801 69.5852 86.0886 70.3253C87.697 71.0654 88.4051 72.9735 87.6681 74.5889L46.8714 164.128C46.3331 165.309 45.1733 166.007 43.9557 166.007Z"
                fill="white"
              />
              <path
                d="M125.559 166.007C124.345 166.007 123.182 165.309 122.643 164.128L81.8434 74.5889C81.1064 72.9735 81.8145 71.0622 83.4229 70.3253C85.0314 69.5852 86.9345 70.2963 87.6683 71.9117L128.468 161.451C129.205 163.066 128.497 164.977 126.889 165.714C126.456 165.914 126.004 166.007 125.559 166.007Z"
                fill="white"
              />
              <path
                d="M125.552 166.007C125.107 166.007 124.652 165.914 124.223 165.714C122.614 164.974 121.906 163.066 122.643 161.451L163.443 71.9117C164.18 70.2963 166.08 69.5852 167.689 70.3253C169.297 71.0654 170.005 72.9735 169.268 74.5889L128.468 164.128C127.93 165.312 126.77 166.007 125.552 166.007Z"
                fill="white"
              />
              <path
                d="M207.159 166.007C205.944 166.007 204.781 165.309 204.243 164.128L163.443 74.5889C162.706 72.9735 163.414 71.0622 165.023 70.3253C166.631 69.5852 168.534 70.2963 169.268 71.9117L210.068 161.451C210.805 163.066 210.097 164.977 208.488 165.714C208.056 165.914 207.604 166.007 207.159 166.007Z"
                fill="white"
              />
              <path
                d="M43.7572 178.75C50.5186 178.75 55.9997 173.412 55.9997 166.828C55.9997 160.243 50.5186 154.906 43.7572 154.906C36.9958 154.906 31.5146 160.243 31.5146 166.828C31.5146 173.412 36.9958 178.75 43.7572 178.75Z"
                fill="white"
              />
              <path
                d="M125.46 178.75C132.221 178.75 137.702 173.412 137.702 166.828C137.702 160.243 132.221 154.906 125.46 154.906C118.698 154.906 113.217 160.243 113.217 166.828C113.217 173.412 118.698 178.75 125.46 178.75Z"
                fill="white"
              />
              <path
                d="M207.162 178.75C213.923 178.75 219.405 173.412 219.405 166.828C219.405 160.243 213.923 154.906 207.162 154.906C200.401 154.906 194.919 160.243 194.919 166.828C194.919 173.412 200.401 178.75 207.162 178.75Z"
                fill="white"
              />
            </svg>
          </div>

          {{ totalReward }} {{ chainToken }}
        </div>

        <p class="absolute bottom-0 text-neutral-darkest text-xs italic">
          Est transaction fee: {{ transactionFee }} {{ chainToken }}
        </p>
      </div>

      <div class="w-full flex items-center justify-center">
        <BaseButton
          class="w-[150px] mt-5 text-body-2 font-medium"
          type="submit"
          :disabled="loading"
          :loading="loading"
          @click="$emit('submitClaimReward')"
        >
          Calim
        </BaseButton>
      </div>
    </div>
  </TheModal>
</template>

<script>
import { mapState } from 'vuex';
import { stringToHex } from '@polkadot/util';

export default {
  name: 'BaseModalClaimReward',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: 'node',
    },

    name: {
      type: String,
      default: '',
    },

    transactionFee: {
      type: Number | String,
      default: 0,
    },

    totalReward: {
      type: Number | String,
      default: 0,
    },
  },

  computed: {
    ...mapState({
      balance: (state) => state.user.balance,
      chainToken: (state) => state.chain.chainToken,
    }),

    _visible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      },
    },
  },
};
</script>
