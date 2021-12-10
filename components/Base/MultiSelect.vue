<template>
  <div
    @click="hoverToInput"
    class="relative min-h-[44px] flex items-center flex-wrap gap-x-3 px-4 border border-primary-background rounded-lg"
  >
    <!-- Tags -->
    <div
      v-for="(selectItem, index) in _selected"
      :key="index"
      class="flex items-center justify-center my-2 px-3 py-1 rounded bg-neutral-lightest"
    >
      <span class="mr-2 text-body-2 text-neutral-darkest font-medium"> {{ getItemName(selectItem) }} </span>

      <div
        @click.stop="removeItem(selectItem)"
        class="flex items-center text-neutral-darkest cursor-pointer"
        v-html="require(`~/assets/svg/icon/close.svg?raw`)"
      ></div>
    </div>

    <!-- Backdrop hide dropdowm -->
    <button
      class="fixed inset-0 h-full w-full cursor-default focus:outline-none"
      v-if="showMenu"
      @click.stop="showMenu = false"
      tabindex="-1"
    ></button>

    <!-- Input search -->
    <input
      v-show="showMenu"
      v-model="filterText"
      :size="filterText ? filterText.length : 1"
      class="border-none border-transparent !ring-0 !ring-transparent"
      ref="input"
      type="text"
    />

    <div
      v-show="showMenu"
      class="w-full absolute z-10 max-h-[300px] overflow-auto bg-white top-full left-0 shadow-lg rounded-lg"
    >
      <template v-if="_sourceData && _sourceData.length > 0">
        <div
          v-for="(source, index) in _sourceData"
          :key="index"
          v-show="!filterText || source.name.toLowerCase().includes(filterText.toLowerCase())"
          @click="onSelectItem(source)"
          class="
            p-3
            text-body-2
            lg:text-body-1
            text-neutral-darker
            font-medium
            hover:bg-primary-background
            cursor-pointer
          "
        >
          {{ source.name }}
        </div>
      </template>

      <div v-else class="p-3 text-body-2 lg:text-body-1 text-neutral-lighter font-medium">No data</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseMultiSelect',

  props: {
    selected: {
      type: Array,
      default: () => [],
    },

    sourceData: {
      type: Array,
      default: () => [],
    },

    source: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      showMenu: false,
      filterText: '',
    };
  },

  computed: {
    _selected: {
      get() {
        return this.selected;
      },
      set(value) {
        this.$emit('update:selected', value);
      },
    },

    _sourceData: {
      get() {
        return this.sourceData;
      },
      set(value) {
        this.$emit('update:sourceData', value);
      },
    },
  },

  methods: {
    hoverToInput() {
      this.showMenu = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },

    getItemName(key) {
      let item = this.source.find((item) => item.key === key);
      if (item) {
        return item.name;
      }

      return '';
    },

    onSelectItem(source) {
      let index = this._sourceData.findIndex((item) => item.key === source.key);
      if (index !== -1) {
        this._sourceData.splice(index, 1);
      }

      this.filterText = '';
      this._selected.push(source.key);
    },

    removeItem(key) {
      let item = this.source.find((item) => item.key === key);
      if (item) {
        this.sourceData.push(item);
      }

      let index = this.selected.findIndex((item) => item === key);
      if (index !== -1) {
        this.selected.splice(index, 1);
      }
    },
  },
};
</script>
