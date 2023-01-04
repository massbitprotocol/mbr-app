<template>
  <TheModal :open.sync="_visible" :backdrop="true">
    <div class="max-w-[570px] w-full bg-white p-5 rounded-lg z-10 text-left overflow-hidden">
      <div class="w-full flex items-center justify-between">
        <div class="text-heading-2 text-neutral-darkset font-bold">Choose Account</div>

        <div
          @click="_visible = false"
          class="flex items-center text-neutral-darkset cursor-pointer"
          v-html="require(`~/assets/svg/icon/close.svg?raw`)"
        ></div>
      </div>

      <div class="mt-5">
        <div
          @click="$emit('select', account)"
          v-for="(account, index) in accounts"
          :key="index"
          class="flex items-center gap-4 py-3 px-3 text-body-1 font-medium rounded text-neutral-darkest cursor-pointer hover:bg-neutral-lightest"
        >
          {{ account.meta.name }}
        </div>
      </div>
    </div>
  </TheModal>
</template>

<script>
export default {
  name: 'BaseModalSelectAccount',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    accounts: {
      type: Array,
      default: () => [],
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
  },
};
</script>
