<template>
  <div>
    <div class="hidden lg:block">
      <div class="block text-body-1 text-neutral-normal font-medium">Status code</div>
      <div class="flex gap-0.5 justify-center items-start text-body-1 text-neutral-darkset font-medium mt-1.5">
        <a class="overflow-ellipsis whitespace-nowrap break-words overflow-hidden" href="https://www.google.com">{{
          api.errorCode || 0
        }}</a>
        <div class="px-2">
          (<a
            class="underline overflow-ellipsis whitespace-nowrap break-words overflow-hidden"
            :href="errorLink"
            >Details...</a
          >)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    api: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    console.log(this.api);
    return {
      errorLink: this.$config.linkErrorCodes,
    };
  },
};
</script>
