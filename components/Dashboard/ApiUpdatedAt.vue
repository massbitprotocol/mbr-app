<template>
  <div>
    <div class="block">
      <div class="block text-body-1 text-neutral-normal font-medium">Updated at</div>

      <div class="flex items-center text-body-1 text-neutral-darkset font-medium mt-1.5">
        <span v-if="updatedAt" class="mr-2 overflow-ellipsis whitespace-nowrap break-words overflow-hidden">{{
          updatedAt.toString() | formatTimeUTC
        }}</span>

        <span v-else class="mr-2 overflow-ellipsis whitespace-nowrap break-words overflow-hidden"> - </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: 'DashboardApiUpdatedAt',

    updatedAt: {
      type: String,
      default: 0,
    },
  },
};
</script>
