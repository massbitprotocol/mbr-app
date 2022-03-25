<template>
  <div class="mt-7.5 lg:mt-9">
    <div class="text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold">YOUR API PROVIDER</div>

    <div class="mt-3 lg:mt-4 p-5 bg-neutral-lightest rounded-xl">
      <!-- HTTP Provider -->
      <div class="text-body-2 lg:text-body-1 text-neutral-normal font-medium">HTTP Provider:</div>
      <div class="flex items-center mt-2 lg:mt-3">
        <span class="flex items-center mr-2" v-html="require(`~/assets/svg/icon/globe.svg?raw`)"></span>
        <div
          class="mr-3 flex-shrink text-body-2 lg:text-body-1 text-neutral-darkset font-medium overflow-ellipsis whitespace-nowrap break-words overflow-hidden"
        >
          {{ gatewayHttpSecret | shortenUrl }}
        </div>
        <TheCopyButton v-if="gatewayHttp" buttonClass="bg-primary-background" :textToCopy="gatewayHttp" />
      </div>

      <div class="mt-6 lg:mt-7 text-body-2 lg:text-body-1 text-neutral-normal font-medium">WSS Provider:</div>
      <div class="flex items-center mt-2 lg:mt-3">
        <span class="flex items-center mr-2" v-html="require(`~/assets/svg/icon/globe.svg?raw`)"></span>
        <div
          class="mr-3 flex-shrink text-body-2 lg:text-body-1 text-neutral-darkset font-medium overflow-ellipsis whitespace-nowrap break-words overflow-hidden"
        >
          {{ gatewayWssSecret | shortenUrl }}
        </div>
        <TheCopyButton v-if="gatewayWss" buttonClass="bg-primary-background" :textToCopy="gatewayWss" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApiProvider',

  props: {
    api: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    gatewayHttpSecret() {
      return `https://${this.$options.filters.shortenKey(this.api.id)}.${this.api.blockchain}-${this.api.network}.${
        this.$config.dapiProviderDomain
      }/${this.api.appKey}`;
    },

    gatewayHttp() {
      return `https://${this.api.id}.${this.api.blockchain}-${this.api.network}.${this.$config.dapiProviderDomain}/${this.api.appKey}`;
    },

    gatewayWss() {
      return `wss://${this.$options.filters.shortenKey(this.api.id)}.${this.api.blockchain}-${this.api.network}.${
        this.$config.dapiProviderDomain
      }/${this.api.appKey}`;
    },

    gatewayWssSecret() {
      return `wss://${this.api.id}.${this.api.blockchain}-${this.api.network}.${this.$config.dapiProviderDomain}/${this.api.appKey}`;
    },
  },
};
</script>
