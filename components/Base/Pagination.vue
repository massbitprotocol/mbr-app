<template>
  <div class="flex gap-3 items-center justify-end">
    <!-- Help text -->
    <span class="text-sm text-gray-700">
      Showing
      <span class="font-medium text-gray-900">{{ meta.currentPage === 1 ? 1 : meta.currentPage * itemsPerPage }}</span>
      to <span class="font-medium text-gray-900">{{ meta.itemCount }}</span> of
      <span class="font-medium text-gray-900">{{ meta.totalItems }}</span> Entries
    </span>

    <div class="inline-flex xs:mt-0">
      <!-- Buttons -->
      <button
        :class="{
          'inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-primary rounded-l hover:bg-primary/900': true,
          'cursor-not-allowed bg-primary/70': !links.previous,
        }"
        :disabled="!links.previous"
        @click="$emit('onChangePage', links.previous)"
      >
        <svg class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Prev
      </button>

      <button
        :class="{
          'inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-primary rounded-r border-0 border-l bg-primary hover:bg-primary/90 dark:bg-primary': true,
          'cursor-not-allowed bg-primary/70': !links.next,
        }"
        :disabled="!links.next"
        @click="$emit('onChangePage', links.next)"
      >
        Next
        <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasePagination',

  props: {
    meta: {
      type: Object,
      default: () => ({}),
    },

    links: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    nextPage() {
      console.log('nextPage ===============');
    },
  },
};
</script>

<style lang="scss" scoped></style>
