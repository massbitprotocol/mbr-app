<template>
  <div class="relative w-full inline-block text-left">
    <div class="relative flex w-full flex-wrap items-stretch">
      <input
        v-model="filter"
        @focus="onShowDropdown"
        ref="input"
        type="text"
        :placeholder="placeholder"
        class="
          appearance-none
          block
          w-full
          text-body-2 text-gray-700
          border border-primary-background
          rounded
          py-3
          px-4
          mb-2.5
          leading-tight
        "
      />
    </div>

    <button
      class="fixed inset-0 h-full w-full cursor-default focus:outline-none"
      v-if="showDropdown"
      @click="onHideDropdown"
      tabindex="-1"
    ></button>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="showDropdown"
        ref="select"
        class="
          origin-center
          fixed
          right-0
          mt-2
          w-full
          rounded
          shadow-lg
          bg-white
          divide-y
          primary-background
          focus:outline-none
          overflow-auto
          max-h-[45vh]
        "
      >
        <template v-for="(item, index) in filterSource">
          <div @click="onSelectItem(item)" class="hover:bg-primary-background block px-4 py-2 text-base" :key="index">
            {{ item.value }}
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BaseSearch',

  props: {
    value: {
      type: String,
      default: '',
    },

    source: {
      type: Array,
      default: () => [],
    },

    placeholder: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      onInit: true,
      showDropdown: false,
      filter: '',
    };
  },

  computed: {
    filterSource() {
      if (this.filter) {
        if (this.onInit) {
          this.onInit = false;
        } else {
          return this.source.filter(
            (item) => item.value && item.value.toLowerCase().includes(this.filter.toLowerCase()),
          );
        }
      }

      return this.source;
    },

    key: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },

  methods: {
    onShowDropdown() {
      this.updateSelectPosition();

      this.preFilter = this.filter;
      this.showDropdown = true;
    },

    onHideDropdown() {
      if (this.filter) {
        if (this.key) {
          let item = this.source.find((item) => item.id === this.key);
          if (item) {
            this.filter = item.value;
          } else {
            this.filter = '';
          }
        } else {
          this.filter = '';
        }
      } else {
        this.key = '';
      }

      this.showDropdown = false;
      this.onInit = true;
    },

    updateSelectPosition() {
      if (this.$refs.input && this.$refs.select) {
        const refInput = this.$refs.input;
        let refSelect = this.$refs.select;

        let { width, height, left, top } = refInput.getBoundingClientRect();
        refSelect.style.width = `${width}px`;
        refSelect.style.left = `${left}px`;
        refSelect.style.top = `${top + height}px`;
      }
    },

    onSelectItem(item) {
      this.filter = item.value;
      this.key = item.id;

      this.$nextTick(() => this.onHideDropdown());
    },
  },
};
</script>
