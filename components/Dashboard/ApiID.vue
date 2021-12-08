<template>
  <div>
    <div class="hidden lg:block">
      <div class="block text-body-1 text-neutral-normal font-medium">ID</div>

      <div class="flex items-center text-body-1 text-neutral-darkset font-bold mt-1.5">
        <span class="mr-2 overflow-ellipsis whitespace-nowrap break-words overflow-hidden">{{
          apiKey | shortenKey
        }}</span>

        <div class="flex items-center">
          <TheCopyButton :textToCopy="apiKey" class="!absolute" />
        </div>
      </div>
    </div>

    <div class="block lg:hidden w-full bg-primary-darker p-4 rounded-xl">
      <div class="block text-body-2 text-primary-background font-medium">ID</div>

      <div class="flex items-center text-body-2 text-neutral-darkset font-bold">
        <span class="text-white mr-2 overflow-ellipsis whitespace-nowrap break-words overflow-hidden">{{
          apiKey
        }}</span>
        <TheCopyButtonPrimary :textToCopy="apiKey" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apiKey: {
      type: String,
      default: '',
    },
  },
};
</script>
