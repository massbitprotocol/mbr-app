<template>
  <TheModal :open.sync="_visible" :backdrop="true">
    <div class="max-w-[570px] w-full bg-white p-5 rounded-lg z-10 text-left overflow-hidden">
      <div class="w-full flex items-center justify-between">
        <div class="text-heading-2 text-neutral-darkset font-bold"></div>

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

      <div class="flex flex-col items-center">
        <div class="text-heading-1 text-neutral-darkest">
          Unregister <strong>{{ name }}</strong> ?
        </div>

        <BaseButton class="mt-10 text-body-2 font-medium" :loading="loading" @click="$emit('submitUnStaking')">
          Confirm
        </BaseButton>
      </div>
    </div>
  </TheModal>
</template>

<script>
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

    name: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      balance: 0,
      form: {
        amount: 0,
      },
      error: '',
    };
  },

  computed: {
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
    resetForm() {
      this.balance = 0;
      this.form.amount = 0;
    },

    _formatBalance(balance) {
      return formatBalance(balance, { forceUnit: 'd', withSi: false }, this.chainDecimals);
    },
  },
};
</script>

<style lang="scss" scoped></style>
