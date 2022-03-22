<template>
  <div>
    <div class="hidden sm:block">
      <div class="block text-body-1 text-neutral-normal font-medium">App Key</div>

      <div class="flex items-center text-body-1 text-neutral-darkset font-medium mt-1.5">
        <span class="mr-2 overflow-ellipsis whitespace-nowrap break-words overflow-hidden">{{
          apiKey | shortenSecret
        }}</span>
        <TheCopyButton :textToCopy="apiKey" />
      </div>
    </div>

    <div class="block sm:hidden w-full bg-primary-darker p-4 rounded-xl">
      <div class="block text-body-2 text-primary-background font-medium">App Key</div>

      <div class="flex items-center text-body-2 text-neutral-darkset font-medium">
        <span class="text-white mr-2 overflow-ellipsis whitespace-nowrap break-words overflow-hidden">{{
          apiKey | shortenSecret
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
