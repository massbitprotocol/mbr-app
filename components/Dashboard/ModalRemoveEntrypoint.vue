<template>
  <TheModal :open.sync="_visible" :backdrop="true">
    <div class="max-w-[570px] w-full bg-white p-5 rounded-lg z-10 text-left overflow-hidden">
      <div class="w-full flex items-center justify-between mb-3">
        <div class="text-heading-2 text-neutral-darkset font-bold">Delete Entrypoint</div>

        <div
          @click="_visible = false"
          class="flex items-center text-neutral-darkset cursor-pointer"
          v-html="require(`~/assets/svg/icon/close.svg?raw`)"
        ></div>
      </div>

      <div class="text-body-1 text-accent-red font-semibold mb-1.5">
        Are you sure you want to delete this Entrypoint?
      </div>

      <div class="text-body-1 text-neutral-normal font-semibold">
        Deleting will remove access to MassBit for this project immediately. This cannot be undone.
      </div>

      <div class="w-full flex justify-end px-3 mt-7.5">
        <BaseButtonDanger class="w-[189px] h-[52px]" type="submit" @click="$emit('onRemove', _id)" :loading="_loading">
          Delete
        </BaseButtonDanger>
      </div>
    </div>
  </TheModal>
</template>

<script>
export default {
  name: 'DashboardModalRemoveEntrypoint',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    id: {
      type: Number | String,
      required: true,
    },
  },

  watch: {
    visible(value) {
      if (!value) {
        this._id = null;
      }
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

    _loading: {
      get() {
        return this.loading;
      },
      set(value) {
        this.$emit('update:loading', value);
      },
    },

    _id: {
      get() {
        return this.id;
      },
      set(value) {
        this.$emit('update:id', value);
      },
    },
  },
};
</script>
