<template>
  <TheModal :open.sync="_visible" :backdrop="true">
    <div class="max-w-[570px] w-full bg-white p-5 rounded-lg z-10 text-left overflow-hidden">
      <div class="w-full flex items-center justify-between">
        <div class="text-heading-2 text-neutral-darkset font-bold">Change Limit</div>

        <div
          @click="_visible = false"
          class="flex items-center text-neutral-darkset cursor-pointer"
          v-html="require(`~/assets/svg/icon/close.svg?raw`)"
        ></div>
      </div>

      <div class="w-full mt-3 text-body-2 lg:text-body-1 text-neutral-normal font-medium">
        Choose the unlimited request volume, or set the number of requests to be spent over a certain period.
      </div>

      <div class="mt-5">
        <div class="flex flex-col">
          <div
            :class="{
              'p-5 border rounded-xl': true,
              'border-primary': _limitType === 'unlimit',
              'border-primary-background': !(_limitType === 'unlimit'),
            }"
          >
            <label class="w-full inline-flex items-center">
              <input type="radio" name="limit" value="unlimit" v-model="_limitType" />
              <span
                class="text-body-2 lg:text-body-1 text-neutral-darkest font-medium ml-2"
                :style="{ color: !(_limitType === 'unlimit') ? 'rgba(113, 117, 145, 0.6)' : null }"
              >
                Unlimited
              </span>
            </label>
          </div>

          <div
            :class="{
              'p-5 mt-5 border rounded-xl': true,
              'border-primary': _limitType === 'limit',
              'border-primary-background': !(_limitType === 'limit'),
            }"
          >
            <label class="w-full inline-flex items-center">
              <input type="radio" name="limit" value="limit" v-model="_limitType" />
              <span
                class="text-body-2 lg:text-body-1 text-neutral-darkest font-medium ml-2"
                :style="{ color: !(_limitType === 'limit') ? 'rgba(113, 117, 145, 0.6)' : null }"
              >
                Advanced limit settings
              </span>
            </label>

            <div class="flex items-center gap-5">
              <input
                v-model="_limitRatePerDay"
                :disabled="!(_limitType === 'limit')"
                class="
                  mt-2
                  appearance-none
                  block
                  w-full
                  text-body-2
                  lg:text-body-1
                  text-neutral-darkset
                  font-medium
                  border border-primary-background
                  rounded-lg
                  py-3
                  px-4
                  leading-tight
                "
                :style="{ color: !(_limitType === 'limit') ? 'rgba(113, 117, 145, 0.6)' : null }"
                type="number"
              />
              <span
                class="whitespace-nowrap text-body-2 lg:text-body-1 text-neutral-darkest font-medium"
                :style="{ color: !(_limitType === 'limit') ? 'rgba(113, 117, 145, 0.6)' : null }"
              >
                per day
              </span>
            </div>
          </div>
          <div class="w-full flex justify-end mt-10">
            <BaseButton class="w-[189px] h-[52px]" :loading="_loading" @click="$emit('onSave')"> Save </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </TheModal>
</template>

<script>
export default {
  name: 'DashboardModalChangeLimit',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    limitRatePerDay: {
      type: Number,
      default: 0,
    },

    limitType: {
      type: String,
      default: 'unlimit',
    },

    loading: {
      type: Boolean,
      default: false,
    },
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

    _limitRatePerDay: {
      get() {
        return this.limitRatePerDay;
      },
      set(value) {
        this.$emit('update:limitRatePerDay', parseInt(value));
      },
    },

    _limitType: {
      get() {
        return this.limitType;
      },
      set(value) {
        this.$emit('update:limitType', value);
      },
    },

    _loading: {
      get() {
        return this.loading;
      },
      set(value) {
        this.$emit('update:loading', value);
      },
    },
  },

  methods: {},
};
</script>
