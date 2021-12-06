<template>
  <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-5 mt-5 py-4 border rounded-2xl border-primary-background">
    <div class="flex flex-col justify-between px-0 md:px-5">
      <div
        class="
          px-5
          md:px-0
          mb-4
          md:mb-0
          text-heading-2
          lg:text-heading-1
          text-neutral-darkset
          font-bold
          overflow-ellipsis
          whitespace-nowrap
          break-words
          overflow-hidden
        "
      >
        {{ api.name }}
      </div>

      <div class="bg-primary-darker md:bg-white py-4 md:py-0 px-5 md:px-0">
        <div class="block md:hidden text-body-2 text-primary-background font-semibold">API key</div>

        <div class="w-full inline-flex items-center justify-between gap-2">
          <div class="text-body-2 md:text-body-1 text-neutral-white md:text-neutral-darker font-semibold truncate">
            {{ api.api_key | shortenKey }}
          </div>

          <TheCopyButton class="hidden md:flex" buttonClass="bg-primary-background" :textToCopy="api.api_key" />
          <TheCopyButtonPrimary class="flex md:hidden" :textToCopy="api.api_key" />
        </div>
      </div>
    </div>

    <div class="hidden md:grid grid-cols-1 m-auto align-middle px-5">
      <div class="text-body-2 text-neutral-normal font-semibold">Status</div>

      <BaseToggle class="mt-1" :refId="api.api_key" :checked.sync="status" />
    </div>

    <div class="flex flex-col items-start md:items-center justify-center px-5">
      <div class="flex flex-col">
        <div class="text-body-2 text-neutral-normal font-semibold">Requests Limit</div>
        <div
          class="
            w-full
            md:w-[150px]
            mt-1
            text-body-1 text-accent-green
            font-bold
            overflow-ellipsis
            whitespace-nowrap
            break-words
            overflow-hidden
          "
        >
          {{ requestLimit }}
        </div>
      </div>
    </div>

    <div
      class="
        flex flex-col
        items-end
        justify-center
        border-t
        md:border-t-none
        border-primary-background
        md:border-transparent
        px-5
        pt-4
        md:pt-0
      "
    >
      <button
        @click="$router.push({ name: 'dashboard-id', params: { id: api.id } })"
        class="
          max-w-[189px]
          h-[52px]
          hidden
          md:flex
          items-center
          justify-center
          cursor-pointer
          bg-neutral-lightest
          text-primary text-body-1
          font-semibold
          px-7.5
          rounded-lg
          hover:bg-neutral-lightest/90
          whitespace-nowrap
        "
      >
        API Key Settings
      </button>

      <NuxtLink
        :to="{ name: 'dashboard-id', params: { id: api.id } }"
        class="
          w-full
          flex
          md:hidden
          items-center
          justify-between
          text-body-2 text-primary
          font-semibold
          hover:text-primary/90
        "
      >
        <span>Settings for API Key</span>

        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.707 5.29301L10.707 0.293006C10.316 -0.0979941 9.684 -0.0979941 9.293 0.293006C8.902 0.684006 8.902 1.31601 9.293 1.70701L12.586 5.00001H1C0.447 5.00001 0 5.44801 0 6.00001C0 6.55201 0.447 7.00001 1 7.00001H12.586L9.293 10.293C8.902 10.684 8.902 11.316 9.293 11.707C9.488 11.902 9.744 12 10 12C10.256 12 10.512 11.902 10.707 11.707L15.707 6.70701C16.098 6.31601 16.098 5.68401 15.707 5.29301Z"
            fill="currentColor"
          />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardApiCard',

  props: {
    api: {
      type: Object,
      default: () => new Object(),
    },
  },

  data() {
    return {
      is_prod: false,
    };
  },

  computed: {
    status: {
      get() {
        return !!parseInt(this.api.status);
      },
      set(value) {
        this.$emit('updateApiStatus', value);
      },
    },

    requestLimit() {
      if (this.api.security && this.api.security.limit_rate_per_day) {
        return `${this.api.security.limit_rate_per_day} per day`;
      }

      return 'Unlimited';
    },
  },
};
</script>
