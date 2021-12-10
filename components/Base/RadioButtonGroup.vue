<template>
  <div class="w-full flex items-center justify-center">
    <template v-for="(item, index) in source">
      <template v-if="index === 0">
        <button
          @click="_key = item.key"
          :key="index"
          :class="[
            _key === item.key ? 'text-white bg-primary' : 'text-primary bg-transparent',
            'w-full h-[52px] border-l border-t border-b border-primary font-medium uppercase text-body-2 px-4 py-2 rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-100',
          ]"
          type="button"
        >
          {{ item.name }}
        </button>
      </template>

      <template v-else-if="index === source.length - 1">
        <button
          @click="_key = item.key"
          :key="index"
          :class="[
            _key === item.key ? 'text-white bg-primary' : 'text-primary bg-transparent',
            'w-full h-[52px] border-t border-b border-r border-primary font-medium uppercase text-body-2 px-4 py-2 rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-100',
          ]"
          type="button"
        >
          {{ item.name }}
        </button>
      </template>

      <template v-else>
        <button
          @click="_key = item.key"
          :key="index"
          :class="[
            _key === item.key ? 'text-white bg-primary' : 'text-primary bg-transparent',
            'w-full h-[52px] border border-solid border-primary font-medium uppercase text-body-2 px-4 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-100',
          ]"
          type="button"
        >
          Center
        </button>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseRadioButtonGroup',

  props: {
    source: {
      type: Array,
      default: () => [],
    },

    currentKey: {
      type: String,
      default: '',
    },
  },

  computed: {
    _key: {
      get() {
        return this.currentKey;
      },
      set(value) {
        this.$emit('update:currentKey', value);
      },
    },
  },
};
</script>
