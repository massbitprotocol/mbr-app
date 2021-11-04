<template>
  <div v-if="api" class="w-full max-w-[450px] mt-5 border rounded-2xl border-primary-background">
    <div class="flex items-center justify-between px-5 py-4">
      <div
        class="
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
      <BaseToggle :refId="api.api_key" :checked.sync="status" />
    </div>

    <div class="grid grid-cols-1 px-5 py-4 bg-primary-darker text-white text-body-1">
      <div>API Key</div>
      <div class="inline-flex items-center gap-2 justify-between mt-1.5">
        <div class="font-bold overflow-ellipsis whitespace-nowrap break-words overflow-hidden">
          {{ api.api_key }}
        </div>
        <TheCopyButtonPrimary :textToCopy="api.api_key" />
      </div>
    </div>

    <div class="grid grid-cols-1 border-b border-primary-background px-5 py-4">
      <div class="text-body-2 text-neutral-normal font-semibold">Requests Limit</div>
      <div class="text-body-1 text-accent-green font-bold mt-1">{{ requestLimit }}</div>
    </div>

    <div class="px-5 py-2.5">
      <NuxtLink
        :to="{ name: 'dashboard-id', params: { id: api.api_id } }"
        class="flex items-center justify-between w-full text-body-2 text-primary font-semibold hover:text-primary/90"
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
      if (this.api.security && this.api.security.limit_rate_per_sec) {
        return `${this.api.security.limit_rate_per_sec} per second`;
      }

      return 'Unlimited';
    },
  },
};
</script>
