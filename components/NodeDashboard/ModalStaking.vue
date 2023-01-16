<template>
  <TheModal :open.sync="_visible" :backdrop="true">
    <div class="max-w-[570px] w-full bg-white p-5 rounded-lg z-10 text-left overflow-hidden">
      <div class="w-full flex items-center justify-between">
        <div class="text-heading-2 text-neutral-darkset font-bold">Register {{ type }}</div>

        <svg
          @click="_visible = false"
          class="flex items-center text-neutral-darkset cursor-pointer"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4141 10L15.7071 5.70701C16.0981 5.31601 16.0981 4.68401 15.7071 4.29301C15.3161 3.90201 14.6841 3.90201 14.2931 4.29301L10.0001 8.58601L5.7071 4.29301C5.3161 3.90201 4.6841 3.90201 4.2931 4.29301C3.9021 4.68401 3.9021 5.31601 4.2931 5.70701L8.5861 10L4.2931 14.293C3.9021 14.684 3.9021 15.316 4.2931 15.707C4.4881 15.902 4.7441 16 5.0001 16C5.2561 16 5.5121 15.902 5.7071 15.707L10.0001 11.414L14.2931 15.707C14.4881 15.902 14.7441 16 15.0001 16C15.2561 16 15.5121 15.902 15.7071 15.707C16.0981 15.316 16.0981 14.684 15.7071 14.293L11.4141 10Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <ValidationObserver
        tag="div"
        v-slot="{ handleSubmit, invalid }"
        class="mt-5 flex flex-col items-center justify-center"
      >
        <form class="w-full flex flex-col items-center" @submit.prevent="handleSubmit(submitStaking)">
          <div class="w-full relative inline-flex gap-3 px-4 py-5 border rounded-2xl border-primary-background">
            <div class="flex-1 flex flex-col gap-2 pb-5">
              <div class="text-body text-neutral-normal font-medium">Amount</div>
              <div class="flex items-center h-[42px] text-xl text-neutral-darkset font-medium">
                <div class="flex justify-center items-center gap-3">
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

                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|double|min_value:100"
                    name="staking amount"
                    tag="div"
                    class="w-full"
                  >
                    <input
                      v-if="isShowEditAmount"
                      ref="stakingAmount"
                      type="number"
                      class="h-[40px] text-xl w-[180px] text-neutral-darkset font-medium border-0 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:border-primary-background focus:border-2 focus:shadow-outline"
                      v-model="form.amount"
                      :min="1"
                      :step="1"
                      :disabled="loading"
                      @blur="isShowEditAmount = false"
                    />

                    <div v-else class="flex items-center justify-center cursor-pointer" @click="showEditAmount">
                      {{ form.amount }} {{ chainToken }}

                      <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10 16L6 12H14L10 16ZM10 4L14 8H6L10 4Z"
                          fill="#050C72"
                        />
                      </svg>
                    </div>

                    <p v-if="errors[0] || error" class="absolute !font-thin text-red-500 text-xs italic">
                      {{ errors[0] || error }}
                    </p>
                  </ValidationProvider>
                </div>
              </div>

              <p class="absolute bottom-0 text-neutral-darkest text-xs italic">
                Est transaction fee: {{ transactionFee }} {{ chainToken }}
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <div class="text-body text-neutral-normal font-medium">Balance {{ balance }}</div>
            </div>
          </div>

          <BaseButton
            class="mt-5 text-body-2 font-medium"
            type="submit"
            :disabled="invalid || loading"
            :loading="loading"
            @click="submitStaking"
          >
            Confirm
          </BaseButton>
        </form>
      </ValidationObserver>
    </div>
  </TheModal>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NodeDashboardModalStaking',

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
  },

  watch: {
    visible(value) {
      if (!value) {
        this.resetForm();
      } else {
        this.calculateTransactionFee();
      }
    },

    'form.amount': {
      immediate: true,
      handler() {
        this.calculateTransactionFee();
      },
    },
  },

  data() {
    return {
      isShowEditAmount: false,
      form: {
        amount: 100,
      },
      transactionFee: 0,
      error: '',
    };
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

  methods: {
    async submitStaking() {
      if (this.balance === BigInt(0)) {
        this.error = 'You balance is not enough';

        return;
      }

      if (this.balance < BigInt((this.form.amount + this.transactionFee) * 1e18)) {
        this.error = 'You balance is not enough';

        return;
      }

      this.$emit('submitStaking', BigInt(this.form.amount * 1e18));
    },

    async calculateTransactionFee() {
      return;
    },

    resetForm() {
      this.form.amount = 100;
    },

    showEditAmount() {
      this.isShowEditAmount = true;

      this.$nextTick(() => {
        this.$refs.stakingAmount.focus();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
