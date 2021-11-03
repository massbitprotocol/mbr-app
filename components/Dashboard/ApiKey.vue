<template>
  <div>
    <div class="hidden sm:block">
      <div class="block text-body-1 text-neutral-normal font-semibold">API key</div>

      <div class="flex items-center text-body-1 text-neutral-darkset font-bold mt-1.5">
        <span class="mr-2 overflow-ellipsis whitespace-nowrap break-words overflow-hidden">{{ apiKey }}</span>
        <TheCopyButton :textToCopy="apiKey" />
      </div>
    </div>

    <div class="block sm:hidden w-full bg-primary-darker p-4 rounded-xl">
      <div class="block text-body-2 text-primary-background font-semibold">API key</div>

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
